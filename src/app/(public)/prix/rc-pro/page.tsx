/**
 * Prix — "rc pro" prix (200 vol, KD 3, CPC 250€)
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
const SLUG = 'prix/rc-pro'
const TITLE = 'Prix RC Pro 2026 — Combien coûte une responsabilité civile pro ?'
const TAGLINE =
  'Prix RC Pro 2026 par profil : AE 95-450€/an, SARL 350-2 800€/an, SAS PME 2 500-15 000€/an. Comparatif Hiscox vs Stello vs Allianz vs MMA vs AXA.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Prix RC Pro 2026 : grilles vérifiées par profil et activité. Best price Hiscox 95€/an AE. Comparatif 5 assureurs leaders en parallèle.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Prix RC Pro 2026 vérifiés sur 1 000+ devis réels : fourchettes par statut juridique (AE, SARL, SAS), par activité (services/BTP/libéral/immobilier) et par assureur (5 leaders comparés). Best price 2026 = Hiscox 95€/an pour AE services intellectuels avec plafond 1M€ et postériorité unique 10 ans."
      legalReference="art. L. 124-3 + L. 121-2 C. assur."
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="rc-pro"
      expertBio={EXPERT_SERVICES}
      comparatifRows={COMPARATIF_SERVICES}
      benefits={[
        {
          icon: '🏷️',
          title: 'Prix vérifiés 2026',
          desc: 'Tarifs observés sur 1 000+ devis réels (pas estimations)',
        },
        {
          icon: '🥇',
          title: 'Best price 95€/an',
          desc: 'Hiscox AE services intellectuels — leader marché',
        },
        {
          icon: '🆚',
          title: '5 assureurs comparés',
          desc: 'Hiscox, Stello, Allianz Pro, MMA Pro, AXA Pro',
        },
        {
          icon: '⚡',
          title: 'Devis gratuit 5 min',
          desc: 'Précision finale via formulaire courtier ORIAS',
        },
      ]}
      sections={[
        {
          h2: 'Fourchettes prix RC Pro par profil',
          body: (
            <ul>
              <li>
                <strong>Auto-entrepreneur services</strong> : 95-280€/an (best Hiscox)
              </li>
              <li>
                <strong>Auto-entrepreneur BTP</strong> : 250-450€/an RC Pro (best April Pro) +
                décennale
              </li>
              <li>
                <strong>SARL services CA 100-300k€</strong> : 600-1 200€/an (best Hiscox/Allianz)
              </li>
              <li>
                <strong>SARL services CA 300-500k€</strong> : 900-1 800€/an (best Allianz Pro)
              </li>
              <li>
                <strong>SAS PME services CA 500k-1M€</strong> : 1 400-2 800€/an (best
                Allianz/Hiscox)
              </li>
              <li>
                <strong>SAS PME services CA 1-3M€</strong> : 2 500-5 000€/an (best courtier négocié)
              </li>
              <li>
                <strong>SARL BTP 5 salariés</strong> : 600-1 200€/an RC Pro + 4 500-8 000€/an
                décennale
              </li>
              <li>
                <strong>Libéral réglementé</strong> : 800-5 000€/an
              </li>
              <li>
                <strong>Immobilier</strong> : 600-2 500€/an + caution Galian/CGI
              </li>
            </ul>
          ),
        },
        {
          h2: 'Facteurs qui font varier le prix',
          body: (
            <ol>
              <li>
                <strong>Activité</strong> (poids 40%) : services intellectuels = moins cher,
                BTP/médical = plus cher
              </li>
              <li>
                <strong>Statut juridique</strong> (poids 25%) : AE moins cher (CA limité), SAS PME
                plus cher (responsabilité étendue)
              </li>
              <li>
                <strong>Chiffre d&apos;affaires</strong> (poids 25%) : plus le CA monte, plus la
                prime grimpe (proportionnel risque)
              </li>
              <li>
                <strong>Antécédents sinistres</strong> (poids 10%) : sans sinistre 5 ans = -10-20%,
                sinistre récent = +30-100%
              </li>
              <li>
                <strong>Options choisies</strong> : cyber +15-30%, dommages biens +20%, perte
                exploitation +30%
              </li>
              <li>
                <strong>Plafond demandé</strong> : 500k€→1M€ = +15%, 1M€→2M€ = +25-30%
              </li>
            </ol>
          ),
        },
        {
          h2: 'Best price 2026 par activité',
          body: (
            <ul>
              <li>
                🥇 <strong>Consultant freelance IT</strong> : Hiscox 95-180€/an
              </li>
              <li>
                🥇 <strong>Designer / photographe</strong> : Hiscox/Stello 110-220€/an
              </li>
              <li>
                🥇 <strong>Coach sportif</strong> : Allianz Pro 220-380€/an (couverture corporelle)
              </li>
              <li>
                🥇 <strong>Esthéticienne à domicile</strong> : Allianz Pro 180-280€/an
              </li>
              <li>
                🥇 <strong>Plombier BTP AE</strong> : April Pro 300-450€/an + décennale
              </li>
              <li>
                🥇 <strong>VTC AE</strong> : Wakam/Stello 280-450€/an (2-en-1 auto+RC)
              </li>
              <li>
                🥇 <strong>E-commerce boutique</strong> : Hiscox 200-350€/an
              </li>
              <li>
                🥇 <strong>Architecte SARL</strong> : MAF (mutuelle architectes) 1 200-2 500€/an
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Prix RC Pro vraiment si bas ?',
          a: 'OUI pour AE services intellectuels : Hiscox 95€/an = 8€/mois. Possible car : 100% digital + spécialisation services (sinistralité contrôlée) + volume marché France. ATTENTION : prix monte rapidement si BTP, médical, libéral réglementé ou CA important.',
        },
        {
          q: 'Différence prix entre Hiscox 95€ et MMA 250€ pour même profil ?',
          a: 'Hiscox 95€ = digital pure + spécialisation services intellectuels + postériorité 10 ans incluse. MMA 250€ = réseau agences physiques + multi-secteurs + postériorité 5 ans. À profil égal : Hiscox -50-60% car structure de coûts différente.',
        },
        {
          q: 'Comment obtenir le best price possible ?',
          a: '1) Comparer 3-5 assureurs (courtier ORIAS gratuit). 2) Souscription en ligne directe (-10-15%). 3) Franchise +500-1 500€ (-15-20%). 4) Plafond ajusté au risque réel (-10-20%). 5) Paiement annuel (-3-7%). 6) Pack multi-contrats (-10-15%). Total -40-60%.',
        },
      ]}
      relatedMetiers={[
        { name: 'Prix RC Pro (synthèse)', slug: 'prix/rc-pro-prix' },
        { name: 'Tarif RC Pro', slug: 'prix/tarif-rc-pro' },
        { name: 'Assurance RC Pro prix', slug: 'prix/assurance-rc-pro-prix' },
        { name: 'Assurance RC Pro tarif', slug: 'prix/assurance-rc-pro-tarif' },
        { name: 'Comparateur RC Pro', slug: 'comparateur-rc-pro' },
      ]}
    />
  )
}
