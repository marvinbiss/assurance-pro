/**
 * Pilier — "assurance rc pro sasu" (40 vol, KD 0, CPC 500€) MONEY
 * Variante /rc-pro-sasu avec angle SOUSCRIPTION + démarches.
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import {
  COMPARATIF_SERVICES,
  EXPERT_SERVICES,
  STATS_DEFAULT,
} from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'assurance-rc-pro-sasu'
const TITLE = 'Assurance RC Pro SASU — Souscription, démarches, comparatif'
const TAGLINE =
  'Souscrire une RC Pro pour votre SASU : pièces nécessaires (K-bis, SIRET), comparatif 5 assureurs, tarifs 350-1 500€ par an. Guide souscription en ligne.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Assurance RC Pro SASU : guide souscription. Pièces (K-bis, SIRET, RIB), comparatif Hiscox, Stello, Allianz ou MMA. Plafond 1-3M€ recommandé. Tarif 350-1 500€ par an.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Guide pratique pour souscrire votre RC Pro SASU (Société par Actions Simplifiée Unipersonnelle) : démarches de souscription pas à pas, pièces nécessaires, comparatif détaillé des 5 assureurs leaders (Hiscox, Stello, Allianz Pro, MMA Pro, AXA Pro), critères de choix selon activité, et bonnes pratiques pour optimiser votre couverture."
      legalReference="art. L. 124-3 + L. 121-2 C. assur. + art. L. 227-1 et s. Code de commerce"
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="rc-pro"
      expertBio={EXPERT_SERVICES}
      comparatifRows={COMPARATIF_SERVICES}
      benefits={[
        {
          icon: '📋',
          title: 'Démarches simplifiées',
          desc: 'Souscription en ligne possible (Hiscox, Stello, Allianz)',
        },
        {
          icon: '⚡',
          title: 'Délai 24-48h',
          desc: 'Attestation téléchargeable rapidement après validation',
        },
        {
          icon: '💰',
          title: '350-1 500€ par an',
          desc: 'SASU services intellectuels 350-550€ • PME 800-1 500€',
        },
        {
          icon: '🛡️',
          title: 'Plafond 1-3M€',
          desc: 'Standard SASU 1-2M€, jusqu&apos;à 3M€ activité à risque',
        },
      ]}
      sections={[
        {
          h2: 'Pièces nécessaires pour souscription SASU',
          body: (
            <ol>
              <li>
                <strong>K-bis SASU</strong> (&lt; 3 mois) — extrait Kbis avec dénomination, capital
                social, président, siège
              </li>
              <li>
                <strong>Numéro SIRET</strong> (vérifié Insee.fr)
              </li>
              <li>
                <strong>Statuts de la SASU</strong> (pour comprendre objet social et capital)
              </li>
              <li>
                <strong>Justificatif identité président</strong> (CNI ou passeport recto-verso)
              </li>
              <li>
                <strong>Justificatif activité</strong> : diplômes, qualifications professionnelles,
                expérience
              </li>
              <li>
                <strong>CA prévisionnel 12 mois</strong> + ventilation activités
              </li>
              <li>
                <strong>Antécédents sinistralité 36 mois</strong> (déclaration honneur)
              </li>
              <li>
                <strong>RIB SASU</strong> pour paiement (annuel ou mensuel)
              </li>
              <li>
                <strong>Bilan année N-1</strong> si SASU existante (pour SASU récente : prévisionnel
                suffit)
              </li>
            </ol>
          ),
        },
        {
          h2: 'Comparatif 5 assureurs RC Pro SASU 2026',
          body: (
            <ul>
              <li>
                <strong>Hiscox</strong> : leader services intellectuels (consultant, IT, marketing).
                Plafond jusqu&apos;à 10M€. Postériorité 10 ans. Tarif SASU CA &lt; 100k€ : 350-500€
                par an. Souscription en ligne.
              </li>
              <li>
                <strong>Stello</strong> : challenger 100% digital. Tarif similaire Hiscox AE ou SASU
                petite (350-450€ par an). Postériorité 5 ans. Plafond max 1.5M€.
              </li>
              <li>
                <strong>Allianz Pro</strong> : couverture la plus large (services + BTP +
                agriculture). Tarif SASU services : 400-700€ par an. Postériorité 5 ans.
              </li>
              <li>
                <strong>MMA Pro</strong> : équilibré, réseau 1 500+ agences. Pack multi-contrats
                avantageux. Tarif SASU : 380-650€ par an.
              </li>
              <li>
                <strong>AXA Pro</strong> : couverture premium, assistance haut de gamme. Prime
                +20-25% vs Hiscox équivalent. Tarif SASU : 450-800€ par an.
              </li>
            </ul>
          ),
        },
        {
          h2: 'Critères de choix selon activité SASU',
          body: (
            <ul>
              <li>
                <strong>SASU consultant management ou stratégie</strong> : Hiscox best price +
                postériorité 10 ans
              </li>
              <li>
                <strong>SASU freelance dev — IT</strong> : Hiscox ou Stello (digital pure)
              </li>
              <li>
                <strong>SASU agence web — communication</strong> : Hiscox ou Generali Pro (cyber
                combinée)
              </li>
              <li>
                <strong>SASU coach — formation</strong> : Hiscox ou MAIF Pro (selon profil
                &quot;commercial&quot; vs &quot;ESS&quot;)
              </li>
              <li>
                <strong>SASU BTP (en complément décennale)</strong> : April Pro BTP, MMA Pro BTP,
                Allianz Pro BTP
              </li>
              <li>
                <strong>SASU professions libérales</strong> (avocat, expert) : assureurs spécialisés
                profession (Ordre dédié)
              </li>
              <li>
                <strong>SASU e-commerce — dropshipping</strong> : Hiscox + cyber-assurance combinée
              </li>
              <li>
                <strong>SASU restauration — commerce</strong> : Allianz Pro Commerce, MMA Pro
                Commerce
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Combien de temps pour souscrire une RC Pro SASU ?',
          a: 'En ligne (Hiscox, Stello, Allianz) : 10-15 min de remplissage + 24-48h validation. En agence (MMA, AXA) : 1-2 semaines avec RDV. Notre courtier ORIAS facilite démarches en ligne avec attestation 24h.',
        },
        {
          q: 'Quel plafond pour une SASU avec CA &lt; 100k€ ?',
          a: 'Plafond standard 1-2M€ recommandé pour SASU services. Pour SASU activité à risque (cyber, financier, médical) : 3-5M€. Pour SASU BTP en complément décennale : 1-2M€ RC Pro + plafond décennale séparé.',
        },
        {
          q: 'Mon prévisionnel CA est-il accepté pour SASU récente ?',
          a: 'Oui, la plupart des assureurs acceptent prévisionnel pour SASU créée &lt; 12 mois. Demande de bilan année N+1 pour ajustement prime (régularisation possible). Honnêteté impérative : sur-déclaration CA = sur-prime, sous-déclaration = exclusion possible en cas de sinistre.',
        },
        {
          q: 'Souscription RC Pro avant immatriculation SASU possible ?',
          a: 'Non. Attendre Kbis officiel (1-2 semaines après dépôt INPI ou greffe). En attente : RC Pro provisoire personnelle (1-3 mois) chez certains assureurs (rare). Sinon, démarrer activité après immatriculation + RC Pro souscrite.',
        },
      ]}
      relatedMetiers={[
        { name: 'RC Pro SASU (vue détaillée)', slug: 'rc-pro-sasu' },
        { name: 'Assurance RC Pro (vue globale)', slug: 'assurance-rc-pro' },
        { name: 'Assurance SASU', slug: 'assurance-sasu' },
        { name: 'RC Pro consultant', slug: 'rc-pro-consultant' },
        { name: 'Hiscox RC Pro', slug: 'hiscox-rc-pro' },
      ]}
    />
  )
}
