import { google } from 'googleapis'
import { SITE_URL } from '@/lib/seo/config'

/**
 * Google Indexing API — push direct des URLs vers Google pour indexation rapide.
 *
 * ⚠️ AVERTISSEMENT ToS : l'API Indexing de Google ne supporte OFFICIELLEMENT que
 * les types `JobPosting` et `BroadcastEvent`. L'utiliser pour des pages
 * éditoriales/produit est une pratique pSEO courante qui FONCTIONNE en pratique,
 * mais sort du cadre strict des conditions d'utilisation Google. Sur un site YMYL
 * (assurance), le risque est faible mais réel.
 *
 * → Le drapeau `GOOGLE_INDEXING_ENABLED` est OFF par défaut : rien n'est envoyé
 *   tant qu'il n'est pas explicitement activé en env.
 * → Voie 100% légitime en complément : sitemap + maillage interne + Search Console.
 *
 * Auth : compte de service Google (JWT), scope `indexing`.
 * Quota Google par défaut : 200 URLs/jour, 600 req/min.
 *
 * Server-only. Ne JAMAIS importer côté client.
 */

const INDEXING_SCOPE = 'https://www.googleapis.com/auth/indexing'
const DEFAULT_CONCURRENCY = 8

export type IndexingType = 'URL_UPDATED' | 'URL_DELETED'

export interface IndexingUrlResult {
  url: string
  ok: boolean
  httpStatus: number
  error?: string
}

export interface IndexingBatchResult {
  enabled: boolean
  submitted: number
  failed: number
  results: IndexingUrlResult[]
  error?: string
}

export function isGoogleIndexingEnabled(): boolean {
  return process.env.GOOGLE_INDEXING_ENABLED === 'true'
}

/** Quota journalier (défaut Google = 200). Surchargeable pour quota augmenté. */
export function googleIndexingDailyQuota(): number {
  const raw = Number(process.env.GOOGLE_INDEXING_DAILY_QUOTA)
  return Number.isFinite(raw) && raw > 0 ? Math.floor(raw) : 200
}

function getServiceAccountCredentials(): { email: string; key: string } | null {
  const email = process.env.GOOGLE_INDEXING_CLIENT_EMAIL
  // Les clés privées stockées en env ont leurs sauts de ligne échappés (\n littéral).
  const key = process.env.GOOGLE_INDEXING_PRIVATE_KEY?.replace(/\\n/g, '\n')
  if (!email || !key) return null
  return { email, key }
}

function toAbsoluteUrl(u: string): string {
  return u.startsWith('http') ? u : `${SITE_URL}${u.startsWith('/') ? u : `/${u}`}`
}

/**
 * Soumet une liste d'URLs à Google Indexing API.
 * Respecte un pool de concurrence ; ne fait AUCUN appel si désactivé ou non configuré.
 * Le contrôle de quota (200/j) est de la responsabilité de l'appelant.
 */
export async function submitToGoogleIndexing(
  urls: string[],
  type: IndexingType = 'URL_UPDATED',
  concurrency: number = DEFAULT_CONCURRENCY
): Promise<IndexingBatchResult> {
  if (!isGoogleIndexingEnabled()) {
    return {
      enabled: false,
      submitted: 0,
      failed: 0,
      results: [],
      error: 'GOOGLE_INDEXING_ENABLED is not true',
    }
  }

  const creds = getServiceAccountCredentials()
  if (!creds) {
    return {
      enabled: true,
      submitted: 0,
      failed: 0,
      results: [],
      error: 'Missing GOOGLE_INDEXING_CLIENT_EMAIL or GOOGLE_INDEXING_PRIVATE_KEY',
    }
  }

  if (urls.length === 0) {
    return { enabled: true, submitted: 0, failed: 0, results: [] }
  }

  const jwt = new google.auth.JWT({
    email: creds.email,
    key: creds.key,
    scopes: [INDEXING_SCOPE],
  })

  const indexing = google.indexing({ version: 'v3', auth: jwt })
  const results: IndexingUrlResult[] = []

  // Pool de concurrence simple : on consomme la file par tranches.
  // `results.url` conserve l'URL d'ENTRÉE (souvent un chemin relatif), pas
  // l'URL absolue : c'est la clé utilisée par la file `seo_index_submissions`.
  // Ne convertir en absolu que pour l'appel API.
  let cursor = 0
  async function worker(): Promise<void> {
    while (cursor < urls.length) {
      const idx = cursor++
      const url = urls[idx]
      if (url === undefined) break
      const target = toAbsoluteUrl(url)
      try {
        const res = await indexing.urlNotifications.publish({
          requestBody: { url: target, type },
        })
        results.push({ url, ok: true, httpStatus: res.status ?? 200 })
      } catch (err: unknown) {
        const e = err as { code?: number; status?: number; message?: string }
        results.push({
          url,
          ok: false,
          httpStatus: e.code ?? e.status ?? 0,
          error: e.message ?? 'unknown error',
        })
      }
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, urls.length) }, worker))

  const submitted = results.filter((r) => r.ok).length
  return { enabled: true, submitted, failed: results.length - submitted, results }
}
