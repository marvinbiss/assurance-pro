/**
 * Devis — "devis rc pro" (400 vol, KD 0, CPC 600€) MONEY
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'devis/rc-pro'
const TITLE = 'Devis RC Pro — Gratuit en 5 min, comparatif 5 assureurs'
const TAGLINE =
  'Devis RC Pro GRATUIT en 5 minutes pour tous statuts (AE, EI, SARL, SAS). Comparatif Hiscox, Stello, Allianz, MMA, AXA. Attestation immédiate.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Devis RC Pro gratuit 5 min. Hiscox 95€/an best price AE, Stello 90€/an digital, Allianz 280€/an SARL. Tous statuts juridiques. Sans engagement.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Demande de devis RC Pro GRATUITE et SANS ENGAGEMENT en 5 minutes pour tous statuts juridiques : auto-entrepreneur, EI, EURL, SARL, SASU, SAS, profession libérale. Notre courtier ORIAS compare les 5 assureurs leaders France (Hiscox, Stello, Allianz Pro, MMA Pro, AXA Pro) selon votre activité, CA et besoins spécifiques. Attestation téléchargeable immédiatement chez Hiscox et Stello."
      legalReference="art. L. 124-3 + L. 121-2 C. assur."
      benefits={[
        {
          icon: '🆓',
          title: 'Gratuit sans engagement',
          desc: 'Devis comparatif 100% transparent, vous choisissez librement',
        },
        {
          icon: '⚡',
          title: '5 minutes',
          desc: 'Formulaire simple, retour email sous 30 min ouvrées',
        },
        {
          icon: '🔍',
          title: '5 leaders comparés',
          desc: 'Hiscox + Stello + Allianz Pro + MMA Pro + AXA Pro',
        },
        {
          icon: '📋',
          title: 'Attestation immédiate',
          desc: 'Téléchargement direct chez Hiscox / Stello',
        },
      ]}
      sections={[
        {
          h2: 'Pour qui le devis RC Pro',
          body: (
            <ul>
              <li>
                <strong>Auto-entrepreneurs</strong> tous secteurs : services, BTP, esthétique,
                formation
              </li>
              <li>
                <strong>Freelances</strong> services intellectuels (consultant, IT, marketing,
                design)
              </li>
              <li>
                <strong>EI / EURL</strong> régime micro ou réel
              </li>
              <li>
                <strong>SASU / SAS</strong> services et commerce
              </li>
              <li>
                <strong>SARL</strong> tous secteurs
              </li>
              <li>
                <strong>Professions réglementées</strong> : médical, juridique, immobilier, BTP,
                taxi/VTC
              </li>
            </ul>
          ),
        },
        {
          h2: 'Démarches devis RC Pro en 5 minutes',
          body: (
            <ol>
              <li>
                <strong>Remplir formulaire</strong> : statut juridique, activité précise, CA
                prévisionnel, options (cyber, protection juridique)
              </li>
              <li>
                <strong>Courtier compare</strong> les 5 assureurs en temps réel
              </li>
              <li>
                <strong>Recevoir devis détaillé</strong> par email sous 30 min : tarif + plafond +
                franchise + postériorité + exclusions clés
              </li>
              <li>
                <strong>Comparer</strong> les offres (tableau récapitulatif inclus)
              </li>
              <li>
                <strong>Souscrire en ligne</strong> chez assureur choisi
              </li>
              <li>
                <strong>Attestation immédiate</strong> (Hiscox/Stello) ou sous 24-48h (autres)
              </li>
            </ol>
          ),
        },
        {
          h2: 'Tarifs RC Pro par statut (best price 2026)',
          body: (
            <ul>
              <li>
                <strong>AE services intellectuels</strong> : Hiscox 95-220€/an
              </li>
              <li>
                <strong>AE BTP</strong> : April Pro 250-450€/an (en complément décennale)
              </li>
              <li>
                <strong>AE esthétique / coaching</strong> : Allianz Pro 180-350€/an
              </li>
              <li>
                <strong>SARL services CA 100-300k€</strong> : Hiscox/Allianz 350-900€/an
              </li>
              <li>
                <strong>SASU services CA &lt; 100k€</strong> : Hiscox 350-550€/an
              </li>
              <li>
                <strong>SAS PME CA 300k-1M€</strong> : Allianz Pro / MMA 800-1 500€/an
              </li>
              <li>
                <strong>SARL BTP 3 salariés</strong> : April Pro 600-1 200€/an (+ décennale)
              </li>
              <li>
                <strong>Profession libérale</strong> : 800-5 000€/an selon spé (médical/juridique)
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Quelle est la RC Pro la moins chère ?',
          a: 'Hiscox = best price global AE/freelance services intellectuels (95-220€/an avec plafond 1M€ et postériorité 10 ans). Stello challenger 100% digital (90-200€/an). Pour AE BTP : April Pro 250-450€/an (+ décennale 950-2 800€/an).',
        },
        {
          q: 'Tous statuts juridiques sont couverts ?',
          a: 'OUI. Nos 5 assureurs partenaires couvrent : AE, EI, EURL, SARL, SASU, SAS, profession libérale, association loi 1901. Tarifs ajustés selon statut. Quelques assureurs préfèrent certains statuts (Hiscox = AE/SASU services, April Pro = AE/SARL BTP).',
        },
        {
          q: 'Souscription en ligne possible ?',
          a: 'OUI chez Hiscox et Stello (100% en ligne, attestation immédiate). Allianz Pro et MMA proposent en ligne pour profils simples (AE/SARL services). AXA Pro requiert souvent passage agence. Notre courtier accompagne tous canaux.',
        },
        {
          q: 'RC Pro avec ou sans cyber-assurance ?',
          a: 'AVEC cyber-assurance si : activité IT, agence digitale, e-commerce, gestion données client. SANS si : activité service intellectuel pur sans données sensibles. Coût combiné RC Pro + cyber : +150-2 000€/an selon profil.',
        },
      ]}
      relatedMetiers={[
        { name: 'Assurance RC Pro (vue globale)', slug: 'assurance-rc-pro' },
        { name: 'Devis RC Pro générique', slug: 'devis/responsabilite-civile-professionnelle' },
        { name: 'RC Pro pas chère', slug: 'rc-pro-pas-cher' },
        { name: 'Comparateur RC Pro', slug: 'comparateur-rc-pro' },
        { name: 'Hiscox RC Pro', slug: 'hiscox-rc-pro' },
      ]}
    />
  )
}
