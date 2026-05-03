import FirecrawlApp from '@mendable/firecrawl-js';
import { v4 as uuidv4 } from 'uuid';
import { Lead } from '../store/leads';

const API_KEY = process.env.FIRECRAWL_API_KEY;

export const getFirecrawlClient = () => {
  if (!API_KEY) return null;
  return new FirecrawlApp({ apiKey: API_KEY });
};

export const calculateScore = (lead: Partial<Lead>): number => {
  let score = 30; // base score
  if (lead.email) score += 30;
  if (lead.phone) score += 20;
  if (lead.website) score += 10;
  return Math.min(score, 100);
};

export const getMockLeads = (industry: string, query: string, location: string): Lead[] => {
  console.log(`FIRECRAWL_API_KEY not set — returning mock data for ${industry}`);
  
  const mockNamesMap: Record<string, string[]> = {
    photography: ['Capture Moments', 'Lens & Light', 'Eternal Frames', 'Focus Studios'],
    aesthetician: ['Glow Skin Care', 'Pure Radiance', 'Zen Aesthetics', 'Velvet Skin'],
    barber: ['Sharp Cuts', 'The Grooming Lounge', 'Classic Fade', 'Iron & Hair'],
    chef: ['Taste of Home', 'Gourmet Pop-up', 'Flavor Fusion', 'The Nomadic Chef'],
    realtor: ['Dream Homes', 'City Living Realty', 'Elite Properties', 'Foundations Real Estate']
  };
  const mockNames: string[] = mockNamesMap[industry] || ['Business One', 'Business Two'];

  return mockNames.map((name: string, i: number) => ({
    id: uuidv4(),
    name: `${name} ${i + 1}`,
    business: `${name} ${i + 1}`,
    email: `contact@${name.toLowerCase().replace(/\s+/g, '')}.com`,
    phone: `(555) 123-${4567 + i}`,
    website: `https://${name.toLowerCase().replace(/\s+/g, '')}.com`,
    address: `${100 + i * 12} Main St, ${location}`,
    source: 'mock',
    score: 85,
    tags: [industry, location.split(',')[0].trim().toLowerCase()],
    notes: `Mock lead generated for ${query}`,
    scraped_at: new Date().toISOString(),
    industry
  }));
};
