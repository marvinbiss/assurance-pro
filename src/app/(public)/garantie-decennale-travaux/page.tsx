/**
 * Pilier — "garantie décennale travaux" (200 vol, KD 1, CPC 6€)
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { COMPARATIF_BTP, EXPERT_BTP, STATS_DEFAULT } from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'garantie-decennale-travaux'
const TITLE = 'Garantie Décennale Travaux — Périmètre légal et exclusions'
const TAGLINE =
  'Quels travaux sont vraiment couverts par la décennale ? Loi Spinetta art. 1792 : structure + clos/couvert + équipements indissociables. Liste exhaustive.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Garantie décennale travaux : périmètre légal Loi Spinetta. Structure (maçonnerie, charpente), clos/couvert (toiture, façade), équipements indissociables. Exclusions claires.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="La garantie décennale s'applique à des travaux précisément définis par la Loi Spinetta (art. 1792 et 1792-2 Code civil) : tout ouvrage immobilier dont la solidité ou la destination peut être affectée pendant 10 ans après réception. Cette page liste exhaustivement les travaux concernés vs ceux exclus, avec les critères de distinction objectifs (test d'indissociabilité, impact sur destination)."
      legalReference="Loi Spinetta + art. 1792, 1792-1 et 1792-2 Code civil"
      isObligatoire={true}
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="decennale"
      expertBio={EXPERT_BTP}
      comparatifRows={COMPARATIF_BTP}
      benefits={[
        {
          icon: '🏗️',
          title: 'Structure couverte',
          desc: 'Maçonnerie, fondations, charpente, dalle, murs porteurs',
        },
        {
          icon: '🏠',
          title: 'Clos et couvert couverts',
          desc: 'Toiture, étanchéité, façade, menuiseries extérieures',
        },
        {
          icon: '🔌',
          title: 'Équipements indissociables',
          desc: 'Chauffage central, plomberie encastrée, électricité fixe',
        },
        {
          icon: '❌',
          title: 'Exclusions claires',
          desc: 'Mobilier non-scellé, décoration, équipements démontables sans dommage',
        },
      ]}
      sections={[
        {
          h2: 'Test légal d&apos;indissociabilité',
          body: (
            <>
              <p>
                Pour déterminer si un travail relève de la décennale, appliquer le test (art. 1792-2
                Code civil) :
              </p>
              <ol>
                <li>
                  <strong>L&apos;équipement peut-il être démonté sans détérioration ?</strong>
                  <ul>
                    <li>
                      OUI → équipement dissociable → exclu décennale (relève parfait achèvement 1
                      an)
                    </li>
                    <li>NON → équipement indissociable → décennale obligatoire</li>
                  </ul>
                </li>
                <li>
                  <strong>Sa défaillance affecte-t-elle la destination de l&apos;ouvrage ?</strong>
                  <ul>
                    <li>
                      OUI (chauffage défaillant rend habitat inutilisable en hiver) → décennale
                    </li>
                    <li>NON (élément décoratif uniquement) → exclu</li>
                  </ul>
                </li>
                <li>
                  <strong>Sa défaillance affecte-t-elle la solidité ?</strong>
                  <ul>
                    <li>OUI (mur porteur, structure) → décennale</li>
                    <li>NON → applique critères 1 et 2</li>
                  </ul>
                </li>
              </ol>
            </>
          ),
        },
        {
          h2: 'Travaux SOUS décennale (liste détaillée)',
          body: (
            <ul>
              <li>
                <strong>Gros œuvre</strong> : maçonnerie, dalle, fondations, démolition,
                terrassement
              </li>
              <li>
                <strong>Charpente</strong> : bois, métal, structure complète
              </li>
              <li>
                <strong>Couverture</strong> : tuiles, ardoise, zinc, fibrociment
              </li>
              <li>
                <strong>Étanchéité</strong> : toits-terrasses, sous-bassements, vide-sanitaires
              </li>
              <li>
                <strong>Façade</strong> : ravalement, ITE, bardage, façades vitrées
              </li>
              <li>
                <strong>Menuiseries extérieures</strong> : portes, fenêtres, baies vitrées
              </li>
              <li>
                <strong>Plomberie encastrée</strong> : canalisations dans murs/dalle
              </li>
              <li>
                <strong>Chauffage central</strong> : chaudière fixe, PAC, plancher chauffant
              </li>
              <li>
                <strong>Électricité fixe</strong> : gainage encastré, tableau, prises murales
              </li>
              <li>
                <strong>Isolation</strong> : ITE, ITI, soufflage combles
              </li>
              <li>
                <strong>Carrelage scellé</strong> sols + murs salle de bain
              </li>
              <li>
                <strong>Escaliers intégrés</strong> structure
              </li>
              <li>
                <strong>Pisicine enterrée</strong>
              </li>
              <li>
                <strong>Photovoltaïque intégré au bâti</strong> (IAB)
              </li>
              <li>
                <strong>Véranda fixée</strong> structure
              </li>
            </ul>
          ),
        },
        {
          h2: 'Travaux EXCLUS de décennale',
          body: (
            <ul>
              <li>
                <strong>Mobilier intégré</strong> non-scellé (cuisines équipées démontables,
                dressings)
              </li>
              <li>
                <strong>Climatiseur split mural</strong> amovible (vs PAC fixe encastrée)
              </li>
              <li>
                <strong>Radiateurs électriques mobiles</strong>
              </li>
              <li>
                <strong>Volets roulants en applique</strong> (vs intégrés bâti)
              </li>
              <li>
                <strong>Peinture intérieure</strong> (relève parfait achèvement 1 an)
              </li>
              <li>
                <strong>Papier peint, revêtements muraux</strong> décoratifs
              </li>
              <li>
                <strong>Sol stratifié non scellé</strong>
              </li>
              <li>
                <strong>Aménagement intérieur mobilier</strong>
              </li>
              <li>
                <strong>Décoration extérieure</strong> (jardinières non-scellées, statues)
              </li>
              <li>
                <strong>Piscine hors-sol</strong>
              </li>
              <li>
                <strong>Pergola mobile</strong> (vs fixée)
              </li>
              <li>
                <strong>Photovoltaïque en surimposition</strong> (vs intégré)
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Une peinture intérieure relève-t-elle de la décennale ?',
          a: 'NON pour peinture pure intérieure (relève garantie de parfait achèvement 1 an + biennale 2 ans pour défauts d&apos;adhérence). OUI pour peinture extérieure si elle affecte l&apos;étanchéité ou la solidité (façade en cours de ravalement).',
        },
        {
          q: 'Et la cuisine équipée ?',
          a: 'Mobilier non-scellé (caissons amovibles, électroménager intégré démontable) : EXCLU décennale. Plomberie/électricité encastrée alimentant la cuisine : COUVERTE décennale. Plan de travail scellé : zone grise selon montage.',
        },
        {
          q: 'Les panneaux photovoltaïques sont-ils couverts ?',
          a: 'OUI si intégrés au bâti (IAB — remplacent la couverture). NON obligatoire si en surimposition (panneaux posés au-dessus toiture existante). Recommandation : qualification RGE Qualibat + extension décennale photovoltaïque spécifique.',
        },
        {
          q: 'Comment savoir si mes travaux sont sous décennale ?',
          a: 'Appliquer le test d&apos;indissociabilité (art. 1792-2). En cas de doute : consulter notaire, avocat assurance, ou courtier ORIAS. Mieux vaut sur-couvrir (décennale) que sous-couvrir (responsabilité personnelle illimitée 10 ans).',
        },
      ]}
      relatedMetiers={[
        { name: 'Assurance décennale (vue globale)', slug: 'assurance-decennale' },
        { name: 'Pour quels travaux ?', slug: 'garantie-decennale-obligatoire-pour-quels-travaux' },
        { name: 'Décennale obligatoire (sanctions)', slug: 'assurance-decennale-obligatoire' },
        { name: 'Décennale BTP', slug: 'assurance-decennale-btp' },
        { name: 'Travaux sans décennale (recours)', slug: 'travaux-sans-garantie-decennale' },
      ]}
    />
  )
}
