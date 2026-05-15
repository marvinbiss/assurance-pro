/**
 * Pilier — "assurance décennale terrassement" (90 vol, KD 0, CPC 800€) MONEY
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { COMPARATIF_BTP, EXPERT_BTP, STATS_DEFAULT } from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'assurance-decennale-terrassement'
const TITLE = 'Assurance Décennale Terrassement — Risques élevés, tarifs 2026'
const TAGLINE =
  'Le terrassier (TP) est soumis à une décennale renforcée : risques élevés (effondrements, glissements, instabilité sol). Tarif AE 2 800-4 500€/an, SARL 5 000-12 000€/an.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Décennale terrassement : risques élevés (effondrement, glissement terrain), Loi Spinetta. AE 2 800-4 500€/an, SARL TP 5 000-12 000€/an. Étude sol obligatoire.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Le terrassement et les travaux publics (TP) sont les activités BTP les plus risquées en décennale : risques d'effondrement, glissement de terrain, instabilité du sol, défaut de portance des fondations. Un sinistre terrassement peut coûter 200k€-2M€ (reprise complète fondations + dommages collatéraux structure). Les tarifs reflètent ces risques : 2-3× supérieurs à un peintre. Cette page détaille les obligations, garanties spécifiques et leviers de réduction de prime pour terrassier TP."
      legalReference="Loi Spinetta + art. 1792 Code civil + DTU 12 (Terrassements)"
      isObligatoire={true}
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="decennale"
      expertBio={EXPERT_BTP}
      comparatifRows={COMPARATIF_BTP}
      benefits={[
        {
          icon: '🚜',
          title: 'Terrassement + TP',
          desc: 'Fondations, déblaiement, mouvement de terre, démolition',
        },
        {
          icon: '⚠️',
          title: 'Risques élevés',
          desc: 'Effondrement, glissement, instabilité sol, défaut portance',
        },
        {
          icon: '💰',
          title: '2 800-12 000€/an',
          desc: 'AE 2 800-4 500€ • SARL 5 000-8 000€ • SAS TP PME 8 000-12 000€+',
        },
        {
          icon: '🔬',
          title: 'Étude sol obligatoire',
          desc: 'DTU 12 + norme NF P 11-300 — études G1 à G5',
        },
      ]}
      sections={[
        {
          h2: 'Activités couvertes par décennale terrassement',
          body: (
            <ul>
              <li>
                <strong>Terrassement général</strong> : déblais, remblais, mise en forme du terrain
              </li>
              <li>
                <strong>Préparation fondations</strong> : fouilles, semelles, radiers
              </li>
              <li>
                <strong>Réseaux enterrés</strong> : assainissement, drainage, canalisations EU/EP
              </li>
              <li>
                <strong>Soutènement</strong> : murs de soutènement, palplanches, pieux
              </li>
              <li>
                <strong>VRD (Voirie + Réseaux Divers)</strong> : voiries, parkings, accès chantier
              </li>
              <li>
                <strong>Mouvements de terre importants</strong> : terrassements zone montagne,
                terrains pentus
              </li>
              <li>
                <strong>Démolition + excavation</strong> : préparation pour reconstruction
              </li>
              <li>
                <strong>Forage géothermie</strong> : pour PAC géothermique profonde (RGE)
              </li>
            </ul>
          ),
        },
        {
          h2: 'Sinistres typiques terrassement',
          body: (
            <ul>
              <li>
                <strong>Effondrement partiel fouille</strong> : terrassement insuffisamment étayé →
                effondrement avec dommages voisins. 50-300k€.
              </li>
              <li>
                <strong>Glissement de terrain</strong> : terrassement zone pentue mal stabilisé →
                glissement aval. 100k-1M€ (selon ampleur).
              </li>
              <li>
                <strong>Défaut portance fondations</strong> : étude sol G1-G2 insuffisante →
                tassement différentiel structure. 200-800k€.
              </li>
              <li>
                <strong>Inondation lors travaux</strong> : drainage défaillant → eaux pluviales dans
                fouilles + sous-sols voisins. 30-150k€.
              </li>
              <li>
                <strong>Rupture canalisations enterrées</strong> : touche réseau gaz/électricité/eau
                lors fouilles. 20-200k€.
              </li>
              <li>
                <strong>Mouvement de terrain post-réception</strong> : tassement progressif 2-5 ans
                après → fissures structurelles. 100-500k€.
              </li>
            </ul>
          ),
        },
        {
          h2: 'Tarifs décennale terrassement 2026',
          body: (
            <ul>
              <li>
                <strong>Terrassier AE débutant (CA &lt; 80k€)</strong> : 2 800-3 800€/an, plafond
                1-2M€
              </li>
              <li>
                <strong>Terrassier AE expérimenté (3+ ans)</strong> : 3 500-4 500€/an, plafond 2-3M€
              </li>
              <li>
                <strong>SARL terrassement (1-5 salariés)</strong> : 5 000-8 000€/an, plafond 3M€
              </li>
              <li>
                <strong>SAS TP moyenne (5-15 salariés)</strong> : 7 500-15 000€/an, plafond 3-5M€
              </li>
              <li>
                <strong>SAS TP grosse (15-50 salariés)</strong> : 12 000-30 000€/an, plafond 5-10M€
              </li>
              <li>
                <strong>Spécialiste foreur géothermie</strong> : 4 500-9 000€/an (qualification RGE
                Qualibat + extension géothermie)
              </li>
              <li>
                <strong>VRD avec réseaux gaz/électricité</strong> : prime +20-30% (risque accru
                réseaux enterrés)
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Pourquoi la décennale terrassement est-elle si chère ?',
          a: 'Le terrassement génère 8-12% des sinistres décennaux BTP (AQC SYCODÉS) avec des sinistres MAJEURS (effondrement, glissement terrain = 100k-1M€). Sinistralité moyenne du métier × 3 vs un peintre. Tarif AE terrassier 2 800-4 500€/an vs peintre 950€/an.',
        },
        {
          q: 'Une étude de sol est-elle obligatoire avant terrassement ?',
          a: 'Pour fondations maison individuelle neuve : étude sol G1 obligatoire (Loi ELAN 2018, art. L. 112-22 Code de la construction). Pour SARL terrassement professionnel : étude G2 PRO recommandée systématiquement (assurance la refusera sinon). Coût : 2 000-5 000€.',
        },
        {
          q: 'Comment réduire ma prime décennale terrassement ?',
          a: '1) Comparer 5 assureurs spécialisés (SMABTP leader, April Pro, Allianz Pro, MMA Pro, AXA Pro). 2) Augmenter franchise à 2 500€ (-15-20%). 3) Qualifications Qualibat 1311, 1351 (-5-10%). 4) Étude sol systématique (réduction tarification). Économie 20-35%.',
        },
        {
          q: 'La décennale couvre-t-elle un tassement post-réception ?',
          a: "OUI si dans les 10 ans post-réception ET si le tassement affecte la solidité ou la destination de l'ouvrage. Tassement différentiel structurel → décennale. Tassement esthétique mineur sur dallage extérieur → parfait achèvement uniquement (1 an).",
        },
      ]}
      relatedMetiers={[
        { name: 'Assurance décennale (vue globale)', slug: 'assurance-decennale' },
        { name: 'Décennale BTP', slug: 'assurance-decennale-btp' },
        { name: 'Décennale obligatoire', slug: 'assurance-decennale-obligatoire' },
        { name: 'Décennale maçonnerie', slug: 'assurance-decennale-maconnerie' },
        { name: 'Décennale bâtiment', slug: 'assurance-decennale-batiment' },
      ]}
    />
  )
}
