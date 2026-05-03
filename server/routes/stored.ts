import { Router } from 'express';
import { getLeads, addLead, deleteLead, Lead } from '../store/leads';

const router = Router();

const VALID_INDUSTRIES = ['photography', 'aesthetician', 'barber', 'chef', 'realtor'] as const;
type Industry = typeof VALID_INDUSTRIES[number];

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function sanitize(val: unknown, max = 200): string {
  if (typeof val !== 'string') return '';
  return val.trim().replace(/[<>"'`]/g, '').slice(0, max);
}

function validateIndustry(industry: string): industry is Industry {
  return VALID_INDUSTRIES.includes(industry as Industry);
}

// GET /api/leads/:industry?page=1&limit=20
router.get('/leads/:industry', (req, res) => {
  try {
    const { industry } = req.params;
    if (!validateIndustry(industry)) {
      return res.status(400).json({ success: false, error: 'Invalid industry', code: 'INVALID_INDUSTRY' });
    }
    const page  = Math.max(1, parseInt(String(req.query.page  || 1)));
    const limit = Math.min(50, Math.max(1, parseInt(String(req.query.limit || 20))));
    const all   = getLeads(industry);
    const start = (page - 1) * limit;
    res.json({
      success: true,
      leads: all.slice(start, start + limit),
      total: all.length,
      page,
      limit,
    });
  } catch {
    res.status(500).json({ success: false, error: 'Internal server error', code: 'SERVER_ERROR' });
  }
});

// POST /api/leads/:industry
router.post('/leads/:industry', (req, res) => {
  try {
    const { industry } = req.params;
    if (!validateIndustry(industry)) {
      return res.status(400).json({ success: false, error: 'Invalid industry', code: 'INVALID_INDUSTRY' });
    }
    const body = req.body as Partial<Lead>;
    const name     = sanitize(body.name, 120);
    const business = sanitize(body.business, 120);
    if (!name || !business) {
      return res.status(400).json({ success: false, error: 'Missing required fields: name, business', code: 'MISSING_FIELDS' });
    }
    const lead: Lead = {
      id:          sanitize(body.id,         36) || crypto.randomUUID(),
      name,
      business,
      email:       body.email    ? sanitize(body.email,    120) : null,
      phone:       body.phone    ? sanitize(body.phone,    30)  : null,
      website:     body.website  ? sanitize(body.website,  200) : null,
      address:     body.address  ? sanitize(body.address,  200) : null,
      source:      sanitize(body.source,     50) || 'manual',
      score:       typeof body.score === 'number' ? Math.min(100, Math.max(0, body.score)) : 30,
      tags:        Array.isArray(body.tags) ? body.tags.map(t => sanitize(t, 50)).filter(Boolean) : [],
      notes:       body.notes   ? sanitize(body.notes,  500) : null,
      scraped_at:  new Date().toISOString(),
      industry,
    };
    addLead(industry, lead);
    res.status(201).json({ success: true, lead });
  } catch {
    res.status(500).json({ success: false, error: 'Internal server error', code: 'SERVER_ERROR' });
  }
});

// DELETE /api/leads/:industry/:id
router.delete('/leads/:industry/:id', (req, res) => {
  try {
    const { industry, id } = req.params;
    if (!validateIndustry(industry)) {
      return res.status(400).json({ success: false, error: 'Invalid industry', code: 'INVALID_INDUSTRY' });
    }
    if (!UUID_RE.test(id)) {
      return res.status(400).json({ success: false, error: 'Invalid lead ID format', code: 'INVALID_ID' });
    }
    deleteLead(industry, id);
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false, error: 'Internal server error', code: 'SERVER_ERROR' });
  }
});

export default router;
