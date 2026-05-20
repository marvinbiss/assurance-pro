import { describe, it, expect } from 'vitest'
import { hashSha256, generateRandomToken, verifyPkceS256 } from './mcp-gateway'
import { createHash } from 'node:crypto'

describe('OAuth MCP gateway utils', () => {
  it('hashSha256 produces 64-char hex', () => {
    const h = hashSha256('test-token')
    expect(h).toMatch(/^[a-f0-9]{64}$/)
    expect(h).toBe(createHash('sha256').update('test-token').digest('hex'))
  })

  it('generateRandomToken produces base64url tokens >= 32 chars', () => {
    const t = generateRandomToken()
    expect(t).toMatch(/^[A-Za-z0-9_-]+$/)
    expect(t.length).toBeGreaterThanOrEqual(32)
  })

  it('generateRandomToken always unique', () => {
    const tokens = new Set(Array.from({ length: 100 }, () => generateRandomToken()))
    expect(tokens.size).toBe(100)
  })

  it('verifyPkceS256 valid PKCE flow (RFC 7636)', () => {
    const codeVerifier = 'a'.repeat(64) // 64 chars allowed [43, 128]
    const codeChallenge = createHash('sha256').update(codeVerifier, 'ascii').digest('base64url')
    expect(verifyPkceS256(codeVerifier, codeChallenge)).toBe(true)
  })

  it('verifyPkceS256 rejects wrong verifier', () => {
    const codeChallenge = createHash('sha256').update('a'.repeat(64), 'ascii').digest('base64url')
    expect(verifyPkceS256('b'.repeat(64), codeChallenge)).toBe(false)
  })

  it('verifyPkceS256 rejects length mismatch', () => {
    expect(verifyPkceS256('verifier', 'short')).toBe(false)
  })
})
