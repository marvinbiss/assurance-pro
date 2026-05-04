/**
 * Génération automatique 24 pages PilierLayout depuis 50-targets.json
 * Pattern : factorisation maximale + contenu data-driven Ahrefs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { dirname } from 'path'

interface Target {
  slug: string
  title: string
  tier: number
  nb_kw: number
  vol_total: number
  roi_cumul: number
  top_kw: string[]
}

const targets: Target[] = JSON.parse(readFileSync('src/data/50-targets.json', 'utf-8'))
console.log(`Génération de ${targets.length} pages...\n`)

/* Templates compacts et factuels — éviter le "fluff" LLM */
function generatePage(t: Target): string {
  const slug = t.slug
  const isRcPro = slug.startsWith('rc-pro/')
  const isDecennale = slug.includes('decennale')
  const isGuide = slug.startsWith('guides/')

  const tagline = isRcPro
    ? `Tout sur la RC Pro pour ce profil : obligation, garanties spécifiques, tarifs 2026, sinistralité, choix assureur. Devis ORIAS sous 24h.`
    : isDecennale
    ? `Tout sur la décennale pour ce profil : obligation Loi Spinetta, sinistralité AQC, tarifs 2026 négociés, attestation 24h. Devis ORIAS.`
    : `Guide complet 2026 : références juridiques, exemples concrets, tarifs négociés, recommandations cabinet ORIAS. Devis sous 24h.`

  const intro = `Cette page est dédiée à ${t.title.toLowerCase()}. Notre cabinet ORIAS analyse pour vous les obligations légales, les tarifs 2026 négociés auprès de nos 8 assureurs partenaires, les sinistres types couverts, et les leviers d'optimisation tarifaire spécifiques à ce profil. Estimation indicative basée sur ${t.nb_kw} KW Ahrefs analysés (volume cumulé ${t.vol_total.toLocaleString('fr-FR')} recherches/mois). Devis officiel personnalisé sous 24h ouvrées.`

  const ctaCalc = isRcPro
    ? '/outils/calculateur-tarif-rc-pro'
    : isDecennale
    ? '/outils/calculateur-tarif-decennale'
    : '/outils/devis-rc-pro'

  const ctaDevis = isRcPro
    ? '/outils/devis-rc-pro'
    : isDecennale
    ? '/outils/devis-assurance-decennale'
    : '/outils/devis-rc-pro'

  const benefitTier = t.tier === 3
    ? "Couverture haute valeur — KW à fort volume marché capturés"
    : t.tier === 4
    ? "Niche commerciale prouvée Ahrefs — intent qualifié"
    : "Long-tail spécialisée — capture audiences qualifiées niches"

  const topKwsList = t.top_kw.map((kw) => `<li>${kw}</li>`).join('\n              ')

  return `/**
 * Pilier — ${t.title}
 *
 * KW Ahrefs validés via kw_universe Supabase (Tier ${t.tier}) :
${t.top_kw.map((k) => ' * - ' + k).join('\n')}
 * Volume cumul : ${t.vol_total} • ROI cumul : ${t.roi_cumul.toLocaleString('fr-FR')} score
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = '${slug}'
const TITLE = ${JSON.stringify(t.title)}
const TAGLINE = ${JSON.stringify(tagline)}
const INTRO = ${JSON.stringify(intro)}
const LEGAL_REF = ${isDecennale ? JSON.stringify('Loi Spinetta — art. L. 241-1 C. assur. + arrêté 23 janvier 2024 (mentions attestation)') : isRcPro ? JSON.stringify('Art. 1147 C. civ. (responsabilité contractuelle) + Recommandation ACPR 2024-R-02 (devoir conseil)') : JSON.stringify('Code des assurances + Recommandation ACPR 2024-R-02 (transparence intermédiaire)')}
const BENEFIT_TIER = ${JSON.stringify(benefitTier)}

export const metadata: Metadata = {
  title: \`\${TITLE} | Assurance Pro\`,
  description: ${JSON.stringify(intro.slice(0, 280))},
  alternates: { canonical: \`\${SITE_URL}/\${SLUG}\` },
  openGraph: { title: TITLE, description: TAGLINE, url: \`\${SITE_URL}/\${SLUG}\`, type: '${isGuide ? 'article' : 'website'}' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG} title={TITLE} tagline={TAGLINE}
      intro={INTRO}
      legalReference={LEGAL_REF}
      isObligatoire={${isDecennale}}
      benefits={[
        { icon: '⚖️', title: ${isDecennale ? "'OBLIGATION Loi Spinetta'" : isRcPro ? "'Cadre juridique précis'" : "'Guide juridique référencé'"}, desc: BENEFIT_TIER },
        { icon: '📊', title: 'Data Ahrefs validée', desc: ${JSON.stringify(`${t.nb_kw} KW analysés • ${t.vol_total.toLocaleString('fr-FR')} vol/m cumul`)} },
        { icon: '💰', title: 'Tarifs 2026 négociés', desc: 'Cabinet ORIAS — comparaison 8 assureurs spécialisés. Économie 10-25% vs souscription directe' },
        { icon: '📞', title: 'Devis officiel sous 24h', desc: 'Conseil personnalisé + 3-5 propositions adaptées à votre profil sous 24h ouvrées' },
      ]}
      sections={[
        {
          h2: 'Mots-clés Ahrefs ciblés par cette page',
          body: (
            <div>
              <p className="text-sm">Cette page cible ${t.nb_kw} mot${t.nb_kw > 1 ? 's' : ''}-clé${t.nb_kw > 1 ? 's' : ''} validé${t.nb_kw > 1 ? 's' : ''} dans notre base Ahrefs (volume mensuel cumulé : ${t.vol_total}). Les requêtes principales :</p>
              <ul className="mt-2 space-y-1 text-sm">
              ${topKwsList}
              </ul>
            </div>
          ),
        },
        {
          h2: 'Pour aller plus loin',
          body: (
            <ul>
              <li><a href="${ctaCalc}" className="text-blue-600 underline">Calculateur tarif interactif (estimation 30 secondes)</a></li>
              <li><a href="${ctaDevis}" className="text-blue-600 underline">Devis officiel ORIAS sous 24h</a></li>
              ${isRcPro ? '<li><a href="/rc-pro" className="text-blue-600 underline">Pilier RC Pro — toutes professions</a></li>' : ''}
              ${isDecennale ? '<li><a href="/assurance-decennale" className="text-blue-600 underline">Pilier décennale BTP — Loi Spinetta + 37 métiers</a></li>' : ''}
              <li><a href="/outils/comparateur-rc-pro" className="text-blue-600 underline">Comparateur 8 assureurs (tri intelligent)</a></li>
            </ul>
          ),
        },
      ]}
      faq={[
        { q: 'Quelle est l\\'obligation légale pour ce profil ?', a: ${isDecennale ? "\"OBLIGATOIRE Loi Spinetta (art. L. 241-1 C. assur.) pour tout artisan BTP. Sanctions absence : 75 000 € amende personne physique + 6 mois prison + interdiction d'exercer + responsabilité civile/pénale personnelle si sinistre.\"" : isRcPro ? "\"Variable selon profession : OBLIGATOIRE pour professions réglementées (avocats Loi 1971, médecins L. 1142-2 CSP, agents immobiliers Loi Hoguet, experts-comptables Ord. 1945, courtiers, CGP/CIF). Fortement recommandée pour autres profils (consultants, IT, marketing, formateurs, commerces).\"" : "\"Cadre juridique détaillé sur cette page. Notre cabinet ORIAS vous transmet sous 24h une analyse d'adéquation conforme Recommandation ACPR 2024-R-02 + 2025-R-01 (devoir conseil).\""} },
        { q: 'Tarifs 2026 indicatifs ?', a: ${JSON.stringify(`Variables selon profil : statut juridique, CA, antécédents, plafond garantie. Notre cabinet compare 8 assureurs partenaires pour optimiser tarif vs couverture. ${t.nb_kw} KW analysés Ahrefs montrent un volume marché de ${t.vol_total.toLocaleString('fr-FR')} recherches/mois sur ce sujet — preuve de demande commerciale réelle.`)} },
        { q: 'Délai pour obtenir mon devis ?', a: 'Devis officiel sous 24h ouvrées (procédure standard). Procédure Express 6h disponible (+80 € HT) pour besoins urgents. Attestation téléchargeable dans les 24h après signature électronique + paiement 1re cotisation.' },
        { q: 'Notre cabinet est-il transparent sur les commissions ?', a: 'OUI — Recommandation ACPR 2024-R-02 nous impose la transparence sur la commission intermédiaire (10-15% de la cotisation annuelle, INTÉGRÉE dans le tarif sans surfacturation). Le tarif courtier reste -10-25% inférieur au tarif assureur direct grâce aux volumes négociés.' },
      ]}
    />
  )
}
`
}

let created = 0
targets.forEach((t) => {
  const path = `src/app/(public)/${t.slug}/page.tsx`
  const dir = dirname(path)
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
  if (existsSync(path)) {
    console.log(`  SKIP ${t.slug} (existe déjà)`)
    return
  }
  writeFileSync(path, generatePage(t))
  created++
  console.log(`  ✓ ${t.slug}`)
})

console.log(`\n${created} pages créées (sur ${targets.length} cibles).`)
