# NEO Gents Affiliate Program — Product Requirements Document (PRD)

**Version:** 1.0  
**Date:** 2026-06-08  
**Author:** /solith-pdm (Product Manager Mode)  
**Status:** Draft — pending founder review

---

## 1. Executive Summary

The NEO Gents Affiliate Program is a referral system that pays individuals $78–$458 per business they refer to NEO Gents. The current implementation has a marketing landing page and a basic in-memory signup API. This PRD defines the product decisions and MVP scope required to launch a functional affiliate system.

**Current State:**
- Landing page (`AffiliatePage.tsx`) with calculator, FAQ, signup form
- Backend (`affiliates.ts`) with in-memory store, signup endpoint, hardcoded stats
- No persistent database, no payout automation, no referral tracking, no affiliate dashboard

**Target Launch:** v1 MVP within 2 sprints (4 weeks)

---

## 2. Decision Log

| # | Decision | Choice | Rationale |
|---|----------|--------|-----------|
| 1 | **Payout System** | **PayPal Payouts for v1; Stripe Connect for v2** | The target demographic (laid-off workers, side hustlers, non-tech audiences) is far more likely to already have a PayPal account than a Stripe Connect account. PayPal has lower KYC friction, which is critical for adoption at this stage. Stripe Connect's automated tax handling and professional infrastructure become worth the integration cost at v2 when affiliate volume exceeds ~50 active partners. |
| 2 | **Dashboard MVP** | **v1: Stats, link/QR, payout history, profile. v2: Analytics charts, marketing assets, leaderboard, automated payouts** | v1 must prove the core loop: share link → track conversion → get paid. Everything else is optimization. Marketing materials (one-pagers, email templates) are promised on the landing page but can be delivered manually via email for v1. |
| 3 | **Referral Tracking** | **Both URL parameter (`?ref=CODE`) and 60-day cookie** | URL params are required for QR codes and direct link sharing. Cookies capture delayed conversions (user clicks, browses, returns later). The backend must prioritize the cookie on conversion, with URL param as fallback. This maximizes attribution accuracy without adding complexity. |
| 4 | **Email Flow** | **5 emails: (1) signup confirmation, (2) approval notification, (3) new referral alert, (4) payout sent, (5) monthly digest** | Affiliates need immediate feedback (signup confirmation) and motivation (new referral alerts). The monthly digest keeps them engaged. Payout notifications build trust. All emails are transactional and low-volume enough to send via the existing nodemailer/Gmail setup for v1. |
| 5 | **Approval Flow** | **Manual review for v1; auto-approve for v2** | With 2 founding affiliates and a target of ~10–20 in the first quarter, manual review is trivial and adds a critical fraud/quality gate. The landing page already sets expectations ("within 24 hours"). Auto-approve makes sense only when volume exceeds admin capacity. |
| 6 | **Fraud Prevention** | **6 basic checks: email verification, duplicate detection, IP throttling, click-rate limits, $50 min payout threshold, PayPal email verification** | The current backend already has duplicate detection and rate limiting. Adding email verification and IP-based click throttling closes the most obvious attack vectors. A minimum payout threshold prevents micro-fraud and reduces admin overhead. |

---

## 3. MVP Feature List (v1)

### 3.1 Affiliate Landing Page (Existing — needs updates)
- [x] Commission tier calculator
- [x] FAQ with cookie disclosure
- [x] Signup form (name, email, phone optional, how they plan to share)
- [x] QR code display
- [ ] **Add**: Terms & Conditions checkbox (required for compliance)
- [ ] **Add**: Cookie consent banner (GDPR/CCPA)
- [ ] **Update**: FAQ to reflect actual payout method (PayPal)

### 3.2 Affiliate Dashboard (New — v1)
- [ ] **Stats Overview**: Total clicks, signups, conversions, total earnings, pending payout
- [ ] **Referral Link**: Copy-to-clipboard + QR code download
- [ ] **Payout History**: Table of past payouts with date, amount, method, status
- [ ] **Profile Settings**: Name, email, PayPal email, notification preferences
- [ ] **Status Badge**: Pending / Active / Inactive

### 3.3 Backend API (New / Extend)
- [ ] `POST /api/affiliates/signup` — existing, add email verification step
- [ ] `GET /api/affiliates/me` — authenticated affiliate profile + stats
- [ ] `PATCH /api/affiliates/me` — update profile (payout email, notifications)
- [ ] `GET /api/affiliates/:referralCode/stats` — public stats (for sharing)
- [ ] `POST /api/affiliates/track-click` — log click with IP + user-agent
- [ ] `POST /api/conversions` — called by billing system when a referred user pays
- [ ] `POST /api/affiliates/payouts` — admin-only: mark payout as sent
- [ ] `GET /api/affiliates/payouts` — affiliate's payout history

### 3.4 Referral Tracking System (New)
- [ ] Middleware to read `?ref=CODE` on landing page visit
- [ ] Set `neo_gents_ref` cookie with 60-day expiry
- [ ] On signup/payment, read cookie and attribute to affiliate
- [ ] Store conversion record: affiliateId, customerEmail, plan, commissionAmount, status (pending/paid)

### 3.5 Email System (Extend existing nodemailer)
- [ ] **Signup Confirmation**: Welcome + referral link + QR code + "pending approval" notice
- [ ] **Approval Notification**: "You're approved! Here's your dashboard link."
- [ ] **New Referral Alert**: "Someone signed up using your link — $X commission pending"
- [ ] **Payout Sent**: "$X sent to your PayPal" with transaction details
- [ ] **Monthly Digest**: Clicks, conversions, earnings this month vs last month

### 3.6 Admin Panel (New — minimal)
- [ ] List all affiliates with status filter
- [ ] Approve / reject / deactivate affiliates
- [ ] View conversions per affiliate
- [ ] Mark payouts as sent (manual for v1)
- [ ] Export affiliate data to CSV

### 3.7 Fraud Prevention (New)
- [ ] Email verification via magic link or OTP
- [ ] IP-based click throttling (max 10 clicks/hour per IP per affiliate)
- [ ] Flag affiliates with >50% conversion rate (unrealistic)
- [ ] Flag multiple signups from same IP within 24h
- [ ] Minimum payout threshold: $50
- [ ] Require confirmed PayPal email before first payout

---

## 4. User Stories for v1

### US-001: Signup as Affiliate
> As a laid-off worker, I want to sign up for the affiliate program so that I can start earning by referring businesses.

**Acceptance Criteria:**
- I can fill out a form with name, email, phone (optional), and how I plan to share
- I receive a confirmation email within 5 minutes
- My status is "pending" until approved
- I cannot access the dashboard until approved

### US-002: Get Approved
> As an admin, I want to review and approve affiliate applications so that I maintain program quality.

**Acceptance Criteria:**
- I see a list of pending affiliates in the admin panel
- I can approve or reject with one click
- The affiliate receives an email notification of the decision
- Approved affiliates can log into their dashboard

### US-003: Share Referral Link
> As an approved affiliate, I want to copy my referral link and download my QR code so that I can share it anywhere.

**Acceptance Criteria:**
- My dashboard shows my unique referral URL
- One-click copy to clipboard
- QR code is downloadable as PNG
- QR code links to `https://neogents.tech/?ref=MYCODE`

### US-004: Track Referrals
> As an affiliate, I want to see how many people clicked my link and signed up so that I know what's working.

**Acceptance Criteria:**
- Dashboard shows: clicks (last 30 days), total signups, conversions, total earnings
- Stats update in real-time (or within 5 minutes)
- I can see which plan each referral chose

### US-005: Receive Commission
> As an affiliate, I want to receive my commission via PayPal so that I get paid reliably.

**Acceptance Criteria:**
- Commission is calculated based on the plan the referral chose
- Commission status is "pending" until the referral's payment clears
- Once cleared, commission moves to "available"
- When available balance ≥ $50, I can request a payout
- I receive an email when payout is sent
- Payout history is visible in my dashboard

### US-006: Prevent Fraud
> As an admin, I want basic fraud checks so that the program isn't gamed.

**Acceptance Criteria:**
- Same email cannot sign up twice
- Same IP cannot generate more than 10 clicks/hour on the same link
- Affiliates with >50% click-to-signup ratio are flagged
- Payouts require a verified PayPal email
- Minimum payout threshold is $50

---

## 5. Technical Requirements

### 5.1 Database Schema (v1)

**Decision:** Migrate from in-memory to SQLite for v1 (zero infrastructure cost, single-file, easy backup). Upgrade to PostgreSQL at v2.

```sql
-- affiliates
CREATE TABLE affiliates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  how TEXT,
  referral_code TEXT UNIQUE NOT NULL,
  status TEXT CHECK(status IN ('pending','active','inactive')) DEFAULT 'pending',
  paypal_email TEXT,
  email_verified BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- clicks
CREATE TABLE clicks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  affiliate_id TEXT NOT NULL,
  ip TEXT,
  user_agent TEXT,
  referrer TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (affiliate_id) REFERENCES affiliates(id)
);

-- conversions
CREATE TABLE conversions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  affiliate_id TEXT NOT NULL,
  customer_email TEXT,
  plan TEXT NOT NULL,
  commission_amount INTEGER NOT NULL, -- cents
  status TEXT CHECK(status IN ('pending','available','paid','refunded')) DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  paid_at DATETIME,
  FOREIGN KEY (affiliate_id) REFERENCES affiliates(id)
);

-- payouts
CREATE TABLE payouts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  affiliate_id TEXT NOT NULL,
  amount INTEGER NOT NULL, -- cents
  method TEXT DEFAULT 'paypal',
  status TEXT CHECK(status IN ('pending','sent','failed')) DEFAULT 'pending',
  sent_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (affiliate_id) REFERENCES affiliates(id)
);
```

### 5.2 API Specification

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/affiliates/signup` | POST | Public | Create affiliate account |
| `/api/affiliates/verify-email` | POST | Public | Verify email with OTP |
| `/api/affiliates/me` | GET | Bearer | Get own profile + stats |
| `/api/affiliates/me` | PATCH | Bearer | Update profile |
| `/api/affiliates/track-click` | POST | Public | Log referral click |
| `/api/affiliates/payouts` | GET | Bearer | Get payout history |
| `/api/affiliates/request-payout` | POST | Bearer | Request payout (min $50) |
| `/api/admin/affiliates` | GET | Admin | List all affiliates |
| `/api/admin/affiliates/:id/approve` | POST | Admin | Approve affiliate |
| `/api/admin/affiliates/:id/reject` | POST | Admin | Reject affiliate |
| `/api/admin/conversions` | GET | Admin | List all conversions |
| `/api/admin/payouts` | POST | Admin | Mark payout as sent |

### 5.3 Authentication

- **v1**: Simple JWT tokens stored in `HttpOnly` cookies
- Token expiry: 7 days
- Admin role: check `email` against a whitelist in env var `ADMIN_EMAILS`
- **v2**: Upgrade to session-based auth or OAuth

### 5.4 Environment Variables

```bash
# Existing
EMAIL_USER=npcneogents@gmail.com
EMAIL_PASS=...

# New
DATABASE_URL=file:./data/affiliates.db
JWT_SECRET=...
ADMIN_EMAILS=npcneogents@gmail.com,coach@neogents.tech
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...
PAYPAL_SANDBOX=true
MIN_PAYOUT_CENTS=5000
COOKIE_DOMAIN=neogents.tech
```

### 5.5 Tech Stack Additions

| Component | Choice | Reason |
|-----------|--------|--------|
| Database | SQLite (better-sqlite3) | Zero infra, file-based, sufficient for <1k affiliates |
| ORM | None — raw SQL with helper functions | Keep it simple, avoid migration complexity for v1 |
| Auth | jsonwebtoken + cookie-parser | Lightweight, no external auth provider needed |
| PayPal SDK | @paypal/payouts-sdk | Official SDK, supports sandbox |
| QR Code | qrcode.react (already in use) | No change needed |

---

## 6. v2 Roadmap (Post-MVP)

| Feature | Priority | Est. Effort |
|---------|----------|-------------|
| Stripe Connect migration | High | 2 sprints |
| Real-time analytics charts (Chart.js/Recharts) | Medium | 1 sprint |
| Marketing materials download (PDF one-pagers, email templates) | Medium | 1 sprint |
| Leaderboard (top affiliates) | Low | 3 days |
| Multi-tier commissions (sub-affiliates) | Low | 2 sprints |
| Webhook integration with billing system | High | 1 sprint |
| PostgreSQL migration | Medium | 1 sprint |
| Automated monthly payouts (cron job) | Medium | 1 sprint |
| Affiliate API for power users | Low | 1 sprint |
| Two-factor auth for admin panel | Low | 3 days |

---

## 7. Open Questions

1. **Billing System Integration**: How does the current NEO Gents billing system work? Is it Stripe Checkout, invoicing, or manual? We need a webhook or API call to trigger conversion creation when a referred customer pays.

2. **PayPal Account Status**: Does NEO Gents have a verified PayPal Business account with Payouts enabled? This requires PayPal approval and can take 1–2 weeks.

3. **Tax Obligations**: For US-based affiliates earning >$600/year, NEO Gents must issue 1099-NEC forms. Should we collect W-9/W-8BEN at signup or at first payout?

4. **Cookie Consent**: The landing page needs a cookie consent banner for GDPR/CCPA compliance. Is there an existing privacy policy and terms of service?

5. **Admin Panel UI**: Should the admin panel be a separate route in the existing React app, or a standalone minimal UI? Recommendation: add `/admin/affiliates` to the existing dashboard app with route guards.

6. **Email Deliverability**: Gmail SMTP has sending limits (~100/day). If affiliate volume grows, we may need SendGrid/Resend. What's the budget?

7. **Commission Reversals**: If a referred customer refunds within 30 days, should the commission be clawed back? What's the refund policy?

8. **International Affiliates**: PayPal works globally but fees vary. Should v1 be US-only?

---

## 8. Success Metrics (v1)

| Metric | Target | Measurement |
|--------|--------|-------------|
| Affiliate signups (first 30 days) | 20 | Database count |
| Approval rate | >80% | Approved / Total signups |
| Active affiliates (made ≥1 referral) | 10 | Conversion count |
| Average referrals per active affiliate | 2 | Total conversions / active affiliates |
| Total commissions paid (first 30 days) | $2,000 | Payouts table |
| Fraud flags triggered | <5% | Flagged affiliates / total |
| Email open rate (signup confirmation) | >60% | Gmail read receipts or tracking pixel |

---

## 9. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| PayPal freezes account due to sudden volume | Medium | High | Start with sandbox, warm up account with small transactions |
| Affiliates game the system (self-referral) | Medium | Medium | IP checks, email domain matching, manual review |
| Email deliverability issues (Gmail limits) | Medium | Medium | Monitor bounce rate; migrate to SendGrid if >100 emails/day |
| Database corruption (SQLite on VPS) | Low | High | Daily backups to S3/R2; migrate to PostgreSQL at v2 |
| Low affiliate adoption | Medium | High | Landing page A/B test; founder outreach to first 10 |
| Tax compliance missed | Low | High | Collect W-9 at first payout; use PayPal's 1099-K if available |

---

## 10. Next Steps

1. **Founder Review**: Coach Berry to approve decisions 1–6 and confirm PayPal account readiness.
2. **Database Setup**: Create SQLite schema and migration script.
3. **Auth Implementation**: Add JWT cookie auth to `affiliates.ts`.
4. **Dashboard Scaffold**: Create `/dashboard/affiliate` route in the React app.
5. **PayPal Sandbox**: Set up sandbox account and test payout flow.
6. **Email Templates**: Design and build the 5 transactional emails.
7. **Admin Panel**: Build minimal admin UI for affiliate approval.
8. **QA & Launch**: Test end-to-end flow; launch to founding affiliates first.

---

*End of PRD*
