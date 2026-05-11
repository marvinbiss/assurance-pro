/**
 * Pilier — "assurance décennale pas cher" (TIER A — 600 vol/mois, KD 26, CPC 500€)
 * Angle PRIX/ÉCONOMIES + comparatif assureurs low-cost vs premium.
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400

const SLUG = 'assurance-decennale-pas-cher'
const TITLE = 'Assurance Décennale pas chère — Comparatif 2026, économisez 40%'
const TAGLINE =
  'Trouver une décennale pas chère sans sacrifier la conformité Loi Spinetta : 7 leviers pour réduire votre prime, pièges à éviter et comparatif des assureurs low-cost vs premium.'

export const metadata: Metadata = {
  title: `${TITLE} | Vivos Assurance`,
  description:
    "Décennale pas chère : tarif à partir de 950€/an (auto-entrepreneur peintre), 1 800€/an (SARL maçon). 7 leviers d'économies, pièges à éviter, comparatif Hiscox vs April vs SMABTP.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="La garantie décennale est obligatoire pour tous les constructeurs (Loi Spinetta 1978, art. 1792 Code civil) — mais son coût varie de 950€/an à 8 000€/an+ selon votre métier, statut, sinistralité et assureur choisi. Cette page détaille les 7 leviers concrets pour réduire significativement votre prime décennale sans sacrifier la conformité ni les garanties critiques."
      legalReference="Loi Spinetta 1978 + art. 1792 Code civil + art. L. 241-1 Code assurances"
      isObligatoire={true}
      benefits={[
        {
          icon: '💰',
          title: 'Économies 20-40%',
          desc: 'Selon leviers activés (statut, franchise, regroupement, etc.)',
        },
        {
          icon: '⚖️',
          title: 'Conformité préservée',
          desc: 'Plafonds + qualifications RGE/Qualibat respectés',
        },
        {
          icon: '🏗️',
          title: '52 métiers BTP',
          desc: 'Tarifs spécifiques par activité (maçon, peintre, électricien, etc.)',
        },
        {
          icon: '📋',
          title: 'Attestation conforme',
          desc: 'Présentable au maître d&apos;ouvrage, garantie nominative',
        },
      ]}
      sections={[
        {
          h2: '7 leviers pour une décennale moins chère',
          body: (
            <>
              <ol>
                <li>
                  <strong>Comparer 5 assureurs minimum</strong> : la prime varie de ×2 entre Hiscox
                  / April Pro / SMABTP / Allianz / AXA pour un même profil.
                </li>
                <li>
                  <strong>Augmenter la franchise</strong> : passer de 1 500€ à 3 000€ peut réduire
                  la prime de 12-18%.
                </li>
                <li>
                  <strong>Optimiser le CA déclaré</strong> : déclarer le CA réel HT (pas TTC ni avec
                  sous-traitance), c&apos;est l&apos;assiette de la prime.
                </li>
                <li>
                  <strong>Obtenir une certification RGE/Qualibat</strong> : peut donner -5 à -10%
                  chez certains assureurs.
                </li>
                <li>
                  <strong>Souscrire RC Pro + Décennale ensemble</strong> : remise paquet de 8-12%
                  courante.
                </li>
                <li>
                  <strong>Antériorité de couverture continue</strong> : 3+ ans sans sinistre ouvre
                  des remises 10-20%.
                </li>
                <li>
                  <strong>Choisir un courtier ORIAS spécialisé BTP</strong> : meilleurs prix vs
                  souscription directe assureur (-15-25%).
                </li>
              </ol>
            </>
          ),
        },
        {
          h2: 'Tarifs marché 2026 par métier',
          body: (
            <>
              <ul>
                <li>
                  <strong>Peintre auto-entrepreneur</strong> : 950-1 400€/an
                </li>
                <li>
                  <strong>Plâtrier auto-entrepreneur</strong> : 1 100-1 600€/an
                </li>
                <li>
                  <strong>Carreleur AE</strong> : 1 200-1 700€/an
                </li>
                <li>
                  <strong>Plombier AE</strong> : 1 400-2 100€/an
                </li>
                <li>
                  <strong>Électricien AE</strong> : 1 500-2 200€/an
                </li>
                <li>
                  <strong>Maçon AE</strong> : 1 800-2 800€/an
                </li>
                <li>
                  <strong>Couvreur AE</strong> : 2 200-3 500€/an (risque élevé)
                </li>
                <li>
                  <strong>Charpentier AE</strong> : 2 400-3 800€/an
                </li>
                <li>
                  <strong>Plombier SARL/EURL</strong> : 1 800-3 500€/an
                </li>
                <li>
                  <strong>Maçon SARL/EURL</strong> : 2 500-5 000€/an
                </li>
                <li>
                  <strong>Multi-services BTP SAS</strong> : 3 500-8 000€/an+
                </li>
              </ul>
            </>
          ),
        },
        {
          h2: 'Pièges à éviter pour une décennale low-cost',
          body: (
            <>
              <ul>
                <li>
                  <strong>Plafond insuffisant</strong> : certains contrats &quot;pas chers&quot;
                  plafonnent à 500 000€ par sinistre — insuffisant pour des travaux &gt; 200k€.
                </li>
                <li>
                  <strong>Exclusions cachées</strong> : exclusion sous-traitance non déclarée,
                  exclusion travaux spécifiques (piscine, photovoltaïque sans RGE), exclusion
                  outre-mer.
                </li>
                <li>
                  <strong>Postériorité limitée</strong> : standard légal = 10 ans. Certains contrats
                  low-cost limitent à 5 ans après résiliation = exposition pour les 5 dernières
                  années.
                </li>
                <li>
                  <strong>Assureurs non-conformes</strong> : un assureur basé hors UE non agréé ACPR
                  n&apos;est pas reconnu par le maître d&apos;ouvrage / notaire.
                </li>
                <li>
                  <strong>Devis &quot;décennale + DO&quot; à 800€/an</strong> : trop beau pour être
                  vrai = arnaque courante. Une vraie décennale BTP démarre à 950€/an minimum.
                </li>
              </ul>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'Quel est le tarif minimum d&apos;une décennale conforme ?',
          a: "Pour un auto-entrepreneur peintre (métier le moins risqué), comptez 950-1 400€/an chez April Pro ou Hiscox. En-dessous de 800€/an pour un BTP réel = suspicion d'arnaque ou de défaut de conformité.",
        },
        {
          q: 'Comment réduire ma prime décennale de 30% ?',
          a: 'Combiner 3 leviers : 1) Comparer 5 assureurs via un courtier ORIAS spécialisé (-15-25%), 2) Augmenter la franchise à 3 000€ (-12-18%), 3) Regrouper avec votre RC Pro (-8-12%). Économie cumulée : 25-35%.',
        },
        {
          q: 'Puis-je avoir une décennale moins chère en auto-entrepreneur qu&apos;en SARL ?',
          a: 'Oui généralement. Le statut auto-entrepreneur impacte la prime via la plafonnement du CA (77 700€ services / 188 700€ vente). Prime moyenne AE = -30 à -50% vs SARL même activité même CA.',
        },
        {
          q: 'Les assureurs étrangers sont-ils moins chers ?',
          a: "Souvent oui mais ATTENTION : seuls les assureurs agréés ACPR (ou passeport européen LPS) sont reconnus pour la décennale française. Vérifier sur le registre Refassu de l'ACPR avant souscription.",
        },
      ]}
      relatedMetiers={[
        { name: 'Assurance décennale (vue globale)', slug: 'assurance-decennale' },
        { name: 'Décennale auto-entrepreneur', slug: 'assurance-decennale-auto-entrepreneur' },
        { name: 'Décennale BTP', slug: 'assurance-decennale-btp' },
        { name: 'Devis décennale', slug: 'devis/assurance-decennale' },
        { name: 'Comparateur décennale', slug: 'comparateur/assurance-decennale' },
      ]}
    />
  )
}
