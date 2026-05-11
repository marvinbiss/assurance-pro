/**
 * Attestation — "attestation d'assurance responsabilité civile professionnelle" (300 vol, KD 3, CPC 400€) MONEY
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'attestation/d-assurance-responsabilite-civile-professionnelle'
const TITLE = "Attestation d'Assurance Responsabilité Civile Professionnelle — Guide complet"
const TAGLINE =
  "Guide complet de l'attestation d'assurance RC Pro : utilité, valeur juridique, mentions obligatoires, démarches express et modèles types par profession."

export const metadata: Metadata = {
  title: `${TITLE} | Vivos Assurance`,
  description:
    "Attestation d'assurance RC Pro : guide complet. Valeur juridique, 9 mentions obligatoires, démarches 24h, modèles par profession (consultant, BTP, médical, immobilier).",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'attestation d'assurance Responsabilité Civile Professionnelle est le document officiel délivré par l'assureur agréé ACPR qui prouve la souscription d'une RC Pro en cours de validité. Ce guide complet détaille la structure type de l'attestation, les variations par profession (services intellectuels, BTP, médical, immobilier), les démarches d'obtention rapide (24h) et les bonnes pratiques d'utilisation auprès des clients B2B et des Ordres professionnels."
      legalReference="art. L. 124-3 + L. 121-2 C. assur. + arrêté 6 décembre 2022"
      benefits={[
        {
          icon: '📄',
          title: 'Document officiel ACPR',
          desc: 'Délivré par assureur agréé — preuve légale opposable',
        },
        {
          icon: '⚡',
          title: 'Express 24h',
          desc: 'Hiscox/Stello immédiat • April Pro 24h • autres 24-72h',
        },
        {
          icon: '🌍',
          title: 'Tous secteurs',
          desc: 'Services intellectuels, BTP, médical, immobilier, taxi/VTC',
        },
        {
          icon: '✅',
          title: 'Conformité légale',
          desc: 'Code des assurances + arrêté 2022 (ORIAS cliquable)',
        },
      ]}
      sections={[
        {
          h2: 'Structure type attestation par profession',
          body: (
            <ul>
              <li>
                <strong>Services intellectuels</strong> (consultant, IT, designer, marketing) :
                activité &quot;Prestations de services intellectuels&quot; + plafond 500k€-2M€ +
                postériorité 5-10 ans
              </li>
              <li>
                <strong>BTP</strong> : 52 métiers nomenclature Qualibat + plafond 1-3M€ + mention
                &quot;En complément de la garantie décennale&quot;
              </li>
              <li>
                <strong>Médical libéral</strong> : spécialité médicale + numéro RPPS + plafond
                5M€-10M€ + mention &quot;Conforme art. L. 1142-2 Code santé publique&quot;
              </li>
              <li>
                <strong>Avocat</strong> : Barreau d&apos;appartenance + numéro CNBF + plafond 5M€
                minimum + mention &quot;Loi 31 décembre 1971&quot;
              </li>
              <li>
                <strong>Agent immobilier</strong> : Carte T (transactions) ou G (gestion) + plafond
                305 000€ minimum (Hoguet) + garantie financière séparée
              </li>
              <li>
                <strong>Chauffeur VTC</strong> : numéro EVTC + plafond 1.5M€ corporel + 1M€ matériel
                (décret 2014-371)
              </li>
              <li>
                <strong>Auto-école</strong> : agrément préfectoral + plafond adapté véhicules +
                permis B
              </li>
            </ul>
          ),
        },
        {
          h2: "Variations selon contexte d'utilisation",
          body: (
            <ul>
              <li>
                <strong>Attestation standard annuelle</strong> : générique, valide tous clients
                pendant 1 an
              </li>
              <li>
                <strong>Attestation nominative client</strong> : avec nom du client précis (demande
                grand compte)
              </li>
              <li>
                <strong>Attestation projet spécifique</strong> : avec référence projet + montants
                concernés
              </li>
              <li>
                <strong>Attestation appel d&apos;offres public</strong> : conforme cahier des
                charges marché public
              </li>
              <li>
                <strong>Attestation Ordre professionnel</strong> : format imposé par Ordre (avocat,
                médecin, architecte)
              </li>
              <li>
                <strong>Attestation administrative</strong> : pour CCI, préfecture (cartes
                professionnelles)
              </li>
              <li>
                <strong>Attestation provisoire</strong> : avant édition contrat définitif (1 mois
                maximum)
              </li>
            </ul>
          ),
        },
        {
          h2: 'Bonnes pratiques utilisation B2B',
          body: (
            <ol>
              <li>
                <strong>Joindre attestation à toute proposition commerciale</strong> &gt; 5k€
              </li>
              <li>
                <strong>Vérifier validité avant chaque envoi</strong> (date d&apos;échéance)
              </li>
              <li>
                <strong>Personnaliser si client grand compte</strong> (attestation nominative sur
                demande)
              </li>
              <li>
                <strong>Mentionner numéro attestation dans contrat</strong> (référence permanente)
              </li>
              <li>
                <strong>Renouveler 1 mois avant échéance</strong> (éviter rupture couverture)
              </li>
              <li>
                <strong>Conserver historique 10 ans</strong> (postériorité Hiscox / 5 ans autres)
              </li>
              <li>
                <strong>Mettre à jour si activité évolue</strong> (nouveau métier, nouveau
                périmètre)
              </li>
            </ol>
          ),
        },
      ]}
      faq={[
        {
          q: 'Modèle universel attestation RC Pro existe ?',
          a: 'Non, chaque assureur a sa mise en page. MAIS les mentions obligatoires sont identiques (Code des assurances) : assureur + assuré + contrat + période + plafond + activité + ORIAS. Structure standardisée même si présentation visuelle diffère.',
        },
        {
          q: 'Attestation nominative client : comment demander ?',
          a: 'Email à votre conseiller assureur avec : nom + adresse + SIRET du client + référence projet + montant chiffré. Délai 24-72h. Coût : généralement gratuit (parfois 50-150€ chez certains assureurs).',
        },
        {
          q: 'Que faire si attestation refusée par client ?',
          a: '1) Vérifier validité (période). 2) Vérifier plafond suffisant pour projet. 3) Vérifier activité couverte correspond. 4) Demander attestation nominative spécifique projet. 5) Si tout OK et client insiste : escalader à direction client (parfois zèle excessif d&apos;un acheteur).',
        },
        {
          q: 'Combien coûte une attestation supplémentaire ?',
          a: 'Standard annuelle : gratuite (incluse). Attestation nominative client : gratuite ou 50-150€ selon assureur. Attestation pour Ordre/CCI : gratuite. Attestation rétroactive (sinistre antérieur) : variable, à négocier.',
        },
      ]}
      relatedMetiers={[
        {
          name: 'Attestation RC Pro (vue globale)',
          slug: 'attestation/responsabilite-civile-professionnelle',
        },
        {
          name: 'Attestation de RC Pro',
          slug: 'attestation/de-responsabilite-civile-professionnelle',
        },
        { name: 'Attestation RC Pro courte', slug: 'attestation/rc-pro' },
        { name: 'Attestation décennale', slug: 'attestation/decennale' },
        { name: 'Assurance RC Pro', slug: 'assurance-rc-pro' },
      ]}
    />
  )
}
