/**
 * Pilier — "assurance tous risques chantier" (200 vol, KD 0, CPC 80€)
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { COMPARATIF_BTP, EXPERT_BTP, STATS_DEFAULT } from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'assurance-tous-risques-chantier'
const TITLE = 'Assurance Tous Risques Chantier (TRC) — Garanties, tarifs 2026'
const TAGLINE =
  "L'assurance Tous Risques Chantier (TRC) couvre les dommages matériels durant la construction : vol, incendie, vandalisme, intempéries. Tarifs et obligation."

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Tous Risques Chantier (TRC) : assurance complémentaire décennale couvrant le chantier en cours. Vol matériaux, incendie, vandalisme, intempéries. Tarif 1.5-5% montant travaux.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance Tous Risques Chantier (TRC) est une assurance temporaire qui couvre les dommages matériels survenant DURANT la construction d'un ouvrage : vol de matériaux, incendie, vandalisme, intempéries exceptionnelles, casse engins. Elle n'est pas obligatoire (contrairement à la décennale) mais fortement recommandée pour les chantiers significatifs (> 100k€), souvent imposée par les maîtres d'ouvrage publics et les banques finançant la construction."
      legalReference="Pas d'obligation légale (contrat facultatif) — souvent exigée par MO publics et banques"
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="tous-risques-chantier"
      expertBio={EXPERT_BTP}
      comparatifRows={COMPARATIF_BTP}
      benefits={[
        {
          icon: '🏗️',
          title: 'Couvre pendant chantier',
          desc: 'Activée à l&apos;ouverture chantier, fin à la réception',
        },
        {
          icon: '🚨',
          title: 'Vol + incendie + vandalisme',
          desc: 'Matériaux livrés, équipements en place, ouvrages en cours',
        },
        {
          icon: '🌧️',
          title: 'Intempéries exceptionnelles',
          desc: 'Tempête, grêle, gel, inondation localisée chantier',
        },
        {
          icon: '💰',
          title: '1.5-5% montant travaux',
          desc: 'Chantier 200k€ : prime 3 000-10 000€. Petit chantier : forfait 800-1 500€',
        },
      ]}
      sections={[
        {
          h2: 'Que couvre la TRC concrètement',
          body: (
            <ul>
              <li>
                <strong>Dommages matériels à l&apos;ouvrage en construction</strong> : effondrement
                partiel, fissure pendant chantier
              </li>
              <li>
                <strong>Vol de matériaux livrés sur chantier</strong> : sable, ciment, parpaings,
                bois, cuivre, fer à béton (vols fréquents la nuit)
              </li>
              <li>
                <strong>Vol d&apos;équipements en place</strong> : chaudières installées,
                sanitaires, fenêtres posées
              </li>
              <li>
                <strong>Incendie chantier</strong> : feu accidentel (cigarette compagnon, soudure)
              </li>
              <li>
                <strong>Vandalisme</strong> : dégradations volontaires (tags, casses)
              </li>
              <li>
                <strong>Intempéries exceptionnelles</strong> : tempête, grêle, gel grave, inondation
                localisée
              </li>
              <li>
                <strong>Catastrophes naturelles</strong> (CatNat reconnue par arrêté)
              </li>
              <li>
                <strong>Frais de déblaiement</strong> et remise en état après sinistre
              </li>
            </ul>
          ),
        },
        {
          h2: 'Qui doit souscrire et quand',
          body: (
            <>
              <p>
                <strong>Maître d&apos;ouvrage (MO)</strong> souscrit habituellement la TRC :
              </p>
              <ul>
                <li>Promoteur immobilier (obligation contractuelle banques finançant)</li>
                <li>Propriétaire individuel pour construction maison neuve (recommandé)</li>
                <li>Société immobilière (SCI, foncière) pour rénovations lourdes</li>
                <li>MO public (collectivités) souvent imposée par marchés publics</li>
              </ul>
              <p>
                <strong>Quand souscrire</strong> : AVANT démarrage chantier (idéalement au moment du
                permis de construire). Souscription tardive = exclusion sinistres antérieurs.
              </p>
              <p>
                <strong>Durée</strong> : couvre du début chantier jusqu&apos;à la réception
                (généralement 6-24 mois selon ampleur).
              </p>
            </>
          ),
        },
        {
          h2: 'Tarifs TRC 2026 selon montant chantier',
          body: (
            <ul>
              <li>
                <strong>Rénovation appartement (50-100k€)</strong> : forfait 800-1 500€ TTC
              </li>
              <li>
                <strong>Construction maison individuelle (200-400k€)</strong> : 3 000-12 000€ TTC
                (1.5-3% montant)
              </li>
              <li>
                <strong>Promotion immobilière (1-5M€)</strong> : 25 000-150 000€ TTC (2-3% montant)
              </li>
              <li>
                <strong>Chantier complexe avec démolition</strong> : 3-5% montant (risque accru)
              </li>
              <li>
                <strong>Chantier urbain en site occupé</strong> : 3-4% (vandalisme + voisinage)
              </li>
              <li>
                <strong>Chantier en zone CatNat exposée</strong> : 2.5-4% (inondations, tempêtes)
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'TRC obligatoire pour construction maison ?',
          a: 'NON, pas légalement obligatoire (vs décennale qui est obligatoire). MAIS : 1) Banques exigent souvent TRC avant de débloquer le prêt construction, 2) MO publics (collectivités) imposent TRC dans marchés publics, 3) Vivement recommandée pour tout chantier > 100k€.',
        },
        {
          q: 'Combien coûte une TRC pour maison neuve 250 000€ ?',
          a: 'Prime indicative : 4 000-7 500€ TTC (1.5-3% du montant). Souscription par MO (propriétaire). Pris en charge généralement dans budget construction. Allianz, MMA, SMABTP, AXA Pro sont les principaux assureurs.',
        },
        {
          q: 'Quelle différence TRC vs Décennale vs Dommages-Ouvrage ?',
          a: 'TRC = pendant chantier (vol, incendie, intempéries). DO = après réception, indemnisation rapide MO (subrogation décennale). Décennale = constructeur, 10 ans après réception. Les 3 sont complémentaires.',
        },
        {
          q: 'Le vol de matériaux est-il couvert ?',
          a: 'Oui, c&apos;est l&apos;un des sinistres TRC les plus fréquents (50% des sinistres). Conditions : matériaux livrés sur chantier, déclarés inventaire, mesures sécurité minimales (clôture, éclairage). Franchise standard 500-1 500€.',
        },
      ]}
      relatedMetiers={[
        { name: 'Assurance décennale (vue globale)', slug: 'assurance-decennale' },
        { name: 'Dommages-Ouvrage', slug: 'assurance-dommages-ouvrage' },
        { name: 'Décennale BTP', slug: 'assurance-decennale-btp' },
        { name: 'Assurance pro BTP (pack global)', slug: 'assurance-pro-btp' },
        { name: 'Guide Tous Risques Chantier', slug: 'guides/tous-risques-chantier' },
      ]}
    />
  )
}
