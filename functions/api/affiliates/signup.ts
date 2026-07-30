import { getDb, createAffiliate, findAffiliateByEmail } from '../../_shared/db.js';
import {
  json,
  errorResponse,
  sanitize,
  sanitizeEmail,
  forwardToFormspree,
  withCors,
  handleCorsPreflight,
} from '../../_shared/utils.js';
import type { Env } from '../../_shared/utils.js';
import type { PagesFunction } from '@cloudflare/workers-types';

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (request.method === 'OPTIONS') return handleCorsPreflight();

  let body: any;
  try {
    body = await request.json();
  } catch {
    return withCors(errorResponse('Invalid JSON', 'INVALID_JSON'), request);
  }

  const name = sanitize(body?.name, 100);
  const email = sanitizeEmail(body?.email);
  const phone = sanitize(body?.phone, 30) || null;
  const how = sanitize(body?.how || body?.vertical || body?.company || 'general', 200);

  if (!name || !email) {
    return withCors(errorResponse('Name and email are required', 'MISSING_FIELDS'), request);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return withCors(errorResponse('Invalid email address', 'INVALID_EMAIL'), request);
  }

  const db = getDb(env);

  const existing = await findAffiliateByEmail(db, email);
  if (existing) {
    return withCors(errorResponse('An affiliate with this email already exists', 'EMAIL_EXISTS'), request);
  }

  const affiliate = await createAffiliate(db, { name, email, phone, how });

  const formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  if (phone) formData.append('phone', phone);
  formData.append('how', how);
  formData.append('referralCode', affiliate.referral_code);
  formData.append('status', affiliate.status);

  await forwardToFormspree(env, formData);

  return withCors(json({ success: true, affiliate }, 201), request);
};

export const onRequestOptions: PagesFunction<Env> = async () => {
  return handleCorsPreflight();
};
