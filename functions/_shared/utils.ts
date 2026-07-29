import type { D1Database } from '@cloudflare/workers-types';

export interface Env {
  DB?: D1Database;
  AFFILIATE_ADMIN_TOKEN?: string;
  FORMSPREE_AFFILIATE_ENDPOINT?: string;
}

export function json(body: unknown, status = 200, extraHeaders?: Record<string, string>): Response {
  const headers: Record<string, string> = { 'Content-Type': 'application/json', ...extraHeaders };
  return new Response(JSON.stringify(body), { status, headers });
}

export function errorResponse(message: string, code: string, status = 400): Response {
  return json({ success: false, error: message, code }, status);
}

export function unauthorized(): Response {
  return errorResponse('Unauthorized', 'UNAUTHORIZED', 401);
}

export function notFound(resource = 'Resource'): Response {
  return errorResponse(`${resource} not found`, 'NOT_FOUND', 404);
}

export function sanitize(val: unknown, max = 200): string {
  if (typeof val !== 'string') return '';
  return val.trim().replace(/[<>'`]/g, '').slice(0, max);
}

export function sanitizeEmail(val: unknown): string {
  if (typeof val !== 'string') return '';
  return val.trim().toLowerCase().replace(/[<>'`\s]/g, '').slice(0, 120);
}

export function getClientIp(request: Request): string | null {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return null;
}

export function getUserAgent(request: Request): string | null {
  return request.headers.get('user-agent');
}

export function checkAdminToken(request: Request, env: Env): boolean {
  const header = request.headers.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  const expected = env.AFFILIATE_ADMIN_TOKEN || '';
  return Boolean(expected && token === expected);
}

export function requireAdmin(request: Request, env: Env): Response | null {
  if (!checkAdminToken(request, env)) return unauthorized();
  return null;
}

export async function forwardToFormspree(env: Env, formData: FormData): Promise<void> {
  const endpoint = env.FORMSPREE_AFFILIATE_ENDPOINT;
  if (!endpoint) return;
  try {
    await fetch(endpoint, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    });
  } catch (err) {
    console.error('Formspree forward failed:', err);
  }
}

export function withCors(response: Response, request: Request): Response {
  const origin = request.headers.get('origin') || '*';
  const allowed = ['http://localhost', 'https://neogents.tech', 'https://www.neogents.tech', 'https://*.pages.dev'];
  const corsOrigin = allowed.some((pattern) => {
    if (pattern.endsWith('.pages.dev')) {
      return origin.endsWith('.pages.dev');
    }
    return origin === pattern || origin.startsWith(pattern.replace('*', ''));
  })
    ? origin
    : 'https://neogents.tech';
  const headers = new Headers(response.headers);
  headers.set('Access-Control-Allow-Origin', corsOrigin);
  headers.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return new Response(response.body, { status: response.status, headers });
}

export function handleCorsPreflight(): Response {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
