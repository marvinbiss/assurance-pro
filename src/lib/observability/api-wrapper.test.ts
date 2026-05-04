import { describe, it, expect, vi } from 'vitest'
import { NextResponse } from 'next/server'
import { withApiObservability } from './api-wrapper'

describe('withApiObservability', () => {
  it('ajoute X-Request-Id en header de réponse', async () => {
    const handler = withApiObservability(async () => NextResponse.json({ ok: true }), {
      route: '/api/test',
      method: 'GET',
    })
    const response = await handler(new Request('http://localhost/api/test'))
    expect(response.headers.get('x-request-id')).toBeTruthy()
  })

  it('mesure et retourne le temps de réponse', async () => {
    const handler = withApiObservability(async () => NextResponse.json({ ok: true }), {
      route: '/api/test',
      method: 'GET',
    })
    const response = await handler(new Request('http://localhost/api/test'))
    const time = response.headers.get('x-response-time-ms')
    expect(time).toBeTruthy()
    expect(parseInt(time!)).toBeGreaterThanOrEqual(0)
  })

  it('réutilise X-Request-Id du client', async () => {
    const handler = withApiObservability(async () => NextResponse.json({ ok: true }), {
      route: '/api/test',
      method: 'GET',
    })
    const response = await handler(
      new Request('http://localhost/api/test', {
        headers: { 'x-request-id': 'client-trace-abc' },
      })
    )
    expect(response.headers.get('x-request-id')).toBe('client-trace-abc')
  })

  it('catch erreurs et retourne 500 avec request_id', async () => {
    const handler = withApiObservability(
      async () => {
        throw new Error('boom')
      },
      { route: '/api/error', method: 'POST' }
    )
    const response = await handler(new Request('http://localhost/api/error', { method: 'POST' }))
    expect(response.status).toBe(500)
    const body = await response.json()
    expect(body.error).toBeTruthy()
    expect(body.request_id).toBeTruthy()
  })

  it('passe context (requestId + startedAt) au handler', async () => {
    const inner = vi.fn(async () => NextResponse.json({ ok: true }))
    const handler = withApiObservability(inner, { route: '/api/test', method: 'GET' })
    await handler(new Request('http://localhost/api/test'))
    expect(inner).toHaveBeenCalledWith(
      expect.any(Request),
      expect.objectContaining({
        requestId: expect.any(String),
        startedAt: expect.any(Number),
      })
    )
  })
})
