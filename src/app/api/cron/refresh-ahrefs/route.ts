/**
 * CRON — Refresh trimestriel des KW Ahrefs prioritaires
 * Cadence : 1× / trimestre (Vercel Cron)
 * Authentification : header `Authorization: Bearer ${CRON_SECRET}`
 */

import { NextResponse, type NextRequest } from 'next/server'
import { matchingTerms, getQuota } from '@/lib/api/ahrefs'
import { logger } from '@/lib/logger'
import { verifyCronAuthorization } from '@/lib/security/cron-auth'

const SEEDS = [
  'assurance décennale',
  'garantie décennale',
  'rc pro',
  'responsabilité civile professionnelle',
  'assurance professionnelle',
  'assurance entreprise',
  'multirisque pro',
  'multirisque professionnelle',
  'dommages ouvrage',
  'tous risques chantier',
  'assurance vtc',
  'assurance taxi',
  'cyber assurance',
  'mutuelle pro btp',
  'mutuelle tns',
  'prévoyance tns',
  'assurance avocat',
  'assurance médecin',
  'assurance restaurant',
  'assurance commerce',
]

export async function GET(req: NextRequest) {
  if (!verifyCronAuthorization(req.headers.get('authorization'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const quota = await getQuota()
    logger.info(`Ahrefs quota before refresh: ${quota.units_used}/${quota.units_limit}`)

    const allKeywords = new Map<string, { volume: number; difficulty: number | null; cpc: number | null }>()

    for (const seed of SEEDS) {
      try {
        const kws = await matchingTerms(seed, {
          country: 'fr',
          matchMode: 'terms',
          volumeMin: 20,
          limit: 500,
          orderBy: 'volume:desc',
        })
        for (const k of kws) {
          if (!allKeywords.has(k.keyword)) {
            allKeywords.set(k.keyword, {
              volume: k.volume,
              difficulty: k.difficulty,
              cpc: k.cpc,
            })
          }
        }
        logger.info({ seed, count: kws.length }, 'Ahrefs seed processed')
      } catch (err) {
        logger.error({ err, seed }, 'Ahrefs seed failed')
      }
    }

    // TODO: persist via Supabase service role (kw_universe upsert)
    const rows = Array.from(allKeywords.entries()).map(([keyword, m]) => ({
      keyword,
      volume: m.volume,
      kd: m.difficulty,
      cpc: m.cpc,
      country: 'fr',
      refreshed_at: new Date().toISOString(),
    }))

    logger.info({ totalKeywords: rows.length }, 'Ahrefs refresh complete')

    return NextResponse.json({
      ok: true,
      total_keywords: rows.length,
      total_volume: rows.reduce((s, r) => s + r.volume, 0),
      seeds_processed: SEEDS.length,
      quota_remaining: quota.units_limit - quota.units_used,
    })
  } catch (err) {
    logger.error({ err }, 'Ahrefs cron failed')
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
