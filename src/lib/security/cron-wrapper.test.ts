// @vitest-environment node
import { describe, it, expect, beforeEach } from 'vitest'
import { withCronAuth } from './cron-wrapper'

const VALID_SECRET = 'super-secret-token-1234567890'

function makeRequest(authHeader: string | null): Request {
  const headers = new Headers()
  if (authHeader) headers.set('authorization', authHeader)
  return new Request('http://localhost/api/cron/test', { method: 'GET', headers })
}

describe('withCronAuth', () => {
  beforeEach(() => {
    process.env.CRON_SECRET = VALID_SECRET
  })

  it('rejects missing authorization with 401', async () => {
    const handler = withCronAuth('test', async () => ({ processed: 0 }))
    const res = await handler(makeRequest(null))
    expect(res.status).toBe(401)
    const body = await res.json()
    expect(body.error).toBe('Unauthorized')
  })

  it('rejects wrong token with 401', async () => {
    const handler = withCronAuth('test', async () => ({ processed: 0 }))
    const res = await handler(makeRequest('Bearer wrong-token-1234567890123'))
    expect(res.status).toBe(401)
  })

  it('accepts valid token and returns wrapped result', async () => {
    const handler = withCronAuth('test', async () => ({ processed: 42, total: 100 }))
    const res = await handler(makeRequest(`Bearer ${VALID_SECRET}`))
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.ok).toBe(true)
    expect(body.processed).toBe(42)
    expect(body.total).toBe(100)
  })

  it('passes through if handler returns its own NextResponse', async () => {
    const { NextResponse } = await import('next/server')
    const custom = NextResponse.json({ custom: true }, { status: 202 })
    const handler = withCronAuth('test', async () => custom)
    const res = await handler(makeRequest(`Bearer ${VALID_SECRET}`))
    expect(res.status).toBe(202)
  })

  it('catches handler error and returns 500 without leaking stack', async () => {
    const handler = withCronAuth('test', async () => {
      throw new Error('SECRET-DB-DETAIL: connection refused at host=internal-db')
    })
    const res = await handler(makeRequest(`Bearer ${VALID_SECRET}`))
    expect(res.status).toBe(500)
    const body = await res.json()
    expect(body.error).toBe('Internal error')
    expect(JSON.stringify(body)).not.toContain('SECRET-DB-DETAIL')
    expect(JSON.stringify(body)).not.toContain('connection refused')
  })

  it('returns 401 when CRON_SECRET is missing in env', async () => {
    delete process.env.CRON_SECRET
    const handler = withCronAuth('test', async () => ({ processed: 0 }))
    const res = await handler(makeRequest(`Bearer ${VALID_SECRET}`))
    expect(res.status).toBe(401)
  })
})
