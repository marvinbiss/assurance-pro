/**
 * AHREFS API v3 (plan Advanced — 1M unités/mois)
 * https://ahrefs.com/api/documentation
 *
 * Utilisé pour :
 * - KW research (matching-terms) → univers SEO assurance pro
 * - Site Explorer → analyse concurrents
 * - Top pages → reverse engineering money pages
 * - Content Gap → opportunités KW non capturés
 * - Domain Rating monitoring
 */

import { logger } from '@/lib/logger'
import { MemoryCache } from '@/lib/utils/cache'

const apiCache = new MemoryCache<unknown>({ ttl: 24 * 60 * 60 * 1000, maxSize: 500 })

async function getOrSetCache<T>(key: string, fetcher: () => Promise<T>, ttl?: number): Promise<T> {
  const cached = apiCache.get(key)
  if (cached !== undefined) return cached as T
  const fresh = await fetcher()
  apiCache.set(key, fresh, ttl)
  return fresh
}

const AHREFS_API_BASE = 'https://api.ahrefs.com/v3'

export interface KeywordData {
  keyword: string
  volume: number
  difficulty: number | null
  cpc: number | null
  parent_topic?: string
  serp_features?: string[]
  intents?: string[]
  traffic_potential?: number
}

export interface ConcurrentMetrics {
  org_keywords: number
  paid_keywords: number
  org_keywords_1_3: number
  org_traffic: number
  org_cost: number
  paid_traffic: number
  paid_cost: number | null
  paid_pages: number
}

export interface DomainRating {
  domain_rating: number
  ahrefs_rank: number
}

export interface TopPage {
  url: string
  sum_traffic: number
  value: number
  keywords: number
  top_keyword: string
  top_keyword_volume: number
  top_keyword_best_position: number
  page_type?: string
}

async function callAhrefs<T>(
  endpoint: string,
  params: Record<string, string | number | undefined>
): Promise<T> {
  const token = process.env.AHREFS_API_TOKEN
  if (!token) {
    throw new Error('AHREFS_API_TOKEN not configured')
  }

  const url = new URL(`${AHREFS_API_BASE}${endpoint}`)
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null) url.searchParams.set(k, String(v))
  }

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
    signal: AbortSignal.timeout(10_000),
  })

  if (!res.ok) {
    const errText = await res.text().catch(() => '')
    logger.error({ endpoint, status: res.status, errText }, 'Ahrefs API error')
    throw new Error(`Ahrefs ${endpoint} returned ${res.status}`)
  }
  return (await res.json()) as T
}

/**
 * Recherche de KW correspondants à un seed
 */
export async function matchingTerms(
  keywords: string,
  options: {
    country?: string
    matchMode?: 'terms' | 'phrase' | 'broad'
    volumeMin?: number
    limit?: number
    orderBy?: string
  } = {}
): Promise<KeywordData[]> {
  const data = await callAhrefs<{ keywords: KeywordData[] }>('/keywords-explorer/matching-terms', {
    keywords,
    country: options.country ?? 'fr',
    match_mode: options.matchMode ?? 'terms',
    volume_min: options.volumeMin ?? 10,
    limit: Math.min(options.limit ?? 500, 500),
    order_by: options.orderBy ?? 'volume:desc',
    output: 'json',
    select: 'keyword,volume,difficulty,cpc,parent_topic,traffic_potential',
  })
  return data.keywords ?? []
}

/**
 * Récupère les métriques SEO d'un domaine pour la France
 */
export async function getDomainMetrics(target: string, country = 'fr'): Promise<ConcurrentMetrics> {
  const cacheKey = `ahrefs:metrics:${target}:${country}`
  return getOrSetCache(
    cacheKey,
    async () => {
      const today = new Date().toISOString().slice(0, 10)
      const data = await callAhrefs<{ metrics: ConcurrentMetrics }>('/site-explorer/metrics', {
        target,
        date: today,
        country,
        protocol: 'both',
        volume_mode: 'monthly',
      })
      return data.metrics
    },
    24 * 60 * 60 * 1000
  )
}

/**
 * Récupère le Domain Rating
 */
export async function getDomainRating(target: string): Promise<DomainRating> {
  const cacheKey = `ahrefs:dr:${target}`
  return getOrSetCache(
    cacheKey,
    async () => {
      const today = new Date().toISOString().slice(0, 10)
      const data = await callAhrefs<{ domain_rating: DomainRating }>(
        '/site-explorer/domain-rating',
        {
          target,
          date: today,
          protocol: 'both',
        }
      )
      return data.domain_rating
    },
    7 * 24 * 60 * 60 * 1000 // 7 jours
  )
}

/**
 * Top pages organiques d'un concurrent
 */
export async function getTopPages(
  target: string,
  options: { limit?: number; country?: string } = {}
): Promise<TopPage[]> {
  const today = new Date().toISOString().slice(0, 10)
  const data = await callAhrefs<{ pages: TopPage[] }>('/site-explorer/top-pages', {
    target,
    country: options.country ?? 'fr',
    date: today,
    date_compared: today,
    protocol: 'both',
    volume_mode: 'monthly',
    limit: options.limit ?? 1000,
    order_by: 'sum_traffic:desc',
    select:
      'url,sum_traffic,value,keywords,top_keyword,top_keyword_volume,top_keyword_best_position,page_type',
  })
  return data.pages ?? []
}

/**
 * Content Gap : KW où des concurrents rankent et toi pas (ou faiblement)
 */
export async function keywordsIntersection(
  targets: string[],
  options: {
    country?: string
    intersect?: number
    volumeMin?: number
    kdMax?: number
    limit?: number
  } = {}
): Promise<KeywordData[]> {
  const data = await callAhrefs<{ keywords: KeywordData[] }>(
    '/keywords-explorer/keywords-intersection',
    {
      targets: targets.join(','),
      country: options.country ?? 'fr',
      intersect: options.intersect ?? 2,
      volume_min: options.volumeMin ?? 20,
      kd_max: options.kdMax ?? 50,
      limit: options.limit ?? 1000,
      output: 'json',
    }
  )
  return data.keywords ?? []
}

/**
 * Quotas API restants
 */
export async function getQuota(): Promise<{
  units_limit: number
  units_used: number
  expires_at?: string
}> {
  const data = await callAhrefs<{
    limits_and_usage: {
      units_limit_workspace: number
      units_usage_workspace: number
      api_key_expiration_date?: string
    }
  }>('/subscription-info/limits-and-usage', {})

  return {
    units_limit: data.limits_and_usage.units_limit_workspace,
    units_used: data.limits_and_usage.units_usage_workspace,
    expires_at: data.limits_and_usage.api_key_expiration_date,
  }
}
