// @vitest-environment node
import { describe, it, expect, beforeEach } from 'vitest'
import { verifyCronAuthorization } from './cron-auth'

describe('verifyCronAuthorization', () => {
  beforeEach(() => {
    process.env.CRON_SECRET = 'super-secret-token-1234567890'
  })

  it('returns true on exact match', () => {
    expect(verifyCronAuthorization('Bearer super-secret-token-1234567890')).toBe(true)
  })

  it('returns false on wrong token', () => {
    expect(verifyCronAuthorization('Bearer wrong-token-1234567890123')).toBe(false)
  })

  it('returns false on missing Bearer prefix', () => {
    expect(verifyCronAuthorization('super-secret-token-1234567890')).toBe(false)
  })

  it('returns false on null header', () => {
    expect(verifyCronAuthorization(null)).toBe(false)
  })

  it('returns false when secret missing from env', () => {
    delete process.env.CRON_SECRET
    expect(verifyCronAuthorization('Bearer anything')).toBe(false)
  })

  it('returns false on length mismatch (timing-safe)', () => {
    expect(verifyCronAuthorization('Bearer short')).toBe(false)
  })
})
