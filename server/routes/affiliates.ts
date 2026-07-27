import { Router, type Request, type Response, type NextFunction } from 'express';
import nodemailer from 'nodemailer';
import {
  listAffiliates,
  findAffiliateByEmail,
  findAffiliateByCode,
  createAffiliate,
  updateAffiliateStatus,
  recordClick,
  recordConversion,
  markConversionPaid,
  getAffiliateStats,
  getAdminStats,
  listConversions,
  type AffiliateStatus,
} from '../store/affiliates';

const router = Router();

function adminOnly(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  const expected = process.env.AFFILIATE_ADMIN_TOKEN || '';
  if (!expected || token !== expected) {
    return res.status(401).json({ success: false, error: 'Unauthorized', code: 'UNAUTHORIZED' });
  }
  next();
}

function sanitize(val: unknown, max = 200): string {
  if (typeof val !== 'string') return '';
  return val.trim().replace(/[<>"'`]/g, '').slice(0, max);
}

function sanitizeEmail(val: unknown): string {
  if (typeof val !== 'string') return '';
  return val.trim().toLowerCase().replace(/[<>"'`\s]/g, '').slice(0, 120);
}

function getClientIp(req: Parameters<Parameters<typeof router['post']>[2]>[0]): string | null {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') return forwarded.split(',')[0].trim();
  if (Array.isArray(forwarded)) return forwarded[0].trim();
  return req.socket.remoteAddress || null;
}

/* ── Public: affiliate signup ── */
router.post('/affiliates/signup', async (req, res) => {
  try {
    const body = req.body as Record<string, unknown>;
    const name = sanitize(body.name, 120);
    const email = sanitizeEmail(body.email);
    const phone = body.phone ? sanitize(body.phone, 20) : null;
    const how = sanitize(body.how, 50);

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, email',
        code: 'MISSING_FIELDS',
      });
    }

    const existing = findAffiliateByEmail(email);
    if (existing) {
      return res.status(409).json({
        success: false,
        error: 'An affiliate with this email already exists',
        code: 'DUPLICATE_EMAIL',
        referralCode: existing.referralCode,
      });
    }

    const affiliate = createAffiliate(name, email, phone, how);

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    if (emailUser && emailPass) {
      const transporter = nodemailer.createTransporter({
        service: 'gmail',
        auth: { user: emailUser, pass: emailPass },
      });
      const mailOptions = {
        from: emailUser,
        to: emailUser,
        subject: `New Affiliate Signup: ${affiliate.name}`,
        html: `
          <h2>New NEO Gents Affiliate Signup</h2>
          <p><strong>Name:</strong> ${affiliate.name}</p>
          <p><strong>Email:</strong> ${affiliate.email}</p>
          ${affiliate.phone ? `<p><strong>Phone:</strong> ${affiliate.phone}</p>` : ''}
          <p><strong>How they plan to share:</strong> ${affiliate.how || 'Not specified'}</p>
          <p><strong>Referral Code:</strong> ${affiliate.referralCode}</p>
          <p><strong>Signup Time:</strong> ${new Date().toLocaleString()}</p>
          <hr/>
          <p><a href="https://neogents.tech/?ref=${affiliate.referralCode}">Test Referral Link</a></p>
        `,
      };
      try {
        await transporter.sendMail(mailOptions);
      } catch (emailErr) {
        console.error('Email send failed:', emailErr);
      }
    }

    res.status(201).json({
      success: true,
      affiliate: {
        id: affiliate.id,
        name: affiliate.name,
        email: affiliate.email,
        referralCode: affiliate.referralCode,
        status: affiliate.status,
      },
      message: 'Welcome to the team! Check your email for your referral link and dashboard access.',
    });
  } catch (error) {
    console.error('Affiliate signup error:', error);
    res.status(500).json({ success: false, error: 'Internal server error', code: 'SERVER_ERROR' });
  }
});

/* ── Public: lookup affiliate by code ── */
router.get('/affiliates/:referralCode', (req, res) => {
  const affiliate = findAffiliateByCode(req.params.referralCode);
  if (!affiliate) {
    return res.status(404).json({
      success: false,
      error: 'Affiliate not found',
      code: 'NOT_FOUND',
    });
  }
  res.json({
    success: true,
    affiliate: {
      name: affiliate.name,
      referralCode: affiliate.referralCode,
      status: affiliate.status,
      referralUrl: `https://neogents.tech/?ref=${affiliate.referralCode}`,
    },
  });
});

/* ── Public: record a referral click ── */
router.post('/affiliates/click', (req, res) => {
  try {
    const body = req.body as Record<string, unknown>;
    const referralCode = sanitize(body.referralCode, 20);
    const to = sanitize(body.to, 100) || null;
    const landing = sanitize(body.landing, 200) || '/';

    if (!referralCode) {
      return res.status(400).json({ success: false, error: 'Missing referralCode', code: 'MISSING_FIELDS' });
    }

    const click = recordClick(referralCode, {
      ip: getClientIp(req),
      userAgent: req.headers['user-agent'] || null,
      to,
      landing,
    });

    if (!click) {
      return res.status(404).json({ success: false, error: 'Affiliate not found', code: 'NOT_FOUND' });
    }

    res.json({ success: true, click: { id: click.id, createdAt: click.createdAt } });
  } catch (error) {
    console.error('Affiliate click error:', error);
    res.status(500).json({ success: false, error: 'Internal server error', code: 'SERVER_ERROR' });
  }
});

/* ── Admin: list all affiliates ── */
router.get('/affiliates', adminOnly, (_req, res) => {
  res.json({
    success: true,
    affiliates: listAffiliates().map((a) => ({
      ...a,
      referralUrl: `https://neogents.tech/?ref=${a.referralCode}`,
    })),
  });
});

/* ── Admin: update affiliate status ── */
router.patch('/affiliates/:id/status', adminOnly, (req, res) => {
  const status = sanitize(req.body.status, 20) as AffiliateStatus;
  if (!['pending', 'active', 'inactive'].includes(status)) {
    return res.status(400).json({ success: false, error: 'Invalid status', code: 'INVALID_STATUS' });
  }
  const updated = updateAffiliateStatus(req.params.id, status);
  if (!updated) {
    return res.status(404).json({ success: false, error: 'Affiliate not found', code: 'NOT_FOUND' });
  }
  res.json({ success: true, affiliate: updated });
});

/* ── Admin: record a conversion ── */
router.post('/affiliates/conversion', adminOnly, (req, res) => {
  try {
    const body = req.body as Record<string, unknown>;
    const referralCode = sanitize(body.referralCode, 20);
    const customerEmail = sanitizeEmail(body.customerEmail);
    const customerName = sanitize(body.customerName as string, 120) || null;
    const plan = sanitize(body.plan as string, 20) as 'Starter' | 'Pro' | 'Agency' | 'Custom';

    if (!referralCode || !customerEmail || !['Starter', 'Pro', 'Agency', 'Custom'].includes(plan)) {
      return res.status(400).json({
        success: false,
        error: 'Missing or invalid fields: referralCode, customerEmail, plan',
        code: 'MISSING_FIELDS',
      });
    }

    const conversion = recordConversion(referralCode, customerEmail, customerName, plan);
    if (!conversion) {
      return res.status(404).json({ success: false, error: 'Affiliate not found', code: 'NOT_FOUND' });
    }

    res.status(201).json({ success: true, conversion });
  } catch (error) {
    console.error('Affiliate conversion error:', error);
    res.status(500).json({ success: false, error: 'Internal server error', code: 'SERVER_ERROR' });
  }
});

/* ── Admin: mark conversion paid ── */
router.patch('/affiliates/conversion/:id/paid', adminOnly, (req, res) => {
  const updated = markConversionPaid(req.params.id);
  if (!updated) {
    return res.status(404).json({ success: false, error: 'Conversion not found', code: 'NOT_FOUND' });
  }
  res.json({ success: true, conversion: updated });
});

/* ── Admin: stats overview ── */
router.get('/affiliates/stats/admin', adminOnly, (_req, res) => {
  res.json({ success: true, stats: getAdminStats() });
});

/* ── Admin: conversions list ── */
router.get('/affiliates/conversions/all', adminOnly, (_req, res) => {
  res.json({ success: true, conversions: listConversions() });
});

/* ── Affiliate portal: own stats ── */
router.get('/affiliates/stats/:referralCode', (req, res) => {
  const affiliate = findAffiliateByCode(req.params.referralCode);
  if (!affiliate) {
    return res.status(404).json({ success: false, error: 'Affiliate not found', code: 'NOT_FOUND' });
  }
  res.json({ success: true, referralCode: affiliate.referralCode, stats: getAffiliateStats(affiliate.id) });
});

/* ── Backward-compatible stats alias ── */
router.get('/affiliates/stats', adminOnly, (_req, res) => {
  res.json({ success: true, stats: getAdminStats() });
});

export default router;
