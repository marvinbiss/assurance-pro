/**
 * Pilier — "mma assurance rc pro" (200 vol, KD 4, CPC 250€)
 * Variante de /rc-pro-mma avec angle SOUSCRIPTION + démarches MMA.
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import {
  COMPARATIF_SERVICES,
  EXPERT_SERVICES,
  STATS_DEFAULT,
} from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'mma-assurance-rc-pro'
const TITLE = 'MMA Assurance RC Pro — Souscription, démarches, agences 2026'
const TAGLINE =
  'Souscrire votre RC Pro chez MMA : démarches en agence / en ligne, devis personnalisé, pack multi-contrats. Guide complet 2026.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'MMA Assurance RC Pro : souscription via 1 500+ agences ou en ligne mma.fr. Pack RC Pro + multirisque + flotte = remise -15-25%. Devis 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="MMA (Mutuelles du Mans Assurance, groupe Covéa) propose une RC Pro accessible via 2 canaux principaux : son réseau de 1 500+ agences physiques en France (idéal si vous préférez contact courtier direct) ou en ligne via mma.fr. Cette page détaille les démarches de souscription, les avantages du pack multi-contrats MMA, et les outils en ligne disponibles dans l'espace adhérent."
      legalReference="art. L. 124-3 + L. 121-2 C. assur."
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="rc-pro"
      expertBio={EXPERT_SERVICES}
      comparatifRows={COMPARATIF_SERVICES}
      benefits={[
        {
          icon: '🏛️',
          title: '1 500+ agences',
          desc: 'Réseau physique national, conseil en présentiel disponible',
        },
        {
          icon: '💻',
          title: 'mma.fr en ligne',
          desc: 'Devis personnalisé, espace adhérent, déclaration sinistres',
        },
        {
          icon: '📦',
          title: 'Pack multi-contrats',
          desc: 'RC Pro + Multirisque + Flotte + Mutuelle = -15-25% paquet',
        },
        {
          icon: '⏱️',
          title: 'Attestation 24-48h',
          desc: 'Délai standard après validation dossier complet',
        },
      ]}
      sections={[
        {
          h2: 'Souscrire MMA RC Pro en agence',
          body: (
            <ol>
              <li>
                Localiser votre agence MMA via <strong>mma.fr ou agence-mma</strong> (recherche par
                code postal)
              </li>
              <li>Prendre RDV (téléphone ou en ligne) — 1 semaine de délai typique</li>
              <li>
                Préparer dossier : SIRET, K-bis (SARL ou SAS) ou attestation activité (AE),
                justificatif identité
              </li>
              <li>RDV en agence : étude personnalisée 30-60 min avec conseiller MMA</li>
              <li>Recevoir devis détaillé + IPID</li>
              <li>Signature contrat physique ou en ligne après réflexion</li>
              <li>Attestation délivrée sous 24-48h</li>
            </ol>
          ),
        },
        {
          h2: 'Souscrire MMA RC Pro en ligne',
          body: (
            <ol>
              <li>
                Aller sur <strong>mma.fr</strong> → onglet &quot;Pro et Entreprises&quot; → &quot;RC
                Pro&quot;
              </li>
              <li>Renseigner activité, statut juridique, CA, ancienneté</li>
              <li>Recevoir devis instantané (10-15 min de remplissage)</li>
              <li>Options proposées : plafond, franchise, cyber, protection juridique</li>
              <li>Validation pièces digitales (upload SIRET, K-bis, RIB)</li>
              <li>Paiement sécurisé (CB ou prélèvement)</li>
              <li>Attestation téléchargeable dans espace adhérent immédiat</li>
            </ol>
          ),
        },
        {
          h2: 'Avantages du pack multi-contrats MMA',
          body: (
            <ul>
              <li>
                <strong>RC Pro + Multirisque Pro</strong> : -10-15% vs souscription séparée
              </li>
              <li>
                <strong>+ Flotte automobile</strong> : -15-20% total
              </li>
              <li>
                <strong>+ Mutuelle Pro</strong> : -20-25% total
              </li>
              <li>
                <strong>+ Décennale BTP</strong> (si artisan) : -15-20% global
              </li>
              <li>
                <strong>1 interlocuteur</strong> : 1 agent MMA gère tous vos contrats pro
              </li>
              <li>
                <strong>1 sinistre = 1 dossier</strong> : pas de ping-pong entre assureurs
              </li>
              <li>
                <strong>Programme fidélité</strong> : remises évolutives selon ancienneté
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'En agence ou en ligne, lequel choisir ?',
          a: 'En agence : idéal si activité complexe, multi-contrats, conseil personnalisé requis. En ligne : idéal si activité simple (AE freelance services), tarif compétitif souhaité, finalisation rapide.',
        },
        {
          q: 'Combien de temps pour avoir l&apos;attestation MMA RC Pro ?',
          a: 'En ligne : immédiate après paiement. En agence : 24-48h après validation dossier complet. Si dossier complexe (activité atypique) : jusqu&apos;à 5-7 jours pour expertise.',
        },
        {
          q: 'Quel pack MMA pour une SARL BTP ?',
          a: 'Pack idéal : RC Pro BTP + Décennale + Multirisque BTP + Flotte utilitaire + Mutuelle Pro BTP. Remise paquet -20-25% vs souscriptions séparées. Économie typique : 2 000-5 000€ par an pour SARL BTP 5-10 salariés.',
        },
        {
          q: 'MMA est-il moins cher que les autres assureurs ?',
          a: 'Pas systématiquement. MMA est compétitif sur SARL ou SAS PME avec pack multi-contrats. Pour AE freelance services simples, Hiscox ou Stello restent 30-50% moins chers. Notre courtier ORIAS peut comparer.',
        },
      ]}
      relatedMetiers={[
        { name: 'RC Pro MMA (vue globale)', slug: 'rc-pro-mma' },
        { name: 'Assurance RC Pro (pilier)', slug: 'assurance-rc-pro' },
        { name: 'Multirisque Pro MMA', slug: 'multirisque-pro-mma' },
        { name: 'Hiscox RC Pro (alternative)', slug: 'hiscox-rc-pro' },
        { name: 'Comparateur RC Pro', slug: 'comparateur-rc-pro' },
      ]}
    />
  )
}
