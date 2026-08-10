# NEO Gents Affiliate Program — Strategic Playbook

**Program Name:** The Gentlemen's Circle  
**Tagline:** *"Build your empire by helping others build theirs."*  
**Version:** 2.0  
**Date:** August 10, 2026  
**Owner:** NEO Gents Business Track (Nori)  
**Status:** Updated for flat-fee affiliate model

---

## Table of Contents

1. [Program Name & Positioning](#1-program-name--positioning)
2. [Affiliate Tiers](#2-affiliate-tiers)
3. [Commission Structure](#3-commission-structure)
4. [Onboarding Flow](#4-onboarding-flow)
5. [Terms & Conditions](#5-terms--conditions-template)
6. [Promotional Assets Checklist](#6-promotional-assets-checklist)
7. [30-Day Launch Timeline](#7-30-day-launch-timeline)
8. [Appendix: Financial Model](#appendix-financial-model)
9. [Related Files](#9-related-files)

---

## 1. Program Name & Positioning

### Program Name: **The Gentlemen's Circle**

**Why this name:**
- "Gentlemen" ties directly to the NEO Gents brand identity
- "Circle" implies exclusivity, community, and mutual growth
- Evokes a private network of serious professionals, not a generic "referral program"
- Memorable and distinctive in the creator-economy space

### Brand Positioning

| Element | Definition |
|---------|------------|
| **Mission** | Empower creators, professionals, and entrepreneurs who have been laid off or seek side income to build sustainable businesses — while rewarding those who spread the word. |
| **Core Promise** | "Earn 20% of every dollar your referrals pay in their first year. No caps. No gimmicks. Just real money for real connections." |
| **Target Affiliate Persona** | Former corporate professionals, side-hustle builders, creator-economy participants, local business connectors, and community leaders who know people ready to monetize their skills. |
| **Emotional Hook** | "You already know people who need this. Why not get paid for the introduction?" |
| **Differentiator** | Unlike SaaS affiliate programs that pay 10–15% recurring crumbs, The Gentlemen's Circle pays **20% of first-year revenue upfront** — a meaningful sum that respects the affiliate's hustle. |

### Key Messaging Pillars

1. **Empathy First:** "We built NEO Gents for people who got laid off and had to rebuild. Our affiliates are those same people — helping others do the same."
2. **Transparency:** "You see every click, every signup, every dollar. No black boxes."
3. **Speed:** "Get paid within 30 days of your referral's first payment. Not quarterly. Not 'net-60.' Thirty days."
4. **Zero Risk:** "No cost to join. No inventory to buy. No quotas to hit. Just share your link."

---

## 2. Affiliate Tiers

### Tier Architecture

| Tier | Name | Qualification | Commission | Bonus Structure | Support Level |
|------|------|---------------|------------|-----------------|---------------|
| **Tier 1** | **Founding Affiliate** | First 50 approved affiliates (legacy status) | $78–$458 per referral, based on plan | $500 bonus at 5 referrals; $2,000 bonus at 15 referrals | Dedicated Slack channel; monthly 1:1 with Nori |
| **Tier 2** | **Partner** | 3+ successful referrals OR $500+ in lifetime earnings | $78–$458 per referral, based on plan | $250 bonus at 5 referrals; $1,000 bonus at 15 referrals | Priority email support; quarterly strategy call |
| **Tier 3** | **Ambassador** | 10+ successful referrals OR $2,000+ in lifetime earnings | $78–$458 per referral, based on plan + 5% second-year residual on select programs | $500 bonus at 10 referrals; $5,000 bonus at 25 referrals; exclusive NEO Gents swag & event invites | White-glove support; co-marketing opportunities; early access to new verticals |

### Tier Progression Rules

- **Auto-promotion:** Tiers are evaluated monthly. Affiliates auto-promote when they hit qualification criteria.
- **Grace period:** Founding Affiliate status is permanent for the first 50 approved affiliates, even if they don't maintain activity.
- **Demotion:** Partners and Ambassadors who have 0 referrals for 6 consecutive months are demoted one tier (except Founding Affiliates).
- **Fast-track:** Any affiliate who refers a $500+/mo custom client is immediately promoted to Partner, regardless of total referral count.

### Tier Benefits Detail

#### Founding Affiliate (First 50 Only)
- Permanent legacy status
- Highest visibility on affiliate leaderboard
- Exclusive "Founding Affiliate" badge on all materials
- Input on new vertical launches (beta access + feedback sessions)
- Locked-in commission rates even if program terms change later

#### Partner
- Access to Partner-only resource library (advanced scripts, case studies)
- Co-branded landing page option (`neogents.tech/partner/your-name`)
- Featured in monthly "Partner Spotlight" email to 2,400+ users
- Invitation to quarterly virtual roundtable with NEO Gents leadership

#### Ambassador
- **5% second-year residual** on all referrals (unique to this tier)
- Co-marketing budget: $200/quarter for paid promotion of NEO Gents
- Annual Ambassador Retreat (virtual or in-person, TBD)
- Revenue share on referred affiliates: 5% of referred affiliate's earnings for 12 months
- Custom co-branded assets designed by NEO Gents creative team

---

## 3. Commission Structure

### Base Commission: Flat One-Time Payout Per Referral

**How it works:**
- For every referred business that becomes a paying client, the affiliate earns a **flat one-time commission based on the plan they choose**.
- Commissions are paid within 30 days of the referred client's first payment.
- There is no cap on total earnings.

| Plan | Monthly Price | Affiliate Commission |
|------|---------------|----------------------|
| **Starter** | $39/mo | $78 |
| **Pro** | $79/mo | $190 |
| **Agency** | $119/mo | $286 |
| **Custom** | $149/mo + $500 one-time build | $458 |

### Commission Examples

| Referrals This Month | Plan Mix | Commission Earned |
|----------------------|----------|-------------------|
| 1 referral | Starter | $78 |
| 1 referral | Pro | $190 |
| 1 referral | Agency | $286 |
| 2 referrals | Agency + Pro | $476 |
| 5 referrals | all Agency | $1,430 |

### Ambassador Residual

- Ambassadors continue to earn **5% of referred-client payments in the second year**.
- Residual applies to Starter, Pro, and Agency plans only.
- This is in addition to the flat first-year commission.

---

## 4. Onboarding Flow

### Stage 1: Discovery

**Entry Points:**
1. **Landing page:** `https://neogents.tech/#/affiliates`
2. **In-app prompt:** Pro/Agency users see "Earn 20% by referring" banner in dashboard
3. **Email campaign:** Quarterly "Join The Gentlemen's Circle" invite to active users
4. **Social media:** Organic posts + paid ads targeting "side income" and "affiliate marketing" interests
5. **Direct outreach:** Nori/Trinity personally invite high-potential connectors

### Stage 2: Signup

**Form Fields (keep minimal):**
- Full Name (required)
- Email (required)
- Phone (optional — for high-touch follow-up)
- How do you plan to share? (dropdown: Social media / Email / In-person / Content / Other)
- Do you have an audience? (Yes / No / Building one)
- Referral code of who invited you (optional — for sub-affiliate tracking)

**Technical Flow:**
```
User submits form
  → POST /api/affiliates/signup
  → Auto-generate unique referral code (e.g., "MARCUS20")
  → Create affiliate record (status: "pending")
  → Send confirmation email with referral link + QR code
  → Notify NEO Gents team via Slack + email
```

### Stage 3: Approval

**Auto-approval criteria (instant):**
- Existing NEO Gents customer (Pro or Agency tier)
- Referral from existing Partner or Ambassador
- Application includes clear sharing plan

**Manual review queue (24–48 hours):**
- New applicants with no NEO Gents history
- Applicants from high-risk regions (fraud prevention)
- Applicants with incomplete information

**Rejection criteria:**
- Spam/scam history
- Incompatible brand values (hate speech, illegal activity)
- Competitor employee (without disclosure)

### Stage 4: Activation

**Welcome Sequence (5-email drip):**

| Day | Email Subject | Content |
|-----|---------------|---------|
| 0 | "Welcome to The Gentlemen's Circle, [Name]" | Referral link, QR code, dashboard login, quick-start guide |
| 1 | "Your first $100 is closer than you think" | Script templates, best practices, who to refer first |
| 3 | "The affiliates who win do this one thing..." | Case study: Marcus Johnson's first 3 referrals |
| 7 | "Your dashboard is live — here's what to watch" | How to read analytics, what metrics matter, when payouts hit |
| 14 | "Two weeks in: let's optimize your approach" | Personalized tips based on activity (or re-engagement if no activity) |

**Activation Checklist for New Affiliates:**
- [ ] Download QR code
- [ ] Share link on at least 1 platform
- [ ] Send 1 personal intro to a potential referral
- [ ] Join affiliate Slack/Discord community
- [ ] Attend monthly affiliate webinar (optional but recommended)

### Stage 5: Ongoing Engagement

**Monthly Rhythm:**
- **1st of month:** Payout notification + earnings report
- **15th of month:** Payout deposit hits Stripe Connect
- **Mid-month:** Affiliate newsletter (new assets, vertical launches, success stories)
- **End of month:** Leaderboard update + tier progression notifications

**Quarterly Rhythm:**
- **Q1:** Strategy webinar + new asset drop
- **Q2:** Mid-year bonus push (2× multiplier for June referrals)
- **Q3:** Ambassador retreat planning + fall vertical preview
- **Q4:** Year-end bonus sprint + top affiliate awards

### Stage 6: Payout

**Payout Flow:**
```
Referred client pays invoice
  → 30-day holding period (chargeback protection)
  → Commission calculated (20% of payment, net of processing fees)
  → Added to affiliate's pending balance
  → On 15th of month: batch payout via Stripe Connect
  → Affiliate receives email: "You got paid!"
  → Dashboard updates with payout history
```

---

## 5. Terms & Conditions Template

> **⚠️ Legal Disclaimer:** This is a template. Have a qualified attorney review and customize before use.

---

### NEO GENTS AFFILIATE PROGRAM AGREEMENT

**Effective Date:** [DATE]  
**Program Name:** The Gentlemen's Circle  
**Company:** NEO Gents, LLC  
**Website:** https://neogents.tech

#### 1. Enrollment & Approval

1.1. To become an affiliate, you must complete the application at `https://neogents.tech/#/affiliates` and be approved by NEO Gents.

1.2. NEO Gents reserves the right to approve or reject any application at its sole discretion. Rejection may occur if: (a) your platform promotes illegal, harmful, or hateful content; (b) you are a competitor employee without disclosure; (c) you have a history of fraudulent referral activity.

1.3. You must be at least 18 years old and legally able to enter into contracts.

#### 2. Commission Structure

2.1. **Base Commission:** Affiliates earn a **flat one-time commission** based on the plan chosen by the referred client: $78 for Starter, $190 for Pro, $286 for Agency, or $458 for Custom.

2.2. **Commission is earned** when: (a) the referred user clicks your affiliate link or scans your QR code; (b) signs up for a paid NEO Gents plan within 60 days; and (c) completes their first successful payment.

2.3. **Milestone Bonuses** are awarded according to the published bonus schedule and are paid in the same monthly batch as commissions.

2.4. **Ambassador Residual:** Ambassadors earn 5% of referred-client payments during the second year, in addition to the flat first-year commission.

#### 3. Payout Terms

3.1. Commissions are held for 30 days after the referred client's payment to allow for refunds and chargebacks.

3.2. Payouts are processed monthly on the 15th via Stripe Connect (primary), PayPal (fallback), or bank transfer (US only).

3.3. **Minimum payout threshold:** $50. Balances below $50 roll over to the next month.

3.4. Affiliates are responsible for all taxes. US affiliates earning $600+ per calendar year will receive a Form 1099-NEC. International affiliates must submit a W-8BEN.

#### 4. Tracking & Attribution

4.1. Affiliates receive a unique referral link and QR code. All tracking is cookie-based with a 60-day window.

4.2. **Last-click attribution** applies. If a user clicks multiple affiliate links, the last click before signup receives credit.

4.3. NEO Gents uses industry-standard tracking but is not liable for tracking errors caused by user cookie blocking, VPNs, or other technical interference.

#### 5. Prohibited Activities

Affiliates may NOT:

5.1. Use misleading, false, or deceptive claims about NEO Gents products or services.
5.2. Bid on NEO Gents branded keywords in paid search (e.g., "NEO Gents," "neogents.tech") without written permission.
5.3. Spam email, social media, or any platform with unsolicited affiliate links.
5.4. Promote NEO Gents on websites containing hate speech, illegal content, adult content, or malware.
5.5. Offer unauthorized discounts, rebates, or incentives to referred users beyond what NEO Gents officially provides.
5.6. Self-refer or create fake accounts to earn commissions.
5.7. Use cookie stuffing, iframe tricks, or other fraudulent tracking manipulation.

**Violation of Section 5 will result in immediate termination, forfeiture of pending commissions, and potential legal action.**

#### 6. Term & Termination

6.1. This agreement begins upon approval and continues until terminated by either party.

6.2. Either party may terminate with 7 days' written notice.

6.3. NEO Gents may terminate immediately for violation of Section 5 or any material breach.

6.4. Upon termination: (a) affiliate links deactivate immediately; (b) pending commissions for referrals made before termination are paid according to normal schedule; (c) no new commissions accrue after termination date.

#### 7. Intellectual Property

7.1. NEO Gents grants affiliates a limited, non-exclusive, revocable license to use approved brand assets solely for promoting the affiliate program.

7.2. Affiliates may not modify logos, alter brand colors, or create materials that imply NEO Gents endorsement of the affiliate's own products/services.

#### 8. Limitation of Liability

8.1. NEO Gents' total liability under this agreement shall not exceed the total commissions paid to the affiliate in the 12 months preceding the claim.

8.2. NEO Gents is not liable for indirect, incidental, or consequential damages.

#### 9. Modification

9.1. NEO Gents may modify this agreement with 30 days' written notice. Continued participation constitutes acceptance.

9.2. **Founding Affiliates** are grandfathered at their flat-fee commission rates for 24 months from program launch, regardless of subsequent term changes.

#### 10. Governing Law

10.1. This agreement is governed by the laws of [STATE], United States.

10.2. Disputes shall be resolved through binding arbitration in [CITY, STATE].

---

**By signing up, you acknowledge that you have read, understood, and agree to these terms.**

---

## 6. Promotional Assets Checklist

### Tier 1: All Affiliates (Immediate Access)

| Asset | Format | Description |
|-------|--------|-------------|
| **Personal Referral Link** | URL | `https://neogents.tech/?ref=YOURCODE` |
| **QR Code** | PNG/SVG | Scannable code linking to affiliate's personal landing page |
| **Email Signature Badge** | HTML | "Powered by NEO Gents — Get 20% off your first month" embeddable signature |
| **Social Media Posts (5-pack)** | PNG + copy | Pre-designed posts for Instagram, LinkedIn, Twitter/X, Facebook, TikTok |
| **One-Pager PDF** | PDF | Printable flyer explaining NEO Gents + affiliate's QR code |
| **Email Templates (3)** | Text/HTML | Cold outreach, warm intro, follow-up scripts |
| **Brand Guidelines** | PDF | Do's and don'ts for using NEO Gents branding |

### Tier 2: Partner-Only Assets

| Asset | Format | Description |
|-------|--------|-------------|
| **Co-Branded Landing Page** | Web | `neogents.tech/partner/your-name` with affiliate's photo/bio |
| **Video Testimonial Kit** | MP4 templates | "Why I recommend NEO Gents" script + B-roll guidelines |
| **Case Study Library** | PDF | 5 vertical-specific success stories (photographer, barber, etc.) |
| **Webinar Slide Deck** | PPTX | Ready-to-present 15-min NEO Gents overview |
| **LinkedIn Article Template** | DOCX | Ghostwritten article for affiliate to publish under their name |
| **Custom Graphics** | Canva link | Editable templates for affiliate's brand colors |

### Tier 3: Ambassador-Only Assets

| Asset | Format | Description |
|-------|--------|-------------|
| **Co-Marketing Budget** | $200/quarter | Reimbursement for paid ads promoting NEO Gents |
| **Custom Video Production** | MP4 | NEO Gents creative team produces 60-sec promo featuring ambassador |
| **Podcast Interview** | Audio | Ambassador featured on NEO Gents podcast or YouTube channel |
| **Event Speaking Slot** | Live/Virtual | Ambassador invited to speak at NEO Gents events |
| **Early Access Pass** | Beta | First access to new verticals, features, and pricing experiments |
| **Sub-Affiliate Dashboard** | Web | Track and manage affiliates recruited by the Ambassador |

### Asset Production Timeline

| Week | Assets Delivered |
|------|-----------------|
| **Week 1** | Referral links, QR codes, email templates, brand guidelines |
| **Week 2** | Social media post pack, one-pager PDF, email signature badge |
| **Week 3** | Co-branded landing pages (Partner+), case study library |
| **Week 4** | Video testimonial kit, webinar deck, LinkedIn article template |
| **Month 2** | Custom graphics (Partner+), custom video production (Ambassador+) |
| **Month 3** | Podcast interviews, event speaking slots, sub-affiliate dashboard |

---

## 7. 30-Day Launch Timeline

### Pre-Launch (Week -1)

| Day | Task | Owner | Deliverable |
|-----|------|-------|-------------|
| **Day -7** | Finalize terms & conditions with legal review | Nori + Legal | Signed off T&C document |
| **Day -6** | Set up Stripe Connect for affiliate payouts | Backend Dev | Stripe Connect integration live |
| **Day -5** | Build affiliate dashboard (stats, payouts, links) | Frontend Dev | Dashboard MVP deployed |
| **Day -4** | Create promotional asset batch 1 (links, QR, email templates) | Trinity | Asset library live |
| **Day -3** | Write welcome email sequence (5 emails) | Trinity | Email sequence in system |
| **Day -2** | Test full signup → approval → link → tracking → payout flow | QA Engineer | Test report, bugs fixed |
| **Day -1** | Soft launch to 5 beta affiliates (Marcus, Tasha + 3 others) | Nori | Feedback collected, final tweaks |

### Launch Week (Week 1)

| Day | Task | Owner | Deliverable |
|-----|------|-------|-------------|
| **Day 1 (Mon)** | **PUBLIC LAUNCH** — Open affiliate signup on landing page | Nori | Live announcement |
| **Day 1** | Email blast to 2,400+ users: "Join The Gentlemen's Circle" | Trinity | Email sent, tracking live |
| **Day 1** | Social media announcement across all channels | Trinity | 5 posts published |
| **Day 2** | Reach out to 25 target affiliates (personalized DMs/emails) | Neo-Sales | 25 outreach messages sent |
| **Day 3** | Publish "How to Earn Your First $500 with NEO Gents" blog post | Trinity | Blog post live |
| **Day 4** | Host live Q&A webinar: "Inside The Gentlemen's Circle" | Nori | Webinar recording → evergreen asset |
| **Day 5** | First weekly affiliate newsletter | Trinity | Newsletter sent to all approved affiliates |
| **Day 7** | Week 1 metrics review | Nori + Neo-Data | Signups, approvals, first shares tracked |

### Growth Week (Week 2)

| Day | Task | Owner | Deliverable |
|-----|------|-------|-------------|
| **Day 8** | Deploy social media post pack (5-platform templates) | Trinity | Assets in affiliate portal |
| **Day 9** | Launch paid ads targeting "affiliate marketing" + "side income" | Neo-Sales | Ad campaigns live |
| **Day 10** | Publish affiliate success story #1 (Marcus Johnson) | Trinity | Case study live |
| **Day 11** | Enable in-app affiliate banner for Pro/Agency users | Frontend Dev | Banner deployed |
| **Day 12** | Second weekly newsletter: "Your First Referral: A Step-by-Step Guide" | Trinity | Newsletter sent |
| **Day 14** | Week 2 metrics review + cohort analysis | Nori + Neo-Data | Cohort report, optimization notes |

### Optimization Week (Week 3)

| Day | Task | Owner | Deliverable |
|-----|------|-------|-------------|
| **Day 15** | A/B test landing page headlines | Neo-Data | Winning variant deployed |
| **Day 16** | Deploy co-branded landing pages for first 5 Partners | Frontend Dev | 5 partner pages live |
| **Day 17** | Host affiliate training: "How to Close Your First 3 Referrals" | Nori | Training recording archived |
| **Day 18** | Launch referral leaderboard (public, opt-in) | Frontend Dev | Leaderboard live |
| **Day 19** | Third weekly newsletter: "Leaderboard Update + New Assets" | Trinity | Newsletter sent |
| **Day 21** | Week 3 metrics review + first payout preview | Nori + Neo-Data | Payout forecast, churn analysis |

### Scale Week (Week 4)

| Day | Task | Owner | Deliverable |
|-----|------|-------|-------------|
| **Day 22** | **First payout day** — Process commissions for early referrals | Backend Dev | Payouts deposited |
| **Day 23** | Celebrate first payouts on social media + newsletter | Trinity | "You Got Paid!" campaign |
| **Day 24** | Recruit 2nd wave: target 50 new affiliates | Neo-Sales | 50 outreach messages |
| **Day 25** | Deploy video testimonial kit | Trinity | Video templates in portal |
| **Day 26** | Monthly affiliate webinar: "Month 1 Wins & Month 2 Strategy" | Nori | Webinar hosted |
| **Day 28** | 30-day retrospective + playbook v1.1 | Nori + All | Retrospective doc, updated playbook |
| **Day 30** | **Month 1 Report** — Metrics, learnings, Month 2 plan | Nori | Report to leadership |

### Key Milestones

| Milestone | Target Date | Success Criteria |
|-----------|-------------|------------------|
| First affiliate signup | Day 1 | ≥1 signup within 24h of launch |
| 10 approved affiliates | Day 7 | 10 active affiliates sharing links |
| First referral conversion | Day 10 | ≥1 referred client pays first invoice |
| 25 approved affiliates | Day 14 | 25 active affiliates |
| First payout processed | Day 22 | ≥$500 in total commissions paid |
| 50 approved affiliates | Day 30 | 50 active affiliates |
| $5,000 in referred revenue | Day 30 | First-month referred revenue target |

---

## Appendix: Financial Model

### Unit Economics

| Metric | Value | Notes |
|--------|-------|-------|
| **Average client LTV** | $1,400 | 14-month avg retention × $97 blended ARPU |
| **Average first-year revenue** | $1,164 | Agency tier average |
| **Affiliate commission (20%)** | $232.80 | Per average referral |
| **Program CAC** | $232.80 | Commission paid to affiliate |
| **Net LTV after affiliate cost** | $1,167.20 | $1,400 - $232.80 |
| **LTV:CAC ratio** | 6.0:1 | Healthy; target is >3:1 |

### Scenario Modeling

#### Conservative (Month 1)

| Metric | Value |
|--------|-------|
| Approved affiliates | 30 |
| Active sharers (60%) | 18 |
| Avg referrals per affiliate | 2 |
| Total referrals | 36 |
| Conversion rate (referred → paid) | 15% |
| New paying clients | 5 |
| Avg first-year revenue per client | $800 |
| Total referred revenue | $4,000 |
| Affiliate commissions (20%) | $800 |
| Milestone bonuses | $250 |
| **Total program cost** | **$1,050** |
| **Net revenue to NEO Gents** | **$2,950** |

#### Target (Month 3)

| Metric | Value |
|--------|-------|
| Approved affiliates | 150 |
| Active sharers (60%) | 90 |
| Avg referrals per affiliate (cumulative) | 4 |
| Total referrals | 360 |
| Conversion rate | 20% |
| New paying clients | 72 |
| Avg first-year revenue per client | $1,000 |
| Total referred revenue | $72,000 |
| Affiliate commissions (20%) | $14,400 |
| Milestone bonuses | $3,000 |
| **Total program cost** | **$17,400** |
| **Net revenue to NEO Gents** | **$54,600** |

#### Stretch (Month 6)

| Metric | Value |
|--------|-------|
| Approved affiliates | 500 |
| Active sharers (50%) | 250 |
| Avg referrals per affiliate (cumulative) | 6 |
| Total referrals | 1,500 |
| Conversion rate | 22% |
| New paying clients | 330 |
| Avg first-year revenue per client | $1,100 |
| Total referred revenue | $363,000 |
| Affiliate commissions (20%) | $72,600 |
| Milestone bonuses | $15,000 |
| **Total program cost** | **$87,600** |
| **Net revenue to NEO Gents** | **$275,400** |

### Break-Even Analysis

The program breaks even on the **first referred client's payment** — there are no upfront costs beyond asset production (one-time ~$3,000) and Stripe Connect fees (0.25% per payout). Every referred client generates positive net revenue from day one.

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-06-08 | Nori / NEO Gents Business Track | Initial playbook |

**Next Review Date:** 2026-07-08 (30 days post-launch)

**Distribution:**
- Nori (CEO)
- Trinity (CMO)
- Backend Dev Team
- Frontend Dev Team
- Neo-Sales
- Neo-Data

---

*End of Playbook*
