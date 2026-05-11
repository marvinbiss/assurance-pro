/**
 * Pilier — "garantie décennale obligatoire pour quels travaux" (250 vol, KD 0)
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'garantie-decennale-obligatoire-pour-quels-travaux'
const TITLE = 'Garantie Décennale — Pour quels travaux est-elle obligatoire ?'
const TAGLINE =
  'Liste exacte des travaux soumis à la décennale (Loi Spinetta) : gros œuvre, second œuvre, équipements techniques, énergétique. Exclusions et zones grises.'

export const metadata: Metadata = {
  title: `${TITLE} | Vivos Assurance`,
  description:
    'Décennale obligatoire pour quels travaux ? Loi Spinetta art. 1792 : structure + clos/couvert + équipements indissociables. Exclusions : mobilier, décoration, équipements dissociables.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="La décennale n'est pas obligatoire pour TOUS les travaux : la Loi Spinetta (art. 1792 Code civil) définit précisément le périmètre des ouvrages concernés. Cette page liste exhaustivement les travaux soumis à décennale et ceux qui en sont exclus, avec les zones grises qui posent question."
      legalReference="art. 1792 et 1792-2 Code civil + art. L. 241-1 C. assur."
      isObligatoire={true}
      benefits={[
        {
          icon: '🏗️',
          title: 'Structure + clos/couvert',
          desc: 'Tout ce qui affecte solidité ou destination de l&apos;ouvrage',
        },
        {
          icon: '🔌',
          title: 'Équipements indissociables',
          desc: 'Chauffage central, plomberie encastrée, électricité fixe',
        },
        {
          icon: '❌',
          title: 'Exclusions claires',
          desc: 'Mobilier, décoration, équipements dissociables sans dommage',
        },
        {
          icon: '⚠️',
          title: 'Zones grises',
          desc: 'Pisciniste, photovoltaïque, paysagiste : à vérifier au cas par cas',
        },
      ]}
      sections={[
        {
          h2: 'Travaux OBLIGATOIREMENT soumis à décennale',
          body: (
            <>
              <p>
                <strong>Gros œuvre</strong> :
              </p>
              <ul>
                <li>Maçonnerie, dalle, fondations</li>
                <li>Charpente bois et métallique</li>
                <li>Terrassement, démolition</li>
              </ul>
              <p>
                <strong>Clos et couvert</strong> :
              </p>
              <ul>
                <li>Couverture (tuiles, ardoise, zinc)</li>
                <li>Étanchéité (toits-terrasses, bardage)</li>
                <li>Façade et ravalement</li>
                <li>Menuiseries extérieures (portes, fenêtres)</li>
              </ul>
              <p>
                <strong>Second œuvre et équipements indissociables</strong> :
              </p>
              <ul>
                <li>Plomberie encastrée (canalisations dans murs/dalle)</li>
                <li>Chauffage central (PAC, chaudière fixe, plancher chauffant)</li>
                <li>Électricité fixe (gainage encastré, tableau, prises murales)</li>
                <li>Isolation thermique (ITE, ITI)</li>
                <li>Carrelage scellé</li>
                <li>Escalier intégré</li>
              </ul>
            </>
          ),
        },
        {
          h2: 'Travaux EXCLUS de la décennale',
          body: (
            <>
              <p>
                <strong>Équipements dissociables sans dommage</strong> (peuvent être retirés sans
                casser l&apos;ouvrage) :
              </p>
              <ul>
                <li>Mobilier intégré (cuisines équipées non-scellées, dressings)</li>
                <li>Climatiseur split mural (vs PAC fixe)</li>
                <li>Radiateurs électriques mobiles</li>
                <li>Volets roulants en applique (vs intégrés)</li>
              </ul>
              <p>
                <strong>Travaux esthétiques</strong> :
              </p>
              <ul>
                <li>Peinture intérieure (relève parfait achèvement)</li>
                <li>Papier peint, revêtements muraux décoratifs</li>
                <li>Sol stratifié non scellé</li>
              </ul>
              <p>
                <strong>Ouvrages non-immobiliers</strong> :
              </p>
              <ul>
                <li>Aménagement intérieur mobilier</li>
                <li>Mobilier urbain non-fixé</li>
                <li>Décoration extérieure (statues, jardinières non-scellées)</li>
              </ul>
            </>
          ),
        },
        {
          h2: 'Zones grises à vérifier',
          body: (
            <ul>
              <li>
                <strong>Piscine</strong> : enterrée = décennale ; hors-sol = exclusion généralement
              </li>
              <li>
                <strong>Panneaux photovoltaïques en toiture</strong> : décennale OUI si intégrés
                bâti, NON si en surimposition
              </li>
              <li>
                <strong>Paysagisme ouvrages durs</strong> : murs soutènement = décennale ;
                plantations seules = non
              </li>
              <li>
                <strong>Véranda</strong> : décennale OUI (ouvrage attaché au bâti)
              </li>
              <li>
                <strong>Insert / poêle bois</strong> : décennale OUI si fixé au conduit principal
              </li>
              <li>
                <strong>Pergola fixée</strong> : décennale OUI ; pergola mobile = non
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Un peintre doit-il avoir une décennale ?',
          a: 'OUI pour les travaux de peinture extérieure (façade — relève clos/couvert). NON obligatoire pour peinture intérieure seule (relève parfait achèvement 1 an). En pratique, la plupart des peintres prennent décennale + RC Pro pour couvrir tous les cas.',
        },
        {
          q: 'La décennale couvre-t-elle une cuisine équipée ?',
          a: 'NON pour mobilier non-scellé. OUI si éléments encastrés indissociables (plomberie fixe, électricité encastrée, plan de travail scellé au bâti).',
        },
        {
          q: 'Et pour un installateur de panneaux photovoltaïques ?',
          a: 'OUI obligatoire si intégrés au bâti (IAB). NON obligatoire si surimposition (mais RC Pro fortement recommandée). Qualification RGE Qualibat ou Qualit&apos;EnR indispensable pour les aides financières.',
        },
        {
          q: 'Que faire en cas de doute sur l&apos;obligation décennale ?',
          a: 'Demander un avis juridique (notaire, avocat assurance, courtier ORIAS). En cas d&apos;ambiguïté, mieux vaut souscrire la décennale (sur-couverture) que risquer une responsabilité personnelle illimitée.',
        },
      ]}
      relatedMetiers={[
        { name: 'Assurance décennale (vue globale)', slug: 'assurance-decennale' },
        { name: 'Décennale obligatoire (sanctions)', slug: 'assurance-decennale-obligatoire' },
        { name: 'Travaux sans décennale', slug: 'travaux-sans-garantie-decennale' },
        { name: 'Décennale BTP', slug: 'assurance-decennale-btp' },
        { name: 'Guide attestation décennale', slug: 'guides/attestation-decennale' },
      ]}
    />
  )
}
