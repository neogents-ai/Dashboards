import { Router } from 'express';
import { scrapePhotography } from '../scrapers/photography';
import { scrapeAesthetician } from '../scrapers/aesthetician';
import { scrapeBarber } from '../scrapers/barber';
import { scrapeChef } from '../scrapers/chef';
import { scrapeRealtor } from '../scrapers/realtor';

const router = Router();

router.post('/scrape', async (req, res) => {
  const { industry, query, location, limit = 10 } = req.body;

  if (!industry || !query || !location) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  try {
    let leads = [];
    switch (industry) {
      case 'photography':
        leads = await scrapePhotography(query, location);
        break;
      case 'aesthetician':
        leads = await scrapeAesthetician(query, location);
        break;
      case 'barber':
        leads = await scrapeBarber(query, location);
        break;
      case 'chef':
        leads = await scrapeChef(query, location);
        break;
      case 'realtor':
        leads = await scrapeRealtor(query, location);
        break;
      default:
        return res.status(400).json({ success: false, error: 'Invalid industry' });
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
