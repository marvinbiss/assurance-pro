/**
 * Pilier — Décennale auto-entrepreneur prix 2026
 *
 * KW Ahrefs validés via kw_universe Supabase (Tier 4) :
 * - 90 vol KD null : assurance décennale auto entrepreneur prix
 * Volume cumul : 90 • ROI cumul : 27 000 score
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'guides/decennale-auto-entrepreneur-prix'
const TITLE = "Décennale auto-entrepreneur prix 2026"
const TAGLINE = "Tout sur la décennale pour ce profil : obligation Loi Spinetta, sinistralité AQC, tarifs 2026 négociés, attestation 24h. Devis ORIAS."
const INTRO = "Cette page est dédiée à décennale auto-entrepreneur prix 2026. Notre cabinet ORIAS analyse pour vous les obligations légales, les tarifs 2026 négociés auprès de nos 8 assureurs partenaires, les sinistres types couverts, et les leviers d'optimisation tarifaire spécifiques à ce profil. Estimation indicative basée sur 1 KW Ahrefs analysés (volume cumulé 90 recherches/mois). Devis officiel personnalisé sous 24h ouvrées."
const LEGAL_REF = "Loi Spinetta — art. L. 241-1 C. assur. + arrêté 23 janvier 2024 (mentions attestation)"
const BENEFIT_TIER = "Niche commerciale prouvée Ahrefs — intent qualifié"

export const metadata: Metadata = {
  title: `${TITLE} | Assurance Pro`,
  description: "Cette page est dédiée à décennale auto-entrepreneur prix 2026. Notre cabinet ORIAS analyse pour vous les obligations légales, les tarifs 2026 négociés auprès de nos 8 assureurs partenaires, les sinistres types couverts, et les leviers d'optimisation tarifaire spécifiques à ce pro",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'article' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG} title={TITLE} tagline={TAGLINE}
      intro={INTRO}
      legalReference={LEGAL_REF}
      isObligatoire={true}
      benefits={[
        { icon: '⚖️', title: 'OBLIGATION Loi Spinetta', desc: BENEFIT_TIER },
        { icon: '📊', title: 'Data Ahrefs validée', desc: "1 KW analysés • 90 vol/m cumul" },
        { icon: '💰', title: 'Tarifs 2026 négociés', desc: 'Cabinet ORIAS — comparaison 8 assureurs spécialisés. Économie 10-25% vs souscription directe' },
        { icon: '📞', title: 'Devis officiel sous 24h', desc: 'Conseil personnalisé + 3-5 propositions adaptées à votre profil sous 24h ouvrées' },
      ]}
      sections={[
        {
          h2: 'Mots-clés Ahrefs ciblés par cette page',
          body: (
            <div>
              <p className="text-sm">Cette page cible 1 mot-clé validé dans notre base Ahrefs (volume mensuel cumulé : 90). Les requêtes principales :</p>
              <ul className="mt-2 space-y-1 text-sm">
              <li>90 vol KD null : assurance décennale auto entrepreneur prix</li>
              </ul>
            </div>
          ),
        },
        {
          h2: 'Pour aller plus loin',
          body: (
            <ul>
              <li><a href="/outils/calculateur-tarif-decennale" className="text-blue-600 underline">Calculateur tarif interactif (estimation 30 secondes)</a></li>
              <li><a href="/outils/devis-assurance-decennale" className="text-blue-600 underline">Devis officiel ORIAS sous 24h</a></li>
              
              <li><a href="/assurance-decennale" className="text-blue-600 underline">Pilier décennale BTP — Loi Spinetta + 37 métiers</a></li>
              <li><a href="/outils/comparateur-rc-pro" className="text-blue-600 underline">Comparateur 8 assureurs (tri intelligent)</a></li>
            </ul>
          ),
        },
      ]}
      faq={[
        { q: 'Quelle est l\'obligation légale pour ce profil ?', a: "OBLIGATOIRE Loi Spinetta (art. L. 241-1 C. assur.) pour tout artisan BTP. Sanctions absence : 75 000 € amende personne physique + 6 mois prison + interdiction d'exercer + responsabilité civile/pénale personnelle si sinistre." },
        { q: 'Tarifs 2026 indicatifs ?', a: "Variables selon profil : statut juridique, CA, antécédents, plafond garantie. Notre cabinet compare 8 assureurs partenaires pour optimiser tarif vs couverture. 1 KW analysés Ahrefs montrent un volume marché de 90 recherches/mois sur ce sujet — preuve de demande commerciale réelle." },
        { q: 'Délai pour obtenir mon devis ?', a: 'Devis officiel sous 24h ouvrées (procédure standard). Procédure Express 6h disponible (+80 € HT) pour besoins urgents. Attestation téléchargeable dans les 24h après signature électronique + paiement 1re cotisation.' },
        { q: 'Notre cabinet est-il transparent sur les commissions ?', a: 'OUI — Recommandation ACPR 2024-R-02 nous impose la transparence sur la commission intermédiaire (10-15% de la cotisation annuelle, INTÉGRÉE dans le tarif sans surfacturation). Le tarif courtier reste -10-25% inférieur au tarif assureur direct grâce aux volumes négociés.' },
      ]}
    />
  )
}
