import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { randomUUID } from 'crypto';

export type AffiliateStatus = 'pending' | 'active' | 'inactive';

export interface Affiliate {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  how: string;
  referralCode: string;
  createdAt: string;
  status: AffiliateStatus;
  payoutMethod?: string | null;
  payoutAddress?: string | null;
}

export interface ClickEvent {
  id: string;
  affiliateId: string;
  referralCode: string;
  ip: string | null;
  userAgent: string | null;
  to: string | null;
  landing: string;
  createdAt: string;
}

export interface ConversionEvent {
  id: string;
  affiliateId: string;
  referralCode: string;
  customerEmail: string;
  customerName: string | null;
  plan: 'Starter' | 'Pro' | 'Agency' | 'Custom';
  commission: number;
  status: 'pending' | 'paid';
  createdAt: string;
  paidAt: string | null;
}

interface StoreSchema {
  affiliates: Affiliate[];
  clicks: ClickEvent[];
  conversions: ConversionEvent[];
  version: number;
}

const DATA_DIR = process.env.DATA_DIR || join(__dirname, '..', 'data');
const STORE_FILE = join(DATA_DIR, 'affiliates.json');

const COMMISSIONS: Record<string, number> = {
  Starter: 78,
  Pro: 190,
  Agency: 286,
  Custom: 458,
};

function ensureStore(): StoreSchema {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!existsSync(STORE_FILE)) {
    const initial: StoreSchema = { affiliates: [], clicks: [], conversions: [], version: 1 };
    writeFileSync(STORE_FILE, JSON.stringify(initial, null, 2), 'utf-8');
    return initial;
  }
  try {
    const raw = readFileSync(STORE_FILE, 'utf-8');
    const parsed = JSON.parse(raw) as StoreSchema;
    parsed.affiliates = parsed.affiliates || [];
    parsed.clicks = parsed.clicks || [];
    parsed.conversions = parsed.conversions || [];
    return parsed;
  } catch {
    const fresh: StoreSchema = { affiliates: [], clicks: [], conversions: [], version: 1 };
    writeFileSync(STORE_FILE, JSON.stringify(fresh, null, 2), 'utf-8');
    return fresh;
  }
}

function saveStore(store: StoreSchema): void {
  writeFileSync(STORE_FILE, JSON.stringify(store, null, 2), 'utf-8');
}

export function listAffiliates(): Affiliate[] {
  return ensureStore().affiliates;
}

export function findAffiliateByEmail(email: string): Affiliate | undefined {
  return ensureStore().affiliates.find(
    (a) => a.email.toLowerCase() === email.toLowerCase(),
  );
}

export function findAffiliateByCode(referralCode: string): Affiliate | undefined {
  return ensureStore().affiliates.find(
    (a) => a.referralCode.toUpperCase() === referralCode.toUpperCase(),
  );
}

export function findAffiliateById(id: string): Affiliate | undefined {
  return ensureStore().affiliates.find((a) => a.id === id);
}

function generateReferralCode(name: string): string {
  const clean = name.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 6);
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${clean}${random}`;
}

export function createAffiliate(
  name: string,
  email: string,
  phone: string | null,
  how: string,
): Affiliate {
  const store = ensureStore();
  const referralCode = generateReferralCode(name);
  const affiliate: Affiliate = {
    id: `aff-${Date.now()}`,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone ? phone.trim() : null,
    how: how.trim(),
    referralCode,
    createdAt: new Date().toISOString(),
    status: 'pending',
  };
  store.affiliates.push(affiliate);
  saveStore(store);
  return affiliate;
}

export function updateAffiliateStatus(
  id: string,
  status: AffiliateStatus,
): Affiliate | undefined {
  const store = ensureStore();
  const affiliate = store.affiliates.find((a) => a.id === id);
  if (!affiliate) return undefined;
  affiliate.status = status;
  saveStore(store);
  return affiliate;
}

export function recordClick(
  referralCode: string,
  meta: { ip: string | null; userAgent: string | null; to: string | null; landing: string },
): ClickEvent | null {
  const store = ensureStore();
  const affiliate = findAffiliateByCode(referralCode);
  if (!affiliate) return null;
  const click: ClickEvent = {
    id: randomUUID(),
    affiliateId: affiliate.id,
    referralCode: affiliate.referralCode,
    ip: meta.ip,
    userAgent: meta.userAgent,
    to: meta.to,
    landing: meta.landing,
    createdAt: new Date().toISOString(),
  };
  store.clicks.push(click);
  saveStore(store);
  return click;
}

export function recordConversion(
  referralCode: string,
  customerEmail: string,
  customerName: string | null,
  plan: 'Starter' | 'Pro' | 'Agency' | 'Custom',
): ConversionEvent | null {
  const store = ensureStore();
  const affiliate = findAffiliateByCode(referralCode);
  if (!affiliate) return null;
  const commission = COMMISSIONS[plan] || 0;
  const conversion: ConversionEvent = {
    id: `conv-${Date.now()}`,
    affiliateId: affiliate.id,
    referralCode: affiliate.referralCode,
    customerEmail: customerEmail.toLowerCase().trim(),
    customerName: customerName ? customerName.trim() : null,
    plan,
    commission,
    status: 'pending',
    createdAt: new Date().toISOString(),
    paidAt: null,
  };
  store.conversions.push(conversion);
  saveStore(store);
  return conversion;
}

export function markConversionPaid(id: string): ConversionEvent | undefined {
  const store = ensureStore();
  const conversion = store.conversions.find((c) => c.id === id);
  if (!conversion) return undefined;
  conversion.status = 'paid';
  conversion.paidAt = new Date().toISOString();
  saveStore(store);
  return conversion;
}

export function getAffiliateStats(affiliateId: string) {
  const store = ensureStore();
  const clicks = store.clicks.filter((c) => c.affiliateId === affiliateId);
  const conversions = store.conversions.filter((c) => c.affiliateId === affiliateId);
  const pending = conversions.filter((c) => c.status === 'pending');
  const paid = conversions.filter((c) => c.status === 'paid');
  const totalEarnings = paid.reduce((sum, c) => sum + c.commission, 0);
  const pendingPayout = pending.reduce((sum, c) => sum + c.commission, 0);
  return {
    clicks: clicks.length,
    conversions: conversions.length,
    totalEarnings,
    pendingPayout,
    clicksLast30: clicks.filter(
      (c) => new Date(c.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    ).length,
  };
}

export function getAdminStats() {
  const store = ensureStore();
  const active = store.affiliates.filter((a) => a.status === 'active').length;
  const pending = store.affiliates.filter((a) => a.status === 'pending').length;
  const totalConversions = store.conversions.length;
  const totalPaid = store.conversions
    .filter((c) => c.status === 'paid')
    .reduce((sum, c) => sum + c.commission, 0);
  const pendingPayout = store.conversions
    .filter((c) => c.status === 'pending')
    .reduce((sum, c) => sum + c.commission, 0);
  return {
    totalAffiliates: store.affiliates.length,
    activeAffiliates: active,
    pendingAffiliates: pending,
    totalClicks: store.clicks.length,
    totalConversions,
    totalPaid,
    pendingPayout,
  };
}

export function listConversions(): ConversionEvent[] {
  return ensureStore().conversions;
}

export function listClicks(): ClickEvent[] {
  return ensureStore().clicks;
}

export { COMMISSIONS };
