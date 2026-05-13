/**
 * Prix — "mutuelle pro btp s4 p4 prix" (350 vol, KD 1, CPC 60€)
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'prix/mutuelle-pro-btp-s4-p4-prix'
const TITLE = 'Mutuelle PRO BTP S4 P4 Prix — Tarifs haut de gamme 2026'
const TAGLINE =
  'Prix PRO BTP S4 P4 (formule haut de gamme) : 115-230€/mois selon âge. Garanties premium hospi + dentaire + optique + médecines douces.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Prix PRO BTP S4 P4 : haut de gamme 115-230€/mois. Hospi 500% BR + dentaire implants 2k€ + optique 600€. Comparatif Aon Santé Pro Premium.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="La formule PRO BTP S4 P4 est le niveau premium de la mutuelle PRO BTP : couverture étendue hospitalisation, dentaire, optique, médecines douces. Idéale pour dirigeants BTP, artisans avec famille nombreuse, ou seniors avec besoins santé importants."
      legalReference="Loi Madelin TNS + ANI 2013 salariés"
      benefits={[
        {
          icon: '🏥',
          title: 'Hospi 500% BR',
          desc: 'Chambre particulière + dépassements honoraires illimités',
        },
        {
          icon: '🦷',
          title: 'Dentaire 2k€/an',
          desc: 'Implants + couronnes + ortho adulte couverte',
        },
        {
          icon: '👓',
          title: 'Optique 600€/2 ans',
          desc: 'Verres complexes + lentilles + chirurgie réfractive',
        },
        {
          icon: '💰',
          title: '115-230€/mois',
          desc: '25-45 ans 115€ • 45-60 ans 150€ • 60+ ans 230€',
        },
      ]}
      sections={[
        {
          h2: 'Garanties PRO BTP S4 P4 (premium)',
          body: (
            <ul>
              <li>
                <strong>Hospitalisation</strong> : 100% BR + dépassements 500% BR (chirurgie haut de
                gamme)
              </li>
              <li>
                <strong>Dentaire</strong> : 100% RAC0 + 350% BR prothèses + 2 000€/an implants
              </li>
              <li>
                <strong>Optique</strong> : 100% RAC0 + 600€/2 ans verres complexes + chirurgie
                réfractive 800€/œil
              </li>
              <li>
                <strong>Médecines douces</strong> : 60€/séance ostéo/chiro/étiopathe — 12 séances/an
              </li>
              <li>
                <strong>Cures thermales</strong> : 100% BR + forfait hébergement 300€
              </li>
              <li>
                <strong>Téléconsultation</strong> : illimitée Doctolib + assistance médicale
              </li>
              <li>
                <strong>Assistance hospitalisation</strong> : aide ménagère, garde enfants
              </li>
              <li>
                <strong>Médecines complémentaires</strong> : sophrologie, acupuncture incluses
              </li>
            </ul>
          ),
        },
        {
          h2: 'Comparatif S4 P4 vs alternatives premium',
          body: (
            <ul>
              <li>
                <strong>PRO BTP S4 P4</strong> (TNS 45 ans) : 150-180€/mois
              </li>
              <li>
                <strong>Aon Santé Pro Premium</strong> : 130-170€/mois (-15-20%)
              </li>
              <li>
                <strong>April Pro Santé Top</strong> : 120-160€/mois (-20-25%)
              </li>
              <li>
                <strong>Harmonie Mutuelle BTP S4</strong> : 140-180€/mois (similaire)
              </li>
              <li>
                <strong>MMA Mutuelle Pro Niv 4</strong> : 135-180€/mois
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'PRO BTP S4 P4 vraiment justifié ?',
          a: 'Pertinent si : famille avec enfants ortho, besoin dentaire/optique importants, hospi haut de gamme souhaitée, dirigeant BTP. Sinon : S3 P3 suffit (95-115€/mois TNS 45 ans).',
        },
        {
          q: 'Tarif S4 P4 famille ?',
          a: 'Couple S4 P4 TNS 45 ans : 280-330€/mois. Famille 2 enfants : 380-450€/mois. Famille 3+ enfants : 420-500€/mois (enfants suivants gratuit).',
        },
        {
          q: 'Madelin déductible S4 P4 ?',
          a: 'OUI pour TNS régime réel : 100% cotisations déductibles résultat (art. 154 bis CGI). Économie fiscale 22-45% TMI. Pour S4 P4 à 180€/mois TMI 30% : économie 65€/mois.',
        },
        {
          q: 'S4 P4 vs S3 P3 différence ?',
          a: 'S3 P3 = 95-180€/mois (renforcé). S4 P4 = 115-230€/mois (premium). Différences : hospi 500% BR vs 300%, dentaire 2k€ vs 1.5k€, méd. douces 12 vs 6 séances/an, optique 600€ vs 350€.',
        },
      ]}
      relatedMetiers={[
        { name: 'PRO BTP Mutuelle (vue globale)', slug: 'pro-btp-mutuelle' },
        { name: 'PRO BTP S3 P3 prix', slug: 'prix/mutuelle-pro-btp-s3-p3-prix' },
        { name: 'PRO BTP S3 P3 avis', slug: 'mutuelle-pro-btp-s3-p3-avis' },
        { name: 'Tarif PRO BTP global', slug: 'prix/mutuelle-pro-btp-tarif' },
        { name: 'BTP Pro Mutuelle (comparatif)', slug: 'btp-pro-mutuelle' },
      ]}
    />
  )
}
