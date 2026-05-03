# NEO Gents Dashboard Platform

## Project Overview

A modular GHL-style operating platform for creative service professionals, starting with Photography. Built as a mockup sandbox for rapid UI exploration before production build.

## Architecture

- **Type:** Mockup sandbox (Vite + React + Tailwind + shadcn/ui)
- **Location:** `artifacts/mockup-sandbox/`
- **Dev server port:** 23636 (proxied via `/__mockup/`)

## Mockup Components

### Landing Page
- **File:** `artifacts/mockup-sandbox/src/components/mockups/neo-landing/LandingPage.tsx`
- **Preview:** `/__mockup/preview/neo-landing/LandingPage`
- **Features:**
  - Physics-based floating photo gallery with real repulsion math (requestAnimationFrame)
  - 10 AI-generated editorial photography images
  - Depth of field simulation (blur, scale, opacity by z-depth)
  - Mouse repulsion + boundary repulsion
  - Scroll-reveal animations via IntersectionObserver
  - Dark editorial palette — Playfair Display + DM Sans
  - CTA + contact/waitlist form

### Photography Dashboard
- **File:** `artifacts/mockup-sandbox/src/components/mockups/neo-dashboard/Dashboard.tsx`
- **Preview:** `/__mockup/preview/neo-dashboard/Dashboard`
- **Features:**
  - Full-screen dark cockpit layout with left sidebar nav
  - Lead Pipeline (Kanban: New → Quoted → Booked → Shot → Delivered → Reviewed)
  - Today's Appointments widget
  - AI Action Center with suggested automated tasks
  - Content Studio mini-pipeline
  - Recent Conversations log
  - KPI metrics row (revenue, bookings, review score, content published)
  - Amber/gold accent on deep charcoal — premium feel

## Planned Verticals (Phase 2)
1. Photography (complete — MVP mockup)
2. Aestheticians / Barbers / Beauticians
3. Popup Chefs & Vendors
4. Real Estate Agents

## Industry-Specific Modules (per vertical)
- Lead inbox + CRM contacts + pipeline stages
- Booking + appointments + reminders
- Content calendar + content studio
- AI agents: receptionist, content, follow-up, scheduler, reporter
- Review request flows
- Offer/campaign tracker

## Stack (planned production)
- Frontend: React + Vite (or Next.js)
- UI: Tailwind + shadcn/ui
- Backend: Node/Express or Supabase
- AI layer: provider-agnostic wrapper
- Scheduling: cron jobs or Supabase scheduled functions
