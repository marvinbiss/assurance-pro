/**
 * Pilier — "rc pro macif" (200 vol, KD 1, CPC 45€)
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
const SLUG = 'rc-pro-macif'
const TITLE = 'RC Pro MACIF — Mutualiste, avis et alternatives 2026'
const TAGLINE =
  'La MACIF (Mutuelle Assurance des Commerçants et Industriels de France) propose une RC Pro mutualiste. Analyse des garanties, tarifs 200-1 500€ par an et comparatif.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'MACIF RC Pro : assureur mutualiste 5M sociétaires. Plafond 500k€-1M€, tarif 200-1 500€ par an. Comparatif avec MAIF, MMA, Matmut, Hiscox.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="La MACIF (Mutuelle Assurance des Commerçants et Industriels de France) est un assureur mutualiste français créé en 1960, regroupant 5 millions de sociétaires. Son offre RC Pro cible principalement les commerçants, artisans et professions libérales, avec une approche mutualiste sans actionnaires. Cette page analyse l'offre MACIF RC Pro, ses points forts ou faibles, et la compare aux autres mutualistes (MAIF, Matmut) et aux spécialistes pro (MMA, Hiscox)."
      legalReference="art. L. 124-3 + L. 121-2 C. assur."
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="rc-pro"
      expertBio={EXPERT_SERVICES}
      comparatifRows={COMPARATIF_SERVICES}
      benefits={[
        {
          icon: '🤝',
          title: 'Mutualiste 5M sociétaires',
          desc: 'Pas d&apos;actionnaires, gouvernance par sociétaires',
        },
        {
          icon: '🛡️',
          title: 'Plafond 500k€-1M€',
          desc: 'Standard AE 500k€, SARL ou SAS 1M€ (recommandé)',
        },
        {
          icon: '💰',
          title: '200-1 500€ par an',
          desc: 'AE 200-400€ • SARL services 500-900€ • SAS PME 900-1 500€',
        },
        {
          icon: '📦',
          title: 'Pack mutualiste',
          desc: 'Auto pro + RC Pro + multirisque = -10-15% remise paquet',
        },
      ]}
      sections={[
        {
          h2: 'Points forts MACIF RC Pro',
          body: (
            <ul>
              <li>
                <strong>Mutualiste à but non lucratif</strong> : pas d&apos;actionnaires, bénéfices
                réinvestis, programme &quot;Mutualité&quot;
              </li>
              <li>
                <strong>Réseau de 470 points d&apos;accueil</strong> en France pour conseil
                personnel
              </li>
              <li>
                <strong>Tarifs corrects sur AE</strong> : 200-400€ par an, milieu de marché
              </li>
              <li>
                <strong>Solidité financière A-</strong> (notation S&amp;P)
              </li>
              <li>
                <strong>Programme prévention</strong> : conseils et outils pour réduire risques
              </li>
              <li>
                <strong>Pack multi-contrats</strong> : Auto pro + RC Pro = -10-15% remise
              </li>
            </ul>
          ),
        },
        {
          h2: 'Points faibles MACIF RC Pro',
          body: (
            <ul>
              <li>
                <strong>Pas spécialiste pro pur</strong> : MACIF reste avant tout assureur
                particuliers. Offre pro moins riche que MMA Pro.
              </li>
              <li>
                <strong>Plafonds limités</strong> : 1M€ max standard. Insuffisant pour activités à
                risque (cyber, financier, médical)
              </li>
              <li>
                <strong>Postériorité 5 ans</strong> (vs 10 ans Hiscox)
              </li>
              <li>
                <strong>Pas de RC Pro BTP décennale</strong> : à combiner avec April Pro ou SMABTP
              </li>
              <li>
                <strong>Cyber-assurance basique</strong> : module simple en option
              </li>
              <li>
                <strong>Souscription pas 100% digitale</strong> : passage souvent par téléphone ou
                point d&apos;accueil
              </li>
            </ul>
          ),
        },
        {
          h2: 'MACIF vs autres mutualistes',
          body: (
            <ul>
              <li>
                <strong>MACIF</strong> : commerçants + artisans + professions libérales. Réseau 470
                points.
              </li>
              <li>
                <strong>MAIF</strong> : top sur associations + ESS + professions libérales social ou
                culture. Réseau 250 agences.
              </li>
              <li>
                <strong>Matmut</strong> : TPE et particuliers. Pack multi-contrats si déjà client.
                Réseau 600+ agences.
              </li>
              <li>
                <strong>MAAF</strong> : particuliers et TPE. Offre Pro limitée.
              </li>
              <li>
                <strong>MMA</strong> : spécialiste pro et entreprises (groupe Covéa). Réseau 1 500+
                agences.
              </li>
              <li>
                <strong>GMF</strong> : fonctionnaires uniquement. Pas d&apos;offre Pro classique.
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'MACIF RC Pro est-elle adaptée à un freelance ?',
          a: 'Pour AE freelance services intellectuels (consultant, IT, designer) : MACIF est correcte (200-400€ par an) mais Hiscox ou Stello sont 30-50% moins chers avec garanties supérieures (plafond 1M€ standard, postériorité 10 ans Hiscox).',
        },
        {
          q: 'MACIF couvre-t-elle les commerçants ?',
          a: 'Oui, c&apos;est même son cœur de cible historique. RC Pro Commerçant MACIF + Multirisque Pro Commerçant = pack complet à 800-1 800€ par an. Concurrents directs : Allianz Pro Commerce, MMA Pro Commerce.',
        },
        {
          q: 'Comment souscrire MACIF RC Pro ?',
          a: 'Via macif.fr → onglet &quot;Pro&quot; → &quot;RC Pro&quot;. Devis en ligne possible, finalisation souvent par téléphone / en point d&apos;accueil MACIF. Délai 24-72h pour attestation.',
        },
        {
          q: 'MACIF vs MAIF pour un consultant ?',
          a: 'Profils similaires. MACIF plus orientée commerçants + artisans, MAIF plus orientée associations + professions libérales social. Pour pur consultant business : ni l&apos;une ni l&apos;autre n&apos;est leader (préférer Hiscox).',
        },
      ]}
      relatedMetiers={[
        { name: 'Assurance RC Pro (vue globale)', slug: 'assurance-rc-pro' },
        { name: 'RC Pro MAIF', slug: 'rc-pro-maif' },
        { name: 'RC Pro Matmut', slug: 'rc-pro-matmut' },
        { name: 'RC Pro MMA', slug: 'rc-pro-mma' },
        { name: 'Comparateur RC Pro', slug: 'comparateur-rc-pro' },
      ]}
    />
  )
}
