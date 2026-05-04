import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TrustBadges } from './TrustBadges'

describe('TrustBadges', () => {
  it('rend variante default avec 6 badges', () => {
    render(<TrustBadges />)
    expect(screen.getByLabelText(/Garanties de confiance/i)).toBeInTheDocument()
    expect(screen.getByText(/Cabinet ORIAS/i)).toBeInTheDocument()
    expect(screen.getByText(/Conformité ACPR/i)).toBeInTheDocument()
    expect(screen.getByText(/Membre CSCA/i)).toBeInTheDocument()
    expect(screen.getByText(/RGPD compliant/i)).toBeInTheDocument()
  })

  it('variante compact rend grille 2-3 colonnes', () => {
    render(<TrustBadges variant="compact" />)
    expect(screen.getByText(/Cabinet ORIAS/i)).toBeInTheDocument()
  })

  it('variante inline rend pills compactes', () => {
    const { container } = render(<TrustBadges variant="inline" />)
    expect(container.querySelectorAll('span').length).toBeGreaterThan(5)
  })

  it('lien ORIAS pointe vers orias.fr externe', () => {
    render(<TrustBadges />)
    const orias = screen.getByText(/Cabinet ORIAS/i).closest('a')
    expect(orias?.getAttribute('href')).toContain('orias.fr')
    expect(orias?.getAttribute('target')).toBe('_blank')
    expect(orias?.getAttribute('rel')).toContain('noopener')
  })

  it('lien comparateur assureurs interne', () => {
    render(<TrustBadges />)
    const link = screen.getByText(/8 assureurs partenaires/i).closest('a')
    expect(link?.getAttribute('href')).toBe('/comparateur-assureurs')
  })
})
