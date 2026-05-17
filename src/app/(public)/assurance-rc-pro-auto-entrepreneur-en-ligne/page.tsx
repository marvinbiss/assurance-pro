/**
 * Souscription — "assurance rc pro auto-entrepreneur en ligne" (150 vol, KD 8, CPC 500€)
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
const SLUG = 'assurance-rc-pro-auto-entrepreneur-en-ligne'
const TITLE = 'Assurance RC Pro Auto-Entrepreneur En Ligne — Souscription 5 min'
const TAGLINE =
  'Assurance RC Pro auto-entrepreneur 100% en ligne. Hiscox 95€ par an best price. Souscription 5 min, attestation immédiate. Sans rendez-vous.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'RC Pro auto-entrepreneur en ligne : Hiscox 95€ par an, Stello 90€ par an. Souscription 5 min, attestation immédiate PDF. Adapté freelance services + BTP.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Auto-entrepreneur : souscrire votre RC Pro 100% en ligne en 5 minutes — parcours conçu spécifiquement pour AE ou micro-entreprise avec interface simplifiée (saisie minimale), tarifs adaptés (95€-450€ par an selon activité) et attestation téléchargeable immédiate. Cette page guide pas à pas le freelance — artisan AE à travers le parcours digital, avec recommandations par type d'activité."
      legalReference="art. L. 124-3 + L. 121-2 C. assur. + Loi Spinetta si BTP"
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="rc-pro"
      expertBio={EXPERT_SERVICES}
      comparatifRows={COMPARATIF_SERVICES}
      benefits={[
        {
          icon: '🏠',
          title: 'Conçu pour AE',
          desc: 'Interface simplifiée, saisie minimale, tarifs adaptés',
        },
        {
          icon: '💰',
          title: 'Best price 95€ par an',
          desc: 'Hiscox AE services intellectuels — plafond 1M€ inclus',
        },
        {
          icon: '📱',
          title: 'Mobile-friendly',
          desc: 'Souscription possible smartphone Hiscox ou Stello',
        },
        {
          icon: '⚡',
          title: 'Attestation immédiate',
          desc: 'PDF téléchargeable dès paiement validé',
        },
      ]}
      sections={[
        {
          h2: 'Top assureurs RC Pro AE en ligne 2026',
          body: (
            <ul>
              <li>
                <strong>Hiscox</strong> 🥇 : best AE services intellectuels (consultant, IT,
                designer, photographe). 95-220€ par an. Plafond 1M€. Postériorité 10 ans (unique).
                Pure digital.
              </li>
              <li>
                <strong>Stello</strong> 🥈 : challenger 100% digital. 90-200€ par an AE services.
                App mobile native. Postériorité 5 ans.
              </li>
              <li>
                <strong>April Pro BTP</strong> : best AE BTP (plombier, peintre, maçon,
                électricien). 250-450€ par an RC Pro + décennale combinée.
              </li>
              <li>
                <strong>Allianz Pro</strong> : multi-activités. AE coach, esthéticienne, services
                personnes. 180-380€ par an.
              </li>
              <li>
                <strong>Wakam</strong> : spécialiste mobilité AE VTC, livreur. 280-450€ par an
                (2-en-1 auto+RC).
              </li>
            </ul>
          ),
        },
        {
          h2: 'Documents AE pour souscription en ligne',
          body: (
            <ul>
              <li>
                <strong>SIRET AE</strong> : obtenu via INPI Guichet Unique après immatriculation
              </li>
              <li>
                <strong>ACOSS attestation</strong> : - de 3 mois (équivalent Kbis pour AE)
              </li>
              <li>
                <strong>RIB IBAN AE</strong> : prélèvement automatique annuel ou mensuel
              </li>
              <li>
                <strong>Pièce identité AE</strong> : CNI ou passeport
              </li>
              <li>
                <strong>Cas BTP</strong> : 10 ans expérience pour décennale (CV + attestations +
                certificats)
              </li>
              <li>
                <strong>Cas VTC</strong> : carte VTC + diplôme + visite médicale aptitude
              </li>
              <li>
                <strong>Cas formateur agréé</strong> : numéro déclaration d&apos;activité + diplôme
              </li>
            </ul>
          ),
        },
        {
          h2: 'Recommandations AE par activité',
          body: (
            <ul>
              <li>
                <strong>Consultant IT freelance</strong> : 🥇 Hiscox 95-180€ par an (best +
                cyber-assurance option)
              </li>
              <li>
                <strong>Designer — photographe AE</strong> : 🥇 Hiscox 120-220€ par an
              </li>
              <li>
                <strong>Coach professionnel — formateur AE</strong> : 🥇 Hiscox 150-280€ par an
              </li>
              <li>
                <strong>Coach sportif AE</strong> : 🥇 Allianz Pro 220-380€ par an (couverture
                corporelle)
              </li>
              <li>
                <strong>Esthéticienne — praticien bien-être AE</strong> : 🥇 Allianz Pro 180-320€
                par an
              </li>
              <li>
                <strong>Plombier AE BTP</strong> : 🥇 April Pro 300-450€ par an RC Pro + 1 400€ par
                an décennale
              </li>
              <li>
                <strong>Peintre AE BTP</strong> : 🥇 April Pro 250-350€ par an RC Pro + 950€ par an
                décennale
              </li>
              <li>
                <strong>VTC AE</strong> : 🥇 Wakam / Stello 280-450€ par an (2-en-1)
              </li>
              <li>
                <strong>Boutique e-commerce AE</strong> : 🥇 Hiscox 200-350€ par an
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'RC Pro AE obligatoire ?',
          a: 'Obligatoire si activité réglementée : BTP (décennale), libéral réglementé (avocat, expert-comptable, médical, architecte), immobilier (Hoguet), VTC (décret 2014-371), formateur agréé. Fortement recommandée pour autres (responsabilité civile contractuelle existe sans contrat = patrimoine perso exposé).',
        },
        {
          q: 'Tarifs AE plus bas qu&apos;en SARL ?',
          a: 'OUI : AE = -50-70% vs SARL équivalente. Raisons : 1) CA limité (77 700€ ou 188 700€ selon activité). 2) Responsabilité limitée au patrimoine pro déclaré. 3) Statut récent dématérialisé = parcours optimisé.',
        },
        {
          q: 'Démarrage activité aujourd&apos;hui : couvert demain ?',
          a: 'OUI chez Hiscox ou Stello : effet immédiat ou date au choix dans 30 jours. Attestation téléchargeable dès paiement. Cas BTP : 24-48h ouvrées (vérifications expérience). Cas spécifiques (médical) : 48-72h (validation diplôme Ordre).',
        },
      ]}
      relatedMetiers={[
        {
          name: 'RC Pro Auto-Entrepreneur (vue globale)',
          slug: 'responsabilite-civile-professionnelle-auto-entrepreneur',
        },
        { name: 'Assurance RC Pro Auto-Entrepreneur', slug: 'assurance-rc-pro-auto-entrepreneur' },
        { name: 'RC Pro AE pas chère', slug: 'assurance-rc-pro-auto-entrepreneur-pas-cher' },
        { name: 'Tarif RC Pro AE', slug: 'prix/tarif-rc-pro-auto-entrepreneur' },
        { name: 'Hiscox RC Pro', slug: 'hiscox-rc-pro' },
      ]}
    />
  )
}
