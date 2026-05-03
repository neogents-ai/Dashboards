import { Lead } from '../store/leads';
import { getFirecrawlClient, getMockLeads, calculateScore, withRetry } from './firecrawl';
import { v4 as uuidv4 } from 'uuid';

export const scrapeBarber = async (query: string, location: string): Promise<Lead[]> => {
  const client = getFirecrawlClient();
  if (!client) return getMockLeads('barber', query, location);

  try {
    const searchResult = await withRetry(() =>
      client.search(`${query} ${location} barbershop fade`, { limit: 10 })
    );

    if (!searchResult.success) return getMockLeads('barber', query, location);

    return searchResult.data.map((item: any) => ({
      id:         uuidv4(),
      name:       item.title || 'Unknown',
      business:   item.title || 'Unknown',
      email:      item.email   || null,
      phone:      item.phone   || null,
      website:    item.url     || null,
      address:    item.address || location,
      source:     'booksy',
      score:      calculateScore({ email: item.email, phone: item.phone, website: item.url }),
      tags:       ['barber', location.toLowerCase()],
      notes:      item.description || null,
      scraped_at: new Date().toISOString(),
      industry:   'barber',
    }));
  } catch (error) {
    console.error('Barber scrape error (after retries):', error);
    return getMockLeads('barber', query, location);
  }
};
