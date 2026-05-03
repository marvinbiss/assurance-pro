/**
 * Garantie slug dispatcher — résout un slug `/[garantie]/[slug]` vers
 * son type ('main' resource ou 'ville') et sa donnée associée.
 *
 * Architecture HOF générique : `createSlugResolver(getMain, getMainSlugs)`
 * factorise le dispatch métier/profession/ville pour les 6 verticales.
 *
 * Source unique pour :
 * - generateStaticParams (avec dédoublonnage main↔ville)
 * - dispatch render-time
 * - audit collisions build-time
 */

import { getMetier, getMetierSlugs } from '@/lib/data/decennale-metiers'
import { getProfession, getProfessionSlugs } from '@/lib/data/rc-pro-professions'
import { getVille, getVilleSlugs } from '@/lib/data/villes-top100'
import type { MetierBtp } from '@/lib/data/decennale-metiers'
import type { ProfessionRcPro } from '@/lib/data/rc-pro-professions'
import type { VilleData } from '@/lib/data/villes-top100'

// ─────────────────────────────────────────────────────────────────────────
// HOF générique
// ─────────────────────────────────────────────────────────────────────────

interface SlugResolverConfig<TMain, TMainKind extends string> {
  mainKind: TMainKind
  getMain: (slug: string) => TMain | undefined
  getMainSlugs: () => string[]
}

type GenericResolution<TMain, TMainKind extends string> =
  | ({ kind: TMainKind } & { [K in TMainKind]: TMain })
  | { kind: 'ville'; ville: VilleData }
  | null

export function createSlugResolver<TMain, TMainKind extends string>(
  cfg: SlugResolverConfig<TMain, TMainKind>
) {
  const resolve = (slug: string): GenericResolution<TMain, TMainKind> => {
    const main = cfg.getMain(slug)
    if (main) {
      return { kind: cfg.mainKind, [cfg.mainKind]: main } as GenericResolution<TMain, TMainKind>
    }
    const ville = getVille(slug)
    if (ville) return { kind: 'ville', ville }
    return null
  }

  const staticSlugs = (): Array<{ slug: string }> => {
    const mainSet = new Set(cfg.getMainSlugs())
    const mains = cfg.getMainSlugs().map((slug) => ({ slug }))
    const villes = getVilleSlugs()
      .filter((s) => !mainSet.has(s))
      .map((slug) => ({ slug }))
    return [...mains, ...villes]
  }

  return { resolve, staticSlugs }
}

// ─────────────────────────────────────────────────────────────────────────
// Instances spécialisées (préservent la signature historique)
// ─────────────────────────────────────────────────────────────────────────

export type DecennaleSlugResolution =
  | { kind: 'metier'; metier: MetierBtp }
  | { kind: 'ville'; ville: VilleData }
  | null

export type RcProSlugResolution =
  | { kind: 'profession'; profession: ProfessionRcPro }
  | { kind: 'ville'; ville: VilleData }
  | null

const decennaleResolver = createSlugResolver({
  mainKind: 'metier' as const,
  getMain: getMetier,
  getMainSlugs: getMetierSlugs,
})

const rcProResolver = createSlugResolver({
  mainKind: 'profession' as const,
  getMain: getProfession,
  getMainSlugs: getProfessionSlugs,
})

export const resolveDecennaleSlug = decennaleResolver.resolve as (
  slug: string
) => DecennaleSlugResolution

export const resolveRcProSlug = rcProResolver.resolve as (slug: string) => RcProSlugResolution

export const decennaleStaticSlugs = decennaleResolver.staticSlugs
export const rcProStaticSlugs = rcProResolver.staticSlugs

// ─────────────────────────────────────────────────────────────────────────
// Audit collisions
// ─────────────────────────────────────────────────────────────────────────

export function detectSlugCollisions(): {
  metierVille: string[]
  professionVille: string[]
} {
  const metierSet = new Set(getMetierSlugs())
  const profSet = new Set(getProfessionSlugs())
  const villes = getVilleSlugs()
  return {
    metierVille: villes.filter((v) => metierSet.has(v)),
    professionVille: villes.filter((v) => profSet.has(v)),
  }
}
