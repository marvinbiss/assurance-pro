/**
 * Audit couverture 100% Ahrefs — Combien de pages de valeur restantes ?
 *
 * Méthode :
 * 1. Charge tous les KW kw_universe (7 578 KW)
 * 2. Cross-référence avec sitemap.ts (slugs déjà couverts)
 * 3. Clusterise les KW non couverts par théme + ROI
 * 4. Stratifie par tiers ROI : Tier 1 (>200k score) / Tier 2 (50-200k) / Tier 3 (<50k)
 * 5. Output : combien de pages "valeur" reste-t-il à construire
 */

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

function scoreROI(kw: KW): number {
  const kdInverse = Math.max(1, 100 - (kw.difficulty || 0)) / 100
  return Math.round((kw.volume || 0) * (kw.cpc || 0) * kdInverse)
}

/* Tokens des slugs déjà couverts (sitemap.ts) — pour exclure KW déjà capturés */
const SLUGS_COUVERTS_TOKENS = [
  /* Calculateurs */
  'calculateur tarif decennale', 'calculateur tarif rc pro', 'calculateur mutuelle pro',
  'calculateur cyber', 'calculateur vtc', 'calculateur prevoyance', 'calculateur multirisque',
  /* Devis & forms */
  'devis rc pro', 'devis assurance decennale', 'comparateur mutuelle', 'comparateur rc pro',
  /* PDF gens */
  'modele attestation decennale', 'modele attestation rc pro', 'modele facture',
  'modele devis', 'lettre resiliation',
  /* Piliers métiers décennale */
  'decennale plombier', 'decennale electricien', 'decennale macon', 'decennale couvreur',
  'decennale maitre oeuvre', 'decennale carreleur', 'decennale peintre', 'decennale charpentier',
  'decennale photovoltaique', 'decennale auto-entrepreneur', 'decennale micro-entreprise',
  /* Piliers métiers RC Pro */
  'rc pro immobilier', 'rc pro consultant', 'rc pro transport-marchandises', 'rc pro expert-comptable',
  'rc pro sante-paramedical', 'rc pro vtc', 'rc pro coiffeur', 'rc pro esthetique',
  'rc pro photographe', 'rc pro coach-sportif', 'rc pro formateur', 'rc pro sasu',
  'rc pro auto-entrepreneur', 'rc pro micro-entreprise', 'rc pro informatique',
  /* Hubs */
  'assurance vtc', 'mutuelle pro btp', 'mutuelle tns', 'mutuelle santé tns',
  'assurance local commercial', 'assurance restaurant', 'assurance bureau', 'assurance commerce',
  'assurance micro entreprise', 'assurance entreprise individuelle', 'assurance e-commerce',
  'assurance medecin', 'rc pro medecin', 'rc pro avocat', 'assurance avocat',
  'cyber assurance', 'multirisque pro', 'assurance entreprise', 'rc pro',
  'assurance professionnelle', 'responsabilite civile professionnelle',
  'assurance auto professionnelle', 'assurance flotte automobile',
  /* Guides juridiques */
  'attestation rc pro', 'attestation decennale', 'attestation responsabilite civile',
  'meilleure mutuelle tns', 'decennale immediate', 'rgpd entreprise',
  'courtier assurance decennale', 'courtier assurance pro', 'franchise assurance',
  'resiliation assurance', 'assurance obligatoire entreprise', 'avocat specialise assurance',
  'numero assurance maladie medecin', 'carte professionnelle assurance',
]

function isCovered(keyword: string): boolean {
  const k = keyword.toLowerCase()
  return SLUGS_COUVERTS_TOKENS.some((token) => {
    const tokens = token.toLowerCase().split(' ')
    return tokens.every((t) => k.includes(t))
  })
}

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
  console.log(`Total KW Ahrefs : ${all.length}\n`)

  /* Filtre KW à valeur SEO réelle : vol ≥30 + CPC ≥50€ */
  const filtered = all.filter((k) => (k.volume || 0) >= 30 && (k.cpc || 0) >= 50)
  console.log(`KW à valeur SEO (vol ≥30, CPC ≥50€) : ${filtered.length}`)

  /* Sépare couverts vs non couverts */
  const couverts = filtered.filter((k) => isCovered(k.keyword))
  const nonCouverts = filtered.filter((k) => !isCovered(k.keyword))

  console.log(`✅ Déjà couverts (best-effort match) : ${couverts.length} KW (${Math.round(couverts.length / filtered.length * 100)}%)`)
  console.log(`❌ Non couverts : ${nonCouverts.length} KW (${Math.round(nonCouverts.length / filtered.length * 100)}%)\n`)

  /* Stratification par ROI Tier */
  const withROI = nonCouverts.map((k) => ({ ...k, roi: scoreROI(k) }))

  const tiers = {
    'Tier 1 (>500k score)': withROI.filter((k) => k.roi > 500000),
    'Tier 2 (200-500k score)': withROI.filter((k) => k.roi >= 200000 && k.roi <= 500000),
    'Tier 3 (50-200k score)': withROI.filter((k) => k.roi >= 50000 && k.roi < 200000),
    'Tier 4 (10-50k score)': withROI.filter((k) => k.roi >= 10000 && k.roi < 50000),
    'Tier 5 (<10k score)': withROI.filter((k) => k.roi < 10000),
  }

  console.log('=== STRATIFICATION KW NON COUVERTS PAR TIER ROI ===\n')
  Object.entries(tiers).forEach(([tier, kws]) => {
    const sumROI = kws.reduce((s, k) => s + k.roi, 0)
    const sumVol = kws.reduce((s, k) => s + (k.volume || 0), 0)
    console.log(`${tier} : ${kws.length.toString().padStart(4)} KW | Vol cumul ${sumVol.toString().padStart(6)} | ROI cumul ${sumROI.toLocaleString('fr-FR').padStart(15)}`)
  })

  /* Échantillon par tier — top 5 */
  console.log('\n=== ÉCHANTILLON KW NON COUVERTS — TOP 5 PAR TIER ===\n')
  Object.entries(tiers).forEach(([tier, kws]) => {
    if (kws.length === 0) return
    console.log(`\n--- ${tier} ---`)
    const sorted = [...kws].sort((a, b) => b.roi - a.roi).slice(0, 5)
    sorted.forEach((k) => {
      console.log(`  ${k.volume.toString().padStart(4)} vol | KD ${(k.difficulty ?? 0).toString().padStart(2)} | CPC ${k.cpc.toString().padStart(4)}€ | ROI ${k.roi.toLocaleString('fr-FR').padStart(8)} | ${k.keyword}`)
    })
  })

  /* Estimation pages "valeur" = pages où 1 page peut capturer plusieurs KW d'un cluster */
  /* Hypothèse réaliste : 1 page bien optimisée capture 3-8 KW d'un cluster sémantique */
  console.log('\n\n=== ESTIMATION PAGES "VALEUR" À CONSTRUIRE ===\n')
  const cluster = (kws: typeof withROI, ratio: number) => Math.ceil(kws.length / ratio)

  console.log(`Tier 1 (>500k) : ${tiers['Tier 1 (>500k score)'].length} KW → ~${cluster(tiers['Tier 1 (>500k score)'], 5)} pages premium (1 page = 5 KW)`)
  console.log(`Tier 2 (200-500k) : ${tiers['Tier 2 (200-500k score)'].length} KW → ~${cluster(tiers['Tier 2 (200-500k score)'], 5)} pages haute valeur (1 page = 5 KW)`)
  console.log(`Tier 3 (50-200k) : ${tiers['Tier 3 (50-200k score)'].length} KW → ~${cluster(tiers['Tier 3 (50-200k score)'], 6)} pages valeur moyenne (1 page = 6 KW)`)
  console.log(`Tier 4 (10-50k) : ${tiers['Tier 4 (10-50k score)'].length} KW → ~${cluster(tiers['Tier 4 (10-50k score)'], 8)} pages long-tail (1 page = 8 KW)`)
  console.log(`Tier 5 (<10k) : ${tiers['Tier 5 (<10k score)'].length} KW → exclusion recommandée (ROI marginal)`)

  const totalPagesValeur = cluster(tiers['Tier 1 (>500k score)'], 5)
    + cluster(tiers['Tier 2 (200-500k score)'], 5)
    + cluster(tiers['Tier 3 (50-200k score)'], 6)
    + cluster(tiers['Tier 4 (10-50k score)'], 8)

  console.log(`\n→ TOTAL PAGES "VALEUR" RESTANTES À CONSTRUIRE : ~${totalPagesValeur}`)
  console.log(`   (vs 138 pages éditoriales actuelles + 17 outils = 155 déjà construites)`)
  console.log(`   (vs cible théorique KPMG 8 400 = ${Math.round(totalPagesValeur / 8400 * 100)}% du gap)`)

  const sumROITiers12 = tiers['Tier 1 (>500k score)'].reduce((s, k) => s + k.roi, 0) + tiers['Tier 2 (200-500k score)'].reduce((s, k) => s + k.roi, 0)
  const sumROITier3 = tiers['Tier 3 (50-200k score)'].reduce((s, k) => s + k.roi, 0)
  const sumROITier4 = tiers['Tier 4 (10-50k score)'].reduce((s, k) => s + k.roi, 0)

  console.log(`\n=== PRIORISATION PROPOSÉE ===`)
  console.log(`Tier 1+2 (haute valeur) : ${cluster(tiers['Tier 1 (>500k score)'], 5) + cluster(tiers['Tier 2 (200-500k score)'], 5)} pages → ROI cumul ~${(sumROITiers12 / 1000000).toFixed(1)}M`)
  console.log(`Tier 3 (valeur moyenne) : ${cluster(tiers['Tier 3 (50-200k score)'], 6)} pages → ROI cumul ~${(sumROITier3 / 1000000).toFixed(1)}M`)
  console.log(`Tier 4 (long-tail) : ${cluster(tiers['Tier 4 (10-50k score)'], 8)} pages → ROI cumul ~${(sumROITier4 / 1000000).toFixed(1)}M`)
  console.log(`Tier 5 (<10k) : SKIP (rendements négatifs vs effort + risque qualité)`)
}

main().catch(console.error)
