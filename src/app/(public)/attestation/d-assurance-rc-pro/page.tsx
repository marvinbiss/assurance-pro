/**
 * Attestation — "attestation d'assurance rc pro" (100 vol, KD 3, CPC 500€) MONEY
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'attestation/d-assurance-rc-pro'
const TITLE = "Attestation d'Assurance RC Pro — Obtenir + modèle PDF"
const TAGLINE =
  "Comment obtenir votre attestation d'assurance RC Pro : démarches, modèle PDF, mentions obligatoires et utilisation. Téléchargeable en 24h après souscription."

export const metadata: Metadata = {
  title: `${TITLE} | Vivos Assurance`,
  description:
    "Attestation d'assurance RC Pro : modèle PDF, mentions obligatoires (n° contrat, plafond, période, ORIAS), démarches en 24h. À présenter aux clients B2B.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'attestation d'assurance RC Pro est un document officiel délivré par votre assureur qui prouve que votre Responsabilité Civile Professionnelle est en cours de validité. Indispensable pour : 1) Présenter aux clients B2B avant signature de contrat, 2) Justifier conformité auprès des donneurs d'ordre, 3) Renouveler une carte professionnelle (Carte T agent immobilier, Carte VTC, etc.). Cette page détaille les mentions obligatoires, le modèle type, et les démarches d'obtention rapide."
      legalReference="art. L. 124-3 + L. 121-2 C. assur. + arrêté 6 décembre 2022 (cliquabilité ORIAS)"
      benefits={[
        {
          icon: '📄',
          title: 'Document officiel',
          desc: 'Délivré par assureur agréé ACPR — preuve légale de couverture',
        },
        {
          icon: '⚡',
          title: 'Téléchargeable 24h',
          desc: 'Après souscription RC Pro (Hiscox/Stello immédiat)',
        },
        {
          icon: '✅',
          title: 'Mentions obligatoires',
          desc: 'N° contrat, plafond, période, ORIAS, identité assuré',
        },
        {
          icon: '💼',
          title: 'Présentation B2B',
          desc: 'Indispensable contrats clients > 10k€ ou marchés publics',
        },
      ]}
      sections={[
        {
          h2: 'Mentions obligatoires sur attestation RC Pro',
          body: (
            <ul>
              <li>
                <strong>Identité de l&apos;assureur</strong> : raison sociale + adresse + agrément
                ACPR
              </li>
              <li>
                <strong>Identité de l&apos;assuré</strong> : nom/raison sociale + SIRET + adresse
              </li>
              <li>
                <strong>Numéro de contrat</strong> : référence interne assureur
              </li>
              <li>
                <strong>Période de validité</strong> : date début + date fin (1 an renouvelable)
              </li>
              <li>
                <strong>Plafond par sinistre</strong> : montant maximum indemnisable (500k€-10M€)
              </li>
              <li>
                <strong>Plafond annuel cumulé</strong> : limite tous sinistres / an
              </li>
              <li>
                <strong>Activité couverte</strong> : nomenclature précise (services intellectuels,
                BTP, médical, etc.)
              </li>
              <li>
                <strong>Numéro ORIAS</strong> du courtier intermédiaire (si applicable)
              </li>
              <li>
                <strong>Mention &quot;Conforme au Code des assurances&quot;</strong>
              </li>
            </ul>
          ),
        },
        {
          h2: 'Comment obtenir votre attestation',
          body: (
            <ol>
              <li>
                <strong>Souscription RC Pro</strong> : si pas encore fait, demander devis
                (Hiscox/Stello = best price, attestation immédiate)
              </li>
              <li>
                <strong>Espace adhérent</strong> : connecter sur portail assureur avec n° contrat
              </li>
              <li>
                <strong>Onglet &quot;Mes documents&quot;</strong> → &quot;Attestation RC Pro&quot;
              </li>
              <li>
                <strong>Téléchargement PDF</strong> : immédiat (Hiscox/Stello) ou sous 24h ouvrées
                (autres)
              </li>
              <li>
                <strong>Envoi aux clients</strong> : par email avec votre proposition commerciale
              </li>
              <li>
                <strong>Affichage en agence</strong> : si vous avez local commercial
              </li>
            </ol>
          ),
        },
        {
          h2: 'Cas concrets où présenter l&apos;attestation',
          body: (
            <ul>
              <li>
                <strong>Client B2B grand compte</strong> avant signature contrat &gt; 10k€
              </li>
              <li>
                <strong>Marchés publics</strong> : dossier de candidature aux appels d&apos;offres
              </li>
              <li>
                <strong>Renouvellement Carte T</strong> agent immobilier (Loi Hoguet)
              </li>
              <li>
                <strong>Renouvellement Carte VTC</strong> (décret 2014-371)
              </li>
              <li>
                <strong>Inscription Ordre</strong> : avocat, médecin, expert-comptable, architecte
              </li>
              <li>
                <strong>Conventions de courtage</strong> avec partenaires distributeurs
              </li>
              <li>
                <strong>Cession ou vente d&apos;entreprise</strong> : audit acquéreur
              </li>
              <li>
                <strong>Contrôle ACPR</strong> ou administration fiscale
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: "Délai pour obtenir l'attestation RC Pro ?",
          a: 'Immédiat (téléchargement direct espace adhérent) chez Hiscox et Stello. 24h ouvrées chez April Pro BTP. 24-48h Allianz Pro / MMA. 48-72h AXA Pro. Notre courtier ORIAS facilite démarches express.',
        },
        {
          q: 'Combien de temps est valable une attestation ?',
          a: '1 an à compter de la date d&apos;effet du contrat. Renouvellement automatique chaque année à la date anniversaire (tacite reconduction). Si paiement échu : suspension contrat — attestation devient invalide.',
        },
        {
          q: 'Que faire si je perds mon attestation ?',
          a: 'Reconnecter sur espace adhérent + télécharger nouveau PDF. Aucun frais. Ou demander à votre assureur par email (réponse 24-48h). Attestation toujours téléchargeable tant que contrat actif et à jour.',
        },
        {
          q: 'Peut-on présenter une attestation provisoire ?',
          a: 'Oui, certains assureurs émettent une attestation provisoire 1 mois avant signature contrat définitif. Valable mais avec mentions &quot;provisoire&quot; ou &quot;avant édition&quot;. Privilégier attestation définitive si délai possible.',
        },
      ]}
      relatedMetiers={[
        { name: 'Attestation RC Pro', slug: 'attestation/rc-pro' },
        {
          name: 'Attestation RC Pro complète',
          slug: 'attestation/responsabilite-civile-professionnelle',
        },
        { name: 'Attestation décennale', slug: 'attestation/decennale' },
        { name: 'Assurance RC Pro (vue globale)', slug: 'assurance-rc-pro' },
        { name: 'Devis RC Pro', slug: 'devis/rc-pro' },
      ]}
    />
  )
}
