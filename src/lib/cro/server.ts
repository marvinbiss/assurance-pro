/**
 * Server-side variant resolution — pour SSR sans flicker.
 *
 * Usage Server Component / Layout :
 *   const variant = await getServerVariant(EXPERIMENTS.heroPitch, 'visitor_id_from_cookie')
 *   return <Hero pitch={variant} />
 *
 * En l'absence de cookie visiteur, on génère un id stable par requête
 * (anonymous hash IP+UA) — pas idéal mais évite double assignment.
 */

import { cookies, headers } from 'next/headers'
import { createHash } from 'node:crypto'
import {
  assignVariant,
  parseAbCookie,
  serializeAbCookie,
  buildSetCookieHeader,
  AB_COOKIE_NAME,
} from './ab-testing'
import { EXPERIMENTS, type ExperimentMetadata } from './experiments'

const VISITOR_COOKIE = 'vivos_vid'

/**
 * Récupère ou génère un visitor ID stable depuis le cookie.
 * Note : ce cookie est marqué nécessaire (functionality_storage), pas analytics.
 */
async function getVisitorId(): Promise<string> {
  const cookieStore = await cookies()
  const existing = cookieStore.get(VISITOR_COOKIE)?.value
  if (existing) return existing

  // Anonyme : hash IP + UA (anti-fingerprinting modéré, ID de session uniquement).
  const h = await headers()
  const ua = h.get('user-agent') ?? ''
  const fwd = h.get('x-forwarded-for') ?? h.get('x-real-ip') ?? 'anon'
  return createHash('sha256').update(`${fwd}|${ua}`).digest('hex').slice(0, 24)
}

/**
 * Résout la variante côté serveur (zero flicker).
 * Met en cache dans cookie ab_variants pour stabilité inter-pages.
 *
 * Note : si tu modifies la variante (ex: holdout), tu dois persister via
 * persistServerVariants() dans une route handler (cookies() est read-only
 * dans Server Components).
 */
export async function getServerVariant<E extends ExperimentMetadata>(
  experiment: E
): Promise<E['variants'][number]> {
  const visitorId = await getVisitorId()
  const cookieStore = await cookies()
  const existing = parseAbCookie(cookieStore.get(AB_COOKIE_NAME)?.value)

  const cached = existing.get(experiment.id)
  if (cached && experiment.variants.includes(cached as E['variants'][number])) {
    return cached as E['variants'][number]
  }

  // Holdout : skip exposure pour un % de visiteurs (groupe contrôle pur)
  if (experiment.holdout && experiment.holdout > 0) {
    const holdoutHash = createHash('sha256')
      .update(`holdout:${experiment.id}:${visitorId}`)
      .digest()
    const fraction = (((holdoutHash[0]! << 24) | (holdoutHash[1]! << 16)) >>> 0) / 2 ** 32
    if (fraction < experiment.holdout) {
      return experiment.variants[0] as E['variants'][number] /* control = first variant */
    }
  }

  return assignVariant(experiment, visitorId)
}

/**
 * Résout TOUTES les expériences actives en un appel (utile dans root layout).
 * Retourne un Record { experimentId: variant }.
 */
export async function getAllServerVariants(): Promise<Record<string, string>> {
  const out: Record<string, string> = {}
  for (const exp of Object.values(EXPERIMENTS)) {
    if (exp.status !== 'active') continue
    out[exp.id] = await getServerVariant(exp as ExperimentMetadata)
  }
  return out
}

// ─── Persistence helpers (route handler / server action only) ───────────────

/**
 * Génère le header Set-Cookie complet pour persister les variantes 50j.
 * À utiliser dans une route handler ou server action.
 */
export function buildVariantsCookieHeader(variants: Record<string, string>): string {
  const map = new Map(Object.entries(variants))
  return buildSetCookieHeader(map)
}

export { serializeAbCookie }
