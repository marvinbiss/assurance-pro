import { getMetierSlugs } from '@/lib/data/decennale-metiers'
import { getProfessionSlugs } from '@/lib/data/rc-pro-professions'
import { getVilleSlugs } from '@/lib/data/villes-top100'
import { getPostSlugs } from '@/lib/data/blog-posts'

/**
 * Univers d'URLs indexables (chemins absolus relatifs au domaine, ex: `/rc-pro/avocat`).
 * Source unique de vérité pour les pipelines d'indexation (Google, IndexNow).
 * Étendre ici quand de nouvelles couches de pages sont ajoutées.
 */

const STATIC_PRIORITY = [
  '/',
  '/assurance-decennale',
  '/rc-pro',
  '/multirisque-pro',
  '/mutuelle-pro',
  '/assurance-vtc',
  '/cyber-assurance',
  '/rc-pro-avocat',
  '/rc-pro-medecin',
  '/comparateur-assureurs',
  '/devis',
  '/blog',
  '/faq',
  '/glossaire',
  '/a-propos',
  '/equipe',
  '/notre-processus-conseil',
  '/selection-assureurs',
  '/fic',
  '/ipid',
  '/reclamation',
]

/**
 * Construit l'ensemble complet et dédupliqué des chemins d'URL prioritaires.
 * Non capé : le contrôle de quota est fait par l'appelant (cron/queue).
 */
export function buildPriorityUrlPaths(): string[] {
  const paths = new Set<string>(STATIC_PRIORITY)

  const metiers = new Set(getMetierSlugs())
  const profs = new Set(getProfessionSlugs())

  for (const slug of metiers) paths.add(`/assurance-decennale/${slug}`)
  for (const slug of profs) paths.add(`/rc-pro/${slug}`)
  for (const slug of getPostSlugs()) paths.add(`/blog/${slug}`)

  // Géo : croise les villes top avec les garanties (sans doublonner les métiers/professions).
  for (const v of getVilleSlugs()) {
    if (!metiers.has(v)) paths.add(`/assurance-decennale/${v}`)
    if (!profs.has(v)) paths.add(`/rc-pro/${v}`)
  }

  return Array.from(paths)
}
