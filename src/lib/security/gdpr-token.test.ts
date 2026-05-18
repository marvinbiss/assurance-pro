// @vitest-environment node
import { describe, it, expect, beforeEach } from 'vitest'
import { signGdprToken, verifyGdprToken, hashEmail } from './gdpr-token'

const DELETE_SECRET = 'a'.repeat(48)
const EXPORT_SECRET = 'b'.repeat(48)

describe('gdpr-token', () => {
  beforeEach(() => {
    process.env.GDPR_DELETE_TOKEN_SECRET = DELETE_SECRET
    process.env.GDPR_EXPORT_TOKEN_SECRET = EXPORT_SECRET
  })

  describe('signGdprToken — verifyGdprToken — round-trip', () => {
    it('round-trips a delete token', () => {
      const exp = Date.now() + 60_000
      const token = signGdprToken('delete', 'user@example.com', exp)
      const verified = verifyGdprToken('delete', token)
      expect(verified).not.toBeNull()
      expect(verified?.email).toBe('user@example.com')
      expect(verified?.expiresAt).toBe(exp)
      expect(verified?.tokenHash).toMatch(/^[a-f0-9]{64}$/)
    })

    it('round-trips an export token', () => {
      const exp = Date.now() + 60_000
      const token = signGdprToken('export', 'jane@domain.fr', exp)
      const verified = verifyGdprToken('export', token)
      expect(verified?.email).toBe('jane@domain.fr')
    })

    it('produces different tokens for delete vs export with same email', () => {
      const exp = Date.now() + 60_000
      const a = signGdprToken('delete', 'x@y.fr', exp)
      const b = signGdprToken('export', 'x@y.fr', exp)
      expect(a).not.toBe(b)
    })
  })

  describe('verifyGdprToken — security boundaries', () => {
    it('rejects token signed with delete secret on export endpoint', () => {
      const token = signGdprToken('delete', 'user@example.com', Date.now() + 60_000)
      expect(verifyGdprToken('export', token)).toBeNull()
    })

    it('rejects expired token', () => {
      const token = signGdprToken('delete', 'user@example.com', Date.now() - 1000)
      expect(verifyGdprToken('delete', token)).toBeNull()
    })

    it('rejects malformed token (not base64url)', () => {
      expect(verifyGdprToken('delete', 'not~a~token')).toBeNull()
    })

    it('rejects token with wrong number of parts', () => {
      const tampered = Buffer.from('only|two').toString('base64url')
      expect(verifyGdprToken('delete', tampered)).toBeNull()
    })

    it('rejects token signed with different secret', () => {
      const token = signGdprToken('delete', 'user@example.com', Date.now() + 60_000)
      process.env.GDPR_DELETE_TOKEN_SECRET = 'b'.repeat(48)
      expect(verifyGdprToken('delete', token)).toBeNull()
    })

    it('returns null when secret missing', () => {
      delete process.env.GDPR_DELETE_TOKEN_SECRET
      expect(verifyGdprToken('delete', 'anything')).toBeNull()
    })

    it('throws when signing with too-short secret', () => {
      process.env.GDPR_DELETE_TOKEN_SECRET = 'short'
      expect(() => signGdprToken('delete', 'x@y.fr', Date.now() + 60_000)).toThrow(/32 chars/)
    })

    it('handles email with `:` (legacy separator that broke before)', () => {
      // Anciennement le séparateur ':' aurait cassé split() ; '|' est interdit en local-part RFC 5321.
      const exp = Date.now() + 60_000
      const token = signGdprToken('delete', 'user:host@example.com', exp)
      const verified = verifyGdprToken('delete', token)
      expect(verified?.email).toBe('user:host@example.com')
    })

    it('rejects tampered signature byte', () => {
      const token = signGdprToken('delete', 'user@example.com', Date.now() + 60_000)
      // Flip 1 char in the middle of the token
      const decoded = Buffer.from(token, 'base64url').toString('utf8')
      const tampered = decoded.slice(0, -1) + (decoded.slice(-1) === 'a' ? 'b' : 'a')
      const tamperedToken = Buffer.from(tampered).toString('base64url')
      expect(verifyGdprToken('delete', tamperedToken)).toBeNull()
    })
  })

  describe('hashEmail', () => {
    it('produces a 64-char hex SHA-256 hash', () => {
      expect(hashEmail('user@example.com')).toMatch(/^[a-f0-9]{64}$/)
    })

    it('is case-insensitive (toLowerCase)', () => {
      expect(hashEmail('User@Example.COM')).toBe(hashEmail('user@example.com'))
    })

    it('produces different hash for different emails', () => {
      expect(hashEmail('a@b.fr')).not.toBe(hashEmail('c@d.fr'))
    })
  })
})
