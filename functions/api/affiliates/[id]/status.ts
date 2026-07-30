import { getDb, updateAffiliateStatus, findAffiliateById } from '../../../_shared/db.js';
import { json, errorResponse, requireAdmin, notFound, withCors, handleCorsPreflight } from '../../../_shared/utils.js';
import type { Env } from '../../../_shared/utils.js';
import type { PagesFunction } from '@cloudflare/workers-types';

const VALID_STATUSES = ['pending', 'active', 'inactive'] as const;

export const onRequestPatch: PagesFunction<Env> = async ({ request, env, params }) => {
  if (request.method === 'OPTIONS') return handleCorsPreflight();

  const denied = requireAdmin(request, env);
  if (denied) return withCors(denied, request);

  const id = typeof params?.id === 'string' ? params.id : '';
  if (!id) {
    return withCors(errorResponse('Invalid affiliate id', 'INVALID_ID'), request);
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return withCors(errorResponse('Invalid JSON', 'INVALID_JSON'), request);
  }

  const status = typeof body?.status === 'string' ? body.status.trim() : '';
  if (!VALID_STATUSES.includes(status as (typeof VALID_STATUSES)[number])) {
    return withCors(errorResponse(`Status must be one of: ${VALID_STATUSES.join(', ')}`, 'INVALID_STATUS'), request);
  }

  const db = getDb(env);
  const affiliate = await findAffiliateById(db, id);
  if (!affiliate) return withCors(notFound('Affiliate'), request);

  const updated = await updateAffiliateStatus(db, id, status as (typeof VALID_STATUSES)[number]);
  return withCors(json({ success: true, affiliate: updated }), request);
};

export const onRequestOptions: PagesFunction<Env> = async () => {
  return handleCorsPreflight();
};
