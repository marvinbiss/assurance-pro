/**
 * Pilier — "assurance voiture pro btp" (200 vol, KD 1, CPC 150€)
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { COMPARATIF_BTP, EXPERT_BTP, STATS_DEFAULT } from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'assurance-voiture-pro-btp'
const TITLE = 'Assurance Voiture Pro BTP — Utilitaires, transport matériaux'
const TAGLINE =
  "L'assurance voiture pro BTP couvre utilitaires (Trafic, Boxer, Master) avec spécificités transport matériaux + outillage embarqué. Tarifs et 5 leviers d'économies."

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Assurance voiture pro BTP : utilitaires (Trafic 800-1 500€ par an, Master 1 200-2 200€ par an), transport matériaux inclus, outillage embarqué. Comparatif Allianz, MMA, AXA.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance voiture pro BTP est une déclinaison spécifique de l'assurance automobile destinée aux véhicules utilitaires (camionnettes, fourgons, camions légers) utilisés par les artisans et entreprises du Bâtiment. Elle intègre des spécificités essentielles : transport de matériaux (sable, ciment, ferraille), couverture de l'outillage professionnel embarqué, et flexibilité multi-conducteurs (compagnons, apprentis)."
      legalReference="art. L. 211-1 C. assur."
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="decennale"
      expertBio={EXPERT_BTP}
      comparatifRows={COMPARATIF_BTP}
      benefits={[
        {
          icon: '🚐',
          title: 'Utilitaires BTP',
          desc: 'Trafic, Boxer, Master, Berlingo, Kangoo, Jumper, Movano',
        },
        {
          icon: '🏗️',
          title: 'Transport matériaux',
          desc: 'Sable, ciment, ferraille, agglos, terre — inclus en option pro',
        },
        {
          icon: '🛠️',
          title: 'Outillage embarqué',
          desc: 'Couverture vol + dégât outillage professionnel à bord',
        },
        {
          icon: '💰',
          title: '800-2 500€ par an',
          desc: 'Trafic 800-1 500€ • Master 1 200-2 200€ • Camionnette 19T 2 000-2 500€',
        },
      ]}
      sections={[
        {
          h2: 'Garanties spécifiques BTP',
          body: (
            <ul>
              <li>
                <strong>Transport de matériaux</strong> : sable, ciment, ferraille, agglos déclarés
                au contrat
              </li>
              <li>
                <strong>Outillage embarqué</strong> : couverture vol ou dégât outillage à bord
                (forfait 5-15k€)
              </li>
              <li>
                <strong>Multi-conducteurs</strong> : compagnons, apprentis autorisés à conduire
                (sous conditions)
              </li>
              <li>
                <strong>Stationnement chantier</strong> : couverture vol ou vandalisme zones non
                sécurisées
              </li>
              <li>
                <strong>Mission temporaire</strong> : déplacements ponctuels longue distance
              </li>
              <li>
                <strong>Bris de pare-brise</strong> : franchise réduite ou nulle (option fréquente)
              </li>
              <li>
                <strong>Assistance pro</strong> : véhicule de remplacement utilitaire équivalent
              </li>
            </ul>
          ),
        },
        {
          h2: 'Tarifs voiture pro BTP par véhicule',
          body: (
            <ul>
              <li>
                <strong>Berlingo — Kangoo (petit utilitaire)</strong> : 650-1 100€ par an
              </li>
              <li>
                <strong>Trafic — Vivaro (moyen utilitaire)</strong> : 800-1 500€ par an
              </li>
              <li>
                <strong>Boxer — Movano — Jumper (gros utilitaire)</strong> : 1 100-1 800€ par an
              </li>
              <li>
                <strong>Master — Daily — Sprinter (extra-large)</strong> : 1 300-2 200€ par an
              </li>
              <li>
                <strong>Camion 7.5T benne</strong> : 1 800-2 800€ par an
              </li>
              <li>
                <strong>Camion 19T benne ou grue</strong> : 2 500-4 500€ par an
              </li>
              <li>
                <strong>Camion-grue spécialisé</strong> : 3 500-6 000€ par an
              </li>
            </ul>
          ),
        },
        {
          h2: '5 leviers d&apos;économies véhicule pro BTP',
          body: (
            <ol>
              <li>
                <strong>Comparer 5 assureurs BTP</strong> : April Pro, MMA, Allianz Pro, AXA Pro,
                SMABTP — prime varie ×1.5-2 entre eux.
              </li>
              <li>
                <strong>Pack multi-contrats</strong> : RC Pro + Décennale + Multirisque + Auto =
                -15-25% remise paquet.
              </li>
              <li>
                <strong>Augmenter franchise</strong> : passer de 500€ à 1 500€ = -15-20% prime auto.
              </li>
              <li>
                <strong>Telematics — boîtier</strong> : -10-20% si conduite vertueuse trackée
                (Allianz Pro, MMA proposent).
              </li>
              <li>
                <strong>Bonus-malus flotte mutualisé</strong> : pour 2+ véhicules, 1 compte = 1
                bonus-malus moyen.
              </li>
            </ol>
          ),
        },
      ]}
      faq={[
        {
          q: 'Mon utilitaire perso peut-il servir au pro BTP ?',
          a: 'NON sans souscription assurance pro. Les contrats auto particuliers excluent l&apos;usage professionnel (clause &quot;usage privé exclusif&quot;). Sinistre en mission pro = refus de l&apos;assureur. Souscrire assurance &quot;auto-mission&quot; ou requalifier en auto pro.',
        },
        {
          q: 'Tarif assurance Trafic pro BTP en 2026 ?',
          a: 'Trafic standard pour artisan AE : 800-1 200€ par an chez Allianz Pro ou MMA. Avec transport matériaux + outillage embarqué : 1 100-1 500€ par an. En Île-de-France : prime +15-25%.',
        },
        {
          q: 'Quel assureur recommandé pour flotte BTP ?',
          a: 'Pour 3-15 véhicules BTP : Allianz Pro Flotte ou MMA Flotte BTP — leaders avec gestion en ligne et tarifs négociés. SMABTP également pertinent (paritaire BTP).',
        },
        {
          q: 'L&apos;outillage volé dans mon véhicule est-il couvert ?',
          a: 'Seulement si vous avez souscrit la garantie &quot;outillage embarqué&quot; en option (forfait standard 5-15k€). Sans cette option, l&apos;outillage est exclu (relève multirisque pro local ou assurance spécifique outillage).',
        },
      ]}
      relatedMetiers={[
        { name: 'PRO BTP Assurance Auto', slug: 'pro-btp-assurance-auto' },
        { name: 'Assurance flotte automobile', slug: 'assurance-flotte-automobile' },
        { name: 'Assurance auto-entreprise', slug: 'assurance-auto-entreprise' },
        { name: 'Assurance voiture pro', slug: 'assurance-voiture-professionnelle' },
        { name: 'Assurance pro BTP (pack)', slug: 'assurance-pro-btp' },
      ]}
    />
  )
}
