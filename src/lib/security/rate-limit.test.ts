import { describe, it, expect, vi, beforeEach } from 'vitest'

const mockRpc = vi.fn()

vi.mock('@/lib/supabase/admin', () => ({
  createAdminClient: vi.fn(() => ({ rpc: mockRpc })),
}))

vi.mock('@/lib/logger', () => ({
  logger: { error: vi.fn(), warn: vi.fn(), info: vi.fn() },
}))

const { checkRateLimit } = await import('./rate-limit')

function makeRequest(headers: Record<string, string> = {}): import('next/server').NextRequest {
  return {
    headers: new Headers(headers),
  } as never
}

describe('checkRateLimit (Supabase-based)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns null si allowed=true (laisse passer)', async () => {
    mockRpc.mockResolvedValueOnce({
      data: [{ allowed: true, current_count: 1, reset_at: new Date().toISOString() }],
      error: null,
    })
    const res = await checkRateLimit(makeRequest(), 'test.route', { max: 10, window: 60 })
    expect(res).toBeNull()
  })

  it('returns 429 si allowed=false', async () => {
    mockRpc.mockResolvedValueOnce({
      data: [
        {
          allowed: false,
          current_count: 11,
          reset_at: new Date(Date.now() + 30_000).toISOString(),
        },
      ],
      error: null,
    })
    const res = await checkRateLimit(makeRequest(), 'test.route', { max: 10, window: 60 })
    expect(res).not.toBeNull()
    expect(res!.status).toBe(429)
    const body = await res!.json()
    expect(body.error).toBe('rate_limit_exceeded')
    expect(res!.headers.get('retry-after')).toBeDefined()
    expect(res!.headers.get('x-ratelimit-limit')).toBe('10')
  })

  it('fail-open si RPC error (logs warn, laisse passer)', async () => {
    mockRpc.mockResolvedValueOnce({ data: null, error: { message: 'RPC failed' } })
    const res = await checkRateLimit(makeRequest(), 'test.route', { max: 10, window: 60 })
    expect(res).toBeNull()
  })

  it('fail-open si exception (laisse passer)', async () => {
    mockRpc.mockRejectedValueOnce(new Error('network'))
    const res = await checkRateLimit(makeRequest(), 'test.route', { max: 10, window: 60 })
    expect(res).toBeNull()
  })

  it('utilise client:<oauth_id> si authClientId fourni', async () => {
    mockRpc.mockResolvedValueOnce({
      data: [{ allowed: true, current_count: 1, reset_at: new Date().toISOString() }],
      error: null,
    })
    await checkRateLimit(makeRequest(), 'test.route', { max: 10, window: 60 }, 'vc_xyz')
    expect(mockRpc).toHaveBeenCalledWith(
      'check_rate_limit',
      expect.objectContaining({
        p_identifier: 'client:vc_xyz',
      })
    )
  })

  it('utilise ip:<hash> sinon (RGPD-safe)', async () => {
    mockRpc.mockResolvedValueOnce({
      data: [{ allowed: true, current_count: 1, reset_at: new Date().toISOString() }],
      error: null,
    })
    await checkRateLimit(makeRequest({ 'x-forwarded-for': '1.2.3.4' }), 'test.route', {
      max: 10,
      window: 60,
    })
    const call = mockRpc.mock.calls[0]?.[1] as { p_identifier: string }
    expect(call.p_identifier).toMatch(/^ip:[a-f0-9]{32}$/)
  })
})
