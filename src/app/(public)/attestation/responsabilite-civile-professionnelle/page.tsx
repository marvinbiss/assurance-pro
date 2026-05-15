/**
 * Attestation — "attestation responsabilité civile professionnelle" (350 vol, KD 3, CPC 450€) MONEY
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
const SLUG = 'attestation/responsabilite-civile-professionnelle'
const TITLE = 'Attestation Responsabilité Civile Professionnelle — Modèle + démarches'
const TAGLINE =
  "Modèle officiel d'attestation RC Pro + démarches d'obtention 24h. Mentions obligatoires, exemple PDF, utilisation client B2B et conformité ACPR."

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Attestation RC Pro : modèle PDF officiel + mentions obligatoires (n° contrat, plafond, période). Obtention 24h. Présentation clients B2B + cartes professionnelles.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'attestation Responsabilité Civile Professionnelle est le document officiel délivré par l'assureur qui prouve la souscription d'une RC Pro en cours de validité. Elle est requise pour : signature contrats B2B grand compte, renouvellement cartes professionnelles (Carte T immobilier, VTC, inscription Ordres), candidature appels d'offres publics, conventions de courtage, et audit acquéreur en cas de cession. Cette page détaille le modèle officiel, les mentions obligatoires (conformes Code des assurances), et les démarches rapides d'obtention."
      legalReference="art. L. 124-3 + L. 121-2 C. assur. + arrêté 6 décembre 2022"
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="rc-pro"
      expertBio={EXPERT_SERVICES}
      comparatifRows={COMPARATIF_SERVICES}
      benefits={[
        {
          icon: '📋',
          title: 'Modèle officiel',
          desc: 'Conforme Code des assurances + arrêté 2022 (ORIAS cliquable)',
        },
        {
          icon: '⚡',
          title: 'Délivrance rapide',
          desc: 'Immédiat Hiscox/Stello, 24h April Pro, 48h Allianz/MMA',
        },
        {
          icon: '✅',
          title: '9 mentions obligatoires',
          desc: 'Assureur, assuré, contrat, période, plafonds, activité, ORIAS',
        },
        {
          icon: '🤝',
          title: 'Multi-usages',
          desc: 'B2B + cartes pro + appels d&apos;offres + Ordres',
        },
      ]}
      sections={[
        {
          h2: 'Structure du modèle attestation RC Pro',
          body: (
            <ol>
              <li>
                <strong>En-tête assureur</strong> : raison sociale, adresse, agrément ACPR + numéro
              </li>
              <li>
                <strong>Identification assuré</strong> : raison sociale/nom, SIRET, adresse, n°
                client
              </li>
              <li>
                <strong>Référence contrat</strong> : numéro de police d&apos;assurance
              </li>
              <li>
                <strong>Période de validité</strong> : date d&apos;effet + date d&apos;échéance
              </li>
              <li>
                <strong>Activité garantie</strong> : nomenclature précise (services, BTP, médical,
                etc.)
              </li>
              <li>
                <strong>Plafonds de garantie</strong> :
                <ul>
                  <li>Par sinistre : 500k€-10M€ selon profil</li>
                  <li>Annuel cumulé : 2x à 5x plafond/sinistre standard</li>
                </ul>
              </li>
              <li>
                <strong>Mention ORIAS</strong> du courtier (si applicable) + lien cliquable orias.fr
                (arrêté 6/12/2022)
              </li>
              <li>
                <strong>Date d&apos;émission</strong> de l&apos;attestation
              </li>
              <li>
                <strong>Signature assureur</strong> ou cachet électronique
              </li>
            </ol>
          ),
        },
        {
          h2: "Démarches d'obtention attestation RC Pro",
          body: (
            <ol>
              <li>
                <strong>Si pas encore souscrit</strong> : devis comparatif gratuit via notre
                courtier ORIAS (5 min) puis souscription
              </li>
              <li>
                <strong>Si déjà souscrit</strong> : se connecter sur espace adhérent assureur
              </li>
              <li>
                <strong>Onglet &quot;Documents&quot; ou &quot;Mes attestations&quot;</strong> :
                sélectionner &quot;Attestation RC Pro&quot;
              </li>
              <li>
                <strong>Téléchargement PDF</strong> : immédiat Hiscox/Stello, 24-48h autres
              </li>
              <li>
                <strong>Vérification mentions</strong> : numéro contrat, période, plafond, activité
              </li>
              <li>
                <strong>Envoi clients/partenaires</strong> : par email avec votre proposition
                commerciale
              </li>
              <li>
                <strong>Renouvellement annuel</strong> : reçue automatiquement par email à date
                anniversaire contrat
              </li>
            </ol>
          ),
        },
        {
          h2: 'Utilisation par profession',
          body: (
            <ul>
              <li>
                <strong>Consultant / freelance services intellectuels</strong> : présentation
                clients B2B grand compte (contrats &gt; 10k€)
              </li>
              <li>
                <strong>Agent immobilier</strong> : renouvellement Carte T à la CCI tous les 3 ans
              </li>
              <li>
                <strong>Chauffeur VTC</strong> : présentation registre EVTC préfecture
              </li>
              <li>
                <strong>Médecin libéral</strong> : inscription Ordre des Médecins + ARS
              </li>
              <li>
                <strong>Avocat</strong> : inscription Barreau + Conseil de l&apos;Ordre
              </li>
              <li>
                <strong>Architecte DPLG</strong> : inscription Ordre des Architectes
              </li>
              <li>
                <strong>Expert-comptable</strong> : Ordre des Experts-Comptables
              </li>
              <li>
                <strong>Auto-école</strong> : agrément préfectoral + ANTS
              </li>
              <li>
                <strong>BTP</strong> : présentation maître d&apos;ouvrage avant chantier (en
                complément décennale)
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: "L'attestation RC Pro est-elle équivalente au contrat ?",
          a: "Non. L'attestation est un RÉSUMÉ officiel du contrat (mentions clés). Le contrat complet (conditions générales + particulières) reste le document juridique de référence en cas de sinistre. L'attestation suffit pour usage commercial standard.",
        },
        {
          q: 'Combien de temps avant renouvellement automatique ?',
          a: 'Renouvellement tacite chaque année à la date anniversaire du contrat. Préavis de résiliation : 1 mois (loi infra-annuelle 2020). Nouvelle attestation envoyée automatiquement par email ou téléchargeable dans espace adhérent.',
        },
        {
          q: 'Attestation RC Pro et attestation Décennale : différence ?',
          a: 'Documents DISTINCTS pour 2 contrats différents. Pour BTP : il faut LES DEUX attestations (RC Pro + Décennale). Pour services non-BTP : attestation RC Pro suffit. Modèles similaires mais mentions activités diffèrent.',
        },
        {
          q: 'Que faire si client B2B refuse mon attestation ?',
          a: '1) Vérifier validité (période en cours). 2) Vérifier plafond suffisant pour le projet client. 3) Vérifier activité couverte correspond au projet. Si tout OK : demander à votre assureur attestation spécifique nominative pour ce client.',
        },
      ]}
      relatedMetiers={[
        { name: 'Attestation RC Pro (variante)', slug: 'attestation/rc-pro' },
        { name: "Attestation d'assurance RC Pro", slug: 'attestation/d-assurance-rc-pro' },
        { name: 'Attestation décennale', slug: 'attestation/decennale' },
        { name: 'Assurance RC Pro (vue globale)', slug: 'assurance-rc-pro' },
        { name: 'Devis RC Pro', slug: 'devis/rc-pro' },
      ]}
    />
  )
}
