#!/usr/bin/env node
/**
 * Snapshot slugs depuis Supabase vers fichier TS commité.
 * Permet generateStaticParams en build CI sans accès Supabase.
 *
 * Usage : node scripts/snapshot-pseo-slugs.mjs
 * Output : src/lib/data/pseo-slugs-snapshot.ts (commité)
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync, writeFileSync } from 'fs'

const env = readFileSync('.env.local', 'utf-8')
  .split('\n')
  .reduce((a, l) => {
    const m = l.match(/^([A-Z_]+)=(.+)$/)
    if (m) a[m[1]] = m[2].replace(/^"|"$/g, '')
    return a
  }, {})

const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY)

const TEMPLATES = [
  'prix_garantie_ville_statut',
  'comparateur_garantie_ville',
  'guide_metier_ville',
  'tarif',
]

async function fetchSlugs(template) {
  const { data, error } = await sb.rpc('get_eligible_slugs_for_template', {
    p_template: template,
    p_min_yield: 15,
    p_limit: 10000,
  })
  if (error) {
    console.error(`[${template}] ERROR`, error.message)
    return []
  }
  return data ?? []
}

console.log('🔍 Fetching slugs from Supabase...')
const result = {}
let total = 0
for (const t of TEMPLATES) {
  const arr = await fetchSlugs(t)
  result[t] = arr
  total += arr.length
  console.log(`  ${t}: ${arr.length} slugs`)
}

const content = `/**
 * Snapshot pré-généré des slugs pSEO éligibles (yield_score >= 15).
 *
 * Source : Supabase RPC get_eligible_slugs_for_template (cache enrichment).
 * Généré par : scripts/snapshot-pseo-slugs.mjs
 * Date : ${new Date().toISOString()}
 * Total : ${total} slugs
 *
 * Permet generateStaticParams sans Supabase en build CI/prod (fallback).
 * Re-générer après chaque migration enrichment cache.
 */

export const PSEO_SLUGS_SNAPSHOT = ${JSON.stringify(result, null, 2)} as const

export type PseoTemplate = keyof typeof PSEO_SLUGS_SNAPSHOT
`

writeFileSync('src/lib/data/pseo-slugs-snapshot.ts', content)
console.log(`✅ Wrote ${total} slugs to src/lib/data/pseo-slugs-snapshot.ts`)
