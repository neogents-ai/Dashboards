import { getDb, listAffiliates } from '../../_shared/db';
import { json, requireAdmin, withCors, handleCorsPreflight } from '../../_shared/utils';
import type { Env } from '../../_shared/utils';
import type { PagesFunction } from '@cloudflare/workers-types';

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  if (request.method === 'OPTIONS') return handleCorsPreflight();

  const denied = requireAdmin(request, env);
  if (denied) return withCors(denied, request);

  const db = getDb(env);
  const affiliates = await listAffiliates(db);
  return withCors(json({ success: true, affiliates }), request);
};

export const onRequestOptions: PagesFunction<Env> = async ({ request }) => {
  return handleCorsPreflight();
};
