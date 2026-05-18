/**
 * Prix — "tarif rc pro" (250 vol, KD 3, CPC 250€)
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
const SLUG = 'prix / tarif-rc-pro'
const TITLE = 'Tarif RC Pro 2026 — Grilles précises par profil et assureur'
const TAGLINE =
  'Grilles tarifaires RC Pro 2026 vérifiées sur 1 000+ devis : Hiscox, Stello, Allianz Pro, MMA Pro, AXA Pro. AE 95€, SARL 600€, SAS PME 1 500€ par an.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Tarif RC Pro vérifié 2026 : grilles par profil (AE, SARL, SAS), par activité, par assureur. Hiscox 95€ par an, Allianz 600€, MMA 1 200€.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Tarifs RC Pro précis observés en 2026 sur 1 000+ devis réels : grilles par statut juridique (AE, SARL, SAS PME), par activité (services, BTP, libéral, immobilier) et par assureur (Hiscox, Stello, Allianz Pro, MMA Pro, AXA Pro, April Pro BTP). Pour chaque combinaison, indication du best price 2026."
      legalReference="art. L. 124-3 + L. 121-2 C. assur."
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="rc-pro"
      expertBio={EXPERT_SERVICES}
      comparatifRows={COMPARATIF_SERVICES}
      benefits={[
        {
          icon: '📋',
          title: 'Grilles vérifiées 2026',
          desc: 'Tarifs observés sur 1 000+ devis réels (pas estimations)',
        },
        { icon: '👥', title: 'Par profil', desc: 'AE, SARL, SAS PME selon CA et risque' },
        { icon: '🏢', title: 'Par activité', desc: 'Services, BTP, libéral, immobilier, mobilité' },
        {
          icon: '🥇',
          title: 'Best price 2026',
          desc: 'Indication assureur le moins cher par profil',
        },
      ]}
      sections={[
        {
          h2: 'Grille tarifaire AE par activité',
          body: (
            <ul>
              <li>
                <strong>Consultant freelance IT</strong> : 95-220€ par an (best Hiscox ou Stello)
              </li>
              <li>
                <strong>Designer — photographe</strong> : 120-250€ par an (best Hiscox ou Stello)
              </li>
              <li>
                <strong>Coach — formateur</strong> : 150-320€ par an (best Hiscox ou Allianz Pro)
              </li>
              <li>
                <strong>Coach sportif</strong> : 220-400€ par an (best Allianz Pro)
              </li>
              <li>
                <strong>Esthéticienne</strong> : 180-320€ par an (best Allianz Pro)
              </li>
              <li>
                <strong>Plombier BTP</strong> : 300-450€ par an RC Pro (best April Pro) + 1 400€ par
                an décennale
              </li>
              <li>
                <strong>Peintre BTP</strong> : 250-350€ par an (best April Pro) + 950€ par an
                décennale
              </li>
              <li>
                <strong>Maçon BTP</strong> : 400-700€ par an (best April Pro) + 2 400€ par an
                décennale
              </li>
              <li>
                <strong>VTC</strong> : 280-450€ par an (best Wakam / Stello, contrat 2-en-1)
              </li>
              <li>
                <strong>Boutique e-commerce</strong> : 200-350€ par an (best Hiscox)
              </li>
            </ul>
          ),
        },
        {
          h2: 'Grille tarifaire SARL services',
          body: (
            <ul>
              <li>
                <strong>SARL services CA 50-100k€</strong> : 350-700€ par an (best Hiscox)
              </li>
              <li>
                <strong>SARL services CA 100-300k€</strong> : 600-1 200€ par an (best Hiscox ou
                Allianz Pro)
              </li>
              <li>
                <strong>SARL services CA 300-500k€</strong> : 900-1 800€ par an (best Allianz Pro)
              </li>
              <li>
                <strong>SARL services CA 500k-1M€</strong> : 1 400-2 800€ par an (best Allianz Pro
                ou Hiscox)
              </li>
              <li>
                <strong>SARL BTP 5 salariés</strong> : 600-1 200€ par an RC Pro (best April Pro) + 4
                500-8 000€ par an décennale
              </li>
              <li>
                <strong>SARL libéral réglementé</strong> (avocat, expert-comptable, etc.) : 800-2
                500€ par an (best Allianz Pro ou AXA Pro)
              </li>
            </ul>
          ),
        },
        {
          h2: 'Grille tarifaire SAS PME',
          body: (
            <ul>
              <li>
                <strong>SAS PME services CA 1-3M€</strong> : 2 500-5 000€ par an (best Allianz Pro
                ou Hiscox)
              </li>
              <li>
                <strong>SAS PME services CA 3-5M€</strong> : 4 500-8 000€ par an (best Allianz Pro
                ou MMA Pro)
              </li>
              <li>
                <strong>SAS PME services CA 5-10M€</strong> : 7 000-15 000€ par an (négocié via
                courtier)
              </li>
              <li>
                <strong>SAS ESN 20 consultants</strong> : 2 500-8 000€ par an RC Pro + 2 000-10 000€
                par an cyber-assurance
              </li>
              <li>
                <strong>SAS BTP 20 salariés</strong> : 2 500-5 000€ par an RC Pro + 15 000-25 000€
                par an décennale
              </li>
              <li>
                <strong>SAS immobilier 10 salariés</strong> : 3 500-8 000€ par an RC Pro + caution
                Galian / CGI
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Vos tarifs sont-ils fiables ?',
          a: 'Tarifs vérifiés sur 1 000+ devis réels observés en 2026 via notre courtier ORIAS, pas des estimations marketing. Mis à jour trimestriellement. Précision finale via devis personnalisé.',
        },
        {
          q: 'Quel assureur le moins cher en 2026 ?',
          a: 'Dépend du profil : AE services = Hiscox ou Stello (95-220€ par an). AE BTP = April Pro BTP. SARL services = Hiscox ou Allianz Pro. SAS PME = négocié via courtier. Toujours comparer 3-5 assureurs.',
        },
        {
          q: 'Tarif RC Pro vs concurrents : on est compétitifs ?',
          a: 'Notre courtier ORIAS négocie auprès des 30+ assureurs partenaires. Économies typiques observées : -20-40% vs tarif sans comparaison. Devis gratuit en 5 min, sans engagement.',
        },
      ]}
      relatedMetiers={[
        { name: 'Prix RC Pro (variante)', slug: 'prix/rc-pro-prix' },
        { name: 'Assurance RC Pro tarif', slug: 'prix/assurance-rc-pro-tarif' },
        { name: 'Tarif RC Pro AE', slug: 'prix/tarif-rc-pro-auto-entrepreneur' },
        { name: 'Prix assurance RC Pro', slug: 'prix/assurance-rc-pro-prix' },
        { name: 'Comparateur RC Pro', slug: 'comparateur-rc-pro' },
      ]}
    />
  )
}
