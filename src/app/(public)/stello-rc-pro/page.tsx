/**
 * Pilier — "stello rc pro" (200 vol, KD 0)
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
const SLUG = 'stello-rc-pro'
const TITLE = 'Stello RC Pro — Avis, garanties, tarifs digital 2026'
const TAGLINE =
  'Stello est un challenger 100% digital pour la RC Pro freelance et VTC. Analyse complète des garanties, tarifs 90-450€ par an et comparatif avec Hiscox, Wakam.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Stello RC Pro : assureur digital pure leader VTC + freelance services. Souscription 100% en ligne. Tarif AE 90-200€ par an, VTC 350-450€ par an. Comparatif Hiscox ou Wakam.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Stello est un assureur français challenger spécialisé dans les mobilités professionnelles et les services digitaux, créé en 2019. Son positionnement : 100% en ligne, souscription en 5 minutes, contrats modulaires, tarifs compétitifs sur AE freelance et chauffeurs VTC. Cette page analyse l'offre Stello RC Pro, ses points forts (digital pur, prix, contrat 2-en-1 auto+RC Pro pour VTC), ses limites, et la compare avec les leaders du segment (Hiscox, Wakam, Allianz Pro)."
      legalReference="art. L. 124-3 + L. 121-2 C. assur. + décret 2014-371 (VTC)"
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="rc-pro"
      expertBio={EXPERT_SERVICES}
      comparatifRows={COMPARATIF_SERVICES}
      benefits={[
        {
          icon: '💻',
          title: '100% digital',
          desc: 'Souscription en ligne 5 min, espace adhérent app mobile',
        },
        {
          icon: '🚕',
          title: 'Spé VTC + freelance',
          desc: 'Contrat 2-en-1 auto+RC Pro pour VTC, RC Pro pure pour freelance',
        },
        {
          icon: '💰',
          title: '90-450€ par an',
          desc: 'AE freelance 90-200€ • VTC AE 350-450€ • SARL services 300-700€',
        },
        {
          icon: '⚡',
          title: 'Attestation immédiate',
          desc: 'Téléchargeable après paiement (&lt; 5 minutes)',
        },
      ]}
      sections={[
        {
          h2: 'Points forts Stello RC Pro',
          body: (
            <ul>
              <li>
                <strong>Souscription 100% digital</strong> : 5 min de remplissage, validation pièces
                upload, paiement CB, attestation immédiate
              </li>
              <li>
                <strong>Tarifs compétitifs</strong> : AE freelance services 90-200€ par an (rivalise
                avec Hiscox best price)
              </li>
              <li>
                <strong>Contrat 2-en-1 VTC</strong> : auto + RC Pro VTC unifiés dans 1 seul contrat
                (simplifie gestion)
              </li>
              <li>
                <strong>App mobile native</strong> : gestion contrat + déclaration sinistres + chat
                support intégré
              </li>
              <li>
                <strong>Service client digital</strong> : chat + email réactifs, réponse &lt; 24h
              </li>
              <li>
                <strong>Pas de papier</strong> : 100% dématérialisé, écolo + rapide
              </li>
              <li>
                <strong>Plafond standard 1M€</strong> : suffisant pour la majorité AE ou freelance
              </li>
            </ul>
          ),
        },
        {
          h2: 'Points faibles Stello',
          body: (
            <ul>
              <li>
                <strong>Spécialisation limitée</strong> : Stello cible mobilité (VTC, taxi,
                livraison) + freelance services. Pas de RC Pro BTP, médicale, financière complexe.
              </li>
              <li>
                <strong>Plafond max 1.5M€</strong> : insuffisant pour activités à risque (cyber
                spécialisé, médical, financier)
              </li>
              <li>
                <strong>Postériorité 5 ans</strong> (vs 10 ans Hiscox)
              </li>
              <li>
                <strong>Pas de réseau d&apos;agences physiques</strong> : tout digital, peut
                décourager certains pros traditionnels
              </li>
              <li>
                <strong>Solidité financière A-</strong> (challenger, moins établi qu’Allianz ou AXA)
              </li>
              <li>
                <strong>Cyber-assurance limitée</strong> : module basique en option
              </li>
              <li>
                <strong>Tarifs SARL ou SAS PME moins compétitifs</strong> : à partir CA 200k€, MMA
                Pro ou Allianz Pro souvent mieux placés
              </li>
            </ul>
          ),
        },
        {
          h2: 'Stello vs Hiscox vs Wakam',
          body: (
            <ul>
              <li>
                <strong>Stello</strong> : digital pure, best price AE freelance + VTC contrat
                2-en-1. Solidité A-.
              </li>
              <li>
                <strong>Hiscox</strong> : leader services intellectuels, postériorité 10 ans
                (unique), plafond jusqu&apos;à 10M€. Tarif AE équivalent Stello. Solidité A+.
              </li>
              <li>
                <strong>Wakam</strong> : leader VTC France (vs Stello challenger). Tarifs très
                compétitifs VTC débutant (280-350€ par an). 100% digital.
              </li>
              <li>
                <strong>Pour AE freelance services intellectuels</strong> : Stello et Hiscox au
                coude-à-coude. Hiscox gagne sur postériorité.
              </li>
              <li>
                <strong>Pour VTC débutant</strong> : Wakam best price. Stello bien placé avec
                contrat 2-en-1.
              </li>
              <li>
                <strong>Pour SARL ou SAS PME</strong> : préférer MMA Pro ou Allianz Pro (Stello
                moins compétitif sur ce segment).
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Stello est-il un assureur fiable ?',
          a: 'Oui, agréé ACPR (registre Refassu), solidité financière A-, &gt; 50 000 sociétaires en 2026. Réputation forte sur VTC + freelance. Pour activités plus complexes ou plafonds &gt; 1.5M€, préférer Hiscox, MMA ou Allianz.',
        },
        {
          q: 'Combien coûte Stello RC Pro pour un freelance ?',
          a: 'AE freelance services intellectuels CA &lt; 80k€ : 90-200€ par an avec plafond 1M€. Best price avec Hiscox sur ce segment. Cyber-assurance basique en option : +120-300€ par an.',
        },
        {
          q: 'Stello propose-t-il une RC Pro VTC ?',
          a: 'Oui, c&apos;est son cœur de cible. Contrat 2-en-1 (auto VTC + RC Pro VTC) : 350-450€ par an pour AE débutant. Avantage : 1 seul contrat à gérer. Concurrent direct : Wakam (best price pur).',
        },
        {
          q: 'Comment résilier Stello ?',
          a: 'Résiliation libre après 1 an d&apos;engagement (loi infra-annuelle). 100% en ligne dans l&apos;app Stello. Préavis 1 mois. Important : conserver postériorité 5 ans pour sinistres antérieurs.',
        },
      ]}
      relatedMetiers={[
        { name: 'Assurance RC Pro (vue globale)', slug: 'assurance-rc-pro' },
        { name: 'Hiscox RC Pro', slug: 'hiscox-rc-pro' },
        { name: 'RC Pro VTC', slug: 'rc-pro-vtc' },
        { name: 'Assurance VTC', slug: 'assurance-vtc' },
        { name: 'Comparateur RC Pro', slug: 'comparateur-rc-pro' },
      ]}
    />
  )
}
