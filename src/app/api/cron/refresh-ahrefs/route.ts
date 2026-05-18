/**
 * CRON — Refresh trimestriel des KW Ahrefs prioritaires
 * Cadence : 1× / trimestre (Vercel Cron)
 * Authentification : header `Authorization: Bearer ${CRON_SECRET}`
 */

import { NextResponse, type NextRequest } from 'next/server'
import { matchingTerms, getQuota } from '@/lib/api/ahrefs'
import { logger } from '@/lib/logger'
import { verifyCronAuthorization } from '@/lib/security/cron-auth'
import { createPiiAdminClient } from '@/lib/supabase/admin'

const SEEDS = [
  'assurance décennale',
  'garantie décennale',
  'rc pro',
  'responsabilité civile professionnelle',
  'assurance professionnelle',
  'assurance entreprise',
  'multirisque pro',
  'Multirisque Professionnelle',
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

    const allKeywords = new Map<
      string,
      { volume: number; difficulty: number | null; cpc: number | null }
    >()

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

    const rows = Array.from(allKeywords.entries()).map(([keyword, m]) => ({
      keyword,
      volume: m.volume,
      difficulty: m.difficulty,
      cpc: m.cpc,
      source: 'cron-refresh-ahrefs',
      country: 'fr',
      refreshed_at: new Date().toISOString(),
    }))

    // Upsert via service role (bypass RLS — kw_universe est intelligence
    // concurrentielle, accès strict service role uniquement). Batch de 1000
    // pour rester sous les limites Postgres / requête HTTP.
    const supabase = createPiiAdminClient()
    let upserted = 0
    const BATCH = 1000
    for (let i = 0; i < rows.length; i += BATCH) {
      const batch = rows.slice(i, i + BATCH)
      const { error } = await supabase
        .from('kw_universe')
        .upsert(batch, { onConflict: 'keyword', ignoreDuplicates: false })
      if (error) {
        logger.error({ err: error, batchOffset: i }, 'kw_universe upsert batch failed')
        throw new Error(`kw_universe upsert failed at batch ${i}: ${error.message}`)
      }
      upserted += batch.length
    }

    logger.info({ totalKeywords: rows.length, upserted }, 'Ahrefs refresh complete')

    return NextResponse.json({
      ok: true,
      total_keywords: rows.length,
      upserted,
      total_volume: rows.reduce((s, r) => s + r.volume, 0),
      seeds_processed: SEEDS.length,
      quota_remaining: quota.units_limit - quota.units_used,
    })
  } catch (err) {
    logger.error({ err }, 'Ahrefs cron failed')
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
