/**
 * Pilier — "pro btp assurance auto" (TIER S — 300 vol/mois, KD 0)
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { COMPARATIF_BTP, EXPERT_BTP, STATS_DEFAULT } from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'pro-btp-assurance-auto'
const TITLE = 'PRO BTP Assurance Auto — Flotte BTP, utilitaires, comparatif'
const TAGLINE =
  'PRO BTP propose une assurance auto dédiée au secteur BTP : utilitaires, camions, flotte de chantier. Tarifs, alternatives (Allianz Pro, MMA Flotte, AXA Flotte) et leviers d&apos;économies.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Assurance auto PRO BTP : couverture utilitaires (Trafic, Master, Boxer), camions chantier, flotte multi-véhicules. Comparatif avec Allianz, MMA, AXA. Tarifs et économies.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="PRO BTP (l'institution paritaire du Bâtiment) propose en complément de sa mutuelle santé une offre d'assurance auto spécifique aux professionnels du BTP : utilitaires légers, camionnettes, camions de chantier, flotte. Cette page compare l'offre PRO BTP Auto vs les alternatives privées (Allianz Pro, MMA Flotte, AXA Flotte) et détaille les leviers d'économies pour les entreprises BTP multi-véhicules."
      legalReference="art. L. 211-1 C. assur. (obligation assurance automobile)"
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="decennale"
      expertBio={EXPERT_BTP}
      comparatifRows={COMPARATIF_BTP}
      benefits={[
        {
          icon: '🚐',
          title: 'Utilitaires BTP',
          desc: 'Trafic, Boxer, Master, Berlingo, Kangoo — couverture professionnelle',
        },
        {
          icon: '🚛',
          title: 'Camions chantier',
          desc: '3,5T à 19T+, transport matériaux, bennes, plateaux',
        },
        {
          icon: '🚗',
          title: 'Flotte multi-véhicules',
          desc: 'Gestion centralisée 5-50+ véhicules, tarif négocié',
        },
        {
          icon: '💰',
          title: 'Tarifs préférentiels BTP',
          desc: 'Pack mutuelle + auto + décennale = remise paquet -10-15%',
        },
      ]}
      sections={[
        {
          h2: 'L&apos;offre PRO BTP Auto',
          body: (
            <>
              <p>Caractéristiques de PRO BTP Auto :</p>
              <ul>
                <li>
                  Couverture standard (tiers, tiers étendu, tous risques) sur véhicules de fonction
                  et utilitaires
                </li>
                <li>
                  Spécificité BTP : transport de matériaux (sable, ciment, ferraille) inclus dans
                  option pro
                </li>
                <li>Garantie matériel transporté en option (outillage embarqué)</li>
                <li>Assistance véhicule de remplacement adapté (utilitaire pro)</li>
                <li>Pack mutuelle + auto + décennale possible (remise -10-15%)</li>
              </ul>
            </>
          ),
        },
        {
          h2: 'PRO BTP Auto vs alternatives privées',
          body: (
            <ul>
              <li>
                <strong>PRO BTP Auto</strong> : avantage institution paritaire BTP, services annexes
                (vacances, retraite). Prix moyen.
              </li>
              <li>
                <strong>Allianz Pro Flotte</strong> : leader flotte pro France, plateforme gestion
                en ligne avancée, tarif compétitif &gt;5 véhicules.
              </li>
              <li>
                <strong>MMA Flotte BTP</strong> : spécialiste BTP également, bon rapport prix ou
                services pour SARL ou SAS 3-15 véhicules.
              </li>
              <li>
                <strong>AXA Flotte Pro</strong> : couverture étendue, assistance haut de gamme,
                prime plus élevée mais services premium.
              </li>
              <li>
                <strong>Generali Pro Auto</strong> : alternative équilibrée, programme fidélité
                multi-contrats.
              </li>
            </ul>
          ),
        },
        {
          h2: '5 leviers d&apos;économies flotte BTP',
          body: (
            <ol>
              <li>
                <strong>Mutualiser bonus-malus flotte</strong> : 1 compte unique = 1 bonus-malus
                moyen (vs N comptes individuels)
              </li>
              <li>
                <strong>Telematics — boîtier</strong> : -10-20% prime si conduite vertueuse trackée
              </li>
              <li>
                <strong>Augmenter franchise par sinistre</strong> : -15-20% prime à 1 500-3 000€ par
                sinistre
              </li>
              <li>
                <strong>Pack BTP global</strong> : mutuelle + auto + décennale + multirisque =
                -15-25%
              </li>
              <li>
                <strong>Conducteur principal expérimenté</strong> : permis B &gt;10 ans, sans
                sinistre 36 mois = -10-15%
              </li>
            </ol>
          ),
        },
      ]}
      faq={[
        {
          q: 'PRO BTP propose-t-il vraiment de l&apos;auto pro ?',
          a: 'Oui, en complément de la mutuelle santé. L&apos;offre est plus étroite qu&apos;un assureur auto pur comme Allianz Pro ou MMA Flotte. À comparer cas par cas selon votre profil (nombre véhicules, type, kilométrage).',
        },
        {
          q: 'Comment souscrire l&apos;assurance auto PRO BTP ?',
          a: 'Via votre espace adhérent probtp.com → onglet "Mes assurances" → "Auto". Devis personnalisé + souscription en ligne. Réservé aux adhérents PRO BTP (mutuelle santé active).',
        },
        {
          q: 'Quelle alternative à PRO BTP Auto pour une flotte de 10 véhicules ?',
          a: 'Allianz Pro Flotte ou MMA Flotte BTP sont souvent plus compétitifs sur 5-15 véhicules (-15-30% vs PRO BTP). Comparaison via courtier ORIAS spécialisé BTP recommandée.',
        },
        {
          q: 'Le pack mutuelle + auto + décennale est-il intéressant ?',
          a: 'Oui si vous êtes adhérent PRO BTP existant et avez 1-3 véhicules. Pour des flottes &gt;5 véhicules, un assureur auto dédié (Allianz, MMA Flotte) sera souvent plus avantageux malgré l&apos;absence de remise paquet.',
        },
      ]}
      relatedMetiers={[
        { name: 'PRO BTP Mutuelle (vue globale)', slug: 'pro-btp-mutuelle' },
        { name: 'Assurance flotte automobile', slug: 'assurance-flotte-automobile' },
        { name: 'Assurance auto-entreprise', slug: 'assurance-auto-entreprise' },
        { name: 'Assurance voiture pro', slug: 'assurance-voiture-professionnelle' },
        { name: 'Assurance pro BTP (pack global)', slug: 'assurance-pro-btp' },
      ]}
    />
  )
}
