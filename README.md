# NEO Gents Dashboards

Marketing site + vertical dashboards + affiliate system for **neogents.tech**.

## What’s inside

- `artifacts/mockup-sandbox/` — Vite + React + TypeScript SPA
- `functions/` — Cloudflare Pages Functions (serverless API)
- `migrations/` — Neon PostgreSQL schema
- `wrangler.toml` — Pages configuration
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
# Install root dependencies (wrangler, workers-types, neon, etc.)
npm install

# Install SPA dependencies and run the dev server
cd artifacts/mockup-sandbox
npm install
npm run dev          # http://localhost:5173
```

The affiliate signup form will post to the Cloudflare Pages Functions backend, which writes to Neon PostgreSQL. To test the backend locally you need a `DATABASE_URL` in scope.

## Environment variables

Copy `.env.example` to `.env` and fill in:

- `VITE_FORMSPREE_AUDIT_ENDPOINT` — Formspree form for the Revenue Leak Audit
- `VITE_FORMSPREE_AFFILIATE_ENDPOINT` — Formspree form for affiliate signups
- `VITE_API_BASE_URL` — optional; leave empty for same-origin API calls, or set to `https://neogents.tech` during local dev
- `DATABASE_URL` — Neon PostgreSQL connection string

`DATABASE_URL` and `AFFILIATE_ADMIN_TOKEN` must be set as **Cloudflare Pages secrets** in production (not committed to `.env`).

## Affiliate system

Signups flow through two channels:

1. **Cloudflare Pages Functions** → Neon PostgreSQL + admin dashboard (`functions/api/affiliates/signup.ts`)
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

## Database schema

The affiliate tables live in **Neon PostgreSQL**. Run `migrations/0001_initial.sql` against your Neon project to create the `affiliates`, `clicks`, and `conversions` tables.

## Branch strategy

- `main` — production branch, deployed to Cloudflare Pages
- `vertical/realtor`, `vertical/barber`, `vertical/photography`, `vertical/aesthetician`, `vertical/chef`, `vertical/creators` — isolated workspaces for each vertical
- `feature/affiliates-full-system` — affiliate system work
- `feature/cloudflare-pages-backend` — Cloudflare Pages + Neon backend migration

Work on a vertical in its branch, then open a PR to merge into `main` when ready.

## Deploy to Cloudflare Pages

### 1. Provision Neon PostgreSQL

Create a new Neon project. Copy the connection string from the Neon dashboard.

### 2. Apply the schema

Connect to your Neon database and run:

```sql
-- contents of migrations/0001_initial.sql
```

Or use the Neon SQL editor to paste it.

### 3. Log in to Wrangler

```bash
npx wrangler login
```

### 4. Set secrets

```bash
npx wrangler pages secret put DATABASE_URL
npx wrangler pages secret put AFFILIATE_ADMIN_TOKEN
npx wrangler pages secret put FORMSPREE_AFFILIATE_ENDPOINT
```

### 5. Deploy

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
