/**
 * Tests unitaires ComparatifAssureursTable.
 *
 * Couvre :
 *   - Rendu de toutes les rows (desktop + mobile)
 *   - Badge "Recommandé" sur les rows avec recommande=true uniquement
 *   - Sticky header présent (class sticky top-0)
 *   - Token "incluse" rendu avec un check-icon accent
 *   - Captions sr-only pour accessibilité
 *   - Couleur point assureur (style backgroundColor) appliquée
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ComparatifAssureursTable, type ComparatifAssureurRow } from '../comparatif-assureurs-table'

const ROWS: readonly ComparatifAssureurRow[] = [
  {
    assureur: 'SMABTP',
    color: '#1A4F8B',
    prix: '1 200 € par an',
    plafond: '8 M€',
    delai: '48h',
    recommande: true,
  },
  {
    assureur: 'Hiscox',
    color: '#7B2CBF',
    prix: '1 450 € par an',
    plafond: '10 M€',
    delai: '24h',
  },
  {
    assureur: 'AXA',
    color: '#00008F',
    prix: 'Incluse',
    plafond: '5 M€',
    delai: '72h',
  },
]

describe('ComparatifAssureursTable', () => {
  it('rend toutes les rows assureurs (desktop)', () => {
    render(<ComparatifAssureursTable rows={ROWS} />)
    // Chaque assureur apparaît 2x (desktop table + mobile card list) → getAllByText
    expect(screen.getAllByText('SMABTP').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Hiscox').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('AXA').length).toBeGreaterThanOrEqual(1)
  })

  it('badge "Recommandé" uniquement sur les rows avec recommande=true', () => {
    render(<ComparatifAssureursTable rows={ROWS} />)
    const badges = screen.getAllByText(/Recommandé/i)
    // Une seule row marquée recommande=true → badge apparaît 2x (desktop+mobile)
    expect(badges.length).toBe(2)
  })

  it('sticky header présent (class sticky top-0)', () => {
    const { container } = render(<ComparatifAssureursTable rows={ROWS} />)
    const thead = container.querySelector('thead')
    expect(thead).not.toBeNull()
    expect(thead?.className).toContain('sticky')
    expect(thead?.className).toContain('top-0')
  })

  it('token "Incluse" rendu avec icon check accent', () => {
    const { container } = render(<ComparatifAssureursTable rows={ROWS} />)
    // Cherche le texte "Incluse" — il doit être présent
    const inclus = screen.getAllByText('Incluse')
    expect(inclus.length).toBeGreaterThan(0)
    // Icon CheckCircle2 (lucide) — svg rendu à côté
    expect(container.querySelectorAll('svg').length).toBeGreaterThan(0)
  })

  it('caption sr-only présente pour a11y', () => {
    render(<ComparatifAssureursTable rows={ROWS} />)
    const caption = screen.getByText(/Comparatif des assureurs/i)
    expect(caption).toBeInTheDocument()
  })

  it('mobile : aria-label "Comparatif des assureurs" sur ul', () => {
    render(<ComparatifAssureursTable rows={ROWS} />)
    expect(screen.getByRole('list', { name: /Comparatif des assureurs/i })).toBeInTheDocument()
  })

  it('appliquer la color de l’assureur en backgroundColor inline', () => {
    const { container } = render(<ComparatifAssureursTable rows={ROWS} />)
    const dots = container.querySelectorAll<HTMLElement>('span[aria-hidden="true"][style]')
    // Au moins 1 dot avec backgroundColor inline (pour SMABTP)
    const hasColorDot = Array.from(dots).some((d) => d.style.backgroundColor !== '')
    expect(hasColorDot).toBe(true)
  })

  it('liste vide → rend sans rows mais structure ok', () => {
    const { container } = render(<ComparatifAssureursTable rows={[]} />)
    expect(container.querySelector('table')).not.toBeNull()
    expect(container.querySelectorAll('tbody tr').length).toBe(0)
  })
})
