/**
 * Extraction 50 pages cibles précises pour exploiter 100% Ahrefs
 * Output : src/data/50-targets.json — clusterisation sémantique stricte
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync, writeFileSync } from 'fs'
import { execSync } from 'child_process'

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

/* Liste des slugs réellement existants (depuis filesystem) */
function getExistingSlugs(): Set<string> {
  const out = execSync('find "src/app/(public)" -name "page.tsx" -type f', { encoding: 'utf-8' })
  const slugs = new Set<string>()
  out.split('\n').filter(Boolean).forEach((path) => {
    const slug = path.replace('src/app/(public)/', '').replace('/page.tsx', '').replace(/^\//, '')
    if (slug && !slug.includes('[') && slug !== '') slugs.add(slug)
  })
  return slugs
}


/* Cluster rules — 50 cibles ciblées sur les KW Ahrefs non couverts */
const CLUSTER_RULES: Array<{ slug: string; title: string; tokens: RegExp; tier: number }> = [
  /* TIER 3 — Haute valeur (50-200k score) */
  { slug: 'rc-pro/auto-entrepreneur', title: 'RC Pro auto-entrepreneur 2026', tokens: /\b(rc pro|responsabilité civile professionnelle).*(auto.entrepreneur|micro.entrepreneur)\b/i, tier: 3 },
  { slug: 'guides/garantie-decennale-comprendre', title: 'Garantie décennale — guide complet', tokens: /\bgarantie.{0,3}d[eé]cennale\b/i, tier: 3 },
  { slug: 'assurance-decennale-pas-cher', title: 'Assurance décennale pas cher 2026', tokens: /\b(d[eé]cennale).*(pas cher|moins cher|cheap)\b/i, tier: 3 },
  { slug: 'guides/decennale-assurance-comparer', title: 'Décennale assurance — méthode comparaison', tokens: /^d[eé]cennale\s+assurance$/i, tier: 3 },
  { slug: 'rc-pro/responsabilite-civile-auto-entrepreneur', title: 'Responsabilité civile professionnelle auto-entrepreneur', tokens: /^responsabilit[eé] civile professionnelle auto.entrepreneur$/i, tier: 3 },
  { slug: 'assurance-decennale-btp', title: 'Assurance décennale BTP — pilier 37 métiers', tokens: /\b(d[eé]cennale).*(btp)\b/i, tier: 3 },

  /* TIER 4 — Long-tail commercial (10-50k) */
  { slug: 'guides/meilleure-assurance-decennale', title: 'Meilleure assurance décennale 2026 — Top 8 assureurs', tokens: /\bmeilleure?\s+(assurance\s+)?d[eé]cennale\b/i, tier: 4 },
  { slug: 'rc-pro/artisan', title: 'RC Pro artisan 2026', tokens: /\b(rc pro|responsabilit[eé] civile professionnelle)\s+artisan\b/i, tier: 4 },
  { slug: 'guides/courtier-en-assurance-decennale', title: 'Courtier en assurance décennale — sélection', tokens: /\bcourtier\s+en\s+assurance\s+d[eé]cennale\b/i, tier: 4 },
  { slug: 'assurance-decennale-prix', title: 'Assurance décennale prix 2026 — guide complet', tokens: /\bd[eé]cennale\s+prix\b/i, tier: 4 },
  { slug: 'guides/assurance-decennale-pro-btp', title: 'Assurance décennale Pro BTP — mutualiste sectoriel', tokens: /\bd[eé]cennale\s+pro\s+btp\b/i, tier: 4 },
  { slug: 'rc-pro/agent-immobilier', title: 'RC Pro agent immobilier 2026 (Loi Hoguet)', tokens: /\brc\s+pro\s+agent\s+immobilier\b/i, tier: 4 },
  { slug: 'rc-pro/freelance-informatique', title: 'RC Pro freelance informatique 2026', tokens: /\brc\s+pro\s+freelance\s+informatique\b/i, tier: 4 },
  { slug: 'rc-pro/orus', title: 'RC Pro Orus — alternative & comparatif 2026', tokens: /\borus\s+rc\s+pro\b/i, tier: 4 },
  { slug: 'rc-pro/mma', title: 'RC Pro MMA Pro — analyse complète 2026', tokens: /\bmma\s+rc\s+pro\b/i, tier: 4 },
  { slug: 'guides/rc-pro-rapide-immediate', title: 'RC Pro rapide immédiate — souscription 24h', tokens: /\brc\s+pro\s+(rapide|imm[eé]diate)\b/i, tier: 4 },
  { slug: 'guides/dommages-ouvrage-prix-tarif', title: 'Dommages ouvrage prix tarif 2026 — comprendre', tokens: /\b(dommages?.{0,3}ouvrage|do).*(prix|tarif|cout|coût)\b/i, tier: 4 },
  { slug: 'guides/orias-courtier-assurance', title: 'ORIAS courtier assurance — vérification & rôle', tokens: /\borias\s+(courtier|assurance|inscription)\b/i, tier: 4 },
  { slug: 'guides/attestation-decennale-modele-pdf', title: 'Modèle attestation décennale PDF gratuit', tokens: /\bmod[eè]le\s+attestation.{0,3}d[eé]cennale\b/i, tier: 4 },
  { slug: 'guides/comment-obtenir-attestation-rc-pro', title: 'Comment obtenir une attestation RC Pro ?', tokens: /\bcomment\s+obtenir.+attestation\s+(rc\s+pro|responsabilit[eé])\b/i, tier: 4 },
  { slug: 'rc-pro/restauration', title: 'RC Pro restauration 2026 — restaurateurs/traiteurs', tokens: /\b(rc\s+pro|assurance\s+professionnelle)\s+restauration\b/i, tier: 4 },
  { slug: 'guides/multirisque-pro-en-ligne', title: 'Multirisque pro en ligne — souscription digitale', tokens: /\bmultirisque\s+pro(fessionnelle)?\s+en\s+ligne\b/i, tier: 4 },
  { slug: 'rc-pro/transport', title: 'RC Pro transport 2026 (marchandises + voyageurs)', tokens: /\b(rc\s+pro|assurance\s+professionnelle)\s+transport\b/i, tier: 4 },
  { slug: 'guides/assurance-flotte-vehicules-pro', title: 'Assurance flotte véhicules pro — gestion 5+ véhicules', tokens: /\bflotte.+(automobile|v[eé]hicules?)\s+pro/i, tier: 4 },
  { slug: 'rc-pro/photographe-graphiste', title: 'RC Pro photographe & graphiste 2026', tokens: /\b(photographe|graphiste).+rc\s+pro\b|rc\s+pro\s+(photographe|graphiste)\b/i, tier: 4 },
  { slug: 'guides/rc-pro-tarif-prix', title: 'RC Pro tarif prix 2026 — guide complet', tokens: /\bprix\s+(assurance\s+)?rc\s+pro\b|tarif\s+rc\s+pro\b/i, tier: 4 },
  { slug: 'guides/decennale-auto-entrepreneur-prix', title: 'Décennale auto-entrepreneur prix 2026', tokens: /\bd[eé]cennale.+auto.entrepreneur.+(prix|tarif|cout)\b/i, tier: 4 },
  { slug: 'guides/devis-multirisque-professionnelle', title: 'Devis multirisque professionnelle — comparateur', tokens: /\bdevis\s+(assurance\s+)?multirisque\s+professionnelle\b/i, tier: 4 },
  { slug: 'guides/assurance-pro-comparatif-2026', title: 'Assurance pro comparatif 2026 — méthode complète', tokens: /\bassurance\s+pro(fessionnelle)?\s+(comparatif|comparer)\b/i, tier: 4 },

  /* TIER 5 — Très long-tail mais prouvé ROI individuel >5k */
  { slug: 'guides/garantie-decennale-plomberie', title: 'Garantie décennale plomberie — sinistres types', tokens: /\bgarantie\s+d[eé]cennale\s+plomberie\b/i, tier: 5 },
  { slug: 'guides/protec-btp-assurance', title: 'Protec BTP assurance — analyse 2026', tokens: /\bprotec\s+btp\s+assurance\b/i, tier: 5 },
  { slug: 'guides/comment-obtenir-attestation-rc-civile-pro', title: 'Comment obtenir attestation responsabilité civile professionnelle ?', tokens: /\bcomment\s+obtenir.+attestation\s+de\s+responsabilit[eé]\s+civile/i, tier: 5 },
  { slug: 'guides/attestation-garantie-decennale', title: 'Attestation garantie décennale — modèle conforme', tokens: /\battestation\s+(de\s+)?garantie\s+d[eé]cennale\b/i, tier: 5 },
  { slug: 'guides/decennale-cout-installation-photovoltaique', title: 'Coût décennale installation photovoltaïque', tokens: /\bd[eé]cennale\s+(co[uû]t|installation)\s+photovolta[iï]que\b/i, tier: 5 },
  { slug: 'guides/assurance-pro-saas-startup', title: 'Assurance pro SaaS / startup tech 2026', tokens: /\bassurance\s+(pro|professionnelle).+(saas|startup|tech)\b/i, tier: 5 },
  { slug: 'rc-pro/architecte-interieur', title: 'RC Pro architecte d\'intérieur 2026', tokens: /\brc\s+pro\s+architecte\s+(d.?int[eé]rieur|interieur)\b/i, tier: 5 },
  { slug: 'rc-pro/decorateur', title: 'RC Pro décorateur d\'intérieur 2026', tokens: /\brc\s+pro\s+d[eé]corateur\b/i, tier: 5 },
  { slug: 'rc-pro/podologue', title: 'RC Pro pédicure-podologue 2026', tokens: /\brc\s+pro\s+(p[eé]dicure|podologue)\b/i, tier: 5 },
  { slug: 'rc-pro/sage-femme', title: 'RC Pro sage-femme libérale 2026', tokens: /\brc\s+pro\s+sage.femme\b/i, tier: 5 },
  { slug: 'rc-pro/orthophoniste', title: 'RC Pro orthophoniste libéral 2026', tokens: /\brc\s+pro\s+orthophoniste\b/i, tier: 5 },
  { slug: 'rc-pro/notaire', title: 'RC Pro notaire 2026', tokens: /\brc\s+pro\s+notaire\b/i, tier: 5 },
  { slug: 'rc-pro/menuisier', title: 'RC Pro menuisier 2026 (BTP second œuvre)', tokens: /\brc\s+pro\s+menuisier\b/i, tier: 5 },
  { slug: 'rc-pro/jardinier-paysagiste', title: 'RC Pro jardinier paysagiste 2026', tokens: /\brc\s+pro\s+(jardinier|paysagiste)\b/i, tier: 5 },
  { slug: 'guides/assurance-emprunteur-pro', title: 'Assurance emprunteur professionnel — crédit pro', tokens: /\bassurance\s+emprunteur\s+(pro|professionnel)\b/i, tier: 5 },
  { slug: 'guides/assurance-cyber-pme', title: 'Assurance cyber PME — guide pratique', tokens: /\bassurance\s+cyber\s+pme\b/i, tier: 5 },
  { slug: 'guides/franchise-decennale-bien-choisir', title: 'Franchise décennale — bien la choisir', tokens: /\bfranchise\s+d[eé]cennale\b/i, tier: 5 },
  { slug: 'guides/plafond-rc-pro-quel-niveau', title: 'Plafond RC Pro — quel niveau choisir ?', tokens: /\bplafond\s+rc\s+pro\b/i, tier: 5 },
  { slug: 'rc-pro/coach-de-vie', title: 'RC Pro coach de vie 2026', tokens: /\brc\s+pro\s+coach\s+(de\s+vie|professionnel)\b/i, tier: 5 },
  { slug: 'rc-pro/therapeute', title: 'RC Pro thérapeute / praticien bien-être 2026', tokens: /\brc\s+pro\s+(th[eé]rapeute|praticien)\b/i, tier: 5 },
  { slug: 'rc-pro/sophrologue', title: 'RC Pro sophrologue 2026', tokens: /\brc\s+pro\s+sophrologue\b/i, tier: 5 },
  { slug: 'guides/decennale-renovation-energetique', title: 'Décennale rénovation énergétique 2026 (MaPrimeRénov)', tokens: /\bd[eé]cennale\s+r[eé]novation\s+(energe?tique|thermique)\b/i, tier: 5 },
]

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

  const filtered = all.filter((k) => (k.volume || 0) >= 30 && (k.cpc || 0) >= 50)
  console.log(`KW Ahrefs filtre vol>=30 CPC>=50€ : ${filtered.length}\n`)

  const existingSlugs = getExistingSlugs()
  console.log(`Slugs existants page.tsx : ${existingSlugs.size}\n`)

  const matched = new Map<string, { rule: typeof CLUSTER_RULES[0]; kws: KW[]; volSum: number; roiSum: number }>()
  CLUSTER_RULES.forEach((rule) => {
    matched.set(rule.slug, { rule, kws: [], volSum: 0, roiSum: 0 })
  })

  filtered.forEach((kw) => {
    for (const rule of CLUSTER_RULES) {
      if (rule.tokens.test(kw.keyword)) {
        const e = matched.get(rule.slug)!
        e.kws.push(kw)
        e.volSum += kw.volume
        e.roiSum += scoreROI(kw)
        break
      }
    }
  })

  const finalTargets = Array.from(matched.values())
    .filter((e) => e.kws.length > 0)
    .filter((e) => !existingSlugs.has(e.rule.slug))
    .sort((a, b) => b.roiSum - a.roiSum)

  console.log(`Targets non vides + non existants : ${finalTargets.length}\n`)
  console.log('Rang | Tier | #KW | Vol | ROI cumul | Slug')
  console.log(''.padEnd(120, '-'))
  finalTargets.forEach((e, i) => {
    console.log(`${(i + 1).toString().padStart(4)} | T${e.rule.tier}   | ${e.kws.length.toString().padStart(3)} | ${e.volSum.toString().padStart(4)} | ${e.roiSum.toLocaleString('fr-FR').padStart(10)} | ${e.rule.slug}`)
  })

  const totalROI = finalTargets.reduce((s, e) => s + e.roiSum, 0)
  console.log(`\nTotal ROI : ${(totalROI / 1000000).toFixed(1)} M`)

  writeFileSync('src/data/50-targets.json', JSON.stringify(finalTargets.map((e) => ({
    slug: e.rule.slug,
    title: e.rule.title,
    tier: e.rule.tier,
    nb_kw: e.kws.length,
    vol_total: e.volSum,
    roi_cumul: e.roiSum,
    top_kw: e.kws.sort((a, b) => b.volume - a.volume).slice(0, 3).map((k) => `${k.volume} vol KD ${k.difficulty} : ${k.keyword}`),
  })), null, 2))
  console.log(`\nSauvegarde -> src/data/50-targets.json (${finalTargets.length} cibles)`)
}

main().catch((e) => { console.error(e); process.exit(1) })
