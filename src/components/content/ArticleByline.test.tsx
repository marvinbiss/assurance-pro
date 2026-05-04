import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ArticleByline } from './ArticleByline'

describe('ArticleByline', () => {
  it('rend auteur + date publication', () => {
    render(
      <ArticleByline
        author={{ name: 'Sarah Smith', role: 'Experte courtage' }}
        datePublished="2025-01-15"
      />
    )
    expect(screen.getByText(/Sarah Smith/i)).toBeInTheDocument()
    expect(screen.getByText(/Experte courtage/i)).toBeInTheDocument()
    expect(screen.getByText(/15 janvier 2025/i)).toBeInTheDocument()
  })

  it('rend reviewer optionnel', () => {
    render(
      <ArticleByline
        author={{ name: 'Sarah Smith' }}
        reviewer={{ name: 'Mark Johnson', role: 'Avocat assurance' }}
        datePublished="2025-01-15"
      />
    )
    expect(screen.getByText(/Mark Johnson/i)).toBeInTheDocument()
    expect(screen.getByText(/Avocat assurance/i)).toBeInTheDocument()
    expect(screen.getByText(/Relu par/i)).toBeInTheDocument()
  })

  it('affiche dateModified si différent de datePublished', () => {
    render(
      <ArticleByline
        author={{ name: 'Sarah' }}
        datePublished="2025-01-15"
        dateModified="2025-12-04"
      />
    )
    expect(screen.getByText(/Mis à jour le/i)).toBeInTheDocument()
    expect(screen.getByText(/4 décembre 2025/i)).toBeInTheDocument()
  })

  it('cache dateModified si identique à datePublished', () => {
    render(
      <ArticleByline
        author={{ name: 'Sarah' }}
        datePublished="2025-01-15"
        dateModified="2025-01-15"
      />
    )
    expect(screen.queryByText(/Mis à jour le/i)).not.toBeInTheDocument()
  })

  it('affiche reading time', () => {
    render(
      <ArticleByline author={{ name: 'X' }} datePublished="2025-01-01" readingTimeMinutes={8} />
    )
    expect(screen.getByText(/8 min de lecture/i)).toBeInTheDocument()
  })

  it('lien auteur vers /equipe/[slug] si slug fourni', () => {
    render(
      <ArticleByline author={{ name: 'Sarah', slug: 'sarah-expert' }} datePublished="2025-01-15" />
    )
    const link = screen.getByText(/Sarah/i).closest('a')
    expect(link?.getAttribute('href')).toBe('/equipe/sarah-expert')
  })

  it('pas de lien si pas de slug', () => {
    render(<ArticleByline author={{ name: 'Sarah' }} datePublished="2025-01-15" />)
    const elem = screen.getByText(/Sarah/i)
    expect(elem.closest('a')).toBeNull()
  })
})
