/**
 * CRON — Webhook dispatcher worker.
 *
 * Cadence: toutes les 5 minutes (Vercel Cron).
 * Traite jusqu'à 50 deliveries pending par run.
 * Retry exponentiel: 1m, 5m, 30m, 3h, 12h (5 essais max).
 * Auto-disable endpoint après 10 deliveries dead_letter consécutives.
 */

import { NextResponse, type NextRequest } from 'next/server'
import { logger } from '@/lib/logger'
import { verifyCronAuthorization } from '@/lib/security/cron-auth'
import { processPendingDeliveries } from '@/lib/webhooks/dispatcher'

export async function GET(req: NextRequest) {
  if (!verifyCronAuthorization(req.headers.get('authorization'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const t0 = Date.now()
  const result = await processPendingDeliveries(50)
  const duration_ms = Date.now() - t0

  logger.info({ ...result, duration_ms }, 'webhook-dispatcher completed')
  return NextResponse.json({ ...result, duration_ms })
}
