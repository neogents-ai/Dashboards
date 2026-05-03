# NEO Gents Dashboard Platform

## Project Overview

A modular GHL-style operating platform for creative service professionals (Photography, Aesthetician, Barber, Popup Chef, Realtor). Full-stack: Express API backend + Vite/React mockup frontend. Each industry vertical has a landing page, a full 9-tab dashboard, and a live lead scraper powered by Firecrawl.

## Architecture

### Frontend (Mockup Sandbox)
- **Type:** Vite + React + Tailwind + shadcn/ui
- **Location:** `artifacts/mockup-sandbox/`
- **Dev server port:** 23636 (proxied via `/__mockup/`)
- **Domain:** 6ed83ce5-5fe4-408e-ba60-f20390d31166-00-1yu07z1qvii0s.picard.replit.dev
- **API proxy:** `/api/*` → `http://localhost:3001` (set in vite.config.ts)

### Backend (Express API Server)
- **Location:** `server/`
- **Port:** 3001
- **Runtime:** TypeScript via ts-node
- **Workflow:** `NEO Gents API Server`
- **Key env vars:** `FIRECRAWL_API_KEY` (falls back to mock data if not set)

### API Endpoints
- `POST /api/scrape` — scrape leads by industry (`photography|aesthetician|barber|chef|realtor`)
- `GET /api/leads/:industry` — get stored leads for an industry
- `POST /api/leads/:industry` — save a lead
- `DELETE /api/leads/:industry/:id` — delete a lead
- `GET /health` — health check

### Industry Scrapers (`server/scrapers/`)
- `firecrawl.ts` — Firecrawl client wrapper, lead scoring, mock data fallback
- `photography.ts` — wedding/event directories
- `aesthetician.ts` — Yelp spa, StyleSeat, beauty directories
- `barber.ts` — Yelp barbershop, Booksy public listings
- `chef.ts` — Eventbrite food events, supper club directories
- `realtor.ts` — Zillow FSBO, expired MLS, real estate directories

## Mockup Components

### NORI Brand Assets
- **Image (no BG):** `/__mockup/images/nori_nobg.png` — transparent PNG, used everywhere
- **Animation:** `@keyframes noriFloat` in each `_group.css` — float/rotate/glow cycle 2.4s infinite alternate
- **Badge:** "Powered by N.O.R.I." — appears in sidebar of every dashboard and footer of every landing page
- **Brand colors:** Emerald Green `#00B359` (NORI), Gold `#D4A017` (NEO wordmark), Depth Black `#0D0D0D`

### Landing Pages (5 verticals)
| Vertical | File | Preview Path | Accent |
|---|---|---|---|
| Photography | `neo-landing/LandingPage.tsx` | `/neo-landing/LandingPage` | Amber |
| Aesthetician | `neo-aesthetician/LandingAesthetician.tsx` | `/neo-aesthetician/LandingAesthetician` | Pink |
| Barber | `neo-barber/LandingBarber.tsx` | `/neo-barber/LandingBarber` | Blue |
| Popup Chef | `neo-chef/LandingChef.tsx` | `/neo-chef/LandingChef` | Orange |
| Realtor | `neo-realtor/LandingRealtor.tsx` | `/neo-realtor/LandingRealtor` | Indigo |

All landing pages: deep 3D scattered photo field, industry-specific copy, NORI footer badge with float animation.

### Dashboards (5 verticals, 9 tabs each)
| Vertical | File | Preview Path | Accent | Signature Tab |
|---|---|---|---|---|
| Photography | `neo-dashboard/Dashboard.tsx` | `/neo-dashboard/Dashboard` | Amber | Model Dev |
| Aesthetician | `neo-aesthetician/DashboardAesthetician.tsx` | `/neo-aesthetician/DashboardAesthetician` | Pink `#EC4899` | Skin Tracker |
| Barber | `neo-barber/DashboardBarber.tsx` | `/neo-barber/DashboardBarber` | Blue `#3B82F6` | Cut Library |
| Popup Chef | `neo-chef/DashboardChef.tsx` | `/neo-chef/DashboardChef` | Orange `#F97316` | Menu Drop Engine |
| Realtor | `neo-realtor/DashboardRealtor.tsx` | `/neo-realtor/DashboardRealtor` | Indigo `#6366F1` | Neighborhood Intel |

All dashboards: NORI animated badge in sidebar, Leads tab with real `POST /api/scrape` API call + streaming log output.

### Standard Dashboard Tabs (all 5 verticals)
1. Dashboard — KPIs, AI suggestions, today's schedule, pipeline, social, messages
2. [Industry Signature Tab] — unique feature no competitor offers
3. Bookings — calendar view
4. Leads & CRM — Kanban pipeline + Find Leads (real Firecrawl API call)
5. Social Media — multi-platform hub
6. [Industry-specific tab] — Product Inventory / Staff & Chairs / Inventory & Costs / Transaction Tracker
7. Content Studio — AI content generator
8. Reviews — aggregated feedback
9. Settings

## Lead Generation Flow
1. User opens Leads tab → clicks "Find Leads"
2. Frontend POSTs to `/api/scrape` with `{ industry, query, location }`
3. Server calls Firecrawl API (or returns mock data if key not set)
4. Streaming log UI shows progress while request is in flight
5. Results rendered with score badge, source badge, email/phone/website chips
6. "Add to CRM" button saves lead to in-memory store via `POST /api/leads/:industry`

## GitHub Integration (Pending)
- Target: https://github.com/neogents-ai/neo-gents-website
- Branch: dashboards-tab
- Status: Repo returned 404 — needs access (make public or provide PAT token)

## Next Steps (Production Graduation)
- Supabase for persistent lead storage
- Auth (per-industry branded workspaces)
- Real Firecrawl API key → live scraping
- Graduate mockup to production Next.js app
- MCP server for real-time Firecrawl lead gen
