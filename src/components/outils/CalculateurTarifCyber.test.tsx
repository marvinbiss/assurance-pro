import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CalculateurTarifCyber } from './CalculateurTarifCyber'

describe('CalculateurTarifCyber — UI', () => {
  it('rend secteur + données + maturité + plafond + franchise', () => {
    render(<CalculateurTarifCyber />)
    expect(screen.getByLabelText(/Secteur d'activité/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Volume données clients/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Maturité cybersécurité/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Plafond garantie souhaité/i)).toBeInTheDocument()
  })

  it('affiche fourchette tarifaire et alerte sinistre', () => {
    render(<CalculateurTarifCyber />)
    expect(screen.getByText(/Coût moyen sinistre cyber/i)).toBeInTheDocument()
    expect(screen.getAllByText(/ANSSI/i).length).toBeGreaterThan(0)
  })

  it('CTA pointe vers devis cyber', () => {
    render(<CalculateurTarifCyber />)
    const cta = screen.getByRole('link', { name: /Recevoir mon devis cyber officiel/i })
    expect(cta.getAttribute('href')).toContain('/outils/devis-rc-pro')
    expect(cta.getAttribute('href')).toContain('secteur=cyber')
  })

  it('ISO 27001 maturity label visible', () => {
    render(<CalculateurTarifCyber />)
    expect(screen.getAllByText(/ISO 27001/i).length).toBeGreaterThan(0)
  })
})
