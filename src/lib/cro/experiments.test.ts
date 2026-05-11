import { describe, it, expect } from 'vitest'
import { EXPERIMENTS, isExperimentActive, listActiveExperiments } from './experiments'

describe('experiments registry', () => {
  it('exposes EXPERIMENTS with stable ids', () => {
    expect(EXPERIMENTS.ctaColor.id).toBe('cta-color-v1')
    expect(EXPERIMENTS.stickyBarPosition.id).toBe('sticky-bar-position-v1')
    expect(EXPERIMENTS.heroPitch.id).toBe('hero-pitch-v1')
    expect(EXPERIMENTS.chatbotEnabled.id).toBe('chatbot-enabled-v1')
  })

  it('all variants are non-empty', () => {
    for (const exp of Object.values(EXPERIMENTS)) {
      expect(exp.variants.length).toBeGreaterThan(0)
    }
  })

  it('weights sum to ~1 when provided', () => {
    for (const exp of Object.values(EXPERIMENTS)) {
      if (!exp.weights) continue
      const sum = exp.weights.reduce((a, b) => a + b, 0)
      expect(sum).toBeGreaterThan(0.95)
      expect(sum).toBeLessThan(1.05)
    }
  })

  it('listActiveExperiments returns only active', () => {
    const active = listActiveExperiments()
    for (const e of active) {
      expect(e.status).toBe('active')
    }
  })

  it('isExperimentActive considers date range', () => {
    expect(
      isExperimentActive({
        ...EXPERIMENTS.ctaColor,
        startDate: '2099-01-01',
      })
    ).toBe(false)

    expect(
      isExperimentActive({
        ...EXPERIMENTS.ctaColor,
        startDate: '2020-01-01',
        endDate: '2020-12-31',
      })
    ).toBe(false)

    expect(
      isExperimentActive({
        ...EXPERIMENTS.ctaColor,
        startDate: '2020-01-01',
      })
    ).toBe(true)
  })

  it('isExperimentActive respects status', () => {
    expect(
      isExperimentActive({
        ...EXPERIMENTS.ctaColor,
        status: 'paused',
      })
    ).toBe(false)

    expect(
      isExperimentActive({
        ...EXPERIMENTS.ctaColor,
        status: 'archived',
      })
    ).toBe(false)
  })
})
