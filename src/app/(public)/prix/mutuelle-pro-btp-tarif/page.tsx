/**
 * Prix — "mutuelle pro btp tarif" (1 300 vol, KD 1, CPC 80€) HIGH VOL
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { EXPERT_DEFAULT, STATS_DEFAULT } from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'prix / mutuelle-pro-btp-tarif'
const TITLE = 'Mutuelle PRO BTP Tarif — Prix par âge et formule 2026'
const TAGLINE =
  'Tarifs détaillés PRO BTP Mutuelle 2026 par âge (25-65+) et formule (S1-S4) : de 38€ par mois (S1 jeune) à 230€ par mois (S4 senior). Comparatif April Pro Santé.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Tarif PRO BTP Mutuelle 2026 : S1 38-95€ par mois, S2 55-140€ par mois, S3 85-180€ par mois, S4 115-230€ par mois. Comparatif honnête vs April Pro Santé (-15-25%).',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Tarifs PRO BTP Mutuelle 2026 par âge et formule (S1 économique à S4 haut de gamme). Cette page liste les fourchettes précises par tranche d'âge et par niveau, permettant de comparer rapidement avec les alternatives privées (April Pro Santé S3 équivalent à -15-25%)."
      legalReference="Loi Madelin (TNS — déductibilité fiscale) + ANI 2013 (salariés)"
      socialProofStats={STATS_DEFAULT}
      expertBio={EXPERT_DEFAULT}
      benefits={[
        {
          icon: '💰',
          title: 'S1 dès 38€ par mois',
          desc: 'Formule économique 25-45 ans (couverture base)',
        },
        {
          icon: '🏥',
          title: 'S4 jusqu&apos;à 230€ par mois',
          desc: 'Haut de gamme couverture étendue 60+ ans',
        },
        {
          icon: '💼',
          title: 'Madelin déductible TNS',
          desc: 'Cotisations déductibles résultat imposable artisans ou EI',
        },
        {
          icon: '🆚',
          title: '-15-25% vs alternatives',
          desc: 'April Pro Santé S3 = 15-25% moins cher pour profils TNS jeunes',
        },
      ]}
      sections={[
        {
          h2: 'Tarifs PRO BTP par formule et âge 2026',
          body: (
            <ul>
              <li>
                <strong>S1 (économique)</strong> : 38-55€ par mois (25-45 ans) → 65-95€ par mois
                (60+ ans)
              </li>
              <li>
                <strong>S2 (équilibré)</strong> : 55-85€ par mois → 95-140€ par mois
              </li>
              <li>
                <strong>S3 (renforcé)</strong> : 85-115€ par mois → 140-180€ par mois
              </li>
              <li>
                <strong>S4 (haut de gamme)</strong> : 115-150€ par mois → 180-230€ par mois
              </li>
            </ul>
          ),
        },
        {
          h2: 'Tarifs PRO BTP en famille',
          body: (
            <ul>
              <li>
                <strong>Couple sans enfant</strong> : ×1.7 tarif individuel (réduction couple -15%)
              </li>
              <li>
                <strong>Famille 2 enfants</strong> : ×2.4 tarif individuel
              </li>
              <li>
                <strong>Famille 3+ enfants</strong> : ×2.7 tarif individuel (enfants suivants
                gratuit)
              </li>
              <li>
                <strong>Conjoint collaborateur</strong> : tarif TNS individuel
              </li>
            </ul>
          ),
        },
        {
          h2: 'Comparatif tarifs marché 2026',
          body: (
            <ul>
              <li>
                <strong>PRO BTP S3 P3</strong> (TNS 40 ans) : 95-115€ par mois
              </li>
              <li>
                <strong>April Pro Santé S3 équiv.</strong> : 70-95€ par mois (-15-25%)
              </li>
              <li>
                <strong>Harmonie Mutuelle BTP S3</strong> : 80-105€ par mois
              </li>
              <li>
                <strong>MMA Mutuelle Pro Niv 3</strong> : 85-110€ par mois
              </li>
              <li>
                <strong>Aon Santé Pro</strong> : 95-130€ par mois (premium)
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Tarif PRO BTP pour un artisan 45 ans S3 ?',
          a: 'Formule S3 standard TNS 45 ans : 95-115€ par mois (PRO BTP). Madelin déductible si statut TNS au régime réel. Économie fiscale 22-45% prime selon TMI.',
        },
        {
          q: 'PRO BTP en famille combien ?',
          a: 'Famille 2 enfants S3 P3 TNS 40 ans : 220-280€ par mois total. Conjoint sans activité bénéficie tarif TNS individuel. Enfants 3+ : gratuits.',
        },
        {
          q: 'Madelin déductible PRO BTP ?',
          a: 'OUI pour TNS au régime réel ou simplifié. Cotisations PRO BTP déductibles du résultat (art. 154 bis CGI). Plafonds Madelin à vérifier avec comptable. Économie 22-45% selon TMI.',
        },
        {
          q: 'Comment réduire le tarif PRO BTP ?',
          a: '1) Comparer 3-5 mutuelles BTP (April Pro Santé -15-25%). 2) Ajuster formule à besoins réels (S2 vs S3). 3) Choisir paiement annuel (-2-3%). 4) Bilan santé : si pas besoin gros forfaits, S1/S2 suffit.',
        },
      ]}
      relatedMetiers={[
        { name: 'PRO BTP Mutuelle (vue globale)', slug: 'pro-btp-mutuelle' },
        { name: 'Mutuelle pro BTP (comparatif)', slug: 'mutuelle-pro-btp' },
        { name: 'PRO BTP S4 P4 prix', slug: 'prix/mutuelle-pro-btp-s4-p4-prix' },
        { name: 'PRO BTP S3 P3 prix', slug: 'prix/mutuelle-pro-btp-s3-p3-prix' },
        { name: 'Tarif PRO BTP retraite', slug: 'prix/tarif-mutuelle-pro-btp-retraite' },
      ]}
    />
  )
}
