/**
 * Pilier — "mutuelle pro btp s3 p3 avis" (TIER S — 300 vol/mois, KD 0)
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'mutuelle-pro-btp-s3-p3-avis'
const TITLE = 'Mutuelle PRO BTP S3 P3 — Avis, garanties, alternatives 2026'
const TAGLINE =
  'Avis et analyse du contrat PRO BTP S3 P3 (formule intermédiaire renforcée) : garanties détaillées, tarifs par âge, retours d&apos;adhérents et comparatif avec April Pro Santé.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'PRO BTP S3 P3 : analyse complète de la formule intermédiaire renforcée. Garanties hospi, dentaire, optique, méd. douces. Avis adhérents, tarifs 65-140€/mois, alternatives.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="La mutuelle PRO BTP propose 4 niveaux de garanties (S1 économique → S4 premium) déclinés en sous-formules P1 à P4 (modules options). La formule S3 P3 correspond au niveau intermédiaire renforcé : couverture solide hospitalisation, dentaire, optique et médecines douces, à un tarif intermédiaire (65-140€/mois selon âge). Cette page détaille les garanties exactes, donne des retours d'adhérents et compare avec les alternatives privées (April Pro Santé S3 équivalent, Harmonie Mutuelle BTP, MMA Mutuelle Pro)."
      benefits={[
        {
          icon: '🏥',
          title: 'Hospitalisation S3',
          desc: 'Chambre particulière + dépassements honoraires jusqu&apos;à 300% BR',
        },
        {
          icon: '🦷',
          title: 'Dentaire renforcé P3',
          desc: 'Implants + couronnes + ortho adulte. Forfait 1 200-1 500€/an',
        },
        {
          icon: '👓',
          title: 'Optique étendue',
          desc: 'Verres complexes + lentilles + forfait 400-500€/2 ans',
        },
        {
          icon: '💰',
          title: '65-140€/mois',
          desc: 'Selon âge : 25-45 ans 65€ • 45-60 ans 95€ • 60+ ans 140€',
        },
      ]}
      sections={[
        {
          h2: 'Détail des garanties S3 P3',
          body: (
            <ul>
              <li>
                <strong>Hospitalisation</strong> : 100% BR + dépassements jusqu&apos;à 300% BR,
                forfait journalier illimité, chambre particulière 70€/jour, télémédecine incluse
              </li>
              <li>
                <strong>Dentaire</strong> : 100% RAC0 sur soins courants, 250% BR sur prothèses
                (implants couverts à hauteur de 1 500€/dent), orthodontie adulte 800€/an
              </li>
              <li>
                <strong>Optique</strong> : 100% RAC0 + 350€/verres complexes/2 ans, lentilles
                250€/an, chirurgie réfractive 600€/œil (forfait à vie)
              </li>
              <li>
                <strong>Médecines douces</strong> : 30€/séance ostéo/chiro/étiopathe, limite 6
                séances/an
              </li>
              <li>
                <strong>Cures thermales</strong> : prise en charge complément BR
              </li>
              <li>
                <strong>Téléconsultation Doctolib partenaire</strong> : incluse illimité
              </li>
            </ul>
          ),
        },
        {
          h2: 'Avis adhérents (synthèse retours)',
          body: (
            <>
              <p>
                <strong>Points forts mentionnés</strong> :
              </p>
              <ul>
                <li>
                  Espace adhérent probtp.com : interface claire, suivi remboursements en temps réel
                </li>
                <li>Délai télétransmission : 3-7 jours ouvrés en général tenu</li>
                <li>Service téléphonique : équipe BTP-spécialisée, réponses techniques précises</li>
                <li>Hospitalisation : prise en charge directe rapide, pas d&apos;avance frais</li>
              </ul>
              <p>
                <strong>Points faibles mentionnés</strong> :
              </p>
              <ul>
                <li>
                  Tarifs supérieurs à April Pro Santé S3 équivalent (~15-25% plus cher en moyenne)
                </li>
                <li>Plafond ortho adulte limité (800€ vs 1 200€ chez Harmonie Mutuelle BTP)</li>
                <li>Délai remboursement papier parfois supérieur à 10 jours en période chargée</li>
                <li>
                  Refus prise en charge médecines alternatives non listées (refus naturopathe)
                </li>
              </ul>
            </>
          ),
        },
        {
          h2: 'Comparaison S3 P3 vs alternatives',
          body: (
            <ul>
              <li>
                <strong>PRO BTP S3 P3</strong> : 65-140€/mois — solide mais cher. Avantage :
                institution paritaire BTP.
              </li>
              <li>
                <strong>April Pro Santé S3 équiv.</strong> : 55-110€/mois — best price, garanties
                très proches. Idéal TNS jeune.
              </li>
              <li>
                <strong>Harmonie Mutuelle BTP S3</strong> : 60-125€/mois — paritaire (groupe VYV),
                forfait ortho meilleur.
              </li>
              <li>
                <strong>MMA Mutuelle Pro Niv 3</strong> : 70-130€/mois — flexibilité formules, bon
                dentaire/optique.
              </li>
              <li>
                <strong>Aon Santé Pro</strong> : 80-160€/mois — premium, plafonds étendus.
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Que signifie S3 P3 chez PRO BTP ?',
          a: 'S3 = niveau de garanties global (3e sur 4, intermédiaire renforcé). P3 = pack d&apos;options associé (3e sur 4, options élargies). Combinés, ils représentent une formule équilibrée pour besoins santé moyens-importants sans aller au S4 P4 haut de gamme.',
        },
        {
          q: 'Quel tarif PRO BTP S3 P3 pour un artisan de 45 ans ?',
          a: 'Tarif standard 2026 : 95-115€/mois (TNS). En famille (conjoint + 2 enfants) : 220-280€/mois. Madelin déductible si statut TNS.',
        },
        {
          q: 'PRO BTP S3 P3 vs April Pro S3 : lequel choisir ?',
          a: 'April Pro est 15-25% moins cher pour garanties équivalentes, idéal TNS jeune (25-45 ans). PRO BTP S3 P3 garde l&apos;avantage institutionnel paritaire (services annexes, retraite, vacances). Notre courtier ORIAS peut comparer cas par cas.',
        },
        {
          q: 'Comment résilier PRO BTP S3 P3 ?',
          a: 'Contrat individuel TNS : résiliation à tout moment après 1 an d&apos;engagement (loi infra-annuelle 2020). Lettre recommandée AR à PRO BTP, préavis 1 mois. Conserver attestation droits pour transition.',
        },
      ]}
      relatedMetiers={[
        { name: 'PRO BTP Mutuelle (vue globale)', slug: 'pro-btp-mutuelle' },
        { name: 'Mutuelle pro BTP (comparatif)', slug: 'mutuelle-pro-btp' },
        { name: 'PRO BTP — Remboursement', slug: 'pro-btp-mutuelle-remboursement' },
        { name: 'PRO BTP — Mon compte', slug: 'pro-btp-mutuelle-remboursement-mon-compte' },
        { name: 'Mutuelle TNS', slug: 'mutuelle-tns' },
        { name: 'Mutuelle dirigeant', slug: 'mutuelle-dirigeant' },
      ]}
    />
  )
}
