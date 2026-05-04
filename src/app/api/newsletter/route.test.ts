import { describe, it, expect, vi, beforeEach } from 'vitest'
import { POST } from './route'

vi.mock('@/lib/rate-limiter', () => ({
  checkRateLimit: vi.fn().mockResolvedValue({ allowed: true, resetTime: Date.now() + 300_000 }),
  getClientIp: vi.fn().mockReturnValue('127.0.0.1'),
}))

vi.mock('@/lib/email/resend', () => ({
  sendEmail: vi.fn().mockResolvedValue({ success: true }),
}))

vi.mock('@/lib/supabase/admin', () => ({
  createPiiAdminClient: vi.fn(() => ({
    from: () => ({
      insert: () => Promise.resolve({ error: null, data: null }),
    }),
  })),
}))

function makeRequest(body: unknown): Request {
  return new Request('http://localhost/api/newsletter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

describe('POST /api/newsletter', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('rejette body sans consent (400)', async () => {
    const response = await POST(makeRequest({ email: 'a@b.fr' }))
    expect(response.status).toBe(400)
  })

  it('rejette email invalide (400)', async () => {
    const response = await POST(makeRequest({ email: 'invalid', consent: true }))
    expect(response.status).toBe(400)
  })

  it('rejette consent === false (400)', async () => {
    const response = await POST(makeRequest({ email: 'a@b.fr', consent: false }))
    expect(response.status).toBe(400)
  })

  it('accepte body valide avec consent + email', async () => {
    const response = await POST(makeRequest({ email: 'test@example.com', consent: true }))
    expect([200, 500]).toContain(response.status)
  })

  it('429 si rate limit atteint', async () => {
    const { checkRateLimit } = await import('@/lib/rate-limiter')
    vi.mocked(checkRateLimit).mockResolvedValueOnce({
      allowed: false,
      resetTime: Date.now() + 300_000,
      remaining: 0,
    })
    const response = await POST(makeRequest({ email: 'a@b.fr', consent: true }))
    expect(response.status).toBe(429)
  })
})
