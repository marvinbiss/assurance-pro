import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/lib/email/resend', () => ({
  sendEmail: vi.fn().mockResolvedValue({ success: true }),
}))

vi.mock('@/lib/security/rate-limit', () => ({
  checkRateLimit: vi.fn().mockResolvedValue(null),
}))

vi.mock('@/lib/oauth/mcp-gateway', () => ({
  introspectAccessToken: vi.fn().mockResolvedValue({ active: false }),
}))

vi.mock('@/lib/webhooks/dispatcher', () => ({
  enqueueWebhookDeliveries: vi.fn().mockResolvedValue(0),
}))

vi.mock('@/lib/supabase/admin', () => {
  const update = vi.fn(() => ({ eq: vi.fn().mockResolvedValue({ error: null }) }))
  const insert = vi.fn().mockResolvedValue({ error: null })
  const from = vi.fn(() => ({ insert, update }))
  return { createAdminClient: vi.fn(() => ({ from })) }
})

vi.mock('@/lib/logger', () => ({
  logger: { error: vi.fn(), info: vi.fn(), warn: vi.fn(), debug: vi.fn() },
}))

const { POST, GET } = await import('./route')

function makeRequest(body: unknown, headers: Record<string, string> = {}): Request {
  return new Request('http://localhost/api/v1/agents/booking', {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...headers },
    body: JSON.stringify(body),
  })
}

const VALID_BODY = {
  email: 'test@example.com',
  first_name: 'Marie',
  last_name: 'Dupont',
  garantie: 'rc-pro',
  metier: 'freelance-it',
  statut_juridique: 'auto-entrepreneur',
  ca_annuel: 60000,
  agent_source: 'openai',
  consent_at: new Date().toISOString(),
  consent_text:
    'Je consens à être contacté par le cabinet Vivos pour ma demande de devis assurance RC Pro.',
}

describe('POST /api/v1/agents/booking', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('crée un booking valide → 201 + référence AGT-*', async () => {
    const res = await POST(makeRequest(VALID_BODY) as never)
    expect(res.status).toBe(201)
    const body = await res.json()
    expect(body.status).toBe('created')
    expect(body.booking_reference).toMatch(/^AGT-[A-Z0-9]{1,6}-[A-F0-9]{4}$/)
    expect(body.sla).toContain('courtier')
  })

  it('rejette body manquant email (400)', async () => {
    const { email: _e, ...invalid } = VALID_BODY
    const res = await POST(makeRequest(invalid) as never)
    expect(res.status).toBe(400)
  })

  it('rejette garantie invalide (400)', async () => {
    const res = await POST(makeRequest({ ...VALID_BODY, garantie: 'fake-garantie' }) as never)
    expect(res.status).toBe(400)
  })

  it('rejette agent_source inconnu (400)', async () => {
    const res = await POST(makeRequest({ ...VALID_BODY, agent_source: 'unknown' }) as never)
    expect(res.status).toBe(400)
  })

  it('rejette consent_text trop court (400)', async () => {
    const res = await POST(makeRequest({ ...VALID_BODY, consent_text: 'oui' }) as never)
    expect(res.status).toBe(400)
  })

  it('rejette consent_at non ISO datetime (400)', async () => {
    const res = await POST(makeRequest({ ...VALID_BODY, consent_at: '2026-01-01' }) as never)
    expect(res.status).toBe(400)
  })

  it('rejette ca_annuel négatif (400)', async () => {
    const res = await POST(makeRequest({ ...VALID_BODY, ca_annuel: -1000 }) as never)
    expect(res.status).toBe(400)
  })

  it('rejette Bearer token invalide (401)', async () => {
    const res = await POST(
      makeRequest(VALID_BODY, { authorization: 'Bearer invalid_token' }) as never
    )
    expect(res.status).toBe(401)
  })

  it('rejette JSON body malformé (400)', async () => {
    const req = new Request('http://localhost/api/v1/agents/booking', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{not json',
    })
    const res = await POST(req as never)
    expect(res.status).toBe(400)
  })

  it('retourne 429 si rate limit dépassé', async () => {
    const { checkRateLimit } = await import('@/lib/security/rate-limit')
    const { NextResponse } = await import('next/server')
    vi.mocked(checkRateLimit).mockResolvedValueOnce(
      NextResponse.json({ error: 'rate_limit_exceeded' }, { status: 429 })
    )
    const res = await POST(makeRequest(VALID_BODY) as never)
    expect(res.status).toBe(429)
  })

  it('GET retourne documentation endpoint', async () => {
    const res = GET()
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.endpoint).toBe('/api/v1/agents/booking')
    expect(body.required_fields).toContain('email')
    expect(body.valid_garanties).toContain('decennale')
  })
})
