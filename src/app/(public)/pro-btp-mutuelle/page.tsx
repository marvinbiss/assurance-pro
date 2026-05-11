/**
 * Pilier — "pro btp mutuelle" (TIER S — 16 000 vol/mois, KD 4)
 * Source : Ahrefs 2026-04-29 (kw-mutuelle_pro_BTP.json)
 * Complément de /mutuelle-pro-btp (variation ordre des mots).
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400

const SLUG = 'pro-btp-mutuelle'
const TITLE = 'PRO BTP Mutuelle — Tarifs 2026, garanties et alternatives'
const TAGLINE =
  'Tout savoir sur la mutuelle PRO BTP (le régime historique de la branche Bâtiment) : niveaux S1 à S4, tarifs par âge, comparatifs avec April Pro, Harmonie BTP et MMA Mutuelle Pro.'

export const metadata: Metadata = {
  title: `${TITLE} | Vivos Assurance`,
  description:
    'PRO BTP mutuelle : prix par âge et formule (S1, S2, S3, S4), couverture hospitalisation, dentaire, optique, médecines douces. Comparatif avec April Pro Santé et Harmonie Mutuelle BTP. Devis gratuit ORIAS.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="PRO BTP est l'institution paritaire historique du Bâtiment et des Travaux Publics, qui propose une mutuelle santé spécifique aux salariés, artisans et dirigeants de la branche depuis 1944. Cette page fait le tour de l'offre mutuelle PRO BTP : niveaux de garanties S1 à S4, tarifs par tranche d'âge, fonctionnalités de l'espace adhérent, et — surtout — comparatif honnête avec les alternatives privées (April Pro Santé, Harmonie Mutuelle BTP, MMA Mutuelle Pro) qui peuvent être plus avantageuses selon votre profil TNS."
      legalReference="Régime obligatoire ANI 2013 (salariés) + Loi Madelin (TNS, art. 154 bis CGI)"
      benefits={[
        {
          icon: '🏗️',
          title: 'Branche BTP',
          desc: 'Régime paritaire historique du secteur, +1,5M adhérents',
        },
        {
          icon: '🏥',
          title: '4 niveaux S1-S4',
          desc: 'De 40€/mois (jeune actif) à 180€/mois (couverture max)',
        },
        {
          icon: '💼',
          title: 'Madelin déductible TNS',
          desc: 'Cotisations déductibles du résultat imposable pour les artisans',
        },
        {
          icon: '🔄',
          title: 'Alternatives possibles',
          desc: 'April Pro / Harmonie / MMA souvent ±15-20% selon profil',
        },
      ]}
      sections={[
        {
          h2: "Qu'est-ce que la mutuelle PRO BTP ?",
          body: (
            <>
              <p>
                <strong>PRO BTP</strong> est un groupe paritaire de protection sociale créé en 1944,
                exclusivement dédié au secteur du Bâtiment et des Travaux Publics. Il regroupe une
                caisse de retraite complémentaire, une mutuelle santé et des offres d&apos;épargne,
                vacances et logement social pour ses adhérents.
              </p>
              <p>
                La <strong>mutuelle PRO BTP</strong> est la complémentaire santé qui prend en charge
                la part des dépenses de santé non remboursée par l&apos;Assurance Maladie (Sécurité
                sociale + régime artisans). Elle est accessible aux :
              </p>
              <ul>
                <li>Salariés du BTP (couverture collective ANI 2013 obligatoire depuis 2016)</li>
                <li>Artisans, EI, EURL, SASU en activité dans le BTP</li>
                <li>Dirigeants de SARL/SAS BTP</li>
                <li>Conjoints collaborateurs et ayants droit</li>
                <li>Retraités de la branche</li>
              </ul>
            </>
          ),
        },
        {
          h2: 'Tarifs PRO BTP Mutuelle par formule et âge',
          body: (
            <>
              <p>
                Les tarifs PRO BTP varient selon votre formule (S1 économique → S4 premium) et votre
                âge :
              </p>
              <ul>
                <li>
                  <strong>S1 (économique)</strong> : 38-55€/mois (25-45 ans) → 65-95€/mois (60+ ans)
                </li>
                <li>
                  <strong>S2 (équilibré)</strong> : 55-85€/mois → 95-140€/mois
                </li>
                <li>
                  <strong>S3 (renforcé)</strong> : 85-115€/mois → 140-180€/mois
                </li>
                <li>
                  <strong>S4 (haut de gamme)</strong> : 115-150€/mois → 180-230€/mois
                </li>
              </ul>
              <p>
                Pour comparaison, <strong>April Pro Santé</strong> propose souvent un niveau
                équivalent S3 à 75-95€/mois pour un TNS de 40 ans (économie possible de 10-25€/mois
                selon profil et région).
              </p>
            </>
          ),
        },
        {
          h2: 'PRO BTP vs alternatives : que choisir ?',
          body: (
            <>
              <p>
                <strong>PRO BTP convient mieux si vous êtes</strong> : salarié BTP avec couverture
                collective imposée, artisan attaché à l&apos;institutionnel paritaire, ou
                bénéficiaire des services annexes (vacances, retraite).
              </p>
              <p>
                <strong>Une alternative privée peut être plus avantageuse si vous êtes</strong> :
                TNS souhaitant optimiser le rapport prix/garanties via la loi Madelin, jeune artisan
                avec peu de besoins santé (forfait base), ou dirigeant avec des besoins spécifiques
                (orthodontie famille, médecines douces, hospitalisation haut de gamme).
              </p>
              <p>
                Notre courtier partenaire ORIAS compare PRO BTP + 8 autres assureurs santé pro pour
                vous orienter sur la solution la plus adaptée à votre situation — gratuitement, sans
                engagement.
              </p>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'Comment accéder à mon compte PRO BTP Mutuelle ?',
          a: 'Connectez-vous sur probtp.com avec votre identifiant adhérent (sur votre carte tiers payant). Vous y suivez vos remboursements, téléchargez votre attestation, mettez à jour vos coordonnées et gérez vos bénéficiaires.',
        },
        {
          q: 'Comment obtenir un remboursement PRO BTP ?',
          a: 'Les remboursements sont automatiques pour les professionnels de santé conventionnés (carte vitale). Pour les frais hors télétransmission (médecines douces, lunettes hors RAC0), envoyez la facture acquittée via votre espace adhérent ou par courrier. Délai moyen : 7 jours ouvrés.',
        },
        {
          q: 'Puis-je résilier PRO BTP Mutuelle ?',
          a: "Oui. Pour un contrat individuel (TNS, artisan, retraité), résiliation à tout moment après 1 an d'engagement (loi Hamon + infra-annuelle). Préavis 1 mois. Pour un contrat collectif salarié, la résiliation suit les règles d'entreprise.",
        },
        {
          q: 'Quelle est la différence entre PRO BTP et April Pro ?',
          a: 'PRO BTP = institution paritaire (à but non lucratif, gouvernance patronat/syndicats). April Pro = courtier assurance privé (groupe APRIL, coté en bourse). PRO BTP a un historique BTP fort ; April Pro propose souvent plus de flexibilité sur les niveaux de garanties et un meilleur prix sur les profils TNS jeunes.',
        },
      ]}
      relatedMetiers={[
        { name: 'Mutuelle pro BTP (comparatif global)', slug: 'mutuelle-pro-btp' },
        { name: 'Mutuelle TNS', slug: 'mutuelle-tns' },
        { name: 'Mutuelle dirigeant', slug: 'mutuelle-dirigeant' },
        { name: 'Assurance artisan', slug: 'assurance-artisan' },
        { name: 'Décennale BTP', slug: 'assurance-decennale' },
      ]}
    />
  )
}
