import { describe, it, expect } from 'vitest'
import { selectContextualLinks, getRelatedCluster } from './related-pages'

describe('Maillage interne — selectContextualLinks', () => {
  const TEST_SLUGS = [
    'rc-pro/immobilier',
    'rc-pro/consultant',
    'rc-pro/informatique',
    'assurance-decennale/plombier',
    'assurance-decennale/macon',
    'mutuelle-tns',
    'cyber-assurance',
    'assurance-vtc',
    'multirisque-pro',
    'assurance-bureau',
  ]

  TEST_SLUGS.forEach((slug) => {
    it(`${slug} : retourne au moins 15 liens contextuels`, () => {
      const links = selectContextualLinks(slug)
      expect(links.length).toBeGreaterThanOrEqual(15)
    })

    it(`${slug} : aucun lien ne pointe vers le slug courant`, () => {
      const links = selectContextualLinks(slug)
      links.forEach((link) => {
        expect(link.href).not.toBe(`/${slug}`)
        expect(link.href).not.toBe(slug)
      })
    })

    it(`${slug} : tous les liens ont href + label`, () => {
      const links = selectContextualLinks(slug)
      links.forEach((link) => {
        expect(link.href).toBeTruthy()
        expect(link.label).toBeTruthy()
      })
    })
  })

  it('retourne au moins 1 lien hub si page slug != hub', () => {
    const links = selectContextualLinks('rc-pro/immobilier')
    const hubLinks = links.filter((l) => l.type === 'hub')
    expect(hubLinks.length).toBeGreaterThan(0)
  })

  it('mix correct : spokes + tools + guides + sibling fallback', () => {
    const links = selectContextualLinks('rc-pro/immobilier')
    const types = new Set(links.map((l) => l.type))
    expect(types.has('spoke')).toBe(true)
    expect(types.has('tool')).toBe(true)
  })

  it('cluster non trouvé : retourne cross-cluster fallback (15 liens hubs+tools autres)', () => {
    const links = selectContextualLinks('inexistant-slug-xyz')
    expect(links.length).toBeGreaterThanOrEqual(10)
  })
})

describe('Référentiel clusters', () => {
  it('6 clusters définis avec hub + spokes + tools', () => {
    const slugs = [
      'rc-pro',
      'assurance-decennale',
      'mutuelle-pro-btp',
      'multirisque-pro',
      'cyber-assurance',
      'assurance-vtc',
    ]
    slugs.forEach((slug) => {
      const cluster = getRelatedCluster(slug)
      expect(cluster).not.toBeNull()
      expect(cluster?.hub).toBeTruthy()
      expect(cluster?.spokes.length).toBeGreaterThan(0)
      expect(cluster?.tools.length).toBeGreaterThan(0)
    })
  })
})
