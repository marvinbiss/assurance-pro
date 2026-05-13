/**
 * Pilier — "rc pro consultant" (150 vol, KD 0, CPC 500€) MONEY
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'rc-pro-consultant'
const TITLE = 'RC Pro Consultant — Management, stratégie, marketing, IT, RH'
const TAGLINE =
  'La RC Pro consultant couvre les conseils erronés, retards livraison, fautes de gestion. Tarifs 95-1 500€/an selon spécialité et CA. Hiscox leader segment.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'RC Pro consultant : tarif AE 95-220€/an, SARL 350-1 500€/an. Couvre erreurs conseil, fautes gestion, retards. Hiscox leader, Stello challenger digital.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="La RC Pro consultant est l'assurance professionnelle indispensable pour tout consultant indépendant ou cabinet de conseil : management/stratégie, marketing, RH, finance/business, IT, formation, coaching. Elle couvre les dommages causés à un client en cas d'erreur de conseil, faute de gestion, retard de livraison majeur ou conseil financier inadapté. Sinistre moyen consultant : 30-80k€ (correction projet, perte CA client, dommages moraux)."
      legalReference="art. L. 124-3 + L. 121-2 C. assur."
      benefits={[
        {
          icon: '💡',
          title: 'Erreur de conseil',
          desc: 'Mauvaise recommandation stratégique, plan d&apos;action erroné',
        },
        {
          icon: '⏰',
          title: 'Retard livraison majeur',
          desc: 'Pénalités contractuelles, manque à gagner client',
        },
        {
          icon: '📊',
          title: 'Faute de gestion projet',
          desc: 'Dépassement budget, scope dérive, livrables non conformes',
        },
        {
          icon: '💰',
          title: '95-1 500€/an',
          desc: 'AE freelance 95-220€ • SARL conseil 350-900€ • SAS PME 800-1 500€',
        },
      ]}
      sections={[
        {
          h2: 'Spécialités consultant couvertes',
          body: (
            <ul>
              <li>
                <strong>Consultant management / stratégie</strong> : transformation, business plan,
                M&amp;A, change management
              </li>
              <li>
                <strong>Consultant marketing</strong> : stratégie marque, digital marketing, growth
                hacking, SEO/SEA
              </li>
              <li>
                <strong>Consultant RH</strong> : recrutement, audit RH, formation managériale,
                restructuration
              </li>
              <li>
                <strong>Consultant finance / business</strong> : audit financier, contrôle de
                gestion, financement, levée de fonds
              </li>
              <li>
                <strong>Consultant IT</strong> : architecture SI, conseil cyber, DevOps,
                transformation digitale
              </li>
              <li>
                <strong>Consultant formation</strong> : ingénierie pédagogique, formations
                sur-mesure, coaching équipes
              </li>
              <li>
                <strong>Coach professionnel</strong> : coaching dirigeants, coaching individuel,
                coaching équipes
              </li>
              <li>
                <strong>Mentor / business angel</strong> : accompagnement startups, advisory board
              </li>
            </ul>
          ),
        },
        {
          h2: 'Sinistres consultant typiques',
          body: (
            <ul>
              <li>
                <strong>Erreur de conseil stratégique</strong> : recommandation pivot business →
                perte 100k€ CA. Indemnisation moy. 30-80k€.
              </li>
              <li>
                <strong>Retard livraison projet</strong> : dépassement 3 mois sur projet 200k€ →
                pénalités 20-50k€.
              </li>
              <li>
                <strong>Conseil RH inadapté</strong> : audit recrutement défaillant → contentieux
                Prud&apos;hommes 50-150k€.
              </li>
              <li>
                <strong>Conseil financier risqué</strong> : recommandation investissement perdant →
                préjudice 100-500k€.
              </li>
              <li>
                <strong>Faille cyber non détectée</strong> (consultant IT) : exploitation par tiers
                → perte données client 50-300k€.
              </li>
              <li>
                <strong>Coaching inapproprié</strong> : démission cadre clé suite coaching →
                recrutement remplacement 50-200k€.
              </li>
            </ul>
          ),
        },
        {
          h2: 'Tarifs RC Pro consultant 2026',
          body: (
            <ul>
              <li>
                <strong>AE freelance management/stratégie</strong> (CA &lt; 80k€) : 95-220€/an,
                plafond 500k€-1M€
              </li>
              <li>
                <strong>AE consultant marketing/RH/finance</strong> : 120-280€/an
              </li>
              <li>
                <strong>AE coach professionnel</strong> : 150-350€/an
              </li>
              <li>
                <strong>SARL/SASU conseil (CA 100-300k€)</strong> : 350-900€/an, plafond 1-2M€
              </li>
              <li>
                <strong>SAS PME conseil (CA 300k-1M€)</strong> : 800-1 500€/an, plafond 2-5M€
              </li>
              <li>
                <strong>Cabinet conseil senior (CA &gt; 1M€)</strong> : 1 500-5 000€/an+, plafond
                5-10M€
              </li>
              <li>
                <strong>Conseil financier réglementé (CIF)</strong> : 1 200-8 000€/an (plafond 5M€
                minimum AMF)
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Quelle RC Pro pour un consultant freelance ?',
          a: 'Pour AE consultant management/stratégie CA &lt; 80k€ : Hiscox ou Stello = best price 95-220€/an avec plafond 1M€. Si CA &gt; 100k€ ou conseil financier : Hiscox Premium ou Allianz Pro (350-900€/an, plafond 2M€+).',
        },
        {
          q: 'Quel plafond pour un consultant management ?',
          a: 'Pour AE freelance CA &lt; 80k€ : 500k€-1M€ suffisent. Pour SARL/SAS CA &gt; 200k€ : 2-3M€ recommandés. Conseil financier réglementé (CIF) : 5M€ minimum AMF.',
        },
        {
          q: 'RC Pro consultant couvre-t-elle la fraude du client ?',
          a: 'NON. Faute intentionnelle du client ou du consultant : exclusion contractuelle absolue. La RC Pro couvre uniquement les erreurs de bonne foi (négligence, mauvaise analyse, omission).',
        },
        {
          q: 'Combien coûte la RC Pro d&apos;un cabinet conseil ?',
          a: 'Cabinet conseil PME 5-15 consultants : 1 500-5 000€/an chez Hiscox ou Allianz Pro. Pour gros cabinet (50+ consultants, CA &gt; 5M€) : 8 000-50 000€/an avec couverture cyber combinée recommandée.',
        },
      ]}
      relatedMetiers={[
        { name: 'Assurance RC Pro (vue globale)', slug: 'assurance-rc-pro' },
        { name: 'RC Pro auto-entrepreneur', slug: 'rc-pro/auto-entrepreneur' },
        { name: 'RC Pro consultant IT', slug: 'rc-pro/informatique' },
        { name: 'RC Pro informatique', slug: 'rc-pro-informatique' },
        { name: 'Hiscox RC Pro', slug: 'hiscox-rc-pro' },
      ]}
    />
  )
}
