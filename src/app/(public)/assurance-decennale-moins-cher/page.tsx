/**
 * Pilier — "assurance décennale moins cher" (50 vol, KD 24, CPC 600€) MONEY
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { COMPARATIF_BTP, EXPERT_BTP, STATS_DEFAULT } from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'assurance-decennale-moins-cher'
const TITLE = 'Assurance Décennale Moins Chère — 7 leviers d&apos;économies 2026'
const TAGLINE =
  'Trouver une décennale moins chère sans sacrifier la conformité : 7 leviers concrets pour réduire votre prime, pièges à éviter et tarifs marché précis.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    "Décennale moins chère : 7 leviers d'économies (-25-40% prime). Tarifs marché précis par métier. Pièges contrats low-cost. April Pro, SMABTP, Allianz comparatif honnête.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Comment trouver une décennale moins chère tout en respectant la conformité légale (Loi Spinetta) et en gardant des garanties suffisantes ? Cette page détaille les 7 leviers concrets pour réduire votre prime de 25-40% sans risque, avec les tarifs marché précis par métier BTP et les pièges des contrats low-cost à absolument éviter."
      legalReference="Loi Spinetta + art. 1792 Code civil + art. L. 241-1 C. assur."
      isObligatoire={true}
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="decennale"
      expertBio={EXPERT_BTP}
      comparatifRows={COMPARATIF_BTP}
      benefits={[
        {
          icon: '💰',
          title: '7 leviers d&apos;économies',
          desc: 'Total possible : -25-40% sur prime décennale',
        },
        {
          icon: '⚖️',
          title: 'Conformité préservée',
          desc: 'Tous leviers respectent obligations Loi Spinetta',
        },
        {
          icon: '⚠️',
          title: 'Pièges à éviter',
          desc: 'Contrats low-cost avec exclusions étendues — plafonds insuffisants',
        },
        {
          icon: '🔍',
          title: 'Tarifs marché vérifiés',
          desc: 'Fourchettes April Pro — SMABTP — Allianz — MMA — AXA 2026',
        },
      ]}
      sections={[
        {
          h2: 'Les 7 leviers concrets',
          body: (
            <ol>
              <li>
                <strong>Comparer 5 assureurs minimum</strong> via courtier ORIAS spécialisé BTP. La
                prime varie ×1.5-2 entre April Pro, SMABTP, Allianz Pro, MMA Pro BTP, AXA Pro BTP.{' '}
                <strong>Économie : -15-25%</strong>.
              </li>
              <li>
                <strong>Augmenter la franchise</strong> de 800€ à 1 500-2 500€.{' '}
                <strong>Économie : -12-18%</strong>. Risque : reste à charge plus élevé en cas de
                sinistre.
              </li>
              <li>
                <strong>Obtenir certifications Qualibat — RGE</strong> selon métier. Qualibat 2111
                (maçon), 3111 (couvreur), 5121 (plombier). <strong>Économie : -5-10%</strong>. Bonus
                : crédibilité chez clients.
              </li>
              <li>
                <strong>Pack combiné RC Pro + Décennale + Multirisque</strong> chez même assureur.{' '}
                <strong>Économie : -10-15%</strong> remise paquet.
              </li>
              <li>
                <strong>Antériorité sans sinistre</strong> : 3 ans+ sans sinistre déclaré chez
                précédent assureur. <strong>Économie : -10-15%</strong>.
              </li>
              <li>
                <strong>Optimiser CA déclaré</strong> : déclarer CA RÉEL HT (pas TTC, pas avec
                sous-traitance). Sur-déclaration = sur-prime inutile.{' '}
                <strong>Économie : -5-15%</strong> selon décalage.
              </li>
              <li>
                <strong>Paiement annuel</strong> vs mensualisation.{' '}
                <strong>Économie : -3-7%</strong>.
              </li>
            </ol>
          ),
        },
        {
          h2: 'Tarifs marché &quot;moins chers&quot; 2026 (verifiés)',
          body: (
            <ul>
              <li>
                <strong>Peintre AE le plus bas</strong> : 950€ par an chez April Pro (formule
                standard, plafond 1M€)
              </li>
              <li>
                <strong>Plâtrier AE le plus bas</strong> : 1 100€ par an chez April Pro
              </li>
              <li>
                <strong>Carreleur AE le plus bas</strong> : 1 200€ par an chez April Pro ou Allianz
                Pro
              </li>
              <li>
                <strong>Plombier AE le plus bas</strong> : 1 400€ par an chez April Pro
              </li>
              <li>
                <strong>Électricien AE le plus bas</strong> : 1 500€ par an chez April Pro
              </li>
              <li>
                <strong>Maçon AE le plus bas</strong> : 1 800€ par an chez April Pro
              </li>
              <li>
                <strong>Multi-services BTP AE le plus bas</strong> : 2 200€ par an chez April Pro
                (pack 5-10 métiers)
              </li>
              <li>
                <strong>Couvreur AE</strong> : minimum 2 200€ par an chez April Pro (risque)
              </li>
              <li>
                <strong>SARL BTP 3 salariés</strong> : minimum 2 200€ par an chez April Pro selon
                métier principal
              </li>
              <li>
                En-dessous de ces prix : <strong>SUSPECT</strong> (arnaque, assureur non-agréé ACPR,
                exclusions étendues)
              </li>
            </ul>
          ),
        },
        {
          h2: '4 pièges des décennales low-cost',
          body: (
            <ol>
              <li>
                <strong>Plafond insuffisant</strong> : certains contrats à 800€ par an plafonnent à
                500 000€ par sinistre — insuffisant pour chantiers &gt; 200k€. Plafond mini
                recommandé : 1M€ AE, 2-3M€ SARL ou SAS.
              </li>
              <li>
                <strong>Exclusions étendues</strong> : sous-traitance non-déclarée, travaux
                outre-mer, RGE sans qualification, certains métiers spéciaux (piscine,
                photovoltaïque sans extension dédiée).
              </li>
              <li>
                <strong>Postériorité limitée</strong> : standard légal = 10 ans. Certains contrats
                &quot;low-cost&quot; limitent à 5 ans après résiliation = exposition pour les 5
                dernières années de vos chantiers.
              </li>
              <li>
                <strong>Assureur non agréé ACPR</strong> : assureur étranger sans passeport européen
                LPS valide = non-reconnu par notaire ou maître d&apos;ouvrage. Vérifier sur Refassu
                ACPR avant souscription.
              </li>
            </ol>
          ),
        },
      ]}
      faq={[
        {
          q: 'Décennale à 800€ par an pour artisan BTP, c&apos;est possible ?',
          a: 'Pour un peintre AE : oui chez April Pro (950€ par an minimum). En-dessous de 800€ par an = SUSPECT : 1) Plafond insuffisant (&lt; 500k€), 2) Exclusions étendues, 3) Assureur non-agréé ACPR. Toujours vérifier le contrat dans le détail avant de signer.',
        },
        {
          q: 'Quelle décennale est la moins chère sur le marché ?',
          a: 'April Pro BTP est généralement le best price sur AE et SARL BTP (-10-20% vs concurrents pour profil équivalent). SMABTP et Allianz Pro sont compétitifs sur SAS PME. Notre courtier ORIAS compare les 5 (April, SMABTP, Allianz, MMA, AXA).',
        },
        {
          q: 'Combien d&apos;économies réelles en appliquant les 7 leviers ?',
          a: 'Sur un cas type AE plombier prime de base 2 000€ par an : levier 1 (comparer) -300€, levier 2 (franchise) -250€, levier 3 (Qualibat) -100€, levier 4 (pack) -200€, levier 5 (antériorité) -200€, levier 6 (CA) -150€, levier 7 (paiement annuel) -80€. Total -1 280€ par an soit -64% — mais en réalité environ -30-40% car cumul partiel.',
        },
        {
          q: 'Comment vérifier qu&apos;un assureur est agréé ACPR ?',
          a: "Consulter le registre Refassu de l'ACPR (acpr.banque-france.fr). Mention obligatoire sur attestation décennale : numéro agrément + adresse siège social ACPR-supervisé. Assureur étranger : vérifier passeport européen LPS (liberté prestation services). Si pas trouvé : NE PAS SIGNER.",
        },
      ]}
      relatedMetiers={[
        { name: 'Décennale pas chère (variante)', slug: 'assurance-decennale-pas-cher' },
        { name: 'Assurance décennale (vue globale)', slug: 'assurance-decennale' },
        { name: 'Décennale BTP', slug: 'assurance-decennale-btp' },
        { name: 'Décennale la moins chère', slug: 'assurance-decennale-la-moins-chere' },
        { name: 'Décennale auto-entrepreneur', slug: 'assurance-decennale-auto-entrepreneur' },
      ]}
    />
  )
}
