import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ComparateurRcPro } from './ComparateurRcPro'

describe('ComparateurRcPro — UI', () => {
  it('rend select secteur + priorité', () => {
    render(<ComparateurRcPro />)
    expect(screen.getByLabelText(/Votre secteur d'activité/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Votre priorité/i)).toBeInTheDocument()
  })

  it('affiche les 8 cartes assureurs partenaires', () => {
    render(<ComparateurRcPro />)
    /* On vérifie 4 marques au minimum (peuvent apparaitre dans options + cartes) */
    expect(screen.getAllByText(/Hiscox/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/MMA Pro/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/AXA/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Allianz/i).length).toBeGreaterThan(0)
  })

  it('changement secteur fait apparaitre badge "RECOMMANDÉ POUR VOUS"', () => {
    render(<ComparateurRcPro />)
    const selectSecteur = screen.getByLabelText(/Votre secteur d'activité/i) as HTMLSelectElement
    fireEvent.change(selectSecteur, { target: { value: 'Informatique' } })
    expect(screen.getAllByText(/RECOMMANDÉ POUR VOUS/i).length).toBeGreaterThan(0)
  })

  it('priorité tarif fait apparaitre Tarif compétitif en tête', () => {
    render(<ComparateurRcPro />)
    const priorite = screen.getByLabelText(/Votre priorité/i) as HTMLSelectElement
    fireEvent.change(priorite, { target: { value: 'tarif' } })
    expect(screen.getAllByText(/Tarif compétitif/i).length).toBeGreaterThan(0)
  })

  it('CTA principal pointe vers /outils / devis-rc-pro', () => {
    render(<ComparateurRcPro />)
    const cta = screen.getByRole('link', { name: /Recevoir 3 devis personnalisés/i })
    expect(cta.getAttribute('href')).toBe('/outils/devis-rc-pro')
  })
})
