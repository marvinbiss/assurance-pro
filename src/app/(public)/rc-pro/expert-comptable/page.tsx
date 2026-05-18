/**
 * Pilier — RC Pro expert-comptable (Couche B)
 * KW Ahrefs : "rc pro expert comptable" 100 vol KD 1 + tail "assurance expert comptable" 80 vol → 220 vol/m
 * RC Pro OBLIGATOIRE (Ord. 1945 art. 17 + Décret 2012-432)
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import {
  COMPARATIF_SERVICES,
  EXPERT_SERVICES,
  STATS_DEFAULT,
} from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'rc-pro / expert-comptable'
const TITLE = 'RC Pro expert-comptable 2026 — OBLIGATOIRE Ord. 1945 (420-1 280€ par an)'
const TAGLINE =
  'La RC Pro obligatoire pour experts-comptables : couverture erreurs déclarations fiscales, défauts conseil, mauvais bilan, recours URSSAF. Plafond mini 600 000€ par sinistre.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'RC Pro expert-comptable 2026 : OBLIGATOIRE Ordonnance 1945 art. 17 + Décret 2012-432. Plafond mini 600 000€ par sinistre + 1,2M€ par an. Couverture erreurs déclarations TVA, IS ou IR, défauts bilan, recours URSSAF ou DGFiP. Sinistralité 3,8%. Tarifs 420-1 280€ par an indépendant, 8 500-22 000€ par an cabinet. Devis ORIAS 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="La RC Pro est OBLIGATOIRE pour tout expert-comptable inscrit à l'Ordre (Ordonnance n° 45-2138 du 19 septembre 1945, art. 17 + Décret n° 2012-432 du 30 mars 2012). Plafond minimum imposé par l'Ordre : 600 000€ par sinistre + 1 200 000€ par année. Sinistralité 2024 : 3,8% — recours principalement liés aux erreurs de déclarations fiscales (TVA, IS, IR), aux défauts de conseil patrimonial, aux mauvaises évaluations de bilan, et aux recours URSSAF ou DGFiP suite à mauvaise application barèmes. Tarifs 2026 : 420-1 280 € par an pour expert-comptable indépendant (CA 80-180k€), 8 500-22 000 € par an pour cabinet SARL avec 5 salariés."
      legalReference="Ordonnance 1945 art. 17 + Décret 2012-432 + Code de déontologie des experts-comptables"
      isObligatoire={true}
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="rc-pro"
      expertBio={EXPERT_SERVICES}
      comparatifRows={COMPARATIF_SERVICES}
      benefits={[
        {
          icon: '⚖️',
          title: 'OBLIGATION Ord. 1945',
          desc: 'Inscription Ordre Experts-Comptables impose RC Pro avec plafond 600 000€ par sinistre + 1,2M€ par an',
        },
        {
          icon: '📊',
          title: 'Erreurs déclarations fiscales',
          desc: 'Couverture erreurs TVA, IS, IR, déclarations annuelles, liasses fiscales, attestations sociales',
        },
        {
          icon: '🏛️',
          title: 'Recours URSSAF — DGFiP',
          desc: 'Couverture redressements URSSAF + redressements fiscaux DGFiP suite mauvaise application',
        },
        {
          icon: '💰',
          title: '420-1 280 € par an indépendant',
          desc: 'EC indépendant CA 80-180k€. Cabinet SARL 5 sal : 8 500-22 000€ par an. SAS 10+ : 22 000-45 000€ par an',
        },
      ]}
      sections={[
        {
          h2: 'Sinistres types couverts par la RC Pro EC',
          body: (
            <div>
              <p>Top 5 sinistres ACPR 2024 :</p>
              <ul>
                <li>
                  <strong>Erreurs déclarations fiscales (38%)</strong> — TVA mal calculée, IS
                  sous-évalué, oubli liasse
                </li>
                <li>
                  <strong>Défaut conseil patrimonial (22%)</strong> — mauvaise structuration holding
                  ou SCI, optimisation ratée
                </li>
                <li>
                  <strong>Recours URSSAF (16%)</strong> — mauvaise application barème, oubli
                  déclarations sociales
                </li>
                <li>
                  <strong>Recours DGFiP (14%)</strong> — redressement fiscal lié à conseil EC erroné
                </li>
                <li>
                  <strong>Manquement obligation moyens (10%)</strong> — bilans en retard, défaut
                  mise à jour
                </li>
              </ul>
              <p className="mt-3 border-l-4 border-primary-500 bg-primary-50 p-3">
                <strong>Sinistre moyen 2024</strong> : 48 200 € (recours client souvent &gt; 100
                000€). Plafond Ordre 600 000€ INSUFFISANT pour cabinets avec clients ETI ou grandes
                structures — recommandation cabinet ORIAS : <strong>plafond 2-5 M€</strong>.
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
                  href="/outils/calculateur-tarif-rc-pro"
                  className="text-primary-600 underline"
                >
                  Calculateur tarif RC Pro expert-comptable
                </Link>
              </li>
              <li>
                <Link href="/outils/devis-rc-pro" className="text-primary-600 underline">
                  Devis officiel ORIAS sous 24h
                </Link>
              </li>
              <li>
                <Link href="/cyber-assurance" className="text-primary-600 underline">
                  Cyber assurance (recommandée pour EC manipulant données fiscales clients)
                </Link>
              </li>
              <li>
                <Link href="/rc-pro" className="text-primary-600 underline">
                  Pilier RC Pro
                </Link>
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Plafond Ordre 600 000€ : suffisant ?',
          a: 'Suffisant pour expert-comptable indépendant avec clientèle TPE ou PME (CA <500k€). INSUFFISANT pour : cabinet avec clients ETI ou grandes structures (recours peuvent dépasser 1M€), missions de conseil M&A ou évaluation entreprises, mandats commissariat aux comptes (CAC). Recommandation : 2-5 M€ pour cabinets >5 salariés.',
        },
        {
          q: 'Cyber assurance obligatoire EC ?',
          a: 'Pas légalement OBLIGATOIRE mais FORTEMENT recommandée. EC = manipulation données fiscales ou sociales sensibles + obligation RGPD. Sinistre cyber 2024 moyen EC : 85 000€ (notification CNIL + restauration + perte clients). Notre cabinet ORIAS propose pack RC Pro + cyber +200-500€ par an.',
        },
        {
          q: 'Tarif RC Pro EC 2026 ?',
          a: 'EC indépendant (CA 80-180k€) : 420-1 280 € par an. EURL ou SASU : 580-1 580 € par an. Cabinet SARL 5 salariés : 8 500-22 000 € par an. SAS 10+ salariés : 22 000-45 000 € par an. Variables : plafond souhaité (au-dessus 600k€ Ordre = sur-prime), antécédents, présence CAC, clientèle ETI.',
        },
        {
          q: 'CAC (Commissaire aux comptes) : RC Pro spécifique ?',
          a: 'OUI obligatoire (Code de Commerce L. 822-17). Plafond minimum CAC : 1 500 000€ par sinistre. Distinct de la RC Pro Expert-Comptable. Si vous cumulez les 2 missions, vous devez avoir une RC Pro double couverture (sur-prime +30-60%).',
        },
      ]}
    />
  )
}
