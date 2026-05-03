import { Lead } from '../store/leads';
import { getFirecrawlClient, getMockLeads, calculateScore } from './firecrawl';
import { v4 as uuidv4 } from 'uuid';

export const scrapePhotography = async (query: string, location: string): Promise<Lead[]> => {
  const client = getFirecrawlClient();
  if (!client) return getMockLeads('photography', query, location);

  try {
    // In a real scenario, we would use search and scrapeUrl
    // For now, we simulate the logic using the client
    const searchResult = await client.search(`${query} ${location} photography`, {
      limit: 10,
    });

    if (!searchResult.success) {
        return getMockLeads('photography', query, location);
    }

    return searchResult.data.map((item: any) => ({
      id: uuidv4(),
      name: item.title || 'Unknown',
      business: item.title || 'Unknown',
      email: item.email || null,
      phone: item.phone || null,
      website: item.url || null,
      address: item.address || location,
      source: 'google',
      score: calculateScore({ email: item.email, phone: item.phone, website: item.url }),
      tags: ['photography', location.toLowerCase()],
      notes: item.description || null,
      scraped_at: new Date().toISOString(),
      industry: 'photography'
    }));
  } catch (error) {
    console.error('Photography scrape error:', error);
    return getMockLeads('photography', query, location);
  }
};
