import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const env = readFileSync('.env.local', 'utf-8').split('\n').reduce((a: Record<string, string>, l) => {
  const m = l.match(/^([A-Z_]+)=(.+)$/)
  if (m && m[1] && m[2]) a[m[1]] = m[2].replace(/^"|"$/g, '')
  return a
}, {})

const url = env.NEXT_PUBLIC_SUPABASE_URL
const key = env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !key) throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
const sb = createClient(url, key)

interface KW {
  keyword: string
  volume: number
  difficulty: number
  cpc: number
  source: string
}

function scoreROI(kw: KW): number {
  const k = kw.keyword.toLowerCase()
  const kdInverse = Math.max(1, 100 - (kw.difficulty || 0)) / 100
  let score = (kw.volume || 0) * (kw.cpc || 0) * kdInverse

  const commercial = /\b(devis|tarif|prix|cout|coût|comparateur|courtier|calculateur|simulateur|comparer|moins cher|pas cher|en ligne|immediate|immédiate|rapide|24h|gratuit|meilleur)\b/i
  const transactional = /\b(souscrire|attestation|modele|modèle|generateur|générateur|telecharger|télécharger)\b/i
  const informational = /\b(qu['e ]est ?ce|definition|définition|c['e ]est quoi|comment fonctionne|pourquoi|histoire|wiki)\b/i

  if (commercial.test(k)) score *= 1.5
  if (transactional.test(k)) score *= 1.3
  if (informational.test(k)) score *= 0.2

  return Math.round(score)
}

async function main() {
  const all: KW[] = []
  let from = 0
  const pageSize = 1000
  while (true) {
    const { data, error } = await sb
      .from('kw_universe')
      .select('keyword,volume,difficulty,cpc,source')
      .range(from, from + pageSize - 1)
    if (error) throw error
    if (!data || data.length === 0) break
    all.push(...(data as KW[]))
    if (data.length < pageSize) break
    from += pageSize
  }

  console.log(`\nTotal KW chargés: ${all.length}`)

  const filtered = all
    .filter((k) => (k.volume || 0) >= 30 && (k.cpc || 0) >= 50)
    .map((k) => ({ ...k, roi: scoreROI(k) }))
    .sort((a, b) => b.roi - a.roi)

  console.log(`\nKW filtrés (vol >=30, CPC >=50): ${filtered.length}`)

  console.log('\n=== TOP 30 KW PAR SCORE ROI ===\n')
  console.log('Rang | Vol   | KD  | CPC   | ROI Score    | Source                             | Keyword')
  console.log(''.padEnd(160, '-'))
  filtered.slice(0, 30).forEach((k, i) => {
    console.log(
      `${String(i + 1).padStart(4)} | ${String(k.volume).padStart(5)} | ${String(k.difficulty).padStart(3)} | ${String(k.cpc).padStart(5)} | ${String(k.roi).padStart(12)} | ${(k.source || '').padEnd(34)} | ${k.keyword}`,
    )
  })

  const bySource = new Map<string, { count: number; volSum: number; cpcAvg: number; kdAvg: number; roiSum: number; topKW: string }>()
  filtered.forEach((k) => {
    const src = k.source || 'unknown'
    const e = bySource.get(src) || { count: 0, volSum: 0, cpcAvg: 0, kdAvg: 0, roiSum: 0, topKW: k.keyword }
    e.count += 1
    e.volSum += k.volume || 0
    e.cpcAvg = (e.cpcAvg * (e.count - 1) + (k.cpc || 0)) / e.count
    e.kdAvg = (e.kdAvg * (e.count - 1) + (k.difficulty || 0)) / e.count
    e.roiSum += k.roi
    bySource.set(src, e)
  })

  const families = Array.from(bySource.entries())
    .map(([src, e]) => ({ src, ...e }))
    .sort((a, b) => b.roiSum - a.roiSum)

  console.log('\n\n=== TOP 25 FAMILLES SEMANTIQUES PAR ROI CUMULE ===\n')
  console.log('Rang | #KW  | VolCum | CPCmoy | KDmoy | ROI Cum       | Source')
  console.log(''.padEnd(120, '-'))
  families.slice(0, 25).forEach((f, i) => {
    console.log(
      `${String(i + 1).padStart(4)} | ${String(f.count).padStart(4)} | ${String(f.volSum).padStart(6)} | ${String(Math.round(f.cpcAvg)).padStart(5)}  | ${String(Math.round(f.kdAvg)).padStart(4)}  | ${String(f.roiSum).padStart(13)} | ${f.src}`,
    )
  })

  const lowHanging = filtered
    .filter((k) => (k.difficulty || 0) <= 5 && (k.volume || 0) >= 100 && (k.cpc || 0) >= 200)
    .sort((a, b) => b.roi - a.roi)

  console.log('\n\n=== LOW-HANGING FRUITS (KD <=5, Vol >=100, CPC >=200) — TOP 30 ===\n')
  console.log('Rang | Vol  | KD | CPC   | ROI       | Source                       | Keyword')
  console.log(''.padEnd(150, '-'))
  lowHanging.slice(0, 30).forEach((k, i) => {
    console.log(
      `${String(i + 1).padStart(4)} | ${String(k.volume).padStart(4)} | ${String(k.difficulty).padStart(2)} | ${String(k.cpc).padStart(5)} | ${String(k.roi).padStart(9)} | ${(k.source || '').padEnd(28)} | ${k.keyword}`,
    )
  })
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
