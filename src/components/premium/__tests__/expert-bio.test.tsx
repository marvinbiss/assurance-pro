/**
 * Tests unitaires ExpertBio.
 *
 * Couvre :
 *   - Rendu name + role + bio
 *   - Avec avatar : Image next/image (alt présent)
 *   - Sans avatar : fallback initiales (1ère + dernière lettre)
 *   - Avec linkedin : <a> target=_blank rel=noopener
 *   - Sans linkedin : pas de lien
 *   - Avec orias : affiché concaténé au role
 *   - aria-label article "Expert : {name}"
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ExpertBio } from '../expert-bio'

const BASE_PROPS = {
  name: 'Marvin Bissohong',
  role: 'Courtier ORIAS',
  bio: "10 ans d'expérience en assurance pro BTP.",
}

describe('ExpertBio', () => {
  it('rend name + role + bio', () => {
    render(<ExpertBio {...BASE_PROPS} />)
    expect(screen.getByText('Marvin Bissohong')).toBeInTheDocument()
    expect(screen.getByText(/Courtier ORIAS/i)).toBeInTheDocument()
    expect(screen.getByText(/10 ans d'expérience/i)).toBeInTheDocument()
  })

  it('aria-label article = "Expert : {name}"', () => {
    render(<ExpertBio {...BASE_PROPS} />)
    expect(screen.getByLabelText(/Expert : Marvin Bissohong/i)).toBeInTheDocument()
  })

  it('sans avatar → fallback initiales MB (premier + dernier)', () => {
    render(<ExpertBio {...BASE_PROPS} />)
    expect(screen.getByText('MB')).toBeInTheDocument()
  })

  it('initiales correctes sur prénom seul', () => {
    render(<ExpertBio {...BASE_PROPS} name="Marvin" />)
    // Cas single-word: getInitials retourne juste "M"
    expect(screen.getByText('M')).toBeInTheDocument()
  })

  it('avec avatar → Image next/image avec alt descriptif', () => {
    render(<ExpertBio {...BASE_PROPS} avatar="/avatar.jpg" />)
    const img = screen.getByAltText(/Portrait de Marvin Bissohong/i)
    expect(img).toBeInTheDocument()
    expect(img.tagName.toLowerCase()).toBe('img')
    // Pas de fallback initiales quand avatar présent
    expect(screen.queryByText(/^MB$/)).not.toBeInTheDocument()
  })

  it('avec linkedin → <a> target=_blank rel="noopener noreferrer"', () => {
    render(<ExpertBio {...BASE_PROPS} linkedin="https://linkedin.com/in/marvinbissohong" />)
    const link = screen.getByRole('link', { name: /Profil LinkedIn de Marvin Bissohong/i })
    expect(link).toHaveAttribute('href', 'https://linkedin.com/in/marvinbissohong')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link.getAttribute('rel')).toContain('noopener')
    expect(link.getAttribute('rel')).toContain('noreferrer')
  })

  it('sans linkedin → pas de lien LinkedIn rendu', () => {
    render(<ExpertBio {...BASE_PROPS} />)
    expect(screen.queryByRole('link', { name: /LinkedIn/i })).not.toBeInTheDocument()
  })

  it('avec orias → numéro affiché concaténé au role', () => {
    render(<ExpertBio {...BASE_PROPS} orias="07 000 123" />)
    expect(screen.getByText(/ORIAS n°07 000 123/)).toBeInTheDocument()
  })

  it('sans orias → pas de mention ORIAS', () => {
    render(<ExpertBio {...BASE_PROPS} />)
    expect(screen.queryByText(/ORIAS n°/)).not.toBeInTheDocument()
  })

  it('propage la className au wrapper article', () => {
    const { container } = render(<ExpertBio {...BASE_PROPS} className="custom-bio" />)
    const article = container.querySelector('article')
    expect(article?.className).toContain('custom-bio')
  })
})
