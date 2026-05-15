/**
 * Page Enrichment Library — Couches C+D programmatique data-injected
 *
 * Source : v_page_enrichment_full (8 sources data joined)
 * Cache  : ISR 1h via createAdminClient (defined in lib/supabase/admin.ts)
 *
 * Usage build-time (generateStaticParams) + render-time (Server Components).
 */

import * as Sentry from '@sentry/nextjs'
import { createAdminClient } from '@/lib/supabase/admin'
import { ResultAsync, type DomainError, notFoundError, databaseError } from '@/lib/result'
import { type PageSlug } from '@/lib/types/branded'

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
 * @deprecated Préférer `getPageEnrichmentResult()` qui discrimine NotFound vs Database error.
 *
 * Récupère l'enrichissement complet d'une page par slug.
 * Lit la vue v_page_enrichment_full (join 8 sources).
 * Retourne null si page absente OU erreur DB (ambiguïté problématique pour le 404 vs 500).
 *
 * Migration : remplacer par `getPageEnrichmentResult(toPageSlug(slug))` puis :
 *   if (r.isErr()) {
 *     if (r.error.code === 'NotFound') notFound()
 *     throw r.error
 *   }
 */
export async function getPageEnrichment(pageSlug: string): Promise<PageEnrichmentRow | null> {
  if (process.env.NEXT_BUILD_SKIP_DB === '1') return null
  return Sentry.startSpan(
    { op: 'db.rpc', name: 'rpc.get_page_enrichment', attributes: { 'page.slug': pageSlug } },
    async () => {
      const supabase = createAdminClient()
      const { data, error } = await supabase.rpc('get_page_enrichment', { p_slug: pageSlug })
      if (error) {
        Sentry.captureException(error, {
          tags: { rpc: 'get_page_enrichment' },
          extra: { pageSlug },
        })
        console.error('[page-enrichment] read error', { pageSlug, error })
        return null
      }
      return (data as PageEnrichmentRow | null) ?? null
    }
  )
}

/**
 * Variante Result-based de getPageEnrichment.
 *
 * Préférée pour les nouveaux call sites — discrimine explicitement entre
 * "non trouvé" (NotFound) et "erreur base" (Database). L'ancienne variante
 * confond les deux en `null`.
 *
 * Usage :
 *   const r = await getPageEnrichmentResult(toPageSlug(slug))
 *   if (r.isErr()) {
 *     if (r.error.code === 'NotFound') return notFound()
 *     throw r.error  // bubble Database errors
 *   }
 *   return renderPage(r.value)
 */
export function getPageEnrichmentResult(
  pageSlug: PageSlug
): ResultAsync<PageEnrichmentRow, DomainError> {
  if (process.env.NEXT_BUILD_SKIP_DB === '1') {
    return ResultAsync.fromPromise(
      Promise.reject(notFoundError('Page', pageSlug)),
      (e) => e as DomainError
    )
  }
  return ResultAsync.fromPromise(
    Sentry.startSpan(
      {
        op: 'db.rpc',
        name: 'rpc.get_page_enrichment',
        attributes: { 'page.slug': pageSlug },
      },
      async (): Promise<PageEnrichmentRow> => {
        const supabase = createAdminClient()
        const { data, error } = await supabase.rpc('get_page_enrichment', { p_slug: pageSlug })
        if (error) {
          Sentry.captureException(error, {
            tags: { rpc: 'get_page_enrichment' },
            extra: { pageSlug },
          })
          throw databaseError('get_page_enrichment', error)
        }
        if (!data) {
          throw notFoundError('Page', pageSlug)
        }
        return data as PageEnrichmentRow
      }
    ),
    (e) => {
      // Si l'inner throw a déjà un DomainError, on le préserve via discriminator code
      if (typeof e === 'object' && e !== null && 'code' in e) {
        return e as DomainError
      }
      return databaseError('get_page_enrichment', e)
    }
  )
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
  if (process.env.NEXT_BUILD_SKIP_DB === '1') return []
  return Sentry.startSpan(
    {
      op: 'db.rpc',
      name: 'rpc.get_eligible_slugs_for_template',
      attributes: { 'page.template': template, 'page.min_yield': minYield },
    },
    async () => {
      const supabase = createAdminClient()
      const { data, error } = await supabase.rpc('get_eligible_slugs_for_template', {
        p_template: template,
        p_min_yield: minYield,
        p_limit: limit,
      })
      if (error) {
        Sentry.captureException(error, {
          tags: { rpc: 'get_eligible_slugs_for_template' },
          extra: { template },
        })
        console.error('[page-enrichment] eligible slugs error', { template, error })
        return []
      }
      return (data as string[] | null) ?? []
    }
  )
}

/**
 * Récupère le nombre total de pages eligible (utile pour monitoring/dashboard).
 */
export async function countEligiblePages(template?: PageTemplate): Promise<number> {
  if (process.env.NEXT_BUILD_SKIP_DB === '1') return 0
  const supabase = createAdminClient()
  const { data, error } = await supabase.rpc('count_eligible_pages', {
    p_template: template ?? null,
  })
  if (error) {
    console.error('[page-enrichment] count error', { template, error })
    return 0
  }
  return (data as number | null) ?? 0
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
    return `${base} — Tarif ${Math.round(enrichment.prix_min_eur)}-${Math.round(enrichment.prix_max_eur)}€/an | Vivos Assurance`
  }
  return `${base} — Devis gratuit | Vivos Assurance`
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
/**
 * TODO(post-audit) : convergence Schema.org en un seul producer.
 * `buildSchemaOrg()` duplique partiellement `lib/seo/jsonld.ts`.
 * Prochain refactor : appeler les helpers `getServiceSchema`, `getBreadcrumbSchema`,
 * `getFAQPageSchema`, `getReviewSchema` depuis ici pour avoir 1 source de vérité.
 */
function prettifyBreadcrumbSegment(s: string): string {
  return s
    .split('-')
    .map((w) => (w.length > 0 ? `${w[0]?.toUpperCase() ?? ''}${w.slice(1)}` : w))
    .join(' ')
}

export function buildSchemaOrg(enrichment: PageEnrichmentRow) {
  const schemas: Record<string, unknown>[] = []
  const canonical = buildCanonical(enrichment.page_slug)
  const title = buildPageTitle(enrichment)
  const description = buildPageDescription(enrichment)

  // BreadcrumbList — dérivé du slug
  const segments = enrichment.page_slug.split('/').filter(Boolean)
  if (segments.length > 0) {
    let acc = ''
    const breadcrumbItems = [
      { name: 'Accueil', url: '/' },
      ...segments.map((seg, i) => {
        acc = `${acc}/${seg}`
        const isLast = i === segments.length - 1
        return {
          name: isLast ? title : prettifyBreadcrumbSegment(seg),
          url: acc,
        }
      }),
    ]
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems.map((item, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: item.name,
        item: item.url.startsWith('http')
          ? item.url
          : `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vivos-assurance.fr'}${item.url}`,
      })),
    })
  }

  // Service schema (insurance offering)
  if (enrichment.garantie_label) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${canonical}#service`,
      name: enrichment.garantie_label,
      description,
      url: canonical,
      provider: {
        '@type': 'InsuranceAgency',
        name: 'Vivos Vivos Assurance',
        url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vivos-assurance.fr',
      },
      areaServed: enrichment.ville_nom
        ? { '@type': 'City', name: enrichment.ville_nom }
        : { '@type': 'Country', name: 'France' },
      offers: enrichment.prix_min_eur
        ? {
            '@type': 'AggregateOffer',
            lowPrice: Math.round(enrichment.prix_min_eur),
            highPrice: enrichment.prix_max_eur ? Math.round(enrichment.prix_max_eur) : undefined,
            priceCurrency: 'EUR',
            offerCount: enrichment.assureurs_top3_jsonb?.length ?? 1,
            availability: 'https://schema.org/InStock',
          }
        : undefined,
    })

    // Product schema (when prix is set — improves shopping-style rich results)
    if (enrichment.prix_min_eur) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Product',
        '@id': `${canonical}#product`,
        name: title,
        description,
        category: enrichment.garantie_label,
        offers: {
          '@type': 'AggregateOffer',
          lowPrice: Math.round(enrichment.prix_min_eur),
          highPrice: enrichment.prix_max_eur ? Math.round(enrichment.prix_max_eur) : undefined,
          priceCurrency: 'EUR',
          offerCount: enrichment.assureurs_top3_jsonb?.length ?? 1,
        },
      })
    }
  }

  // Review[] + AggregateRating depuis Trustpilot ISO 20488 vérifiés
  // (Google rich snippet stars + LLM context)
  const validAvis = enrichment.avis_top_jsonb?.filter((a) => a.iso_20488) ?? []
  if (validAvis.length > 0) {
    const itemReviewedName = enrichment.garantie_label ?? 'Assurance professionnelle'

    // Review unitaires (max 8 — Google AdWords recommandation)
    for (const [idx, avis] of validAvis.slice(0, 8).entries()) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Review',
        '@id': `${canonical}#review-${idx}`,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: avis.note,
          bestRating: 5,
          worstRating: 1,
        },
        name: `Avis ${avis.note}/5 — ${itemReviewedName}`,
        reviewBody: avis.texte,
        datePublished: avis.date,
        author: {
          '@type': 'Person',
          name: avis.auteur,
          ...(avis.ville
            ? { address: { '@type': 'PostalAddress', addressLocality: avis.ville } }
            : {}),
        },
        itemReviewed: { '@type': 'Service', name: itemReviewedName },
      })
    }

    // AggregateRating (synthèse) — émis dès 1 avis valide (Google rich snippet
    // optimal à partir de 3, mais syntaxe valide dès 1)
    const avgRating = validAvis.reduce((sum, a) => sum + a.note, 0) / validAvis.length
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'AggregateRating',
      ratingValue: avgRating.toFixed(1),
      reviewCount: validAvis.length,
      bestRating: 5,
      worstRating: 1,
      itemReviewed: { '@type': 'Service', name: itemReviewedName },
    })
  }

  // FAQPage — auto-generated from data signals (price + density + sinistralité)
  const faqItems: { q: string; a: string }[] = []
  if (enrichment.prix_min_eur && enrichment.prix_max_eur && enrichment.garantie_label) {
    faqItems.push({
      q: `Quel est le prix de ${enrichment.garantie_label}${enrichment.metier_nom ? ` pour un ${enrichment.metier_nom}` : ''} ?`,
      a: `Le tarif marché 2026 s'étend de ${Math.round(enrichment.prix_min_eur)}€/an à ${Math.round(enrichment.prix_max_eur)}€/an, avec une médiane de ${enrichment.prix_med_eur ? Math.round(enrichment.prix_med_eur) : '—'}€/an. Devis personnalisé via courtier ORIAS partenaire.`,
    })
  }
  if (enrichment.sinistralite_pct && enrichment.garantie_label) {
    faqItems.push({
      q: `Quelle est la sinistralité de ${enrichment.garantie_label}${enrichment.metier_nom ? ` chez les ${enrichment.metier_nom}s` : ''} ?`,
      a: `La sinistralité observée est de ${enrichment.sinistralite_pct.toFixed(1)}% (source AQC SYCODÉS, dernière année disponible).`,
    })
  }
  if (enrichment.density_insee && enrichment.metier_nom && enrichment.ville_nom) {
    faqItems.push({
      q: `Combien y a-t-il de ${enrichment.metier_nom}s à ${enrichment.ville_nom} ?`,
      a: `~${enrichment.density_insee.toLocaleString('fr-FR')} ${enrichment.metier_nom}s sont recensés à ${enrichment.ville_nom} selon l'INSEE Sirene (mis à jour mensuel).`,
    })
  }
  if (faqItems.length >= 2) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
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
