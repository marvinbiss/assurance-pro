import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'
import { verifyCronAuthorization } from '@/lib/security/cron-auth'
import { submitToGoogleIndexing, isGoogleIndexingEnabled } from '@/lib/seo/google-indexing'
import { recordSubmissions } from '@/lib/seo/index-queue'
import { logger } from '@/lib/logger'

/**
 * POST /api/google-indexing — push instantané d'URLs vers Google Indexing API.
 * À appeler à la publication/maj d'une page pour une indexation immédiate
 * (vrai gain de vitesse vs cron quotidien). Auth interne (Bearer CRON_SECRET).
 *
 * Body : { urls: string[], type?: 'URL_UPDATED' | 'URL_DELETED' }
 * Cap 100 URLs/appel (anti-abus du quota Google).
 */

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const bodySchema = z.object({
  urls: z.array(z.string().min(1)).min(1).max(100),
  type: z.enum(['URL_UPDATED', 'URL_DELETED']).default('URL_UPDATED'),
})

export async function POST(request: NextRequest) {
  if (!verifyCronAuthorization(request.headers.get('authorization'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!isGoogleIndexingEnabled()) {
    return NextResponse.json({ enabled: false, skipped: 'GOOGLE_INDEXING_ENABLED is not true' })
  }

  const parsed = bodySchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid body', code: 'INVALID_BODY' }, { status: 400 })
  }

  try {
    const result = await submitToGoogleIndexing(parsed.data.urls, parsed.data.type)
    // Journalise dans la file (submit_count basé sur 0 ici ; le cron consolide la rotation).
    await recordSubmissions(
      result.results.map((r) => ({ url: r.url, submit_count: 0 })),
      result.results
    )
    logger.info(
      { submitted: result.submitted, failed: result.failed, type: parsed.data.type },
      'google indexing manual push'
    )
    return NextResponse.json({ submitted: result.submitted, failed: result.failed })
  } catch (err) {
    logger.error({ err }, 'google indexing manual push failed')
    return NextResponse.json({ error: 'Google Indexing push failed' }, { status: 500 })
  }
}
