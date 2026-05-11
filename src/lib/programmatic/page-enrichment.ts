/**
 * Page Enrichment Library — Couches C+D programmatique data-injected
 *
 * Source : v_page_enrichment_full (8 sources data joined)
 * Cache  : ISR 1h via createAdminClient (defined in lib/supabase/admin.ts)
 *
 * Usage build-time (generateStaticParams) + render-time (Server Components).
 */

import { createAdminClient } from '@/lib/supabase/admin'

// ────────────────────────────────────────────────────────────────────────────
// Types alignés sur app.v_page_enrichment_full (migration 015)
// ────────────────────────────────────────────────────────────────────────────

export type PageTemplate =
  | 'pilier'
  | 'metier_pilier'
  | 'garantie_ville'
  | 'garantie_metier'
  | 'garantie_statut'
  | 'comparateur_garantie_ville'
  | 'prix_garantie_ville_statut'
  | 'guide_metier_ville'
  | 'faq_garantie_metier'
  | 'attestation'
  | 'tarif'

export type GenerationStatus = 'pending' | 'generated' | 'published' | 'indexed' | 'retired'

export interface PageEnrichmentRow {
  page_slug: string
  page_template: PageTemplate
  metier_code: string | null
  garantie_code: string | null
  statut_juridique: string | null
  ville_slug: string | null
  city_id: string | null
  ville_nom: string | null
  ville_population: number | null
  metier_nom: string | null
  garantie_label: string | null
  statut_label: string | null
  density_insee: number | null
  sinistralite_pct: number | null
  prix_min_eur: number | null
  prix_med_eur: number | null
  prix_max_eur: number | null
  jurisprudence_refs: JurisprudenceRef[]
  assureurs_top3_jsonb: AssureurTop[]
  avis_top_jsonb: AvisItem[]
  stats_sectorielles_jsonb: StatSectorielle[]
  kw_target: string | null
  kw_volume: number | null
  kw_kd: number | null
  kw_cpc: number | null
  yield_score: number | null
  generation_status: GenerationStatus
  enriched_at: string
  ttl_until: string
}

export interface JurisprudenceRef {
  article: string
  texte_court: string
  legifrance_url: string
  date_publication?: string
}

export interface AssureurTop {
  partner_slug: string
  nom: string
  score_solidite: number
  rating?: string
  trustscore?: number
  prix_indicatif_min?: number
}

export interface AvisItem {
  auteur: string
  ville?: string
  note: 1 | 2 | 3 | 4 | 5
  texte: string
  date: string
  iso_20488: boolean
}

export interface StatSectorielle {
  source: string
  indicateur: string
  valeur: string | number
  unite: string
  annee: number
}

// ────────────────────────────────────────────────────────────────────────────
// Lectures principales
// ────────────────────────────────────────────────────────────────────────────

/**
 * Récupère l'enrichissement complet d'une page par slug.
 * Lit la vue v_page_enrichment_full (join 8 sources).
 * Retourne null si page absente ou status = retired/pending.
 */
export async function getPageEnrichment(pageSlug: string): Promise<PageEnrichmentRow | null> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .schema('app')
    .from('v_page_enrichment_full')
    .select('*')
    .eq('page_slug', pageSlug)
    .maybeSingle()

  if (error) {
    console.error('[page-enrichment] read error', { pageSlug, error })
    return null
  }
  return (data as PageEnrichmentRow | null) ?? null
}

/**
 * Liste les pages à générer pour un template donné, filtrées par yield score.
 * Source de vérité pour generateStaticParams des routes C+D.
 *
 * @param template     Template visé (ex: 'prix_garantie_ville_statut')
 * @param minYield     Yield score minimum (défaut 15 — anti-thin)
 * @param limit        Limite optionnelle (défaut 5820 pour cap)
 */
export async function getEligibleSlugsForTemplate(
  template: PageTemplate,
  minYield = 15,
  limit = 5820
): Promise<string[]> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .schema('app')
    .from('page_enrichment_cache')
    .select('page_slug')
    .eq('page_template', template)
    .gte('yield_score', minYield)
    .in('generation_status', ['generated', 'published', 'indexed'])
    .order('yield_score', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('[page-enrichment] eligible slugs error', { template, error })
    return []
  }
  return (data ?? []).map((row) => row.page_slug as string)
}

/**
 * Récupère le nombre total de pages eligible (utile pour monitoring/dashboard).
 */
export async function countEligiblePages(template?: PageTemplate): Promise<number> {
  const supabase = createAdminClient()
  let query = supabase
    .schema('app')
    .from('page_enrichment_cache')
    .select('page_slug', { count: 'exact', head: true })
    .gte('yield_score', 15)
    .in('generation_status', ['generated', 'published', 'indexed'])

  if (template) {
    query = query.eq('page_template', template)
  }

  const { count, error } = await query
  if (error) {
    console.error('[page-enrichment] count error', { template, error })
    return 0
  }
  return count ?? 0
}

// ────────────────────────────────────────────────────────────────────────────
// Helpers pour SSG metadata + content injection
// ────────────────────────────────────────────────────────────────────────────

/**
 * Formatte le titre meta d'une page enrichie.
 * Pattern : "[Garantie] [Métier] [Ville] — Tarif XX-YY€/an + Comparatif"
 */
export function buildPageTitle(enrichment: PageEnrichmentRow): string {
  const parts: string[] = []
  if (enrichment.garantie_label) parts.push(enrichment.garantie_label)
  if (enrichment.metier_nom) parts.push(enrichment.metier_nom)
  if (enrichment.ville_nom) parts.push(enrichment.ville_nom)

  const base = parts.join(' ')
  if (enrichment.prix_min_eur && enrichment.prix_max_eur) {
    return `${base} — Tarif ${Math.round(enrichment.prix_min_eur)}-${Math.round(enrichment.prix_max_eur)}€/an | Assurance Pro`
  }
  return `${base} — Devis gratuit | Assurance Pro`
}

/**
 * Formatte la description meta avec data factuelles.
 * Injecte density INSEE + prix marché + sinistralité = anti-thin signal.
 */
export function buildPageDescription(enrichment: PageEnrichmentRow): string {
  const parts: string[] = []

  if (enrichment.density_insee && enrichment.metier_nom && enrichment.ville_nom) {
    parts.push(
      `~${enrichment.density_insee.toLocaleString('fr-FR')} ${enrichment.metier_nom}s à ${enrichment.ville_nom}.`
    )
  }

  if (enrichment.prix_min_eur && enrichment.prix_med_eur) {
    parts.push(
      `Tarif marché à partir de ${Math.round(enrichment.prix_min_eur)}€/an (médian ${Math.round(enrichment.prix_med_eur)}€).`
    )
  }

  if (enrichment.sinistralite_pct) {
    parts.push(`Sinistralité ${enrichment.sinistralite_pct.toFixed(1)}% (AQC SYCODÉS).`)
  }

  parts.push('Devis gratuit en 24h, partenaire ORIAS.')
  return parts.join(' ').slice(0, 158)
}

/**
 * Canonical URL builder.
 */
export function buildCanonical(pageSlug: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vivos-assurance.fr'
  return `${base}/${pageSlug.replace(/^\//, '')}`
}

/**
 * Schema.org markup factory (Service + Place + AggregateRating).
 * Injecte data Pappers + Trustpilot + INSEE = E-E-A-T anti-HCU.
 */
export function buildSchemaOrg(enrichment: PageEnrichmentRow) {
  const schemas: Record<string, unknown>[] = []

  // Service schema
  if (enrichment.garantie_label) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: enrichment.garantie_label,
      description: buildPageDescription(enrichment),
      provider: {
        '@type': 'InsuranceAgency',
        name: 'Vivos Assurance Pro',
      },
      areaServed: enrichment.ville_nom
        ? { '@type': 'City', name: enrichment.ville_nom }
        : { '@type': 'Country', name: 'France' },
      offers: enrichment.prix_min_eur
        ? {
            '@type': 'AggregateOffer',
            lowPrice: enrichment.prix_min_eur,
            highPrice: enrichment.prix_max_eur,
            priceCurrency: 'EUR',
          }
        : undefined,
    })
  }

  // AggregateRating depuis Trustpilot
  const validAvis = enrichment.avis_top_jsonb?.filter((a) => a.iso_20488) ?? []
  if (validAvis.length > 0) {
    const avgRating = validAvis.reduce((sum, a) => sum + a.note, 0) / validAvis.length
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'AggregateRating',
      ratingValue: avgRating.toFixed(1),
      reviewCount: validAvis.length,
      bestRating: 5,
      worstRating: 1,
    })
  }

  return schemas
}

/**
 * Indique si la page doit générer le formulaire devis (form intent fort).
 * Critère : KW commercial OR page tarif/prix/devis OR yield_score élevé.
 */
export function shouldShowDevisForm(enrichment: PageEnrichmentRow): boolean {
  if (enrichment.kw_cpc && enrichment.kw_cpc >= 500) return true
  if (enrichment.page_template === 'prix_garantie_ville_statut') return true
  if (enrichment.page_template === 'tarif') return true
  if (enrichment.page_template === 'comparateur_garantie_ville') return true
  if ((enrichment.yield_score ?? 0) >= 50) return true
  return false
}
