import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/lib/oauth/mcp-gateway', () => ({
  introspectAccessToken: vi.fn(),
}))

const mockOrder = vi.fn().mockResolvedValue({ data: [], error: null })
const mockEq = vi.fn(() => ({ order: mockOrder }))
const mockSelect = vi.fn(() => ({ eq: mockEq }))
const mockSingle = vi.fn().mockResolvedValue({
  data: {
    id: '11111111-1111-1111-1111-111111111111',
    url: 'https://example.com/webhook',
    secret_preview: 'abc12345',
    description: 'Test',
    events: ['agent_booking.created'],
    active: true,
    created_at: new Date().toISOString(),
  },
  error: null,
})
const mockInsertSelect = vi.fn(() => ({ single: mockSingle }))
const mockInsert = vi.fn(() => ({ select: mockInsertSelect }))
const mockFrom = vi.fn(() => ({ select: mockSelect, insert: mockInsert }))

vi.mock('@/lib/supabase/admin', () => ({
  createAdminClient: vi.fn(() => ({ from: mockFrom })),
}))

vi.mock('@/lib/logger', () => ({
  logger: { error: vi.fn(), info: vi.fn(), warn: vi.fn() },
}))

const ORIGINAL_KEY = process.env.WEBHOOK_ENCRYPTION_KEY
process.env.WEBHOOK_ENCRYPTION_KEY = 'c'.repeat(64)

const { POST, GET } = await import('./route')

function makeRequest(body: unknown, token?: string): Request {
  const headers: Record<string, string> = { 'content-type': 'application/json' }
  if (token) headers['authorization'] = `Bearer ${token}`
  return new Request('http://localhost/api/v1/webhooks/subscriptions', {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })
}

function makeListRequest(token?: string): Request {
  const headers: Record<string, string> = {}
  if (token) headers['authorization'] = `Bearer ${token}`
  return new Request('http://localhost/api/v1/webhooks/subscriptions', { headers })
}

// Restore env on process exit (vitest doesn't expose top-level afterAll here)
process.on('exit', () => {
  if (ORIGINAL_KEY === undefined) delete process.env.WEBHOOK_ENCRYPTION_KEY
  else process.env.WEBHOOK_ENCRYPTION_KEY = ORIGINAL_KEY
})

describe('POST /api/v1/webhooks/subscriptions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('rejette sans Authorization Bearer (401)', async () => {
    const res = await POST(makeRequest({}) as never)
    expect(res.status).toBe(401)
  })

  it('rejette token invalide (401)', async () => {
    const { introspectAccessToken } = await import('@/lib/oauth/mcp-gateway')
    vi.mocked(introspectAccessToken).mockResolvedValueOnce({ active: false })
    const res = await POST(makeRequest({}, 'bad_token') as never)
    expect(res.status).toBe(401)
  })

  it('crée subscription avec secret retourné UNE fois', async () => {
    const { introspectAccessToken } = await import('@/lib/oauth/mcp-gateway')
    vi.mocked(introspectAccessToken).mockResolvedValueOnce({
      active: true,
      clientId: 'vc_test',
      scope: 'mcp:tools',
    })
    const res = await POST(
      makeRequest(
        {
          url: 'https://example.com/webhook',
          events: ['agent_booking.created'],
          description: 'Test webhook',
        },
        'valid'
      ) as never
    )
    expect(res.status).toBe(201)
    const body = await res.json()
    expect(body.secret).toMatch(/^whsec_/)
    expect(body.warning).toContain('NEVER')
  })

  it('rejette URL HTTP non-HTTPS', async () => {
    const { introspectAccessToken } = await import('@/lib/oauth/mcp-gateway')
    vi.mocked(introspectAccessToken).mockResolvedValueOnce({
      active: true,
      clientId: 'vc_test',
      scope: 'mcp:tools',
    })
    const res = await POST(
      makeRequest(
        {
          url: 'http://example.com/webhook',
          events: ['agent_booking.created'],
        },
        'valid'
      ) as never
    )
    expect(res.status).toBe(400)
  })

  it('rejette event inconnu', async () => {
    const { introspectAccessToken } = await import('@/lib/oauth/mcp-gateway')
    vi.mocked(introspectAccessToken).mockResolvedValueOnce({
      active: true,
      clientId: 'vc_test',
      scope: 'mcp:tools',
    })
    const res = await POST(
      makeRequest(
        {
          url: 'https://example.com/webhook',
          events: ['unknown.event'],
        },
        'valid'
      ) as never
    )
    expect(res.status).toBe(400)
  })

  it('rejette events vides', async () => {
    const { introspectAccessToken } = await import('@/lib/oauth/mcp-gateway')
    vi.mocked(introspectAccessToken).mockResolvedValueOnce({
      active: true,
      clientId: 'vc_test',
      scope: 'mcp:tools',
    })
    const res = await POST(
      makeRequest(
        {
          url: 'https://example.com/webhook',
          events: [],
        },
        'valid'
      ) as never
    )
    expect(res.status).toBe(400)
  })
})

describe('GET /api/v1/webhooks/subscriptions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('rejette sans auth (401)', async () => {
    const res = await GET(makeListRequest() as never)
    expect(res.status).toBe(401)
  })

  it('liste subscriptions pour OAuth client', async () => {
    const { introspectAccessToken } = await import('@/lib/oauth/mcp-gateway')
    vi.mocked(introspectAccessToken).mockResolvedValueOnce({
      active: true,
      clientId: 'vc_test',
      scope: 'mcp:tools',
    })
    const res = await GET(makeListRequest('valid') as never)
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(Array.isArray(body)).toBe(true)
  })
})
