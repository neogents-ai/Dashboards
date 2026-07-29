import { getDb, findAffiliateByCode } from '../../_shared/db';
import { json, errorResponse, notFound, sanitize, withCors, handleCorsPreflight } from '../../_shared/utils';
import type { Env } from '../../_shared/utils';
import type { PagesFunction } from '@cloudflare/workers-types';

export const onRequestGet: PagesFunction<Env> = async ({ request, env, params }) => {
  if (request.method === 'OPTIONS') return handleCorsPreflight();

  const code = sanitize(params?.referralCode, 20).replace(/[^a-z0-9]/gi, '');
  if (!code) {
    return withCors(errorResponse('Invalid referral code', 'INVALID_CODE'), request);
  }

  const db = getDb(env);
  const affiliate = await findAffiliateByCode(db, code);
  if (!affiliate) return withCors(notFound('Affiliate'), request);

  return withCors(json({ success: true, affiliate }), request);
};

export const onRequestOptions: PagesFunction<Env> = async ({ request }) => {
  return handleCorsPreflight();
};
