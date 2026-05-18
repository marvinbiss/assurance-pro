/**
 * Auto-entrepreneur — "assurance rc pro auto entrepreneur" (350 vol, KD 5, CPC 500€) MONEY
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
const SLUG = 'assurance-rc-pro-auto-entrepreneur'
const TITLE = 'Assurance RC Pro Auto Entrepreneur — Souscription, comparatif, tarifs'
const TAGLINE =
  'Souscrire une RC Pro en tant qu&apos;auto-entrepreneur : démarches simplifiées, comparatif 5 assureurs, tarifs 95-450€ par an. Hiscox best price, Stello digital.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Assurance RC Pro auto-entrepreneur : souscription en ligne 5 min. Hiscox 95-220€ par an (services), April Pro 250-450€ par an (BTP). Comparatif honnête 5 assureurs.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Souscrire une assurance RC Pro pour votre activité d'auto-entrepreneur (ou micro-entrepreneur) est une démarche simplifiée : pas besoin de Kbis, pas besoin de bilan, juste un SIRET valide et une attestation d'activité ACOSS. Cette page détaille les pièces nécessaires, le comparatif des 5 assureurs leaders (Hiscox, Stello, Allianz Pro, MMA Pro, April Pro BTP) et les démarches de souscription en ligne en 5 minutes."
      legalReference="art. L. 124-3 + L. 121-2 C. assur."
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="rc-pro"
      expertBio={EXPERT_SERVICES}
      comparatifRows={COMPARATIF_SERVICES}
      benefits={[
        {
          icon: '⚡',
          title: 'Souscription 5 min',
          desc: 'Devis instantané + attestation téléchargeable immédiatement',
        },
        {
          icon: '📄',
          title: 'Pas de Kbis requis',
          desc: 'AE = pas de Kbis, attestation ACOSS suffisante',
        },
        {
          icon: '💰',
          title: '95-450€ par an',
          desc: 'Services AE 95-220€ • BTP AE 250-450€ • Médical ou régl. 800€+',
        },
        {
          icon: '🔍',
          title: '5 assureurs comparés',
          desc: 'Hiscox, Stello, Allianz Pro, MMA Pro, April Pro',
        },
      ]}
      sections={[
        {
          h2: 'Pièces nécessaires pour souscription AE',
          body: (
            <ol>
              <li>
                <strong>SIRET valide</strong> (vérifié Insee.fr — &lt; 3 mois)
              </li>
              <li>
                <strong>Attestation ACOSS — URSSAF</strong> (justificatif activité AE —
                téléchargeable autoentrepreneur.urssaf.fr)
              </li>
              <li>
                <strong>CNI ou passeport recto-verso</strong>
              </li>
              <li>
                <strong>Justificatif activité</strong> : diplôme, CAP ou BEP, qualification,
                expérience
              </li>
              <li>
                <strong>CA prévisionnel 12 mois</strong> (estimation honnête)
              </li>
              <li>
                <strong>RIB</strong> pour paiement
              </li>
              <li>
                <strong>Antécédents sinistralité 36 mois</strong> (déclaration honneur)
              </li>
            </ol>
          ),
        },
        {
          h2: 'Comparatif 5 assureurs RC Pro AE 2026',
          body: (
            <ul>
              <li>
                <strong>Hiscox</strong> : 🥇 Best price AE services intellectuels (95-220€ par an),
                postériorité 10 ans (unique marché), plafond 1M€ standard. Souscription en ligne 5
                min.
              </li>
              <li>
                <strong>Stello</strong> : challenger 100% digital. Tarif AE 90-200€ par an,
                postériorité 5 ans. App mobile native.
              </li>
              <li>
                <strong>Allianz Pro</strong> : couverture la plus large (services + BTP +
                agriculture). Tarif AE 180-380€ par an. Réseau d&apos;agences.
              </li>
              <li>
                <strong>MMA Pro</strong> : équilibré, réseau 1 500+ agences. Tarif AE 250-450€ par
                an. Pack multi-contrats si auto ou habitation.
              </li>
              <li>
                <strong>April Pro BTP</strong> : 🥇 Best price AE BTP (250-450€ par an, en
                complément décennale 950-2 800€ par an). Souscription en ligne 24h.
              </li>
            </ul>
          ),
        },
        {
          h2: 'Démarches étape par étape',
          body: (
            <ol>
              <li>
                <strong>Choisir activité précise</strong> : services intellectuels, BTP, esthétique,
                formation, etc. (impact direct sur tarif)
              </li>
              <li>
                <strong>Devis personnalisé</strong> sur Hiscox, Stello ou April Pro (5-10 min de
                remplissage)
              </li>
              <li>
                <strong>Comparer offres</strong> : plafond, franchise, postériorité, exclusions,
                options (cyber, protection juridique)
              </li>
              <li>
                <strong>Upload pièces digitales</strong> : SIRET, ACOSS, CNI, RIB
              </li>
              <li>
                <strong>Paiement sécurisé</strong> : annuel (-3-7%) ou mensuel
              </li>
              <li>
                <strong>Téléchargement attestation</strong> : immédiat dans espace adhérent
              </li>
              <li>
                <strong>Envoi attestation aux clients</strong> qui en font la demande
              </li>
            </ol>
          ),
        },
      ]}
      faq={[
        {
          q: 'AE — micro-entrepreneur : pareil pour la RC Pro ?',
          a: 'OUI, les termes &quot;auto-entrepreneur&quot; et &quot;micro-entrepreneur&quot; désignent le même statut depuis 2016 (fusion régimes). Les assureurs traitent les 2 identiquement. Tarifs identiques.',
        },
        {
          q: 'Hiscox ou Stello pour un AE freelance ?',
          a: 'Hiscox = best price global services intellectuels + postériorité 10 ans (unique). Stello = 100% digital + app mobile native. Tarifs très proches (95-220€ par an). Hiscox gagne sur postériorité.',
        },
        {
          q: 'Souscrire une RC Pro AE sans expérience préalable ?',
          a: 'Possible chez certains assureurs (Hiscox, Stello acceptent débutants). D&apos;autres exigent 1-3 ans d&apos;expérience minimum (Allianz Pro, AXA Pro). Pour AE BTP : qualification CAP, BEP ou diplôme ou 3 ans d&apos;expérience requis chez la plupart.',
        },
        {
          q: 'Combien de temps pour recevoir mon attestation AE ?',
          a: 'Hiscox — Stello : immédiat après paiement (téléchargement espace adhérent). Allianz Pro — MMA : 24-48h ouvrées. April Pro BTP : 24h ouvrées. En cas urgence chantier : choisir Hiscox ou Stello pour réception immédiate.',
        },
      ]}
      relatedMetiers={[
        {
          name: 'RC Pro Auto-Entrepreneur (vue globale)',
          slug: 'responsabilite-civile-professionnelle-auto-entrepreneur',
        },
        { name: 'Assurance RC Pro (vue globale)', slug: 'assurance-rc-pro' },
        { name: 'RC Pro micro-entreprise', slug: 'rc-pro-micro-entreprise' },
        { name: 'Hiscox RC Pro', slug: 'hiscox-rc-pro' },
        { name: 'Décennale auto-entrepreneur', slug: 'assurance-decennale-auto-entrepreneur' },
      ]}
    />
  )
}
