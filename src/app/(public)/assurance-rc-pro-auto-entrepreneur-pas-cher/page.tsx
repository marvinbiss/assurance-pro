/**
 * Auto-entrepreneur — "assurance rc pro auto entrepreneur pas cher" (90 vol, KD 12, CPC 500€) MONEY
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
const SLUG = 'assurance-rc-pro-auto-entrepreneur-pas-cher'
const TITLE = 'Assurance RC Pro Auto Entrepreneur Pas Cher — Dès 95€/an chez Hiscox'
const TAGLINE =
  'RC Pro auto-entrepreneur à prix imbattable : Hiscox dès 95€/an pour AE services intellectuels. 6 leviers d&apos;économies + classement marché 2026.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'RC Pro AE pas chère : Hiscox dès 95€/an, Stello 90€/an. 6 leviers économies, 4 pièges low-cost. Classement marché vérifié 2026.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Comment trouver une RC Pro auto-entrepreneur PAS CHÈRE sans sacrifier la couverture ? Le best price 2026 vérifié est Hiscox à 95€/an pour AE services intellectuels (consultant, freelance IT, designer) avec un plafond 1M€ et postériorité 10 ans (unique sur le marché). Stello, challenger 100% digital, propose 90€/an. Cette page liste les 6 leviers d'économies, les 4 pièges des contrats low-cost et le classement précis par activité."
      legalReference="art. L. 124-3 + L. 121-2 C. assur."
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="rc-pro"
      expertBio={EXPERT_SERVICES}
      comparatifRows={COMPARATIF_SERVICES}
      benefits={[
        {
          icon: '🥇',
          title: 'Dès 95€/an chez Hiscox',
          desc: 'Best price AE services intellectuels — plafond 1M€ + postériorité 10 ans',
        },
        {
          icon: '🚀',
          title: '6 leviers économies',
          desc: 'Total possible -30-50% sur prime selon profil',
        },
        {
          icon: '⚠️',
          title: '4 pièges low-cost',
          desc: 'Exclusions étendues, plafond &lt; 500k€, assureur non-ACPR',
        },
        {
          icon: '📊',
          title: 'Classement vérifié 2026',
          desc: 'Hiscox / Stello / Allianz / MMA / April Pro best prices par activité',
        },
      ]}
      sections={[
        {
          h2: '6 leviers RC Pro AE pas chère',
          body: (
            <ol>
              <li>
                <strong>Comparer Hiscox + Stello + Allianz Pro</strong> via courtier ORIAS.
                Économies -20-30% sur tarif courtier sans comparaison.
              </li>
              <li>
                <strong>Augmenter franchise</strong> de 300€ à 800-1 500€.{' '}
                <strong>Économie -15-20%</strong>.
              </li>
              <li>
                <strong>Plafond ajusté à votre CA</strong> : 500k€ AE freelance services CA &lt;
                50k€ (vs 1M€ par défaut). <strong>Économie -10-20%</strong>.
              </li>
              <li>
                <strong>Paiement annuel</strong> vs mensualisation. <strong>Économie -3-7%</strong>.
              </li>
              <li>
                <strong>Pack RC Pro + autres assurances</strong> chez même assureur.{' '}
                <strong>Économie -10-15%</strong>.
              </li>
              <li>
                <strong>Souscription en ligne directe</strong> (Hiscox, Stello) vs agent assureur
                traditionnel. <strong>Économie -10-15%</strong> sur commissions.
              </li>
            </ol>
          ),
        },
        {
          h2: 'Classement RC Pro AE pas chère par activité 2026',
          body: (
            <ul>
              <li>
                <strong>Consultant / freelance IT</strong> : 🥇 Hiscox 95-180€/an • 🥈 Stello
                90-170€/an • Allianz Pro 180-280€/an
              </li>
              <li>
                <strong>Designer / photographe</strong> : 🥇 Hiscox 120-200€/an • 🥈 Stello
                110-190€/an
              </li>
              <li>
                <strong>Coach professionnel / formateur</strong> : 🥇 Hiscox 150-250€/an • 🥈
                Allianz Pro 200-320€/an
              </li>
              <li>
                <strong>Coach sportif / yoga</strong> : 🥇 Allianz Pro 220-380€/an (couverture
                corporelle adaptée)
              </li>
              <li>
                <strong>Esthéticienne à domicile</strong> : 🥇 Allianz Pro 180-280€/an • 🥈 MMA Pro
                200-320€/an
              </li>
              <li>
                <strong>Plombier AE BTP</strong> (+ décennale) : 🥇 April Pro 300-450€/an RC Pro + 1
                400€/an décennale
              </li>
              <li>
                <strong>Peintre AE BTP</strong> (+ décennale) : 🥇 April Pro 250-350€/an RC Pro +
                950€/an décennale
              </li>
              <li>
                <strong>VTC AE</strong> : 🥇 Wakam 280-400€/an • 🥈 Stello 290-450€/an (contrat
                2-en-1)
              </li>
            </ul>
          ),
        },
        {
          h2: '4 pièges des contrats RC Pro AE low-cost',
          body: (
            <ol>
              <li>
                <strong>Plafond insuffisant</strong> : certains contrats à 70€/an plafonnent à 200
                000€ — insuffisant pour activités à risque (BTP, médical). Plafond mini : 500k€ AE,
                1M€ recommandé.
              </li>
              <li>
                <strong>Exclusions étendues</strong> : cyber-attaques (services IT), sous-traitance
                non-déclarée, conseil financier, données médicales. Lire attentivement.
              </li>
              <li>
                <strong>Postériorité limitée 2-5 ans</strong> : standard idéal 10 ans (Hiscox seul).
                Si cessation activité, sinistres tardifs non couverts = patrimoine perso exposé.
              </li>
              <li>
                <strong>Assureur non agréé ACPR</strong> : assureur étranger sans passeport européen
                LPS = non-reconnu. Vérifier sur Refassu ACPR (acpr.banque-france.fr).
              </li>
            </ol>
          ),
        },
      ]}
      faq={[
        {
          q: 'RC Pro AE à 70€/an possible ?',
          a: 'Pour AE services intellectuels CA &lt; 30k€ : possible chez Hiscox/Stello avec plafond 500k€. En-dessous de 80€/an pour AE professional réel = SUSPECT. Vérifier toujours plafond (mini 500k€), exclusions, postériorité (mini 5 ans), agrément ACPR.',
        },
        {
          q: 'Pourquoi Hiscox est si moins cher ?',
          a: 'Hiscox utilise modèle 100% digital pour AE/freelance services intellectuels — coûts opérationnels minimaux. Spécialisation services intellectuels (pas BTP) = sinistralité contrôlée. Solidité financière A+ (groupe britannique 30 ans présent France). Économies répercutées en prime client.',
        },
        {
          q: 'Stello vs Hiscox : lequel le moins cher ?',
          a: 'Très proches : Hiscox 95-220€/an vs Stello 90-200€/an pour AE services intellectuels. Différenciateurs : Hiscox = postériorité 10 ans (unique) + solidité A+. Stello = 100% digital pure + app mobile native. À profil égal, choisir selon préférence digital vs postériorité longue.',
        },
        {
          q: 'Comment négocier sa prime RC Pro AE ?',
          a: "Pas vraiment de 'négociation' chez Hiscox/Stello (tarification automatique). Mais : 1) Augmenter franchise (-15-20%). 2) Réduire plafond si sur-assuré (-10-20%). 3) Comparer 3 assureurs (économie 20-30% naturelle). 4) Pack multi-contrats (-10-15%). 5) Payer annuel (-3-7%).",
        },
      ]}
      relatedMetiers={[
        {
          name: 'RC Pro Auto-Entrepreneur (vue globale)',
          slug: 'responsabilite-civile-professionnelle-auto-entrepreneur',
        },
        {
          name: 'Assurance RC Pro Auto-Entrepreneur (souscription)',
          slug: 'assurance-rc-pro-auto-entrepreneur',
        },
        { name: 'RC Pro pas chère (variante)', slug: 'rc-pro-pas-cher' },
        { name: 'Hiscox RC Pro', slug: 'hiscox-rc-pro' },
        { name: 'Stello RC Pro', slug: 'stello-rc-pro' },
      ]}
    />
  )
}
