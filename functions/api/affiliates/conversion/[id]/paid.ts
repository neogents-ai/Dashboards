import { getDb, markConversionPaid } from '../../../../_shared/db.js';
import { json, errorResponse, requireAdmin, notFound, withCors, handleCorsPreflight } from '../../../../_shared/utils.js';
import type { Env } from '../../../../_shared/utils.js';
import type { PagesFunction } from '@cloudflare/workers-types';

export const onRequestPatch: PagesFunction<Env> = async ({ request, env, params }) => {
  if (request.method === 'OPTIONS') return handleCorsPreflight();

  const denied = requireAdmin(request, env);
  if (denied) return withCors(denied, request);

  const id = typeof params?.id === 'string' ? params.id : '';
  if (!id) {
    return withCors(errorResponse('Invalid conversion id', 'INVALID_ID'), request);
  }

  const db = getDb(env);
  const updated = await markConversionPaid(db, id);
  if (!updated) return withCors(notFound('Conversion'), request);

  return withCors(json({ success: true, conversion: updated }), request);
};

export const onRequestOptions: PagesFunction<Env> = async () => {
  return handleCorsPreflight();
};
