/**
 * Pilier — Décennale carreleur (Couche B)
 * KW Ahrefs : "décennale carreleur" 100 vol KD 1 + tail "tarif" "carrelage" → 180 vol/m
 * Sinistralité AQC SYCODÉS 2024 : 6,5%
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { COMPARATIF_BTP, EXPERT_BTP, STATS_DEFAULT } from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'assurance-decennale/carreleur'
const TITLE = 'Décennale carreleur 2026 — Tarifs 560-920€/an AE'
const TAGLINE =
  'La décennale obligatoire pour carreleur : couverture spécifique fissures carrelage, défauts pose chape, étanchéité salle de bain. Sinistralité AQC 6,5%.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Décennale carreleur 2026 : OBLIGATOIRE Loi Spinetta. Couverture fissures carrelage (sol/mur), défauts pose chape, étanchéité salle de bain (SPEC), désolidarisation. Sinistralité AQC 6,5%. Tarifs 560-920€/an AE, 5 800-12 000€/an SARL 5 sal. Devis ORIAS sous 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance décennale carreleur est OBLIGATOIRE pour tout artisan carreleur en France (Loi Spinetta — art. L. 241-1 C. assur.). Sinistralité AQC SYCODÉS 2024 : 6,5%. Sinistres principaux : fissures carrelage 1-3 ans après pose (défaut joints dilatation, chape mal réalisée), défauts d'étanchéité salle de bain (SPEC — Système de Protection à l'Eau sous Carrelage), désolidarisation des éléments. Tarifs 2026 : 560-920 €/an pour AE, 5 800-12 000 €/an pour SARL avec 5 salariés."
      legalReference="Loi Spinetta + DTU 52.1 (revêtements de sol scellés) + DTU 52.2 (collés)"
      isObligatoire={true}
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="decennale"
      expertBio={EXPERT_BTP}
      comparatifRows={COMPARATIF_BTP}
      benefits={[
        {
          icon: '⚖️',
          title: 'OBLIGATION Loi Spinetta',
          desc: 'Tout carrelage = ouvrage soumis décennale 10 ans. Sanctions : 75 000 € + 6 mois prison',
        },
        {
          icon: '🔨',
          title: 'Fissures + désolidarisation',
          desc: 'Top sinistres AQC : fissures carrelage 1-3 ans, défaut joints dilatation, chape défaillante',
        },
        {
          icon: '💧',
          title: 'Étanchéité SPEC salle de bain',
          desc: 'Couverture spécifique Système Protection Eau sous Carrelage (NF DTU 52.1/52.2)',
        },
        {
          icon: '💰',
          title: '560-920 €/an AE',
          desc: 'AE carreleur CA <50k€. SARL 5 sal : 5 800-12 000€/an. Tarif modéré dans le BTP',
        },
      ]}
      sections={[
        {
          h2: 'Sinistralité carreleur 2024',
          body: (
            <div>
              <p>Top 4 sinistres décennaux carreleur :</p>
              <ul>
                <li>
                  <strong>Fissures carrelage (40%)</strong> — défaut joints dilatation, chape mal
                  séchée
                </li>
                <li>
                  <strong>Étanchéité salle de bain défaillante (28%)</strong> — défaut SPEC,
                  infiltration cloisons
                </li>
                <li>
                  <strong>Désolidarisation faïence murale (16%)</strong> — chute carreaux après 1-2
                  ans
                </li>
                <li>
                  <strong>Défauts pose mosaïque/grand format (12%)</strong> — décollement
                </li>
              </ul>
              <p className="mt-3 border-l-4 border-amber-500 bg-amber-50 p-3">
                <strong>Sinistre moyen 2024</strong> : 12 400 €. Coût modéré car réparation
                localisée possible (vs maçonnerie).
              </p>
            </div>
          ),
        },
        {
          h2: 'Pour aller plus loin',
          body: (
            <ul>
              <li>
                <Link
                  href="/outils/calculateur-tarif-decennale"
                  className="text-primary-600 underline"
                >
                  Calculateur tarif décennale carreleur
                </Link>
              </li>
              <li>
                <Link
                  href="/outils/devis-assurance-decennale"
                  className="text-primary-600 underline"
                >
                  Devis officiel ORIAS sous 24h
                </Link>
              </li>
              <li>
                <Link href="/assurance-decennale" className="text-primary-600 underline">
                  Pilier décennale BTP
                </Link>
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Décennale carreleur obligatoire ?',
          a: "OUI absolument. Loi Spinetta s'applique à tout artisan posant des revêtements scellés ou collés (carrelage, faïence, mosaïque, grand format). Sanctions absence : 75 000 € + 6 mois prison + interdiction d'exercer.",
        },
        {
          q: 'SPEC obligatoire en salle de bain ?',
          a: "OUI depuis NF DTU 52.1/52.2 + NF DTU 43.5 (murs salles de bain). Le Système de Protection à l'Eau sous Carrelage (SPEC) doit être conforme et posé selon les règles. Défaut SPEC = sinistre couvert décennalement (1ère cause salle de bain).",
        },
        {
          q: 'Tarif décennale carreleur 2026 ?',
          a: 'AE carreleur : 560-920 €/an. EURL/SASU : 720-1 100 €/an. SARL 5 salariés : 5 800-12 000 €/an. SAS 10+ salariés : 12 000-18 500 €/an. Variables : antécédents, ancienneté, présence carrelage grand format (sur-prime +10%).',
        },
        {
          q: 'Carrelage extérieur (terrasse) couvert ?',
          a: "OUI mais avec attention. Carrelage terrasse extérieure subit cycles gel/dégel + UV. Vérifier que votre contrat couvre l'extérieur (souvent inclus mais parfois exclu pour carreleurs spécialisés intérieur). Sur-prime extérieur : +30-80€/an.",
        },
      ]}
    />
  )
}
