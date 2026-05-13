/**
 * Guide — Carte professionnelle assurance
 * KW Ahrefs : "carte professionnelle assurance" 200 vol KD 0 CPC 200€
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'guides/carte-professionnelle-assurance'
const TITLE = 'Carte professionnelle assurance — Obtention, ORIAS, IAS 2026'
const TAGLINE =
  'Tout savoir sur la carte professionnelle assurance (IAS) : conditions, formation 150h, immatriculation ORIAS, niveau I/II/III, démarches 2026.'

export const metadata: Metadata = {
  title: `${TITLE} | Vivos Assurance`,
  description:
    "Carte professionnelle assurance (IAS) : conditions d'obtention, formation 150h obligatoire, immatriculation ORIAS, niveau I (courtier) / II (mandataire) / III (mandataire intermédiaire). Démarches complètes + sanctions absence.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'article' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="La carte professionnelle assurance — officiellement IAS (Intermédiaire en Assurance) — est obligatoire pour exercer une activité de distribution d'assurance en France (courtier, mandataire d'assureur, mandataire d'intermédiaire). Elle est délivrée par l'ORIAS (Organisme pour le Registre des Intermédiaires en Assurance) après vérification de 4 conditions cumulatives : honorabilité (casier judiciaire vierge), capacité professionnelle (formation 150h minimum + diplôme), couverture RCP de 1 920 000€ minimum, et garantie financière. Cette page détaille les 3 niveaux (I/II/III), les démarches d'inscription, les coûts et les sanctions en cas d'exercice sans IAS (jusqu'à 3 ans de prison)."
      legalReference="Articles L. 511-1 et suivants du Code des assurances + Décret 2007-1270"
      isObligatoire={true}
      benefits={[
        {
          icon: '⚖️',
          title: 'Obligation absolue',
          desc: 'Sans IAS = exercice illégal. Sanctions : 3 ans prison + 75 000€ amende',
        },
        {
          icon: '📜',
          title: '4 conditions cumulatives',
          desc: 'Honorabilité + capacité pro + RCP 1,92 M€ + garantie financière',
        },
        {
          icon: '🎓',
          title: 'Formation 150h',
          desc: 'Niveau I (courtier) : 150h obligatoires. Niveau II/III : 80-150h selon profil',
        },
        {
          icon: '💰',
          title: 'Coût IAS annuel',
          desc: '40€ inscription + RCP 700-2 000€/an + formation initiale ~2 500€',
        },
      ]}
      sections={[
        {
          h2: "Les 3 niveaux d'IAS",
          body: (
            <>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Niveau</th>
                    <th className="border p-2 text-left">Activité</th>
                    <th className="border p-2 text-left">Formation requise</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">
                      <strong>Niveau I — Courtier</strong>
                    </td>
                    <td className="border p-2">Conseil indépendant, comparatif multi-assureurs</td>
                    <td className="border p-2">
                      150h + diplôme niveau bac+2 OU 4 ans d&apos;expérience
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Niveau II — Agent général</strong>
                    </td>
                    <td className="border p-2">Mandataire exclusif d&apos;UN assureur</td>
                    <td className="border p-2">
                      80h + 2 ans d&apos;expérience OU 150h sans expérience
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Niveau III — Mandataire d&apos;intermédiaire</strong>
                    </td>
                    <td className="border p-2">
                      Sous-mandataire (apporteur d&apos;affaires sous mandat)
                    </td>
                    <td className="border p-2">60h ou stage 6 mois</td>
                  </tr>
                </tbody>
              </table>
            </>
          ),
        },
        {
          h2: "Démarches d'inscription ORIAS",
          body: (
            <>
              <ol>
                <li>
                  <strong>Vérifier les 4 conditions</strong> : honorabilité (casier B2 vierge),
                  capacité pro (diplôme + formation 150h), souscrire RCP 1,92 M€, garantie
                  financière (50 000€ minimum)
                </li>
                <li>
                  <strong>Créer compte ORIAS</strong> sur orias.fr — formulaire en ligne
                </li>
                <li>
                  <strong>Soumettre dossier</strong> avec pièces justificatives (KBis, attestation
                  formation, RCP, garantie financière, casier judiciaire)
                </li>
                <li>
                  <strong>Paiement frais</strong> : 40€ d&apos;inscription + 25€/an de cotisation
                </li>
                <li>
                  <strong>Délai d&apos;instruction</strong> : 3-6 semaines (selon volume dossiers
                  ORIAS)
                </li>
                <li>
                  <strong>Numéro IAS attribué</strong> : 7-8 chiffres + lettre de catégorie. Mention
                  OBLIGATOIRE sur tous les documents commerciaux + cliquable vers orias.fr (arrêté
                  6/12/2022)
                </li>
              </ol>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'La carte professionnelle assurance est-elle obligatoire ?',
          a: "OUI, ABSOLUMENT — pour TOUTE activité de distribution d'assurance en France (courtier, agent général, mandataire). Sans IAS = exercice illégal. Sanctions : 3 ans de prison + 75 000€ d'amende (art. L. 511-1 et s. C. assur.) + nullité des contrats commercialisés.",
        },
        {
          q: "Quelle formation pour obtenir l'IAS niveau I (courtier) ?",
          a: "Formation 150 heures obligatoire (sauf si diplôme niveau bac+2 dans le domaine OU 4 ans d'expérience dans le secteur). Coût formation initiale : ~2 500€. Formation continue ensuite : 15h/an obligatoire (DDA art. L. 511-2).",
        },
        {
          q: 'Combien coûte la carte IAS par an ?',
          a: 'Inscription ORIAS : 40€ une fois. Cotisation annuelle : 25€. Plus : RCP intermédiaire 700-2 000€/an (1,92 M€ minimum) + garantie financière 50 000€ + formation continue 15h/an (~500€/an). Coût total annuel : ~1 500-3 000€.',
        },
        {
          q: 'Combien de temps pour obtenir la carte IAS ?',
          a: "3-6 semaines après dépôt du dossier complet sur orias.fr. Si dossier incomplet : délai supplémentaire (rejet → soumission corrigée). Démarche à anticiper avant le démarrage de l'activité.",
        },
      ]}
    />
  )
}
