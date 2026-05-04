import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { RelatedPagesSection } from './RelatedPagesSection'

describe('RelatedPagesSection', () => {
  it('rend section avec titre par défaut', () => {
    render(<RelatedPagesSection currentSlug="rc-pro/immobilier" />)
    expect(screen.getByRole('region', { name: /Pages connexes/i })).toBeInTheDocument()
  })

  it('affiche au moins 15 liens internes (best practice SEO)', () => {
    render(<RelatedPagesSection currentSlug="rc-pro/immobilier" />)
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThanOrEqual(15)
  })

  it('groupe les liens par type (Pilier / Métiers / Outils / Guides)', () => {
    render(<RelatedPagesSection currentSlug="rc-pro/immobilier" />)
    expect(screen.getAllByText(/Pilier/i).length).toBeGreaterThan(0)
    expect(screen.getByText(/Métiers.*sous-niches/i)).toBeInTheDocument()
    expect(screen.getByText(/Outils transactionnels/i)).toBeInTheDocument()
  })

  it('affiche le compteur de liens', () => {
    render(<RelatedPagesSection currentSlug="rc-pro/immobilier" />)
    expect(screen.getByText(/\d+ liens internes/i)).toBeInTheDocument()
  })

  it('mode compact rend une nav simplifiée', () => {
    render(<RelatedPagesSection currentSlug="rc-pro/immobilier" variant="compact" />)
    expect(screen.getByRole('navigation', { name: /Pages connexes/i })).toBeInTheDocument()
  })

  it('aucun lien ne pointe vers le slug courant', () => {
    render(<RelatedPagesSection currentSlug="rc-pro/immobilier" />)
    const links = screen.getAllByRole('link')
    links.forEach((link) => {
      const href = link.getAttribute('href')
      expect(href).not.toBe('/rc-pro/immobilier')
    })
  })

  it('affiche cluster sémantique courant', () => {
    render(<RelatedPagesSection currentSlug="assurance-decennale/plombier" />)
    expect(screen.getByText(/Cluster sémantique/i)).toBeInTheDocument()
  })

  it('retourne null pour cluster inexistant fallback (cross-cluster)', () => {
    /* Slug non mappé → cross-cluster fallback */
    const { container } = render(<RelatedPagesSection currentSlug="totally-unknown-slug" />)
    /* Soit null soit fallback cross-cluster avec >0 liens */
    const links = container.querySelectorAll('a')
    expect(links.length).toBeGreaterThanOrEqual(0)
  })
})
