/**
 * Pilier — Assurance pour entreprise individuelle (EI)
 * KW Ahrefs : "assurance pour entreprise individuelle" 150 vol KD 0 CPC 350€
 * Distinct de /assurance-micro-entreprise (cible AE / micro-entrepreneur).
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'assurance-pour-entreprise-individuelle'
const TITLE = 'Assurance pour entreprise individuelle (EI) — Pack 2026 (RC, mutuelle, Madelin)'
const TAGLINE =
  "L'assurance dédiée à l'entreprise individuelle (EI) au régime réel : RC pro, multirisque local, mutuelle TNS Madelin, prévoyance, protection patrimoine."

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Assurance entreprise individuelle (EI) : RC pro adaptée + multirisque local pro + mutuelle TNS Madelin + prévoyance Madelin + protection juridique. Tarifs 380-2 800€/an. Devis gratuit ORIAS sous 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance pour entreprise individuelle (EI) est le pack adapté aux entrepreneurs individuels au RÉGIME RÉEL d'imposition (vs micro-fiscal AE). Avantage majeur : pleine éligibilité à la Loi Madelin pour la mutuelle santé et la prévoyance (déduction du bénéfice imposable jusqu'à ~5 800€/an pour 60k€ de bénéfice). Depuis la Loi du 14 février 2022 (effet 15 mai 2022), l'EI bénéficie aussi d'une PROTECTION DU PATRIMOINE PERSONNEL renforcée — séparation automatique du patrimoine pro et perso, sans démarche déclarative (vs ancienne EIRL supprimée). Le pack standard combine 5 garanties : RC pro adaptée au métier, multirisque local pro (si applicable), mutuelle TNS Madelin, prévoyance Madelin, protection juridique. Tarifs 2026 : 380-2 800 €/an selon métier et taille."
      legalReference="Loi du 14 février 2022 (protection patrimoine EI) + Loi Madelin (art. 154 bis CGI)"
      isObligatoire={false}
      benefits={[
        {
          icon: '🛡️',
          title: 'Patrimoine perso protégé',
          desc: 'Loi 14 février 2022 : séparation automatique pro/perso, sans démarche EIRL',
        },
        {
          icon: '💰',
          title: 'Madelin pleine déduction',
          desc: 'Mutuelle + prévoyance déductibles BNC (vs AE micro-fiscal NON déductible)',
        },
        {
          icon: '⚡',
          title: 'Souscription rapide',
          desc: 'Formulaire allégé pour structures simples, signature électronique',
        },
        {
          icon: '💸',
          title: 'À partir de 380 €/an',
          desc: 'EI freelance digital. EI artisan BTP : 1 280-2 800€/an',
        },
      ]}
      sections={[
        {
          h2: "EI vs AE / Micro-entrepreneur : différence pour l'assurance",
          body: (
            <>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Critère</th>
                    <th className="border p-2 text-left">EI (régime réel)</th>
                    <th className="border p-2 text-left">AE (micro-fiscal)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">
                      <strong>Plafond CA</strong>
                    </td>
                    <td className="border p-2">Aucun</td>
                    <td className="border p-2">77 700 € (BNC) / 188 700 € (BIC vente)</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Madelin déductible</strong>
                    </td>
                    <td className="border p-2">✅ OUI (santé + prévoyance)</td>
                    <td className="border p-2">❌ NON</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Charges déductibles bénéfice</strong>
                    </td>
                    <td className="border p-2">✅ OUI (réel)</td>
                    <td className="border p-2">❌ NON (abattement forfaitaire)</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Comptabilité</strong>
                    </td>
                    <td className="border p-2">Obligatoire (~80-150€/mois)</td>
                    <td className="border p-2">Simple registre achats/recettes</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>ROI bascule réel</strong>
                    </td>
                    <td className="border p-2">Positif dès 30 k€ bénéfice</td>
                    <td className="border p-2">N/A</td>
                  </tr>
                </tbody>
              </table>
            </>
          ),
        },
        {
          h2: 'Hub EI : pages-piliers connexes',
          body: (
            <>
              <ul>
                <li>
                  <Link href="/assurance-micro-entreprise" className="text-primary-600 underline">
                    Assurance micro-entreprise
                  </Link>{' '}
                  — pour AE / micro-entrepreneurs
                </li>
                <li>
                  <Link href="/mutuelle-tns" className="text-primary-600 underline">
                    Mutuelle TNS Madelin
                  </Link>
                </li>
                <li>
                  <Link href="/prevoyance-tns" className="text-primary-600 underline">
                    Prévoyance TNS Madelin
                  </Link>
                </li>
                <li>
                  <Link href="/assurance-freelance" className="text-primary-600 underline">
                    Assurance freelance
                  </Link>{' '}
                  — tous statuts
                </li>
                <li>
                  <Link
                    href="/responsabilite-civile-professionnelle"
                    className="text-primary-600 underline"
                  >
                    RC Pro complet
                  </Link>
                </li>
              </ul>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'EI vs AE : quel est le meilleur statut ?',
          a: "EI plus avantageux fiscalement dès que le bénéfice dépasse ~30k€/an (Madelin déductible + charges réelles déductibles). AE plus simple administrativement (pas de comptabilité). Pour basculer AE → EI : option auprès du SIE avant 31/12 de l'année N pour application en N+1.",
        },
        {
          q: "Combien coûte l'assurance d'une EI en 2026 ?",
          a: '380-580€/an pour EI freelance digital. 1 280-2 800€/an pour EI artisan BTP avec décennale. 880-1 480€/an pour EI consultant ou profession libérale. Variables : métier, CA, plafond RC choisi.',
        },
        {
          q: "Madelin EI : combien d'économie d'impôt ?",
          a: 'Plafond commun santé + prévoyance Madelin : 3,75% du PASS + 7% du bénéfice (limite 3% × 8 PASS). Pour EI à 60k€ : ~5 826€/an déductibles. À TMI 30% : économie ~1 750€/an + économie cotisations sociales (~24%).',
        },
        {
          q: 'Loi 14 février 2022 EI : changement majeur ?',
          a: "OUI — protection automatique du patrimoine personnel (vs ancienne EIRL supprimée qui exigeait une déclaration). Tous les biens NON nécessaires à l'activité pro deviennent automatiquement insaisissables par les créanciers pro. Renforcement majeur de la protection de l'EI.",
        },
        {
          q: 'Combien de temps pour un devis EI ?',
          a: '24h via notre formulaire avec 3 propositions de nos partenaires (Hiscox, April Pro, MMA Pro, Allianz Pro, AXA Pro). Souscription 24-48h. Effet 1er du mois suivant ou immédiat (procédure express +60€).',
        },
      ]}
    />
  )
}
