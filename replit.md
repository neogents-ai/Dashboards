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
- `GET /api/leads/:industry?page=1&limit=20` — get stored leads (paginated)
- `POST /api/leads/:industry` — save a lead (validated, sanitized)
- `DELETE /api/leads/:industry/:id` — delete a lead (UUID format enforced)
- `GET /health` — health check + API version

### Security Hardening (completed)
- **helmet** — security headers on all responses (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, etc.)
- **CORS** — restricted to `*.replit.dev` + `localhost` only
- **Rate limiting** — scrape: 30 req/10min; stored routes: 60 req/min per IP
- **Input sanitization** — all string inputs stripped of `<>"'\`` chars, length-capped
- **Industry allowlist** — all routes validate against `['photography','aesthetician','barber','chef','realtor']`
- **UUID validation** — DELETE route rejects non-UUID id params (blocks path traversal)
- **Body size cap** — `express.json({ limit: '16kb' })`
- **Global error handler** — no stack traces ever leak to clients
- **Request logging** — `[INFO/WARN/ERROR] METHOD PATH STATUS — Nms` on every request
- **X-API-Version: 1** — stamped on all responses
- **Error shape** — `{ success: false, error: string, code: string }` consistently

### Industry Scrapers (`server/scrapers/`)
- `firecrawl.ts` — Firecrawl client wrapper, lead scoring, mock data fallback, `withRetry()` helper
- `photography.ts` — wedding/event directories (2 retries with backoff)
- `aesthetician.ts` — Yelp spa, StyleSeat, beauty directories (2 retries)
- `barber.ts` — Yelp barbershop, Booksy public listings (2 retries)
- `chef.ts` — Eventbrite food events, supper club directories (2 retries)
- `realtor.ts` — Zillow FSBO, expired MLS, real estate directories (2 retries)

### CSS Input System (completed)
Each industry folder defines its own fully-styled input class in `_group.css`:
- `neo-input-light` (photography) — amber focus ring
- `neo-aesthetician-input-light` — pink focus ring
- `neo-barber-input-light` — blue focus ring
- `neo-chef-input-light` — orange focus ring
- `neo-realtor-input-light` — indigo focus ring
- `neo-dashboard-input` / `neo-dashboard-select` — dark glass style, amber focus (all dashboards)
All inputs: 10px radius, hover state, placeholder color, focus glow ring, `appearance:none` on selects.

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
