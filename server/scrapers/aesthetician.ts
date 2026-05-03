import { Lead } from '../store/leads';
import { getFirecrawlClient, getMockLeads, calculateScore, withRetry } from './firecrawl';
import { v4 as uuidv4 } from 'uuid';

export const scrapeAesthetician = async (query: string, location: string): Promise<Lead[]> => {
  const client = getFirecrawlClient();
  if (!client) return getMockLeads('aesthetician', query, location);

  try {
    const searchResult = await withRetry(() =>
      client.search(`${query} ${location} aesthetician skin care`, { limit: 10 })
    );

    if (!searchResult.success) return getMockLeads('aesthetician', query, location);

    return searchResult.data.map((item: any) => ({
      id:         uuidv4(),
      name:       item.title || 'Unknown',
      business:   item.title || 'Unknown',
      email:      item.email   || null,
      phone:      item.phone   || null,
      website:    item.url     || null,
      address:    item.address || location,
      source:     'yelp',
      score:      calculateScore({ email: item.email, phone: item.phone, website: item.url }),
      tags:       ['aesthetician', location.toLowerCase()],
      notes:      item.description || null,
      scraped_at: new Date().toISOString(),
      industry:   'aesthetician',
    }));
  } catch (error) {
    console.error('Aesthetician scrape error (after retries):', error);
    return getMockLeads('aesthetician', query, location);
  }
};
