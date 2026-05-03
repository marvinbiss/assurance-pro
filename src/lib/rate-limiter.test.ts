import { describe, it, expect } from 'vitest'
import { RATE_LIMITS, getRateLimitConfig, getRateLimitKey } from './rate-limiter'

describe('rate-limiter — courtage policies', () => {
  it('exposes the expected named policies', () => {
    const keys = Object.keys(RATE_LIMITS)
    expect(keys).toEqual(
      expect.arrayContaining([
        'api',
        'devis',
        'reclamation',
        'contact',
        'newsletter',
        'gdpr',
        'admin',
        'cron',
        'webhook',
        'default',
      ])
    )
  })

  it('routes /api/devis-assurance to the devis policy', () => {
    expect(getRateLimitConfig('/api/devis-assurance')).toBe(RATE_LIMITS.devis)
  })

  it('routes /api/reclamation to the reclamation policy', () => {
    expect(getRateLimitConfig('/api/reclamation')).toBe(RATE_LIMITS.reclamation)
  })

  it('routes /api/contact to the contact policy', () => {
    expect(getRateLimitConfig('/api/contact')).toBe(RATE_LIMITS.contact)
  })

  it('routes /api/newsletter to the newsletter policy', () => {
    expect(getRateLimitConfig('/api/newsletter')).toBe(RATE_LIMITS.newsletter)
  })

  it('routes /api/gdpr/* to the gdpr policy', () => {
    expect(getRateLimitConfig('/api/gdpr/delete')).toBe(RATE_LIMITS.gdpr)
    expect(getRateLimitConfig('/api/gdpr/export')).toBe(RATE_LIMITS.gdpr)
  })

  it('routes /api/admin/* to the admin policy (more specific than /api/*)', () => {
    expect(getRateLimitConfig('/api/admin/conseil-recommandation')).toBe(RATE_LIMITS.admin)
  })

  it('routes /api/cron/* to the cron policy (fail-open)', () => {
    expect(getRateLimitConfig('/api/cron/sla-reclamations')).toBe(RATE_LIMITS.cron)
    expect(RATE_LIMITS.cron.failOpen).toBe(true)
  })

  it('routes /api/revalidate and /api/indexnow to webhook policy', () => {
    expect(getRateLimitConfig('/api/revalidate')).toBe(RATE_LIMITS.webhook)
    expect(getRateLimitConfig('/api/indexnow')).toBe(RATE_LIMITS.webhook)
  })

  it('falls back to api for unknown /api/* routes', () => {
    expect(getRateLimitConfig('/api/unknown')).toBe(RATE_LIMITS.api)
  })

  it('falls back to default for non-API paths', () => {
    expect(getRateLimitConfig('/blog')).toBe(RATE_LIMITS.default)
  })

  it('getRateLimitKey combines IP and pathname', () => {
    expect(getRateLimitKey('1.2.3.4', '/api/devis-assurance')).toBe('1.2.3.4:/api/devis-assurance')
  })
})
