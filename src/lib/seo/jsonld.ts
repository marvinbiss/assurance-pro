/**
 * Schema.org JSON-LD pour Vivos Assurance (cabinet de courtage ORIAS).
 * Trois schémas exportés :
 * - getOrganizationSchema : InsuranceAgency (E-E-A-T critique YMYL)
 * - getWebsiteSchema : WebSite + SearchAction
 * - getBreadcrumbSchema : BreadcrumbList (utilisé par les piliers)
 *
 * Tous les autres schémas (Service, ItemList, Place, Loan, Urgency, etc.)
 * ont été retirés — non utilisés par le site courtage.
 */

import { SITE_URL, SITE_NAME } from './config'
import { companyIdentity, isCompanyRegistered, getSocialLinks } from '@/lib/config/company-identity'

export function getOrganizationSchema() {
  const socialLinks = getSocialLinks()
  const registered = isCompanyRegistered()
  const ORIAS = process.env.NEXT_PUBLIC_ORIAS_NUMBER ?? "En cours d'attribution"

  return {
    '@context': 'https://schema.org',
    '@type': 'InsuranceAgency',
    '@id': `${SITE_URL}#organization`,
    identifier: [{ '@type': 'PropertyValue', propertyID: 'ORIAS', value: ORIAS }],
    knowsAbout: [
      'Garantie décennale BTP',
      'Responsabilité civile professionnelle',
      'Multirisque Professionnelle',
      'Dommages-ouvrage',
      'Tous Risques Chantier',
      'Mutuelle santé TNS Madelin',
      'Prévoyance dirigeant',
      'Assurance VTC',
      'Cyber assurance',
    ],
    serviceType: 'Courtage en assurance professionnelle',
    award: 'Adhérent CSCA',
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/icons/icon-512x512.png`,
      width: 512,
      height: 512,
    },
    description:
      'Courtier ORIAS spécialiste assurance professionnelle. Décennale, RC Pro, Multirisque, Mutuelle TNS, VTC, Cyber.',
    ...(socialLinks.length > 0 && { sameAs: socialLinks }),
    areaServed: { '@type': 'Country', name: 'France' },
    email: companyIdentity.email,
    contactPoint: {
      '@type': 'ContactPoint',
      url: `${SITE_URL}/contact`,
      contactType: 'customer service',
      availableLanguage: 'French',
      email: companyIdentity.email,
      ...(companyIdentity.phone && { telephone: companyIdentity.phone }),
    },
    ...(registered && {
      legalName: companyIdentity.legalName,
      address: {
        '@type': 'PostalAddress',
        streetAddress: companyIdentity.address,
        addressCountry: 'FR',
      },
      telephone: companyIdentity.phone,
      foundingDate: companyIdentity.foundingDate,
      ...(companyIdentity.tvaIntracom && { vatID: companyIdentity.tvaIntracom }),
    }),
  }
}

export function getWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    alternateName: ['vivos-assurance.fr'],
    url: SITE_URL,
    publisher: { '@id': `${SITE_URL}#organization` },
  }
}

/**
 * Schema.org Service — pour les piliers métier (RC Pro, décennale, mutuelle, etc.)
 * Génère un rich snippet "Service" avec provider + areaServed + offer.
 */
export function getServiceSchema(params: {
  name: string
  description: string
  url: string
  serviceType?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: params.name,
    description: params.description,
    provider: { '@id': `${SITE_URL}#organization` },
    areaServed: { '@type': 'Country', name: 'France' },
    serviceType: params.serviceType ?? 'Courtage en assurance professionnelle',
    url: params.url,
    audience: {
      '@type': 'Audience',
      audienceType: 'Travailleurs indépendants, TPE, PME, professions réglementées',
    },
  }
}

/**
 * Schema.org FAQPage — rich snippet questions/réponses.
 *
 * Inclut SpeakableSpecification (Google Assistant, Alexa, voice-first AI)
 * et inLanguage explicite pour cibler les LLMs.
 */
export function getFAQPageSchema(faq: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'fr-FR',
    isAccessibleForFree: true,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['[data-speakable="true"]', '.speakable'],
      xpath: ['/html/head/title', '//*[@data-speakable="true"]'],
    },
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
        inLanguage: 'fr-FR',
      },
    })),
  }
}

/**
 * Schema.org Article — pour les guides juridiques (/guides/*) et blog.
 *
 * Améliorations LLM/AEO/GEO :
 *   - author Person granulaire (E-E-A-T YMYL critique) avec sameAs LinkedIn
 *   - publisher Organization avec logo ImageObject explicite (Google News + AI Overviews)
 *   - image hero pour Discover + AI Overviews
 *   - isAccessibleForFree pour Google AI Overviews tri prioritaire
 *   - inLanguage pour ciblage LLMs multilingues
 *   - articleSection pour catégorisation
 *   - wordCount / timeRequired pour signal qualité
 */
export interface ArticleAuthor {
  name: string
  url?: string
  jobTitle?: string
  sameAs?: string[]
  alumniOf?: string
}

export function getArticleSchema(params: {
  headline: string
  description: string
  url: string
  datePublished?: string
  dateModified?: string
  image?: string | string[]
  author?: ArticleAuthor
  articleSection?: string
  wordCount?: number
  timeRequiredIso?: string
}) {
  const now = new Date().toISOString().split('T')[0]
  const imageList = params.image
    ? Array.isArray(params.image)
      ? params.image
      : [params.image]
    : [`${SITE_URL}/opengraph-image`]

  const author = params.author
    ? {
        '@type': 'Person' as const,
        name: params.author.name,
        ...(params.author.url ? { url: params.author.url } : {}),
        ...(params.author.jobTitle ? { jobTitle: params.author.jobTitle } : {}),
        ...(params.author.sameAs && params.author.sameAs.length > 0
          ? { sameAs: params.author.sameAs }
          : {}),
        ...(params.author.alumniOf
          ? { alumniOf: { '@type': 'Organization', name: params.author.alumniOf } }
          : {}),
        worksFor: { '@id': `${SITE_URL}#organization` },
      }
    : { '@id': `${SITE_URL}#organization` }

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: params.headline,
    description: params.description,
    url: params.url,
    inLanguage: 'fr-FR',
    isAccessibleForFree: true,
    image: imageList,
    author,
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}#organization`,
      name: 'Vivos Assurance',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/icon.svg`,
        width: 512,
        height: 512,
      },
    },
    datePublished: params.datePublished ?? now,
    dateModified: params.dateModified ?? now,
    mainEntityOfPage: { '@type': 'WebPage', '@id': params.url },
    ...(params.articleSection ? { articleSection: params.articleSection } : {}),
    ...(params.wordCount ? { wordCount: params.wordCount } : {}),
    ...(params.timeRequiredIso ? { timeRequired: params.timeRequiredIso } : {}),
  }
}

/**
 * Schema.org HowTo — guides procéduraux (étapes numérotées en SERP).
 */
export interface HowToStep {
  name: string
  text: string
  url?: string
  imageUrl?: string
}

export function getHowToSchema(params: {
  name: string
  description: string
  totalTimeIso?: string
  steps: HowToStep[]
  estimatedCostEur?: number
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: params.name,
    description: params.description,
    ...(params.totalTimeIso ? { totalTime: params.totalTimeIso } : {}),
    ...(params.estimatedCostEur != null
      ? {
          estimatedCost: {
            '@type': 'MonetaryAmount',
            currency: 'EUR',
            value: String(params.estimatedCostEur),
          },
        }
      : {}),
    step: params.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
      ...(s.url ? { url: s.url } : {}),
      ...(s.imageUrl ? { image: s.imageUrl } : {}),
    })),
  }
}

/**
 * Schema.org Person — pages auteur expert (E-E-A-T critique YMYL).
 */
export function getPersonSchema(params: {
  name: string
  jobTitle: string
  url: string
  imageUrl?: string
  description?: string
  sameAs?: string[]
  alumniOf?: string[]
  knowsAbout?: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: params.name,
    jobTitle: params.jobTitle,
    url: params.url,
    ...(params.imageUrl ? { image: params.imageUrl } : {}),
    ...(params.description ? { description: params.description } : {}),
    ...(params.sameAs && params.sameAs.length > 0 ? { sameAs: params.sameAs } : {}),
    ...(params.alumniOf && params.alumniOf.length > 0
      ? { alumniOf: params.alumniOf.map((name) => ({ '@type': 'EducationalOrganization', name })) }
      : {}),
    ...(params.knowsAbout && params.knowsAbout.length > 0 ? { knowsAbout: params.knowsAbout } : {}),
    worksFor: { '@id': `${SITE_URL}#organization` },
  }
}

/**
 * Schema.org DefinedTerm — termes assurance (glossaire).
 */
export function getDefinedTermSchema(params: {
  name: string
  description: string
  termCode?: string
  url: string
  inDefinedTermSet?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: params.name,
    description: params.description,
    url: params.url,
    ...(params.termCode ? { termCode: params.termCode } : {}),
    ...(params.inDefinedTermSet
      ? {
          inDefinedTermSet: {
            '@type': 'DefinedTermSet',
            name: 'Glossaire Vivos Assurance',
            url: params.inDefinedTermSet,
          },
        }
      : {}),
  }
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => {
      const isLast = index === items.length - 1
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        ...(!isLast && { item: `${SITE_URL}${item.url}` }),
      }
    }),
  }
}

/**
 * Schema.org Review (avis individuel) + AggregateRating.
 *
 * Source : avis Trustpilot ISO 20488 vérifiés (norme NF Service).
 * Génère rich snippet ★★★★☆ en SERP Google + visible dans LLM context.
 *
 * Convention : ne JAMAIS injecter d'avis non-vérifiés (CGU Google AdWords +
 * réglementation DGCCRF avis trompeurs depuis 2024).
 */
export interface VerifiedReview {
  /** Identifiant unique de l'avis (Trustpilot review id) */
  id: string
  /** Auteur (anonymisé : prénom + initiale OK) */
  author: string
  /** Note 1-5 */
  rating: 1 | 2 | 3 | 4 | 5
  /** Texte de l'avis (déjà filtré DGCCRF) */
  text: string
  /** Date publication ISO YYYY-MM-DD */
  datePublished: string
  /** Ville auteur (optionnelle, anonymisation) */
  city?: string
  /** ISO 20488 vérifié */
  iso20488: boolean
}

/**
 * Génère un schema Review unitaire.
 */
export function getReviewSchema(params: {
  review: VerifiedReview
  itemReviewedName: string
  itemReviewedType?: 'Service' | 'Product' | 'InsuranceAgency' | 'Organization'
}) {
  const itemType = params.itemReviewedType ?? 'Service'
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    '@id': `${SITE_URL}#review-${params.review.id}`,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: params.review.rating,
      bestRating: 5,
      worstRating: 1,
    },
    name: `Avis ${params.review.rating}/5 — ${params.itemReviewedName}`,
    reviewBody: params.review.text,
    datePublished: params.review.datePublished,
    author: {
      '@type': 'Person',
      name: params.review.author,
      ...(params.review.city
        ? { address: { '@type': 'PostalAddress', addressLocality: params.review.city } }
        : {}),
    },
    publisher: { '@id': `${SITE_URL}#organization` },
    itemReviewed: {
      '@type': itemType,
      name: params.itemReviewedName,
      ...(itemType === 'InsuranceAgency' || itemType === 'Organization'
        ? { '@id': `${SITE_URL}#organization` }
        : {}),
    },
  }
}

/**
 * Génère un AggregateRating à partir d'une collection d'avis vérifiés.
 * Retourne null si moins de 3 avis (Google requirement).
 */
export function getAggregateRatingSchema(params: {
  reviews: VerifiedReview[]
  itemReviewedName: string
  itemReviewedType?: 'Service' | 'Product' | 'InsuranceAgency' | 'Organization'
}): Record<string, unknown> | null {
  const validReviews = params.reviews.filter((r) => r.iso20488)
  if (validReviews.length < 3) return null

  const totalRating = validReviews.reduce((sum, r) => sum + r.rating, 0)
  const avg = totalRating / validReviews.length
  const itemType = params.itemReviewedType ?? 'Service'

  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue: avg.toFixed(1),
    reviewCount: validReviews.length,
    bestRating: 5,
    worstRating: 1,
    itemReviewed: {
      '@type': itemType,
      name: params.itemReviewedName,
      ...(itemType === 'InsuranceAgency' || itemType === 'Organization'
        ? { '@id': `${SITE_URL}#organization` }
        : {}),
    },
  }
}

/**
 * Génère le combo Review[] + AggregateRating prêt à injecter.
 * Pattern recommandé pour pages services avec avis (Google AdWords friendly).
 */
export function getReviewsBlockSchema(params: {
  reviews: VerifiedReview[]
  itemReviewedName: string
  itemReviewedType?: 'Service' | 'Product' | 'InsuranceAgency' | 'Organization'
  maxReviews?: number
}): Array<Record<string, unknown>> {
  const schemas: Array<Record<string, unknown>> = []
  const validReviews = params.reviews.filter((r) => r.iso20488)
  if (validReviews.length === 0) return schemas

  const max = params.maxReviews ?? 8
  for (const review of validReviews.slice(0, max)) {
    schemas.push(
      getReviewSchema({
        review,
        itemReviewedName: params.itemReviewedName,
        itemReviewedType: params.itemReviewedType,
      })
    )
  }

  const aggregate = getAggregateRatingSchema(params)
  if (aggregate) schemas.push(aggregate)

  return schemas
}

/**
 * Schema.org AggregateRating — variante "direct params" (stats site déjà agrégés).
 *
 * Use case : injecter une note moyenne consolidée (Trustpilot synthèse) sur
 * toutes les pages piliers, sans avoir à charger la collection complète des
 * Review individuels. Conforme `schema.org/AggregateRating`.
 *
 * À privilégier sur les pages où l'on veut le rich snippet ★ sans le poids
 * du payload Review[] complet. Le composant `getReviewsBlockSchema` reste
 * la voie pour Review + Aggregate ensemble.
 */
export function getAggregateRatingDirectSchema(params: {
  ratingValue: number
  reviewCount: number
  bestRating?: number
  worstRating?: number
  itemReviewedName?: string
  itemReviewedType?: 'Service' | 'Product' | 'InsuranceAgency' | 'Organization'
}): Record<string, unknown> {
  const itemType = params.itemReviewedType ?? 'InsuranceAgency'
  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue: params.ratingValue.toFixed(1),
    reviewCount: params.reviewCount,
    bestRating: params.bestRating ?? 5,
    worstRating: params.worstRating ?? 1,
    itemReviewed: {
      '@type': itemType,
      name: params.itemReviewedName ?? SITE_NAME,
      '@id': `${SITE_URL}#organization`,
    },
  }
}

/**
 * Schema.org Offer — pricing offer attaché à un Product ou Service.
 *
 * Compatible `schema.org/Offer`. `availability` doit être une URL Schema.org
 * (ex : `https://schema.org/InStock`). `priceValidUntil` au format ISO `YYYY-MM-DD`.
 */
export function getOfferSchema(params: {
  price: number | string
  priceCurrency?: string
  priceValidUntil?: string
  availability?: string
  url: string
  name?: string
}): Record<string, unknown> {
  return {
    '@type': 'Offer',
    price: typeof params.price === 'number' ? params.price.toFixed(2) : params.price,
    priceCurrency: params.priceCurrency ?? 'EUR',
    availability: params.availability ?? 'https://schema.org/InStock',
    url: params.url,
    ...(params.priceValidUntil ? { priceValidUntil: params.priceValidUntil } : {}),
    ...(params.name ? { name: params.name } : {}),
    seller: { '@id': `${SITE_URL}#organization` },
  }
}

/**
 * Schema.org Product — schema combiné Product (avec brand + offers + rating).
 *
 * Utilisé pour les piliers présentés en "produit assurance" (formules
 * packagées). Combine Product avec offers (Offer[]) et aggregateRating
 * (AggregateRating) pour SERP rich snippet complet.
 */
export function getProductSchema(params: {
  name: string
  description: string
  url: string
  brand?: string
  offers?: Record<string, unknown> | Array<Record<string, unknown>>
  aggregateRating?: Record<string, unknown>
  image?: string
  category?: string
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: params.name,
    description: params.description,
    url: params.url,
    brand: {
      '@type': 'Brand',
      name: params.brand ?? SITE_NAME,
    },
    ...(params.image ? { image: params.image } : {}),
    ...(params.category ? { category: params.category } : {}),
    ...(params.offers ? { offers: params.offers } : {}),
    ...(params.aggregateRating ? { aggregateRating: params.aggregateRating } : {}),
  }
}

/**
 * Schema.org InsuranceAgency — alias explicite vers `getOrganizationSchema`.
 *
 * `getOrganizationSchema()` retourne déjà un node `InsuranceAgency` complet
 * (identifier ORIAS, knowsAbout, areaServed France, contactPoint, etc.).
 * Cet alias rend l'intention explicite à l'appel (E-E-A-T YMYL signal).
 */
export function getInsuranceAgencyOrganizationSchema(): Record<string, unknown> {
  return getOrganizationSchema()
}

/**
 * Schema.org ClaimReview — pages contenant chiffres factuels (ACPR, AQC, INSEE,
 * Légifrance, FFA/FFB). Permet aux LLMs (ChatGPT, Claude, Perplexity, Gemini)
 * de citer directement la donnée vérifiée avec attribution Vivos Assurance.
 *
 * Standard utilisé par Reuters, AFP, Le Monde, Washington Post pour fact-checking.
 */
export interface ClaimReviewParams {
  claim: string // ex: "Le tarif moyen RC Pro auto-entrepreneur 2026 est 95€/an"
  claimUrl: string // URL de la page hébergeant le claim
  reviewedBy?: string // nom de l'auteur ou "Cabinet Vivos Assurance"
  datePublished?: string
  ratingValue?: 1 | 2 | 3 | 4 | 5 // 5 = True, 1 = False (échelle ClaimReview)
  ratingText?: string // ex: "Vérifié — Source AQC SYCODÉS 2026"
  sourceUrl?: string // URL de la source primaire (Légifrance, ACPR…)
  sourceName?: string // ex: "AQC SYCODÉS", "ACPR", "INSEE Sirene"
}

export function getClaimReviewSchema(params: ClaimReviewParams): Record<string, unknown> {
  const now = new Date().toISOString().split('T')[0]
  return {
    '@context': 'https://schema.org',
    '@type': 'ClaimReview',
    datePublished: params.datePublished ?? now,
    url: params.claimUrl,
    claimReviewed: params.claim,
    author: {
      '@type': 'Organization',
      '@id': `${SITE_URL}#organization`,
      name: 'Vivos Assurance',
    },
    ...(params.reviewedBy
      ? {
          itemReviewed: {
            '@type': 'Claim',
            datePublished: params.datePublished ?? now,
            appearance: {
              '@type': 'OpinionNewsArticle',
              url: params.claimUrl,
              author: {
                '@type': 'Organization',
                name: params.reviewedBy,
              },
              ...(params.sourceUrl
                ? {
                    citation: {
                      '@type': 'CreativeWork',
                      url: params.sourceUrl,
                      name: params.sourceName ?? 'Source primaire',
                    },
                  }
                : {}),
            },
          },
        }
      : {
          itemReviewed: {
            '@type': 'Claim',
            datePublished: params.datePublished ?? now,
            ...(params.sourceUrl
              ? {
                  citation: {
                    '@type': 'CreativeWork',
                    url: params.sourceUrl,
                    name: params.sourceName ?? 'Source primaire',
                  },
                }
              : {}),
          },
        }),
    reviewRating: {
      '@type': 'Rating',
      ratingValue: String(params.ratingValue ?? 5),
      bestRating: '5',
      worstRating: '1',
      alternateName: params.ratingText ?? 'Vérifié',
    },
  }
}
