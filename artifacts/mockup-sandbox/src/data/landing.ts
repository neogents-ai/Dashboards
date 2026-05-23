import type { ElementType } from 'react';
import {
  Camera, Calendar, Share2, Zap, Users, TrendingUp,
  Scissors, ChefHat, Home, Sparkles, Mic,
} from 'lucide-react';

export const HERO_IMAGES = Array.from({ length: 10 }, (_, i) => `/images/neo_${i + 1}.png`);

export const TESTIMONIALS = [
  { name: 'Marcus L.', role: 'Wedding Photographer · Atlanta', text: 'I was spending 4 hours a week on client communication. NEO Gents cut that to 20 minutes. The AI lead scraper alone paid for 6 months of the subscription in the first week.', rating: 5 },
  { name: 'Zara M.', role: 'Aesthetician · Los Angeles', text: 'The Skin Tracker is unlike anything I\'ve seen. My clients love the visual treatment timeline. Rebooking rates are up 40% since I started using it.', rating: 5 },
  { name: 'René D.', role: 'Popup Chef · Chicago', text: 'Managing 3 popup events a week used to be chaos. Now everything — tickets, menus, guest lists — runs through one dashboard. I\'ve doubled my events without doubling my stress.', rating: 5 },
];

export const HOW_STEPS = [
  { n: '01', title: 'Connect Your Profiles', desc: 'Link your social media, booking platforms, and portfolio sites. NEO Gents pulls everything into one unified dashboard in seconds.' },
  { n: '02', title: 'AI Finds Your Leads', desc: 'N.O.R.I. Agent scrapes the web for warm, qualified leads in your area and industry. Wake up to a fresh pipeline every morning.' },
  { n: '03', title: 'Book, Create & Grow', desc: 'Manage bookings, publish content, and track your revenue — all from one beautiful, industry-tailored workspace.' },
];

export type Feature = { Icon: ElementType; title: string; desc: string; wide?: boolean };

export const FEATURES: Feature[] = [
  { Icon: Zap, title: 'Lead Radar', desc: 'N.O.R.I. Agent scrapes directories, social profiles, and listings every morning. Wake up to a fresh, scored pipeline — for any industry.' },
  { Icon: Users, title: 'Agentic CRM', desc: 'Kanban pipeline, contact profiles, and automated follow-ups. Every lead tracked from first touch to booked, paid client.' },
  { Icon: TrendingUp, title: 'Revenue Dashboard', desc: 'Live revenue across invoices, retainers, and packages. Know exactly where your business stands — always.' },
  { Icon: Share2, title: 'Social Engine', desc: 'Schedule and publish across Instagram, TikTok, Facebook, and LinkedIn from one hub. Turn every job into content.' },
  { Icon: Calendar, title: 'Smart Booking', desc: 'Clients book, pay deposits, and get automated reminders. Your calendar fills itself — no back-and-forth.' },
  { Icon: Sparkles, title: 'Content Studio', desc: 'AI-generated captions, emails, and ad copy tailored to your industry. Go from raw idea to published post in seconds.' },
  { Icon: Mic, title: 'N.O.R.I. Voice Intelligence', desc: 'Speak any command in any language — N.O.R.I. auto-detects it. Yoruba, Korean, Portuguese, English. Zero settings.', wide: true },
];

export type Industry = { label: string; Icon: ElementType; color: string; features: string[]; route: string };

export const INDUSTRIES: Industry[] = [
  { label: 'Photography',     Icon: Camera,   color: '#f59e0b', features: ['AI Gallery Sort & Culling', 'Wedding Lead Scraper', 'Smart Booking & Contracts', 'Model Dev Studio', 'Content Studio'], route: '/photography' },
  { label: 'Aesthetician',    Icon: Sparkles, color: '#EC4899', features: ['Skin Tracker Timeline', 'Beauty Lead Scraper', 'Appointment Scheduling', 'Product Inventory', 'Review Automation'], route: '/aesthetician' },
  { label: 'Barber / Stylist',Icon: Scissors, color: '#3B82F6', features: ['Cut & Color Library', 'Booksy + IG Lead Sync', 'Chair-Side Payments', 'Staff & Chairs Mgmt', 'Social Scheduler'], route: '/barber' },
  { label: 'Popup Chef',      Icon: ChefHat,  color: '#F97316', features: ['Menu Drop Engine', 'Event Lead Scraper', 'Ticket Management', 'Ingredient Costing', 'Guest Management'], route: '/chef' },
  { label: 'Realtor',         Icon: Home,     color: '#6366F1', features: ['Neighborhood Intel', 'FSBO & Expired Leads', 'Listing Showcase', 'Showing Scheduler', 'Transaction Tracker'], route: '/realtor' },
];

export const STATS = [
  { val: 2400,  label: 'Creative professionals', suffix: '+' },
  { val: 98000, label: 'Leads AI-scraped',       suffix: '+' },
  { val: 98,    label: 'Satisfaction rate',      suffix: '%' },
];

export const PRICING = [
  { tier: 'Starter', price: 0,  blurb: 'Your first 20 AI-scraped leads, free forever.',
    feats: ['20 leads/month via N.O.R.I.', '1 industry dashboard', 'Basic CRM (25 contacts)', '5 scheduled social posts', 'Community support'], cta: 'Get Started Free' },
  { tier: 'Pro',     price: 49, popular: true, blurb: 'Everything you need to run and grow your business.',
    feats: ['Unlimited AI lead scraping', 'Full 9-tab dashboard', 'Unlimited CRM contacts', 'Content Studio (all formats)', 'Signature industry feature', 'Social media scheduler', 'Review automation', 'Email support'], cta: 'Start Pro' },
  { tier: 'Agency',  price: 97, blurb: 'Run multiple verticals. Build a team.',
    feats: ['Everything in Pro', 'All 5 industry verticals', '3 team seats included', 'White-label branding', 'Advanced analytics', 'Priority support', 'Early access'], cta: 'Contact Sales' },
];
