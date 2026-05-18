/**
 * Pilier — "pro btp assurance décennale" (150 vol, KD 3, CPC 500€) MONEY
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { COMPARATIF_BTP, EXPERT_BTP, STATS_DEFAULT } from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'pro-btp-assurance-decennale'
const TITLE = 'PRO BTP Assurance Décennale — SMABTP, IRP Auto, alternatives'
const TAGLINE =
  'PRO BTP ne fait pas de décennale directement (institution paritaire santé). Le décennale BTP passe par SMABTP, IRP Auto BTP, ou April Pro BTP. Comparatif détaillé.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Décennale BTP via PRO BTP : SMABTP (institution paritaire), IRP Auto, April Pro. PRO BTP ne fait pas directement décennale. Comparatif tarifs et garanties 2026.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Contrairement à une idée reçue, PRO BTP (institution paritaire) ne propose PAS directement d'assurance décennale BTP. PRO BTP est spécialisée en mutuelle santé et retraite complémentaire pour le BTP. Pour la décennale, les artisans BTP doivent passer par : SMABTP (institution paritaire dédiée à l'assurance BTP), IRP Auto BTP (mutualiste BTP), April Pro BTP (privé), ou les grands assureurs (Allianz Pro BTP, MMA Pro BTP, AXA Pro BTP). Cette page clarifie qui fait quoi dans la galaxie PRO BTP."
      legalReference="Loi Spinetta + art. 1792 Code civil + art. L. 241-1 C. assur."
      isObligatoire={true}
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="decennale"
      expertBio={EXPERT_BTP}
      comparatifRows={COMPARATIF_BTP}
      benefits={[
        {
          icon: '🏗️',
          title: 'SMABTP',
          desc: 'Institution paritaire dédiée à l&apos;assurance BTP (1859) — leader décennale historique',
        },
        {
          icon: '🤝',
          title: 'IRP Auto BTP',
          desc: 'Mutualiste BTP, propose décennale + multirisque + auto',
        },
        {
          icon: '⚡',
          title: 'April Pro BTP',
          desc: 'Privé, best price AE — SARL, souscription en ligne possible',
        },
        {
          icon: '❌',
          title: 'PRO BTP ≠ décennale',
          desc: 'PRO BTP fait santé + retraite, pas décennale directement',
        },
      ]}
      sections={[
        {
          h2: 'Distinction PRO BTP vs SMABTP vs IRP Auto',
          body: (
            <ul>
              <li>
                <strong>PRO BTP</strong> : institution paritaire (1944), spécialisée{' '}
                <strong>mutuelle santé + retraite complémentaire BTP</strong>. NE FAIT PAS de
                décennale directement.
              </li>
              <li>
                <strong>SMABTP</strong> (Société Mutuelle d&apos;Assurance du Bâtiment et des
                Travaux Publics) : institution paritaire dédiée à l&apos;
                <strong>assurance BTP</strong> (1859). Leader historique décennale + RC Pro BTP +
                multirisque BTP + flotte.
              </li>
              <li>
                <strong>IRP Auto BTP</strong> : mutualiste secteur BTP, propose{' '}
                <strong>décennale + multirisque + auto + protection juridique</strong>.
              </li>
              <li>
                <strong>April Pro BTP</strong> : assureur privé (groupe APRIL), propose décennale
                BTP en ligne avec tarifs compétitifs.
              </li>
              <li>
                Les artisans peuvent souvent <strong>combiner</strong> : santé PRO BTP + décennale
                SMABTP + auto IRP Auto. Pas de remise paquet entre ces 3 entités juridiquement
                distinctes.
              </li>
            </ul>
          ),
        },
        {
          h2: 'Décennale via SMABTP',
          body: (
            <>
              <p>
                SMABTP est l&apos;assureur paritaire historique du BTP (170+ ans). Caractéristiques
                :
              </p>
              <ul>
                <li>
                  <strong>Spécialisation BTP exclusive</strong> : pas de produits hors BTP,
                  expertise maximale secteur
                </li>
                <li>
                  <strong>Tous métiers BTP couverts</strong> : 52 métiers Qualibat, gros œuvre à
                  finitions
                </li>
                <li>
                  <strong>Tarifs équilibrés</strong> : pas le moins cher (April Pro souvent
                  -10-20%), pas le plus cher (AXA Pro +15-25%)
                </li>
                <li>
                  <strong>Gestion sinistres reconnue</strong> : équipe BTP-spécialiste, expertise
                  terrain forte
                </li>
                <li>
                  <strong>Pack BTP global</strong> : décennale + RC Pro + multirisque + flotte =
                  remise -15-20%
                </li>
                <li>
                  <strong>Solidité financière A</strong> (mutualiste à but non lucratif)
                </li>
              </ul>
              <p>
                Tarif typique : AE peintre 950-1 400€ par an, SARL plombier 2 000-3 500€ par an, SAS
                BTP PME 4 500-12 000€ par an.
              </p>
            </>
          ),
        },
        {
          h2: 'Décennale via April Pro BTP',
          body: (
            <>
              <p>
                April Pro BTP est l&apos;assureur privé spécialisé BTP du groupe APRIL (coté en
                bourse). Caractéristiques :
              </p>
              <ul>
                <li>
                  <strong>Best price BTP AE</strong> : 950-1 200€ par an pour peintre, 1 400-1 800€
                  par an pour plombier
                </li>
                <li>
                  <strong>Souscription 100% en ligne</strong> : attestation rapide (24-48h)
                </li>
                <li>
                  <strong>Couverture standard BTP</strong> : 52 métiers Qualibat couverts
                </li>
                <li>
                  <strong>Plafond 1-2M€ standard</strong> AE ou SARL, 3-5M€ SAS PME
                </li>
                <li>
                  <strong>Pack BTP</strong> : décennale + RC Pro + auto pro = -15-25%
                </li>
                <li>
                  <strong>Solidité financière A</strong> (groupe APRIL coté)
                </li>
              </ul>
              <p>Idéal pour artisans BTP démarrant ou cherchant souscription rapide en ligne.</p>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'PRO BTP propose-t-il vraiment une décennale ?',
          a: 'NON, PRO BTP est spécialisée mutuelle santé et retraite complémentaire pour le BTP. PRO BTP ne fait pas de décennale directement. Pour la décennale BTP : SMABTP, IRP Auto BTP, April Pro BTP, Allianz Pro BTP, MMA Pro BTP, AXA Pro BTP.',
        },
        {
          q: 'Quelle différence entre SMABTP et PRO BTP ?',
          a: "SMABTP = institution paritaire pour l'ASSURANCE BTP (décennale, RC Pro, multirisque, flotte). PRO BTP = institution paritaire pour la PROTECTION SOCIALE BTP (mutuelle santé, retraite, prévoyance, vacances). Deux entités juridiques distinctes mais BTP toutes les deux.",
        },
        {
          q: 'SMABTP ou April Pro BTP pour ma décennale ?',
          a: 'April Pro BTP = best price AE ou SARL (souvent -10-20% vs SMABTP). SMABTP = expertise BTP maximale + gestion sinistres reconnue. Notre courtier ORIAS compare les 2 + Allianz Pro BTP + MMA Pro BTP + AXA Pro BTP.',
        },
        {
          q: 'Peut-on cumuler PRO BTP santé + SMABTP décennale ?',
          a: 'OUI, les 2 entités sont juridiquement distinctes. Pas de remise paquet entre PRO BTP (santé) et SMABTP (décennale) car contrats séparés. Mais combinaison logique pour un artisan BTP : santé via PRO BTP + assurance BTP via SMABTP.',
        },
      ]}
      relatedMetiers={[
        { name: 'PRO BTP Mutuelle (vue globale santé)', slug: 'pro-btp-mutuelle' },
        { name: 'Assurance décennale (vue globale)', slug: 'assurance-decennale' },
        { name: 'Décennale BTP', slug: 'assurance-decennale-btp' },
        { name: 'Assurance pro BTP (pack complet)', slug: 'assurance-pro-btp' },
        { name: 'Décennale BTP comparatif', slug: 'assurance-decennale-pas-cher' },
      ]}
    />
  )
}
