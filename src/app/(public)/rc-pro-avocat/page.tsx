import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/seo/config'
import { PilierLayout } from '@/components/assurance/PilierLayout'

import {
  COMPARATIF_SERVICES,
  EXPERT_SERVICES,
  STATS_DEFAULT,
} from '@/lib/data/pilier-premium-defaults'
export const metadata: Metadata = {
  title: 'RC Pro Avocat — Comparez les contrats CNB',
  description:
    "RC Pro avocat conforme aux exigences du CNB et de l'Ordre. Comparaison sur 6 assureurs spécialistes. Devis personnalisé en 24h.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vivos-assurance.fr'}/rc-pro-avocat`,
  },
  openGraph: {
    title: 'RC Pro Avocat — Comparez les contrats CNB',
    description: 'RC Pro avocat conforme aux exigences du CNB et de l\\',
    url: `${SITE_URL}/rc-pro-avocat`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RC Pro Avocat — Comparez les contrats CNB',
    description: 'RC Pro avocat conforme aux exigences du CNB et de l\\',
  },
}

export default function RcProAvocatPage() {
  return (
    <PilierLayout
      slug="rc-pro-avocat"
      title="RC Pro Avocat"
      tagline="L'assurance professionnelle obligatoire pour avocats — conforme aux exigences du Conseil National des Barreaux."
      legalReference="art. 27 Loi 1971 + Décret 1991-1197 + Règlement Intérieur National"
      isObligatoire={true}
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="rc-pro"
      expertBio={EXPERT_SERVICES}
      comparatifRows={COMPARATIF_SERVICES}
      intro="L'avocat est tenu par la loi et par le règlement intérieur de chaque barreau de souscrire une assurance de responsabilité civile professionnelle couvrant l'ensemble de son activité. La couverture minimale est généralement fixée à 1,5M€ par sinistre. Notre cabinet ORIAS travaille avec les assureurs spécialisés du secteur juridique (Allianz, Generali, Hiscox, Covéa) pour proposer des contrats sur-mesure adaptés à la spécialité (affaires, pénal, famille, fiscaliste…) et au mode d'exercice (collaborateur, associé, indépendant)."
      benefits={[
        { icon: '⚖️', title: 'Conforme RIN', desc: 'Reconnu par le CNB' },
        { icon: '🛡️', title: 'Plafond 1,5-10M€', desc: 'Adapté à votre risque' },
        { icon: '🏛️', title: 'Toutes spécialités', desc: 'Affaires, pénal, fiscal' },
        { icon: '⚡', title: 'Attestation 48h', desc: 'Inscription au barreau' },
      ]}
      sections={[
        {
          h2: 'Cadre légal de la RC Pro avocat',
          body: (
            <>
              <p>
                Le décret du 27 novembre 1991 (art. 205) impose à tout avocat une assurance RC Pro
                couvrant les conséquences pécuniaires de la responsabilité civile encourue dans
                l’exercice de la profession. Le Règlement Intérieur National (RIN) précise les
                minima de couverture, généralement 1,5M€ par sinistre et 6M€ par année d’assurance.
              </p>
              <p>
                Le défaut d’assurance entraîne suspension du droit d’exercer et poursuites
                disciplinaires devant le conseil de discipline du barreau.
              </p>
            </>
          ),
        },
        {
          h2: 'Garanties à privilégier',
          body: (
            <ul>
              <li>
                <strong>RC professionnelle</strong>&nbsp;: faute, négligence, omission, retard
              </li>
              <li>
                <strong>RC perte de documents et fonds clients</strong> (CARPA)
              </li>
              <li>
                <strong>Garantie défense recours</strong>&nbsp;: frais de défense en cas de mise en
                cause
              </li>
              <li>
                <strong>Cyber & RGPD</strong>&nbsp;: protection des données clients sensibles
              </li>
              <li>
                <strong>Médiation</strong> (selon spécialité)
              </li>
              <li>
                <strong>Reprise du passé</strong>&nbsp;: faits antérieurs à la souscription
              </li>
              <li>
                <strong>Garantie subséquente</strong>&nbsp;: 5-10 ans après cessation d’activité
              </li>
            </ul>
          ),
        },
        {
          h2: 'Tarifs indicatifs RC Pro avocat 2026',
          body: (
            <table className="my-4 w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Profil</th>
                  <th className="border p-2 text-right">Plafond 1,5M€</th>
                  <th className="border p-2 text-right">Plafond 5M€</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">Avocat collaborateur</td>
                  <td className="border p-2 text-right">600-1 200€ par an</td>
                  <td className="border p-2 text-right">1 200-2 200€ par an</td>
                </tr>
                <tr>
                  <td className="border p-2">Avocat associé (cabinet 5-10 pers.)</td>
                  <td className="border p-2 text-right">1 200-2 500€ par an</td>
                  <td className="border p-2 text-right">2 500-4 500€ par an</td>
                </tr>
                <tr>
                  <td className="border p-2">Avocat fiscaliste — affaires</td>
                  <td className="border p-2 text-right">1 800-3 500€ par an</td>
                  <td className="border p-2 text-right">3 500-7 000€ par an</td>
                </tr>
                <tr>
                  <td className="border p-2">Cabinet d’affaires international</td>
                  <td className="border p-2 text-right">N/A</td>
                  <td className="border p-2 text-right">8 000-25 000€ par an</td>
                </tr>
              </tbody>
            </table>
          ),
        },
      ]}
      faq={[
        {
          q: 'Quel est le plafond minimum obligatoire pour un avocat ?',
          a: 'Le RIN impose un minimum de 1,5M€ par sinistre. Mais selon la spécialité (fiscalité, affaires internationales), il est recommandé de monter à 5-10M€ pour couvrir les enjeux financiers réels.',
        },
        {
          q: 'La cotisation est-elle déductible ?',
          a: 'Oui, la prime RC Pro avocat est entièrement déductible des recettes BNC pour les avocats individuels, et des charges pour les structures (SCP, SELARL, AARPI).',
        },
        {
          q: 'Reprise du passé : pourquoi est-ce critique ?',
          a: 'Les sinistres en RC Pro avocat émergent souvent des années après le conseil ou intervention initial. La reprise du passé garantit que vous êtes couvert pour des faits antérieurs à la souscription du contrat actuel.',
        },
        {
          q: "Et après ma cessation d'activité ?",
          a: "La garantie subséquente (5-10 ans selon contrat) couvre les sinistres déclarés après votre cessation, pour des faits commis pendant votre période d'activité couverte. Indispensable avant de prendre votre retraite.",
        },
      ]}
    />
  )
}
