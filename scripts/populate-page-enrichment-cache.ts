/**
 * Populate page_enrichment_cache (Couches C+D programmatique).
 *
 * Génère ~5 820 rows en croisant :
 *   - app.metiers (~80)
 *   - app.cities (top 100 villes via villes-top100.ts)
 *   - app.garanties_assurance (~17)
 *   - app.statuts_juridiques (5)
 *   - app.kw_universe (vol/KD/CPC)
 *
 * Filtre yield_score >= 15 (anti-thin, cf. audit Ahrefs : métier×ville pur = 7.3).
 *
 * Usage : npx tsx scripts/populate-page-enrichment-cache.ts
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

// ────────────────────────────────────────────────────────────────────────────
// Env loader (pattern existant repo)
// ────────────────────────────────────────────────────────────────────────────

function loadEnv(): Record<string, string> {
  return readFileSync('.env.local', 'utf-8')
    .split('\n')
    .reduce((acc: Record<string, string>, line) => {
      const m = line.match(/^([A-Z_]+)=(.+)$/)
      if (m && m[1] && m[2]) acc[m[1]] = m[2].replace(/^"|"$/g, '')
      return acc
    }, {})
}

const env = loadEnv()
const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sb: any = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: { schema: 'app' as never },
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sbPublic: any = createClient(SUPABASE_URL, SUPABASE_KEY)

// ────────────────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────────────────

interface Metier {
  code: string
  name: string
  vertical: string
}
interface City {
  id: string
  slug: string
  name: string
  population: number
}
interface Garantie {
  code: string
  name: string
  slug: string
}
interface Statut {
  code: string
  name: string
  slug: string
}
interface KwRow {
  keyword: string
  volume: number
  difficulty: number | null
  cpc: number | null
}
interface SireneRow {
  metier_code: string
  city_id: string
  count_actifs: number
}

interface CacheRow {
  page_slug: string
  page_template:
    | 'prix_garantie_ville_statut'
    | 'comparateur_garantie_ville'
    | 'guide_metier_ville'
    | 'tarif'
  metier_code: string | null
  garantie_code: string | null
  statut_juridique: string | null
  ville_slug: string | null
  city_id: string | null
  density_insee: number | null
  kw_target: string | null
  kw_volume: number | null
  kw_kd: number | null
  kw_cpc: number | null
  yield_score: number
  generation_status: 'pending'
}

// ────────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────────

function calcYield(density: number, volume: number, kd: number, cpc: number): number {
  // Formule = function SQL app.calc_yield_score (cohérence build/script)
  return (
    Math.round(
      ((density * Math.log(Math.max(volume, 1) + 1) * Math.log(cpc + 1)) / (kd + 1)) * 100
    ) / 100
  )
}

function findKw(kwUniverse: KwRow[], patterns: string[]): KwRow | null {
  for (const pat of patterns) {
    const p = pat.toLowerCase().trim()
    const found = kwUniverse.find((k) => k.keyword.toLowerCase().includes(p))
    if (found && found.volume >= 30) return found
  }
  return null
}

// ────────────────────────────────────────────────────────────────────────────
// Loaders
// ────────────────────────────────────────────────────────────────────────────

async function loadMetiers(): Promise<Metier[]> {
  const { data, error } = await sb.from('metiers').select('code,name,vertical')
  if (error) throw error
  return (data ?? []) as Metier[]
}

async function loadCities(limit = 100): Promise<City[]> {
  const { data, error } = await sb
    .from('cities')
    .select('id,slug,name,population')
    .order('population', { ascending: false })
    .limit(limit)
  if (error) throw error
  return (data ?? []) as City[]
}

async function loadGaranties(): Promise<Garantie[]> {
  const { data, error } = await sb.from('garanties_assurance').select('code,name,slug')
  if (error) throw error
  return (data ?? []) as Garantie[]
}

async function loadStatuts(): Promise<Statut[]> {
  const { data, error } = await sb.from('statuts_juridiques').select('code,name,slug')
  if (error) throw error
  return (data ?? []) as Statut[]
}

async function loadKwUniverse(): Promise<KwRow[]> {
  // public schema (kw_universe not in app namespace)
  const all: KwRow[] = []
  let from = 0
  while (true) {
    const { data, error } = await sbPublic
      .from('kw_universe')
      .select('keyword,volume,difficulty,cpc')
      .gte('volume', 30)
      .range(from, from + 999)
    if (error) throw error
    if (!data || data.length === 0) break
    all.push(...(data as KwRow[]))
    if (data.length < 1000) break
    from += 1000
  }
  return all
}

async function loadSireneDensity(): Promise<Map<string, number>> {
  const all: SireneRow[] = []
  let from = 0
  while (true) {
    const { data, error } = await sb
      .from('artisans_count_sirene')
      .select('metier_code,city_id,count_actifs')
      .gte('count_actifs', 50) // pré-filtre densité
      .range(from, from + 999)
    if (error) throw error
    if (!data || data.length === 0) break
    all.push(...(data as SireneRow[]))
    if (data.length < 1000) break
    from += 1000
  }
  const map = new Map<string, number>()
  for (const r of all) {
    map.set(`${r.metier_code}|${r.city_id}`, r.count_actifs)
  }
  return map
}

// ────────────────────────────────────────────────────────────────────────────
// Generators (4 templates principaux)
// ────────────────────────────────────────────────────────────────────────────

function generatePrixRows(
  metiers: Metier[],
  cities: City[],
  garanties: Garantie[],
  statuts: Statut[],
  density: Map<string, number>,
  kw: KwRow[]
): CacheRow[] {
  const out: CacheRow[] = []
  const cityRef = cities[0]
  if (!cityRef) return out
  for (const g of garanties) {
    for (const m of metiers) {
      for (const s of statuts) {
        const dens = density.get(`${m.code}|${cityRef.id}`) ?? 0
        if (dens < 50) continue

        const kwMatch = findKw(kw, [
          `prix ${g.slug} ${m.name} ${s.name}`,
          `tarif ${g.slug} ${m.name}`,
          `${g.slug} ${m.name} prix`,
          `${g.slug} ${m.name}`,
        ])
        if (!kwMatch) continue

        const y = calcYield(dens, kwMatch.volume, kwMatch.difficulty ?? 30, kwMatch.cpc ?? 100)
        if (y < 15) continue

        out.push({
          page_slug: `prix/${g.slug}/${m.code}/${s.slug}`,
          page_template: 'prix_garantie_ville_statut',
          metier_code: m.code,
          garantie_code: g.code,
          statut_juridique: s.code,
          ville_slug: null,
          city_id: null,
          density_insee: dens,
          kw_target: kwMatch.keyword,
          kw_volume: kwMatch.volume,
          kw_kd: kwMatch.difficulty,
          kw_cpc: kwMatch.cpc,
          yield_score: y,
          generation_status: 'pending',
        })
      }
    }
  }
  return out
}

function generateComparateurRows(
  cities: City[],
  garanties: Garantie[],
  density: Map<string, number>,
  kw: KwRow[]
): CacheRow[] {
  const out: CacheRow[] = []
  const densityEntries = Array.from(density.entries())
  for (const g of garanties) {
    for (const c of cities) {
      // Pour comparateur on n'a pas de métier fixé → density approx via somme
      let totalDens = 0
      for (const [key, v] of densityEntries) {
        if (key.endsWith(`|${c.id}`)) totalDens += v
      }
      if (totalDens < 100) continue

      const kwMatch = findKw(kw, [
        `comparateur ${g.slug} ${c.slug}`,
        `meilleur ${g.slug} ${c.slug}`,
        `${g.slug} ${c.slug}`,
        `comparateur ${g.slug}`,
      ])
      if (!kwMatch) continue

      const y = calcYield(totalDens, kwMatch.volume, kwMatch.difficulty ?? 30, kwMatch.cpc ?? 100)
      if (y < 15) continue

      out.push({
        page_slug: `comparateur/${g.slug}/${c.slug}`,
        page_template: 'comparateur_garantie_ville',
        metier_code: null,
        garantie_code: g.code,
        statut_juridique: null,
        ville_slug: c.slug,
        city_id: c.id,
        density_insee: totalDens,
        kw_target: kwMatch.keyword,
        kw_volume: kwMatch.volume,
        kw_kd: kwMatch.difficulty,
        kw_cpc: kwMatch.cpc,
        yield_score: y,
        generation_status: 'pending',
      })
    }
  }
  return out
}

function generateGuideRows(
  metiers: Metier[],
  garanties: Garantie[],
  density: Map<string, number>,
  kw: KwRow[]
): CacheRow[] {
  const out: CacheRow[] = []
  const densityEntries = Array.from(density.entries())
  for (const g of garanties) {
    for (const m of metiers) {
      // Density nationale approximée (top 100 cities sum)
      let nationalDens = 0
      for (const [key, v] of densityEntries) {
        if (key.startsWith(`${m.code}|`)) nationalDens += v
      }
      if (nationalDens < 200) continue

      const kwMatch = findKw(kw, [
        `guide ${g.slug} ${m.name}`,
        `comment ${g.slug} ${m.name}`,
        `${g.slug} obligation ${m.name}`,
        `${g.slug} ${m.name}`,
      ])
      if (!kwMatch) continue

      const y = calcYield(nationalDens, kwMatch.volume, kwMatch.difficulty ?? 30, kwMatch.cpc ?? 50)
      if (y < 15) continue

      out.push({
        page_slug: `guide/${g.slug}/${m.code}`,
        page_template: 'guide_metier_ville',
        metier_code: m.code,
        garantie_code: g.code,
        statut_juridique: null,
        ville_slug: null,
        city_id: null,
        density_insee: nationalDens,
        kw_target: kwMatch.keyword,
        kw_volume: kwMatch.volume,
        kw_kd: kwMatch.difficulty,
        kw_cpc: kwMatch.cpc,
        yield_score: y,
        generation_status: 'pending',
      })
    }
  }
  return out
}

function generateTarifRows(
  metiers: Metier[],
  garanties: Garantie[],
  density: Map<string, number>,
  kw: KwRow[]
): CacheRow[] {
  const out: CacheRow[] = []
  const densityEntries = Array.from(density.entries())
  for (const g of garanties) {
    for (const m of metiers) {
      let nationalDens = 0
      for (const [key, v] of densityEntries) {
        if (key.startsWith(`${m.code}|`)) nationalDens += v
      }
      if (nationalDens < 100) continue

      const kwMatch = findKw(kw, [
        `tarif ${g.slug} ${m.name}`,
        `prix ${g.slug} ${m.name}`,
        `coût ${g.slug} ${m.name}`,
        `${g.slug} ${m.name} tarif`,
      ])
      if (!kwMatch) continue

      const y = calcYield(
        nationalDens,
        kwMatch.volume,
        kwMatch.difficulty ?? 30,
        kwMatch.cpc ?? 100
      )
      if (y < 15) continue

      out.push({
        page_slug: `tarif/${g.slug}/${m.code}`,
        page_template: 'tarif',
        metier_code: m.code,
        garantie_code: g.code,
        statut_juridique: null,
        ville_slug: null,
        city_id: null,
        density_insee: nationalDens,
        kw_target: kwMatch.keyword,
        kw_volume: kwMatch.volume,
        kw_kd: kwMatch.difficulty,
        kw_cpc: kwMatch.cpc,
        yield_score: y,
        generation_status: 'pending',
      })
    }
  }
  return out
}

// ────────────────────────────────────────────────────────────────────────────
// Insertion par batch
// ────────────────────────────────────────────────────────────────────────────

async function upsertBatch(rows: CacheRow[]): Promise<number> {
  const BATCH_SIZE = 500
  let inserted = 0
  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const batch = rows.slice(i, i + BATCH_SIZE)
    const { error } = await sb
      .from('page_enrichment_cache')
      .upsert(batch, { onConflict: 'page_slug' })
    if (error) {
      console.error(`❌ Batch ${i}-${i + BATCH_SIZE} error:`, error.message)
      continue
    }
    inserted += batch.length
    console.log(`  ✓ ${inserted}/${rows.length} rows upserted`)
  }
  return inserted
}

// ────────────────────────────────────────────────────────────────────────────
// Main
// ────────────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🔍 Loading source data...')
  const [metiers, cities, garanties, statuts, kw, density] = await Promise.all([
    loadMetiers(),
    loadCities(100),
    loadGaranties(),
    loadStatuts(),
    loadKwUniverse(),
    loadSireneDensity(),
  ])

  console.log(`  ✓ ${metiers.length} métiers`)
  console.log(`  ✓ ${cities.length} villes (top pop)`)
  console.log(`  ✓ ${garanties.length} garanties`)
  console.log(`  ✓ ${statuts.length} statuts juridiques`)
  console.log(`  ✓ ${kw.length} KW universe`)
  console.log(`  ✓ ${density.size} cross-points sirene density`)

  console.log('\n⚙️  Generating rows (filtered yield_score >= 15)...')

  const prixRows = generatePrixRows(metiers, cities, garanties, statuts, density, kw)
  console.log(`  ✓ ${prixRows.length} prix rows`)

  const comparateurRows = generateComparateurRows(cities, garanties, density, kw)
  console.log(`  ✓ ${comparateurRows.length} comparateur rows`)

  const guideRows = generateGuideRows(metiers, garanties, density, kw)
  console.log(`  ✓ ${guideRows.length} guide rows`)

  const tarifRows = generateTarifRows(metiers, garanties, density, kw)
  console.log(`  ✓ ${tarifRows.length} tarif rows`)

  const allRows: CacheRow[] = [...prixRows, ...comparateurRows, ...guideRows, ...tarifRows]

  console.log(`\n📦 Total to upsert: ${allRows.length} rows`)

  // Top 10 par yield pour preview
  const top10 = [...allRows].sort((a, b) => b.yield_score - a.yield_score).slice(0, 10)
  console.log('\n🏆 Top 10 yield_score:')
  for (const r of top10) {
    console.log(
      `  ${r.yield_score.toFixed(1).padStart(6)} | ${r.page_slug.padEnd(60)} | kw=${r.kw_target}`
    )
  }

  console.log('\n💾 Upserting to page_enrichment_cache...')
  const inserted = await upsertBatch(allRows)

  console.log(`\n✅ Done. ${inserted}/${allRows.length} rows in page_enrichment_cache.`)
  console.log(
    `\n📊 Next step: review yield distribution + manually promote 'pending' → 'generated'`
  )
}

main().catch((err) => {
  console.error('❌ FATAL:', err)
  process.exit(1)
})
