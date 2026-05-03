/**
 * Seed one-shot des 62 JSON Ahrefs (extraction 2026-04-29) dans Supabase.
 *
 * Usage :
 *   AHREFS_EXPORTS_DIR=/Users/marvin/assurance-pro/02-donnees-ahrefs/exports-jsons \
 *   SUPABASE_SERVICE_ROLE_KEY=eyJ... \
 *   NEXT_PUBLIC_SUPABASE_URL=https://tlhixlsglsqftufnqufb.supabase.co \
 *   npx tsx scripts/seed-ahrefs-data.ts
 *
 * Idempotent : upsert sur PK (kw_universe.keyword, competitor_pages.(domain,url),
 * competitor_metrics.domain). Re-exécutable en safety net.
 *
 * 4 typologies de fichiers (62 total) :
 *  - kw-*.json     (14)   → kw_universe   { keywords: [{keyword, volume, difficulty, cpc}] }
 *  - vert-*.json   (30)   → kw_universe   { keywords: [{keyword, volume, difficulty, cpc}] }
 *  - top-*.json    (6)    → competitor_pages   { pages: [{url, sum_traffic, value, ...}] }
 *  - metrics-*.json (6)   → competitor_metrics { metrics: {org_keywords, org_traffic, ...} }
 *  - dr-*.json     (6)    → competitor_metrics { domain_rating: {domain_rating, ahrefs_rank} }
 */

import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const EXPORTS_DIR = process.env.AHREFS_EXPORTS_DIR
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!EXPORTS_DIR || !SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    'Missing env vars. Required: AHREFS_EXPORTS_DIR, NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY'
  )
  process.exit(1)
}

interface KeywordRow {
  keyword: string
  volume: number
  difficulty: number | null
  cpc: number | null
  source: string
  country: string
}

interface CompetitorPageRow {
  domain: string
  url: string
  sum_traffic: number
  value: number
  keywords: number
  top_keyword: string | null
  top_keyword_volume: number | null
  top_keyword_best_position: number | null
  page_type: string | null
}

interface CompetitorMetricsRow {
  domain: string
  domain_rating?: number | null
  ahrefs_rank?: number | null
  org_keywords?: number | null
  org_keywords_top3?: number | null
  org_traffic?: number | null
  org_cost?: number | null
  paid_keywords?: number | null
  paid_traffic?: number | null
  paid_cost?: number | null
  paid_pages?: number | null
}

function readJson<T>(path: string): T {
  return JSON.parse(readFileSync(path, 'utf8')) as T
}

function isKeywordFile(filename: string): boolean {
  return filename.startsWith('kw-') || filename.startsWith('vert-')
}

function extractDomain(filename: string): string {
  // top-pages-coover.fr.json → coover.fr
  // metrics-coover.fr.json   → coover.fr
  // dr-coover.fr.json        → coover.fr
  return filename
    .replace(/^(top-pages-|metrics-|dr-)/, '')
    .replace(/\.json$/, '')
}

async function seedKeywords(client: SupabaseClient, dir: string): Promise<number> {
  const files = readdirSync(dir).filter((f) => f.endsWith('.json') && isKeywordFile(f))
  const allRows = new Map<string, KeywordRow>()

  for (const file of files) {
    const data = readJson<{ keywords?: Array<{ keyword: string; volume: number; difficulty: number | null; cpc: number | null }> }>(
      join(dir, file)
    )
    const kws = data.keywords ?? []
    let skipped = 0
    for (const k of kws) {
      // Skip entries sans volume (Ahrefs renvoie null pour les vol < 10
      // — pas pertinent pour pSEO et viole la contrainte NOT NULL).
      if (k.volume == null || !Number.isFinite(k.volume) || k.volume < 0) {
        skipped++
        continue
      }
      // Dedup : on garde la 1re occurrence (les fichiers ont des recouvrements).
      if (!allRows.has(k.keyword)) {
        allRows.set(k.keyword, {
          keyword: k.keyword,
          volume: k.volume,
          difficulty: k.difficulty,
          cpc: k.cpc,
          source: file,
          country: 'fr',
        })
      }
    }
    const note = skipped > 0 ? ` (${skipped} skipped : null volume)` : ''
    console.log(`  [kw] ${file}: ${kws.length} entries${note}`)
  }

  const rows = Array.from(allRows.values())
  console.log(`  [kw] Total dedup'd: ${rows.length} unique keywords`)

  // Batch upsert (1000 max par appel pour rester sous la limite Postgres)
  const BATCH = 1000
  for (let i = 0; i < rows.length; i += BATCH) {
    const batch = rows.slice(i, i + BATCH)
    const { error } = await client
      .from('kw_universe')
      .upsert(batch, { onConflict: 'keyword', ignoreDuplicates: false })
    if (error) {
      console.error(`  [kw] Batch ${i}-${i + batch.length} failed:`, error)
      throw error
    }
  }
  return rows.length
}

async function seedCompetitorPages(client: SupabaseClient, dir: string): Promise<number> {
  const files = readdirSync(dir).filter((f) => f.startsWith('top-pages-') && f.endsWith('.json'))
  let total = 0

  for (const file of files) {
    const domain = extractDomain(file)
    const data = readJson<{ pages?: Array<Record<string, unknown>> }>(join(dir, file))
    const pages = data.pages ?? []
    const rows: CompetitorPageRow[] = pages.map((p) => ({
      domain,
      url: String(p.url),
      sum_traffic: Number(p.sum_traffic) || 0,
      value: Number(p.value) || 0,
      keywords: Number(p.keywords) || 0,
      top_keyword: p.top_keyword == null ? null : String(p.top_keyword),
      top_keyword_volume: p.top_keyword_volume == null ? null : Number(p.top_keyword_volume),
      top_keyword_best_position: p.top_keyword_best_position == null ? null : Number(p.top_keyword_best_position),
      page_type: p.page_type == null ? null : String(p.page_type),
    }))

    const BATCH = 500
    for (let i = 0; i < rows.length; i += BATCH) {
      const batch = rows.slice(i, i + BATCH)
      const { error } = await client
        .from('competitor_pages')
        .upsert(batch, { onConflict: 'domain,url', ignoreDuplicates: false })
      if (error) {
        console.error(`  [pages] ${file} batch ${i} failed:`, error)
        throw error
      }
    }
    console.log(`  [pages] ${file} (${domain}): ${rows.length} pages`)
    total += rows.length
  }
  return total
}

async function seedCompetitorMetrics(client: SupabaseClient, dir: string): Promise<number> {
  // metrics-*.json + dr-*.json doivent être MERGÉS sur le même domain.
  const files = readdirSync(dir).filter(
    (f) => (f.startsWith('metrics-') || f.startsWith('dr-')) && f.endsWith('.json')
  )
  const merged = new Map<string, CompetitorMetricsRow>()

  for (const file of files) {
    const domain = extractDomain(file)
    const data = readJson<Record<string, Record<string, number>>>(join(dir, file))
    const existing = merged.get(domain) ?? { domain }

    if (file.startsWith('metrics-') && data.metrics) {
      const m = data.metrics
      Object.assign(existing, {
        org_keywords: m.org_keywords ?? null,
        org_keywords_top3: m.org_keywords_1_3 ?? null,
        org_traffic: m.org_traffic ?? null,
        org_cost: m.org_cost ?? null,
        paid_keywords: m.paid_keywords ?? null,
        paid_traffic: m.paid_traffic ?? null,
        paid_cost: m.paid_cost ?? null,
        paid_pages: m.paid_pages ?? null,
      })
    }
    if (file.startsWith('dr-') && data.domain_rating) {
      const d = data.domain_rating
      Object.assign(existing, {
        domain_rating: d.domain_rating ?? null,
        ahrefs_rank: d.ahrefs_rank ?? null,
      })
    }
    merged.set(domain, existing)
  }

  const rows = Array.from(merged.values())
  const { error } = await client
    .from('competitor_metrics')
    .upsert(rows, { onConflict: 'domain', ignoreDuplicates: false })
  if (error) {
    console.error('  [metrics] upsert failed:', error)
    throw error
  }
  console.log(`  [metrics] ${rows.length} domains seeded`)
  return rows.length
}

async function main() {
  console.log(`Seeding Ahrefs data from: ${EXPORTS_DIR}`)
  const client = createClient(SUPABASE_URL!, SERVICE_ROLE_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  console.log('\n[1/3] Seeding kw_universe...')
  const kwCount = await seedKeywords(client, EXPORTS_DIR!)

  console.log('\n[2/3] Seeding competitor_pages...')
  const pagesCount = await seedCompetitorPages(client, EXPORTS_DIR!)

  console.log('\n[3/3] Seeding competitor_metrics...')
  const metricsCount = await seedCompetitorMetrics(client, EXPORTS_DIR!)

  console.log('\n✓ Done.')
  console.log(`  kw_universe       : ${kwCount} rows`)
  console.log(`  competitor_pages  : ${pagesCount} rows`)
  console.log(`  competitor_metrics: ${metricsCount} rows`)
}

main().catch((err) => {
  console.error('\n✗ Seed failed:', err)
  process.exit(1)
})
