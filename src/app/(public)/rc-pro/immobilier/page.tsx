/**
 * Pilier — RC Pro agent immobilier (Couche B)
 *
 * KW Ahrefs (kw_universe) :
 * - "rc pro immobilier" → 200 vol KD 1 CPC 600€ ⭐
 * - "rc pro agent immobilier" → 200 vol KD 1 CPC 500€
 * - "assurance responsabilité civile professionnelle immobilier" → 200 vol
 * - Famille cumulée : ~600 vol/m, ROI ~360k score
 *
 * RC Pro OBLIGATOIRE pour agents immobiliers (Loi Hoguet — art. 49 L. 70-9 + art. 4 R. 72-678).
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import {
  COMPARATIF_SERVICES,
  EXPERT_SERVICES,
  STATS_DEFAULT,
} from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'rc-pro / immobilier'
const TITLE = 'RC Pro agent immobilier 2026 — OBLIGATOIRE Loi Hoguet (tarifs 280-920€ par an)'
const TAGLINE =
  'La RC Pro obligatoire pour agents immobiliers et mandataires : couverture défaut conseil, erreur estimation, vice de procuration, manquement obligation information. Loi Hoguet.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'RC Pro agent immobilier 2026 : OBLIGATOIRE Loi Hoguet (art. 49 L. 70-9). Couverture défaut conseil mandant, erreur estimation, vice procuration, manquement information acquéreur. Sinistralité 4,1%. Tarifs 280-920€ par an AE ou EI, 1 800-4 200€ par an SARL agence. Devis ORIAS sous 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="La RC Pro est OBLIGATOIRE pour tout agent immobilier / mandataire en France (Loi Hoguet — art. 49 Loi n° 70-9 du 2 janvier 1970 + art. 4 Décret n° 72-678 du 20 juillet 1972). Sans RC Pro valide : retrait immédiat de la carte professionnelle T (transaction) ou G (gestion locative) par la CCI, amende 7 500€, interdiction d'exercer. Sinistralité ACPR 2024 : 4,1% (mandats vente, défauts conseil, erreurs estimation, vices procuration). Tarifs 2026 : 280-920 € par an pour AE / EI mandataire, 1 800-4 200 € par an pour SARL avec agence."
      legalReference="Loi Hoguet — art. 49 L. 70-9 du 2 janvier 1970 + art. 4 Décret 72-678"
      isObligatoire={true}
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="rc-pro"
      expertBio={EXPERT_SERVICES}
      comparatifRows={COMPARATIF_SERVICES}
      benefits={[
        {
          icon: '⚖️',
          title: 'OBLIGATION Loi Hoguet',
          desc: 'RC Pro obligatoire pour carte T ou G. Retrait carte immédiat si défaut. Amende 7 500€',
        },
        {
          icon: '📝',
          title: 'Défaut conseil + estimation',
          desc: 'Couverture mandats vente sous-évalués ou sur-évalués + manquement information acquéreur',
        },
        {
          icon: '⚠️',
          title: 'Vices procuration + actes',
          desc: 'Couverture vices procuration vendeur, erreurs compromis, défaut diagnostic obligatoire',
        },
        {
          icon: '💰',
          title: '280-920 € par an AE',
          desc: 'Mandataire AE : 280-560€. Agence SARL 5 sal : 1 800-4 200€ par an. ETI 20+ : 8 000-15 000€ par an',
        },
      ]}
      sections={[
        {
          h2: 'Sinistres types couverts par la RC Pro immobilier',
          body: (
            <div>
              <p>Top 5 sinistres ACPR 2024 :</p>
              <ul>
                <li>
                  <strong>Défaut conseil mandant (32%)</strong> — sous-évaluation prix, mauvaise
                  stratégie de vente
                </li>
                <li>
                  <strong>Manquement information acquéreur (24%)</strong> — défaut DPE, vices cachés
                  non révélés
                </li>
                <li>
                  <strong>Erreur estimation (18%)</strong> — sur-évaluation entraînant blocage vente
                </li>
                <li>
                  <strong>Vices procuration vendeur (12%)</strong> — procuration invalide ou périmée
                </li>
                <li>
                  <strong>Défauts diagnostics obligatoires (8%)</strong> — DPE absent, plomb ou
                  amiante non communiqué
                </li>
              </ul>
              <p className="mt-3 border-l-4 border-primary-500 bg-primary-50 p-3">
                <strong>Sinistre moyen 2024</strong> : 28 500 € (recours mandant ou acquéreur).
                Plafond garantie recommandé : <strong>1-2 M€</strong> minimum (Loi Hoguet
                n&apos;impose pas de plafond mais 500k€ trop bas pour transactions &gt;500k€).
              </p>
            </div>
          ),
        },
        {
          h2: 'Carte professionnelle T — G — exigences CCI',
          body: (
            <div>
              <p>
                Pour obtenir ou renouveler votre carte professionnelle CCI, vous devez fournir :
              </p>
              <ol>
                <li>
                  <strong>Attestation RC Pro</strong> à jour avec mentions Loi Hoguet
                </li>
                <li>
                  <strong>Garantie financière</strong> (mandataire : 30 000€ mini ; agence : 110
                  000€ mini)
                </li>
                <li>
                  <strong>Justificatif aptitude professionnelle</strong> (BTS Pro Immo, BAC+3, 3 ans
                  expérience)
                </li>
                <li>
                  <strong>Casier judiciaire B2 vierge</strong> (sanctions Loi Hoguet art. 9)
                </li>
              </ol>
              <p>
                Notre cabinet ORIAS gère le pack{' '}
                <strong>RC Pro + garantie financière Loi Hoguet</strong> auprès de Galian, MMA Pro
                Immo, AXA Pro Immo (économie 12-18% vs contrats séparés).
              </p>
            </div>
          ),
        },
        {
          h2: 'Pour aller plus loin',
          body: (
            <div>
              <ul>
                <li>
                  <Link
                    href="/outils/calculateur-tarif-rc-pro"
                    className="text-primary-600 underline"
                  >
                    Calculateur tarif RC Pro immobilier
                  </Link>
                </li>
                <li>
                  <Link href="/outils/devis-rc-pro" className="text-primary-600 underline">
                    Devis officiel RC Pro ORIAS sous 24h
                  </Link>
                </li>
                <li>
                  <Link href="/rc-pro" className="text-primary-600 underline">
                    Pilier RC Pro — 18 professions réglementées
                  </Link>
                </li>
                <li>
                  <Link href="/outils/comparateur-rc-pro" className="text-primary-600 underline">
                    Comparateur 8 assureurs RC Pro
                  </Link>
                </li>
              </ul>
            </div>
          ),
        },
      ]}
      faq={[
        {
          q: 'RC Pro obligatoire mandataire indépendant ?',
          a: "OUI absolument. Loi Hoguet s'applique à TOUS les agents ou mandataires immobiliers (mandataire indépendant rattaché à une agence, mandataire pour réseau M2C, IAD ou Capifrance, agent commercial). Sans RC Pro valide : retrait carte T ou G + radiation registre RSAC + amende 7 500€.",
        },
        {
          q: 'Plafond RC Pro immobilier recommandé ?',
          a: "Loi Hoguet n'impose pas de plafond légal — c'est à vous de l'évaluer. Recommandations : <strong>500 000€</strong> = mandataire transactions <300k€ ; <strong>1 000 000€</strong> = standard agences ; <strong>2 000 000€</strong> = transactions >500k€ (Paris, IDF ou Côte d'Azur) ; <strong>5 000 000€</strong> = transactions luxe ou marchés professionnels.",
        },
        {
          q: 'Garantie financière obligatoire en plus de RC Pro ?',
          a: 'OUI obligatoire (Loi Hoguet art. 3) : 30 000€ mini si mandataire sans manipulation fonds, 110 000€ si gestion locative ou syndic. Différente de la RC Pro (qui couvre les fautes professionnelles). Galian, MMA Pro Immo et AXA Pro Immo proposent les 2 en pack groupé.',
        },
        {
          q: 'Tarif RC Pro immobilier 2026 ?',
          a: 'Mandataire AE ou EI (CA <50k€) : 280-560 € par an. Mandataire EURL ou SASU : 380-720 € par an. Agence SARL 5 salariés : 1 800-4 200 € par an. ETI 20+ salariés : 8 000-15 000 € par an. Variables : ancienneté, zone (Paris ou IDF +20%), antécédents, plafond garantie souhaité.',
        },
      ]}
    />
  )
}
