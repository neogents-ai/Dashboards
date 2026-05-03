import { Router } from 'express';
import { scrapePhotography } from '../scrapers/photography';
import { scrapeAesthetician } from '../scrapers/aesthetician';
import { scrapeBarber } from '../scrapers/barber';
import { scrapeChef } from '../scrapers/chef';
import { scrapeRealtor } from '../scrapers/realtor';

const router = Router();

const VALID_INDUSTRIES = ['photography', 'aesthetician', 'barber', 'chef', 'realtor'] as const;
type Industry = typeof VALID_INDUSTRIES[number];

function sanitizeString(val: unknown, maxLen = 200): string {
  if (typeof val !== 'string') return '';
  return val.trim().replace(/[<>"'`]/g, '').slice(0, maxLen);
}

router.post('/scrape', async (req, res) => {
  const industry = sanitizeString(req.body?.industry, 50);
  const query    = sanitizeString(req.body?.query, 200);
  const location = sanitizeString(req.body?.location, 100);
  const rawLimit = Number(req.body?.limit);
  const limit    = isNaN(rawLimit) ? 10 : Math.min(Math.max(1, rawLimit), 50);

  if (!industry || !query || !location) {
    return res.status(400).json({ success: false, error: 'Missing required fields: industry, query, location' });
  }

  if (!VALID_INDUSTRIES.includes(industry as Industry)) {
    return res.status(400).json({ success: false, error: 'Invalid industry' });
  }

  try {
    let leads: unknown[] = [];
    switch (industry as Industry) {
      case 'photography':   leads = await scrapePhotography(query, location);  break;
      case 'aesthetician':  leads = await scrapeAesthetician(query, location); break;
      case 'barber':        leads = await scrapeBarber(query, location);        break;
      case 'chef':          leads = await scrapeChef(query, location);          break;
      case 'realtor':       leads = await scrapeRealtor(query, location);       break;
    }

    res.json({
      success: true,
      leads: leads.slice(0, limit),
      scraped: leads.length,
      timestamp: new Date().toISOString(),
      industry
    });
  } catch (error) {
    console.error('Scrape error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

export default router;
