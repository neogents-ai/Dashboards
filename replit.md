# NEO Gents Dashboard Platform

## Project Overview

A modular GHL-style operating platform for creative service professionals. Mockup sandbox for rapid UI exploration. Photography vertical is the lead vertical — others (Aesthetician, Barber, Realtor) come next.

## Architecture

- **Type:** Mockup sandbox (Vite + React + Tailwind + shadcn/ui)
- **Location:** `artifacts/mockup-sandbox/`
- **Dev server port:** 23636 (proxied via `/__mockup/`)
- **Domain:** 6ed83ce5-5fe4-408e-ba60-f20390d31166-00-1yu07z1qvii0s.picard.replit.dev

## Mockup Components

### Landing Page (Photography)
- **File:** `artifacts/mockup-sandbox/src/components/mockups/neo-landing/LandingPage.tsx`
- **Preview:** `/__mockup/preview/neo-landing/LandingPage`
- **Signature Feature:** Deep 3D scattered photo field — 26 cards at independent x/y/z positions, z-drift makes cards appear from depth and recede back, true CSS perspective + per-card blur/scale/opacity driven by z-value. Cards wrap with fade on boundaries.
- **Photos:** `/__mockup/images/neo_1.png` through `neo_10.png`
- **Sections:** Hero (3D gallery) → Features → Industries → Waitlist Form → Footer

### Photography Dashboard
- **File:** `artifacts/mockup-sandbox/src/components/mockups/neo-dashboard/Dashboard.tsx`
- **Preview:** `/__mockup/preview/neo-dashboard/Dashboard`
- **Tabs (all fully built, fully interactive):**
  - Dashboard — Overview: KPIs, AI sorter, bookings, pipeline, social, model dev, messages
  - Gallery & AI Sort — Full gallery with style preset selector + masonry grid
  - Bookings — Week-view calendar + client detail panel + upcoming list
  - Leads & CRM — Full Kanban (New → Quoted → Booked → Shot → Delivered → Reviewed) + lead sources
  - Social Media — Platform connections + content scheduler + post queue
  - Model Dev — Model roster with progress + course catalog + assign/create
  - Content Studio — Content pipeline + AI repurpose + in-app editor
  - Reviews — Star ratings + review cards + pending requests
  - Settings — Profile, branding, integrations, billing

## Planned Vertical Dashboards (Phase 2)

Each reuses the same sidebar + tab shell with industry-specific content:

| Vertical | Unique Module | Lead Gen Focus |
|---|---|---|
| Aesthetician | Service menu + rebooking reminders + before/after queue | Firecrawl: local salon searchers |
| Barber | Chair availability + retail upsell tracker | Firecrawl: local men's grooming |
| Popup Chef/Vendor | Event calendar + menu drops + pre-order flow | Firecrawl: local food events |
| Realtor | Listing engine + showing reminders + neighborhood content | Firecrawl: local buyer/seller leads |

All verticals include:
- Lead generation via Firecrawl MCP (web scraping for industry-specific prospects)
- CRM pipeline, booking, AI action center, content studio, reviews

## Lead Gen via Firecrawl (Planned Backend)

Each dashboard will have a "Find Leads" tab powered by Firecrawl API:
- Firecrawl scrapes industry directories, social media, local business listings
- Results fed into CRM pipeline as "New" stage leads
- AI qualifies and drafts outreach messages

## GitHub Integration (Pending)

Target: https://github.com/neogents-ai/neo-gents-website
Branch: dashboards-tab
Status: Repo returned 404 — needs access (make public or provide PAT token)

## Stack (Planned Production)

- Frontend: React + Vite (graduate from mockup sandbox)
- UI: Tailwind + shadcn/ui
- Backend: Node/Express + Supabase
- AI: Provider-agnostic wrapper (OpenAI/Anthropic)
- Lead Gen: Firecrawl MCP
- Scheduling: Supabase cron / Edge Functions
- Auth: Supabase Auth (per-photographer branded workspaces)
