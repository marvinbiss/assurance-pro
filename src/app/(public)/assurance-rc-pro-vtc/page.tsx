/**
 * Pilier — "assurance rc pro vtc" (TIER S — 600 vol/mois, KD 1, CPC 250€)
 * Variante de /rc-pro-vtc avec angle SOUSCRIPTION + COUVERTURE étendue.
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400

const SLUG = 'assurance-rc-pro-vtc'
const TITLE = 'Assurance RC Pro VTC — Souscription en ligne, attestation immédiate'
const TAGLINE =
  'Souscrire votre RC Pro VTC en 5 minutes : devis personnalisé selon votre profil, comparatif Wakam / Stello / Hiscox / AXA, attestation conforme EVTC téléchargeable immédiatement.'
export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Assurance RC Pro VTC : souscription en ligne, plafond 1.5M€ corporel + 1M€ matériel (mini légal), tarifs à partir de 280€/an. Comparatif assureurs + attestation immédiate.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance RC Pro VTC est obligatoire pour tout chauffeur immatriculé EVTC. Ce guide pratique détaille le processus de souscription en ligne en 5 minutes, les pièces nécessaires, les comparatifs détaillés des 4 principaux assureurs (Wakam, Stello, Hiscox, AXA) et les garanties complémentaires utiles (assistance, perte d'exploitation, protection juridique)."
      legalReference="Décret 2014-371 + Code transports R. 3122-3"
      isObligatoire={true}
      benefits={[
        {
          icon: '⚡',
          title: 'Souscription 5 min',
          desc: 'Devis instantané + attestation téléchargeable après paiement',
        },
        {
          icon: '📋',
          title: 'Conforme EVTC',
          desc: 'Attestation présentable au registre préfecture EVTC',
        },
        {
          icon: '🛡️',
          title: 'Plafond 1.5M€ mini',
          desc: 'Couvre l&apos;obligation légale décret 2014-371',
        },
        {
          icon: '🔄',
          title: '4 assureurs comparés',
          desc: 'Wakam (best price) + Stello + Hiscox + AXA Pro',
        },
      ]}
      sections={[
        {
          h2: 'Souscription RC Pro VTC en 5 minutes',
          body: (
            <>
              <ol>
                <li>
                  <strong>Devis personnalisé</strong> : statut (AE/SARL/SAS), ancienneté permis B,
                  sinistralité 36 mois, véhicule, zone d&apos;exploitation
                </li>
                <li>
                  <strong>Comparaison 4 assureurs</strong> : tableau prix + garanties + franchises
                </li>
                <li>
                  <strong>Choix de l&apos;offre</strong> : sélectionner le contrat adapté
                </li>
                <li>
                  <strong>Saisie informations légales</strong> : carte VTC, numéro EVTC, carte grise
                  véhicule
                </li>
                <li>
                  <strong>Paiement sécurisé</strong> : annuel ou mensuel (selon assureur)
                </li>
                <li>
                  <strong>Téléchargement attestation</strong> : immédiat, conforme registre EVTC
                </li>
              </ol>
            </>
          ),
        },
        {
          h2: 'Garanties complémentaires utiles pour un VTC',
          body: (
            <>
              <ul>
                <li>
                  <strong>Protection juridique</strong> : prise en charge des litiges avec clients
                  (réclamations, retours via Uber/Bolt), administration (PV, contrôles) ou autres
                  usagers de la route. +60-120€/an.
                </li>
                <li>
                  <strong>Perte d&apos;exploitation</strong> : indemnité journalière si votre
                  véhicule est immobilisé suite à sinistre. +80-180€/an, idéal si VTC à temps plein.
                </li>
                <li>
                  <strong>Assistance véhicule étendue</strong> : remorquage + véhicule de
                  remplacement professionnel (berline conforme VTC), important si activité dense.
                </li>
                <li>
                  <strong>Effets personnels passagers</strong> : couvre les dommages aux bagages
                  clients en cas d&apos;accident. Souvent inclus dans la formule premium.
                </li>
              </ul>
            </>
          ),
        },
        {
          h2: 'Comparatif Wakam vs Stello vs Hiscox vs AXA',
          body: (
            <>
              <ul>
                <li>
                  <strong>Wakam</strong> : leader VTC France. Best price sur profils débutants
                  (280-350€/an). 100% digital. Attestation immédiate.
                </li>
                <li>
                  <strong>Stello</strong> : challenger pure-mobilité. Auto + RC Pro intégrées. Bon
                  rapport prix/garanties (350-450€/an). Service client reconnu.
                </li>
                <li>
                  <strong>Hiscox</strong> : haut de gamme, plafonds étendus 3-5M€, idéal VTC
                  limousine / mariage / événementiel (450-800€/an).
                </li>
                <li>
                  <strong>AXA Pro</strong> : couverture solide + assistance national, prime plus
                  élevée (500-900€/an), idéal sociétés VTC multi-chauffeurs.
                </li>
              </ul>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'Quelles pièces fournir pour souscrire une RC Pro VTC ?',
          a: "1) Carte VTC nationale (préfecture), 2) Numéro d'inscription EVTC, 3) Carte grise du véhicule, 4) Permis B (recto-verso), 5) Justificatif d'identité, 6) RIB pour le paiement. Toutes via upload digital, validation < 24h.",
        },
        {
          q: 'Quelle est la meilleure assurance RC Pro VTC en 2026 ?',
          a: 'Pour un débutant AE avec véhicule standard : Wakam (best price 280-350€/an). Pour un VTC expérimenté SARL : Stello ou Hiscox selon plafond souhaité. Pour activité haut de gamme/limousine : Hiscox 1er choix.',
        },
        {
          q: 'Combien de temps pour avoir mon attestation RC Pro VTC ?',
          a: "Après finalisation paiement : téléchargement immédiat dans l'espace client. Validité : à compter de la date d'effet du contrat. Présentable au contrôle EVTC le jour même.",
        },
        {
          q: 'La RC Pro VTC inclut-elle l&apos;assurance auto ?',
          a: "Non, ce sont 2 contrats distincts mais obligatoires tous les deux. L'auto VTC couvre votre véhicule (vol, incendie, dégâts). La RC Pro VTC couvre les dommages causés à autrui dans votre activité. Stello propose un contrat 2-en-1 qui simplifie la gestion.",
        },
      ]}
      relatedMetiers={[
        { name: 'RC Pro VTC (pilier global)', slug: 'rc-pro-vtc' },
        { name: 'Assurance VTC complète', slug: 'assurance-vtc' },
        { name: 'Assurance Taxi', slug: 'assurance-taxi' },
        { name: 'Assurance chauffeur taxi', slug: 'assurance-chauffeur-taxi' },
      ]}
    />
  )
}
