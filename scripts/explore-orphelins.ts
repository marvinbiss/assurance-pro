import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const env = readFileSync('.env.local', 'utf-8').split('\n').reduce((a: Record<string, string>, l) => {
  const m = l.match(/^([A-Z_]+)=(.+)$/)
  if (m && m[1] && m[2]) a[m[1]] = m[2].replace(/^"|"$/g, '')
  return a
}, {})
const url = env.NEXT_PUBLIC_SUPABASE_URL!
const key = env.SUPABASE_SERVICE_ROLE_KEY!
const sb = createClient(url, key)

interface KW { keyword: string; volume: number; difficulty: number; cpc: number; source: string }

async function main() {
  const all: KW[] = []
  let from = 0
  while (true) {
    const { data, error } = await sb.from('kw_universe').select('keyword,volume,difficulty,cpc,source').range(from, from + 999)
    if (error) throw error
    if (!data || data.length === 0) break
    all.push(...(data as KW[]))
    if (data.length < 1000) break
    from += 1000
  }

  /* Filtre Couche B élargi */
  const filtered = all
    .filter((k) => (k.volume || 0) >= 30 && (k.volume || 0) <= 400 && (k.difficulty || 0) <= 8 && (k.cpc || 0) >= 100)
    .sort((a, b) => (b.volume * b.cpc) - (a.volume * a.cpc))

  console.log(`Total KW Couche B élargi (vol 30-400, KD ≤8, CPC ≥100€) : ${filtered.length}\n`)
  console.log('=== TOP 80 ===\n')
  console.log('Vol  | KD | CPC  | Source                                        | Keyword')
  console.log(''.padEnd(160, '-'))
  filtered.slice(0, 80).forEach((k) => {
    console.log(
      `${String(k.volume).padStart(4)} | ${String(k.difficulty).padStart(2)} | ${String(k.cpc).padStart(4)}€ | ${(k.source || '').padEnd(45)} | ${k.keyword}`,
    )
  })
}

main().catch(console.error)
