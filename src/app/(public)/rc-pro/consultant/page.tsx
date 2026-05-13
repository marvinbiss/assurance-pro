/**
 * Pilier — RC Pro consultant / conseil (Couche B)
 *
 * KW Ahrefs (kw_universe) :
 * - "rc pro consultant" → 150 vol KD 0 CPC 500€ ⭐
 * - "rc pro consultant informatique" → 200 vol KD 1 CPC 400€
 * - "assurance consultant" → 80-120 vol
 * - Famille cumulée : ~430 vol/m, ROI ~215k score
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'rc-pro/consultant'
const TITLE = 'RC Pro consultant / conseil 2026 — Tarifs 90-280€/an AE'
const TAGLINE =
  'La RC Pro recommandée pour consultants/coachs/experts indépendants : couverture défaut conseil, erreur préconisation, manquement obligation moyens, perte chance client. Tarifs ultra-compétitifs.'

export const metadata: Metadata = {
  title: `${TITLE} | Assurance Pro`,
  description:
    'RC Pro consultant 2026 : couverture défaut conseil, erreur préconisation stratégique, manquement obligation moyens, perte chance, dommages immatériels. Sinistralité 1,2% (faible mais sinistres lourds). Tarifs 90-280€/an AE. Devis ORIAS sous 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="La RC Pro consultant / conseil n'est pas légalement obligatoire (sauf consultants en management certifié OPQCM), mais elle est FORTEMENT RECOMMANDÉE pour tout consultant indépendant, coach professionnel, expert en stratégie, ou conseiller en organisation. Sinistralité ACPR 2024 : 1,2% (faible) MAIS sinistres lourds en cas de recours client (recommandation stratégique erronée entraînant perte chiffre d'affaires). Tarifs 2026 ultra-compétitifs : 90-280 €/an pour AE, 380-1 200 €/an pour EURL/SARL avec salariés. Pack RC Pro + cyber + protection juridique recommandé pour 200-450€/an total."
      legalReference="Art. 1147 C. civ. (responsabilité contractuelle) + 1382-1383 (responsabilité délictuelle)"
      isObligatoire={false}
      benefits={[
        {
          icon: '💼',
          title: 'Recommandée tout consultant',
          desc: 'Couvre recours clients suite à recommandation stratégique erronée ou défaut conseil',
        },
        {
          icon: '📊',
          title: 'Perte chance + immatériel',
          desc: 'Couverture dommages immatériels (perte CA, opportunité manquée) — souvent exclu RC standard',
        },
        {
          icon: '🛡️',
          title: 'Protection juridique incluse',
          desc: 'Pack RC Pro + protection juridique (avocat, médiation) à partir de 150€/an',
        },
        {
          icon: '💰',
          title: '90-280 €/an AE',
          desc: 'AE consultant CA <50k€. Tarif le plus bas du marché RC Pro (sinistralité 1,2%)',
        },
      ]}
      sections={[
        {
          h2: 'Sinistres types couverts par la RC Pro consultant',
          body: (
            <div>
              <p>Top 5 sinistres ACPR 2024 :</p>
              <ul>
                <li>
                  <strong>Recommandation stratégique erronée (38%)</strong> — pivot business échoué,
                  mauvaise allocation budget
                </li>
                <li>
                  <strong>Manquement obligation moyens (22%)</strong> — livrable insuffisant,
                  non-respect cahier des charges
                </li>
                <li>
                  <strong>Défaut confidentialité (14%)</strong> — fuite info stratégique, breach
                  RGPD
                </li>
                <li>
                  <strong>Perte chance client (12%)</strong> — appel d&apos;offres perdu suite
                  préconisation
                </li>
                <li>
                  <strong>Dommages immatériels (8%)</strong> — perte CA causée par retard livraison
                  consultant
                </li>
              </ul>
              <p className="mt-3 border-l-4 border-primary-500 bg-primary-50 p-3">
                <strong>Sinistre moyen 2024</strong> : 42 800€ (recours client). Plafond garantie
                recommandé : <strong>500 000€</strong> standard, <strong>1-2M€</strong> si missions
                stratégiques C-level (M&amp;A, transformation digitale, restructuration).
              </p>
            </div>
          ),
        },
        {
          h2: 'Particularités selon votre niche conseil',
          body: (
            <div>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-primary-50">
                    <th className="border p-2 text-left">Spécialité</th>
                    <th className="border p-2 text-left">Risque spécifique</th>
                    <th className="border p-2 text-left">Recommandation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">Consultant management généraliste</td>
                    <td className="border p-2">Recours sur préconisation stratégique</td>
                    <td className="border p-2">RC Pro standard 500k€</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Consultant IT / data</td>
                    <td className="border p-2">Breach data + RGPD</td>
                    <td className="border p-2">RC Pro 1M€ + cyber 500k€</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Coach pro (DIRECCTE)</td>
                    <td className="border p-2">Recours stagiaires CPF</td>
                    <td className="border p-2">RC Pro 1M€ + protection juridique</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Consultant M&amp;A / fusion</td>
                    <td className="border p-2">Erreur valorisation, vice consentement</td>
                    <td className="border p-2">RC Pro 5M€ + cyber 1M€</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Consultant RH / transformation</td>
                    <td className="border p-2">Plan social mal exécuté, contentieux URSSAF</td>
                    <td className="border p-2">RC Pro 2M€ + protection juridique pénale</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ),
        },
        {
          h2: 'Pour aller plus loin',
          body: (
            <div>
              <ul>
                <li>
                  <a href="/outils/calculateur-tarif-rc-pro" className="text-primary-600 underline">
                    Calculateur tarif RC Pro consultant
                  </a>
                </li>
                <li>
                  <a href="/outils/devis-rc-pro" className="text-primary-600 underline">
                    Devis officiel RC Pro ORIAS sous 24h
                  </a>
                </li>
                <li>
                  <a href="/cyber-assurance" className="text-primary-600 underline">
                    Cyber assurance (pack pour consultants IT/data)
                  </a>
                </li>
                <li>
                  <a href="/rc-pro" className="text-primary-600 underline">
                    Pilier RC Pro — 18 professions
                  </a>
                </li>
              </ul>
            </div>
          ),
        },
      ]}
      faq={[
        {
          q: 'RC Pro consultant obligatoire ?',
          a: 'Non OBLIGATOIRE pour consultants indépendants généralistes, MAIS fortement recommandée car le risque de recours client est réel (sinistre moyen 42 800€). OBLIGATOIRE si vous êtes : consultant en management certifié OPQCM, formateur professionnel certifié Qualiopi, coach professionnel certifié RNCP, conseiller en investissement financier (CIF), gestionnaire de patrimoine (CGP).',
        },
        {
          q: 'Différence RC Pro vs RC Exploitation ?',
          a: "RC Pro = couvre les fautes commises dans l'exercice de votre conseil (erreur préconisation, défaut livrable). RC Exploitation = couvre les dommages causés à des tiers pendant votre activité (renverser café sur ordi client en réunion). Recommandation : prendre les 2 ensemble (option +30-80€/an).",
        },
        {
          q: 'Plafond garantie consultant ?',
          a: '500 000€ = standard pour consultants AE/missions <100k€. 1 000 000€ = recommandé si missions C-level. 2-5 000 000€ = consultants stratégie/M&A/transformation grosses entreprises. Notre cabinet ORIAS optimise selon profil.',
        },
        {
          q: 'Tarif RC Pro consultant 2026 ?',
          a: 'AE consultant (CA <50k€) : 90-280 €/an. EI : 110-320 €/an. EURL/SASU : 180-480 €/an. SARL 5 salariés cabinet conseil : 1 200-3 800 €/an. Variables : niche (IT data majoré, coach standard, M&A premium), antécédents, plafond.',
        },
      ]}
    />
  )
}
