// @vitest-environment node
import { describe, it, expect } from 'vitest'
import { makeReference, referenceRegex } from './reference'

describe('makeReference', () => {
  it('generates LEAD reference matching the regex', () => {
    const ref = makeReference('LEAD')
    expect(ref).toMatch(/^LEAD-\d{8}-[A-F0-9]{10}$/)
  })

  it('generates RCL reference matching the regex', () => {
    const ref = makeReference('RCL')
    expect(ref).toMatch(/^RCL-\d{8}-[A-F0-9]{10}$/)
  })

  it('generates CSL reference matching the regex', () => {
    const ref = makeReference('CSL')
    expect(ref).toMatch(/^CSL-\d{8}-[A-F0-9]{10}$/)
  })

  it('produces collision-resistant random part (1000 unique refs)', () => {
    const set = new Set<string>()
    for (let i = 0; i < 1000; i++) set.add(makeReference('LEAD'))
    expect(set.size).toBe(1000)
  })

  it('uses UTC date (YYYYMMDD)', () => {
    const ref = makeReference('LEAD')
    const ymd = ref.split('-')[1]
    const now = new Date()
    const expected = `${now.getUTCFullYear()}${String(now.getUTCMonth() + 1).padStart(2, '0')}${String(now.getUTCDate()).padStart(2, '0')}`
    expect(ymd).toBe(expected)
  })
})

describe('referenceRegex', () => {
  it('matches valid LEAD reference', () => {
    expect(referenceRegex('LEAD').test('LEAD-20260430-ABCDEF0123')).toBe(true)
  })

  it('rejects lowercase hex', () => {
    expect(referenceRegex('LEAD').test('LEAD-20260430-abcdef0123')).toBe(false)
  })

  it('rejects wrong prefix', () => {
    expect(referenceRegex('LEAD').test('RCL-20260430-ABCDEF0123')).toBe(false)
  })

  it('rejects too-short random part', () => {
    expect(referenceRegex('LEAD').test('LEAD-20260430-ABC')).toBe(false)
  })

  it('rejects malformed date', () => {
    expect(referenceRegex('LEAD').test('LEAD-2026-AB-ABCDEF0123')).toBe(false)
  })
})
