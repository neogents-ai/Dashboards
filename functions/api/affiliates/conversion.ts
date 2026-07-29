import { getDb, recordConversion, findAffiliateByCode } from '../../_shared/db';
import { json, errorResponse, sanitize, sanitizeEmail, requireAdmin, withCors, handleCorsPreflight } from '../../_shared/utils';
import type { Env } from '../../_shared/utils';
import type { PagesFunction } from '@cloudflare/workers-types';

const VALID_PLANS = ['Starter', 'Pro', 'Agency', 'Custom'] as const;

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (request.method === 'OPTIONS') return handleCorsPreflight();

  const denied = requireAdmin(request, env);
  if (denied) return withCors(denied, request);

  let body: any;
  try {
    body = await request.json();
  } catch {
    return withCors(errorResponse('Invalid JSON', 'INVALID_JSON'), request);
  }

  const code = sanitize(body?.referralCode, 20).replace(/[^a-z0-9]/gi, '');
  const customerEmail = sanitizeEmail(body?.customerEmail);
  const customerName = sanitize(body?.customerName, 100) || null;
  const planInput = sanitize(body?.plan, 20);
  const plan = VALID_PLANS.includes(planInput as (typeof VALID_PLANS)[number])
    ? (planInput as (typeof VALID_PLANS)[number])
    : 'Custom';

  if (!code) {
    return withCors(errorResponse('Referral code required', 'MISSING_CODE'), request);
  }
  if (!customerEmail) {
    return withCors(errorResponse('Customer email required', 'MISSING_EMAIL'), request);
  }

  const db = getDb(env);
  const affiliate = await findAffiliateByCode(db, code);
  if (!affiliate) {
    return withCors(errorResponse('Invalid referral code', 'INVALID_CODE', 404), request);
  }

  const conversion = await recordConversion(db, code, customerEmail, customerName, plan);
  if (!conversion) {
    return withCors(errorResponse('Failed to record conversion', 'DB_ERROR', 500), request);
  }

  return withCors(json({ success: true, conversion }, 201), request);
};

export const onRequestOptions: PagesFunction<Env> = async () => {
  return handleCorsPreflight();
};
