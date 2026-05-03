/**
 * SEO core constants — Assurance Pro (cabinet de courtage ORIAS).
 * Importé partout où on a besoin de l'URL canonique du site.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://assurance-pro.fr'
)
  .trim()
  .replace(/\/+$/, '')

export const SITE_NAME = 'Assurance Pro'
