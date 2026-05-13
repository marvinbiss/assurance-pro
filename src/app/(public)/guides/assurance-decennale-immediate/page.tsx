/**
 * Guide — Assurance décennale immédiate (intent urgence)
 * KW Ahrefs : "assurance décennale immédiate" 150 vol KD 0 CPC 700€ + tail "decennale 24h" 80 → 230 vol/m
 * Intent commercial extrême : artisan en démarrage chantier urgent
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'guides/assurance-decennale-immediate'
const TITLE = 'Assurance décennale immédiate 2026 — Attestation 6h ou 24h (procédure express)'
const TAGLINE =
  "Besoin d'une décennale en urgence pour démarrer un chantier ? Procédure express : attestation provisoire en 6h, attestation conforme arrêté 23 janvier 2024 sous 24h."

export const metadata: Metadata = {
  title: `${TITLE} | Vivos Assurance`,
  description:
    'Assurance décennale immédiate 2026 : procédure express 6h (attestation provisoire) ou 24h (attestation conforme arrêté 23 janvier 2024). Pour artisans BTP en démarrage de chantier urgent. 5 assureurs spécialisés Express : SMABTP, Wakam, MAAF Pro, April BTP, Hiscox. Cabinet ORIAS.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'article' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance décennale immédiate (ou « Express ») désigne la procédure accélérée pour obtenir une attestation décennale en moins de 24h, voire 6h pour les chantiers urgents. C'est indispensable pour les artisans BTP qui doivent démarrer un chantier en urgence (réponse appel d'offres, remplacement entreprise défaillante, démarrage chantier MaPrimeRénov' avec délai serré). Notre cabinet ORIAS travaille avec 5 assureurs spécialisés en procédure Express : SMABTP, Wakam (insurtech 100% digital), MAAF Pro, April BTP et Hiscox. Cette page détaille les 2 procédures (Express 6h vs Express 24h), leurs sur-primes, et les 8 documents à préparer pour gagner du temps."
      legalReference="Loi Spinetta art. L. 241-1 + arrêté 23 janvier 2024 (mentions attestation)"
      isObligatoire={false}
      benefits={[
        {
          icon: '⚡',
          title: 'Express 6h disponible',
          desc: 'Attestation provisoire dans les 6h ouvrées (+80 € HT) — pour chantiers urgents',
        },
        {
          icon: '🕐',
          title: 'Express 24h standard',
          desc: 'Attestation conforme arrêté 23 janvier 2024 dans les 24h après signature + paiement',
        },
        {
          icon: '📋',
          title: '8 documents pré-checkés',
          desc: 'Liste documents à préparer pour valider en express : KBIS, RIB, attestations URSSAF/RSI…',
        },
        {
          icon: '💰',
          title: 'Sur-prime modérée',
          desc: '6h : +80 € HT. 24h : aucun supplément. Tarif décennale standard maintenu.',
        },
      ]}
      sections={[
        {
          h2: 'Procédure Express 6h vs Express 24h',
          body: (
            <div>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-primary-50">
                    <th className="border p-2 text-left">Critère</th>
                    <th className="border p-2 text-left">Express 6h</th>
                    <th className="border p-2 text-left">Express 24h (standard)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">Délai obtention attestation</td>
                    <td className="border p-2">6h ouvrées (9h-18h)</td>
                    <td className="border p-2">24h ouvrées</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Type attestation initiale</td>
                    <td className="border p-2">Provisoire (pour preuve démarrage)</td>
                    <td className="border p-2">Définitive conforme arrêté 2024</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Attestation définitive (24h après)</td>
                    <td className="border p-2">OUI (envoi automatique)</td>
                    <td className="border p-2">Inclus dès 24h</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Sur-prime cabinet</td>
                    <td className="border p-2">+80 € HT</td>
                    <td className="border p-2">Aucune</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Assureurs disponibles</td>
                    <td className="border p-2">SMABTP, Wakam, Hiscox</td>
                    <td className="border p-2">Les 8 partenaires</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Profils acceptés</td>
                    <td className="border p-2">AE/EI/EURL/SASU profil simple</td>
                    <td className="border p-2">Tous profils (y compris flottes)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ),
        },
        {
          h2: '8 documents à préparer pour Express',
          body: (
            <div>
              <p className="mb-2 text-sm">
                Pour valider en Express 6h ou 24h, préparer en avance ces 8 documents en PDF :
              </p>
              <ol>
                <li>
                  <strong>KBIS</strong> de moins de 3 mois (téléchargement infogreffe.fr)
                </li>
                <li>
                  <strong>RIB</strong> de l&apos;entreprise (pour prélèvement cotisation)
                </li>
                <li>
                  <strong>Attestation URSSAF</strong> de moins de 6 mois (à jour cotisations
                  sociales)
                </li>
                <li>
                  <strong>Attestation fiscale</strong> de moins de 6 mois (à jour TVA/IS)
                </li>
                <li>
                  <strong>Relevé d&apos;information assureur précédent</strong> (sur 5 ans — si déjà
                  assuré)
                </li>
                <li>
                  <strong>Liste des activités BTP exercées</strong> (codes NAF + nomenclature
                  FFB/CAPEB)
                </li>
                <li>
                  <strong>CV/diplômes du dirigeant</strong> + qualifications RGE/Qualibat si
                  applicable
                </li>
                <li>
                  <strong>Bilan dernier exercice ou prévisionnel</strong> (CA + masse salariale)
                </li>
              </ol>
              <p className="mt-3 border-l-4 border-primary-500 bg-primary-50 p-3">
                <strong>Astuce</strong> : si vous démarrez sans avoir tous les documents (ex :
                nouveau créé sans bilan), Wakam (insurtech) accepte un dossier minimum (KBIS + RIB +
                déclaration sur l&apos;honneur) avec sur-prime +18-25% premier an.
              </p>
            </div>
          ),
        },
        {
          h2: 'Pour aller plus loin',
          body: (
            <ul>
              <li>
                <Link
                  href="/outils/devis-assurance-decennale"
                  className="text-primary-600 underline"
                >
                  Devis officiel cabinet ORIAS sous 24h
                </Link>
              </li>
              <li>
                <Link
                  href="/outils/calculateur-tarif-decennale"
                  className="text-primary-600 underline"
                >
                  Calculateur tarif décennale
                </Link>
              </li>
              <li>
                <Link
                  href="/outils/modele-attestation-decennale"
                  className="text-primary-600 underline"
                >
                  Modèle attestation décennale (générateur PDF gratuit)
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/courtier-assurance-decennale"
                  className="text-primary-600 underline"
                >
                  Guide courtier assurance décennale
                </Link>
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Décennale immédiate : vraiment immédiate ?',
          a: "L'expression 'immédiate' est un abus marketing — il faut 6h MINIMUM (procédure Express avec sur-prime +80€) pour analyser le dossier, obtenir l'accord assureur, signer, payer et émettre l'attestation. Aucune décennale ne peut être 'instantanée' (en 5 min) car l'analyse du risque est obligatoire (Reco ACPR 2024-R-02 — devoir conseil).",
        },
        {
          q: 'Express 6h : pour qui ?',
          a: "Pour artisans BTP en démarrage de chantier urgent : réponse appel d'offres MaPrimeRénov' avec délai serré, remplacement d'une entreprise défaillante sur un chantier en cours, urgence client (assurance habitation client exigeant attestation pour valider sinistre). Profils acceptés : AE/EI/EURL/SASU profil simple (CA <300k€, ≤2 salariés).",
        },
        {
          q: 'Sur-prime Express : combien ?',
          a: "Express 24h : aucune sur-prime. Express 6h : <strong>+80 € HT</strong> facturé par le cabinet (frais d'analyse accélérée). Le tarif décennale standard de l'assureur reste identique. Express 6h ne fait PAS exploser votre cotisation annuelle.",
        },
        {
          q: 'Sans relevé d&apos;information : Express possible ?',
          a: "OUI mais profils limités (Wakam, Hiscox uniquement). Le relevé d'information AGIRA permet de connaître votre historique sinistre 5 ans. Sans relevé (nouveau créé) : sur-prime +18-25% premier an (le temps de constituer un historique chez le nouvel assureur). Économie possible dès la 2e année.",
        },
      ]}
    />
  )
}
