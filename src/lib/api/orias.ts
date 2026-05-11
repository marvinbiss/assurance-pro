/**
 * ORIAS — Registre officiel des intermédiaires en assurance
 * https://www.orias.fr/
 *
 * Pas d'API REST publique : on utilise la fiche publique HTML par numéro.
 * Pour valider l'authenticité d'un courtier ou récupérer ses informations légales.
 *
 * IMPORTANT (arrêté du 6 décembre 2022) :
 * - Le numéro ORIAS DOIT être cliquable depuis chaque page du site courtier
 * - La cliquabilité doit pointer vers la fiche publique ORIAS
 *
 * Critique pour conformité ACPR + signal E-E-A-T fort pour Google YMYL.
 */

import { logger } from '@/lib/logger'
import { MemoryCache } from '@/lib/utils/cache'

const apiCache = new MemoryCache<unknown>({ ttl: 24 * 60 * 60 * 1000, maxSize: 200 })

async function getOrSetCache<T>(
  key: string,
  fetcher: () => Promise<T | null>,
  ttl?: number
): Promise<T | null> {
  const cached = apiCache.get(key)
  if (cached !== undefined) return cached as T | null
  const fresh = await fetcher()
  if (fresh !== null) apiCache.set(key, fresh, ttl)
  return fresh
}

const ORIAS_BASE_URL = 'https://www.orias.fr'

export interface OriasIntermediaire {
  orias_number: string
  legal_name: string
  siret?: string
  category:
    | 'IAS'
    | 'IOBSP'
    | 'CIF'
    | 'IFP'
    | 'AGENT_GENERAL'
    | 'COURTIER'
    | 'MIA'
    | 'MAA'
    | 'MIOBSP'
    | 'MCIOB'
    | 'MIFP'
  status: 'ACTIVE' | 'SUSPENDED' | 'WITHDRAWN'
  immatriculation_date?: string
  address?: string
  postal_code?: string
  city?: string
  country?: string
  registry_url: string
  raw_html?: string
}

/**
 * Valide le format d'un numéro ORIAS (8 chiffres potentiellement préfixés)
 * Ex : "07012345" ou "07 012 345"
 */
export function isValidOriasFormat(oriasNumber: string): boolean {
  const cleaned = oriasNumber.replace(/\s/g, '')
  return /^\d{8}$/.test(cleaned)
}

/**
 * Normalise un numéro ORIAS (retire espaces, padding zéros)
 */
export function normalizeOriasNumber(oriasNumber: string): string {
  return oriasNumber.replace(/\s/g, '').padStart(8, '0')
}

/**
 * URL publique de la fiche ORIAS
 */
export function buildOriasFicheUrl(oriasNumber: string): string {
  const normalized = normalizeOriasNumber(oriasNumber)
  return `${ORIAS_BASE_URL}/intermediaire/welcome?orias=${normalized}`
}

/**
 * URL générique du registre ORIAS (à utiliser dans le footer en cliquabilité)
 */
export function buildOriasRegistryUrl(): string {
  return `${ORIAS_BASE_URL}/welcome`
}

/**
 * Récupère la fiche publique d'un courtier par son numéro ORIAS
 * Utilise le cache (24h) car les données changent peu
 */
export async function fetchOriasFiche(oriasNumber: string): Promise<OriasIntermediaire | null> {
  if (!isValidOriasFormat(oriasNumber)) {
    return null
  }

  const normalized = normalizeOriasNumber(oriasNumber)
  const cacheKey = `orias:fiche:${normalized}`

  return getOrSetCache(
    cacheKey,
    async () => {
      try {
        const url = buildOriasFicheUrl(normalized)
        const res = await fetch(url, {
          headers: {
            'User-Agent': 'AssurancePro-Compliance-Bot/1.0',
            Accept: 'text/html',
          },
          signal: AbortSignal.timeout(8000),
        })

        if (!res.ok) {
          logger.warn({ oriasNumber, status: res.status }, 'ORIAS fiche not found')
          return null
        }

        const html = await res.text()
        const fiche = parseOriasHtml(html, normalized, url)
        return fiche
      } catch (err) {
        logger.error({ err, oriasNumber }, 'ORIAS fetch error')
        return null
      }
    },
    24 * 60 * 60 * 1000 // 24h cache
  )
}

/**
 * Parse le HTML public ORIAS (best-effort, structure peut évoluer)
 */
function parseOriasHtml(html: string, oriasNumber: string, url: string): OriasIntermediaire {
  const extract = (regex: RegExp): string | undefined => {
    const m = html.match(regex)
    return m?.[1]?.trim()
  }

  const legalName = extract(/Dénomination[^<]*<[^>]+>([^<]+)</i) ?? oriasNumber
  const siret = extract(/SIREN[^<]*<[^>]+>([\d\s]+)</i)?.replace(/\s/g, '')
  const address = extract(/Adresse[^<]*<[^>]+>([^<]+)</i)
  const postalCode = extract(/(\d{5})\s+[A-Z]/i)
  const city = extract(/\d{5}\s+([A-Z][^<]+)</i)

  const statusRaw = extract(/Statut[^<]*<[^>]+>([^<]+)</i)?.toLowerCase() ?? ''
  const status: OriasIntermediaire['status'] = statusRaw.includes('actif')
    ? 'ACTIVE'
    : statusRaw.includes('suspend')
      ? 'SUSPENDED'
      : statusRaw.includes('radi')
        ? 'WITHDRAWN'
        : 'ACTIVE'

  const categoryRaw = extract(/Cat[ée]gorie[^<]*<[^>]+>([^<]+)</i)?.toUpperCase() ?? ''
  const category: OriasIntermediaire['category'] = categoryRaw.includes('COURTIER')
    ? 'COURTIER'
    : categoryRaw.includes('AGENT')
      ? 'AGENT_GENERAL'
      : categoryRaw.includes('MIA')
        ? 'MIA'
        : 'IAS'

  return {
    orias_number: oriasNumber,
    legal_name: legalName,
    siret,
    category,
    status,
    address,
    postal_code: postalCode,
    city,
    country: 'FR',
    registry_url: url,
  }
}

/**
 * Vérifie si un courtier est actif au registre ORIAS (cache 24h)
 */
export async function isOriasActive(oriasNumber: string): Promise<boolean> {
  const fiche = await fetchOriasFiche(oriasNumber)
  return fiche?.status === 'ACTIVE'
}

/**
 * Composant cliquable ORIAS — wording recommandé pour le footer
 *
 * Usage React :
 *   <a href={buildOriasFicheUrl('07012345')} target="_blank" rel="noopener noreferrer">
 *     Courtier ORIAS n° 07 012 345
 *   </a>
 */
export function formatOriasDisplay(oriasNumber: string): string {
  const normalized = normalizeOriasNumber(oriasNumber)
  return `${normalized.slice(0, 2)} ${normalized.slice(2, 5)} ${normalized.slice(5, 8)}`
}
