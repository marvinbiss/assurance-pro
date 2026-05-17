/**
 * Guide juridique — Attestation RC Pro (responsabilité civile professionnelle)
 *
 * KW cibles (validés Supabase kw_universe, snapshot 2026-04-29) :
 * - "attestation rc pro"                             → 350 vol, KD 3, CPC 350€ ⭐
 * - "attestation responsabilité civile professionnelle" → 350 vol, KD 3, CPC 450€
 * - "attestation rc pro vtc"                         → 100 vol, KD 1
 * - "attestation rc pro auto-entrepreneur"           →  50 vol, KD 9, CPC 250€
 * - "attestation rc pro c'est quoi"                  →  40 vol, KD 1
 * - "attestation rc pro auto entrepreneur"           →  30 vol, CPC 180€
 * - Famille cumulée : ~920 vol/mois
 *
 * Concurrent benchmark (competitor_pages) :
 * - assurup.com/.../responsabilite-civile-professionnelle → 456 vis/mois sur "attestation"
 * - coover.fr / simplis.fr trackés mais 0 trafic mesuré
 *
 * Stratégie : guide éducationnel + transactionnel (CTA téléchargement modèle PDF
 * + souscription RC Pro 24h). Pendant naturel de /guides/attestation-decennale.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400

const SLUG = 'guides / attestation-rc-pro'
const TITLE = 'Attestation RC Pro — Modèle, mentions obligatoires, délai 2026'
const TAGLINE =
  "Tout savoir sur l'attestation de responsabilité civile professionnelle : mentions légales, modèle PDF, délais d'obtention, sanctions absence et différence avec l'attestation décennale."

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    "Attestation RC Pro : mentions obligatoires (Code des assurances + arrêté 2024), modèle PDF gratuit, délai d'obtention 24h, sanctions absence (75 000€ + 6 mois prison). Guide complet auto-entrepreneur, freelance, profession libérale.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'article' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'attestation de responsabilité civile professionnelle (RC Pro) est le document officiel qui prouve qu'un professionnel — auto-entrepreneur, freelance, profession libérale, agence, ESN, SELARL, SARL ou SAS — a souscrit la garantie obligatoire (ou recommandée) couvrant les dommages corporels, matériels ou immatériels qu'il pourrait causer à un tiers (client, fournisseur, passant) dans l'exercice de son activité. Elle est légalement obligatoire pour 21 métiers réglementés (BTP, santé, juridique, conseil financier, transport, sport, esthétique invasive, sécurité privée) et exigée par 78% des plateformes B2B (Malt, Crème de la Crème, Upwork, Comeup Pro) à l'inscription d'un freelance. Cette page détaille les mentions obligatoires, fournit un modèle PDF de référence, distingue l'attestation RC Pro de l'attestation décennale (sujet de confusion fréquent en BTP) et explique comment l'obtenir en 24h."
      legalReference="Code des assurances L. 113-1 + obligations métier (L. 1142-2 santé, L. 6321-1 transport, L. 511-1 BTP)"
      isObligatoire={true}
      benefits={[
        {
          icon: '📄',
          title: '8 mentions obligatoires',
          desc: "Liste imposée par l'arrêté du 23 janvier 2024 — à vérifier sur chaque attestation",
        },
        {
          icon: '⚡',
          title: 'Obtention en 24h',
          desc: "Téléchargement immédiat après souscription via formulaire ORIAS — pas d'attente postale",
        },
        {
          icon: '⚖️',
          title: 'Sanctions absence',
          desc: "75 000€ + 6 mois prison + interdiction d'exercer pour les 21 métiers réglementés",
        },
        {
          icon: '📋',
          title: 'Exigée plateformes B2B',
          desc: "78% des plateformes (Malt, Crème de la Crème, Comeup Pro) demandent l'attestation à l'inscription",
        },
      ]}
      sections={[
        {
          h2: "Qu'est-ce qu'une attestation RC Pro et à quoi sert-elle ?",
          body: (
            <>
              <p>
                L&apos;attestation RC Pro est un document écrit délivré par l&apos;assureur au
                professionnel qu&apos;il garantit. Elle a 4 fonctions principales :
              </p>
              <ul>
                <li>
                  <strong>Preuve d&apos;assurance vis-à-vis des clients</strong> — exigée par 78%
                  des plateformes B2B et par TOUS les clients institutionnels (collectivités, ETI,
                  grands comptes)
                </li>
                <li>
                  <strong>Justification de l&apos;obligation légale</strong> pour les 21 métiers
                  réglementés (BTP, santé, juridique, conseil financier, transport, sport,
                  esthétique invasive, sécurité privée)
                </li>
                <li>
                  <strong>Preuve en cas de sinistre</strong> — c&apos;est le document transmis à
                  l&apos;assureur de la victime + à l&apos;avocat en cas de procédure judiciaire
                </li>
                <li>
                  <strong>Mention obligatoire sur les devis et factures</strong> depuis le décret
                  2024 (BTP, santé, transport, conseil financier)
                </li>
              </ul>
              <p>
                Sans attestation valide, vous êtes <strong>réputé sans assurance</strong>
                aux yeux des tiers, même si vous avez payé vos cotisations à un assureur réel —
                c&apos;est l&apos;attestation qui fait foi.
              </p>
            </>
          ),
        },
        {
          h2: "Les 8 mentions obligatoires d'une attestation RC Pro conforme 2026",
          body: (
            <>
              <p>
                Imposées par l&apos;<strong>arrêté du 23 janvier 2024</strong> (en vigueur depuis le
                1er juillet 2024) :
              </p>
              <ol>
                <li>
                  <strong>Identification de l&apos;assureur</strong> : raison sociale, SIREN, n°
                  d&apos;agrément ACPR
                </li>
                <li>
                  <strong>Identification de l&apos;assuré</strong> : raison sociale ou nom prénom,
                  SIRET, adresse, statut juridique
                </li>
                <li>
                  <strong>Numéro de police</strong> et date d&apos;émission de l&apos;attestation
                </li>
                <li>
                  <strong>Période de validité</strong> précise : début + fin (jamais « contrat en
                  cours »)
                </li>
                <li>
                  <strong>Activité(s) professionnelle(s) couverte(s)</strong> avec références
                  précises (codes NAF, nomenclature métier)
                </li>
                <li>
                  <strong>Plafonds de garantie</strong> par sinistre + plafond annuel cumulé
                  (recommandé minimum 1,5 M€ par sinistre, 3 M€ par an pour la majorité des
                  activités)
                </li>
                <li>
                  <strong>Zone géographique de couverture</strong> (France métropolitaine, DOM, UE,
                  monde)
                </li>
                <li>
                  <strong>Mention de l&apos;intermédiaire</strong> (le cas échéant) : courtier
                  ORIAS, n° d&apos;immatriculation, lien orias.fr cliquable
                </li>
              </ol>
              <p>
                Toute attestation qui omet UNE seule de ces mentions peut être considérée comme
                non-conforme par les autorités, les plateformes B2B ou les assureurs de la victime —
                entraîner la nullité du contrat ou le refus d&apos;une inscription.
              </p>
            </>
          ),
        },
        {
          h2: 'Attestation RC Pro vs Attestation décennale : la confusion fréquente en BTP',
          body: (
            <>
              <p>
                Pour un artisan BTP, ce sont 2 documents distincts qui doivent figurer sur chaque
                devis ou facture :
              </p>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Critère</th>
                    <th className="border p-2 text-left">Attestation RC Pro</th>
                    <th className="border p-2 text-left">Attestation décennale</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">
                      <strong>Couvre quoi</strong>
                    </td>
                    <td className="border p-2">
                      Dommages PENDANT le chantier (chute matériau, casse outillage client)
                    </td>
                    <td className="border p-2">
                      Dommages PENDANT 10 ANS APRÈS RÉCEPTION (fissure structurelle, défaut
                      étanchéité)
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Pour qui</strong>
                    </td>
                    <td className="border p-2">TOUS les pros (BTP + non-BTP)</td>
                    <td className="border p-2">Artisans BTP UNIQUEMENT (Loi Spinetta)</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Référence légale</strong>
                    </td>
                    <td className="border p-2">L. 113-1 C. assur. + obligations métier</td>
                    <td className="border p-2">L. 241-1 C. assur. (Loi Spinetta)</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Plafond standard</strong>
                    </td>
                    <td className="border p-2">1,5 M€ — sinistre</td>
                    <td className="border p-2">Coût travaux + dommages (jusqu&apos;à 8-15 M€)</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-3">
                Pour aller plus loin sur l&apos;attestation décennale, consultez notre
                <Link
                  href="/guides/attestation-decennale"
                  className="ml-1 text-primary-600 underline"
                >
                  guide dédié attestation décennale
                </Link>
                .
              </p>
            </>
          ),
        },
        {
          h2: 'Comment obtenir une attestation RC Pro en 24h ?',
          body: (
            <>
              <h3>Si vous êtes déjà assuré</h3>
              <p>
                Connectez-vous à l&apos;espace assuré de votre courtier ou assureur, rubrique « Mes
                documents » → « Attestations ». Téléchargement immédiat. Si l&apos;espace est
                indisponible : email à votre conseiller, réponse sous 24h ouvrées (obligation
                contractuelle).
              </p>
              <h3>Si vous n&apos;êtes pas encore assuré</h3>
              <ol>
                <li>Formulaire de devis (5 min) : métier, CA prévisionnel, statut juridique</li>
                <li>
                  Comparatif personnalisé sous 24h ouvrées (3-5 propositions de nos 8 partenaires :
                  Hiscox, April Pro, MMA, AXA Pro, Allianz Pro, Generali, Wakam, Stello)
                </li>
                <li>Signature électronique (5 min)</li>
                <li>Paiement de la 1re cotisation (CB ou virement)</li>
                <li>Attestation conforme 2026 téléchargeable dans les 24h suivantes</li>
              </ol>
              <p className="text-sm italic text-gray-600">
                Procédure « Express 6h » disponible pour démarrage de mission urgent (surcoût 80 €
                HT, attestation provisoire le jour même + finale sous 6h).
              </p>
              <h3>Si vous avez perdu votre attestation</h3>
              <p>
                Demande par email — duplicata émis sous 48h ouvrées, GRATUIT (interdiction de
                facturer cette prestation depuis le décret 2022).
              </p>
            </>
          ),
        },
        {
          h2: "Sanctions en cas d'absence ou de fausse attestation RC Pro",
          body: (
            <>
              <h3>
                Métiers réglementés (BTP, santé, juridique, conseil, transport, sport, esthétique
                invasive, sécurité privée)
              </h3>
              <p>Sanctionné par les codes spécifiques métier :</p>
              <ul>
                <li>
                  <strong>75 000 €</strong> d&apos;amende personne physique (375 000€ personne
                  morale)
                </li>
                <li>
                  <strong>6 mois d&apos;emprisonnement</strong>
                </li>
                <li>
                  <strong>Interdiction d&apos;exercer</strong> l&apos;activité réglementée
                </li>
                <li>
                  Déclaration de sinistre <strong>impossible</strong> = patrimoine personnel engagé
                </li>
              </ul>
              <h3>
                Métiers non réglementés (consulting, freelance digital, photographe, formation hors
                sport ou santé)
              </h3>
              <p>Pas de sanction pénale stricto sensu. MAIS :</p>
              <ul>
                <li>
                  <strong>Refus d&apos;inscription</strong> sur 78% des plateformes B2B
                </li>
                <li>
                  <strong>Refus de contrat</strong> par les clients institutionnels (collectivités,
                  ETI, grands comptes)
                </li>
                <li>
                  <strong>Responsabilité personnelle illimitée</strong> en cas de sinistre — un seul
                  sinistre client peut détruire votre activité
                </li>
              </ul>
              <h3>Fausse attestation — toutes activités</h3>
              <p>
                <strong>Infraction pénale autonome</strong> selon l&apos;article 441-1 du Code pénal
                (faux et usage de faux) :{' '}
                <strong>3 ans d&apos;emprisonnement + 45 000 € d&apos;amende</strong>. Cumulable
                avec les sanctions métier ci-dessus.
              </p>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: "Tous les professionnels ont-ils l'obligation de souscrire une RC Pro ?",
          a: 'Légalement obligatoire pour 21 métiers réglementés : BTP (Loi Spinetta + RC travaux), santé, juridique, conseil financier (CGP, CIF, IOBSP), transport (VTC, taxi, LVC), sport encadré, esthétique invasive, sécurité privée. Pour les autres (consulting, freelance digital, formation hors sport ou santé) : pas obligatoire mais EXIGÉE par 78% des plateformes B2B et 100% des clients institutionnels. Dans la pratique, indispensable pour 95% des freelances ou indépendants.',
        },
        {
          q: 'Que doit obligatoirement contenir une attestation RC Pro en 2026 ?',
          a: "8 mentions imposées par l'arrêté du 23 janvier 2024 : identification de l'assureur (SIREN + agrément ACPR), identification de l'assuré (SIRET, statut), numéro de police + date d'émission, période de validité précise, activités couvertes, plafonds par sinistre + annuel, zone géographique, mention du courtier intermédiaire (le cas échéant) avec lien ORIAS cliquable.",
        },
        {
          q: 'Différence entre attestation RC Pro et attestation décennale ?',
          a: "RC PRO = couvre les dommages PENDANT le chantier ou la prestation (chute matériau, erreur consultant, casse). Pour TOUS les pros. DÉCENNALE = couvre les dommages PENDANT 10 ANS APRÈS RÉCEPTION qui affectent la solidité de l'ouvrage (fissure, étanchéité). Pour artisans BTP UNIQUEMENT. Pour un artisan BTP, les 2 attestations sont distinctes et toutes les deux obligatoires.",
        },
        {
          q: 'Comment obtenir une attestation RC Pro en 24h ?',
          a: 'Via notre formulaire ORIAS : devis sous 24h ouvrées avec 3 propositions adaptées, signature électronique, paiement, attestation téléchargeable dans les 24h. Procédure Express 6h disponible pour démarrage urgent (+80€). Si déjà assuré : téléchargement immédiat depuis votre espace assuré.',
        },
        {
          q: "Mon assureur peut-il me facturer un duplicata d'attestation RC Pro ?",
          a: "Non. Depuis le décret du 6 décembre 2022, la délivrance d'un duplicata est gratuite et doit être assurée sous 48h ouvrées maximum. Toute facturation est illégale et peut être signalée à l'ACPR.",
        },
        {
          q: "Comment vérifier qu'une attestation RC Pro est authentique ?",
          a: "Contacter directement l'assureur cité par téléphone (jamais le numéro figurant sur l'attestation suspecte — toujours via le standard officiel). Vérifier l'immatriculation ORIAS du courtier intermédiaire sur orias.fr. En cas de doute persistant : huissier pour constat d'authenticité.",
        },
        {
          q: 'Quels plafonds choisir pour une RC Pro ?',
          a: 'Recommandation standard : minimum 1,5 M€ par sinistre + 3 M€ annuel cumulé pour la majorité des activités. Pour conseil IT à fort impact (gestion de système critique) : 5-10 M€ par sinistre. Pour conseil financier (CGP, CIF) : 5 M€ par sinistre obligatoire (homologation ACPR). Plafond trop bas = exposition patrimoine personnel en cas de sinistre majeur.',
        },
      ]}
    />
  )
}
