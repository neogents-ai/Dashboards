import { getDb, getAdminStats, listConversions } from '../../../_shared/db.js';
import { json, requireAdmin, withCors, handleCorsPreflight } from '../../../_shared/utils.js';
import type { Env } from '../../../_shared/utils.js';
import type { PagesFunction } from '@cloudflare/workers-types';

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  if (request.method === 'OPTIONS') return handleCorsPreflight();

  const denied = requireAdmin(request, env);
  if (denied) return withCors(denied, request);

  const db = getDb(env);
  const [stats, conversions] = await Promise.all([getAdminStats(db), listConversions(db)]);

  return withCors(json({ success: true, stats, conversions }), request);
};

export const onRequestOptions: PagesFunction<Env> = async ({ request }) => {
  return handleCorsPreflight();
};
