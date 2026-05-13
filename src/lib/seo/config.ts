/**
 * SEO core constants — Vivos Assurance (cabinet de courtage ORIAS).
 * Importé partout où on a besoin de l'URL canonique du site.
 */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://vivos-assurance.fr')
  .trim()
  .replace(/\/+$/, '')

export const SITE_NAME = 'Vivos Assurance'
