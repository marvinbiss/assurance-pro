/**
 * Prix — "tarif mutuelle pro btp retraite" (200 vol, KD 2, CPC 50€)
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'prix/tarif-mutuelle-pro-btp-retraite'
const TITLE = 'Tarif Mutuelle Pro BTP Retraite — Grilles 2026 par âge'
const TAGLINE =
  'Tarif Mutuelle Pro BTP retraite 2026 : 50€/mois à 60 ans, 75€ à 70 ans, 110€ à 80 ans, 140€+ à 85 ans. Anticiper budget santé retraite BTP.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Tarif Mutuelle Pro BTP retraite 2026 par âge : 60 ans 50€/mois, 70 ans 75€, 80 ans 110€, 85 ans 140€+. Anticiper budget santé retraite.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Tarif Mutuelle Pro BTP pour retraités : grille progressive par âge en 2026, vérifiée sur cas réels. Le tarif augmente avec l'âge selon la règle RIA (60% maximum Action Logement Services). Cette page détaille les fourchettes par tranche d'âge, par formule (S2P2 à S4P4) et par situation familiale (isolé / conjoint / famille élargie)."
      legalReference="art. L. 911-1 et suivants Code sécurité sociale + RIA"
      benefits={[
        {
          icon: '👴',
          title: 'Grille par tranche âge',
          desc: '60-65 ans, 65-70 ans, 70-75 ans, 75-80 ans, 80-85 ans, 85+ ans',
        },
        {
          icon: '📋',
          title: 'Par formule S2P2-S4P4',
          desc: 'Du basique au haut de gamme avec dentaire/optique renforcés',
        },
        {
          icon: '💑',
          title: 'Par situation familiale',
          desc: 'Retraité isolé, retraité + conjoint, famille élargie',
        },
        {
          icon: '📊',
          title: 'Comparatif concurrents',
          desc: 'Mutuelle Pro BTP vs Apicil Senior, Harmonie, MAAF',
        },
      ]}
      sections={[
        {
          h2: 'Grille tarif retraite par tranche âge (formule S3 P3)',
          body: (
            <ul>
              <li>
                <strong>60-65 ans</strong> : 50-60€/mois isolé / 90-105€ couple
              </li>
              <li>
                <strong>65-70 ans</strong> : 60-75€/mois isolé / 105-130€ couple
              </li>
              <li>
                <strong>70-75 ans</strong> : 75-95€/mois isolé / 130-160€ couple
              </li>
              <li>
                <strong>75-80 ans</strong> : 95-115€/mois isolé / 160-195€ couple
              </li>
              <li>
                <strong>80-85 ans</strong> : 115-140€/mois isolé / 195-235€ couple
              </li>
              <li>
                <strong>85+ ans</strong> : 140-180€/mois isolé / 235-300€ couple (selon assureur)
              </li>
            </ul>
          ),
        },
        {
          h2: 'Grille par formule retraité 70 ans',
          body: (
            <ul>
              <li>
                <strong>S1 P1 (basique)</strong> : 50-65€/mois — minimum légal, peu de renforts
              </li>
              <li>
                <strong>S2 P2 (intermédiaire)</strong> : 65-85€/mois — base + 1 renfort dentaire OU
                optique
              </li>
              <li>
                <strong>S3 P3 (équilibré)</strong> : 75-95€/mois ⭐ recommandé majorité retraités
              </li>
              <li>
                <strong>S4 P4 (haut de gamme)</strong> : 95-125€/mois — dentaire 500% + optique 400€
                + médecines douces 400€
              </li>
              <li>
                <strong>S5 P5 (premium)</strong> : 120-160€/mois — chambre particulière 80€/j +
                tiers-payant étendu
              </li>
            </ul>
          ),
        },
        {
          h2: 'Conseils budget santé retraite BTP',
          body: (
            <ol>
              <li>
                <strong>Anticiper 60-65 ans</strong> : souscrire avant retraite pour conserver
                continuité Mutuelle Pro BTP active → tarif progressivement majoré mais stable
              </li>
              <li>
                <strong>Choisir formule selon besoins réels</strong> : pas systématiquement haut de
                gamme. S3 P3 suffit si pas de gros soins dentaires/optiques prévus
              </li>
              <li>
                <strong>Bilan annuel</strong> : revoir formule chaque année selon évolution santé
                (ajuster sans tout résilier)
              </li>
              <li>
                <strong>Comparer concurrents</strong> tous les 3 ans : Apicil Senior, Harmonie
                Mutuelle Senior, MAAF Senior. Économies possibles -15-20%
              </li>
              <li>
                <strong>Pack couple</strong> : souvent économies -10-15% vs 2 contrats individuels
              </li>
              <li>
                <strong>Réseaux soins</strong> : utiliser Itelis (Mutuelle Pro BTP) → économies
                dépassements honoraires
              </li>
            </ol>
          ),
        },
      ]}
      faq={[
        {
          q: 'Pourquoi mutuelle retraite plus chère qu&apos;actif ?',
          a: 'Sinistralité augmente avec âge (besoins médicaux croissants) : actif moyen consomme 1 500€/an santé, retraité 70 ans = 4 500€/an, 80 ans = 8 000€/an. Tarif reflète cette sinistralité. Règle RIA limite hausse à 60% maximum ALS (sinon abusif).',
        },
        {
          q: 'Pension retraite BTP couvre-t-elle mutuelle ?',
          a: 'NON. Pension retraite CNRACL/BTP = revenu de remplacement uniquement. Mutuelle santé = dépense supplémentaire à budgétiser (50-180€/mois). Prévoir 600-2 000€/an pour mutuelle pendant retraite (20-25 ans).',
        },
        {
          q: 'Changer mutuelle à la retraite ?',
          a: 'POSSIBLE mais analyser : 1) Mutuelle Pro BTP retraite = continuité historique + réseau Itelis + cures thermales. 2) Concurrents possibles -15-20% mais moins spé BTP. 3) Loi Hamon : résiliation possible à tout moment après 1 an. Comparer avant changer.',
        },
      ]}
      relatedMetiers={[
        { name: 'Mutuelle Pro BTP tarif (vue globale)', slug: 'prix/mutuelle-pro-btp-tarif' },
        { name: 'Mutuelle Pro BTP S3 P3 prix', slug: 'prix/mutuelle-pro-btp-s3-p3-prix' },
        { name: 'Mutuelle Pro BTP S4 P4 prix', slug: 'prix/mutuelle-pro-btp-s4-p4-prix' },
        { name: 'Mutuelle Pro BTP retraité (vue globale)', slug: 'mutuelle-pro-btp-retraite' },
        { name: 'Mutuelle Pro BTP (vue globale)', slug: 'mutuelle-pro-btp' },
      ]}
    />
  )
}
