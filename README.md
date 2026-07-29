# NEO Gents Dashboards

Marketing site + vertical dashboards + affiliate system for **neogents.tech**.

## What’s inside

- `artifacts/mockup-sandbox/` — Vite + React + TypeScript SPA
- `functions/` — Cloudflare Pages Functions (serverless API)
- `migrations/` — Cloudflare D1 SQL migrations
- `wrangler.toml` — Pages + D1 configuration
- `server/` — Legacy Express API (kept for reference; no longer used in production)
- `render.yaml` — Legacy Render web service config (kept for reference)

## Public routes

| Route | What it shows |
|---|---|
| `/` | Marketing landing page |
| `/#/realtor` | Realtor dashboard demo |
| `/#/barber` | Barber / hairstylist dashboard demo |
| `/#/photography` | Photography dashboard demo |
| `/#/aesthetician` | Aesthetician dashboard demo |
| `/#/chef` | Popup chef coming-soon page |
| `/#/creators` | Creators dashboard demo |
| `/#/affiliates` | Public affiliate signup page |
| `/#/affiliates/admin` | Affiliate admin dashboard (token-protected) |
| `/#/audit` | Revenue Leak Audit intake form |

## Local development

```bash
# Install root dependencies (wrangler, workers-types, etc.)
npm install

# Install SPA dependencies and run the dev server
cd artifacts/mockup-sandbox
npm install
npm run dev          # http://localhost:5173
```

The affiliate signup form will post to the Cloudflare Pages Functions backend. To test the backend locally:

```bash
# In a separate terminal, run Wrangler dev (uses a local D1 simulator)
wrangler pages dev artifacts/mockup-sandbox/dist --d1 DB=neogents-affiliates
```

## Environment variables

Copy `.env.example` to `.env` and fill in:

- `VITE_FORMSPREE_AUDIT_ENDPOINT` — Formspree form for the Revenue Leak Audit
- `VITE_FORMSPREE_AFFILIATE_ENDPOINT` — Formspree form for affiliate signups
- `VITE_API_BASE_URL` — optional; leave empty for same-origin API calls, or set to `https://neogents.tech` during local dev
- `AFFILIATE_ADMIN_TOKEN` — secret token for `/affiliates/admin`

`AFFILIATE_ADMIN_TOKEN` should be set as a **Cloudflare Pages secret** in production (not committed to `.env`).

## Affiliate system

Signups flow through two channels:

1. **Cloudflare Pages Functions** → D1 database + admin dashboard (`functions/api/affiliates/signup.ts`)
2. **Formspree** → your inbox for human review (`VITE_FORMSPREE_AFFILIATE_ENDPOINT`)

Admin endpoints require a `Bearer <AFFILIATE_ADMIN_TOKEN>` token.

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/affiliates/signup` | public | Create affiliate |
| GET | `/api/affiliates` | admin | List affiliates |
| PATCH | `/api/affiliates/{id}/status` | admin | Approve / reject / suspend |
| GET | `/api/affiliates/{referralCode}` | public | Affiliate profile |
| POST | `/api/affiliates/click` | public | Record a click |
| POST | `/api/affiliates/conversion` | admin | Record a conversion |
| PATCH | `/api/affiliates/conversion/{id}/paid` | admin | Mark commission paid |
| GET | `/api/affiliates/stats/admin` | admin | Admin stats + conversions |
| GET | `/api/affiliates/stats/{referralCode}` | public | Affiliate public stats |

## Branch strategy

- `main` — production branch, deployed to Cloudflare Pages
- `vertical/realtor`, `vertical/barber`, `vertical/photography`, `vertical/aesthetician`, `vertical/chef`, `vertical/creators` — isolated workspaces for each vertical
- `feature/affiliates-full-system` — affiliate system work
- `feature/cloudflare-pages-backend` — Cloudflare Pages + D1 backend migration

Work on a vertical in its branch, then open a PR to merge into `main` when ready.

## Deploy to Cloudflare Pages

### 1. Create the D1 database

```bash
npx wrangler d1 create neogents-affiliates
```

Copy the returned `database_id` into `wrangler.toml` under `[[d1_databases]]`.

### 2. Run migrations

```bash
npx wrangler d1 migrations apply neogents-affiliates
```

### 3. Set secrets

```bash
npx wrangler pages secret put AFFILIATE_ADMIN_TOKEN
npx wrangler pages secret put FORMSPREE_AFFILIATE_ENDPOINT
```

### 4. Deploy

```bash
npm run build
npm run deploy
```

Or connect the GitHub repo in the Cloudflare dashboard and use the following Pages build settings:

- **Build command:** `npm run build`
- **Build output directory:** `artifacts/mockup-sandbox/dist`

Cloudflare will auto-detect `functions/` and deploy the API alongside the static site.

## Onboarding a new client

1. Clone the repo and switch to the target vertical branch.
2. Update the demo business name / user name in the dashboard component.
3. Merge the vertical branch into `main`.
4. Deploy `main` to Cloudflare Pages.
5. Share the vertical route (e.g., `https://neogents.tech/#/realtor`) with the client.
