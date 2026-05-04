import { describe, it, expect } from 'vitest'
import {
  calculateReadingTime,
  formatReadingTime,
  calculateReadingTimeFromParts,
} from './reading-time'

describe('reading-time', () => {
  it('calcule reading time à 220 wpm', () => {
    /* 220 mots = 1 min */
    const text = 'mot '.repeat(220).trim()
    expect(calculateReadingTime(text)).toBe(1)
  })

  it('arrondit à la minute supérieure', () => {
    /* 250 mots = 1.13 min → 2 */
    const text = 'mot '.repeat(250).trim()
    expect(calculateReadingTime(text)).toBe(2)
  })

  it('minimum 1 minute pour textes courts', () => {
    expect(calculateReadingTime('court texte')).toBe(1)
    expect(calculateReadingTime('')).toBe(1)
  })

  it('formatReadingTime affiche correctement', () => {
    expect(formatReadingTime(1)).toBe('1 min')
    expect(formatReadingTime(5)).toBe('5 min')
    expect(formatReadingTime(15)).toBe('15 min')
  })

  it('calculateReadingTimeFromParts somme les parties', () => {
    const intro = 'mot '.repeat(110).trim() /* 110 mots */
    const body = 'mot '.repeat(330).trim() /* 330 mots */
    /* total 440 mots / 220 wpm = 2 min */
    expect(calculateReadingTimeFromParts([intro, body])).toBe(2)
  })

  it('ignore les parts vides', () => {
    const text = 'mot '.repeat(220).trim()
    expect(calculateReadingTimeFromParts([text, '', null as unknown as string])).toBe(1)
  })
})
