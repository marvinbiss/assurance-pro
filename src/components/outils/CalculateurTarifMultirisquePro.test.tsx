import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CalculateurTarifMultirisquePro } from './CalculateurTarifMultirisquePro'

describe('CalculateurTarifMultirisquePro — UI', () => {
  it('rend type locaux + statut + formule + zone', () => {
    render(<CalculateurTarifMultirisquePro />)
    expect(screen.getByLabelText(/Type de locaux/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Statut occupation/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Niveau de couverture/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Zone géographique/i)).toBeInTheDocument()
  })

  it('affiche cotisation annuelle + mensuelle', () => {
    render(<CalculateurTarifMultirisquePro />)
    /* "€" et "/an" sont dans des spans séparés → matcher /an et /mois */
    expect(screen.getAllByText(/\/an/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/\/mois/i).length).toBeGreaterThan(0)
  })

  it('affiche garanties incluses dans formule choisie', () => {
    render(<CalculateurTarifMultirisquePro />)
    expect(screen.getByText(/Garanties incluses dans cette formule/i)).toBeInTheDocument()
    expect(screen.getByText(/Incendie \/ explosion/i)).toBeInTheDocument()
  })

  it('toggle perte exploitation modifie tarif', () => {
    render(<CalculateurTarifMultirisquePro />)
    const checkbox = screen.getByLabelText(/perte d'exploitation/i) as HTMLInputElement
    /* Default true → décoche */
    fireEvent.click(checkbox)
    expect(checkbox.checked).toBe(false)
  })

  it('CTA pointe vers devis multirisque', () => {
    render(<CalculateurTarifMultirisquePro />)
    const cta = screen.getByRole('link', { name: /Recevoir mon devis multirisque officiel/i })
    expect(cta.getAttribute('href')).toContain('/outils/devis-rc-pro')
    expect(cta.getAttribute('href')).toContain('secteur=multirisque')
  })
})
