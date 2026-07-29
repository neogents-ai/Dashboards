import type { D1Database } from '@cloudflare/workers-types';

export type AffiliateStatus = 'pending' | 'active' | 'inactive';
export interface Affiliate {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  how: string;
  referral_code: string;
  status: AffiliateStatus;
  payout_method: string | null;
  payout_address: string | null;
  created_at: string;
  updated_at: string;
}

export interface Click {
  id: string;
  affiliate_id: string;
  referral_code: string;
  ip: string | null;
  user_agent: string | null;
  to_tag: string | null;
  landing: string;
  created_at: string;
}

export interface Conversion {
  id: string;
  affiliate_id: string;
  referral_code: string;
  customer_email: string;
  customer_name: string | null;
  plan: 'Starter' | 'Pro' | 'Agency' | 'Custom';
  commission: number;
  status: 'pending' | 'paid';
  created_at: string;
  paid_at: string | null;
}

const COMMISSIONS: Record<string, number> = {
  Starter: 78,
  Pro: 190,
  Agency: 286,
  Custom: 458,
};

export function getDb(env: { DB?: D1Database }): D1Database {
  if (!env.DB) throw new Error('D1 database not bound');
  return env.DB;
}

export function generateReferralCode(name: string): string {
  const clean = name.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 6);
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${clean}${random}`;
}

export async function listAffiliates(db: D1Database): Promise<Affiliate[]> {
  const { results } = await db.prepare('SELECT * FROM affiliates ORDER BY created_at DESC').all<Affiliate>();
  return results || [];
}

export async function findAffiliateByEmail(db: D1Database, email: string): Promise<Affiliate | null> {
  const row = await db.prepare('SELECT * FROM affiliates WHERE email = ?').bind(email).first<Affiliate>();
  return row || null;
}

export async function findAffiliateByCode(db: D1Database, referralCode: string): Promise<Affiliate | null> {
  const row = await db.prepare('SELECT * FROM affiliates WHERE referral_code = ?').bind(referralCode.toUpperCase()).first<Affiliate>();
  return row || null;
}

export async function findAffiliateById(db: D1Database, id: string): Promise<Affiliate | null> {
  const row = await db.prepare('SELECT * FROM affiliates WHERE id = ?').bind(id).first<Affiliate>();
  return row || null;
}

export async function createAffiliate(
  db: D1Database,
  input: { name: string; email: string; phone: string | null; how: string },
): Promise<Affiliate> {
  const id = `aff-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const now = new Date().toISOString();
  let referralCode = generateReferralCode(input.name);
  for (let i = 0; i < 5; i++) {
    const existing = await findAffiliateByCode(db, referralCode);
    if (!existing) break;
    referralCode = generateReferralCode(`${input.name}${i + 1}`);
  }
  await db
    .prepare(
      `INSERT INTO affiliates (id, name, email, phone, how, referral_code, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, 'pending', ?, ?)`,
    )
    .bind(id, input.name.trim(), input.email.toLowerCase().trim(), input.phone || null, input.how.trim(), referralCode, now, now)
    .run();
  return (await findAffiliateById(db, id))!;
}

export async function updateAffiliateStatus(
  db: D1Database,
  id: string,
  status: AffiliateStatus,
): Promise<Affiliate | null> {
  const now = new Date().toISOString();
  await db.prepare('UPDATE affiliates SET status = ?, updated_at = ? WHERE id = ?').bind(status, now, id).run();
  return findAffiliateById(db, id);
}

export async function recordClick(
  db: D1Database,
  referralCode: string,
  meta: { ip: string | null; userAgent: string | null; to: string | null; landing: string },
): Promise<Click | null> {
  const affiliate = await findAffiliateByCode(db, referralCode);
  if (!affiliate) return null;
  const id = `clk-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const now = new Date().toISOString();
  await db
    .prepare(
      `INSERT INTO clicks (id, affiliate_id, referral_code, ip, user_agent, to_tag, landing, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(id, affiliate.id, affiliate.referral_code, meta.ip, meta.userAgent, meta.to, meta.landing, now)
    .run();
  return { id, affiliate_id: affiliate.id, referral_code: affiliate.referral_code, ip: meta.ip, user_agent: meta.userAgent, to_tag: meta.to, landing: meta.landing, created_at: now };
}

export async function recordConversion(
  db: D1Database,
  referralCode: string,
  customerEmail: string,
  customerName: string | null,
  plan: 'Starter' | 'Pro' | 'Agency' | 'Custom',
): Promise<Conversion | null> {
  const affiliate = await findAffiliateByCode(db, referralCode);
  if (!affiliate) return null;
  const commission = COMMISSIONS[plan] || 0;
  const id = `conv-${Date.now()}`;
  const now = new Date().toISOString();
  await db
    .prepare(
      `INSERT INTO conversions (id, affiliate_id, referral_code, customer_email, customer_name, plan, commission, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', ?)`,
    )
    .bind(id, affiliate.id, affiliate.referral_code, customerEmail.toLowerCase().trim(), customerName || null, plan, commission, now)
    .run();
  return { id, affiliate_id: affiliate.id, referral_code: affiliate.referral_code, customer_email: customerEmail.toLowerCase().trim(), customer_name: customerName || null, plan, commission, status: 'pending', created_at: now, paid_at: null };
}

export async function markConversionPaid(db: D1Database, id: string): Promise<Conversion | null> {
  const now = new Date().toISOString();
  await db.prepare('UPDATE conversions SET status = ?, paid_at = ? WHERE id = ?').bind('paid', now, id).run();
  return db.prepare('SELECT * FROM conversions WHERE id = ?').bind(id).first<Conversion>();
}

export async function getAffiliateStats(db: D1Database, affiliateId: string) {
  const clicks = await db.prepare('SELECT COUNT(*) as count FROM clicks WHERE affiliate_id = ?').bind(affiliateId).first<{ count: number }>();
  const clicks30 = await db
    .prepare("SELECT COUNT(*) as count FROM clicks WHERE affiliate_id = ? AND created_at > datetime('now', '-30 days')")
    .bind(affiliateId)
    .first<{ count: number }>();
  const conversions = await db.prepare('SELECT COUNT(*) as count FROM conversions WHERE affiliate_id = ?').bind(affiliateId).first<{ count: number }>();
  const paid = await db.prepare("SELECT SUM(commission) as total FROM conversions WHERE affiliate_id = ? AND status = 'paid'").bind(affiliateId).first<{ total: number | null }>();
  const pending = await db.prepare("SELECT SUM(commission) as total FROM conversions WHERE affiliate_id = ? AND status = 'pending'").bind(affiliateId).first<{ total: number | null }>();
  return {
    clicks: clicks?.count || 0,
    clicksLast30: clicks30?.count || 0,
    conversions: conversions?.count || 0,
    totalEarnings: paid?.total || 0,
    pendingPayout: pending?.total || 0,
  };
}

export async function getAdminStats(db: D1Database) {
  const total = await db.prepare('SELECT COUNT(*) as count FROM affiliates').first<{ count: number }>();
  const active = await db.prepare("SELECT COUNT(*) as count FROM affiliates WHERE status = 'active'").first<{ count: number }>();
  const pending = await db.prepare("SELECT COUNT(*) as count FROM affiliates WHERE status = 'pending'").first<{ count: number }>();
  const clicks = await db.prepare('SELECT COUNT(*) as count FROM clicks').first<{ count: number }>();
  const conversions = await db.prepare('SELECT COUNT(*) as count FROM conversions').first<{ count: number }>();
  const paid = await db.prepare("SELECT SUM(commission) as total FROM conversions WHERE status = 'paid'").first<{ total: number | null }>();
  const pendingPayout = await db.prepare("SELECT SUM(commission) as total FROM conversions WHERE status = 'pending'").first<{ total: number | null }>();
  return {
    totalAffiliates: total?.count || 0,
    activeAffiliates: active?.count || 0,
    pendingAffiliates: pending?.count || 0,
    totalClicks: clicks?.count || 0,
    totalConversions: conversions?.count || 0,
    totalPaid: paid?.total || 0,
    pendingPayout: pendingPayout?.total || 0,
  };
}

export async function listConversions(db: D1Database): Promise<Conversion[]> {
  const { results } = await db.prepare('SELECT * FROM conversions ORDER BY created_at DESC').all<Conversion>();
  return results || [];
}
