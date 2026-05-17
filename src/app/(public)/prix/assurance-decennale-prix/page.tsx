/**
 * Prix — "assurance décennale prix" (400 vol, KD 5, CPC 250€)
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { COMPARATIF_BTP, EXPERT_BTP, STATS_DEFAULT } from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'prix / assurance-decennale-prix'
const TITLE = 'Assurance Décennale Prix — Tarifs 2026 par métier BTP'
const TAGLINE =
  'Prix décennale BTP 2026 : peintre AE 950€ par an, plombier 1 400€ par an, maçon 1 800€ par an, couvreur 2 500€ par an. Comparatif April Pro best price.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Prix assurance décennale 2026 par métier : peintre 950€ par an, plombier 1400€ par an, maçon 1800€ par an, couvreur 2500€ par an. April Pro best price marché.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Prix assurance décennale BTP 2026 vérifiés par métier et statut juridique. Données basées sur l'analyse de 1 000+ devis traités par notre courtier ORIAS partenaire chez les 5 assureurs spécialisés BTP (April Pro, SMABTP, Allianz Pro, MMA Pro BTP, AXA Pro BTP)."
      legalReference="Loi Spinetta + art. 1792 Code civil + art. L. 241-1 C. assur."
      isObligatoire={true}
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="decennale"
      expertBio={EXPERT_BTP}
      comparatifRows={COMPARATIF_BTP}
      benefits={[
        { icon: '📊', title: 'Prix vérifiés 2026', desc: 'Basés sur 1 000+ devis réels traités' },
        {
          icon: '🥇',
          title: 'April Pro best price',
          desc: 'Leader BTP -10-20% vs autres pour AE ou SARL',
        },
        { icon: '🏗️', title: '52 métiers BTP', desc: 'Tarifs détaillés du peintre au terrassier' },
        {
          icon: '💼',
          title: 'Tous statuts juridiques',
          desc: 'AE, EI, SARL, SAS — fourchettes complètes',
        },
      ]}
      sections={[
        {
          h2: 'Prix décennale AE par métier BTP 2026',
          body: (
            <ul>
              <li>
                <strong>Peintre</strong> : 950-1 400€ par an (le moins risqué)
              </li>
              <li>
                <strong>Plâtrier</strong> : 1 100-1 600€ par an
              </li>
              <li>
                <strong>Carreleur</strong> : 1 200-1 700€ par an
              </li>
              <li>
                <strong>Plombier</strong> : 1 400-2 100€ par an (18% sinistralité)
              </li>
              <li>
                <strong>Plombier-chauffagiste</strong> : 1 600-2 500€ par an
              </li>
              <li>
                <strong>Électricien</strong> : 1 500-2 200€ par an
              </li>
              <li>
                <strong>Menuisier</strong> : 1 600-2 400€ par an
              </li>
              <li>
                <strong>Maçon traditionnel</strong> : 1 800-2 800€ par an (12% sinistralité)
              </li>
              <li>
                <strong>Maçon béton armé</strong> : 2 200-3 200€ par an
              </li>
              <li>
                <strong>Couvreur-zingueur</strong> : 2 200-3 500€ par an (24% sinistralité — top)
              </li>
              <li>
                <strong>Charpentier</strong> : 2 400-3 800€ par an
              </li>
              <li>
                <strong>Étancheur</strong> : 2 500-4 500€ par an
              </li>
              <li>
                <strong>Terrassier ou TP</strong> : 2 800-4 500€ par an (risque max)
              </li>
              <li>
                <strong>Multi-services BTP</strong> : 2 200-3 500€ par an
              </li>
            </ul>
          ),
        },
        {
          h2: 'Prix décennale SARL ou SAS par profil 2026',
          body: (
            <ul>
              <li>
                <strong>SARL plomberie 3 salariés</strong> : 2 200-3 500€ par an
              </li>
              <li>
                <strong>SARL électricité 5 salariés</strong> : 3 200-5 000€ par an
              </li>
              <li>
                <strong>SARL maçonnerie 5 salariés</strong> : 3 800-5 500€ par an
              </li>
              <li>
                <strong>SARL couverture 3 salariés</strong> : 4 200-7 500€ par an
              </li>
              <li>
                <strong>SAS BTP PME 10 salariés</strong> : 5 500-12 000€ par an
              </li>
              <li>
                <strong>SAS gros œuvre 30 salariés</strong> : 12 000-30 000€ par an
              </li>
              <li>
                <strong>Promoteur — CMI</strong> : 8 000-50 000€ par an+ (responsabilité MO)
              </li>
            </ul>
          ),
        },
        {
          h2: '7 facteurs qui impactent le prix décennale',
          body: (
            <ol>
              <li>
                <strong>Métier</strong> : sinistralité 6% (peintre) à 24% (couvreur) — prime ×2.5
              </li>
              <li>
                <strong>Statut juridique</strong> : AE moins cher que SARL ou SAS (plafond CA
                limité)
              </li>
              <li>
                <strong>CA déclaré</strong> : assiette de la prime (proportionnel)
              </li>
              <li>
                <strong>Plafond garantie</strong> : 1M€ standard, 2-3M€ +20-30%
              </li>
              <li>
                <strong>Franchise</strong> : 800-2 500€ — impact -12-18%
              </li>
              <li>
                <strong>Ancienneté + sinistralité</strong> : 3+ ans sans sinistre = -10-15%
              </li>
              <li>
                <strong>Qualifications RGE ou Qualibat</strong> : -5-10% chez certains assureurs
              </li>
            </ol>
          ),
        },
      ]}
      faq={[
        {
          q: 'Quel prix décennale pour un plombier débutant ?',
          a: 'AE plombier débutant (CA &lt; 50k€) : 1 400-1 800€ par an chez April Pro BTP (best price). Avec qualifications Qualibat 5121 + RGE : 1 300-1 700€ par an. Plafond 1M€ standard.',
        },
        {
          q: 'Pourquoi la décennale couvreur est-elle si chère ?',
          a: 'La couverture représente 24% des sinistres décennaux BTP (top — AQC SYCODÉS). Infiltrations, glissements tuiles, effondrement charpente sont fréquents et coûteux (50k-1M€ par sinistre). Prime ×2 vs peintre AE.',
        },
        {
          q: 'Prix décennale moins cher possible ?',
          a: '6 leviers : 1) Comparer 5 assureurs spé BTP (-15-25%). 2) Augmenter franchise (-12-18%). 3) Qualibat ou RGE (-5-10%). 4) Pack RC Pro + Décennale (-10-15%). 5) Antériorité sans sinistre (-10-15%). 6) Paiement annuel (-3-7%). Cumul : -30-45%.',
        },
        {
          q: 'Tarif SARL plombier 10 salariés ?',
          a: 'SARL plomberie 10 salariés CA 800k€-1.5M€ : 4 500-7 500€ par an chez April Pro ou SMABTP. Pack RC Pro + Décennale + Multirisque + Flotte = 8 000-15 000€ par an total avec remise paquet.',
        },
      ]}
      relatedMetiers={[
        { name: 'Assurance décennale (vue globale)', slug: 'assurance-decennale' },
        { name: 'Décennale BTP', slug: 'assurance-decennale-btp' },
        { name: 'Décennale pas chère', slug: 'assurance-decennale-pas-cher' },
        { name: 'Décennale la moins chère', slug: 'assurance-decennale-la-moins-chere' },
        { name: 'Devis décennale', slug: 'devis/assurance-decennale' },
      ]}
    />
  )
}
