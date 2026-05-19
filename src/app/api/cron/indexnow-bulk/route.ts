/**
 * CRON / Manual — Bulk IndexNow submission (warm-up initial).
 *
 * Endpoint à appeler 1× après fix de configuration pour soumettre TOUTES les
 * URLs du sitemap.xml en une seule fois (par batches de 10k = limite IndexNow).
 *
 * Utilisé pour:
 *   - Bootstrap initial post-fix de la clé/configuration IndexNow
 *   - Rebuild sitemap massif (ex: refonte pSEO)
 *
 * Pour quotidien delta (recommandé), utiliser /api/cron/indexnow-submit.
 */

import { NextResponse, type NextRequest } from 'next/server'
import { SITE_URL } from '@/lib/seo/config'
import { submitToIndexNow } from '@/lib/seo/indexnow'
import { logger } from '@/lib/logger'
import { verifyCronAuthorization } from '@/lib/security/cron-auth'

interface IndexNowBulkResult {
  total: number
  batches: number
  submitted: number
  errors: string[]
}

export async function GET(req: NextRequest) {
  if (!verifyCronAuthorization(req.headers.get('authorization'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const result: IndexNowBulkResult = {
    total: 0,
    batches: 0,
    submitted: 0,
    errors: [],
  }

  try {
    // Fetch sitemap.xml propre
    const sitemapRes = await fetch(`${SITE_URL}/sitemap.xml`, {
      headers: { 'User-Agent': 'Vivos-IndexNow-Bulk/1.0' },
    })
    if (!sitemapRes.ok) {
      return NextResponse.json(
        { error: 'sitemap fetch failed', status: sitemapRes.status },
        { status: 502 }
      )
    }
    const xml = await sitemapRes.text()

    // Parse <loc>...</loc> robuste
    const locs: string[] = []
    const locRegex = /<loc>\s*(https?:\/\/[^<\s]+)\s*<\/loc>/gi
    let match: RegExpExecArray | null
    while ((match = locRegex.exec(xml)) !== null) {
      const url = match[1]
      if (url) locs.push(url)
    }

    result.total = locs.length

    if (locs.length === 0) {
      return NextResponse.json({ error: 'no urls found in sitemap' }, { status: 500 })
    }

    // Batches de 10k (limite IndexNow). Sitemap Vivos = ~6700 = 1 seul batch.
    const BATCH_SIZE = 10_000
    for (let i = 0; i < locs.length; i += BATCH_SIZE) {
      const batch = locs.slice(i, i + BATCH_SIZE)
      const res = await submitToIndexNow(batch)
      result.batches++
      result.submitted += res.submitted
      if (!res.success && res.error) {
        result.errors.push(res.error)
      }
    }

    logger.info({ ...result }, 'indexnow-bulk submission completed')
    return NextResponse.json({ ok: true, ...result })
  } catch (err) {
    logger.error({ err }, 'indexnow-bulk failed')
    return NextResponse.json(
      {
        error: 'bulk submission error',
        ...result,
      },
      { status: 500 }
    )
  }
}
