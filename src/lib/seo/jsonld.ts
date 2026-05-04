/**
 * Schema.org JSON-LD pour Assurance Pro (cabinet de courtage ORIAS).
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
  const ORIAS = process.env.NEXT_PUBLIC_ORIAS_NUMBER ?? '07 0XX XXX'

  return {
    '@context': 'https://schema.org',
    '@type': 'InsuranceAgency',
    '@id': `${SITE_URL}#organization`,
    identifier: [{ '@type': 'PropertyValue', propertyID: 'ORIAS', value: ORIAS }],
    knowsAbout: [
      'Garantie décennale BTP',
      'Responsabilité civile professionnelle',
      'Multirisque professionnelle',
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
    alternateName: ['assurance-pro.fr'],
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
 */
export function getFAQPageSchema(faq: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  }
}

/**
 * Schema.org Article — pour les guides juridiques (/guides/*).
 */
export function getArticleSchema(params: {
  headline: string
  description: string
  url: string
  datePublished?: string
  dateModified?: string
}) {
  const now = new Date().toISOString().split('T')[0]
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: params.headline,
    description: params.description,
    url: params.url,
    author: { '@id': `${SITE_URL}#organization` },
    publisher: { '@id': `${SITE_URL}#organization` },
    datePublished: params.datePublished ?? now,
    dateModified: params.dateModified ?? now,
    mainEntityOfPage: { '@type': 'WebPage', '@id': params.url },
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
