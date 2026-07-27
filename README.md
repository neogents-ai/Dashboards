# NEO Gents Dashboards

Marketing site + vertical dashboards + affiliate system for **neogents.tech**.

## What’s inside

- `artifacts/mockup-sandbox/` — Vite + React + TypeScript SPA
- `server/` — Express API (leads, scrapers, affiliate tracking)
- `server.js` — Minimal static-file fallback for local preview
- `render.yaml` — Render web service config (builds SPA + API, runs combined server)

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
# 1. Install and run the SPA
 cd artifacts/mockup-sandbox
 npm install
 npm run dev          # http://localhost:5173

# 2. In a second terminal, run the API server
 cd server
 npm install
 cp ../../.env.example ../../.env   # fill in values
 npm run dev                        # http://localhost:3001
```

## Environment variables

Copy `.env.example` to `.env` and fill in:

- `EMAIL_USER` / `EMAIL_PASS` — Gmail account for affiliate signup notifications
- `AFFILIATE_ADMIN_TOKEN` — secret token for `/affiliates/admin`
- `DATA_DIR` — where the affiliate JSON store lives (defaults to `server/data`)
- `VITE_API_BASE_URL` — optional; leave empty for same-origin API calls

## Branch strategy

- `main` — production branch, deployed to Render
- `vertical/realtor`, `vertical/barber`, `vertical/photography`, `vertical/aesthetician`, `vertical/chef`, `vertical/creators` — isolated workspaces for each vertical
- `feature/affiliates-full-system` — affiliate system work

Work on a vertical in its branch, then open a PR to merge into `main` when ready.

## Deploy to Render

1. Connect `neogents-ai/Dashboards` to Render.
2. Render reads `render.yaml` and deploys the `neogents-tech` web service.
3. The build step compiles both the SPA and the API server.
4. The start command runs the combined Express server on the assigned port.
5. Set required env vars in the Render dashboard:
   - `AFFILIATE_ADMIN_TOKEN`
   - `EMAIL_USER`
   - `EMAIL_PASS`

## Onboarding a new client

1. Clone the repo and switch to the target vertical branch.
2. Update the demo business name / user name in the dashboard component.
3. Merge the vertical branch into `main`.
4. Deploy `main` to Render.
5. Share the vertical route (e.g., `https://neogents.tech/#/realtor`) with the client.
