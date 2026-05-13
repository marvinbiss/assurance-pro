/**
 * Guide — Numéro assurance maladie médecin
 * KW Ahrefs : "numéro assurance maladie médecin" 300 vol KD 4
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'guides/numero-assurance-maladie-medecin'
const TITLE = 'Numéro assurance maladie médecin (RPPS, ADELI, AM) — Guide 2026'
const TAGLINE =
  "Tout savoir sur les numéros d'identification médecin : RPPS (Répertoire Partagé Pros Santé), ADELI, numéro AM, numéro CPS. À quoi servent-ils ? Comment les obtenir ?"

export const metadata: Metadata = {
  title: `${TITLE} | Assurance Pro`,
  description:
    "Numéros d'identification médecin : RPPS (11 chiffres, identifiant unique), ADELI (9 chiffres, ancien système), numéro AM (Assurance Maladie, conventionnement), CPS (Carte Pro Santé). Démarches d'obtention + utilité de chaque numéro.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'article' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Un médecin libéral en France utilise plusieurs NUMÉROS D'IDENTIFICATION distincts qui génèrent souvent de la confusion : le RPPS (Répertoire Partagé des Professionnels de Santé — 11 chiffres, identifiant unique national depuis 2016, remplace progressivement ADELI), le numéro ADELI (9 chiffres, ancien système 1989-2016, encore utilisé pour certaines démarches), le numéro AM (Assurance Maladie, attribué lors du conventionnement Sécu, format AAANNNNN), la CPS (Carte de Professionnel de Santé, équivalent carte d'identité numérique pour signer électroniquement les documents de santé). Chaque numéro a un usage spécifique : facturation Sécu, conventionnement, télétransmission, prescriptions sécurisées, etc. Cette page détaille chaque numéro, son utilité et les démarches d'obtention/renouvellement."
      legalReference="Code de la santé publique L. 4111-1 et s. + Décret 2016-1872 (RPPS unifié)"
      isObligatoire={true}
      benefits={[
        {
          icon: '🆔',
          title: 'RPPS = identifiant unique',
          desc: '11 chiffres, identifiant national pro santé depuis 2016 (remplace ADELI)',
        },
        {
          icon: '💳',
          title: 'CPS = signature électronique',
          desc: 'Carte à puce pour signer prescriptions, télétransmission Sécu, dossier médical partagé',
        },
        {
          icon: '📋',
          title: 'Numéro AM = conventionnement',
          desc: 'Permet la facturation à la Sécurité Sociale (Sécu) et le tiers payant',
        },
        {
          icon: '⚠️',
          title: 'ADELI en extinction',
          desc: 'Ancien système 1989-2016, remplacé par RPPS mais encore utilisé pour certaines démarches',
        },
      ]}
      sections={[
        {
          h2: "Les 4 numéros d'identification médecin et leur utilité",
          body: (
            <>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Numéro</th>
                    <th className="border p-2 text-left">Format</th>
                    <th className="border p-2 text-left">Utilité</th>
                    <th className="border p-2 text-left">Obtention</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">
                      <strong>RPPS</strong>
                    </td>
                    <td className="border p-2">11 chiffres</td>
                    <td className="border p-2">Identifiant unique pro santé (remplace ADELI)</td>
                    <td className="border p-2">Inscription Conseil Ordre Médecins</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>ADELI</strong>
                    </td>
                    <td className="border p-2">9 chiffres</td>
                    <td className="border p-2">
                      Ancien système 1989-2016, encore actif pour certaines démarches
                    </td>
                    <td className="border p-2">ARS (Agence Régionale Santé)</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Numéro AM</strong>
                    </td>
                    <td className="border p-2">AAANNNNN</td>
                    <td className="border p-2">
                      Facturation Sécu + tiers payant + télétransmission
                    </td>
                    <td className="border p-2">CPAM lors du conventionnement</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>CPS</strong>
                    </td>
                    <td className="border p-2">Carte à puce</td>
                    <td className="border p-2">Signature électronique prescriptions + DMP</td>
                    <td className="border p-2">ASIP Santé (cartes-cps.fr)</td>
                  </tr>
                </tbody>
              </table>
            </>
          ),
        },
        {
          h2: 'Démarches pour un médecin libéral nouvellement installé',
          body: (
            <>
              <ol>
                <li>
                  <strong>Inscription Conseil Ordre des Médecins</strong> → attribution RPPS
                  automatique
                </li>
                <li>
                  <strong>Demande conventionnement Sécu</strong> auprès de la CPAM → attribution
                  numéro AM
                </li>
                <li>
                  <strong>Commande CPS</strong> sur cartes-cps.fr → réception sous 2-3 semaines
                </li>
                <li>
                  <strong>Souscription RC Pro médicale</strong> (Loi Kouchner) — voir{' '}
                  <a href="/rc-pro-medecin" className="text-primary-600 underline">
                    /rc-pro-medecin
                  </a>
                </li>
                <li>
                  <strong>Mutuelle TNS Madelin</strong> + prévoyance — voir{' '}
                  <a href="/assurance-medecin" className="text-primary-600 underline">
                    /assurance-medecin
                  </a>
                </li>
              </ol>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'Quelle différence entre RPPS et ADELI ?',
          a: 'RPPS (11 chiffres) = identifiant UNIQUE national des pros de santé depuis 2016, intègre toutes les professions médicales et paramédicales. ADELI (9 chiffres) = ancien système 1989-2016, géré par les ARS. RPPS REMPLACE PROGRESSIVEMENT ADELI mais les 2 numéros coexistent encore pour certaines démarches.',
        },
        {
          q: 'Comment obtenir un numéro RPPS ?',
          a: "Automatiquement attribué lors de l'inscription au Conseil de l'Ordre des Médecins (pour médecins) ou au Conseil de l'Ordre paramédical correspondant. Démarche à effectuer après obtention du diplôme et avant le démarrage de l'activité.",
        },
        {
          q: "Numéro AM (Assurance Maladie) : c'est quoi ?",
          a: "C'est le numéro attribué par la CPAM lors du conventionnement (secteur 1, 2 ou 3). Format AAANNNNN. Il permet : (1) facturation à la Sécu, (2) tiers payant, (3) télétransmission FSE (feuilles de soins électroniques). Indispensable pour exercer en libéral.",
        },
        {
          q: 'CPS : utile vraiment ?',
          a: "OUI absolument — la CPS (Carte de Professionnel de Santé) est l'équivalent de votre carte d'identité numérique. Indispensable pour : signature électronique des prescriptions, télétransmission FSE, accès au DMP (Dossier Médical Partagé), accès aux services Ameli Pro. Renouvellement tous les 3 ans.",
        },
      ]}
    />
  )
}
