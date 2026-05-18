/**
 * Pilier — "assurance décennale bâtiment" (60 vol, KD 0, CPC 600€) MONEY
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { COMPARATIF_BTP, EXPERT_BTP, STATS_DEFAULT } from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'assurance-decennale-batiment'
const TITLE = 'Assurance Décennale Bâtiment — 52 métiers couverts, Loi Spinetta'
const TAGLINE =
  'La décennale bâtiment couvre tous les corps d&apos;état BTP : gros œuvre, second œuvre, finitions, équipements techniques. 52 métiers, tarifs 950-15 000€ par an.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Décennale bâtiment : 52 métiers BTP couverts (Loi Spinetta). Gros œuvre, second œuvre, finitions. Tarif AE 950€ par an (peintre) à 4 500€ par an (couvreur). Comparatif assureurs.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance décennale bâtiment couvre l'ensemble des 52 métiers BTP intervenant sur la construction, rénovation ou transformation d'un ouvrage immobilier. Elle est obligatoire (Loi Spinetta) pour tout constructeur — gros œuvre (maçon, charpentier), second œuvre (plombier, électricien), finitions (peintre, carreleur), équipements techniques (PAC, photovoltaïque). Cette page propose une vue exhaustive des métiers couverts, des tarifs et des spécificités par corps d'état."
      legalReference="Loi Spinetta + art. 1792 Code civil + art. L. 241-1 C. assur."
      isObligatoire={true}
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="decennale"
      expertBio={EXPERT_BTP}
      comparatifRows={COMPARATIF_BTP}
      benefits={[
        {
          icon: '🏗️',
          title: '52 métiers BTP couverts',
          desc: 'Tous les corps d&apos;état du gros œuvre aux finitions',
        },
        {
          icon: '⚖️',
          title: 'Loi Spinetta',
          desc: 'Obligation pour tout constructeur — aucune exception',
        },
        {
          icon: '💰',
          title: '950-15 000€ par an',
          desc: 'Peintre AE 950€ • Maçon SARL 3 500€ • Multi-services SAS 12 000€+',
        },
        {
          icon: '⏱️',
          title: '10 ans à réception',
          desc: 'Durée de garantie depuis le PV de réception',
        },
      ]}
      sections={[
        {
          h2: 'Les 9 catégories de métiers bâtiment',
          body: (
            <ul>
              <li>
                <strong>Gros œuvre (6 métiers)</strong> : Maçon, terrassier, charpentier bois,
                charpentier métallique, démolisseur, foreur géothermie
              </li>
              <li>
                <strong>Couverture ou étanchéité (4)</strong> : Couvreur-zingueur, étancheur,
                bardeur, façadier ITE
              </li>
              <li>
                <strong>Plomberie ou CVC (5)</strong> : Plombier, chauffagiste,
                plombier-chauffagiste, climaticien, sanitaire
              </li>
              <li>
                <strong>Électricité (4)</strong> : Électricien, domoticien, alarme, fibre ou réseau
              </li>
              <li>
                <strong>Menuiserie (5)</strong> : Menuisier int ou ext, agenceur, escaliéreur,
                parqueteur
              </li>
              <li>
                <strong>Finitions (6)</strong> : Peintre, plaquiste, carreleur, solier, vitrier,
                serrurier
              </li>
              <li>
                <strong>Spécialités (9)</strong> : Pisciniste, paysagiste, élagueur, désamianteur,
                ascensoriste, cheminée, véranda
              </li>
              <li>
                <strong>Conception ou MOE (6)</strong> : Architecte int ou DPLG, MOE, BET,
                économiste, géomètre
              </li>
              <li>
                <strong>RGE ou Énergie (5)</strong> : Photovoltaïque, PAC, poêle bois, isolation ITE
                ou ITI, multi-services
              </li>
            </ul>
          ),
        },
        {
          h2: 'Tarifs décennale bâtiment par corps d&apos;état (AE 2026)',
          body: (
            <ul>
              <li>
                <strong>Métiers finitions</strong> (peintre, plaquiste, sol) : 950-1 500€ par an
              </li>
              <li>
                <strong>Menuiserie</strong> : 1 200-1 800€ par an
              </li>
              <li>
                <strong>Carreleur, vitrier</strong> : 1 200-1 800€ par an
              </li>
              <li>
                <strong>Électricien</strong> : 1 500-2 200€ par an
              </li>
              <li>
                <strong>Plombier, chauffagiste</strong> : 1 400-2 500€ par an
              </li>
              <li>
                <strong>Maçon traditionnel</strong> : 1 800-2 800€ par an
              </li>
              <li>
                <strong>Maçon béton armé</strong> : 2 200-3 200€ par an
              </li>
              <li>
                <strong>Couvreur, charpentier</strong> : 2 200-4 500€ par an (sinistralité top)
              </li>
              <li>
                <strong>Étancheur, bardeur</strong> : 2 500-4 500€ par an
              </li>
              <li>
                <strong>Terrassier, TP</strong> : 2 800-4 500€ par an (risque maximum)
              </li>
              <li>
                <strong>Maître d&apos;œuvre, architecte</strong> : 1 800-4 500€ par an
                (responsabilité globale)
              </li>
              <li>
                <strong>Multi-services BTP</strong> : 2 500-4 000€ par an (cumul risques)
              </li>
            </ul>
          ),
        },
        {
          h2: 'Tarifs SARL ou SAS bâtiment',
          body: (
            <ul>
              <li>
                <strong>SARL finitions (1-5 salariés)</strong> : 2 000-3 500€ par an
              </li>
              <li>
                <strong>SARL menuiserie ou électricité (1-5 salariés)</strong> : 2 500-4 000€ par an
              </li>
              <li>
                <strong>SARL plomberie (3-10 salariés)</strong> : 2 800-5 500€ par an
              </li>
              <li>
                <strong>SARL maçonnerie (1-5 salariés)</strong> : 2 500-5 000€ par an
              </li>
              <li>
                <strong>SARL couverture (1-5 salariés)</strong> : 3 500-7 500€ par an
              </li>
              <li>
                <strong>SAS PME multi-corps (5-15 salariés)</strong> : 5 500-12 000€ par an
              </li>
              <li>
                <strong>SAS grosse PME BTP (15-50 salariés)</strong> : 12 000-30 000€ par an
              </li>
              <li>
                <strong>Promoteur immobilier — CMI</strong> : 8 000-50 000€ par an+ (responsabilité
                maître ouvrage)
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Tous les corps d&apos;état BTP sont-ils soumis à décennale ?',
          a: 'OUI tous les 52 métiers BTP intervenant sur la STRUCTURE, le CLOS ou COUVERT ou les ÉQUIPEMENTS INDISSOCIABLES sont soumis à décennale (Loi Spinetta). Exceptions : équipements amovibles sans dommage (mobilier non scellé, climatiseur split mural).',
        },
        {
          q: 'Comparatif assureurs décennale bâtiment 2026 ?',
          a: 'April Pro BTP (best price AE ou SARL, en ligne), SMABTP (paritaire BTP historique), Allianz Pro BTP (couverture large), MMA Pro BTP (réseau agences), AXA Pro BTP (premium). Tarifs varient ×1.5-2 entre eux pour même profil. Comparer 5 minimum.',
        },
        {
          q: 'Comment réduire ma prime décennale bâtiment ?',
          a: '1) Comparer 5 assureurs spé BTP (-15-25%). 2) Augmenter franchise à 1 500-2 500€ (-12-18%). 3) Qualifications Qualibat ou RGE selon métier (-5-10%). 4) Pack RC Pro + Décennale + Multirisque BTP (-15-25%). 5) Antériorité 3+ ans sans sinistre (-10-15%).',
        },
        {
          q: 'Décennale bâtiment pour rénovation ?',
          a: 'OUI obligatoire si la rénovation affecte la solidité ou la destination de l&apos;ouvrage (gros œuvre, charpente, étanchéité). NON pour rénovation esthétique pure (peinture intérieure, papier peint). Zone grise = consulter notaire ou avocat assurance.',
        },
      ]}
      relatedMetiers={[
        { name: 'Assurance décennale (vue globale)', slug: 'assurance-decennale' },
        { name: 'Décennale BTP', slug: 'assurance-decennale-btp' },
        { name: 'Décennale maçonnerie', slug: 'assurance-decennale-maconnerie' },
        { name: 'Décennale toiture', slug: 'garantie-decennale-toiture' },
        { name: 'Décennale plomberie', slug: 'assurance-decennale-plombier' },
      ]}
    />
  )
}
