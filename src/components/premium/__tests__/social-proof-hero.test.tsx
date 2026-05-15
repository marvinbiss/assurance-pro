/**
 * Tests unitaires SocialProofHero.
 *
 * Couvre :
 *   - Rendu de toutes les stats (cas standard 3-4 stats)
 *   - Cap à 4 stats max (les suivantes ignorées)
 *   - Rendu vide si stats=[]
 *   - aria-label list + items role="listitem"
 *   - Application correcte de className
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SocialProofHero } from '../social-proof-hero'

const STATS_4 = [
  { value: '3 247', label: 'Artisans assurés' },
  { value: '−32%', label: 'Économie moyenne' },
  { value: '24h', label: 'Attestation' },
  { value: '4.9/5', label: '142 avis vérifiés' },
]

const STATS_6 = [
  ...STATS_4,
  { value: '99%', label: 'Renouvellement' },
  { value: '8', label: 'Partenaires' },
]

describe('SocialProofHero', () => {
  it('rend les 4 stats fournies', () => {
    render(<SocialProofHero stats={STATS_4} />)
    expect(screen.getByText('3 247')).toBeInTheDocument()
    expect(screen.getByText(/Artisans assurés/i)).toBeInTheDocument()
    expect(screen.getByText('−32%')).toBeInTheDocument()
    expect(screen.getByText('4.9/5')).toBeInTheDocument()
  })

  it('plafonne à 4 stats max (6 fournies → 4 affichées)', () => {
    render(<SocialProofHero stats={STATS_6} />)
    const items = screen.getAllByRole('listitem')
    expect(items.length).toBe(4)
    // Le 5e ne doit pas être affiché
    expect(screen.queryByText(/Renouvellement/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/Partenaires/i)).not.toBeInTheDocument()
  })

  it('expose role="list" avec aria-label correct', () => {
    render(<SocialProofHero stats={STATS_4} />)
    expect(screen.getByRole('list', { name: /Indicateurs de confiance/i })).toBeInTheDocument()
  })

  it('applique className personnalisée au wrapper', () => {
    const { container } = render(<SocialProofHero stats={STATS_4} className="custom-class" />)
    const list = container.querySelector('[role="list"]')
    expect(list?.className).toContain('custom-class')
  })

  it('stats vides → rend list vide sans crash', () => {
    render(<SocialProofHero stats={[]} />)
    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.queryAllByRole('listitem').length).toBe(0)
  })

  it('rend exactement 1 stat si une seule fournie', () => {
    render(<SocialProofHero stats={[{ value: '100', label: 'Test' }]} />)
    expect(screen.getAllByRole('listitem').length).toBe(1)
  })
})
