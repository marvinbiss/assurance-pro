/**
 * Pilier — "comment fonctionne la garantie décennale" (200 vol, KD 1)
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'comment-fonctionne-la-garantie-decennale'
const TITLE = 'Comment fonctionne la garantie décennale ? Mécanisme expliqué'
const TAGLINE =
  'La décennale fonctionne en 3 étapes : souscription avant chantier, attestation au MO, indemnisation en cas de sinistre 10 ans après réception. Détail du mécanisme.'

export const metadata: Metadata = {
  title: `${TITLE} | Vivos Assurance`,
  description:
    'Comment fonctionne la garantie décennale : mécanisme légal Loi Spinetta. Souscription avant chantier, attestation MO, déclaration sinistre, indemnisation. Délais et acteurs.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="La garantie décennale est un mécanisme légal complexe impliquant 4 acteurs (constructeur, maître d'ouvrage, assureur, expert) et plusieurs étapes : souscription avant chantier, attestation au MO, déclaration de sinistre, expertise, indemnisation. Cette page démystifie le fonctionnement réel de la décennale et explique chaque étape avec délais et obligations légales."
      legalReference="Loi Spinetta + art. 1792 Code civil + art. L. 241-1 C. assur."
      benefits={[
        {
          icon: '1️⃣',
          title: 'Souscription avant chantier',
          desc: 'Attestation obligatoire AVANT démarrage travaux',
        },
        {
          icon: '2️⃣',
          title: 'Réception travaux = point de départ 10 ans',
          desc: 'Signature du PV de réception déclenche la garantie',
        },
        {
          icon: '3️⃣',
          title: 'Déclaration sinistre 5 jours',
          desc: 'Délai légal pour déclarer un dommage à l&apos;assureur',
        },
        {
          icon: '4️⃣',
          title: 'Expertise + indemnisation',
          desc: 'Expert mandaté → rapport → indemnisation MO/constructeur',
        },
      ]}
      sections={[
        {
          h2: 'Étape 1 : Souscription décennale AVANT chantier',
          body: (
            <ol>
              <li>
                <strong>Constructeur</strong> (artisan, entreprise BTP, architecte, MO délégué)
                souscrit décennale auprès assureur agréé ACPR
              </li>
              <li>Déclaration activité précise : 52 métiers BTP nomenclature Qualibat</li>
              <li>Déclaration CA prévisionnel (assiette de la prime)</li>
              <li>Antécédents sinistralité 36 mois (impact prime)</li>
              <li>
                Émission attestation décennale avec : n° contrat, période validité, plafond garanti,
                métiers couverts
              </li>
              <li>Validité : 1 an renouvelable (à renouveler AVANT expiration)</li>
            </ol>
          ),
        },
        {
          h2: 'Étape 2 : Présentation attestation au MO + réception',
          body: (
            <ol>
              <li>
                AVANT démarrage chantier : constructeur remet attestation décennale au maître
                d&apos;ouvrage
              </li>
              <li>MO vérifie validité (numéro ORIAS, période, métiers déclarés)</li>
              <li>Réalisation des travaux (durée variable : 1-24 mois selon ampleur)</li>
              <li>
                À la fin : <strong>signature du PV de réception</strong> entre MO et constructeur
              </li>
              <li>
                Cette signature est le <strong>point de départ du délai 10 ans</strong> de la
                garantie décennale
              </li>
              <li>
                Si réserves au PV : la garantie s&apos;applique uniquement aux éléments NON réservés
              </li>
            </ol>
          ),
        },
        {
          h2: 'Étape 3 : Déclaration et indemnisation sinistre',
          body: (
            <ol>
              <li>
                <strong>Découverte du sinistre</strong> par MO ou propriétaire (fissure,
                infiltration, effondrement)
              </li>
              <li>
                <strong>Délai de déclaration légal : 5 jours ouvrés</strong> à l&apos;assureur du
                constructeur (par lettre recommandée AR ou via espace adhérent)
              </li>
              <li>
                Si MO a une <strong>Dommages-Ouvrage (DO)</strong> : déclaration à son propre
                assureur DO qui indemnise rapidement puis subroge contre constructeur
              </li>
              <li>Si pas de DO : recours direct contre constructeur + son assureur décennale</li>
              <li>
                <strong>Expert mandaté par assureur</strong> : visite sur place, rapport technique
                (60-90 jours)
              </li>
              <li>
                <strong>Indemnisation</strong> : 75% sous 90 jours après rapport, solde après
                contrôle des travaux de remise en état
              </li>
              <li>Franchise constructeur : 300-3 000€ selon contrat (à sa charge)</li>
            </ol>
          ),
        },
      ]}
      faq={[
        {
          q: 'Qui paie en cas de sinistre décennal ?',
          a: "L'assureur décennale du constructeur indemnise les travaux de remise en état (dans la limite du plafond contractuel). Si MO a souscrit une Dommages-Ouvrage : DO indemnise rapidement, puis subroge contre constructeur (10-15 ans après chantier en moyenne pour résolution complète).",
        },
        {
          q: 'Quel délai pour déclarer un sinistre décennal ?',
          a: 'Légalement : 5 jours ouvrés à compter de la découverte. En pratique : déclarer le plus vite possible pour preuve d&apos;urgence. Lettre recommandée AR + photos + descriptif sinistre. Délai de prescription : 10 ans à partir de la réception.',
        },
        {
          q: 'Peut-on faire jouer la décennale après vente du bien ?',
          a: 'Oui. La garantie suit le bien (transmission automatique aux acquéreurs successifs pendant 10 ans). L&apos;acheteur peut directement actionner l&apos;assureur du constructeur initial.',
        },
        {
          q: 'Comment savoir si mon assureur est agréé ACPR ?',
          a: "Consulter le registre Refassu de l'ACPR (acpr.banque-france.fr) ou le registre ORIAS (orias.fr) pour les courtiers. Assureur étranger : vérifier passeport européen LPS. Mention &quot;agréé ACPR&quot; obligatoire sur attestation décennale.",
        },
      ]}
      relatedMetiers={[
        { name: 'Assurance décennale (vue globale)', slug: 'assurance-decennale' },
        { name: 'Décennale obligatoire (sanctions)', slug: 'assurance-decennale-obligatoire' },
        { name: 'Décennale BTP', slug: 'assurance-decennale-btp' },
        { name: 'Dommages-Ouvrage', slug: 'assurance-dommages-ouvrage' },
        { name: 'Guide attestation décennale', slug: 'guides/attestation-decennale' },
      ]}
    />
  )
}
