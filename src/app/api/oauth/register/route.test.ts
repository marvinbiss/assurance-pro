import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/lib/security/rate-limit', () => ({
  checkRateLimit: vi.fn().mockResolvedValue(null),
}))

vi.mock('@/lib/supabase/admin', () => {
  const insert = vi.fn().mockResolvedValue({ error: null })
  const from = vi.fn(() => ({ insert }))
  return { createAdminClient: vi.fn(() => ({ from })) }
})

vi.mock('@/lib/logger', () => ({
  logger: { error: vi.fn(), info: vi.fn(), warn: vi.fn() },
}))

const { POST } = await import('./route')

function makeRequest(body: unknown): Request {
  return new Request('http://localhost/api/oauth/register', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })
}

const VALID_BODY = {
  client_name: 'My LLM Integration',
  redirect_uris: ['https://app.example.com/oauth/callback'],
  scope: 'mcp:tools mcp:resources',
  contacts: ['admin@example.com'],
}

describe('POST /api/oauth/register (RFC 7591)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('crée client OAuth → 201 + client_id vc_* + secret vcs_*', async () => {
    const res = await POST(makeRequest(VALID_BODY) as never)
    expect(res.status).toBe(201)
    const body = await res.json()
    expect(body.client_id).toMatch(/^vc_[A-Za-z0-9_-]+$/)
    expect(body.client_secret).toMatch(/^vcs_[A-Za-z0-9_-]+$/)
    expect(body.client_id_issued_at).toBeGreaterThan(0)
    expect(body.grant_types).toContain('authorization_code')
    expect(body.grant_types).toContain('refresh_token')
  })

  it('rejette redirect_uri non-HTTPS (sauf localhost)', async () => {
    const res = await POST(
      makeRequest({ ...VALID_BODY, redirect_uris: ['http://example.com/cb'] }) as never
    )
    expect(res.status).toBe(400)
  })

  it('accepte localhost dev', async () => {
    const res = await POST(
      makeRequest({ ...VALID_BODY, redirect_uris: ['http://localhost:3000/cb'] }) as never
    )
    expect(res.status).toBe(201)
  })

  it('rejette scope non autorisé', async () => {
    const res = await POST(makeRequest({ ...VALID_BODY, scope: 'admin:all' }) as never)
    expect(res.status).toBe(400)
  })

  it('rejette client_name trop court', async () => {
    const res = await POST(makeRequest({ ...VALID_BODY, client_name: 'X' }) as never)
    expect(res.status).toBe(400)
  })

  it('rejette > 5 redirect_uris', async () => {
    const res = await POST(
      makeRequest({
        ...VALID_BODY,
        redirect_uris: Array(6).fill('https://example.com/cb'),
      }) as never
    )
    expect(res.status).toBe(400)
  })

  it('rejette body invalide (400)', async () => {
    const res = await POST(makeRequest({}) as never)
    expect(res.status).toBe(400)
  })

  it('respect rate limit anti-abuse', async () => {
    const { checkRateLimit } = await import('@/lib/security/rate-limit')
    const { NextResponse } = await import('next/server')
    vi.mocked(checkRateLimit).mockResolvedValueOnce(
      NextResponse.json({ error: 'rate_limit_exceeded' }, { status: 429 })
    )
    const res = await POST(makeRequest(VALID_BODY) as never)
    expect(res.status).toBe(429)
  })

  it('réponse warning storage secret', async () => {
    const res = await POST(makeRequest(VALID_BODY) as never)
    const body = await res.json()
    expect(body.warning).toContain('NEVER be displayed again')
  })

  it('cache-control no-store sur réponse (sécurité)', async () => {
    const res = await POST(makeRequest(VALID_BODY) as never)
    expect(res.headers.get('cache-control')).toContain('no-store')
  })
})
