/**
 * Pilier — Assurance SASU
 * KW long-tail (estimation famille SASU + SAS unipersonnelle).
 * Distinct de /assurance-pour-entreprise-individuelle (statut TNS) — SASU = assimilé salarié.
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
const SLUG = 'assurance-sasu'
const TITLE = 'Assurance SASU — Pack 2026 (RC Pro, président assimilé salarié)'
const TAGLINE =
  "L'assurance dédiée à la SASU (Société par Actions Simplifiée Unipersonnelle) : RC Pro, multirisque local, mutuelle collective (président assimilé salarié), RCMS."

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Assurance SASU : RC Pro adaptée + multirisque local + mutuelle COLLECTIVE (président assimilé salarié, vs Madelin TNS) + RCMS dirigeant + cyber. Tarifs 580-2 800€ par an. Devis ORIAS sous 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance SASU est le pack adapté à la SASU (Société par Actions Simplifiée Unipersonnelle) — forme juridique très populaire pour freelances seniors et consultants à fort CA. Particularité fiscale et sociale : le PRÉSIDENT de SASU est ASSIMILÉ SALARIÉ (vs gérant majoritaire SARL ou EI qui sont TNS). Conséquence pour l'assurance : ÉLIGIBILITÉ aux contrats COLLECTIFS d'entreprise (mutuelle ANI 2013, prévoyance collective) MAIS NON ÉLIGIBILITÉ à la Loi Madelin (réservée aux TNS). Le pack standard SASU combine 5 garanties : RC Pro adaptée au métier (3-10 M€), multirisque local (si applicable), mutuelle collective (président + salariés éventuels), RC Mandataire Social (RCMS) pour le président, cyber assurance. Tarifs 2026 : 580-2 800 € par an. Cette page distingue SASU des autres statuts et liste les piliers connexes."
      legalReference="Code de commerce L. 227-1 et s. + Code de la sécurité sociale (régime salarié)"
      isObligatoire={false}
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="rc-pro"
      expertBio={EXPERT_SERVICES}
      comparatifRows={COMPARATIF_SERVICES}
      benefits={[
        {
          icon: '👔',
          title: 'Président assimilé salarié',
          desc: 'Régime social SALARIÉ (vs TNS pour SARL gérant majoritaire — EI — EURL)',
        },
        {
          icon: '🏥',
          title: 'Mutuelle collective éligible',
          desc: 'ANI 2013 — possible pour le président SASU (régime salarié)',
        },
        {
          icon: '🛡️',
          title: 'RCMS recommandée',
          desc: 'Protection responsabilité personnelle dirigeant en cas de faute de gestion',
        },
        {
          icon: '💰',
          title: 'À partir de 580 € par an',
          desc: 'Pack RC Pro + cyber. Pack complet avec mutuelle + RCMS : 1 800-2 800€ par an',
        },
      ]}
      sections={[
        {
          h2: 'SASU vs autres statuts : impact assurance',
          body: (
            <>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-sand-100">
                    <th className="border p-2 text-left">Statut</th>
                    <th className="border p-2 text-left">Régime social dirigeant</th>
                    <th className="border p-2 text-left">Madelin éligible</th>
                    <th className="border p-2 text-left">Mutuelle</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">
                      <strong>SASU</strong>
                    </td>
                    <td className="border p-2">Assimilé salarié</td>
                    <td className="border p-2">❌ NON</td>
                    <td className="border p-2">Collective ANI possible</td>
                  </tr>
                  <tr>
                    <td className="border p-2">SAS président</td>
                    <td className="border p-2">Assimilé salarié</td>
                    <td className="border p-2">❌ NON</td>
                    <td className="border p-2">Collective ANI obligatoire (si salariés)</td>
                  </tr>
                  <tr>
                    <td className="border p-2">SARL gérant majoritaire</td>
                    <td className="border p-2">TNS</td>
                    <td className="border p-2">✅ OUI</td>
                    <td className="border p-2">Mutuelle TNS Madelin individuelle</td>
                  </tr>
                  <tr>
                    <td className="border p-2">SARL gérant minoritaire</td>
                    <td className="border p-2">Assimilé salarié</td>
                    <td className="border p-2">❌ NON</td>
                    <td className="border p-2">Collective ANI possible</td>
                  </tr>
                  <tr>
                    <td className="border p-2">EI — EURL</td>
                    <td className="border p-2">TNS</td>
                    <td className="border p-2">✅ OUI</td>
                    <td className="border p-2">Mutuelle TNS Madelin individuelle</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Auto-entrepreneur</td>
                    <td className="border p-2">TNS</td>
                    <td className="border p-2">⚠️ OUI au réel</td>
                    <td className="border p-2">Mutuelle individuelle (Madelin si réel)</td>
                  </tr>
                </tbody>
              </table>
            </>
          ),
        },
        {
          h2: "Quand choisir SASU plutôt qu'EI — EURL ?",
          body: (
            <>
              <p>Choix SASU pertinent quand :</p>
              <ul>
                <li>
                  Bénéfice élevé (&gt; 80-100 k€ par an) — l&apos;assimilation salariée devient
                  avantageuse fiscalement
                </li>
                <li>
                  Volonté de cotiser au régime général (couverture chômage, retraite plus généreuse)
                </li>
                <li>Levée de fonds future (plus simple en SAS qu&apos;en EI)</li>
                <li>Dividendes optimisés (flat tax 30%)</li>
              </ul>
              <p>
                Limite SASU : cotisations sociales lourdes (~70% du salaire brut vs 30-45% en TNS) —
                d&apos;où l&apos;intérêt de la rémunération MIXTE (salaire + dividendes).
              </p>
            </>
          ),
        },
        {
          h2: 'Hub SASU : pages-piliers connexes',
          body: (
            <>
              <ul>
                <li>
                  <Link
                    href="/responsabilite-civile-professionnelle"
                    className="text-primary-600 underline"
                  >
                    RC Pro complet
                  </Link>
                </li>
                <li>
                  <Link href="/assurance-sante-entreprise" className="text-primary-600 underline">
                    Mutuelle collective ANI
                  </Link>{' '}
                  — pour SASU + salariés
                </li>
                <li>
                  <Link href="/assurance-homme-cle" className="text-primary-600 underline">
                    Assurance homme-clé
                  </Link>{' '}
                  — critique pour SASU avec dirigeant unique
                </li>
                <li>
                  <Link
                    href="/protection-juridique-professionnelle"
                    className="text-primary-600 underline"
                  >
                    Protection juridique pro
                  </Link>
                </li>
                <li>
                  <Link href="/cyber-assurance" className="text-primary-600 underline">
                    Cyber assurance
                  </Link>
                </li>
              </ul>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'SASU : Madelin déductible ?',
          a: "NON — le président de SASU est ASSIMILÉ SALARIÉ (régime général), pas TNS. La Loi Madelin est RÉSERVÉE aux TNS (gérants majoritaires SARL, EI, EURL, professions libérales BNC). Pour la SASU : régime collectif d'entreprise (mutuelle ANI, prévoyance collective).",
        },
        {
          q: "SASU : combien coûte l'assurance complète en 2026 ?",
          a: 'Pack RC Pro + cyber : 580-1 200€ par an. Pack complet (RC + mutuelle collective + RCMS + cyber) : 1 800-2 800€ par an. Variables : métier, plafond RC, présence salariés, secteur.',
        },
        {
          q: 'RCMS pour président SASU : utile ?',
          a: 'OUI fortement recommandée. La RC Mandataire Social (D&O) couvre la responsabilité PERSONNELLE du président en cas de faute de gestion (poursuite par associés futurs, URSSAF, créanciers). Sinistre type : 50-500 k€. Tarif : 600-1 800€ par an pour SASU. Indispensable si levée de fonds prévue.',
        },
        {
          q: 'Mutuelle collective pour SASU avec 1 seul dirigeant ?',
          a: 'OUI possible et avantageux fiscalement vs mutuelle individuelle. Le président SASU peut souscrire un contrat collectif « 1 personne » comme employeur de lui-même. Coût optimisé + déductible 100% du résultat (vs Madelin 5 800€ par an plafond pour TNS).',
        },
        {
          q: 'Combien de temps pour un devis SASU ?',
          a: '24-48h via notre formulaire avec 3 propositions adaptées au profil SASU (Hiscox, Allianz Pro, AXA Pro, Generali Pro). Souscription 24-48h. Effet 1er du mois suivant ou immédiat (procédure express +60€).',
        },
      ]}
    />
  )
}
