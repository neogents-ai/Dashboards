# Landing Page Redesign — Next Session Checkpoint

**Date:** 2026-05-23  
**Status:** Phase 2 Complete — Mockup Selected

---

## Decision: Mockup D Wins 🎉

**Selected Direction:** DeepMind × Apple Glass  
**Route:** `/v3/deepmind`  
**File Location:** `src/components/mockups/neo-landing-v3-deepmind-glass/`

### Why Mockup D
- Pearlescent gradient background with radial blobs (no flat dark)
- Liquid glass panels with backdrop-blur + cursor-reactive light reflection
- Intelligence orb animation (DeepMind-inspired, rotating gradient sphere)
- Glass dock at footer with action buttons
- "NORI is thinking…" indicator for live status
- Thin, elegant display fonts (Plus Jakarta Sans @ 300 weight)
- Pill-shaped buttons and 16–32px rounded corners (smooth, not over-rounded)
- Light theme with cool blue + gold accents per section
- Card hover states: depth lift + enhanced glow
- Live widgets: count-up stats, KPI ticker, animated status dots
- Distinct from vibe-coded aesthetic (no Playfair, no generic amber, no shadcn-default cards)

---

## Phase 3 — Apply Winner

### What to Do
1. **Merge Mockup D into production landing page**
   - Current landing: `src/components/mockups/neo-landing-v2/LandingPageFull.tsx`
   - Winning mockup: `src/components/mockups/neo-landing-v3-deepmind-glass/LandingPageV3.tsx`
   - Action: Replace `LandingPageFull.tsx` with `LandingPageV3.tsx` (or rename and merge)

2. **Update routing**
   - `src/App.tsx` → change `/` route from `<LandingPageFull />` to `<LandingPageV3 />`
   - Keep `/v3/*` routes as design history for reference

3. **Verify styles are loaded**
   - Ensure `_styles.css` is imported in Mockup D component
   - Check that Tailwind + custom CSS coexist without conflicts

4. **Test in browser**
   - `npm run dev`
   - Visit `/` → should see new Mockup D landing page
   - Verify:
     - Deep Field Gallery animates ✓
     - All sections render (hero, features, industries, testimonials, pricing, waitlist, footer) ✓
     - Card hover states fire on every card ✓
     - Glass orb and glass dock animate ✓
     - "NORI is thinking…" indicator pulses ✓
     - Light theme is visible (no `#0c0c0c` domination) ✓

5. **Lighthouse audit**
   - Performance ≥ 85
   - Accessibility ≥ 95
   - No regressions on existing dashboard routes (`/photography`, `/realtor`, `/barber`, etc.)

6. **Deploy to production**
   - Build: `npm run build`
   - Test production build locally: `npm run preview`
   - Deploy to OCI VPS (or your hosting)

---

## Files to Reference

**Winning Mockup (Phase 2 output):**
- `src/components/mockups/neo-landing-v3-deepmind-glass/LandingPageV3.tsx`
- `src/components/mockups/neo-landing-v3-deepmind-glass/_styles.css`

**Shared Components (reused across all mockups, safe to keep):**
- `src/components/shared/DeepFieldGallery.tsx` — header gallery
- `src/hooks/useCountUp.ts` — animated counters
- `src/data/landing.ts` — testimonials, features, industries, pricing, stats

**Current (to be replaced):**
- `src/components/mockups/neo-landing-v2/LandingPageFull.tsx` — old vibe-coded design

**Routes (in App.tsx):**
- `/` → currently `LandingPageFull`, needs to become `LandingPageV3` from Mockup D
- `/v3` → index page with all 4 mockups (keep for reference or delete after Phase 3)
- `/v3/editorial`, `/v3/serif-mono`, `/v3/condensed`, `/v3/deepmind` → optional to delete after merge

---

## Notes

- **No hybrid merge needed** — Mockup D is complete and production-ready
- **Keep losers as design history** — `/v3` routes are useful for future iterations or stakeholder reference
- **Test existing routes** — before shipping, verify `/photography`, `/realtor`, `/barber`, `/chef` still work
- **Dark theme cap** — Mockup D intentionally uses light pearlescent background, avoiding the all-dark aesthetic of neogents.io

---

## Quick Start Next Session

```bash
cd C:\Users\Admin\Desktop\neo-gents-os\Dashboards\artifacts\mockup-sandbox

# Start dev server
npm run dev

# Open browser
# http://localhost:23636/

# Replace old landing with Mockup D
# Edit src/App.tsx, change "/" route to use LandingPageV3 from neo-landing-v3-deepmind-glass

# Test and deploy
npm run build
npm run preview
```

---

**Status:** Ready for Phase 3 execution. No blockers.



-------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
---

# Dashboard Redesign Session — 2026-05-23

## Landing Page Wiring ✓ Complete

**Changes made to `artifacts/mockup-sandbox/src/components/mockups/neo-landing-v2/LandingPageFull.tsx`:**

1. **Hero "See How It Works" button** (line 263–265)
   - Changed `onClick={() => setModalOpen(true)}` → `onClick={() => scrollTo('industries')}`
   - Now scrolls to Industries section instead of opening modal

2. **Renamed industry** (line 103)
   - "Barber" → "Barber / Stylist"
   - Features updated: "Cut Library & Portfolio" → "Cut & Color Library"
   - Features updated: "Booksy Lead Sync" → "Booksy + IG Lead Sync"
   - Waitlist select option label updated (value stays same to avoid breaking form)

3. **Per-industry demo button routing** (line 365–374)
   - Replaced slug-based routing with explicit label→route map
   - Now uses: `routeByLabel[ind.label]` instead of `/dashboard/{slug}`
   - Routes: /photography, /aesthetician, /barber, /chef, /realtor

**Verification:** All demo buttons tested, routes match App.tsx handlers ✓

---

## Research Deliverables ✓ Complete

Saved to `C:\Users\Admin\Desktop\neo-gents-vault\research\dashboard-redesign\`:

1. **glass-ui-research.md**
   - 11 sections: visual language, CSS implementation, anti-patterns, color/typography per vertical
   - 8 reference products: Linear, Arc, Raycast, Vision OS, Things 3, macOS Control Center, iOS 26 widgets, Notion Calendar
   - 5 production-ready CSS snippets
   - Pre-ship review checklist

2. **collapsible-layouts-research.md**
   - Pattern comparison: accordion, tabs, expand-on-demand cards, sticky nav, drawers
   - IA recommendation: bottom tab bar + card-stack home + multi-open accordion + bottom sheets
   - Mobile specs (iOS/Material tap-target guidelines)
   - Accessibility guidance (Radix Collapsible + ARIA disclosure)
   - 3 reference apps: GlossGenius, Square Appointments, Linear

---

## Dashboard Redesign — 4 Theme Assignment

### Approved Theme Map
| Dashboard | Style Reference | Accent Color | Canvas Tint | Status |
|---|---|---|---|---|
| **Photography** | Raycast | Pure monochrome (B&W) + one accent | Near-neutral | Pending |
| **Aesthetician** | Vision OS Materials | Sand `#d6c4a8` or sage `#84a98c` | Soft cream tint | Pending |
| **Barber** | Notion Calendar | Warm amber `#f59e0b` or deep red `#dc2626` | Warm brown tint | Pending |
| **Hairstylist** | GlossGenius | Rose `#f43f5e` or violet `#8b5cf6` | Warm pink tint | Pending |
| **Popup Chef** | LineSight Coming Soon | — | Solid white bg | Pending |

### Popup Chef → LineSight Coming Soon
- Background: Solid white (user will drop logo PNG)
- Logo asset location: `mockup-sandbox/public/images/linesight-logo.png`
- Copy: "Ai Ops Copilot" subline + "Coming Soon"
- File to edit: `src/components/mockups/neo-chef/DashboardChef.tsx`

---

## Implementation Queue (Next Steps)

1. **Hairstylist first** — GlossGenius (editorial pink/violet)
2. **Photographer second** — Raycast (clean monochrome)
3. **Aesthetician third** — Vision OS (spa-soft glass layering)
4. **Barber fourth** — Notion Calendar (warm brown)
5. **Chef last** — LineSight coming-soon placeholder

### Key Constraints
- React components only, no vibe-coded text
- Collapsible layout per research: bottom tab bar + card-stack home + inline accordion + bottom sheets
- Glass CSS from glass-ui-research.md (sections 2.1–2.6)
- Mobile-first, accessibility maintained

### Dev Server
```bash
cd C:\Users\Admin\Desktop\neo-gents-os\Dashboards\artifacts\mockup-sandbox
npm run dev
# http://localhost:23636
```

Routes: / (landing), /photography, /aesthetician, /barber, /hairstylist, /chef, /realtor

---

**Session Note:** Model switched to Haiku. All edits tracked in this file going forward.
