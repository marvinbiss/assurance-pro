import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CalculateurTarifVtc } from './CalculateurTarifVtc'

describe('CalculateurTarifVtc — UI', () => {
  it('rend statut + zone + véhicule + antécédents', () => {
    render(<CalculateurTarifVtc />)
    expect(screen.getByLabelText(/Statut juridique/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Zone d'exercice principale/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Type de véhicule/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Antécédents/i)).toBeInTheDocument()
  })

  it('affiche fourchette tarifaire', () => {
    render(<CalculateurTarifVtc />)
    expect(screen.getByText(/Médiane indicative/)).toBeInTheDocument()
  })

  it('CTA pointe vers devis-rc-pro avec secteur=transport-vtc', () => {
    render(<CalculateurTarifVtc />)
    const cta = screen.getByRole('link', { name: /Recevoir mon devis officiel VTC/i })
    expect(cta.getAttribute('href')).toContain('/outils/devis-rc-pro')
    expect(cta.getAttribute('href')).toContain('secteur=transport-vtc')
  })

  it('changement véhicule électrique impacte CTA via params', () => {
    render(<CalculateurTarifVtc />)
    const select = screen.getByLabelText(/Type de véhicule/i) as HTMLSelectElement
    fireEvent.change(select, { target: { value: 'electrique' } })
    /* Slider ancienneté présent */
    expect(screen.getByLabelText(/Ancienneté permis B/i)).toBeInTheDocument()
  })
})
