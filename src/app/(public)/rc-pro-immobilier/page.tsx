/**
 * Pilier — "rc pro immobilier" (200 vol, KD 1, CPC 600€) — MONEY KW
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
const SLUG = 'rc-pro-immobilier'
const TITLE = 'RC Pro Immobilier — Loi Hoguet, agent, mandataire, transactions'
const TAGLINE =
  'La RC Pro Immobilier est obligatoire (Loi Hoguet) pour tout agent immobilier, mandataire, syndic. Garanties, plafonds, comparatif et tarifs 2026.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'RC Pro Immobilier obligatoire Loi Hoguet (art. 49 loi 70-9) : agent immobilier, mandataire, syndic, gestion locative. Plafond 305k€-2M€ mini. Tarif 350-2 500€/an.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="La RC Pro Immobilier est obligatoire pour tout professionnel exerçant une activité encadrée par la Loi Hoguet (loi 70-9 du 2 janvier 1970) : agent immobilier, mandataire, syndic de copropriété, gestionnaire locatif, expert immobilier. Elle couvre les dommages causés à des tiers (clients, partenaires) dans le cadre de transactions, gestion ou conseils — avec un plafond légal minimum de 305 000€ (transactions) et 305 000€ (gestion immobilière)."
      legalReference="Loi Hoguet (art. 49 loi 70-9) + décret 72-678 + art. L. 124-3 C. assur."
      isObligatoire={true}
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="rc-pro"
      expertBio={EXPERT_SERVICES}
      comparatifRows={COMPARATIF_SERVICES}
      benefits={[
        {
          icon: '⚖️',
          title: 'Obligation Loi Hoguet',
          desc: 'Carte T (transactions) + Carte G (gestion) imposent une RC Pro',
        },
        {
          icon: '🛡️',
          title: 'Plafond mini 305k€',
          desc: 'Minimum légal. Recommandé 1-2M€ pour agences moyennes',
        },
        {
          icon: '💰',
          title: '350-2 500€/an',
          desc: 'Mandataire indépendant 350-600€ • Agence 800-2 500€ selon CA',
        },
        {
          icon: '📋',
          title: 'Inclus dans renouvellement Carte T',
          desc: 'Attestation présentée à la CCI lors du renouvellement carte (3 ans)',
        },
      ]}
      sections={[
        {
          h2: 'Qui doit avoir une RC Pro Immobilier ?',
          body: (
            <ul>
              <li>
                <strong>Agent immobilier (Carte T)</strong> : transactions vente, location
              </li>
              <li>
                <strong>Syndic de copropriété (Carte S)</strong> : gestion immeubles collectifs
              </li>
              <li>
                <strong>Gestionnaire locatif (Carte G)</strong> : gestion locative pour compte
                propriétaires
              </li>
              <li>
                <strong>Mandataire immobilier indépendant</strong> (sous Carte T d&apos;un réseau ou
                en propre)
              </li>
              <li>
                <strong>Expert immobilier</strong> (évaluation, expertise judiciaire)
              </li>
              <li>
                <strong>Marchand de biens</strong> (achat-revente professionnel)
              </li>
              <li>
                <strong>Promoteur immobilier</strong> (en complément décennale)
              </li>
              <li>
                <strong>Conseil en gestion patrimoine immobilier</strong> (CIF immobilier)
              </li>
            </ul>
          ),
        },
        {
          h2: 'Ce que couvre la RC Pro Immobilier',
          body: (
            <ul>
              <li>
                <strong>Erreur de conseil</strong> : mauvaise estimation prix, fausse information
                urbanisme, omission servitude
              </li>
              <li>
                <strong>Vice caché révélé après vente</strong> : si responsabilité agent engagée
              </li>
              <li>
                <strong>Erreur de gestion locative</strong> : non-versement loyers, défaut
                quittance, charges mal calculées
              </li>
              <li>
                <strong>Faute dans transaction</strong> : compromis mal rédigé, clause manquante,
                délai non-respecté
              </li>
              <li>
                <strong>Mandat dépassé</strong> : engagement client sans pouvoir suffisant
              </li>
              <li>
                <strong>Frais de défense pénale</strong> : avocat pris en charge si poursuite
              </li>
              <li>
                <strong>Dommages corporels visiteurs</strong> : si visite logement avec accident
              </li>
            </ul>
          ),
        },
        {
          h2: 'Tarifs RC Pro Immobilier 2026',
          body: (
            <ul>
              <li>
                <strong>Mandataire indépendant débutant (1ère année)</strong> : 350-500€/an
              </li>
              <li>
                <strong>Mandataire expérimenté (CA &gt; 80k€)</strong> : 500-800€/an
              </li>
              <li>
                <strong>Agence immobilière TPE (1-5 salariés)</strong> : 800-1 800€/an
              </li>
              <li>
                <strong>Agence PME (5-20 salariés)</strong> : 1 800-3 500€/an
              </li>
              <li>
                <strong>Réseau franchise + mandataires</strong> : 3 000-8 000€/an
              </li>
              <li>
                <strong>Syndic moyenne taille (200-500 lots)</strong> : 1 200-2 800€/an
              </li>
              <li>
                <strong>Marchand de biens</strong> : 2 000-6 000€/an (risque élevé)
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Quelle différence entre RC Pro Immobilier et garantie financière ?',
          a: 'RC Pro = couverture dommages causés à des tiers (erreur, faute). Garantie financière = couverture fonds détenus pour compte clients (loyers gérés, dépôts garantie). Les 2 sont obligatoires Loi Hoguet, mais distinctes.',
        },
        {
          q: 'Un mandataire indépendant doit-il avoir sa RC Pro ?',
          a: 'Oui obligatoire. Soit via la RC Pro globale du réseau (vérifier qu&apos;il y est inscrit), soit en RC Pro personnelle complémentaire. Pour un mandataire indépendant 100% : RC Pro personnelle obligatoire (350-600€/an).',
        },
        {
          q: 'Combien de temps de couverture postérieure après cessation ?',
          a: 'Postériorité minimum 5 ans pour la Loi Hoguet. Recommandé 10 ans pour activité gestion (litiges peuvent émerger plusieurs années après). Vérifier avant souscription.',
        },
        {
          q: 'Quels assureurs en RC Pro Immobilier ?',
          a: 'Allianz Pro Immobilier (leader), MMA Pro Immobilier, AXA Pro Immobilier, Generali Pro, April Pro Immobilier. Notre courtier ORIAS compare ces 5 selon profil (transaction/gestion/syndic).',
        },
      ]}
      relatedMetiers={[
        { name: 'Assurance RC Pro (vue globale)', slug: 'assurance-rc-pro' },
        { name: 'RC Pro agent immobilier', slug: 'rc-pro-agent-immobilier' },
        { name: 'RC Pro auto-entrepreneur', slug: 'rc-pro/auto-entrepreneur' },
        { name: 'Comparateur RC Pro', slug: 'comparateur-rc-pro' },
      ]}
    />
  )
}
