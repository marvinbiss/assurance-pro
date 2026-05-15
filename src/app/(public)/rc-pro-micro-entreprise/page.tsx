/**
 * Auto-entrepreneur — "rc pro micro entreprise" (300 vol, KD 2, CPC 450€) MONEY
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
const SLUG = 'rc-pro-micro-entreprise'
const TITLE = 'RC Pro Micro Entreprise — Obligation, sinistres, comparatif 2026'
const TAGLINE =
  'La RC Pro micro-entreprise protège votre patrimoine personnel contre les sinistres clients. Tarif 95-450€/an selon activité. Hiscox, Stello, April Pro comparatif.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'RC Pro micro-entreprise : protection patrimoine perso AE/EI. Tarifs 95-450€/an. Hiscox 95€ services, April Pro 250€ BTP. Comparatif 5 assureurs spécialisés.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="La RC Pro micro-entreprise est essentielle pour TOUT auto-entrepreneur ou EI en régime micro : elle protège votre patrimoine personnel contre les sinistres causés à des clients dans votre activité. Sans RC Pro, le micro-entrepreneur engage sa responsabilité personnelle illimitée (vs responsabilité limitée d'une SARL/SAS). Sinistre moyen micro-entreprise : 5-30k€ — sortie de poche directe sans RC Pro."
      legalReference="art. L. 124-3 + L. 121-2 C. assur."
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="rc-pro"
      expertBio={EXPERT_SERVICES}
      comparatifRows={COMPARATIF_SERVICES}
      benefits={[
        {
          icon: '🛡️',
          title: 'Protection patrimoine perso',
          desc: 'Sinistre client ≠ saisie de vos biens personnels',
        },
        {
          icon: '💰',
          title: '95-450€/an selon activité',
          desc: 'Services 95-220€ • BTP 250-450€ • Médical 800€+',
        },
        {
          icon: '⚖️',
          title: 'Obligation par profession',
          desc: 'Médical, juridique, immobilier, BTP, taxi/VTC',
        },
        {
          icon: '📈',
          title: 'Crédibilité commerciale',
          desc: 'Clients B2B exigent attestation RC Pro avant contrat',
        },
      ]}
      sections={[
        {
          h2: 'Sinistres micro-entreprise typiques',
          body: (
            <ul>
              <li>
                <strong>Consultant : erreur de conseil</strong> → préjudice client 10-50k€
              </li>
              <li>
                <strong>Freelance dev : bug critique production</strong> → e-commerce down 24h,
                20-150k€ CA perdu
              </li>
              <li>
                <strong>Coach sportif : blessure client</strong> en séance (déchirure musculaire,
                chute) → indemnisation 3-15k€
              </li>
              <li>
                <strong>Esthéticienne : allergie produit cosmétique</strong> → frais médicaux +
                dommages moraux 2-15k€
              </li>
              <li>
                <strong>BTP AE : casse matériel client</strong> en cours d&apos;intervention →
                1-10k€
              </li>
              <li>
                <strong>Photographe : perte cartes mémoire</strong> mariage avant transfert →
                indemnisation 5-30k€
              </li>
              <li>
                <strong>Agence web : retard livraison majeur</strong> → pénalités contractuelles
                10-100k€
              </li>
              <li>
                <strong>Food truck : intoxication alimentaire</strong> → indemnités victimes
                10-200k€
              </li>
            </ul>
          ),
        },
        {
          h2: 'Comparatif 5 assureurs RC Pro micro-entreprise',
          body: (
            <ul>
              <li>
                <strong>Hiscox</strong> : 🥇 best price services intellectuels AE (95-220€/an),
                postériorité 10 ans (unique), plafond 1M€
              </li>
              <li>
                <strong>Stello</strong> : challenger 100% digital (90-200€/an), app mobile native,
                postériorité 5 ans
              </li>
              <li>
                <strong>Allianz Pro</strong> : couverture la plus large (services + BTP +
                agriculture), 180-380€/an
              </li>
              <li>
                <strong>MMA Pro</strong> : équilibré, réseau 1 500+ agences, 250-450€/an pour AE
              </li>
              <li>
                <strong>April Pro BTP</strong> : 🥇 best price AE BTP en complément décennale
                (250-450€/an)
              </li>
            </ul>
          ),
        },
        {
          h2: 'Critères de choix RC Pro micro-entreprise',
          body: (
            <ol>
              <li>
                <strong>Activité précise</strong> : services intellectuels (Hiscox/Stello), BTP
                (April Pro), médical (assureurs spé), commerce (Allianz Pro/MMA)
              </li>
              <li>
                <strong>Plafond</strong> : 500k€ minimum AE petite activité, 1M€ standard
                recommandé, 2-3M€ pour activités à risque
              </li>
              <li>
                <strong>Postériorité</strong> : 5 ans standard, 10 ans Hiscox (le seul). Important
                pour AE qui peuvent cesser activité
              </li>
              <li>
                <strong>Cyber-assurance</strong> : indispensable si activité IT, e-commerce, gestion
                données client
              </li>
              <li>
                <strong>Tarif vs garanties</strong> : éviter le moins cher si exclusions étendues
              </li>
            </ol>
          ),
        },
      ]}
      faq={[
        {
          q: 'RC Pro micro-entreprise vraiment indispensable ?',
          a: 'OUI quasi-systématiquement. Sans RC Pro, sinistre client = saisie possible de votre patrimoine personnel (compte bancaire, voiture, biens immobiliers). Prime 95-450€/an vs sinistre potentiel 5-30k€ — ROI évident. Obligatoire pour professions réglementées.',
        },
        {
          q: 'Tarif RC Pro pour micro-entreprise débutante ?',
          a: 'AE services intellectuels CA &lt; 30k€ : 95-150€/an chez Hiscox ou Stello. AE BTP débutant : 250-400€/an chez April Pro (en complément décennale 950-2 800€/an). AE esthéticienne : 180-280€/an. AE coach sportif : 200-300€/an.',
        },
        {
          q: 'RC Pro micro-entreprise vs SARL : différence ?',
          a: 'RC Pro micro = 95-450€/an (plafond standard 500k€-1M€). RC Pro SARL = 350-1 500€/an (plafond 1-3M€). Différence majeure : SARL a responsabilité limitée capital social, micro-entreprise = patrimoine perso engagé. RC Pro encore plus critique en micro.',
        },
        {
          q: 'Comment choisir entre Hiscox et April Pro pour AE BTP ?',
          a: 'Pour AE BTP : April Pro BTP est leader (best price 250-450€/an RC Pro + 950-2 800€/an décennale). Hiscox ne fait PAS de décennale BTP. Pour AE services intellectuels : Hiscox best price 95-220€/an. Choisir selon votre activité principale.',
        },
      ]}
      relatedMetiers={[
        {
          name: 'RC Pro Auto-Entrepreneur (vue globale)',
          slug: 'responsabilite-civile-professionnelle-auto-entrepreneur',
        },
        { name: 'Assurance RC Pro micro-entreprise', slug: 'assurance-rc-pro-micro-entreprise' },
        { name: 'Assurance RC Pro Auto-Entrepreneur', slug: 'assurance-rc-pro-auto-entrepreneur' },
        { name: 'Assurance micro-entreprise', slug: 'assurance-micro-entreprise' },
        { name: 'Hiscox RC Pro', slug: 'hiscox-rc-pro' },
      ]}
    />
  )
}
