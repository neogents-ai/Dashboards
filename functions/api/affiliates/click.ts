import { getDb, recordClick, findAffiliateByCode } from '../../_shared/db';
import { json, errorResponse, sanitize, getClientIp, getUserAgent, withCors, handleCorsPreflight } from '../../_shared/utils';
import type { Env } from '../../_shared/utils';
import type { PagesFunction } from '@cloudflare/workers-types';

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (request.method === 'OPTIONS') return handleCorsPreflight();

  let body: any;
  try {
    body = await request.json();
  } catch {
    return withCors(errorResponse('Invalid JSON', 'INVALID_JSON'), request);
  }

  const code = sanitize(body?.referralCode, 20).replace(/[^a-z0-9]/gi, '');
  if (!code) {
    return withCors(errorResponse('Referral code required', 'MISSING_CODE'), request);
  }

  const db = getDb(env);
  const affiliate = await findAffiliateByCode(db, code);
  if (!affiliate) {
    return withCors(errorResponse('Invalid referral code', 'INVALID_CODE', 404), request);
  }

  const ip = getClientIp(request);
  const userAgent = getUserAgent(request);
  const to = sanitize(body?.to, 120);
  const landing = sanitize(body?.landing || body?.landingPage || '/', 200);
  const referrer = sanitize(body?.referrer || request.headers.get('referer'), 300);

  await recordClick(db, code, {
    ip,
    userAgent,
    to,
    landing,
  });

  return withCors(json({ success: true, referralCode: code, referrer: referrer || undefined }), request);
};

export const onRequestOptions: PagesFunction<Env> = async () => {
  return handleCorsPreflight();
};
