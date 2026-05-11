/**
 * Branded types — string nominal typing pour identifiants critiques.
 *
 * Empêche le mélange accidentel entre IDs sémantiquement distincts
 * (ex: passer un MetierCode où un GarantieCode est attendu).
 *
 * Usage :
 *   const slug = toPageSlug('prix/rc-pro')         // PageSlug
 *   const wrong: GarantieCode = slug              // TS Error ✅
 *
 *   function getPage(slug: PageSlug) { ... }
 *   getPage('not-a-validated-slug')                // TS Error ✅
 *   getPage(toPageSlug('not-a-validated-slug'))    // OK
 */

declare const __brand: unique symbol

export type Brand<T, B extends string> = T & { readonly [__brand]: B }

// ─── Identifiants métier ─────────────────────────────────────────────────────

export type PageSlug = Brand<string, 'PageSlug'>
export type MetierCode = Brand<string, 'MetierCode'>
export type GarantieCode = Brand<string, 'GarantieCode'>
export type VilleSlug = Brand<string, 'VilleSlug'>
export type CityId = Brand<string, 'CityId'> // UUID
export type StatutJuridique = Brand<string, 'StatutJuridique'>

// ─── Identifiants externes ───────────────────────────────────────────────────

export type SIRET = Brand<string, 'SIRET'> // 14 digits
export type SIREN = Brand<string, 'SIREN'> // 9 digits
export type OriasNumber = Brand<string, 'OriasNumber'>
export type ApiCodeRome = Brand<string, 'ApiCodeRome'>

// ─── Constructeurs validés ───────────────────────────────────────────────────

const PAGE_SLUG_REGEX = /^[a-z0-9]+(?:[-/][a-z0-9]+)*$/
const SIRET_REGEX = /^\d{14}$/
const SIREN_REGEX = /^\d{9}$/

export function toPageSlug(s: string): PageSlug {
  const normalized = s
    .trim()
    .replace(/^\/+|\/+$/g, '')
    .toLowerCase()
  if (!PAGE_SLUG_REGEX.test(normalized)) {
    throw new Error(`Invalid PageSlug: ${s}`)
  }
  return normalized as PageSlug
}

export function isPageSlug(s: string): s is PageSlug {
  const normalized = s
    .trim()
    .replace(/^\/+|\/+$/g, '')
    .toLowerCase()
  return PAGE_SLUG_REGEX.test(normalized)
}

export function toSIRET(s: string): SIRET {
  const cleaned = s.replace(/\s/g, '')
  if (!SIRET_REGEX.test(cleaned)) {
    throw new Error(`Invalid SIRET (must be 14 digits): ${s}`)
  }
  return cleaned as SIRET
}

export function toSIREN(s: string): SIREN {
  const cleaned = s.replace(/\s/g, '')
  if (!SIREN_REGEX.test(cleaned)) {
    throw new Error(`Invalid SIREN (must be 9 digits): ${s}`)
  }
  return cleaned as SIREN
}

export function toMetierCode(s: string): MetierCode {
  return s.trim().toLowerCase() as MetierCode
}

export function toGarantieCode(s: string): GarantieCode {
  return s.trim().toLowerCase() as GarantieCode
}

export function toVilleSlug(s: string): VilleSlug {
  return s.trim().toLowerCase() as VilleSlug
}

export function toCityId(s: string): CityId {
  // UUID v4 validation
  const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  if (!UUID_REGEX.test(s)) {
    throw new Error(`Invalid CityId (must be UUID): ${s}`)
  }
  return s as CityId
}

export function toStatutJuridique(s: string): StatutJuridique {
  return s.trim().toLowerCase() as StatutJuridique
}
