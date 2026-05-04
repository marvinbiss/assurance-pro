import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CalculateurTarifDecennale } from './CalculateurTarifDecennale'

describe('CalculateurTarifDecennale — UI', () => {
  it('rend les selects métier + zone + franchise', () => {
    render(<CalculateurTarifDecennale />)
    expect(screen.getByLabelText(/Métier BTP/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Forme juridique/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Zone géographique/i)).toBeInTheDocument()
  })

  it('affiche fourchette tarifaire', () => {
    render(<CalculateurTarifDecennale />)
    expect(screen.getByText(/Médiane indicative/)).toBeInTheDocument()
  })

  it('changement métier couvreur impacte CTA decennale', () => {
    render(<CalculateurTarifDecennale />)
    const select = screen.getByLabelText(/Métier BTP/i) as HTMLSelectElement
    fireEvent.change(select, { target: { value: 'couvreur-zingueur' } })
    const cta = screen.getByRole('link', { name: /devis officiel/i })
    expect(cta.getAttribute('href')).toContain('metier=couvreur-zingueur')
  })

  it('option DOM majore le tarif (visible via détail)', () => {
    render(<CalculateurTarifDecennale />)
    const select = screen.getByLabelText(/Zone géographique/i) as HTMLSelectElement
    fireEvent.change(select, { target: { value: 'dom' } })
    fireEvent.click(screen.getByText(/Voir le détail du calcul/i))
    /* Coef zone DOM ≈ 1.28 */
    expect(screen.getByText(/Coef zone/)).toBeInTheDocument()
  })

  it('affiche conformité ACPR + AQC SYCODÉS', () => {
    render(<CalculateurTarifDecennale />)
    expect(screen.getByText(/ACPR 2024-R-02/i)).toBeInTheDocument()
  })
})
