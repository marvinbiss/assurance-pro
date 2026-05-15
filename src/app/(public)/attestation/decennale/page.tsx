/**
 * Attestation — "attestation décennale" (600 vol, KD 1, CPC 300€) MONEY
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { COMPARATIF_BTP, EXPERT_BTP, STATS_DEFAULT } from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'attestation/decennale'
const TITLE = 'Attestation Décennale — Modèle, mentions obligatoires, démarches'
const TAGLINE =
  "L'attestation décennale est obligatoire pour tout BTP (Loi Spinetta). Modèle PDF, 10 mentions obligatoires, démarches d'obtention en 24h. Présentation MO."

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    "Attestation décennale BTP : modèle PDF, mentions obligatoires Loi Spinetta. Obligation présentation maître d'ouvrage AVANT chantier. April Pro 24h, autres 48h.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'attestation décennale est le document obligatoire (Loi Spinetta + art. 1792 Code civil) que tout constructeur BTP doit fournir au maître d'ouvrage AVANT le démarrage du chantier. Sans cette attestation, le maître d'ouvrage peut bloquer le chantier, et le notaire bloquera la vente immobilière. Cette page détaille le modèle officiel, les 10 mentions obligatoires, et les démarches d'obtention rapide chez les 5 assureurs spécialisés BTP."
      legalReference="Loi Spinetta + art. 1792 Code civil + art. L. 241-1 C. assur."
      isObligatoire={true}
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="decennale"
      expertBio={EXPERT_BTP}
      comparatifRows={COMPARATIF_BTP}
      benefits={[
        {
          icon: '⚖️',
          title: 'Obligation Loi Spinetta',
          desc: 'AVANT démarrage chantier — sanctions pénales si défaut',
        },
        {
          icon: '📋',
          title: '10 mentions obligatoires',
          desc: 'Assureur + assuré + chantier + plafond + métier + ORIAS',
        },
        {
          icon: '⚡',
          title: 'April Pro 24h',
          desc: 'Délivrance rapide chez leader BTP — autres 48-72h',
        },
        {
          icon: '🏗️',
          title: '52 métiers BTP',
          desc: 'Maçon, plombier, électricien, peintre, etc.',
        },
      ]}
      sections={[
        {
          h2: 'Les 10 mentions obligatoires attestation décennale',
          body: (
            <ol>
              <li>
                <strong>Identité de l&apos;assureur</strong> : raison sociale + adresse + agrément
                ACPR
              </li>
              <li>
                <strong>Identité de l&apos;assuré</strong> : raison sociale ou nom + SIRET + adresse
              </li>
              <li>
                <strong>Numéro de contrat</strong> (référence police)
              </li>
              <li>
                <strong>Période de validité</strong> (date d&apos;effet + échéance — 1 an
                renouvelable)
              </li>
              <li>
                <strong>Activité(s) BTP couverte(s)</strong> : nomenclature Qualibat précise
                (peintre, plombier, etc.)
              </li>
              <li>
                <strong>Plafond par sinistre</strong> : montant garanti (1M€ standard AE, 2-3M€
                SARL/SAS)
              </li>
              <li>
                <strong>Mention Loi Spinetta</strong> : &quot;Conforme aux dispositions des articles
                1792 et suivants du Code civil&quot;
              </li>
              <li>
                <strong>Numéro ORIAS</strong> du courtier intermédiaire (si applicable, cliquable
                arrêté 2022)
              </li>
              <li>
                <strong>Date d&apos;émission</strong> de l&apos;attestation
              </li>
              <li>
                <strong>Signature / cachet électronique</strong> de l&apos;assureur
              </li>
            </ol>
          ),
        },
        {
          h2: "Obligation de présentation au maître d'ouvrage",
          body: (
            <>
              <p>
                Le constructeur DOIT remettre l&apos;attestation décennale au maître d&apos;ouvrage{' '}
                <strong>AVANT le démarrage du chantier</strong> :
              </p>
              <ul>
                <li>
                  <strong>Sanction si oubli</strong> : MO peut bloquer démarrage chantier ou
                  suspendre paiements
                </li>
                <li>
                  <strong>Vente immobilière</strong> : notaire vérifie attestation des constructeurs
                  &lt; 10 ans
                </li>
                <li>
                  <strong>Sans attestation</strong> : vente bloquée chez notaire, négociation prix
                  avec décote -10-30%
                </li>
                <li>
                  <strong>Marchés publics</strong> : attestation obligatoire dans dossier
                  candidature
                </li>
                <li>
                  <strong>Banque finançant chantier</strong> : exige attestation avant déblocage
                  prêt
                </li>
                <li>
                  <strong>Conservation</strong> : MO doit conserver attestations 10 ans (durée
                  garantie)
                </li>
              </ul>
            </>
          ),
        },
        {
          h2: 'Démarches obtention attestation décennale',
          body: (
            <ol>
              <li>
                <strong>Si pas encore souscrit</strong> : devis comparatif gratuit (5 min) →
                souscription April Pro/SMABTP/Allianz → attestation 24h chez April Pro
              </li>
              <li>
                <strong>Si déjà souscrit</strong> : connexion espace adhérent assureur →
                téléchargement PDF immédiat
              </li>
              <li>
                <strong>Demande nominative</strong> (par MO grand chantier) : email à votre
                conseiller, délai 24-72h
              </li>
              <li>
                <strong>Délai express</strong> : 4-24h chez April Pro BTP (le plus rapide). 24-48h
                chez SMABTP. 48-72h chez Allianz Pro/MMA Pro BTP/AXA Pro BTP
              </li>
              <li>
                <strong>Format</strong> : PDF téléchargeable, format A4, imprimable couleur ou noir
                et blanc
              </li>
            </ol>
          ),
        },
      ]}
      faq={[
        {
          q: "Quand présenter l'attestation décennale au MO ?",
          a: 'AVANT démarrage chantier — c&apos;est une obligation légale (Loi Spinetta). Idéalement à la signature du devis ou du contrat de construction. Le MO doit pouvoir vérifier validité (numéro ORIAS, période, activité) avant tout paiement d&apos;acompte.',
        },
        {
          q: 'Délai pour avoir attestation décennale après souscription ?',
          a: 'April Pro BTP : 24h ouvrées (le plus rapide). SMABTP : 24-48h. Allianz Pro BTP / MMA Pro BTP : 48h. AXA Pro BTP : 48-72h. Avec urgence chantier déclarée : possible 4-12h chez April Pro et certains courtiers (parfois supplément 50-100€).',
        },
        {
          q: 'Que vaut une attestation décennale sans tampon ACPR ?',
          a: 'NULLE. Tout assureur agréé ACPR doit mentionner son agrément + tampon ou cachet électronique. Sans cela : doute sur authenticité. Vérifier sur registre Refassu ACPR (acpr.banque-france.fr) que l&apos;assureur est bien agréé.',
        },
        {
          q: 'Attestation décennale et RC Pro : le même document ?',
          a: 'NON, documents DISTINCTS pour 2 contrats différents. Pour BTP : il faut LES DEUX attestations (RC Pro + Décennale). Pour services non-BTP : attestation RC Pro suffit. Modèles similaires mais mentions activités diffèrent.',
        },
      ]}
      relatedMetiers={[
        { name: 'Attestation décennale (variante)', slug: 'attestation/assurance-decennale' },
        { name: 'Attestation décennale PDF', slug: 'attestation/decennale-pdf' },
        { name: 'Attestation RC Pro', slug: 'attestation/rc-pro' },
        { name: 'Assurance décennale (vue globale)', slug: 'assurance-decennale' },
        { name: 'Décennale immédiate', slug: 'assurance-decennale-immediate' },
      ]}
    />
  )
}
