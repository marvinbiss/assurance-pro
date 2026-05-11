/**
 * Pilier — "rc pro batiment" (40 vol, KD 1, CPC 600€) MONEY
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'rc-pro-batiment'
const TITLE = 'RC Pro Bâtiment — Complément Décennale BTP, garanties et tarifs'
const TAGLINE =
  'La RC Pro bâtiment couvre les dommages causés à tiers pendant le chantier BTP (avant réception). Complément essentiel de la décennale. Tarifs AE 250-700€/an.'

export const metadata: Metadata = {
  title: `${TITLE} | Vivos Assurance`,
  description:
    'RC Pro bâtiment : protection PENDANT chantier (vs Décennale après réception). Tarif AE 250-700€/an, SARL 500-1 500€/an. Pack RC Pro + Décennale = -15-25%.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="La RC Pro bâtiment est l'assurance complémentaire de la Décennale pour les professionnels BTP. Elle couvre les dommages causés à des tiers PENDANT le chantier (avant la réception), contrairement à la Décennale qui couvre les défauts d'ouvrage 10 ANS APRÈS RÉCEPTION. Sinistres typiques RC Pro bâtiment : chute échelle sur voiture client, casse matériel client lors intervention, blessure visiteur chantier, dégât voisinage. Indispensable en complément de la Décennale."
      legalReference="art. L. 124-3 + L. 121-2 C. assur."
      benefits={[
        {
          icon: '🔧',
          title: 'Pendant chantier',
          desc: 'Dommages tiers PENDANT exécution (avant réception)',
        },
        {
          icon: '🛡️',
          title: 'Complément Décennale',
          desc: 'Couvre ce que Décennale n&apos;assure pas (chantier en cours)',
        },
        {
          icon: '💰',
          title: '250-1 500€/an',
          desc: 'AE 250-700€ • SARL 500-1 500€ — selon métier et CA',
        },
        {
          icon: '📦',
          title: 'Pack RC Pro + Décennale',
          desc: 'Souscription combinée chez April Pro / SMABTP = -15-25%',
        },
      ]}
      sections={[
        {
          h2: 'Sinistres RC Pro bâtiment typiques',
          body: (
            <ul>
              <li>
                <strong>Chute échelle sur voiture client</strong> : 3-8k€ remplacement véhicule
              </li>
              <li>
                <strong>Casse matériel client lors intervention</strong> : MacBook, écran, télé,
                mobilier 1-10k€
              </li>
              <li>
                <strong>Blessure visiteur chantier</strong> : chute objet, glissade, accident →
                indemnisation 5-50k€ (selon gravité)
              </li>
              <li>
                <strong>Dégât voisinage</strong> : vibrations marteau piqueur, fissure mur mitoyen,
                poussière → 5-30k€
              </li>
              <li>
                <strong>Brûlure cuisine chantier</strong> : feu accidentel cigarette compagnon,
                soudure → 20-200k€
              </li>
              <li>
                <strong>Fuite d&apos;eau pendant chantier plombier</strong> : dégât parquet salon
                avant pose mitigeur → 5-20k€
              </li>
              <li>
                <strong>Tache peinture mobilier client</strong> : peinture sur canapé Roche Bobois 3
                500€ + parquet 4 000€
              </li>
              <li>
                <strong>
                  Coup d&apos;outil sur compagnon de chantier d&apos;une autre entreprise
                </strong>{' '}
                : sous-traitant blessé → indemnité prud&apos;hommes 50-150k€
              </li>
            </ul>
          ),
        },
        {
          h2: 'Pourquoi RC Pro indispensable même avec Décennale',
          body: (
            <ul>
              <li>
                <strong>Décennale = APRÈS réception uniquement</strong>. Sinistre PENDANT chantier
                (avant PV réception) → non couvert par Décennale.
              </li>
              <li>
                <strong>RC Exploitation incluse</strong> : visiteurs chantier, public, voisinage. La
                Décennale ne couvre PAS ces tiers pendant l&apos;activité.
              </li>
              <li>
                <strong>Casse matériel client</strong> : pendant intervention chez le client (pose
                équipement, intervention dans logement). Décennale couvre l&apos;ouvrage, pas le
                mobilier client.
              </li>
              <li>
                <strong>Dommages voisinage</strong> : vibrations, poussière, fissures mur mitoyen.
                Décennale couvre votre chantier, pas les voisins.
              </li>
              <li>
                <strong>Sans RC Pro</strong> : ces sinistres tombent sur votre patrimoine personnel
                (AE) ou patrimoine dirigeant (SARL/SAS en cas faute gestion).
              </li>
            </ul>
          ),
        },
        {
          h2: 'Tarifs RC Pro bâtiment 2026',
          body: (
            <ul>
              <li>
                <strong>Peintre AE</strong> : 250-400€/an (en complément décennale)
              </li>
              <li>
                <strong>Plâtrier AE</strong> : 280-450€/an
              </li>
              <li>
                <strong>Carreleur AE</strong> : 300-500€/an
              </li>
              <li>
                <strong>Plombier AE</strong> : 400-650€/an
              </li>
              <li>
                <strong>Électricien AE</strong> : 450-700€/an
              </li>
              <li>
                <strong>Maçon AE</strong> : 500-800€/an
              </li>
              <li>
                <strong>Couvreur AE</strong> : 600-1 000€/an (risque chute haute)
              </li>
              <li>
                <strong>Multi-services BTP AE</strong> : 600-1 200€/an
              </li>
              <li>
                <strong>SARL BTP 3 salariés</strong> : 800-1 500€/an
              </li>
              <li>
                <strong>SAS BTP PME 10 salariés</strong> : 1 500-3 500€/an
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'RC Pro bâtiment est-elle obligatoire ?',
          a: 'Pas strictement obligatoire par la loi (vs Décennale obligatoire Spinetta). MAIS fortement recommandée : sans RC Pro, les sinistres pendant chantier tombent sur votre patrimoine perso. Pour un AE peintre : prime 250-400€/an vs sinistre potentiel 5-50k€. ROI évident.',
        },
        {
          q: 'Différence RC Pro et RC Exploitation pour BTP ?',
          a: "RC Pro = couvre dommages liés à votre PRESTATION (erreur, malfaçon, conseil). RC Exploitation = couvre dommages causés à tiers SUR votre site/lieu d'activité (visiteur qui glisse, public sur chantier). Les 2 sont souvent incluses dans la même police RC Pro Bâtiment (vérifier conditions générales).",
        },
        {
          q: 'Pack RC Pro Bâtiment + Décennale = combien d&apos;économies ?',
          a: 'Pour AE peintre : RC Pro 350€ + Décennale 950€ = 1 300€ séparés vs 1 100€ pack = -15%. Pour SARL BTP 5 salariés : 1 200€ + 5 000€ = 6 200€ séparés vs 5 100€ pack = -18%. Souscrire ensemble systématiquement.',
        },
        {
          q: 'Quelle franchise pour RC Pro bâtiment ?',
          a: 'Standard : 500-1 500€ par sinistre. Plus la franchise est élevée, moins la prime est chère (-10-15% si vous passez de 500€ à 1 500€). Adapter à votre capacité de trésorerie en cas de sinistre.',
        },
      ]}
      relatedMetiers={[
        { name: 'RC Pro et Décennale (combiné)', slug: 'rc-pro-et-decennale' },
        { name: 'Assurance RC Pro et Décennale', slug: 'assurance-rc-pro-et-decennale' },
        { name: 'Assurance RC Pro (vue globale)', slug: 'assurance-rc-pro' },
        { name: 'Décennale BTP', slug: 'assurance-decennale-btp' },
        { name: 'Assurance pro BTP (pack complet)', slug: 'assurance-pro-btp' },
      ]}
    />
  )
}
