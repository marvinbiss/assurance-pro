/**
 * Pilier — "rc pro vtc" (TIER S — 1 000 vol/mois, KD 2, CPC 250€) ⭐ niche pépite
 * Source : Ahrefs 2026-04-29 (vert-vtc-taxi.json)
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { COMPARATIF_AUTO, EXPERT_SERVICES, STATS_DEFAULT } from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400

const SLUG = 'rc-pro-vtc'
const TITLE = 'RC Pro VTC — Obligation légale, tarifs et garanties 2026'
const TAGLINE =
  'La Responsabilité Civile Professionnelle est obligatoire pour tout chauffeur VTC en France (LOTI — décret 2014). Tarifs Wakam, Hiscox, Stello + souscription en ligne sous 24h.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'RC Pro VTC : obligation légale décret 2014, plafond 1.5M€ corporel + 1M€ matériel, tarif à partir de 280€ par an. Comparatif Wakam, Stello, Hiscox, AXA. Attestation immédiate.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Tout chauffeur VTC immatriculé au registre EVTC doit obligatoirement souscrire une Responsabilité Civile Professionnelle (RC Pro) en complément de l'assurance automobile transport de personnes. Cette obligation découle du décret 2014-371 du 26 mars 2014 et du Code des transports (art. R. 3122-3). Ce guide détaille l'obligation, les plafonds minimaux, les garanties complémentaires utiles (perte d'exploitation, protection juridique, assistance) et les meilleurs tarifs marché 2026 pour les VTC AE, SARL et plateformes Uber, Bolt ou Heetch."
      legalReference="Décret 2014-371 + Code des transports art. R. 3122-3 + L. 124-3 C. assur."
      isObligatoire={true}
      socialProofStats={STATS_DEFAULT}
      expertBio={EXPERT_SERVICES}
      comparatifRows={COMPARATIF_AUTO}
      benefits={[
        {
          icon: '🚕',
          title: 'Obligation EVTC',
          desc: 'Indispensable pour être inscrit au registre EVTC (préfecture)',
        },
        {
          icon: '🛡️',
          title: 'Plafond 1.5M€ corporel',
          desc: 'Minimum légal. Recommandé 3-5M€ pour activité intensive',
        },
        {
          icon: '💰',
          title: 'Tarif 280-650€ par an',
          desc: 'Auto-entrepreneur VTC. SARL ou SAS : 450-1 200€ par an selon CA',
        },
        {
          icon: '⚡',
          title: 'Attestation immédiate',
          desc: 'Téléchargeable après souscription, conforme registre EVTC',
        },
      ]}
      sections={[
        {
          h2: "Qu'est-ce que la RC Pro VTC et pourquoi elle est obligatoire ?",
          body: (
            <>
              <p>
                La <strong>RC Pro VTC</strong> est l&apos;assurance qui couvre les dommages que vous
                pouvez causer à vos passagers ou à des tiers (autres véhicules, piétons, biens) dans
                l&apos;exercice de votre activité de transport de personnes. Elle est{' '}
                <strong>distincte de l&apos;assurance automobile</strong>
                qui couvre votre véhicule.
              </p>
              <p>
                <strong>Le décret 2014-371</strong> impose à tout chauffeur VTC d&apos;avoir une RC
                Pro en cours de validité avec :
              </p>
              <ul>
                <li>
                  <strong>Plafond minimum 1 500 000€</strong> par sinistre pour les dommages
                  corporels
                </li>
                <li>
                  <strong>Plafond minimum 1 000 000€</strong> par sinistre pour les dommages
                  matériels
                </li>
                <li>
                  Validité confirmée par attestation à présenter lors du contrôle préfectoral EVTC
                </li>
              </ul>
              <p>
                Sans RC Pro VTC valide, vous risquez : suspension de la carte VTC, retrait du
                registre EVTC, amende administrative jusqu&apos;à 1 500€, et surtout — votre
                patrimoine personnel exposé en cas d&apos;accident grave.
              </p>
            </>
          ),
        },
        {
          h2: 'Tarifs RC Pro VTC 2026 par profil',
          body: (
            <>
              <p>Fourchettes de prix marché agrégées :</p>
              <ul>
                <li>
                  <strong>Auto-entrepreneur débutant</strong> (1ère année, &lt; 20k€ CA) : 280-450€
                  par an
                </li>
                <li>
                  <strong>Auto-entrepreneur expérimenté</strong> (3+ ans, 30-70k€ CA) : 350-550€ par
                  an
                </li>
                <li>
                  <strong>SARL — EURL VTC</strong> : 450-900€ par an
                </li>
                <li>
                  <strong>Flotte multi-chauffeurs</strong> (3-10 véhicules) : 250-450€ par an par
                  chauffeur
                </li>
                <li>
                  <strong>Activité haut de gamme</strong> (limousine, mariage, événementiel) : 600-1
                  200€ par an
                </li>
              </ul>
              <p>
                <strong>Facteurs de prime impactants</strong> : ancienneté permis B, sinistralité 36
                mois, type de véhicule (berline classique vs van VIP), kilométrage annuel, zone
                d&apos;exploitation (Paris ou RP = prime +15-25%).
              </p>
            </>
          ),
        },
        {
          h2: 'Meilleurs assureurs VTC 2026',
          body: (
            <>
              <ul>
                <li>
                  <strong>Wakam</strong> : assureur leader VTC en France. Tarifs très compétitifs
                  pour les jeunes chauffeurs. Souscription 100% digitale, attestation immédiate.
                </li>
                <li>
                  <strong>Stello</strong> : challenger spécialisé mobilité pro. Garanties modulaires
                  (auto + RC Pro + protection juridique en 1 contrat).
                </li>
                <li>
                  <strong>Hiscox</strong> : haut de gamme, plafonds étendus (5M€+), idéal pour VTC
                  limousine et services premium.
                </li>
                <li>
                  <strong>AXA Pro</strong> : couverture solide, réseau d&apos;assistance national,
                  prime souvent plus élevée mais services premium inclus.
                </li>
                <li>
                  <strong>MMA</strong> : alternative équilibrée, bon rapport prix ou garanties.
                </li>
              </ul>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'La RC Pro VTC est-elle différente de l&apos;assurance auto VTC ?',
          a: "Oui, totalement distinctes. L'assurance auto VTC couvre votre véhicule en cas d'accident, vol, incendie (obligatoire art. L. 211-1). La RC Pro VTC couvre les dommages causés à des tiers liés à votre activité professionnelle (art. L. 124-3). Vous avez besoin des DEUX.",
        },
        {
          q: 'Combien coûte une RC Pro VTC pour un débutant ?',
          a: 'Pour un auto-entrepreneur VTC qui démarre, comptez 280-450€ par an chez Wakam ou Stello (les plus compétitifs sur ce segment). Le tarif augmente si vous exercez en Île-de-France (+15-25%)/si votre véhicule est haut de gamme.',
        },
        {
          q: 'Puis-je faire du transport de personnes sans RC Pro VTC ?',
          a: "Non. C'est une obligation légale (décret 2014-371). Conduire en VTC sans RC Pro valide expose à : retrait de carte VTC, suspension du registre EVTC, amende 1 500€, et engagement de votre patrimoine personnel en cas d'accident grave (frais médicaux passagers, indemnisation préjudice).",
        },
        {
          q: 'Comment souscrire ma RC Pro VTC en ligne ?',
          a: 'Notre courtier partenaire ORIAS vous propose une comparaison Wakam + Stello + Hiscox + AXA en 5 minutes. Devis personnalisé selon votre profil (statut, ancienneté, zone, véhicule), souscription en ligne, attestation conforme EVTC immédiate par email.',
        },
      ]}
      relatedMetiers={[
        { name: 'Assurance VTC complète (auto + RC Pro)', slug: 'assurance-vtc' },
        { name: 'RC Pro VTC (variante)', slug: 'assurance-rc-pro-vtc' },
        { name: 'Assurance Taxi', slug: 'assurance-taxi' },
        { name: 'Assurance chauffeur taxi', slug: 'assurance-chauffeur-taxi' },
        { name: 'RC Pro auto-entrepreneur', slug: 'rc-pro/auto-entrepreneur' },
      ]}
    />
  )
}
