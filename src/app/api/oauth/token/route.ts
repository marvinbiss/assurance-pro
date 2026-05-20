/**
 * POST /api/oauth/token
 *
 * Échange code authorization → access_token + refresh_token (grant_type=authorization_code)
 * OU refresh access_token (grant_type=refresh_token).
 *
 * Format request: application/x-www-form-urlencoded (RFC 6749 §3.2).
 */

import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'
import { exchangeCodeForTokens, refreshAccessToken } from '@/lib/oauth/mcp-gateway'

const authCodeSchema = z.object({
  grant_type: z.literal('authorization_code'),
  code: z.string().min(20),
  redirect_uri: z.string().url(),
  client_id: z.string(),
  code_verifier: z.string().min(43).max(128),
})

const refreshSchema = z.object({
  grant_type: z.literal('refresh_token'),
  refresh_token: z.string().min(20),
  client_id: z.string(),
})

export async function POST(req: NextRequest) {
  const ct = req.headers.get('content-type') ?? ''
  let body: Record<string, string> = {}
  if (ct.includes('application/x-www-form-urlencoded')) {
    const form = await req.formData()
    form.forEach((value, key) => {
      body[key] = String(value)
    })
  } else if (ct.includes('application/json')) {
    body = (await req.json()) as Record<string, string>
  } else {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 })
  }

  if (body.grant_type === 'authorization_code') {
    const parsed = authCodeSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'invalid_request' }, { status: 400 })
    }
    const result = await exchangeCodeForTokens(
      parsed.data.code,
      parsed.data.client_id,
      parsed.data.redirect_uri,
      parsed.data.code_verifier
    )
    if ('error' in result) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }
    return NextResponse.json(
      {
        access_token: result.accessToken,
        token_type: result.tokenType,
        expires_in: result.expiresIn,
        refresh_token: result.refreshToken,
        scope: result.scope,
      },
      { headers: { 'cache-control': 'no-store', pragma: 'no-cache' } }
    )
  }

  if (body.grant_type === 'refresh_token') {
    const parsed = refreshSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'invalid_request' }, { status: 400 })
    }
    const result = await refreshAccessToken(parsed.data.refresh_token, parsed.data.client_id)
    if ('error' in result) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }
    return NextResponse.json(
      {
        access_token: result.accessToken,
        token_type: result.tokenType,
        expires_in: result.expiresIn,
        refresh_token: result.refreshToken,
        scope: result.scope,
      },
      { headers: { 'cache-control': 'no-store', pragma: 'no-cache' } }
    )
  }

  return NextResponse.json({ error: 'unsupported_grant_type' }, { status: 400 })
}
