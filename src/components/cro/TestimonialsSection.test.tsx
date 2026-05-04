import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TestimonialsSection } from './TestimonialsSection'

const mockTestimonials = [
  {
    authorName: 'Jean Dupont',
    authorRole: 'Plombier auto-entrepreneur',
    rating: 5 as const,
    text: 'Service rapide et professionnel.',
    date: '2024-12-15',
    segment: 'Décennale BTP',
  },
  {
    authorName: 'Marie Martin',
    authorRole: 'Consultante IT',
    rating: 4 as const,
    text: 'RC Pro adaptée à mon activité.',
    date: '2024-11-20',
  },
  {
    authorName: 'Paul Durand',
    authorRole: 'Restaurateur',
    rating: 5 as const,
    text: 'Multirisque négocié à un super prix.',
    date: '2024-10-05',
  },
]

describe('TestimonialsSection', () => {
  it('rend rien si testimonials vide', () => {
    const { container } = render(<TestimonialsSection testimonials={[]} />)
    expect(container.firstChild).toBeNull()
  })

  it("affiche le titre par défaut + nombre d'avis", () => {
    render(<TestimonialsSection testimonials={mockTestimonials} />)
    expect(screen.getByText(/Ils nous ont fait confiance/i)).toBeInTheDocument()
    expect(screen.getByText(/3 avis clients/i)).toBeInTheDocument()
  })

  it('calcule la note moyenne', () => {
    render(<TestimonialsSection testimonials={mockTestimonials} />)
    /* avg = (5+4+5)/3 = 4.7 */
    expect(screen.getByText(/4\.7\/5/)).toBeInTheDocument()
  })

  it('affiche tous les témoignages avec auteur + rôle + texte', () => {
    render(<TestimonialsSection testimonials={mockTestimonials} />)
    expect(screen.getByText('Jean Dupont')).toBeInTheDocument()
    expect(screen.getByText('Marie Martin')).toBeInTheDocument()
    expect(screen.getByText('Paul Durand')).toBeInTheDocument()
    expect(screen.getByText(/Service rapide et professionnel/i)).toBeInTheDocument()
  })

  it('affiche aria-label correct sur étoiles (a11y)', () => {
    render(<TestimonialsSection testimonials={mockTestimonials} />)
    expect(screen.getAllByLabelText(/5 étoiles sur 5/i).length).toBeGreaterThan(0)
    expect(screen.getByLabelText(/4 étoiles sur 5/i)).toBeInTheDocument()
  })

  it('skipSchema=true ne rend pas le JSON-LD', () => {
    const { container } = render(<TestimonialsSection testimonials={mockTestimonials} skipSchema />)
    const scripts = container.querySelectorAll('script[type="application/ld+json"]')
    expect(scripts.length).toBe(0)
  })

  it('skipSchema=false (default) rend AggregateRating + Reviews', () => {
    const { container } = render(<TestimonialsSection testimonials={mockTestimonials} />)
    const scripts = container.querySelectorAll('script[type="application/ld+json"]')
    expect(scripts.length).toBe(1)
    const json = JSON.parse(scripts[0]!.textContent ?? '{}')
    expect(json['@type']).toBe('Organization')
    expect(json.aggregateRating).toBeTruthy()
    expect(json.review).toHaveLength(3)
  })
})
