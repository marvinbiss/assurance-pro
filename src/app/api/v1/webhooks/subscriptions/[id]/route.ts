/**
 * DELETE /api/v1/webhooks/subscriptions/{id} — supprime subscription.
 * GET /api/v1/webhooks/subscriptions/{id} — détails + 20 dernières deliveries.
 */

import { NextResponse, type NextRequest } from 'next/server'
import { logger } from '@/lib/logger'
import { createAdminClient } from '@/lib/supabase/admin'
import { introspectAccessToken } from '@/lib/oauth/mcp-gateway'

async function authenticate(req: NextRequest): Promise<{ clientId: string } | NextResponse> {
  const authHeader = req.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }
  const token = authHeader.slice(7)
  const intro = await introspectAccessToken(token)
  if (!intro.active || !intro.clientId) {
    return NextResponse.json({ error: 'invalid_token' }, { status: 401 })
  }
  return { clientId: intro.clientId }
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authenticate(req)
  if (auth instanceof NextResponse) return auth
  const { id } = await params

  const admin = createAdminClient()
  const { data: endpoint, error } = await admin
    .from('webhook_endpoints')
    .select(
      'id, url, secret_preview, description, events, active, failure_count, last_delivery_at, last_success_at, last_failure_at, created_at, disabled_at'
    )
    .eq('id', id)
    .eq('oauth_client_id', auth.clientId)
    .maybeSingle()

  if (error || !endpoint) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }

  const { data: deliveries } = await admin
    .from('webhook_deliveries')
    .select(
      'id, event_type, status, attempts, response_status, error_message, created_at, delivered_at'
    )
    .eq('endpoint_id', id)
    .order('created_at', { ascending: false })
    .limit(20)

  return NextResponse.json({ ...endpoint, recent_deliveries: deliveries ?? [] })
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authenticate(req)
  if (auth instanceof NextResponse) return auth
  const { id } = await params

  const admin = createAdminClient()
  const { error, count } = await admin
    .from('webhook_endpoints')
    .delete({ count: 'exact' })
    .eq('id', id)
    .eq('oauth_client_id', auth.clientId)

  if (error) {
    logger.error({ err: error }, 'webhooks.delete failed')
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }
  if (!count) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }
  return new NextResponse(null, { status: 204 })
}
