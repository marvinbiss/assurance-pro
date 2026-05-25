import { NextResponse } from 'next/server'
import { verifyCronAuthorization } from '@/lib/security/cron-auth'
import {
  submitToGoogleIndexing,
  isGoogleIndexingEnabled,
  googleIndexingDailyQuota,
} from '@/lib/seo/google-indexing'
import {
  syncUrlUniverse,
  claimNextUrls,
  recordSubmissions,
  remainingQuotaToday,
} from '@/lib/seo/index-queue'
import { logger } from '@/lib/logger'

/**
 * Cron quotidien : pousse vers Google Indexing API les URLs prioritaires
 * (jamais soumises d'abord, puis les plus anciennes), dans la limite du quota
 * journalier (200/jour par défaut). Fait tourner les 8 400 pages sur ~42 jours.
 *
 * Complément de l'indexation Bing/Yandex (cron `indexnow-submit`).
 * No-op tant que GOOGLE_INDEXING_ENABLED !== 'true'.
 */

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

export async function GET(request: Request) {
  if (!verifyCronAuthorization(request.headers.get('authorization'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!isGoogleIndexingEnabled()) {
    return NextResponse.json({ enabled: false, skipped: 'GOOGLE_INDEXING_ENABLED is not true' })
  }

  try {
    await syncUrlUniverse()

    const quota = googleIndexingDailyQuota()
    const remaining = await remainingQuotaToday(quota)
    if (remaining <= 0) {
      return NextResponse.json({
        enabled: true,
        submitted: 0,
        message: 'daily quota exhausted',
        quota,
      })
    }

    const claimed = await claimNextUrls(remaining)
    if (claimed.length === 0) {
      return NextResponse.json({ enabled: true, submitted: 0, message: 'queue empty' })
    }

    const result = await submitToGoogleIndexing(claimed.map((c) => c.url))
    await recordSubmissions(claimed, result.results)

    logger.info(
      { claimed: claimed.length, submitted: result.submitted, failed: result.failed, quota },
      'google indexing daily submission'
    )
    return NextResponse.json({
      enabled: true,
      claimed: claimed.length,
      submitted: result.submitted,
      failed: result.failed,
      quota,
    })
  } catch (err) {
    logger.error({ err }, 'google indexing submission failed')
    return NextResponse.json({ error: 'Google Indexing submission failed' }, { status: 500 })
  }
}
