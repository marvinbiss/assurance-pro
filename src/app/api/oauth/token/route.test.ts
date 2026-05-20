import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/lib/security/rate-limit', () => ({
  checkRateLimit: vi.fn().mockResolvedValue(null),
}))

vi.mock('@/lib/oauth/mcp-gateway', () => ({
  exchangeCodeForTokens: vi.fn(),
  refreshAccessToken: vi.fn(),
}))

const { POST } = await import('./route')

function makeFormRequest(form: Record<string, string>): Request {
  const params = new URLSearchParams(form)
  return new Request('http://localhost/api/oauth/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  })
}

function makeJsonRequest(body: Record<string, string>): Request {
  return new Request('http://localhost/api/oauth/token', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })
}

describe('POST /api/oauth/token', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('rejette content-type non supporté', async () => {
    const req = new Request('http://localhost/api/oauth/token', {
      method: 'POST',
      headers: { 'content-type': 'text/plain' },
      body: 'foo',
    })
    const res = await POST(req as never)
    expect(res.status).toBe(400)
  })

  it('rejette grant_type inconnu', async () => {
    const res = await POST(makeFormRequest({ grant_type: 'password' }) as never)
    expect(res.status).toBe(400)
  })

  it('authorization_code success retourne tokens', async () => {
    const { exchangeCodeForTokens } = await import('@/lib/oauth/mcp-gateway')
    vi.mocked(exchangeCodeForTokens).mockResolvedValueOnce({
      accessToken: 'access_xyz',
      refreshToken: 'refresh_xyz',
      expiresIn: 3600,
      tokenType: 'Bearer',
      scope: 'mcp:tools',
    })
    const res = await POST(
      makeFormRequest({
        grant_type: 'authorization_code',
        code: 'a'.repeat(32),
        redirect_uri: 'https://example.com/cb',
        client_id: 'vc_test',
        code_verifier: 'v'.repeat(64),
      }) as never
    )
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.access_token).toBe('access_xyz')
    expect(body.token_type).toBe('Bearer')
    expect(body.expires_in).toBe(3600)
  })

  it('authorization_code with invalid_grant returns 400', async () => {
    const { exchangeCodeForTokens } = await import('@/lib/oauth/mcp-gateway')
    vi.mocked(exchangeCodeForTokens).mockResolvedValueOnce({ error: 'invalid_grant' })
    const res = await POST(
      makeFormRequest({
        grant_type: 'authorization_code',
        code: 'a'.repeat(32),
        redirect_uri: 'https://example.com/cb',
        client_id: 'vc_test',
        code_verifier: 'v'.repeat(64),
      }) as never
    )
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.error).toBe('invalid_grant')
  })

  it('refresh_token rotation success', async () => {
    const { refreshAccessToken } = await import('@/lib/oauth/mcp-gateway')
    vi.mocked(refreshAccessToken).mockResolvedValueOnce({
      accessToken: 'new_access',
      refreshToken: 'new_refresh',
      expiresIn: 3600,
      tokenType: 'Bearer',
      scope: 'mcp:tools',
    })
    const res = await POST(
      makeFormRequest({
        grant_type: 'refresh_token',
        refresh_token: 'a'.repeat(32),
        client_id: 'vc_test',
      }) as never
    )
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.access_token).toBe('new_access')
  })

  it('accepte aussi content-type JSON', async () => {
    const { exchangeCodeForTokens } = await import('@/lib/oauth/mcp-gateway')
    vi.mocked(exchangeCodeForTokens).mockResolvedValueOnce({
      accessToken: 'x',
      refreshToken: 'y',
      expiresIn: 3600,
      tokenType: 'Bearer',
      scope: 'mcp:tools',
    })
    const res = await POST(
      makeJsonRequest({
        grant_type: 'authorization_code',
        code: 'a'.repeat(32),
        redirect_uri: 'https://example.com/cb',
        client_id: 'vc_test',
        code_verifier: 'v'.repeat(64),
      }) as never
    )
    expect(res.status).toBe(200)
  })

  it('rejette authorization_code avec code trop court', async () => {
    const res = await POST(
      makeFormRequest({
        grant_type: 'authorization_code',
        code: 'short',
        redirect_uri: 'https://example.com/cb',
        client_id: 'vc_test',
        code_verifier: 'v'.repeat(64),
      }) as never
    )
    expect(res.status).toBe(400)
  })

  it('rate limit dépassé → 429', async () => {
    const { checkRateLimit } = await import('@/lib/security/rate-limit')
    const { NextResponse } = await import('next/server')
    vi.mocked(checkRateLimit).mockResolvedValueOnce(
      NextResponse.json({ error: 'rate_limit_exceeded' }, { status: 429 })
    )
    const res = await POST(makeFormRequest({ grant_type: 'authorization_code' }) as never)
    expect(res.status).toBe(429)
  })

  it('réponse contient cache-control no-store + pragma no-cache (RFC 6749)', async () => {
    const { exchangeCodeForTokens } = await import('@/lib/oauth/mcp-gateway')
    vi.mocked(exchangeCodeForTokens).mockResolvedValueOnce({
      accessToken: 'x',
      refreshToken: 'y',
      expiresIn: 3600,
      tokenType: 'Bearer',
      scope: 'mcp:tools',
    })
    const res = await POST(
      makeFormRequest({
        grant_type: 'authorization_code',
        code: 'a'.repeat(32),
        redirect_uri: 'https://example.com/cb',
        client_id: 'vc_test',
        code_verifier: 'v'.repeat(64),
      }) as never
    )
    expect(res.headers.get('cache-control')).toContain('no-store')
    expect(res.headers.get('pragma')).toBe('no-cache')
  })
})
