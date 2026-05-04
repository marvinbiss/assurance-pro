/**
 * Extraction des KW long-tail Couche B (guides juridiques niches)
 *
 * Critères :
 * - Volume 30-300 (long-tail mais commercialement viable)
 * - KD ≤ 5 (ranking accessible <3 mois)
 * - CPC ≥ 150€ (intent commercial confirmé)
 * - Source ≠ KW déjà couverts par hubs/outils existants
 *
 * Output : src/data/couche-b-targets.json — clustering sémantique pour
 * génération guide par guide.
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync, writeFileSync } from 'fs'

const env = readFileSync('.env.local', 'utf-8').split('\n').reduce((a: Record<string, string>, l) => {
  const m = l.match(/^([A-Z_]+)=(.+)$/)
  if (m && m[1] && m[2]) a[m[1]] = m[2].replace(/^"|"$/g, '')
  return a
}, {})

const url = env.NEXT_PUBLIC_SUPABASE_URL
const key = env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !key) throw new Error('Missing Supabase env')
const sb = createClient(url, key)

interface KW {
  keyword: string
  volume: number
  difficulty: number
  cpc: number
  source: string
}

interface Cluster {
  slug: string
  title: string
  cluster_theme: string
  kws: KW[]
  vol_total: number
  cpc_avg: number
  source_family: string
}

/* Mots-clés-graines pour clusterisation : si un KW contient un de ces tokens,
   il est attribué au cluster correspondant. */
const CLUSTER_RULES: Array<{ slug: string; title: string; theme: string; tokens: RegExp }> = [
  /* Famille MENTIONS LÉGALES OBLIGATOIRES */
  { slug: 'guides/mention-decennale-facture', title: 'Mention décennale obligatoire sur factures', theme: 'mentions légales factures', tokens: /mention.*(décennale|decennale).*(facture|devis)|décennale.*facture/i },
  { slug: 'guides/mention-rc-pro-facture', title: 'Mention RC Pro sur factures et devis', theme: 'mentions légales factures', tokens: /mention.*(rc pro|responsabilité civile).*(facture|devis)/i },
  { slug: 'guides/mentions-obligatoires-attestation-assurance', title: 'Mentions obligatoires attestation assurance pro', theme: 'mentions légales attestation', tokens: /mention.*obligatoire.*attestation/i },

  /* Famille DÉCLARATION SINISTRE */
  { slug: 'guides/declaration-sinistre-rc-pro', title: 'Déclaration sinistre RC Pro — délais et procédure', theme: 'déclaration sinistre', tokens: /(déclaration|declarer).*sinistre.*(rc pro|responsabilité)/i },
  { slug: 'guides/declaration-sinistre-decennale', title: 'Déclaration sinistre décennale — procédure 5 ans', theme: 'déclaration sinistre', tokens: /(déclaration|declarer).*sinistre.*(décennale|decennale)/i },
  { slug: 'guides/delai-declaration-sinistre-assurance-pro', title: 'Délai déclaration sinistre assurance pro (5j ouvrés)', theme: 'déclaration sinistre', tokens: /délai.*déclaration.*sinistre/i },

  /* Famille RÉSILIATION */
  { slug: 'guides/resiliation-rc-pro-loi-hamon', title: 'Résiliation RC Pro Loi Hamon — procédure', theme: 'résiliation', tokens: /résiliation.*(rc pro|responsabilité)|(rc pro|responsabilité).*résili/i },
  { slug: 'guides/resiliation-decennale-loi-hamon', title: 'Résiliation décennale — Loi Hamon + procédure', theme: 'résiliation', tokens: /résiliation.*(décennale|decennale)|(décennale|decennale).*résili/i },
  { slug: 'guides/resiliation-mutuelle-pro-loi-hamon', title: 'Résiliation mutuelle pro Loi Hamon', theme: 'résiliation', tokens: /résiliation.*mutuelle.*(pro|entreprise|tns)/i },

  /* Famille FRANCHISE / PLAFOND */
  { slug: 'guides/franchise-assurance-pro', title: 'Franchise assurance pro — comment ça marche ?', theme: 'franchise', tokens: /franchise.*(assurance|rc pro|décennale)/i },
  { slug: 'guides/plafond-garantie-rc-pro', title: 'Plafond garantie RC Pro — bien le choisir', theme: 'plafonds', tokens: /plafond.*(rc pro|responsabilité|garantie)/i },

  /* Famille ATTESTATION — fournir au client */
  { slug: 'guides/attestation-rc-pro-fournir-client', title: 'Attestation RC Pro à fournir au client (B2B)', theme: 'attestation B2B', tokens: /attestation.*rc pro.*(client|fournir|donner)/i },
  { slug: 'guides/attestation-decennale-fournir-client', title: 'Attestation décennale à fournir au client BTP', theme: 'attestation BTP', tokens: /attestation.*(décennale|decennale).*(client|fournir|donner)|attestation.*decennale.*pour/i },

  /* Famille DÉLAIS LÉGAUX */
  { slug: 'guides/delai-paiement-facture-pro', title: 'Délai paiement facture B2B (LME 60 jours)', theme: 'délais paiement', tokens: /délai.*paiement.*facture|loi.*lme/i },
  { slug: 'guides/delai-prescription-decennale', title: 'Délai prescription décennale (10 ans Loi Spinetta)', theme: 'prescription', tokens: /(prescription|délai.*10.*ans).*(décennale|decennale|spinetta)/i },

  /* Famille RGPD / CYBER */
  { slug: 'guides/cyber-assurance-obligation-rgpd', title: 'Cyber assurance obligatoire RGPD — entreprise', theme: 'RGPD', tokens: /cyber.*(obligatoire|rgpd|breach)|rgpd.*(entreprise|obligation)/i },
  { slug: 'guides/notification-breach-cnil-72h', title: 'Notification breach CNIL 72h — procédure RGPD', theme: 'RGPD', tokens: /(notification|breach).*(cnil|72)/i },

  /* Famille MULTIRISQUE / GARANTIES */
  { slug: 'guides/multirisque-pro-garanties', title: 'Multirisque pro — toutes les garanties expliquées', theme: 'garanties multirisque', tokens: /multirisque.*(garanties|expliquées|comprendre)/i },
  { slug: 'guides/garantie-perte-exploitation', title: 'Garantie perte d\'exploitation — calcul indemnité', theme: 'perte exploitation', tokens: /perte.*exploitation/i },

  /* Famille PROFESSIONS RÉGLEMENTÉES */
  { slug: 'guides/rc-pro-obligation-professions-reglementees', title: 'RC Pro obligatoire — liste 18 professions réglementées', theme: 'professions réglementées', tokens: /rc pro.*obligatoire.*(profession|activité)|profession.*réglement.*assurance/i },

  /* Famille TARIFS + PRIX (long tail métier) */
  { slug: 'guides/prix-rc-pro-auto-entrepreneur', title: 'Prix RC Pro auto-entrepreneur 2026 par activité', theme: 'prix par profil', tokens: /prix.*rc pro.*(auto.entrepreneur|micro)|combien.*coûte.*rc pro/i },
  { slug: 'guides/tarif-decennale-par-metier', title: 'Tarif décennale par métier BTP (37 métiers)', theme: 'tarifs métier', tokens: /(tarif|prix).*(décennale|decennale).*(métier|maçon|plombier|électricien|peintre|carreleur|couvreur)/i },

  /* Famille FISCALITÉ */
  { slug: 'guides/deduction-fiscale-cotisations-assurance-pro', title: 'Déduction fiscale cotisations assurance pro (CGI 39-1)', theme: 'fiscalité', tokens: /(déduction|déductible).*(fiscal|impot|impôt).*assurance/i },
  { slug: 'guides/loi-madelin-prevoyance-tns', title: 'Loi Madelin prévoyance TNS — déduction CGI 154 bis', theme: 'fiscalité', tokens: /loi.*madelin|madelin.*(prévoyance|tns|déduction)/i },

  /* Famille COMPARAISON ASSUREURS */
  { slug: 'guides/comparer-assurance-pro-criteres', title: 'Comparer assurance pro — 7 critères qui comptent', theme: 'comparaison méthode', tokens: /comparer.*assurance.*(pro|professionnelle).*(critère|comment|guide)/i },

  /* Famille SOUS-TRAITANCE / CHANTIER */
  { slug: 'guides/sous-traitance-decennale-btp', title: 'Sous-traitance décennale BTP — qui est responsable ?', theme: 'sous-traitance', tokens: /sous.traitance.*(décennale|decennale|btp|chantier)/i },

  /* Famille ASSURANCE LOCAL (commercial / bureau) */
  { slug: 'guides/assurance-local-professionnel-bail-commercial', title: 'Assurance local pro — obligations bail commercial', theme: 'local pro', tokens: /assurance.*local.*(commercial|professionnel|bail|entreprise)/i },
]

async function main() {
  /* 1. Charge tous les KW */
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
  console.log(`Total KW chargés : ${all.length}`)

  /* 2. Filtre Couche B */
  const filtered = all.filter((k) =>
    (k.volume || 0) >= 30 && (k.volume || 0) <= 300 && (k.difficulty || 0) <= 5 && (k.cpc || 0) >= 150,
  )
  console.log(`KW filtrés Couche B (vol 30-300, KD ≤5, CPC ≥150€) : ${filtered.length}`)

  /* 3. Clusterise selon les rules */
  const clusters: Cluster[] = CLUSTER_RULES.map((rule) => ({
    slug: rule.slug,
    title: rule.title,
    cluster_theme: rule.theme,
    kws: [],
    vol_total: 0,
    cpc_avg: 0,
    source_family: '',
  }))

  const orphelins: KW[] = []
  filtered.forEach((kw) => {
    let matched = false
    for (let i = 0; i < CLUSTER_RULES.length; i++) {
      const rule = CLUSTER_RULES[i]
      if (!rule) continue
      if (rule.tokens.test(kw.keyword)) {
        const cluster = clusters[i]
        if (cluster) {
          cluster.kws.push(kw)
          cluster.vol_total += kw.volume || 0
          if (!cluster.source_family) cluster.source_family = kw.source
        }
        matched = true
        break
      }
    }
    if (!matched) orphelins.push(kw)
  })

  /* 4. Calcule moyennes + tri */
  clusters.forEach((c) => {
    if (c.kws.length > 0) {
      c.cpc_avg = Math.round(c.kws.reduce((s, k) => s + (k.cpc || 0), 0) / c.kws.length)
    }
  })

  const sortedClusters = clusters.sort((a, b) => (b.vol_total * b.cpc_avg) - (a.vol_total * a.cpc_avg))

  console.log('\n=== CLUSTERS COUCHE B (triés par ROI = vol × CPC) ===\n')
  console.log('Rang | #KW | Vol | CPC moy | ROI score | Slug')
  console.log(''.padEnd(120, '-'))
  sortedClusters.forEach((c, i) => {
    const score = c.vol_total * c.cpc_avg
    console.log(`${String(i + 1).padStart(4)} | ${String(c.kws.length).padStart(3)} | ${String(c.vol_total).padStart(4)} | ${String(c.cpc_avg).padStart(5)}€ | ${String(score).padStart(8)} | ${c.slug}`)
  })

  console.log(`\n→ ${sortedClusters.filter((c) => c.kws.length > 0).length} clusters non-vides sur ${CLUSTER_RULES.length} règles`)
  console.log(`→ ${orphelins.length} KW orphelins (à traiter en cluster libre ou ignorer)`)

  /* 5. Sauvegarde JSON */
  const output = {
    generated_at: new Date().toISOString(),
    total_kw_couche_b: filtered.length,
    clusters: sortedClusters.filter((c) => c.kws.length > 0),
    orphelins_top_20: orphelins.sort((a, b) => (b.volume * b.cpc) - (a.volume * a.cpc)).slice(0, 20),
  }
  writeFileSync('src/data/couche-b-targets.json', JSON.stringify(output, null, 2))
  console.log('\n✓ Saved to src/data/couche-b-targets.json')
}

main().catch((e) => { console.error(e); process.exit(1) })
