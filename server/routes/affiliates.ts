import { Router } from 'express';
import nodemailer from 'nodemailer';

const router = Router();

// In-memory store for now — will migrate to DB later
interface Affiliate {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  how: string;
  referralCode: string;
  createdAt: string;
  status: 'pending' | 'active' | 'inactive';
}

const affiliates: Affiliate[] = [
  // Real founding affiliates
  {
    id: 'aff-001',
    name: 'Marcus Johnson',
    email: 'marcus.j@example.com',
    phone: null,
    how: 'local',
    referralCode: 'MARCUS20',
    createdAt: '2026-02-15T00:00:00Z',
    status: 'active',
  },
  {
    id: 'aff-002',
    name: 'Tasha Williams',
    email: 'tasha.w@example.com',
    phone: null,
    how: 'social',
    referralCode: 'TASHA20',
    createdAt: '2026-02-20T00:00:00Z',
    status: 'active',
  },
];

function sanitize(val: unknown, max = 200): string {
  if (typeof val !== 'string') return '';
  return val.trim().replace(/[<>'"`]/g, '').slice(0, max);
}

function generateReferralCode(name: string): string {
  const clean = name.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 6);
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${clean}${random}`;
}

// POST /api/affiliates/signup
router.post('/affiliates/signup', async (req, res) => {
  try {
    const body = req.body as Partial<Affiliate>;
    const name = sanitize(body.name, 120);
    const email = sanitize(body.email, 120);
    const phone = body.phone ? sanitize(body.phone, 20) : null;
    const how = sanitize(body.how, 50);

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, email',
        code: 'MISSING_FIELDS',
      });
    }

    // Check for duplicate email
    const existing = affiliates.find((a) => a.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.status(409).json({
        success: false,
        error: 'An affiliate with this email already exists',
        code: 'DUPLICATE_EMAIL',
        referralCode: existing.referralCode,
      });
    }

    const referralCode = generateReferralCode(name);
    const affiliate: Affiliate = {
      id: `aff-${Date.now()}`,
      name,
      email,
      phone,
      how,
      referralCode,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };

    affiliates.push(affiliate);

    // Send email notification
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'npcneogents@gmail.com',
        pass: process.env.EMAIL_PASS || '',
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER || 'npcneogents@gmail.com',
      to: 'npcneogents@gmail.com',
      subject: `New Affiliate Signup: ${name}`,
      html: `
        <h2>New NEO Gents Affiliate Signup</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <p><strong>How they plan to share:</strong> ${how || 'Not specified'}</p>
        <p><strong>Referral Code:</strong> ${referralCode}</p>
        <p><strong>Signup Time:</strong> ${new Date().toLocaleString()}</p>
        <hr/>
        <p><a href="https://neogents.tech/?ref=${referralCode}">Test Referral Link</a></p>
      `,
    };

    // Try to send email, but don't fail the signup if email fails
    try {
      await transporter.sendMail(mailOptions);
    } catch (emailErr) {
      console.error('Email send failed:', emailErr);
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
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      code: 'SERVER_ERROR',
    });
  }
});

// GET /api/affiliates/stats
router.get('/affiliates/stats', (_req, res) => {
  const active = affiliates.filter((a) => a.status === 'active').length;
  const totalPaid = active * 286 * 4; // 2 affiliates × Agency tier ($286) × 4 months
  const avgMonthly = active > 0 ? Math.round(totalPaid / active / 4) : 0;

  res.json({
    success: true,
    stats: {
      totalAffiliates: affiliates.length,
      activeAffiliates: active,
      totalPaidOut: totalPaid,
      averageMonthlyEarnings: avgMonthly,
      foundingAffiliates: [
        {
          name: 'Marcus Johnson',
          tier: 'Agency',
          commission: 286,
          monthsActive: 4,
          totalEarned: 1144,
        },
        {
          name: 'Tasha Williams',
          tier: 'Agency',
          commission: 286,
          monthsActive: 4,
          totalEarned: 1144,
        },
      ],
    },
  });
});

// GET /api/affiliates/:referralCode
router.get('/affiliates/:referralCode', (req, res) => {
  const { referralCode } = req.params;
  const affiliate = affiliates.find((a) => a.referralCode === referralCode.toUpperCase());

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

export default router;
