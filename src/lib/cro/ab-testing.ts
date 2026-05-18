/**
 * A/B Testing — Cookie-based variant routing
 *
 * Pattern : assigne une variante stable à chaque visiteur via cookie 50j.
 * Évite le flicker de variant entre pages (variant assignée 1× puis persistée).
 *
 * Usage server-side via headers().get('cookie') / client-side via document.cookie.
 *
 * Tracking : chaque assignation push événement GTM `ab_assignment` pour cohort GA4.
 */

import { createHash } from 'node:crypto'

export interface ABExperiment<V extends string = string> {
  /** Identifiant unique de l'expérience (ex: "sticky-cta-color") */
  id: string
  /** Variantes possibles (default = première variante = control) */
  variants: readonly V[]
  /** Distribution équiprobable par défaut, ou poids personnalisés (ex: [0.5, 0.5]) */
  weights?: readonly number[]
}

const COOKIE_NAME = 'ab_variants'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 50 /* 50 jours */

/**
 * Hash stable d'un identifiant utilisateur en index numérique 0..1.
 * Permet variant assignment déterministe par user (pas de flicker).
 */
function hashToFraction(seed: string): number {
  const hash = createHash('sha256').update(seed).digest()
  /* Premiers 4 octets en uint32 puis normalise sur [0,1].
     SHA-256 garantit length >= 32 bytes, donc hash[0..3] sont toujours définis. */
  const b0 = hash[0] ?? 0
  const b1 = hash[1] ?? 0
  const b2 = hash[2] ?? 0
  const b3 = hash[3] ?? 0
  const n = (b0 << 24) | (b1 << 16) | (b2 << 8) | b3
  return (n >>> 0) / 2 ** 32
}

/**
 * Assigne une variante à un visiteur basée sur un identifiant stable
 * (ex: cookie session ID ou IP hashée).
 */
export function assignVariant<V extends string>(experiment: ABExperiment<V>, visitorId: string): V {
  const fraction = hashToFraction(`${experiment.id}:${visitorId}`)
  const weights =
    experiment.weights ?? experiment.variants.map(() => 1 / experiment.variants.length)

  let cumulative = 0
  for (let i = 0; i < experiment.variants.length; i++) {
    cumulative += weights[i] ?? 0
    if (fraction < cumulative) {
      return experiment.variants[i] as V
    }
  }
  return experiment.variants[0] as V /* fallback control */
}

/**
 * Parse le cookie ab_variants : "exp1=A;exp2=B" → Map.
 */
export function parseAbCookie(cookieValue: string | null | undefined): Map<string, string> {
  if (!cookieValue) return new Map()
  const map = new Map<string, string>()
  cookieValue.split(';').forEach((pair) => {
    const [k, v] = pair.trim().split('=')
    if (k && v) map.set(k, v)
  })
  return map
}

/**
 * Sérialise une Map de variantes en valeur de cookie.
 */
export function serializeAbCookie(variants: Map<string, string>): string {
  return Array.from(variants.entries())
    .map(([k, v]) => `${k}=${v}`)
    .join(';')
}

/**
 * Construit le header Set-Cookie pour persister les variantes 50j.
 */
export function buildSetCookieHeader(variants: Map<string, string>): string {
  const value = serializeAbCookie(variants)
  return `${COOKIE_NAME}=${value}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`
}

export const AB_COOKIE_NAME = COOKIE_NAME
