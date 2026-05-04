import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FreshnessIndicator } from './FreshnessIndicator'

describe('FreshnessIndicator', () => {
  const FIXED_NOW = new Date('2025-12-15T10:00:00Z')

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(FIXED_NOW)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('< 7 jours = "Récemment mis à jour" (fresh)', () => {
    render(<FreshnessIndicator dateModified="2025-12-12" />)
    expect(screen.getByText(/Récemment mis à jour/i)).toBeInTheDocument()
  })

  it('7-30 jours = "il y a X jours"', () => {
    render(<FreshnessIndicator dateModified="2025-12-01" />)
    expect(screen.getByText(/il y a 14 jours/i)).toBeInTheDocument()
  })

  it('30-365 jours = "il y a X mois"', () => {
    render(<FreshnessIndicator dateModified="2025-08-15" />)
    expect(screen.getByText(/il y a 4 mois/i)).toBeInTheDocument()
  })

  it('1+ an = "il y a X an(s)"', () => {
    render(<FreshnessIndicator dateModified="2024-01-15" />)
    expect(screen.getByText(/il y a 1 an/i)).toBeInTheDocument()
  })

  it('mode compact rend pill plus petit', () => {
    const { container } = render(<FreshnessIndicator dateModified="2025-12-12" compact />)
    expect(container.querySelector('span')).toBeTruthy()
  })

  it('time element a dateTime attribute', () => {
    render(<FreshnessIndicator dateModified="2025-12-01" />)
    const time = screen.getByText(/il y a/i)
    expect(time.tagName).toBe('TIME')
    expect(time.getAttribute('dateTime')).toBe('2025-12-01')
  })
})
