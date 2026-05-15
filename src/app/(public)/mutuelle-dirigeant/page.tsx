/**
 * Pilier — Mutuelle dirigeant (SASU/SAS/cadres)
 * KW Ahrefs : "mutuelle dirigeant sasu" 100 vol KD 0 + "mutuelle dirigeant sas" 80 vol
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { EXPERT_DEFAULT, STATS_DEFAULT } from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'mutuelle-dirigeant'
const TITLE = 'Mutuelle dirigeant SASU/SAS — Régime collectif 2026'
const TAGLINE =
  'La mutuelle santé pour dirigeants assimilés salariés (SASU, SAS) : régime collectif optimisé, garanties cadres, déduction 100% du résultat.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    "Mutuelle dirigeant SASU/SAS : régime collectif d'entreprise pour président assimilé salarié. Garanties haut de gamme cadres (optique premium, dentaire renforcé, médecines douces). Déductible 100% du résultat. Tarifs 80-220€/mois. Devis ORIAS sous 24h.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="La mutuelle dirigeant désigne la complémentaire santé adaptée aux dirigeants ASSIMILÉS SALARIÉS (président SASU/SAS, gérant minoritaire SARL). Particularité : ils relèvent du régime général de la Sécurité Sociale (vs régime TNS pour gérant majoritaire SARL/EURL/EI). Conséquence : ÉLIGIBILITÉ aux contrats collectifs d'entreprise (mutuelle ANI 2013, déductible 100% du résultat de la société) MAIS NON ÉLIGIBILITÉ à la Loi Madelin (réservée aux TNS). Avantages : garanties souvent supérieures aux contrats individuels (optique premium, dentaire renforcé, médecines douces, hospitalisation 400% BR), déduction 100% du résultat (pas plafond Madelin), tarifs négociés grâce à la mutualisation collective. Tarifs 2026 : 80-220€/mois selon profil et garanties choisies."
      legalReference="Loi 14 juin 2013 (ANI mutuelle) + Code général des impôts (charges déductibles)"
      isObligatoire={false}
      socialProofStats={STATS_DEFAULT}
      expertBio={EXPERT_DEFAULT}
      benefits={[
        {
          icon: '👔',
          title: 'Régime collectif',
          desc: 'Pour dirigeants assimilés salariés (SASU, SAS, gérant minoritaire SARL)',
        },
        {
          icon: '💰',
          title: 'Déductible 100%',
          desc: 'Du résultat de la société (vs plafond Madelin pour TNS ~5 800€/an)',
        },
        {
          icon: '🩺',
          title: 'Garanties cadres',
          desc: 'Optique premium, dentaire renforcé, médecines douces, hospitalisation 400% BR',
        },
        {
          icon: '⚡',
          title: 'À partir de 80 €/mois',
          desc: 'Dirigeant 35 ans formule confort. Premium famille : 180-220€/mois',
        },
      ]}
      sections={[
        {
          h2: 'Tarifs mutuelle dirigeant 2026',
          body: (
            <>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Profil</th>
                    <th className="border p-2 text-right">Cotisation mensuelle</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">Dirigeant SASU 35 ans solo (formule confort)</td>
                    <td className="border p-2 text-right">80 € – 120 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Dirigeant SASU 45 ans + conjoint</td>
                    <td className="border p-2 text-right">160 € – 240 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Dirigeant SAS 50 ans famille (4 personnes)</td>
                    <td className="border p-2 text-right">220 € – 320 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Cadre dirigeant haut de gamme Paris</td>
                    <td className="border p-2 text-right">280 € – 420 €</td>
                  </tr>
                </tbody>
              </table>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'Mutuelle dirigeant : régime collectif ou Madelin ?',
          a: 'DÉPEND DU STATUT : SASU/SAS président + gérant minoritaire SARL = ASSIMILÉ SALARIÉ → régime COLLECTIF (Madelin NON applicable, mais déduction 100% du résultat). SARL gérant majoritaire / EI / EURL = TNS → Madelin individuel (déductible BNC plafond ~5 800€/an).',
        },
        {
          q: 'Combien coûte une mutuelle dirigeant en 2026 ?',
          a: '80-120€/mois pour dirigeant 35 ans solo (formule confort). 160-240€/mois pour dirigeant + conjoint. 220-320€/mois pour famille 4 personnes. 280-420€/mois pour cadre dirigeant haut de gamme Paris.',
        },
        {
          q: 'Mutuelle dirigeant SASU 1 personne : possible ?',
          a: 'OUI possible et avantageux. Le président SASU peut souscrire un contrat collectif « 1 personne » comme employeur de lui-même. Coût optimisé + déductible 100% du résultat (vs Madelin 5 800€/an plafond pour TNS).',
        },
      ]}
    />
  )
}
