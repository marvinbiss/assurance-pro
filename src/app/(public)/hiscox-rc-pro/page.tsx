/**
 * Pilier — "hiscox rc pro" (TIER S — 250 vol/mois, KD 1, CPC 250€)
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
const SLUG = 'hiscox-rc-pro'
const TITLE = 'Hiscox RC Pro — Avis, garanties, tarifs et alternatives 2026'
const TAGLINE =
  'Hiscox est l&apos;un des leaders RC Pro en France pour les pros services intellectuels. Analyse des garanties, tarifs 95-1 200€/an et comparatif avec Stello, Allianz Pro, MMA.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Hiscox RC Pro : leader assurance pros services intellectuels. Plafond 1-5M€, postériorité 10 ans, tarif 95€/an (AE freelance) à 1 200€/an (SARL). Comparatif honnête.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Hiscox est un groupe d'assurance britannique présent en France depuis 1993, spécialisé dans les RC Pro pour les services intellectuels (consultants, freelances, agences digitales, IT, professions libérales). Reconnu pour ses plafonds élevés (1-10M€), sa postériorité de 10 ans (exceptionnelle), et son service de gestion sinistres rapide. Tarifs compétitifs sur les profils AE / freelances jeunes. Cette page analyse l'offre Hiscox RC Pro, ses points forts/faibles, et la compare avec Stello, Allianz Pro, MMA Pro."
      legalReference="art. L. 124-3 + L. 121-2 C. assur."
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="rc-pro"
      expertBio={EXPERT_SERVICES}
      comparatifRows={COMPARATIF_SERVICES}
      benefits={[
        {
          icon: '🛡️',
          title: 'Plafond 1-10M€',
          desc: 'Standard 1-2M€ AE, jusqu&apos;à 10M€ pour activités à risque',
        },
        {
          icon: '📅',
          title: 'Postériorité 10 ans',
          desc: 'Couverture des sinistres déclarés après résiliation — best of market',
        },
        {
          icon: '💰',
          title: '95-1 200€/an',
          desc: 'AE freelance services 95-180€ • SARL services 350-800€ • PME 800-1 200€',
        },
        {
          icon: '⚡',
          title: 'Souscription 5 min',
          desc: 'En ligne, attestation immédiate, paiement annuel ou mensuel',
        },
      ]}
      sections={[
        {
          h2: 'Points forts Hiscox RC Pro',
          body: (
            <ul>
              <li>
                <strong>Postériorité 10 ans</strong> : si vous résiliez ou cessez activité, les
                sinistres déclarés dans les 10 ans suivants restent couverts (rare sur le marché —
                Allianz Pro 5 ans, AXA 5 ans).
              </li>
              <li>
                <strong>Plafonds élevés disponibles</strong> : jusqu&apos;à 10M€ par sinistre, idéal
                pour activités à risque (cyber, financier, médical spécialisé).
              </li>
              <li>
                <strong>Service sinistres rapide</strong> : équipe dédiée, réponse sous 48h, avance
                frais d&apos;avocat sans attendre instruction complète.
              </li>
              <li>
                <strong>Couvre les activités &quot;nouvelles&quot;</strong> : cybersécurité, IA,
                formation en ligne, freelancing tech — pas d&apos;exclusion automatique.
              </li>
              <li>
                <strong>Solidité financière A+</strong> notation S&amp;P, A2 Moody&apos;s.
              </li>
              <li>
                <strong>Tarif compétitif AE freelance</strong> : best price avec Stello sur ce
                segment (95-180€/an).
              </li>
            </ul>
          ),
        },
        {
          h2: 'Points faibles Hiscox RC Pro',
          body: (
            <ul>
              <li>
                <strong>Tarifs élevés sur PME/grandes structures</strong> : à partir de SARL avec CA
                &gt; 200k€, Hiscox devient plus cher que MMA Pro ou Generali Pro (+15-25%).
              </li>
              <li>
                <strong>Pas de couverture BTP</strong> : Hiscox ne fait pas de décennale ni de RC
                Pro BTP. Spécialisé services intellectuels uniquement.
              </li>
              <li>
                <strong>Franchise standard 500-1 500€</strong> : pas la plus basse du marché (Stello
                propose 300€ minimum).
              </li>
              <li>
                <strong>Pas de remise paquet majeure</strong> : RC Pro + autres contrats Hiscox =
                remise -5% seulement vs -15-25% chez April Pro ou Allianz Pro.
              </li>
              <li>
                <strong>Process déclaration sinistre via plateforme uniquement</strong> : peut
                sembler froid pour pros habitués au contact courtier direct.
              </li>
            </ul>
          ),
        },
        {
          h2: 'Hiscox vs Stello vs Allianz Pro vs MMA',
          body: (
            <ul>
              <li>
                <strong>Hiscox</strong> : meilleur pour profils services intellectuels avec besoin
                de plafonds élevés et postériorité 10 ans. Cher sur PME.
              </li>
              <li>
                <strong>Stello</strong> : challenger pure-digital. Best price sur AE/freelance
                (90-160€/an). Garanties similaires Hiscox sur services intellectuels.
              </li>
              <li>
                <strong>Allianz Pro</strong> : couverture la plus large (BTP + services +
                agriculture), bon rapport prix/services sur SARL/SAS. Postériorité 5 ans (limite).
              </li>
              <li>
                <strong>MMA Pro</strong> : équilibré, fort sur SARL/SAS PME. Pas le meilleur AE mais
                excellent à partir de CA 100k€.
              </li>
              <li>
                <strong>AXA Pro</strong> : couverture solide, assistance haut de gamme, mais prime
                généralement +20% vs Hiscox équivalent.
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Hiscox est-il fiable pour un freelance ?',
          a: 'Oui. Notation S&P A+ (excellente solidité), 30 ans présence France, leader services intellectuels. Réputation forte sur gestion sinistres rapide. Recommandé pour AE/freelances services.',
        },
        {
          q: 'Quel tarif Hiscox RC Pro pour un consultant freelance ?',
          a: 'AE freelance services intellectuels (consultant, IT, designer) avec CA &lt; 80k€ : 95-180€/an avec plafond 1M€. SARL/SASU même métier avec CA 100-300k€ : 350-700€/an avec plafond 2M€.',
        },
        {
          q: 'Hiscox couvre-t-il le BTP ?',
          a: 'Non. Hiscox ne fait ni décennale ni RC Pro BTP. Pour BTP : April Pro, SMABTP, Allianz Pro BTP, ou MMA Pro BTP. Notre courtier peut comparer ces 4 selon profil.',
        },
        {
          q: 'Comment résilier Hiscox RC Pro ?',
          a: 'Après 1 an d&apos;engagement : résiliation libre (loi infra-annuelle 2020), préavis 1 mois. Lettre recommandée AR à Hiscox France. IMPORTANT : conserver la postériorité 10 ans pour les sinistres antérieurs (souvent maintenue automatiquement).',
        },
      ]}
      relatedMetiers={[
        { name: 'Assurance RC Pro (vue globale)', slug: 'assurance-rc-pro' },
        { name: 'RC Pro auto-entrepreneur', slug: 'rc-pro/auto-entrepreneur' },
        { name: 'RC Pro consultant IT', slug: 'rc-pro/informatique' },
        { name: 'RC Pro pas chère', slug: 'rc-pro-pas-cher' },
        { name: 'Comparateur RC Pro', slug: 'comparateur-rc-pro' },
      ]}
    />
  )
}
