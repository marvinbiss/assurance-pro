/**
 * POST /api/v1/webhooks/test — déclenche envoi test.ping à une subscription.
 *
 * Permet aux développeurs de vérifier que leur endpoint reçoit + valide
 * correctement la signature HMAC sans devoir attendre un vrai event.
 */

import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'
import { logger } from '@/lib/logger'
import { createAdminClient } from '@/lib/supabase/admin'
import { introspectAccessToken } from '@/lib/oauth/mcp-gateway'
import { enqueueWebhookDeliveries, processPendingDeliveries } from '@/lib/webhooks/dispatcher'

const bodySchema = z.object({
  subscription_id: z.string().uuid(),
  event: z.string().default('test.ping'),
})

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }
  const token = authHeader.slice(7)
  const intro = await introspectAccessToken(token)
  if (!intro.active || !intro.clientId) {
    return NextResponse.json({ error: 'invalid_token' }, { status: 401 })
  }

  let payload: unknown
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }
  const parsed = bodySchema.safeParse(payload)
  if (!parsed.success) {
    return NextResponse.json({ error: 'validation_failed' }, { status: 400 })
  }

  const admin = createAdminClient()
  const { data: endpoint } = await admin
    .from('webhook_endpoints')
    .select('id')
    .eq('id', parsed.data.subscription_id)
    .eq('oauth_client_id', intro.clientId)
    .maybeSingle()

  if (!endpoint) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }

  const enqueued = await enqueueWebhookDeliveries({
    event: 'test.ping',
    payload: {
      message: 'Test event from Vivos Assurance webhooks',
      sent_at: new Date().toISOString(),
      docs: 'https://vivos-assurance.fr/docs',
    },
    endpointId: endpoint.id,
  })

  // Process immediately to deliver test event synchronously
  const result = await processPendingDeliveries(10)
  logger.info({ enqueued, result, endpoint_id: endpoint.id }, 'webhook test dispatched')

  return NextResponse.json({
    dispatched: enqueued > 0,
    enqueued,
    immediate_processing: result,
  })
}
