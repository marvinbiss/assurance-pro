import { describe, it, expect } from 'vitest'
import { safeJsonLdStringify, jsonLdScriptProps } from './safe-jsonld'

describe('safeJsonLdStringify', () => {
  it('escapes < > & to unicode sequences', () => {
    const out = safeJsonLdStringify({ name: '<script>alert(1)</script>' })
    expect(out).not.toContain('<')
    expect(out).not.toContain('>')
    expect(out).toContain('\\u003c')
    expect(out).toContain('\\u003e')
  })

  it('escapes & to prevent HTML entity injection', () => {
    const out = safeJsonLdStringify({ a: 'one&two' })
    expect(out).not.toContain('&')
    expect(out).toContain('\\u0026')
  })

  it('escapes U+2028 line separator', () => {
    const out = safeJsonLdStringify({ text: 'line1 line2' })
    expect(out).toContain('\\u2028')
  })

  it('escapes U+2029 paragraph separator', () => {
    const out = safeJsonLdStringify({ text: 'p1 p2' })
    expect(out).toContain('\\u2029')
  })

  it('produces valid JSON after escape', () => {
    const data = { '@type': 'Service', name: 'RC Pro <Test> & more' }
    const out = safeJsonLdStringify(data)
    // Unescape pour parser
    const restored = out
      .replace(/\\u003c/g, '<')
      .replace(/\\u003e/g, '>')
      .replace(/\\u0026/g, '&')
    expect(JSON.parse(restored)).toEqual(data)
  })

  it('blocks </script> breakout attempts', () => {
    const malicious = '</script><script>alert(1)</script>'
    const out = safeJsonLdStringify({ payload: malicious })
    expect(out).not.toContain('</script>')
    expect(out).not.toContain('<script>')
  })
})

describe('jsonLdScriptProps', () => {
  it('returns script props with escaped html', () => {
    const props = jsonLdScriptProps({ name: 'test' }, 'abc123')
    expect(props.type).toBe('application/ld+json')
    expect(props.nonce).toBe('abc123')
    expect(props.dangerouslySetInnerHTML.__html).toContain('test')
  })

  it('accepts undefined nonce', () => {
    const props = jsonLdScriptProps({ name: 'test' })
    expect(props.nonce).toBeUndefined()
  })
})
