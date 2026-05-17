/**
 * Pilier — "assurance multirisque pro" (TIER S — 400 vol/mois, KD 0)
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import {
  COMPARATIF_MULTIRISQUE,
  EXPERT_DEFAULT,
  STATS_DEFAULT,
} from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'assurance-multirisque-pro'
const TITLE = 'Assurance Multirisque Pro — Garanties, tarifs et comparatif 2026'
const TAGLINE =
  "La multirisque pro protège votre local, stock, matériel et exploitation contre les sinistres courants (vol, incendie, dégâts des eaux, bris, perte d'exploitation). Tarifs et comparatif 5 assureurs."

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    "Multirisque pro : protection locaux + stock + perte d'exploitation. Tarifs à partir de 380€ par an (commerce TPE), 850€ par an (PME). Comparatif Allianz, AXA, MMA, Generali, Hiscox.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance multirisque professionnelle (MRP) est le contrat qui regroupe en un seul package la protection de vos locaux (commerce, atelier, bureau, entrepôt), votre matériel professionnel, votre stock de marchandises, votre mobilier, et la perte d'exploitation associée. Elle est la base de la protection patrimoniale de toute entreprise disposant d'un local — fortement recommandée pour TPE ou PME et exigée par certains bailleurs commerciaux."
      legalReference="art. L. 121-2 et s. C. assur. + clauses contractuelles bail commercial"
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="multirisque-pro"
      expertBio={EXPERT_DEFAULT}
      comparatifRows={COMPARATIF_MULTIRISQUE}
      benefits={[
        {
          icon: '🏢',
          title: 'Locaux + contenu',
          desc: 'Murs, mobilier, stock, matériel professionnel, marchandises',
        },
        {
          icon: '🔥',
          title: 'Risques courants',
          desc: 'Incendie, vol, dégâts eaux, bris glaces, tempête, événements climatiques',
        },
        {
          icon: '💼',
          title: 'Perte d&apos;exploitation',
          desc: 'Indemnité journalière + marge brute pendant remise en état',
        },
        {
          icon: '⚡',
          title: 'À partir de 380€ par an',
          desc: 'TPE commerce. PME : 850€+ par an selon CA et surface',
        },
      ]}
      sections={[
        {
          h2: 'Que couvre la multirisque pro ?',
          body: (
            <>
              <p>Les garanties standards d&apos;une MRP :</p>
              <ul>
                <li>
                  <strong>Incendie — explosion</strong> : indemnisation locaux + contenu
                </li>
                <li>
                  <strong>Dégâts des eaux</strong> : fuites, infiltrations, refoulement égouts
                </li>
                <li>
                  <strong>Vol et vandalisme</strong> : effraction, vol avec violence, dégradations
                </li>
                <li>
                  <strong>Bris de glaces</strong> : vitrines, enseignes, fenêtres
                </li>
                <li>
                  <strong>Tempête — catastrophes naturelles</strong> : grêle, neige, inondations
                  (CatNat)
                </li>
                <li>
                  <strong>Perte d&apos;exploitation</strong> : indemnité journalière + marge brute
                  (option clé)
                </li>
                <li>
                  <strong>RC Exploitation</strong> : dommages causés à des tiers SUR votre site (≠
                  RC Pro qui couvre les dommages liés à votre prestation)
                </li>
              </ul>
            </>
          ),
        },
        {
          h2: 'Tarifs multirisque pro par profil',
          body: (
            <ul>
              <li>
                <strong>Auto-entrepreneur sans local</strong> : 150-300€ par an (couverture matériel
                pro uniquement)
              </li>
              <li>
                <strong>Commerce TPE</strong> (boutique 30-80m²) : 380-650€ par an
              </li>
              <li>
                <strong>Restaurant TPE</strong> : 800-1 500€ par an (risque incendie cuisine)
              </li>
              <li>
                <strong>PME 5-20 salariés</strong> : 850-2 800€ par an selon CA et surfaces
              </li>
              <li>
                <strong>Industriel — entrepôt</strong> : 2 500-15 000€ par an
              </li>
            </ul>
          ),
        },
        {
          h2: 'Multirisque pro vs assurance-types',
          body: (
            <>
              <p>Ne pas confondre MRP avec :</p>
              <ul>
                <li>
                  <strong>RC Pro</strong> : couvre les dommages causés à des tiers liés à votre
                  PRESTATION. La MRP couvre votre PATRIMOINE (locaux, contenu). Les 2 sont
                  complémentaires.
                </li>
                <li>
                  <strong>Décennale</strong> : exclusivement BTP, sur ouvrages immobiliers, 10 ans
                  après réception. Pas dans MRP standard.
                </li>
                <li>
                  <strong>Flotte automobile</strong> : véhicules pro. Contrat séparé.
                </li>
              </ul>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'La multirisque pro est-elle obligatoire ?',
          a: 'Pas légalement, sauf clause bail commercial (la plupart imposent une MRP avec attestation annuelle). Fortement recommandée pour toute entreprise avec local, stock ou matériel professionnel.',
        },
        {
          q: 'Combien coûte une multirisque pro pour un restaurant ?',
          a: 'Restaurant traditionnel TPE : 800-1 500€ par an. Restauration rapide — pizzeria : 600-1 100€ par an. Restaurant haut de gamme avec terrasse : 1 200-2 500€ par an. La sinistralité incendie cuisine impacte fortement la prime.',
        },
        {
          q: 'Ai-je besoin d&apos;une perte d&apos;exploitation ?',
          a: 'Recommandé si votre activité dépend critiquement de votre local (commerce, restaurant, atelier). Un incendie peut paralyser 6-18 mois — sans PE, vous payez salaires + loyer + charges sans CA. Coût additionnel : +30-60% prime MRP base.',
        },
        {
          q: 'La multirisque pro couvre-t-elle le cyber ?',
          a: 'Non. Les attaques informatiques (ransomware, vol données) nécessitent une cyber-assurance dédiée (ajout 200-1 500€ par an selon profil).',
        },
      ]}
      relatedMetiers={[
        { name: 'Multirisque pro (variantes secteur)', slug: 'multirisque-pro' },
        { name: 'Assurance commerce', slug: 'assurance-commerce' },
        { name: 'Assurance restaurant', slug: 'assurance-restaurant' },
        { name: 'Assurance bureau', slug: 'assurance-bureau' },
        { name: 'Assurance local commercial', slug: 'assurance-local-commercial' },
        { name: 'Cyber assurance', slug: 'cyber-assurance' },
      ]}
    />
  )
}
