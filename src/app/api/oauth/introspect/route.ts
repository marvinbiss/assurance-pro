/**
 * POST /api/oauth/introspect — RFC 7662 token introspection.
 *
 * Permet aux resource servers (notre /api/mcp) de vérifier la validité
 * d'un access_token sans avoir à le déchiffrer eux-mêmes.
 */

import { NextResponse, type NextRequest } from 'next/server'
import { introspectAccessToken } from '@/lib/oauth/mcp-gateway'

export async function POST(req: NextRequest) {
  const ct = req.headers.get('content-type') ?? ''
  let token: string | undefined
  if (ct.includes('application/x-www-form-urlencoded')) {
    const form = await req.formData()
    token = String(form.get('token') ?? '')
  } else if (ct.includes('application/json')) {
    const body = (await req.json()) as { token?: string }
    token = body.token
  }
  if (!token) {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 })
  }
  const result = await introspectAccessToken(token)
  return NextResponse.json(
    {
      active: result.active,
      ...(result.active && {
        client_id: result.clientId,
        scope: result.scope,
        sub: result.userPseudoId,
        exp: result.exp,
      }),
    },
    { headers: { 'cache-control': 'no-store' } }
  )
}
