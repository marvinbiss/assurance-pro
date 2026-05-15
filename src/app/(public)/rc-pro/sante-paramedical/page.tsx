/**
 * Pilier — RC Pro santé paramédical (kiné, infirmier, ostéo, sage-femme) — Couche B
 * KW Ahrefs : "rc pro kiné" 80 vol + "rc pro infirmier" 100 vol + "rc pro ostéo" 60 → 240+ vol/m
 * RC Pro OBLIGATOIRE (art. L. 1142-2 CSP — toutes professions de santé)
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
const SLUG = 'rc-pro/sante-paramedical'
const TITLE = 'RC Pro santé paramédical 2026 — OBLIGATOIRE art. L. 1142-2 CSP (220-680€/an)'
const TAGLINE =
  'La RC Pro obligatoire pour kinésithérapeutes, infirmiers libéraux, ostéopathes, sages-femmes, orthophonistes : couverture responsabilité médicale + dommages corporels patient.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'RC Pro santé paramédical 2026 : OBLIGATOIRE art. L. 1142-2 CSP. Couverture kiné, infirmier libéral, ostéopathe, sage-femme, orthophoniste, podologue. Responsabilité médicale + dommages corporels patient. Sinistralité 2,7%. Tarifs 220-680€/an libéral, 1 800-4 500€/an cabinet. Devis ORIAS 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="La RC Pro est OBLIGATOIRE pour TOUTES les professions de santé en exercice libéral en France (art. L. 1142-2 du Code de la Santé Publique — Loi Kouchner du 4 mars 2002), y compris : kinésithérapeutes, infirmiers libéraux, ostéopathes (art. 75 Loi 2002-303), sages-femmes, orthophonistes, pédicures-podologues, ergothérapeutes, psychomotriciens, manipulateurs radio. Sanctions absence : 45 000€ d'amende + 5 ans d'emprisonnement (art. L. 1142-25 CSP) + radiation Ordre. Sinistralité ACPR 2024 : 2,7% — recours principalement sur dommages corporels patient (chute lors d'une séance, mauvaise manipulation, défaut conseil thérapeutique). Tarifs 2026 : 220-680 €/an pour libéral solo, 1 800-4 500 €/an pour cabinet SCM avec 3-5 praticiens."
      legalReference="Art. L. 1142-2 CSP (Loi Kouchner) + sanctions L. 1142-25 + Code déontologie ordres professionnels"
      isObligatoire={true}
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="rc-pro"
      expertBio={EXPERT_SERVICES}
      comparatifRows={COMPARATIF_SERVICES}
      benefits={[
        {
          icon: '⚖️',
          title: 'OBLIGATION art. L. 1142-2 CSP',
          desc: 'Toutes professions santé libérales. Sanctions absence : 45 000€ + 5 ans prison + radiation',
        },
        {
          icon: '🏥',
          title: 'Dommages corporels patient',
          desc: 'Couverture chutes, mauvaise manipulation, défaut diagnostic, manquement obligation moyens',
        },
        {
          icon: '📋',
          title: 'Défense pénale incluse',
          desc: 'Couverture frais avocat en cas de plainte patient (CPAM, Tribunaux)',
        },
        {
          icon: '💰',
          title: '220-680 €/an libéral',
          desc: 'Libéral solo : 220-680€. Cabinet SCM 3-5 praticiens : 1 800-4 500€/an. Hôpital : 5 000+€/an',
        },
      ]}
      sections={[
        {
          h2: 'Sinistralité paramédical 2024',
          body: (
            <div>
              <p>Top 5 sinistres ACPR 2024 :</p>
              <ul>
                <li>
                  <strong>Chutes patient (38%)</strong> — chute table de massage, escalier cabinet,
                  glissade salle d&apos;attente
                </li>
                <li>
                  <strong>Mauvaise manipulation (24%)</strong> — kiné technique inadaptée, infirmier
                  injection ratée
                </li>
                <li>
                  <strong>Défaut diagnostic (16%)</strong> — kiné/ostéo n&apos;ayant pas orienté
                  vers médecin
                </li>
                <li>
                  <strong>Manquement information patient (12%)</strong> — défaut consentement
                  éclairé, contre-indication non identifiée
                </li>
                <li>
                  <strong>Sinistres téléconsultation (8%)</strong> — émergent depuis 2020, mauvais
                  diagnostic à distance
                </li>
              </ul>
              <p className="mt-3 border-l-4 border-primary-500 bg-primary-50 p-3">
                <strong>Sinistre moyen 2024</strong> : 24 800€. Plafond garantie recommandé :{' '}
                <strong>1 000 000€</strong> minimum (vs 600 000€ minimum Ordre kiné). Pour
                ostéopathes spécialisés viscéral/crânien : <strong>2 000 000€</strong>.
              </p>
            </div>
          ),
        },
        {
          h2: 'Tarifs par profession paramédicale',
          body: (
            <div>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-primary-50">
                    <th className="border p-2 text-left">Profession</th>
                    <th className="border p-2 text-right">Tarif libéral solo</th>
                    <th className="border p-2 text-left">Sinistralité</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">Kinésithérapeute</td>
                    <td className="border p-2 text-right">220 € – 480 €/an</td>
                    <td className="border p-2">2,5 %</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Infirmier libéral</td>
                    <td className="border p-2 text-right">280 € – 580 €/an</td>
                    <td className="border p-2">3,1 % (injections, perfusions)</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Ostéopathe</td>
                    <td className="border p-2 text-right">240 € – 520 €/an</td>
                    <td className="border p-2">2,2 %</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Sage-femme libérale</td>
                    <td className="border p-2 text-right">380 € – 780 €/an</td>
                    <td className="border p-2">3,8 % (suivi grossesse à risque)</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Orthophoniste</td>
                    <td className="border p-2 text-right">200 € – 420 €/an</td>
                    <td className="border p-2">1,8 %</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Pédicure-podologue</td>
                    <td className="border p-2 text-right">260 € – 540 €/an</td>
                    <td className="border p-2">2,4 %</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Ergothérapeute</td>
                    <td className="border p-2 text-right">220 € – 480 €/an</td>
                    <td className="border p-2">1,9 %</td>
                  </tr>
                </tbody>
              </table>
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
                  Calculateur tarif RC Pro santé paramédical
                </Link>
              </li>
              <li>
                <Link href="/outils/devis-rc-pro" className="text-primary-600 underline">
                  Devis officiel ORIAS sous 24h
                </Link>
              </li>
              <li>
                <Link href="/assurance-medecin" className="text-primary-600 underline">
                  Assurance médecin libéral
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
          q: 'RC Pro paramédical OBLIGATOIRE ?',
          a: "OUI absolument. Art. L. 1142-2 CSP s'applique à TOUTES les professions de santé libérales. Sanctions absence : 45 000€ amende + 5 ans prison (art. L. 1142-25 CSP) + radiation Ordre/ARS. Vérification annuelle par Ordre/ARS.",
        },
        {
          q: 'Plafond minimum imposé par Ordre ?',
          a: "Variable selon Ordre : Kiné 600 000€ par sinistre minimum (CNOK). Infirmier 600 000€ (CNOI). Ostéopathe : recommandation 1M€ (pas d'Ordre obligatoire mais Registre RPPS). Sage-femme 1 000 000€ (CNOSF). Notre cabinet ORIAS propose 1-2M€ par défaut pour confort.",
        },
        {
          q: 'Téléconsultation : couverte ?',
          a: "OUI mais vérifier votre contrat. Depuis 2020, la téléconsultation paramédicale s'est développée (kiné post-COVID, ostéo conseils, orthophonie). Tous les contrats récents (2023+) la couvrent par défaut. Si votre contrat est plus ancien, ajouter une option téléconsultation (+30-80€/an).",
        },
        {
          q: 'Tarif RC Pro paramédical 2026 ?',
          a: "Voir tableau ci-dessus par profession. Variables : antécédents (relevé d'information ACPR), zone (Paris/IDF +15%), spécialisations (ostéo viscéral/crânien sur-prime +20%), exercice mixte cabinet+domicile (+10%).",
        },
      ]}
    />
  )
}
