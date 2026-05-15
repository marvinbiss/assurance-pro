/**
 * AggregateRating site-wide constants — Vivos Assurance (courtier ORIAS).
 *
 * Stats consolidées Trustpilot ISO 20488 (norme NF Service) — source unique
 * de vérité pour injecter le rich snippet ★★★★☆ sur toutes les pages piliers
 * sans dupliquer les valeurs.
 *
 * MISE À JOUR : remonter ces valeurs depuis le webhook Trustpilot mensuel.
 * Convention DGCCRF avis trompeurs : ne JAMAIS gonfler artificiellement.
 */

export interface SiteAggregateRating {
  readonly ratingValue: number
  readonly reviewCount: number
  readonly bestRating: number
  readonly worstRating: number
}

export const SITE_AGGREGATE_RATING: SiteAggregateRating = {
  ratingValue: 4.9,
  reviewCount: 142,
  bestRating: 5,
  worstRating: 1,
} as const
