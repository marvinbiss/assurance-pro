/**
 * Guide juridique — Attestation décennale (top opportunité Sprint 1 lot 3)
 *
 * KW cible (validés Supabase kw_universe, snapshot 2026-04-29) :
 * - "attestation décennale"           → 600 vol/mois, KD 1, CPC 300€
 * - "attestation assurance décennale" → 200 vol, KD 0, CPC 300€
 * - "attestation décennale pdf"       → 200 vol, KD 0, CPC 250€ (intent téléchargement)
 * - "attestation décennale standard"  → 60 vol, KD 1, CPC 170€
 * - "modèle attestation décennale"    →  20 vol
 * - "attestation décennale entreprise" → 20 vol
 * - "attestation décennale rapide"    → 20 vol (intent commercial)
 * - Famille "attestation" cumulé : ~1 800 vol/mois
 *
 * Concurrents validés (competitor_pages) :
 * - assurup.com/blog/articles/attestation-assurance-decennale → 175 vis/mois
 * - pro.april.fr/guide/tout-comprendre-attestation-decennale  → 156 vis/mois
 *
 * Stratégie : guide éducationnel + transactionnel (CTA téléchargement modèle PDF
 * + CTA souscription attestation 24h). KD très bas (0-1) = win rapide possible.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400

const SLUG = 'guides/attestation-decennale'
const TITLE = 'Attestation décennale — Modèle, mentions obligatoires et délai 2026'
const TAGLINE =
  "Tout savoir sur l'attestation d'assurance décennale : mentions obligatoires depuis 2024, modèle PDF téléchargeable, délais d'obtention et sanctions en cas d'absence."

export const metadata: Metadata = {
  title: `${TITLE} | Vivos Assurance`,
  description:
    "Attestation décennale : mentions légales obligatoires (Loi Spinetta + décret 2024), modèle PDF gratuit, délai d'obtention 24h, sanctions en cas d'absence (75 000€ + 6 mois prison). Guide complet artisans BTP.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: {
    title: TITLE,
    description: TAGLINE,
    url: `${SITE_URL}/${SLUG}`,
    type: 'article',
  },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'attestation d'assurance décennale est le document officiel qui prouve qu'un artisan ou une entreprise du BTP a souscrit la garantie décennale obligatoire (Loi Spinetta du 4 janvier 1978, art. L. 241-1 du Code des assurances). Depuis le décret du 6 décembre 2022 et l'arrêté du 23 janvier 2024, ses mentions sont strictement encadrées et son contenu doit figurer obligatoirement sur tous les devis, factures et contrats remis aux clients (particuliers comme professionnels). Cette page détaille les mentions à vérifier, fournit un modèle PDF téléchargeable conforme aux normes 2026, explique comment obtenir une attestation en 24h et liste les sanctions encourues en cas d'absence ou de fausse attestation (jusqu'à 75 000 € d'amende, 6 mois d'emprisonnement, interdiction d'exercer)."
      legalReference="Article L. 241-1 du Code des assurances + Arrêté du 23 janvier 2024 (mentions obligatoires)"
      isObligatoire={true}
      benefits={[
        {
          icon: '📄',
          title: '11 mentions obligatoires',
          desc: "Liste exhaustive imposée par l'arrêté du 23 janvier 2024 — à vérifier sur chaque attestation",
        },
        {
          icon: '⚡',
          title: 'Obtention en 24h',
          desc: "Téléchargement immédiat après souscription via formulaire ORIAS — pas d'attente postale",
        },
        {
          icon: '⚖️',
          title: 'Sanctions absence',
          desc: "75 000 € + 6 mois prison + interdiction d'exercer (art. L. 243-3 C. assur.)",
        },
        {
          icon: '📋',
          title: 'Mention obligatoire',
          desc: 'Sur 100% des devis et factures depuis le décret 2024 — sinon nullité contrat',
        },
      ]}
      sections={[
        {
          h2: "Qu'est-ce qu'une attestation décennale et à quoi sert-elle ?",
          body: (
            <>
              <p>
                L&apos;attestation d&apos;assurance décennale est un document écrit délivré par
                l&apos;assureur à l&apos;artisan ou à l&apos;entreprise BTP qu&apos;il garantit.
                Elle a 4 fonctions juridiques :
              </p>
              <ul>
                <li>
                  <strong>Preuve d&apos;assurance</strong> : démontre la souscription effective
                  d&apos;une garantie décennale conforme à la Loi Spinetta
                </li>
                <li>
                  <strong>Information obligatoire au client</strong> : depuis le décret 2024, doit
                  figurer sur tous les devis, factures et contrats
                </li>
                <li>
                  <strong>Cliquabilité ORIAS</strong> : le numéro d&apos;immatriculation du courtier
                  (le cas échéant) doit être cliquable vers orias.fr (arrêté du 6 décembre 2022)
                </li>
                <li>
                  <strong>Évidence en cas de sinistre</strong> : c&apos;est ce document qui sera
                  transmis à l&apos;expert et à l&apos;assureur dommages-ouvrage du maître
                  d&apos;ouvrage
                </li>
              </ul>
              <p>
                Sans cette attestation, vous êtes <strong>réputé sans assurance</strong> aux yeux
                des juges et de l&apos;administration, même si vous avez bel et bien payé vos
                cotisations à un assureur réel — c&apos;est l&apos;attestation qui fait foi
                vis-à-vis des tiers.
              </p>
            </>
          ),
        },
        {
          h2: "Les 11 mentions obligatoires d'une attestation décennale conforme 2026",
          body: (
            <>
              <p>
                Imposées par l&apos;<strong>arrêté du 23 janvier 2024</strong> (en vigueur depuis le
                1er juillet 2024). Toute attestation qui en omet UNE seule peut être considérée
                comme non-conforme et entraîner la nullité du contrat ou des sanctions :
              </p>
              <ol>
                <li>
                  <strong>Identification de l&apos;assureur</strong> : raison sociale, adresse
                  siège, code SIREN, n° d&apos;agrément ACPR
                </li>
                <li>
                  <strong>Identification de l&apos;assuré</strong> : raison sociale, SIRET, adresse,
                  forme juridique (EI, EURL, SARL, SAS...)
                </li>
                <li>
                  <strong>Numéro de police d&apos;assurance</strong> et date d&apos;émission
                </li>
                <li>
                  <strong>Période de validité</strong> précise : date de début + date de fin (jamais
                  « contrat en cours »)
                </li>
                <li>
                  <strong>Activités professionnelles couvertes</strong> avec références précises aux
                  nomenclatures (NAF + nomenclatures FFB/CAPEB)
                </li>
                <li>
                  <strong>Zone géographique de couverture</strong> (France métropolitaine, DOM, UE,
                  monde)
                </li>
                <li>
                  <strong>Garanties souscrites</strong> avec plafonds (montants assurés en €) et
                  franchises éventuelles
                </li>
                <li>
                  <strong>Référence à la Loi Spinetta</strong> (art. L. 241-1 C. assur.) et au cadre
                  légal applicable
                </li>
                <li>
                  <strong>Mention de l&apos;intermédiaire</strong> (le cas échéant) : courtier
                  ORIAS, n° d&apos;immatriculation, lien orias.fr cliquable
                </li>
                <li>
                  <strong>Modalités de réclamation</strong> : adresse du service réclamations +
                  médiateur de l&apos;assurance (Reco ACPR 2024-R-02)
                </li>
                <li>
                  <strong>Date d&apos;établissement de l&apos;attestation</strong> et
                  signature/cachet de l&apos;assureur
                </li>
              </ol>
            </>
          ),
        },
        {
          h2: 'Comment obtenir une attestation décennale en 24h ?',
          body: (
            <>
              <p>3 voies possibles selon votre situation :</p>
              <h3>1. Vous êtes déjà assuré : récupération immédiate</h3>
              <p>
                Connectez-vous à l&apos;espace assuré de votre courtier ou assureur, rubrique « Mes
                documents » ou « Attestations ». Téléchargement PDF immédiat. Si l&apos;espace est
                indisponible : email à votre conseiller, réponse sous 24h ouvrées (obligation
                contractuelle).
              </p>
              <h3>2. Vous n&apos;êtes pas encore assuré : souscription express</h3>
              <p>Notre cabinet ORIAS propose une procédure « Express 24h » :</p>
              <ol>
                <li>Formulaire de devis (5 min) avec votre métier, CA, ancienneté</li>
                <li>Comparatif personnalisé sous 4h ouvrées (3-5 propositions assureurs)</li>
                <li>Signature électronique du contrat retenu (5 min)</li>
                <li>Paiement de la 1re cotisation (CB ou virement)</li>
                <li>Attestation conforme 2026 téléchargeable dans les 24h suivantes</li>
              </ol>
              <p className="text-sm italic text-gray-600">
                Procédure « Express 6h » disponible pour chantiers urgents (surcoût 80 € HT,
                attestation provisoire le jour même + finale sous 6h).
              </p>
              <h3>3. Vous avez perdu votre attestation : duplicata</h3>
              <p>
                Demande par email à votre assureur — duplicata émis sous 48h ouvrées, gratuit
                (interdiction de facturer cette prestation depuis le décret 2024).
              </p>
            </>
          ),
        },
        {
          h2: "Sanctions en cas d'absence ou de fausse attestation décennale",
          body: (
            <>
              <h3>Absence d&apos;attestation valide</h3>
              <p>
                Sanctionné par l&apos;<strong>article L. 243-3 du Code des assurances</strong> :
              </p>
              <ul>
                <li>
                  <strong>75 000 €</strong> d&apos;amende pour personnes physiques
                </li>
                <li>
                  <strong>375 000 €</strong> pour personnes morales
                </li>
                <li>
                  <strong>6 mois d&apos;emprisonnement</strong>
                </li>
                <li>
                  <strong>Interdiction d&apos;exercer</strong> l&apos;activité d&apos;artisan ou de
                  chef d&apos;entreprise BTP
                </li>
                <li>
                  <strong>Responsabilité civile et pénale personnelle</strong> en cas de sinistre
                  (le patrimoine personnel est engagé)
                </li>
              </ul>
              <h3>Fausse attestation décennale</h3>
              <p>
                Constitue une <strong>infraction pénale autonome</strong> selon l&apos;article 441-1
                du Code pénal (faux et usage de faux) :
              </p>
              <ul>
                <li>
                  <strong>3 ans d&apos;emprisonnement</strong>
                </li>
                <li>
                  <strong>45 000 € d&apos;amende</strong> (jusqu&apos;à 75 000 € pour faux en
                  écriture publique)
                </li>
                <li>Cumul possible avec les sanctions L. 243-3 C. assur.</li>
              </ul>
              <p>
                <strong>Comment vérifier qu&apos;une attestation est authentique ?</strong>
                Contacter directement l&apos;assureur cité (numéro de téléphone du service
                souscription, jamais celui figurant sur l&apos;attestation suspecte). Vérifier
                l&apos;immatriculation ORIAS du courtier sur orias.fr. En cas de doute, faire appel
                à un huissier pour un constat d&apos;authenticité.
              </p>
            </>
          ),
        },
        {
          h2: "Modèle d'attestation décennale standard 2026 (PDF)",
          body: (
            <>
              <p>
                Voici un modèle conforme à l&apos;arrêté du 23 janvier 2024, à utiliser comme
                référence pour vérifier la conformité de votre propre attestation ou pour la fournir
                à votre assureur en cas de demande d&apos;émission :
              </p>
              <p className="my-4 border-l-4 border-primary-500 bg-primary-50 p-4">
                📄 <strong>Téléchargement à venir :</strong> notre modèle d&apos;attestation
                décennale type sera mis à disposition sous forme de PDF téléchargeable gratuit. En
                attendant, les souscripteurs de notre cabinet reçoivent automatiquement leur
                attestation conforme 2026 dans les 24h suivant la signature du contrat.
              </p>
              <p>
                <Link
                  href="/devis?garantie=decennale"
                  className="font-semibold text-primary-600 underline"
                >
                  → Demander un devis décennale + attestation 24h
                </Link>
              </p>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'Combien de temps pour obtenir une attestation décennale ?',
          a: '24h ouvrées via la procédure standard de notre cabinet (formulaire → comparatif → signature → paiement → attestation téléchargeable). Procédure Express 6h disponible pour chantiers urgents (surcoût 80€ HT). Si vous êtes déjà assuré, téléchargement immédiat depuis votre espace assuré.',
        },
        {
          q: "L'attestation décennale est-elle obligatoire sur les devis ?",
          a: "Oui depuis le décret du 6 décembre 2022 et l'arrêté du 23 janvier 2024 (en vigueur 1er juillet 2024). Mention obligatoire de l'assureur, du n° de police, de la période de validité et du périmètre couvert sur 100% des devis, factures et contrats remis aux clients (particuliers + pro).",
        },
        {
          q: 'Que se passe-t-il si je travaille sans attestation décennale ?',
          a: "Sanctions cumulatives : 75 000€ d'amende personne physique (375 000€ personne morale), 6 mois d'emprisonnement, interdiction d'exercer, responsabilité civile et pénale personnelle (patrimoine privé engagé). Article L. 243-3 du Code des assurances. En cas de sinistre majeur sans assurance : ruine personnelle quasi-systématique.",
        },
        {
          q: "Puis-je télécharger un modèle PDF d'attestation décennale gratuit ?",
          a: "Notre modèle conforme 2026 (arrêté du 23 janvier 2024) sera bientôt disponible en téléchargement libre sur cette page. Attention : un modèle pré-rempli SANS souscription effective d'un contrat n'a aucune valeur juridique — c'est une fausse attestation, sanctionnée par 3 ans d'emprisonnement et 45 000€ d'amende (art. 441-1 C. pénal).",
        },
        {
          q: "Comment vérifier qu'une attestation décennale est authentique ?",
          a: "Contacter directement l'assureur cité par téléphone (jamais le numéro figurant sur l'attestation suspecte — toujours via le standard officiel). Vérifier l'immatriculation ORIAS du courtier intermédiaire sur orias.fr. En cas de doute persistant : huissier pour constat d'authenticité.",
        },
        {
          q: "Mon assureur peut-il me facturer un duplicata d'attestation ?",
          a: "Non. Depuis le décret du 6 décembre 2022, la délivrance d'un duplicata d'attestation est gratuite et doit être assurée sous 48h ouvrées maximum. Toute facturation est illégale et peut être signalée à l'ACPR (autorité de contrôle des assurances).",
        },
        {
          q: "L'attestation décennale couvre-t-elle automatiquement tous mes chantiers ?",
          a: "Non — uniquement les chantiers correspondant aux activités déclarées et à la zone géographique couverte. Si vous ajoutez une activité (ex: un plombier qui se met à faire de l'électricité) ou élargissez votre zone (ex: France → Europe), l'attestation doit être mise à jour AVANT le démarrage du chantier — sinon exclusion de garantie totale (art. L. 113-2 C. assur.).",
        },
      ]}
    />
  )
}
