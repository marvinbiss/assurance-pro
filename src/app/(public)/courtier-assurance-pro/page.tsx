/**
 * Pilier — Courtier assurance pro (page de marque + acquisition)
 * KW Ahrefs : "courtier assurance pro" 100 vol KD 13 CPC 350€
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import {
  COMPARATIF_SERVICES,
  EXPERT_DEFAULT,
  STATS_DEFAULT,
} from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'courtier-assurance-pro'
const TITLE = 'Courtier assurance pro — Conseil ORIAS indépendant 2026'
const TAGLINE =
  'Notre cabinet de courtage en assurance professionnelle : conseil ORIAS indépendant, comparatif 8 assureurs, devis sous 24h. 100% conforme DDA + ACPR.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Courtier assurance pro ORIAS : conseil indépendant, comparatif 8 assureurs (Allianz, AXA, MMA, MAAF, Hiscox, April, Generali, Wakam), devis personnalisé sous 24h. Conforme DDA + Recommandation ACPR 2024-R-03. Service gratuit (commission assureur).',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Un courtier en assurance professionnelle est un INTERMÉDIAIRE INDÉPENDANT qui compare plusieurs assureurs pour vous proposer le contrat le mieux adapté à votre profil. Contrairement à un agent général (mandataire EXCLUSIF d'UN assureur) ou à un mandataire d'intermédiaire (sous-mandataire), le courtier ORIAS travaille SANS LIEN D'EXCLUSIVITÉ et représente VOS INTÉRÊTS. Il est rémunéré par une COMMISSION versée par l'assureur après souscription (vous ne payez rien). Notre cabinet est inscrit ORIAS catégorie I (courtier), compare 8 assureurs distribués en France et applique la Recommandation ACPR 2024-R-03 (devoir de conseil tracé). Cette page présente notre identité, notre méthode et nos valeurs."
      legalReference="ORIAS Catégorie I (Courtier) + DDA + Recommandation ACPR 2024-R-03"
      isObligatoire={false}
      socialProofStats={STATS_DEFAULT}
      expertBio={EXPERT_DEFAULT}
      comparatifRows={COMPARATIF_SERVICES}
      benefits={[
        {
          icon: '⚖️',
          title: 'Indépendance',
          desc: 'Pas de mandat exclusif. 8 assureurs comparés sur même cahier des charges',
        },
        {
          icon: '🆓',
          title: 'Service gratuit',
          desc: 'Rémunération par commission assureur, vous ne payez rien pour le devis ni le conseil',
        },
        {
          icon: '🛡️',
          title: 'Conformité ACPR ou DDA',
          desc: 'Devoir de conseil tracé (Recommandation 2024-R-03). RCP 1,92 M€ minimum',
        },
        {
          icon: '⚡',
          title: 'Devis 24h',
          desc: '3-5 propositions personnalisées sous 24h ouvrées via formulaire de 5 minutes',
        },
      ]}
      sections={[
        {
          h2: 'Courtier vs Agent général vs Mandataire : différences',
          body: (
            <>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-sand-100">
                    <th className="border p-2 text-left">Type</th>
                    <th className="border p-2 text-left">Indépendance</th>
                    <th className="border p-2 text-left">Nb assureurs</th>
                    <th className="border p-2 text-left">ORIAS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">
                      <strong>COURTIER (notre cabinet)</strong>
                    </td>
                    <td className="border p-2">100% indépendant</td>
                    <td className="border p-2">8+ assureurs comparés</td>
                    <td className="border p-2">Catégorie I</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Agent général</td>
                    <td className="border p-2">Mandataire EXCLUSIF</td>
                    <td className="border p-2">1 seul assureur</td>
                    <td className="border p-2">Catégorie II</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Mandataire d&apos;intermédiaire</td>
                    <td className="border p-2">Sous-mandataire</td>
                    <td className="border p-2">Variable</td>
                    <td className="border p-2">Catégorie III</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Comparateur en ligne pur</td>
                    <td className="border p-2">Algorithme</td>
                    <td className="border p-2">Variable</td>
                    <td className="border p-2">Variable</td>
                  </tr>
                </tbody>
              </table>
            </>
          ),
        },
        {
          h2: 'Notre méthode en 5 étapes',
          body: (
            <>
              <ol>
                <li>
                  <strong>Évaluation du besoin</strong> (5 min) : formulaire en ligne avec métier,
                  statut, CA, garanties souhaitées
                </li>
                <li>
                  <strong>Comparatif personnalisé</strong> (sous 24h) : 3-5 propositions de nos 8
                  assureurs partenaires
                </li>
                <li>
                  <strong>Échange conseil ORIAS</strong> (15-30 min) : décryptage des nuances,
                  conformité ACPR 2024-R-03
                </li>
                <li>
                  <strong>Signature électronique</strong> (5 min) : DocuSign ou Yousign + paiement
                  1re cotisation
                </li>
                <li>
                  <strong>Attestation 24h</strong> + suivi sinistres : interlocuteur dédié
                </li>
              </ol>
            </>
          ),
        },
        {
          h2: 'Pour aller plus loin',
          body: (
            <>
              <ul>
                <li>
                  <Link
                    href="/comparateur-assurance-professionnelle"
                    className="text-primary-600 underline"
                  >
                    Comparateur 8 assureurs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/guides/devis-assurance-professionnelle"
                    className="text-primary-600 underline"
                  >
                    Guide devis assurance pro
                  </Link>
                </li>
                <li>
                  <Link href="/notre-processus-conseil" className="text-primary-600 underline">
                    Notre processus conseil
                  </Link>
                </li>
                <li>
                  <Link href="/selection-assureurs" className="text-primary-600 underline">
                    Sélection assureurs partenaires
                  </Link>
                </li>
                <li>
                  <Link href="/equipe" className="text-primary-600 underline">
                    Notre équipe
                  </Link>
                </li>
              </ul>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'Différence entre courtier et agent général ?',
          a: "COURTIER = INDÉPENDANT, compare plusieurs assureurs (notre cabinet = 8 assureurs). AGENT GÉNÉRAL = mandataire EXCLUSIF d'UN seul assureur (ne peut proposer qu'AXA, ou MAAF, ou MMA, etc.). Le courtier représente VOS intérêts, l'agent général représente l'assureur.",
        },
        {
          q: "Le courtier est-il rémunéré par moi ou par l'assureur ?",
          a: "Par L'ASSUREUR (commission après souscription du contrat). Vous ne payez RIEN pour le devis ni le conseil. La commission est intégrée dans la prime que vous payerez ensuite à l'assureur — mais SANS courtier, le tarif n'est pas plus bas (la commission revient à l'assureur ou au réseau direct). Le courtage = service à valeur ajoutée GRATUIT pour le client.",
        },
        {
          q: "Comment vérifier qu'un courtier est bien immatriculé ORIAS ?",
          a: 'Cliquer sur le numéro ORIAS du courtier (obligation arrêté 6 décembre 2022) qui doit être lien CLIQUABLE vers orias.fr. Sur orias.fr → recherche par numéro → vérifier : statut actif, catégorie I (courtier), RCP en cours de validité, garantie financière en cours.',
        },
        {
          q: "Pourquoi passer par un courtier plutôt que directement par l'assureur ?",
          a: "(1) ÉCONOMIE 15-30% via comparatif systématique 8 assureurs (vs 1 seul si direct), (2) CONSEIL OBJECTIF (le courtier représente vos intérêts, pas ceux de l'assureur), (3) ACCOMPAGNEMENT SINISTRE (le courtier vous défend face à l'assureur en cas de refus indemnisation), (4) ZÉRO COÛT (commission assureur, pas frais client).",
        },
      ]}
    />
  )
}
