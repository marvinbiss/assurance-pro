/**
 * Pilier — "pro btp mutuelle remboursement mon compte" (TIER S — 800 vol/mois, KD 4)
 * Pattern : pages "compte client / remboursement" = capture intent navigational + utility.
 * Ce type de page yield 119.7 vis/mois moyen Ahrefs (top type avec auto-entrepreneur).
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400

const SLUG = 'pro-btp-mutuelle-remboursement-mon-compte'
const TITLE = 'PRO BTP Mutuelle — Remboursement et mon compte adhérent'
const TAGLINE =
  "Guide complet pour gérer vos remboursements PRO BTP : accès à l'espace adhérent, télétransmission, démarches papier, délais et solutions en cas de retard."

export const metadata: Metadata = {
  title: `${TITLE} | Vivos Assurance`,
  description:
    'PRO BTP mutuelle remboursement : accès mon compte adhérent probtp.com, télétransmission carte vitale, envoi factures papier, délais 7 jours ouvrés. Aide en cas de retard.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'espace adhérent PRO BTP centralise vos remboursements, attestations, mises à jour de bénéficiaires et téléchargements (carte tiers payant, attestation Madelin, justificatifs fiscaux). Ce guide pratique détaille pas à pas la connexion, les démarches de remboursement (télétransmission automatique + envois manuels), les délais standards (7 jours ouvrés), les solutions en cas de retard, et les alternatives si vous n'êtes pas satisfait de PRO BTP."
      benefits={[
        {
          icon: '🔐',
          title: 'Mon compte 24/7',
          desc: 'probtp.com — identifiant carte tiers payant + mot de passe',
        },
        {
          icon: '⚡',
          title: 'Télétransmission auto',
          desc: 'Pour les pros de santé conventionnés (carte vitale + tiers payant)',
        },
        {
          icon: '📄',
          title: 'Remboursement papier',
          desc: 'Pour médecines douces, optique RAC0+, lentilles : envoi facture acquittée',
        },
        {
          icon: '📞',
          title: 'Service adhérents',
          desc: '0 970 80 80 80 (prix appel local) — Lun-Ven 8h-19h',
        },
      ]}
      sections={[
        {
          h2: 'Accéder à mon compte PRO BTP',
          body: (
            <>
              <p>
                <strong>URL officielle</strong> :{' '}
                <a href="https://www.probtp.com" target="_blank" rel="noopener noreferrer">
                  https://www.probtp.com
                </a>{' '}
                → bouton &quot;Mon compte&quot; en haut à droite.
              </p>
              <p>
                <strong>Identifiants nécessaires</strong> :
              </p>
              <ul>
                <li>Numéro d&apos;adhérent (présent sur votre carte tiers payant)</li>
                <li>Mot de passe (créé à la première connexion, ou réinitialisable par email)</li>
              </ul>
              <p>
                <strong>Première connexion</strong> : cliquer sur &quot;Je crée mon compte&quot;,
                renseigner numéro adhérent + date de naissance + email → recevoir mot de passe
                temporaire par email → définir mot de passe personnel.
              </p>
              <p>
                <strong>Mot de passe oublié</strong> : cliquer &quot;Mot de passe oublié&quot;,
                renseigner numéro adhérent → mail de réinitialisation envoyé sous 1h.
              </p>
            </>
          ),
        },
        {
          h2: 'Comment fonctionne le remboursement PRO BTP ?',
          body: (
            <>
              <h3>Cas 1 — Télétransmission automatique (le plus courant)</h3>
              <p>
                Pour les <strong>professionnels de santé conventionnés Sécu</strong>
                (généraliste, spécialiste, dentiste signataire CCAM, pharmacien) :
              </p>
              <ol>
                <li>Vous présentez carte vitale + carte tiers payant à la consultation</li>
                <li>La Sécu rembourse sa part directement au pro de santé (tiers payant)</li>
                <li>PRO BTP reçoit l&apos;info via télétransmission NOEMIE</li>
                <li>
                  PRO BTP rembourse la part complémentaire sur votre compte bancaire sous 3-7 jours
                  ouvrés
                </li>
              </ol>
              <h3>Cas 2 — Remboursement avec facture papier</h3>
              <p>
                Pour les <strong>frais hors télétransmission</strong> (ostéopathe non conventionné,
                lunettes hors RAC0, lentilles, médecines douces, vaccins non remboursés) :
              </p>
              <ol>
                <li>Vous payez la facture en totalité</li>
                <li>
                  Vous envoyez la facture acquittée + RIB via votre espace adhérent (upload) OU par
                  courrier
                </li>
                <li>
                  PRO BTP analyse et rembourse selon votre formule (S1-S4) sous 7-10 jours ouvrés
                </li>
              </ol>
            </>
          ),
        },
        {
          h2: 'Délais et solutions en cas de retard',
          body: (
            <>
              <p>
                <strong>Délais standards</strong> :
              </p>
              <ul>
                <li>Télétransmission : 3-7 jours ouvrés</li>
                <li>Envoi papier : 7-10 jours ouvrés après réception complète</li>
                <li>Hospitalisation (prise en charge) : 48h-72h pour accord</li>
              </ul>
              <p>
                <strong>Si retard &gt; 15 jours</strong> :
              </p>
              <ol>
                <li>
                  Vérifier dans votre espace adhérent que le dossier a été reçu et n&apos;est pas en
                  attente de pièce
                </li>
                <li>Appeler le 0 970 80 80 80 avec votre numéro adhérent</li>
                <li>Envoyer un email à reclamation@probtp.com avec copie du dossier</li>
                <li>
                  Si toujours sans réponse sous 30 jours : saisir le Médiateur de la Mutualité
                  Française (saisine en ligne)
                </li>
              </ol>
            </>
          ),
        },
        {
          h2: 'Alternatives à PRO BTP si insatisfaction',
          body: (
            <>
              <p>
                Si vous êtes en TNS BTP (artisan, EI, EURL, SASU dirigeant) et insatisfait des
                délais, garanties ou tarifs PRO BTP, vous pouvez résilier après 1 an
                d&apos;engagement (loi infra-annuelle) et basculer vers :
              </p>
              <ul>
                <li>
                  <strong>April Pro Santé</strong> : meilleur prix sur les profils TNS jeunes
                  (-15-25% vs PRO BTP S3)
                </li>
                <li>
                  <strong>Harmonie Mutuelle BTP</strong> : alternative paritaire (groupe VYV) avec
                  services proches PRO BTP
                </li>
                <li>
                  <strong>MMA Mutuelle Pro</strong> : flexibilité formules + bonne couverture
                  optique/dentaire
                </li>
                <li>
                  <strong>Aon Santé Pro</strong> : haut de gamme pour dirigeants avec gros besoins
                </li>
              </ul>
              <p>
                Notre courtier partenaire ORIAS peut comparer gratuitement votre formule PRO BTP
                actuelle vs ces 4 alternatives — gain typique 200-600€/an sur les profils TNS
                jeunes.
              </p>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'Quel est le numéro de téléphone du service adhérent PRO BTP ?',
          a: "0 970 80 80 80 (prix appel local, du Lundi au Vendredi de 8h à 19h). Munissez-vous de votre numéro adhérent (sur votre carte tiers payant) avant l'appel.",
        },
        {
          q: 'Comment télécharger mon attestation PRO BTP ?',
          a: "Connectez-vous sur probtp.com → Mon compte → Onglet 'Mes documents' → 'Attestation de droits'. PDF téléchargeable immédiatement avec votre numéro d'adhérent, période de validité et niveau de couverture.",
        },
        {
          q: 'Mon remboursement PRO BTP n&apos;arrive pas, que faire ?',
          a: '1) Vérifier dans Mon compte le statut du dossier (reçu/en cours/payé). 2) Vérifier que votre RIB est à jour. 3) Si > 15 jours sans nouvelle, appeler le 0 970 80 80 80. 4) Email à reclamation@probtp.com en cas de blocage.',
        },
        {
          q: 'Puis-je résilier PRO BTP pour aller chez un autre assureur ?',
          a: "Oui. Pour contrat individuel TNS : résiliation à tout moment après 1 an d'engagement (loi infra-annuelle 2020). Préavis 1 mois. Envoi lettre recommandée AR à PRO BTP. Important : conserver votre attestation de droits pour la transition (continuité de couverture).",
        },
      ]}
      relatedMetiers={[
        { name: 'PRO BTP Mutuelle (vue globale)', slug: 'pro-btp-mutuelle' },
        { name: 'Mutuelle pro BTP (comparatif)', slug: 'mutuelle-pro-btp' },
        { name: 'Mutuelle TNS', slug: 'mutuelle-tns' },
        { name: 'Mutuelle dirigeant', slug: 'mutuelle-dirigeant' },
        { name: 'Réclamation mutuelle', slug: 'reclamation' },
      ]}
    />
  )
}
