import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GET } from './route'

vi.mock('@/lib/supabase/admin', () => ({
  createAdminClient: vi.fn(() => ({
    from: () => ({
      select: () => Promise.resolve({ error: null, count: 100 }),
    }),
  })),
}))

vi.mock('@/lib/env', () => ({
  env: {
    RESEND_API_KEY: 'fake-key',
    UPSTASH_REDIS_REST_URL: undefined,
  },
}))

describe('GET /api/health', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('retourne JSON avec status healthy, degraded / unhealthy', async () => {
    const response = await GET()
    const body = await response.json()
    expect(['healthy', 'degraded', 'unhealthy']).toContain(body.status)
  })

  it('inclut version + timestamp + uptime', async () => {
    const response = await GET()
    const body = await response.json()
    expect(body.version).toBeTruthy()
    expect(body.timestamp).toBeTruthy()
    expect(body.uptime).toBeGreaterThanOrEqual(0)
  })

  it('inclut le check database (latency mesurée)', async () => {
    const response = await GET()
    const body = await response.json()
    expect(body.checks.database).toBeTruthy()
    expect(body.checks.database.status).toBeTruthy()
  })

  it('header Cache-Control no-store (jamais en cache)', async () => {
    const response = await GET()
    expect(response.headers.get('Cache-Control')).toContain('no-store')
  })

  it('status 200 / 503 (jamais 500)', async () => {
    const response = await GET()
    expect([200, 503]).toContain(response.status)
  })
})
