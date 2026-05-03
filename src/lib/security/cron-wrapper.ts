import { NextResponse } from 'next/server'
import { logger } from '@/lib/logger'
import { verifyCronAuthorization } from './cron-auth'

/**
 * Wrapper pour les routes cron Vercel.
 * Centralise : auth timing-safe, logging structuré, fallback 500 sans leak.
 *
 * Usage :
 *   export const GET = withCronAuth('sla-reclamations', async () => {
 *     // ... business logic
 *     return { processed: 42 }
 *   })
 */

type CronHandler = (request: Request) => Promise<Record<string, unknown> | NextResponse>

export function withCronAuth(name: string, handler: CronHandler) {
  return async (request: Request): Promise<NextResponse> => {
    if (!verifyCronAuthorization(request.headers.get('authorization'))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const start = Date.now()
    try {
      const result = await handler(request)
      if (result instanceof NextResponse) return result
      const duration = Date.now() - start
      logger.info({ ...result, duration_ms: duration }, `cron ${name} completed`)
      return NextResponse.json({ ok: true, ...result })
    } catch (err) {
      logger.error({ err, duration_ms: Date.now() - start }, `cron ${name} failed`)
      return NextResponse.json({ error: 'Internal error' }, { status: 500 })
    }
  }
}
