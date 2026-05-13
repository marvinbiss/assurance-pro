import { describe, it, expect } from 'vitest'
import { scoreLead, classifyTier, suggestRouting, LeadInputSchema } from './scoring'

describe('LeadInputSchema', () => {
  it('accepts minimal input', () => {
    expect(() => LeadInputSchema.parse({ activity: 'Plombier' })).not.toThrow()
  })

  it('rejects empty activity', () => {
    expect(() => LeadInputSchema.parse({ activity: '' })).toThrow()
  })

  it('rejects too long activity', () => {
    expect(() => LeadInputSchema.parse({ activity: 'a'.repeat(300) })).toThrow()
  })
})

describe('scoreLead', () => {
  it('returns tier A for high-value BTP SARL with claims-free history', () => {
    const r = scoreLead({
      activity: 'Plombier BTP',
      legalStatus: 'SARL',
      annualRevenueEur: 500_000,
      isBtp: true,
      employeeCount: 8,
      garanties: ['decennale', 'rc-pro', 'multirisque'],
      urgencyDays: 5,
      hasEmail: true,
      hasPhone: true,
      hasSiret: true,
      source: 'google-ads',
    })
    expect(r.tier).toBe('A')
    expect(r.score).toBeGreaterThanOrEqual(80)
    expect(r.estimatedValueEur).toBe(80)
  })

  it('returns tier D for minimal info AE lead', () => {
    const r = scoreLead({
      activity: 'Consultant',
      legalStatus: 'AE',
      annualRevenueEur: 10_000,
    })
    expect(r.tier).toBe('D')
    expect(r.score).toBeLessThan(40)
    expect(r.estimatedValueEur).toBe(3)
  })

  it('penalizes recent claims', () => {
    const base = scoreLead({
      activity: 'Plombier',
      legalStatus: 'SARL',
      annualRevenueEur: 300_000,
      isBtp: true,
      hasEmail: true,
      hasPhone: true,
    })
    const withClaim = scoreLead({
      activity: 'Plombier',
      legalStatus: 'SARL',
      annualRevenueEur: 300_000,
      isBtp: true,
      hasEmail: true,
      hasPhone: true,
      hadRecentClaim: true,
    })
    expect(withClaim.score).toBeLessThan(base.score)
  })

  it('rewards multi-garantie up-sell potential', () => {
    const single = scoreLead({
      activity: 'Consultant',
      legalStatus: 'SARL',
      garanties: ['rc-pro'],
      hasEmail: true,
    })
    const multi = scoreLead({
      activity: 'Consultant',
      legalStatus: 'SARL',
      garanties: ['rc-pro', 'cyber', 'multirisque'],
      hasEmail: true,
    })
    expect(multi.score).toBeGreaterThan(single.score)
  })

  it('rewards urgency', () => {
    const noUrgency = scoreLead({ activity: 'X', hasEmail: true })
    const urgent = scoreLead({ activity: 'X', hasEmail: true, urgencyDays: 5 })
    expect(urgent.score).toBeGreaterThan(noUrgency.score)
  })

  it('breakdown always sums approximately to final score', () => {
    const r = scoreLead({
      activity: 'Plombier',
      legalStatus: 'SARL',
      annualRevenueEur: 200_000,
      isBtp: true,
      hasEmail: true,
      hasPhone: true,
    })
    const sum = r.breakdown.reduce((acc, b) => acc + b.weight, 0)
    expect(Math.abs(sum - r.score)).toBeLessThanOrEqual(5) // bounded clamp [0,100] tolérance
  })

  it('penalizes missing all contact info', () => {
    const r = scoreLead({ activity: 'X' })
    const negative = r.breakdown.find((b) => b.factor === 'incomplete')
    expect(negative).toBeDefined()
  })
})

describe('classifyTier', () => {
  it('80+ → A', () => expect(classifyTier(85)).toBe('A'))
  it('60-79 → B', () => expect(classifyTier(70)).toBe('B'))
  it('40-59 → C', () => expect(classifyTier(50)).toBe('C'))
  it('0-39 → D', () => expect(classifyTier(20)).toBe('D'))
})

describe('suggestRouting', () => {
  it('A → phone-priority', () => {
    const r = suggestRouting('A')
    expect(r.channel).toBe('phone-priority')
    expect(r.slaHours).toBe(2)
  })
  it('B → email-fast', () => {
    expect(suggestRouting('B').channel).toBe('email-fast')
  })
  it('C → email-batch', () => {
    expect(suggestRouting('C').channel).toBe('email-batch')
  })
  it('D → archive', () => {
    const r = suggestRouting('D')
    expect(r.channel).toBe('archive')
    expect(r.slaHours).toBe(0)
  })
})
