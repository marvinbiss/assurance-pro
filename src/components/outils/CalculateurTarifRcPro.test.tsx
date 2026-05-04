import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CalculateurTarifRcPro } from './CalculateurTarifRcPro'

describe('CalculateurTarifRcPro — UI', () => {
  it('rend tous les selects + sliders', () => {
    render(<CalculateurTarifRcPro />)
    expect(screen.getByLabelText(/Secteur d'activité/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Forme juridique/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Plafond garantie/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Antécédents sinistres/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Franchise par sinistre/i)).toBeInTheDocument()
  })

  it('affiche un tarif initial cohérent', () => {
    render(<CalculateurTarifRcPro />)
    /* Format : "X € — Y €" */
    expect(screen.getByText(/€ — /)).toBeInTheDocument()
    expect(screen.getByText(/Médiane indicative/)).toBeInTheDocument()
  })

  it('CTA pointe vers /outils/devis-rc-pro avec query params', () => {
    render(<CalculateurTarifRcPro />)
    const cta = screen.getByRole('link', { name: /Recevoir mon devis officiel/i })
    expect(cta.getAttribute('href')).toContain('/outils/devis-rc-pro')
    expect(cta.getAttribute('href')).toContain('secteur=consultant-conseil')
  })

  it('changement secteur médecin libéral impacte CTA', () => {
    render(<CalculateurTarifRcPro />)
    const select = screen.getByLabelText(/Secteur d'activité/i) as HTMLSelectElement
    fireEvent.change(select, { target: { value: 'medecin-liberal' } })
    const cta = screen.getByRole('link', { name: /Recevoir mon devis officiel/i })
    expect(cta.getAttribute('href')).toContain('secteur=medecin-liberal')
  })

  it('détail de calcul affiche les 7 coefficients', () => {
    render(<CalculateurTarifRcPro />)
    fireEvent.click(screen.getByText(/Voir le détail du calcul/i))
    expect(screen.getByText(/Coef CA/)).toBeInTheDocument()
    expect(screen.getByText(/Coef forme juridique/)).toBeInTheDocument()
    expect(screen.getByText(/Coef plafond garantie/)).toBeInTheDocument()
  })

  it('avertissement ACPR indicatif visible', () => {
    render(<CalculateurTarifRcPro />)
    expect(screen.getAllByText(/indicative/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/ACPR 2024-R-02/i).length).toBeGreaterThan(0)
  })
})
