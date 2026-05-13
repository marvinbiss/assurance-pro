/**
 * Attestation — "attestation assurance décennale" (200 vol, KD 0, CPC 300€) MONEY
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'attestation/assurance-decennale'
const TITLE = 'Attestation Assurance Décennale — Obtenir + utiliser 2026'
const TAGLINE =
  "Tout sur l'attestation assurance décennale : à qui présenter, valeur juridique 10 ans, démarches d'obtention express, vérification authenticité MO."

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Attestation assurance décennale : présentation MO obligatoire avant chantier. Valeur 10 ans. Vérification authenticité. April Pro 24h, SMABTP 48h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'attestation assurance décennale est le document officiel délivré par l'assureur agréé ACPR qui prouve la souscription d'une garantie décennale conforme à la Loi Spinetta. Indispensable pour : 1) Présenter au maître d'ouvrage AVANT démarrage chantier (obligation Loi Spinetta), 2) Justifier conformité aux notaires lors vente immobilière (vérification systématique des constructeurs &lt; 10 ans), 3) Candidater aux marchés publics BTP. Cette page détaille l'usage, la valeur juridique et les démarches."
      legalReference="Loi Spinetta + art. 1792 et 1792-1 Code civil + art. L. 241-1 C. assur."
      isObligatoire={true}
      benefits={[
        {
          icon: '⚖️',
          title: 'Obligation MO Loi Spinetta',
          desc: 'AVANT démarrage chantier — sanctions si défaut',
        },
        {
          icon: '🏛️',
          title: 'Notaire vérifie systématiquement',
          desc: 'Vente immo : tous constructeurs &lt; 10 ans validés',
        },
        {
          icon: '⏱️',
          title: 'Valeur 10 ans',
          desc: 'Garantie active 10 ans à compter PV réception',
        },
        {
          icon: '🔍',
          title: 'Vérification ACPR + ORIAS',
          desc: 'Authenticité contrôlable acpr.banque-france.fr + orias.fr',
        },
      ]}
      sections={[
        {
          h2: "À qui présenter l'attestation décennale",
          body: (
            <ul>
              <li>
                <strong>Maître d&apos;ouvrage (MO)</strong> : OBLIGATOIRE avant démarrage chantier
                (Loi Spinetta)
              </li>
              <li>
                <strong>Notaire</strong> : lors vente immobilière (vérification constructeurs &lt;
                10 ans)
              </li>
              <li>
                <strong>Banque finançant chantier</strong> : exige attestation avant déblocage prêt
                construction
              </li>
              <li>
                <strong>Donneur d&apos;ordre / promoteur</strong> : conformité contractuelle
              </li>
              <li>
                <strong>Sous-traitant</strong> : si vous êtes donneur d&apos;ordre (vérifier
                décennale sous-traitant)
              </li>
              <li>
                <strong>Marchés publics</strong> : dossier candidature obligatoire
              </li>
              <li>
                <strong>Bureau de contrôle (Apave, Veritas, Socotec)</strong> : si mission contrôle
                technique
              </li>
              <li>
                <strong>ACPR</strong> : contrôle ponctuel du secteur assurance
              </li>
            </ul>
          ),
        },
        {
          h2: "Vérifier l'authenticité d'une attestation décennale",
          body: (
            <ol>
              <li>
                <strong>Numéro contrat valide</strong> : pas séquence aléatoire, format cohérent
                avec assureur
              </li>
              <li>
                <strong>Identité assureur</strong> : vérifier sur Refassu ACPR
                (acpr.banque-france.fr) que l&apos;assureur est bien agréé
              </li>
              <li>
                <strong>Période de validité</strong> : couvrir TOUT le chantier (mini 1 an,
                idéalement 18 mois pour gros chantier)
              </li>
              <li>
                <strong>Activité déclarée</strong> : correspond précisément aux travaux à réaliser
                (métier Qualibat exact)
              </li>
              <li>
                <strong>Plafond suffisant</strong> : 1M€ minimum AE, 2-3M€ recommandé SARL/SAS
              </li>
              <li>
                <strong>Cachet ou signature électronique</strong> : présent (sinon doute
                authenticité)
              </li>
              <li>
                <strong>Numéro ORIAS courtier</strong> (si applicable) : cliquable sur orias.fr
                (arrêté 6/12/2022)
              </li>
              <li>
                <strong>Téléphone assureur</strong> : appeler en cas de doute pour confirmer
                émission
              </li>
            </ol>
          ),
        },
        {
          h2: 'Démarches express obtention attestation décennale',
          body: (
            <ol>
              <li>
                <strong>April Pro BTP</strong> : devis 5 min + souscription en ligne + attestation
                24h ouvrées
              </li>
              <li>
                <strong>SMABTP</strong> : 24-48h ouvrées après dossier complet validé
              </li>
              <li>
                <strong>Allianz Pro BTP</strong> : 48h ouvrées en ligne ou en agence
              </li>
              <li>
                <strong>MMA Pro BTP</strong> : 48h ouvrées, réseau 1 500+ agences possible
              </li>
              <li>
                <strong>AXA Pro BTP</strong> : 48-72h ouvrées, expert agence souvent requis
              </li>
              <li>
                <strong>Urgence chantier &lt; 4h</strong> : April Pro et certains courtiers ORIAS
                proposent émission express (parfois supplément 50-100€)
              </li>
            </ol>
          ),
        },
      ]}
      faq={[
        {
          q: 'Combien de temps avant chantier doit-on avoir attestation décennale ?',
          a: 'AVANT démarrage chantier (Loi Spinetta — sans délai minimum mais ATTENTION : démarrer chantier sans attestation = exercice illégal art. L. 243-3 C. assur., 75k€ amende + 6 mois prison). Idéalement attestation présentée à signature devis/contrat.',
        },
        {
          q: 'Comment vérifier authenticité attestation décennale fournisseur ?',
          a: '1) Vérifier assureur agréé ACPR (acpr.banque-france.fr → Refassu). 2) Appeler assureur pour confirmer émission. 3) Vérifier ORIAS courtier (orias.fr). 4) Vérifier période + plafond + activité cohérents.',
        },
        {
          q: "Faux d'attestation décennale : risques ?",
          a: 'Falsification document : 3 ans prison + 45 000€ amende (art. 441-1 Code pénal). Usage de faux : idem. + Responsabilité civile illimitée 10 ans sur sinistres. + Radiation Qualibat/RGE possible. Mauvaise idée — toujours présenter attestation authentique.',
        },
        {
          q: "L'attestation suit-elle le bien immobilier ?",
          a: 'OUI, la garantie décennale est attachée à l&apos;ouvrage (pas à l&apos;assuré). Lors de vente immobilière, l&apos;acquéreur bénéficie de la garantie résiduelle (10 ans à compter réception, donc selon ancienneté chantier). Notaire vérifie systématiquement.',
        },
      ]}
      relatedMetiers={[
        { name: 'Attestation décennale (vue globale)', slug: 'attestation/decennale' },
        { name: 'Attestation décennale PDF', slug: 'attestation/decennale-pdf' },
        { name: 'Assurance décennale (vue globale)', slug: 'assurance-decennale' },
        { name: 'Décennale immédiate', slug: 'assurance-decennale-immediate' },
        { name: 'Guide attestation décennale', slug: 'guides/attestation-decennale' },
      ]}
    />
  )
}
