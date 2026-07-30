import { neon } from '@neondatabase/serverless';
import type { NeonQueryPromise, NeonQueryFunction } from '@neondatabase/serverless';

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

type Sql = NeonQueryFunction<boolean, boolean>;

type QueryResult<T> = T[];

function first<T>(rows: unknown): T | null {
  if (!Array.isArray(rows)) return null;
  return (rows[0] as T) || null;
}

export function getDb(env: { DATABASE_URL?: string }): Sql {
  if (!env.DATABASE_URL) throw new Error('DATABASE_URL not bound');
  return neon(env.DATABASE_URL);
}

export function generateReferralCode(name: string): string {
  const clean = name.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 6);
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${clean}${random}`;
}

export async function listAffiliates(sql: Sql): Promise<Affiliate[]> {
  return (await sql`SELECT * FROM affiliates ORDER BY created_at DESC`) as QueryResult<Affiliate>;
}

export async function findAffiliateByEmail(sql: Sql, email: string): Promise<Affiliate | null> {
  const rows = await sql`SELECT * FROM affiliates WHERE email = ${email.toLowerCase().trim()}`;
  return first<Affiliate>(rows);
}

export async function findAffiliateByCode(sql: Sql, referralCode: string): Promise<Affiliate | null> {
  const rows = await sql`SELECT * FROM affiliates WHERE referral_code = ${referralCode.toUpperCase()}`;
  return first<Affiliate>(rows);
}

export async function findAffiliateById(sql: Sql, id: string): Promise<Affiliate | null> {
  const rows = await sql`SELECT * FROM affiliates WHERE id = ${id}`;
  return first<Affiliate>(rows);
}

export async function createAffiliate(
  sql: Sql,
  input: { name: string; email: string; phone: string | null; how: string },
): Promise<Affiliate> {
  const id = `aff-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const now = new Date().toISOString();
  let referralCode = generateReferralCode(input.name);
  for (let i = 0; i < 5; i++) {
    const existing = await findAffiliateByCode(sql, referralCode);
    if (!existing) break;
    referralCode = generateReferralCode(`${input.name}${i + 1}`);
  }
  await sql`
    INSERT INTO affiliates (id, name, email, phone, how, referral_code, status, created_at, updated_at)
    VALUES (${id}, ${input.name.trim()}, ${input.email.toLowerCase().trim()}, ${input.phone || null}, ${input.how.trim()}, ${referralCode}, 'pending', ${now}, ${now})
  `;
  return (await findAffiliateById(sql, id))!;
}

export async function updateAffiliateStatus(sql: Sql, id: string, status: AffiliateStatus): Promise<Affiliate | null> {
  const now = new Date().toISOString();
  await sql`UPDATE affiliates SET status = ${status}, updated_at = ${now} WHERE id = ${id}`;
  return findAffiliateById(sql, id);
}

export async function recordClick(
  sql: Sql,
  referralCode: string,
  meta: { ip: string | null; userAgent: string | null; to: string | null; landing: string },
): Promise<Click | null> {
  const affiliate = await findAffiliateByCode(sql, referralCode);
  if (!affiliate) return null;
  const id = `clk-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const now = new Date().toISOString();
  await sql`
    INSERT INTO clicks (id, affiliate_id, referral_code, ip, user_agent, to_tag, landing, created_at)
    VALUES (${id}, ${affiliate.id}, ${affiliate.referral_code}, ${meta.ip}, ${meta.userAgent}, ${meta.to}, ${meta.landing}, ${now})
  `;
  return {
    id,
    affiliate_id: affiliate.id,
    referral_code: affiliate.referral_code,
    ip: meta.ip,
    user_agent: meta.userAgent,
    to_tag: meta.to,
    landing: meta.landing,
    created_at: now,
  };
}

export async function recordConversion(
  sql: Sql,
  referralCode: string,
  customerEmail: string,
  customerName: string | null,
  plan: 'Starter' | 'Pro' | 'Agency' | 'Custom',
): Promise<Conversion | null> {
  const affiliate = await findAffiliateByCode(sql, referralCode);
  if (!affiliate) return null;
  const commission = COMMISSIONS[plan] || 0;
  const id = `conv-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const now = new Date().toISOString();
  await sql`
    INSERT INTO conversions (id, affiliate_id, referral_code, customer_email, customer_name, plan, commission, status, created_at)
    VALUES (${id}, ${affiliate.id}, ${affiliate.referral_code}, ${customerEmail.toLowerCase().trim()}, ${customerName || null}, ${plan}, ${commission}, 'pending', ${now})
  `;
  return {
    id,
    affiliate_id: affiliate.id,
    referral_code: affiliate.referral_code,
    customer_email: customerEmail.toLowerCase().trim(),
    customer_name: customerName || null,
    plan,
    commission,
    status: 'pending',
    created_at: now,
    paid_at: null,
  };
}

export async function markConversionPaid(sql: Sql, id: string): Promise<Conversion | null> {
  const now = new Date().toISOString();
  await sql`UPDATE conversions SET status = 'paid', paid_at = ${now} WHERE id = ${id}`;
  const rows = await sql`SELECT * FROM conversions WHERE id = ${id}`;
  return first<Conversion>(rows);
}

export async function getAffiliateStats(sql: Sql, affiliateId: string) {
  const clicksRows = await sql`SELECT COUNT(*)::int as count FROM clicks WHERE affiliate_id = ${affiliateId}`;
  const clicks30Rows = await sql`
    SELECT COUNT(*)::int as count FROM clicks
    WHERE affiliate_id = ${affiliateId} AND created_at > now() - interval '30 days'
  `;
  const conversionsRows = await sql`SELECT COUNT(*)::int as count FROM conversions WHERE affiliate_id = ${affiliateId}`;
  const paidRows = await sql`
    SELECT COALESCE(SUM(commission), 0)::int as total FROM conversions
    WHERE affiliate_id = ${affiliateId} AND status = 'paid'
  `;
  const pendingRows = await sql`
    SELECT COALESCE(SUM(commission), 0)::int as total FROM conversions
    WHERE affiliate_id = ${affiliateId} AND status = 'pending'
  `;
  return {
    clicks: Number(first<{ count: number }>(clicksRows)?.count) || 0,
    clicksLast30: Number(first<{ count: number }>(clicks30Rows)?.count) || 0,
    conversions: Number(first<{ count: number }>(conversionsRows)?.count) || 0,
    totalEarnings: Number(first<{ total: number }>(paidRows)?.total) || 0,
    pendingPayout: Number(first<{ total: number }>(pendingRows)?.total) || 0,
  };
}

export async function getAdminStats(sql: Sql) {
  const totalRows = await sql`SELECT COUNT(*)::int as count FROM affiliates`;
  const activeRows = await sql`SELECT COUNT(*)::int as count FROM affiliates WHERE status = 'active'`;
  const pendingRows = await sql`SELECT COUNT(*)::int as count FROM affiliates WHERE status = 'pending'`;
  const clicksRows = await sql`SELECT COUNT(*)::int as count FROM clicks`;
  const conversionsRows = await sql`SELECT COUNT(*)::int as count FROM conversions`;
  const paidRows = await sql`SELECT COALESCE(SUM(commission), 0)::int as total FROM conversions WHERE status = 'paid'`;
  const pendingPayoutRows = await sql`SELECT COALESCE(SUM(commission), 0)::int as total FROM conversions WHERE status = 'pending'`;
  return {
    totalAffiliates: Number(first<{ count: number }>(totalRows)?.count) || 0,
    activeAffiliates: Number(first<{ count: number }>(activeRows)?.count) || 0,
    pendingAffiliates: Number(first<{ count: number }>(pendingRows)?.count) || 0,
    totalClicks: Number(first<{ count: number }>(clicksRows)?.count) || 0,
    totalConversions: Number(first<{ count: number }>(conversionsRows)?.count) || 0,
    totalPaid: Number(first<{ total: number }>(paidRows)?.total) || 0,
    pendingPayout: Number(first<{ total: number }>(pendingPayoutRows)?.total) || 0,
  };
}

export async function listConversions(sql: Sql): Promise<Conversion[]> {
  return (await sql`SELECT * FROM conversions ORDER BY created_at DESC`) as QueryResult<Conversion>;
}
