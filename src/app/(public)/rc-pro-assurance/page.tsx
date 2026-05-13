/**
 * Pilier — "rc pro assurance" (TIER A — 1 700 vol/mois, KD 20, CPC 500€)
 * Variante ordre des mots de /assurance-rc-pro avec angle SOUSCRIPTION + URGENCE.
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400

const SLUG = 'rc-pro-assurance'
const TITLE = 'RC Pro Assurance — Souscription en ligne, devis 24h'
const TAGLINE =
  'RC Pro : tout ce que vous devez savoir avant de souscrire. Obligations légales, garanties, exclusions, prix marché, et comment éviter les pièges des contrats low-cost.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'RC Pro : guide complet souscription. Obligations par profession, plafonds recommandés, exclusions à connaître, comparatif Hiscox / Allianz / AXA. Attestation immédiate après devis.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Avant de souscrire une RC Pro, il est crucial de comprendre ce qu'elle couvre vraiment, les pièges à éviter (exclusions cachées, plafonds insuffisants, antériorité limitée) et comment choisir entre les assureurs spécialisés. Ce guide ORIAS détaille les 7 critères de décision, les plafonds recommandés par activité et les erreurs fréquentes à éviter."
      legalReference="art. L. 124-3 + L. 121-2 + Code de la consommation art. L. 113-2 et s."
      benefits={[
        {
          icon: '⚡',
          title: 'Souscription en 5 min',
          desc: 'Devis personnalisé + attestation téléchargeable immédiatement',
        },
        {
          icon: '🔍',
          title: 'Comparatif 8 assureurs',
          desc: 'Hiscox, Allianz, AXA, MMA, Generali, Stello, Wakam, April',
        },
        {
          icon: '✅',
          title: 'Conformité ORIAS',
          desc: 'Courtier partenaire registre n° vérifiable sur orias.fr',
        },
        {
          icon: '🛡️',
          title: 'Plafonds 500k€ à 10M€',
          desc: 'Ajustés selon profil de risque et CA prévisionnel',
        },
      ]}
      sections={[
        {
          h2: '7 critères pour bien choisir son assurance RC Pro',
          body: (
            <>
              <ol>
                <li>
                  <strong>Plafond par sinistre + plafond annuel</strong> : minimum 500 000€ pour
                  services intellectuels, 1-2M€ pour BTP/conseil, 5M€+ pour activités à risque
                  (médical, financier, cyber).
                </li>
                <li>
                  <strong>Antériorité (rétroactivité)</strong> : couvre-t-elle les sinistres liés à
                  des faits antérieurs à la souscription ? Idéal = illimitée ou &gt; 5 ans.
                </li>
                <li>
                  <strong>Postériorité (subséquente)</strong> : couvre-t-elle les sinistres déclarés
                  après résiliation ? Standard = 5 ans, idéal = 10 ans.
                </li>
                <li>
                  <strong>Exclusions</strong> : lire attentivement (fautes intentionnelles,
                  cybercriminalité, données sensibles, conseils financiers spéculatifs).
                </li>
                <li>
                  <strong>Franchise par sinistre</strong> : standard 300-1 500€. Plus faible = prime
                  plus haute mais moins de reste à charge.
                </li>
                <li>
                  <strong>Procédure de déclaration</strong> : délai 5 jours ouvrés en général.
                  Certains contrats imposent 48h pour les sinistres graves.
                </li>
                <li>
                  <strong>Solidité de l&apos;assureur</strong> : vérifier score Pappers + notation
                  S&amp;P (A+ minimum recommandé).
                </li>
              </ol>
            </>
          ),
        },
        {
          h2: 'Plafonds recommandés par profession',
          body: (
            <>
              <ul>
                <li>
                  <strong>Freelance IT / Consultant</strong> : 500k€-2M€ (CA &lt; 100k€) → 2-5M€ (CA
                  &gt; 500k€)
                </li>
                <li>
                  <strong>Agence web / Communication</strong> : 1-3M€
                </li>
                <li>
                  <strong>Consultant management</strong> : 2-5M€
                </li>
                <li>
                  <strong>BTP (en complément décennale)</strong> : 1-3M€ RC Pro spécifique
                </li>
                <li>
                  <strong>Médical libéral</strong> : 5-15M€ (réglementaire selon spécialité)
                </li>
                <li>
                  <strong>Avocat</strong> : 5-10M€ (Conseil de l&apos;Ordre minimum)
                </li>
                <li>
                  <strong>Cyber-sécurité / Hébergeur</strong> : 5-25M€
                </li>
              </ul>
            </>
          ),
        },
        {
          h2: 'Erreurs fréquentes (à éviter)',
          body: (
            <>
              <ul>
                <li>
                  <strong>Sous-assurer pour économiser 50€/an</strong> : un sinistre = 30-200k€
                  moyen. Le delta de prime = peanuts.
                </li>
                <li>
                  <strong>Confondre RC Pro et RC Exploitation</strong> : besoin des deux, souvent
                  dans la Multirisque Pro.
                </li>
                <li>
                  <strong>Oublier la cyber-assurance</strong> : RC Pro standard exclut les attaques
                  informatiques. Ajout cyber spécifique.
                </li>
                <li>
                  <strong>Ignorer la postériorité</strong> : un sinistre découvert 3 ans après votre
                  cessation d&apos;activité reste votre responsabilité.
                </li>
                <li>
                  <strong>Choisir le moins cher sans comparer</strong> : franchises et exclusions
                  varient ×3 entre assureurs.
                </li>
              </ul>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'Quelle est la meilleure RC Pro pour un consultant freelance ?',
          a: 'Pour un consultant freelance services intellectuels (CA < 100k€), Hiscox et Stello proposent souvent le meilleur rapport prix/garanties (95-180€/an, plafond 1M€, postériorité 10 ans). Allianz Pro et AXA Pro sont plus chers (~250-400€/an) mais inclus des services annexes.',
        },
        {
          q: 'Combien de temps pour obtenir une attestation RC Pro ?',
          a: "Avec souscription en ligne : 5-15 minutes après finalisation du paiement. Notre courtier partenaire ORIAS délivre l'attestation immédiatement par email + téléchargement dans l'espace client.",
        },
        {
          q: 'Puis-je changer d&apos;assureur RC Pro à tout moment ?',
          a: "Oui après 1 an d'engagement (loi Hamon + résiliation infra-annuelle). Préavis 1 mois. Important : conserver la postériorité de l'ancien contrat pour les sinistres antérieurs.",
        },
        {
          q: 'La RC Pro couvre-t-elle les amendes administratives ?',
          a: "Non. Les amendes pénales et administratives (CNIL, ACPR, AMF) ne sont pas couvertes en France (ordre public). La RC Pro couvre les dommages causés à des tiers + frais de défense, pas les sanctions infligées à l'assuré.",
        },
      ]}
      relatedMetiers={[
        { name: 'Assurance RC Pro (pilier global)', slug: 'assurance-rc-pro' },
        { name: 'RC Pro auto-entrepreneur', slug: 'rc-pro/auto-entrepreneur' },
        { name: 'RC Pro pas cher (comparatif)', slug: 'rc-pro-pas-cher' },
        { name: 'Souscrire RC Pro en ligne', slug: 'rc-pro-en-ligne' },
        { name: 'Devis RC Pro', slug: 'comparateur-rc-pro' },
      ]}
    />
  )
}
