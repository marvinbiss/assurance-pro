import { describe, it, expect } from 'vitest'
import { getOrCreateRequestId, REQUEST_ID_HEADER_KEY } from './request-id'

describe('getOrCreateRequestId', () => {
  it("génère un UUID si pas d'ID fourni", () => {
    const headers = new Headers()
    const id = getOrCreateRequestId(headers)
    expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
  })

  it('réutilise X-Request-Id valide du client', () => {
    const headers = new Headers({ 'x-request-id': 'abc-123-xyz' })
    const id = getOrCreateRequestId(headers)
    expect(id).toBe('abc-123-xyz')
  })

  it('rejette ID >64 chars (génère nouveau)', () => {
    const tooLong = 'a'.repeat(100)
    const headers = new Headers({ 'x-request-id': tooLong })
    const id = getOrCreateRequestId(headers)
    expect(id).not.toBe(tooLong)
    expect(id.length).toBeLessThanOrEqual(36)
  })

  it('rejette ID avec caractères spéciaux unsafe', () => {
    const headers = new Headers({ 'x-request-id': '<script>alert(1)</script>' })
    const id = getOrCreateRequestId(headers)
    expect(id).not.toContain('<')
    expect(id).not.toContain('script')
  })

  it('accepte caractères safe : alphanumeric + - _ : .', () => {
    const safeId = 'req:2024-12-25:abc.123'
    const headers = new Headers({ 'x-request-id': safeId })
    expect(getOrCreateRequestId(headers)).toBe(safeId)
  })

  it('REQUEST_ID_HEADER_KEY exporté correctement', () => {
    expect(REQUEST_ID_HEADER_KEY).toBe('x-request-id')
  })
})
