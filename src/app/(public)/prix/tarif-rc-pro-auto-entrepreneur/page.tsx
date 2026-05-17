/**
 * Prix — "tarif rc pro auto-entrepreneur" (400 vol, KD 2, CPC 160€)
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
const SLUG = 'prix / tarif-rc-pro-auto-entrepreneur'
const TITLE = 'Tarif RC Pro Auto-Entrepreneur — Prix 2026 par activité'
const TAGLINE =
  'Tarif RC Pro AE 2026 : Hiscox 95€ par an services intellectuels, April Pro 250€ par an BTP, Allianz 220€ par an coaching. Comparatif détaillé par activité.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Tarif RC Pro auto-entrepreneur 2026 : Hiscox 95€ par an best price services, Allianz 220€ par an coaching, April Pro 250€ par an BTP. Comparatif 5 assureurs.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Tarifs RC Pro auto-entrepreneur 2026 vérifiés par activité chez les 5 assureurs leaders. Données basées sur l'analyse de 500+ devis AE traités."
      legalReference="art. L. 124-3 + L. 121-2 C. assur."
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="rc-pro"
      expertBio={EXPERT_SERVICES}
      comparatifRows={COMPARATIF_SERVICES}
      benefits={[
        {
          icon: '💰',
          title: 'Dès 95€ par an (Hiscox)',
          desc: 'Best price AE services intellectuels',
        },
        {
          icon: '🚀',
          title: '5 assureurs comparés',
          desc: 'Hiscox, Stello, Allianz Pro, MMA Pro, April Pro',
        },
        {
          icon: '📊',
          title: 'Tarifs vérifiés 2026',
          desc: '500+ devis AE traités — fourchettes précises',
        },
        {
          icon: '💼',
          title: 'Madelin déductible TNS',
          desc: 'Cotisations déductibles résultat (régime réel)',
        },
      ]}
      sections={[
        {
          h2: 'Tarif RC Pro AE par activité 2026',
          body: (
            <ul>
              <li>
                <strong>Consultant — freelance IT</strong> : Hiscox 95-180€ par an
              </li>
              <li>
                <strong>Designer — photographe</strong> : Hiscox 120-220€ par an
              </li>
              <li>
                <strong>Coach — formateur</strong> : Allianz 150-300€ par an
              </li>
              <li>
                <strong>Coach sportif — yoga</strong> : Allianz 200-400€ par an (risque corporel)
              </li>
              <li>
                <strong>Esthéticienne à domicile</strong> : Allianz 180-350€ par an
              </li>
              <li>
                <strong>BTP (en complément décennale)</strong> : April Pro 250-450€ par an
              </li>
              <li>
                <strong>VTC AE</strong> : Wakam 280-450€ par an (auto + RC Pro 2-en-1)
              </li>
              <li>
                <strong>E-commerce — dropshipping</strong> : Allianz 200-450€ par an
              </li>
              <li>
                <strong>Food truck — restauration</strong> : Allianz 350-700€ par an
              </li>
              <li>
                <strong>Médical libéral</strong> : 800-2 500€ par an (réglementaire)
              </li>
            </ul>
          ),
        },
        {
          h2: 'Comparatif 5 assureurs RC Pro AE',
          body: (
            <ul>
              <li>
                <strong>Hiscox</strong> : 🥇 best AE services intellectuels (95-220€ par an,
                postériorité 10 ans)
              </li>
              <li>
                <strong>Stello</strong> : challenger digital pure (90-200€ par an, postériorité 5
                ans)
              </li>
              <li>
                <strong>Allianz Pro</strong> : couverture large multi-secteurs (180-380€ par an)
              </li>
              <li>
                <strong>MMA Pro</strong> : équilibré, réseau agences (250-450€ par an)
              </li>
              <li>
                <strong>April Pro BTP</strong> : 🥇 best AE BTP (250-450€ par an + décennale)
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Tarif AE consultant débutant ?',
          a: 'AE consultant services CA &lt; 50k€ : 95-150€ par an chez Hiscox (best price), plafond 1M€, postériorité 10 ans. Cyber-assurance combinée : +150-300€ par an si données client.',
        },
        {
          q: 'Comment réduire tarif RC Pro AE ?',
          a: '1) Hiscox ou Stello vs assureurs traditionnels (-30-50%). 2) Plafond 500k€ si CA &lt; 30k€ (-15%). 3) Franchise 800€ vs 300€ (-10%). 4) Paiement annuel (-3%). 5) Pack multi-contrats (-10%). Cumul : -30-50%.',
        },
        {
          q: 'Tarif AE BTP plombier ?',
          a: 'AE plombier RC Pro chez April Pro : 350-450€ par an. À combiner avec décennale obligatoire : 1 400-2 100€ par an. Pack = 1 750-2 550€ par an total.',
        },
      ]}
      relatedMetiers={[
        {
          name: 'RC Pro auto-entrepreneur (vue globale)',
          slug: 'responsabilite-civile-professionnelle-auto-entrepreneur',
        },
        { name: 'Assurance RC Pro AE', slug: 'assurance-rc-pro-auto-entrepreneur' },
        { name: 'RC Pro AE pas chère', slug: 'assurance-rc-pro-auto-entrepreneur-pas-cher' },
        { name: 'Tarif RC Pro général', slug: 'prix/tarif-rc-pro' },
        { name: 'Devis RC Pro AE', slug: 'devis/rc-pro' },
      ]}
    />
  )
}
