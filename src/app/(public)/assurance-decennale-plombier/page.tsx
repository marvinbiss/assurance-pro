/**
 * Pilier — "assurance décennale plombier" (150 vol, KD 3, CPC 500€) MONEY
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { COMPARATIF_BTP, EXPERT_BTP, STATS_DEFAULT } from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'assurance-decennale-plombier'
const TITLE = 'Assurance Décennale Plombier — Obligation, tarifs, comparatif 2026'
const TAGLINE =
  'Le plombier est soumis à la décennale (Loi Spinetta). Tarif AE 1 400-2 100€/an, SARL 1 800-3 500€/an. Sinistralité 18% AQC. Comparatif April Pro, SMABTP.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Assurance décennale plombier : obligation Loi Spinetta. AE 1 400-2 100€/an, plombier-chauffagiste 1 600-2 500€/an, SARL 1 800-3 500€/an. April Pro / SMABTP / Allianz.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Le plombier — qu'il soit auto-entrepreneur, gérant de SARL ou en SAS BTP — est obligatoirement soumis à la décennale (Loi Spinetta + art. 1792 Code civil). La plomberie représente 18% des sinistres décennaux BTP (2e poste après couverture 24%), avec des sinistres typiques fréquents : fuites canalisations encastrées, défauts d'étanchéité douche, plomberie chauffage central défaillante. Cette page détaille spécifiquement les obligations, tarifs et risques propres au métier de plombier."
      legalReference="Loi Spinetta + art. 1792 Code civil + art. L. 241-1 C. assur."
      isObligatoire={true}
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="decennale"
      expertBio={EXPERT_BTP}
      comparatifRows={COMPARATIF_BTP}
      benefits={[
        {
          icon: '🔧',
          title: 'Plombier obligatoire',
          desc: 'Loi Spinetta — toute installation encastrée ou chauffage central',
        },
        {
          icon: '💧',
          title: '18% sinistralité (AQC)',
          desc: '2e poste BTP après couverture (24%), avant façades (14%)',
        },
        {
          icon: '💰',
          title: '1 400-3 500€/an',
          desc: 'AE 1 400-2 100€ • Plombier-chauffagiste AE 1 600-2 500€ • SARL 1 800-3 500€',
        },
        {
          icon: '🛡️',
          title: 'Plafond 1-2M€ standard',
          desc: 'Recommandé 2M€ pour SARL avec chantiers importants',
        },
      ]}
      sections={[
        {
          h2: 'Sinistres plomberie décennaux fréquents',
          body: (
            <ul>
              <li>
                <strong>Fuite canalisation encastrée</strong> : raccord mal soudé ou joint
                défectueux dans mur/dalle. Sinistre N+1 à N+5 (eau infiltre lentement).
                Indemnisation moy. 5-15k€.
              </li>
              <li>
                <strong>Infiltration douche italienne</strong> : défaut étanchéité receveur ou
                évacuation, dégâts dalle + étage inférieur. 10-30k€.
              </li>
              <li>
                <strong>Défaut chauffage central</strong> : circuit défaillant, ne chauffe pas en
                hiver → logement inhabitable. Indemnisation = remplacement circuit 8-25k€.
              </li>
              <li>
                <strong>PAC mal dimensionnée</strong> : ne chauffe pas le volume prévu, COP
                insuffisant. Remplacement 10-20k€.
              </li>
              <li>
                <strong>Refoulement égouts</strong> : pente d&apos;évacuation incorrecte → remontées
                eaux usées. Remise en état 5-20k€.
              </li>
              <li>
                <strong>Plancher chauffant défaillant</strong> : circuit cassé, fuite généralisée.
                Refaire complètement 30-100k€.
              </li>
              <li>
                <strong>Légionellose</strong> (rare mais grave) : circuit eau chaude mal conçu,
                contamination Legionella → fermeture ERP + indemnités victimes 50-500k€.
              </li>
            </ul>
          ),
        },
        {
          h2: 'Spécificités plomberie BTP',
          body: (
            <ul>
              <li>
                <strong>Plombier vs plombier-chauffagiste</strong> : plombier-chauffagiste fait à la
                fois plomberie (canalisations) et chauffage (chaudière + radiateurs). Prime +15-25%
                car risques cumulés.
              </li>
              <li>
                <strong>RGE Qualibat</strong> : pour PAC + chaudière biomasse, qualification RGE
                obligatoire pour bénéficier d&apos;aides MaPrimeRénov&apos;. Donne aussi -5-10% sur
                prime décennale.
              </li>
              <li>
                <strong>Sous-traitance fréquente</strong> : plomberie/chauffage souvent
                sous-traitée. Vérifier que sous-traitant déclaré et assuré pour ne pas tomber en
                responsabilité non-couverte.
              </li>
              <li>
                <strong>Travaux outre-mer</strong> : exclus généralement, à valider au contrat.
              </li>
              <li>
                <strong>ERP (Établissements Recevant du Public)</strong> : risque légionellose
                élevé, prime majorée +30-50% pour chantiers ERP.
              </li>
            </ul>
          ),
        },
        {
          h2: 'Comparatif assureurs plombier 2026',
          body: (
            <ul>
              <li>
                <strong>April Pro BTP</strong> : best price AE plombier 1 400-1 900€/an.
                Souscription en ligne, attestation 24-48h.
              </li>
              <li>
                <strong>SMABTP</strong> : institution paritaire BTP, prime équilibrée 1 600-2
                100€/an. Expertise sinistres reconnue.
              </li>
              <li>
                <strong>Allianz Pro BTP</strong> : couverture large, prime moyenne 1 700-2 200€/an.
                Pack BTP global.
              </li>
              <li>
                <strong>MMA Pro BTP</strong> : équilibré SARL/SAS, prime 1 800-2 400€/an pour AE.
                Réseau agences 1 500+.
              </li>
              <li>
                <strong>AXA Pro BTP</strong> : couverture premium, prime +15-25% vs April Pro mais
                services étendus.
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Tarif décennale plombier auto-entrepreneur 2026 ?',
          a: 'AE plombier débutant (CA &lt; 50k€) : 1 400-1 800€/an chez April Pro ou Allianz Pro. AE plombier expérimenté (CA 50-100k€) : 1 800-2 100€/an. Plombier-chauffagiste : +15-25% (cumul risques).',
        },
        {
          q: 'La décennale plombier couvre-t-elle la pose PAC ?',
          a: 'Oui si PAC fixée et intégrée au bâti (PAC géothermique, aérothermique encastrée). Pour PAC simples (split mural amovible), c&apos;est la RC Pro qui couvre. Qualification RGE Qualibat ou Qualit&apos;EnR requise.',
        },
        {
          q: 'Mon plombier sous-traite, suis-je couvert ?',
          a: 'OUI si le sous-traitant est DÉCLARÉ à votre assureur ET A LUI-MÊME sa propre décennale (vérifier attestation avant chantier). Sinon : exclusion de couverture, votre responsabilité personnelle engagée en cas de sinistre.',
        },
        {
          q: 'Comment réduire ma prime décennale plombier ?',
          a: '1) Comparer 5 assureurs spé BTP via courtier ORIAS (-15-25%). 2) Augmenter franchise à 1 500-2 000€ (-12-18%). 3) Qualifications RGE/Qualibat (-5-10%). 4) Pack RC Pro + Décennale + Multirisque (-15-25%). Économie cumulée potentielle : 30-50%.',
        },
      ]}
      relatedMetiers={[
        { name: 'Décennale plomberie (variante)', slug: 'garantie-decennale-plomberie' },
        { name: 'Assurance décennale (vue globale)', slug: 'assurance-decennale' },
        { name: 'Décennale BTP', slug: 'assurance-decennale-btp' },
        { name: 'Décennale auto-entrepreneur', slug: 'assurance-decennale-auto-entrepreneur' },
        { name: 'Décennale pas chère', slug: 'assurance-decennale-pas-cher' },
      ]}
    />
  )
}
