/**
 * Pilier — "rc pro matmut" (200 vol, KD 0, CPC 200€)
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
const SLUG = 'rc-pro-matmut'
const TITLE = 'RC Pro Matmut — Avis, garanties, alternatives 2026'
const TAGLINE =
  'La Matmut propose une RC Pro mutualiste accessible aux TPE et associations. Analyse des garanties, tarifs 180-1 200€/an et comparatif avec Hiscox, MMA, MAIF.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Matmut RC Pro : assureur mutualiste (groupe Matmut + AMF). Plafond 500k€-1.5M€, tarif 180-1 200€/an. Comparatif Matmut vs MAIF vs MMA vs Hiscox.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="La Matmut (Mutuelle Assurance des Travailleurs Mutualistes) est un assureur mutualiste français créé en 1961, devenu un acteur important du marché des particuliers et des TPE/PME. Son offre RC Pro est moins spécialisée que celle des leaders du segment (Hiscox, Allianz Pro) mais reste pertinente pour les pros déjà clients de la Matmut pour leurs autres assurances (auto, habitation), grâce au pack multi-contrats."
      legalReference="art. L. 124-3 + L. 121-2 C. assur."
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="rc-pro"
      expertBio={EXPERT_SERVICES}
      comparatifRows={COMPARATIF_SERVICES}
      benefits={[
        {
          icon: '🤝',
          title: 'Mutualiste sans actionnaires',
          desc: 'Gouvernance par sociétaires, bénéfices réinvestis',
        },
        {
          icon: '🛡️',
          title: 'Plafond 500k€-1.5M€',
          desc: 'Standard 500k€ AE, 1M€ SARL/SAS, 1.5M€ formules étendues',
        },
        {
          icon: '💰',
          title: '180-1 200€/an',
          desc: 'AE 180-380€ • SARL services 450-900€ • SAS PME 800-1 200€',
        },
        {
          icon: '📦',
          title: 'Pack multi-contrats',
          desc: 'Auto pro + habitation pro + RC Pro = -10-15% remise paquet',
        },
      ]}
      sections={[
        {
          h2: 'Points forts Matmut RC Pro',
          body: (
            <ul>
              <li>
                <strong>Pack multi-contrats avantageux</strong> : si vous êtes déjà client Matmut
                auto/habitation, ajout RC Pro = remise -10-15%
              </li>
              <li>
                <strong>Approche mutualiste</strong> : pas d&apos;actionnaires, sociétaires votent,
                programme &quot;Citoyen Bonus&quot;
              </li>
              <li>
                <strong>Réseau d&apos;agences physiques</strong> : 600+ agences en France, conseil
                personnalisé
              </li>
              <li>
                <strong>Tarifs compétitifs sur AE</strong> : 180-380€/an, dans la fourchette basse
                du marché
              </li>
              <li>
                <strong>Programme prévention sinistres</strong> : conseils + outils pour réduire
                risques
              </li>
              <li>
                <strong>Solidité financière A-</strong> (notation S&amp;P)
              </li>
            </ul>
          ),
        },
        {
          h2: 'Points faibles Matmut RC Pro',
          body: (
            <ul>
              <li>
                <strong>Pas spécialisée pro</strong> : Matmut reste avant tout assureur
                particuliers. Offre Pro moins riche que MMA Pro ou Allianz Pro.
              </li>
              <li>
                <strong>Plafonds limités</strong> : 1.5M€ max standard. Insuffisant pour activités à
                risque (cyber, financier, médical spécialisé).
              </li>
              <li>
                <strong>Postériorité 5 ans seulement</strong> (vs 10 ans Hiscox)
              </li>
              <li>
                <strong>Pas de RC Pro BTP décennale</strong> : Matmut ne fait pas décennale. À
                combiner avec April Pro ou SMABTP.
              </li>
              <li>
                <strong>Souscription parfois lente</strong> : passage en agence ou téléphone souvent
                demandé.
              </li>
              <li>
                <strong>Cyber-assurance limitée</strong> : module basique en option seulement.
              </li>
            </ul>
          ),
        },
        {
          h2: 'Matmut vs alternatives',
          body: (
            <ul>
              <li>
                <strong>Matmut</strong> : OK si déjà client multi-contrats. Pas top pour pro pur.
              </li>
              <li>
                <strong>MAIF</strong> : meilleur sur associations + ESS + professions libérales
                social/culture.
              </li>
              <li>
                <strong>MMA Pro</strong> : plus complète, idéal SARL/SAS PME tous secteurs (y
                compris BTP).
              </li>
              <li>
                <strong>Hiscox</strong> : best price + postériorité 10 ans pour services
                intellectuels AE.
              </li>
              <li>
                <strong>Allianz Pro</strong> : couverture la plus large, idéal multi-secteurs.
              </li>
              <li>
                <strong>MACIF</strong> : profil similaire Matmut, mutualiste, pack multi-contrats.
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Matmut RC Pro est-elle un bon choix pour un freelance ?',
          a: 'Pour un AE freelance services intellectuels (consultant, IT, designer) avec CA &lt; 80k€ : Hiscox ou Stello seront 30-50% moins chers. Matmut devient pertinente si vous êtes déjà client Matmut auto/habitation (pack multi-contrats -10-15%).',
        },
        {
          q: 'Matmut couvre-t-elle les associations ?',
          a: 'Oui, mais MAIF reste leader sur ce segment avec offre dédiée Asso 1901 + ESS. Matmut Asso est correcte mais moins spécialisée.',
        },
        {
          q: 'Comment souscrire Matmut RC Pro ?',
          a: 'Via matmut.fr → onglet &quot;Pro&quot; → &quot;RC Pro&quot;. Devis en ligne possible, finalisation souvent par téléphone ou en agence. Délai 24-72h pour attestation.',
        },
        {
          q: 'Matmut vs MAIF pour une asso ?',
          a: 'MAIF leader Asso 1901 (180-300€/an formule starter, couverture événements). Matmut Asso : 220-380€/an, garanties proches. MAIF avantage spécialisation et réputation forte sur ESS.',
        },
      ]}
      relatedMetiers={[
        { name: 'Assurance RC Pro (vue globale)', slug: 'assurance-rc-pro' },
        { name: 'RC Pro MAIF', slug: 'rc-pro-maif' },
        { name: 'RC Pro MMA', slug: 'rc-pro-mma' },
        { name: 'RC Pro association', slug: 'assurance-association' },
        { name: 'Comparateur RC Pro', slug: 'comparateur-rc-pro' },
      ]}
    />
  )
}
