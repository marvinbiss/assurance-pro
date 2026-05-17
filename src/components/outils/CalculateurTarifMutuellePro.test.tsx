import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CalculateurTarifMutuellePro } from './CalculateurTarifMutuellePro'

describe('CalculateurTarifMutuellePro — UI', () => {
  it('rend formule + régime + composition + zone', () => {
    render(<CalculateurTarifMutuellePro />)
    expect(screen.getByLabelText(/Niveau de couverture/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Régime social/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Composition foyer/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Zone géographique/i)).toBeInTheDocument()
  })

  it('affiche tarif mensuel + annuel', () => {
    render(<CalculateurTarifMutuellePro />)
    expect(screen.getAllByText(/€ par mois/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/€ par an/i).length).toBeGreaterThan(0)
  })

  it('Loi ANI : effectif >= 1 affiche part employeur', () => {
    render(<CalculateurTarifMutuellePro />)
    /* Par défaut effectif=1, donc Loi ANI active */
    expect(screen.getByText(/Loi ANI.*Répartition employeur/i)).toBeInTheDocument()
    expect(screen.getByText(/Part employeur/i)).toBeInTheDocument()
  })

  it('TNS individuel (effectif 0) cache le bloc Loi ANI', () => {
    render(<CalculateurTarifMutuellePro />)
    const slider = screen.getByLabelText(/Effectif entreprise/i) as HTMLInputElement
    fireEvent.change(slider, { target: { value: '0' } })
    expect(screen.queryByText(/Part employeur \(50%/i)).not.toBeInTheDocument()
  })

  it('CTA pointe vers comparateur mutuelle', () => {
    render(<CalculateurTarifMutuellePro />)
    const cta = screen.getByRole('link', { name: /Comparer 8 mutuelles/i })
    expect(cta.getAttribute('href')).toContain('/outils/comparateur-mutuelle-pro')
  })
})
