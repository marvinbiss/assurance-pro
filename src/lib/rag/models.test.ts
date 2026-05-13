import { describe, it, expect } from 'vitest'
import { inferTier, MODELS } from './models'

describe('inferTier', () => {
  it('returns fast for simple price questions', () => {
    expect(inferTier('Quel est le prix RC Pro ?')).toBe('fast')
    expect(inferTier('Combien coûte une assurance décennale ?')).toBe('fast')
    expect(inferTier('Devis rapide pour mon activité')).toBe('fast')
  })

  it('returns premium for legal/jurisprudence questions', () => {
    expect(inferTier('Quelle jurisprudence applicable à la garantie décennale ?')).toBe('premium')
    expect(inferTier('Article L. 241-1 du Code des assurances')).toBe('premium')
    expect(inferTier('Loi Spinetta : que prévoit-elle exactement ?')).toBe('premium')
    expect(inferTier('Contentieux sur exclusion de garantie')).toBe('premium')
  })

  it('returns premium for very long questions', () => {
    const longQ =
      'Je suis artisan plombier indépendant en SARL depuis 8 ans, '.repeat(5) +
      'comment ça marche ?'
    expect(longQ.length).toBeGreaterThan(200)
    expect(inferTier(longQ)).toBe('premium')
  })

  it('returns standard for generic questions', () => {
    expect(inferTier('Quelle assurance pour un coach sportif ?')).toBe('standard')
    expect(inferTier('Comment se passe la souscription ?')).toBe('standard')
  })
})

describe('MODELS registry', () => {
  it('has fallback chain for each tier', () => {
    expect(MODELS.fast.length).toBeGreaterThan(1)
    expect(MODELS.standard.length).toBeGreaterThan(1)
    expect(MODELS.premium.length).toBeGreaterThan(1)
  })

  it('each tier has at least one Anthropic + one OpenAI model', () => {
    for (const tier of ['fast', 'standard', 'premium'] as const) {
      const providers = MODELS[tier].map((m) => m.provider)
      expect(providers).toContain('anthropic')
      expect(providers).toContain('openai')
    }
  })

  it('all configs have valid maxTokens and temperature', () => {
    for (const tier of ['fast', 'standard', 'premium'] as const) {
      for (const cfg of MODELS[tier]) {
        expect(cfg.maxTokens).toBeGreaterThan(0)
        expect(cfg.temperature).toBeGreaterThanOrEqual(0)
        expect(cfg.temperature).toBeLessThanOrEqual(1)
      }
    }
  })
})
