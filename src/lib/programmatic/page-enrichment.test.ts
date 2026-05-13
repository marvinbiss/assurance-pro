/**
 * Tests pour lib programmatic page-enrichment.
 *
 * Couvre :
 * - buildPageTitle  : format meta title
 * - buildPageDescription : injection data factuelles
 * - buildCanonical  : URL canonique
 * - buildSchemaOrg  : Service + AggregateRating
 * - shouldShowDevisForm : critères CPC/template/yield
 *
 * Pas de mock Supabase : les fonctions DB (getPageEnrichment,
 * getEligibleSlugsForTemplate, countEligiblePages) sont testées
 * en intégration séparément.
 */

import { describe, it, expect } from 'vitest'
import {
  buildPageTitle,
  buildPageDescription,
  buildCanonical,
  buildSchemaOrg,
  shouldShowDevisForm,
  type PageEnrichmentRow,
} from './page-enrichment'

// ────────────────────────────────────────────────────────────────────────────
// Fixture builder
// ────────────────────────────────────────────────────────────────────────────

function makeEnrichment(overrides: Partial<PageEnrichmentRow> = {}): PageEnrichmentRow {
  return {
    page_slug: 'prix/rc-pro/plombier/auto-entrepreneur',
    page_template: 'prix_garantie_ville_statut',
    metier_code: 'plombier',
    garantie_code: 'rc_pro',
    statut_juridique: 'auto_entrepreneur',
    ville_slug: 'paris',
    city_id: 'uuid-paris',
    ville_nom: 'Paris',
    ville_population: 2_100_000,
    metier_nom: 'Plombier',
    garantie_label: 'RC Pro',
    statut_label: 'Auto-entrepreneur',
    density_insee: 1234,
    sinistralite_pct: 2.3,
    prix_min_eur: 89,
    prix_med_eur: 145,
    prix_max_eur: 320,
    jurisprudence_refs: [],
    assureurs_top3_jsonb: [],
    avis_top_jsonb: [],
    stats_sectorielles_jsonb: [],
    kw_target: 'rc pro plombier auto entrepreneur',
    kw_volume: 1200,
    kw_kd: 7,
    kw_cpc: 400,
    yield_score: 42.5,
    generation_status: 'published',
    enriched_at: '2026-05-01T00:00:00Z',
    ttl_until: '2026-08-01T00:00:00Z',
    ...overrides,
  }
}

// ────────────────────────────────────────────────────────────────────────────
// buildPageTitle
// ────────────────────────────────────────────────────────────────────────────

describe('buildPageTitle', () => {
  it('combine garantie + métier + ville + range prix', () => {
    const t = buildPageTitle(makeEnrichment())
    expect(t).toContain('RC Pro')
    expect(t).toContain('Plombier')
    expect(t).toContain('Paris')
    expect(t).toContain('Tarif 89-320€/an')
    expect(t).toContain('Vivos Assurance')
  })

  it('fallback si pas de prix → "Devis gratuit"', () => {
    const t = buildPageTitle(makeEnrichment({ prix_min_eur: null, prix_max_eur: null }))
    expect(t).toContain('Devis gratuit')
    expect(t).not.toContain('Tarif')
  })

  it('omet les segments null', () => {
    const t = buildPageTitle(makeEnrichment({ ville_nom: null, metier_nom: null }))
    expect(t).toContain('RC Pro')
    expect(t).not.toContain('null')
  })
})

// ────────────────────────────────────────────────────────────────────────────
// buildPageDescription
// ────────────────────────────────────────────────────────────────────────────

describe('buildPageDescription', () => {
  it('injecte density INSEE + prix marché + sinistralité', () => {
    const d = buildPageDescription(makeEnrichment())
    expect(d).toContain('1 234')
    expect(d).toContain('Plombier')
    expect(d).toContain('Paris')
    expect(d).toContain('89€/an')
    expect(d).toContain('145€')
    expect(d).toContain('2.3%')
    expect(d).toContain('AQC SYCODÉS')
    expect(d).toContain('partenaire ORIAS')
  })

  it('tronque à 158 caractères max (limite Google snippet)', () => {
    const d = buildPageDescription(
      makeEnrichment({
        metier_nom: "Architecte d'intérieur spécialisé en rénovation contemporaine",
        ville_nom: 'Saint-Étienne-du-Bois-en-Provence-le-Vieux',
      })
    )
    expect(d.length).toBeLessThanOrEqual(158)
  })

  it('skip section sinistralité si null', () => {
    const d = buildPageDescription(makeEnrichment({ sinistralite_pct: null }))
    expect(d).not.toContain('AQC SYCODÉS')
  })
})

// ────────────────────────────────────────────────────────────────────────────
// buildCanonical
// ────────────────────────────────────────────────────────────────────────────

describe('buildCanonical', () => {
  it('construit URL absolue avec NEXT_PUBLIC_SITE_URL', () => {
    const url = buildCanonical('prix/rc-pro/plombier/auto-entrepreneur')
    expect(url).toMatch(/^https:\/\//)
    expect(url).toContain('prix/rc-pro/plombier/auto-entrepreneur')
  })

  it('normalise les leading slashes', () => {
    const url = buildCanonical('/prix/rc-pro/plombier')
    expect(url).not.toContain('//prix')
  })
})

// ────────────────────────────────────────────────────────────────────────────
// buildSchemaOrg
// ────────────────────────────────────────────────────────────────────────────

describe('buildSchemaOrg', () => {
  it('génère Service schema avec AggregateOffer si prix présents', () => {
    const schemas = buildSchemaOrg(makeEnrichment())
    const service = schemas.find((s) => s['@type'] === 'Service') as Record<string, unknown>
    expect(service).toBeDefined()
    expect(service.name).toBe('RC Pro')
    expect(service.offers).toMatchObject({
      '@type': 'AggregateOffer',
      lowPrice: 89,
      highPrice: 320,
      priceCurrency: 'EUR',
    })
  })

  it('génère AggregateRating depuis Trustpilot ISO 20488', () => {
    const schemas = buildSchemaOrg(
      makeEnrichment({
        avis_top_jsonb: [
          {
            auteur: 'Jean D.',
            note: 5,
            texte: 'Excellent service.',
            date: '2026-04-15',
            iso_20488: true,
          },
          {
            auteur: 'Marie L.',
            note: 4,
            texte: 'Très bien.',
            date: '2026-04-10',
            iso_20488: true,
          },
        ],
      })
    )
    const rating = schemas.find((s) => s['@type'] === 'AggregateRating') as Record<string, unknown>
    expect(rating).toBeDefined()
    expect(rating.ratingValue).toBe('4.5')
    expect(rating.reviewCount).toBe(2)
  })

  it('exclut avis non ISO 20488 du rating', () => {
    const schemas = buildSchemaOrg(
      makeEnrichment({
        avis_top_jsonb: [
          {
            auteur: 'X',
            note: 1,
            texte: 'fake',
            date: '2026-01-01',
            iso_20488: false,
          },
          {
            auteur: 'Y',
            note: 5,
            texte: 'real',
            date: '2026-04-01',
            iso_20488: true,
          },
        ],
      })
    )
    const rating = schemas.find((s) => s['@type'] === 'AggregateRating') as
      | Record<string, unknown>
      | undefined
    expect(rating?.reviewCount).toBe(1)
    expect(rating?.ratingValue).toBe('5.0')
  })

  it('omet AggregateRating si aucun avis ISO 20488', () => {
    const schemas = buildSchemaOrg(makeEnrichment({ avis_top_jsonb: [] }))
    const rating = schemas.find((s) => s['@type'] === 'AggregateRating')
    expect(rating).toBeUndefined()
  })

  it('areaServed = City si ville présente, sinon Country', () => {
    const withVille = buildSchemaOrg(makeEnrichment())
    const svc1 = withVille.find((s) => s['@type'] === 'Service') as Record<string, unknown>
    expect(svc1.areaServed).toMatchObject({ '@type': 'City', name: 'Paris' })

    const noVille = buildSchemaOrg(makeEnrichment({ ville_nom: null }))
    const svc2 = noVille.find((s) => s['@type'] === 'Service') as Record<string, unknown>
    expect(svc2.areaServed).toMatchObject({ '@type': 'Country', name: 'France' })
  })
})

// ────────────────────────────────────────────────────────────────────────────
// shouldShowDevisForm
// ────────────────────────────────────────────────────────────────────────────

describe('shouldShowDevisForm', () => {
  it('true si CPC >= 500 (MONEY KW)', () => {
    expect(shouldShowDevisForm(makeEnrichment({ kw_cpc: 600 }))).toBe(true)
    expect(shouldShowDevisForm(makeEnrichment({ kw_cpc: 1300 }))).toBe(true)
  })

  it('true si template = prix_garantie_ville_statut', () => {
    expect(
      shouldShowDevisForm(
        makeEnrichment({ page_template: 'prix_garantie_ville_statut', kw_cpc: 50 })
      )
    ).toBe(true)
  })

  it('true si template = tarif', () => {
    expect(shouldShowDevisForm(makeEnrichment({ page_template: 'tarif', kw_cpc: 50 }))).toBe(true)
  })

  it('true si template = comparateur_garantie_ville', () => {
    expect(
      shouldShowDevisForm(
        makeEnrichment({
          page_template: 'comparateur_garantie_ville',
          kw_cpc: 50,
        })
      )
    ).toBe(true)
  })

  it('true si yield_score >= 50 (fallback intent fort)', () => {
    expect(
      shouldShowDevisForm(
        makeEnrichment({
          page_template: 'guide_metier_ville',
          kw_cpc: 50,
          yield_score: 75,
        })
      )
    ).toBe(true)
  })

  it('false si guide + CPC faible + yield faible', () => {
    expect(
      shouldShowDevisForm(
        makeEnrichment({
          page_template: 'guide_metier_ville',
          kw_cpc: 50,
          yield_score: 20,
        })
      )
    ).toBe(false)
  })
})
