# Changelog

All notable changes to the NEO Gents Dashboards affiliate page and related build configuration.

## [Unreleased] - 2026-06-10

### Changed
- **Affiliate page hero copy**: restored the founder's original headline — "Did You Just Get Laid Off? Turn Your Network into Income" — while keeping the new supporting paragraph and $78–$458 commission framing.
- **Affiliate program model**: playbook and page now reflect a flat-fee commission structure ($78 Starter / $190 Pro / $286 Agency / $458 Custom) instead of the previous 20%-of-first-year-revenue model.
- **Folder structure**: renamed `artifacts/mockup-sandbox` to `artifacts/neogents-dashboard-verticals` to accurately describe its contents. Updated all build/deploy references (`wrangler.toml`, `netlify.toml`, `package.json`, `server.js`, `render.yaml`, `README.md`, post-merge script).

### Fixed
- **Affiliate signup submission**: form now submits to the backend first and uses the returned `referralCode`. Formspree fallback is optional and no longer blocks signup if `VITE_FORMSPREE_AFFILIATE_ENDPOINT` is missing.
- **Smooth scroll navigation**: replaced broken `href="#signup"` / `href="#how"` hash anchors with a `ScrollButton` helper that smooth-scrolls to the target section.
- **Footer links**: Terms and Privacy links now route correctly via `/#/terms` and `/#/privacy` instead of dead `href="#"` anchors.
- **Earnings copy consistency**: page and playbook now both state "$78–$458 per referral" and "paid within 30 days".

### Added
- **Playwright test suite** for the affiliate page (`tests/affiliate.spec.ts`):
  - verifies branded hero and valid footer links
  - verifies signup form submits to the backend and displays the returned referral code
- **Affiliate playbook update** (`AFFILIATE-PLAYBOOK.md`): rewritten to match the flat-fee Option A commission model, tier benefits, and payout mechanics.

### Build / Deploy
- Verified production build passes (`npm run build`).
- Verified Chromium Playwright tests pass (`npx playwright test --project=chromium tests/affiliate.spec.ts`).

### Notes
- Firefox and WebKit browser binaries are not installed locally; tests default to Chromium-only on this machine unless `npx playwright install` is run.
- Local preview server runs on the configured Vite preview port (default `3000`).
