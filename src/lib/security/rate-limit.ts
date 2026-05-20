/**
 * Rate limiting Supabase-backed (fixed window).
 *
 * Usage:
 *   const limited = await checkRateLimit(req, 'embeddings.post', { max: 30, window: 60 })
 *   if (limited) return limited  // NextResponse 429
 */

import { NextResponse, type NextRequest } from 'next/server'
import { createHash } from 'node:crypto'
import { logger } from '@/lib/logger'
import { createAdminClient } from '@/lib/supabase/admin'

export interface RateLimitOptions {
  /** Nombre max de requêtes dans la fenêtre */
  max: number
  /** Taille de la fenêtre en secondes */
  window: number
}

function getClientIdentifier(req: NextRequest, authClientId: string | null): string {
  if (authClientId) return `client:${authClientId}`
  const forwarded = req.headers.get('x-forwarded-for')
  const ip = forwarded?.split(',')[0]?.trim() ?? req.headers.get('x-real-ip') ?? 'unknown'
  const ipHash = createHash('sha256').update(ip).digest('hex').slice(0, 32)
  return `ip:${ipHash}`
}

export async function checkRateLimit(
  req: NextRequest,
  route: string,
  options: RateLimitOptions,
  authClientId: string | null = null
): Promise<NextResponse | null> {
  const identifier = getClientIdentifier(req, authClientId)
  const admin = createAdminClient()
  try {
    const { data, error } = await admin.rpc('check_rate_limit', {
      p_identifier: identifier,
      p_route: route,
      p_window_seconds: options.window,
      p_max_requests: options.max,
    })
    if (error) {
      // Fail-open: en cas d'erreur RPC, laisse passer mais log
      logger.warn({ err: error, route, identifier }, 'rate_limit: RPC failed, fail-open')
      return null
    }
    const row = (data as Array<{ allowed: boolean; current_count: number; reset_at: string }>)?.[0]
    if (!row) return null
    if (!row.allowed) {
      const resetSeconds = Math.max(
        0,
        Math.floor((new Date(row.reset_at).getTime() - Date.now()) / 1000)
      )
      return NextResponse.json(
        {
          error: 'rate_limit_exceeded',
          retry_after_seconds: resetSeconds,
          max_per_window: options.max,
          window_seconds: options.window,
        },
        {
          status: 429,
          headers: {
            'retry-after': String(resetSeconds),
            'x-ratelimit-limit': String(options.max),
            'x-ratelimit-remaining': '0',
            'x-ratelimit-reset': row.reset_at,
          },
        }
      )
    }
    return null
  } catch (err) {
    logger.warn({ err, route, identifier }, 'rate_limit: caught error, fail-open')
    return null
  }
}
