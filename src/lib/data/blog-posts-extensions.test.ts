/**
 * Tests unitaires de `applyExtension()` — système de merge des sections
 * additionnelles aux articles blog.
 *
 * Couvre :
 *   - Idempotence (post sans extension → inchangé)
 *   - Insertion AVANT la section FAQ
 *   - Fusion EXTENSIONS + BOOSTS + FINAL_BOOSTS
 *   - TOC mis à jour cohérent avec body
 *   - Preserve les champs autres (slug, title, author...)
 */

import { describe, it, expect } from 'vitest'
import { applyExtension } from './blog-posts-extensions'
import type { BlogPost } from './blog-posts'

function makePost(overrides: Partial<BlogPost> = {}): BlogPost {
  return {
    slug: 'test-slug',
    title: 'Test',
    description: 'Test description',
    category: 'Test',
    tags: ['test'],
    author: 'Cabinet Vivos Assurance',
    authorRole: 'Courtier',
    publishedAt: '2026-01-01',
    updatedAt: '2026-01-01',
    readTime: '5 min',
    sources: [],
    toc: [
      { id: 'intro', title: 'Intro' },
      { id: 'faq', title: 'FAQ' },
    ],
    body: [
      { id: 'intro', h2: 'Intro', paragraphs: ['Introduction'] },
      { id: 'faq', h2: 'FAQ', paragraphs: ['Question ? Answer.'] },
    ],
    ...overrides,
  }
}

describe('applyExtension()', () => {
  it("retourne le post inchangé si pas d'extension définie pour le slug", () => {
    const post = makePost({ slug: 'aucun-extension-definie-ici-zzz' })
    const result = applyExtension(post)
    expect(result.body).toHaveLength(post.body.length)
    expect(result.toc).toHaveLength(post.toc.length)
    expect(result.slug).toBe(post.slug)
  })

  it("ajoute les sections d'extension AVANT la FAQ pour un slug connu", () => {
    // sinistralite-btp-2024-aqc-sycodes-chiffres a des EXTENSIONS + BOOSTS dans les dicts
    const post = makePost({ slug: 'sinistralite-btp-2024-aqc-sycodes-chiffres' })
    const result = applyExtension(post)

    expect(result.body.length).toBeGreaterThan(post.body.length)

    // La dernière section doit toujours être FAQ
    const lastSection = result.body[result.body.length - 1]
    expect(lastSection?.id).toBe('faq')
  })

  it('ajoute aussi les entrées TOC correspondantes', () => {
    const post = makePost({ slug: 'sinistralite-btp-2024-aqc-sycodes-chiffres' })
    const result = applyExtension(post)

    expect(result.toc.length).toBeGreaterThan(post.toc.length)

    // La dernière entrée TOC doit toujours être FAQ
    const lastToc = result.toc[result.toc.length - 1]
    expect(lastToc?.id).toBe('faq')
  })

  it('chaque section body a un id correspondant dans le TOC', () => {
    const post = makePost({ slug: 'sinistralite-btp-2024-aqc-sycodes-chiffres' })
    const result = applyExtension(post)

    const bodyIds = new Set(result.body.map((s) => s.id))
    for (const tocEntry of result.toc) {
      expect(bodyIds.has(tocEntry.id)).toBe(true)
    }
  })

  it('préserve les champs metadata (slug, title, author)', () => {
    const post = makePost({
      slug: 'sinistralite-btp-2024-aqc-sycodes-chiffres',
      title: 'Mon titre custom',
      author: 'Auteur Custom',
    })
    const result = applyExtension(post)

    expect(result.slug).toBe(post.slug)
    expect(result.title).toBe('Mon titre custom')
    expect(result.author).toBe('Auteur Custom')
    expect(result.publishedAt).toBe(post.publishedAt)
  })

  it('insertion fonctionne aussi sans section FAQ (append à la fin)', () => {
    const post: BlogPost = {
      ...makePost({ slug: 'declaration-sinistre-decennale-5-etapes' }),
      body: [{ id: 'intro', h2: 'Intro', paragraphs: ['Body 1'] }],
      toc: [{ id: 'intro', title: 'Intro' }],
    }
    const result = applyExtension(post)
    expect(result.body.length).toBeGreaterThan(1)
  })

  it('fusionne EXTENSIONS et BOOSTS dans le même résultat', () => {
    // mediation-assurance-procedure-delais-2026 a EXTENSIONS + FINAL_BOOSTS
    const post = makePost({ slug: 'mediation-assurance-procedure-delais-2026' })
    const result = applyExtension(post)

    // Au moins 2 nouvelles sections (1 extension + 1 boost minimum)
    expect(result.body.length).toBeGreaterThanOrEqual(post.body.length + 2)
  })
})
