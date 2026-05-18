/**
 * Courtier — "courtier en assurance décennale" (70 vol, KD 5, CPC 700€)
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'courtier / en-assurance-decennale'
const TITLE = 'Courtier En Assurance Décennale — Sélection rigoureuse 2026'
const TAGLINE =
  'Guide pour choisir son courtier en assurance décennale : 8 critères de sélection + 4 pièges à éviter + recommandations spécialistes ORIAS BTP 2026.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Choisir courtier en assurance décennale : 8 critères sélection (ORIAS, RC Pro, partenariats, références BTP), 4 pièges à éviter, recommandations 2026.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Choisir le bon courtier en assurance décennale est CRITIQUE pour les pros BTP : un courtier expert peut faire économiser 20-40% sur les primes, négocier des plafonds adaptés et accompagner en cas de sinistre majeur. Un mauvais courtier peut au contraire vous orienter vers un contrat sous-dimensionné, des exclusions cachées ou des assureurs fragiles. Cette page détaille les 8 critères de sélection rigoureuse et les 4 pièges à éviter."
      legalReference="ORIAS R-541-1 C. assur. + DDA 2018/97/UE + Loi Hoguet pour mandats"
      benefits={[
        {
          icon: '🔍',
          title: '8 critères sélection',
          desc: 'ORIAS, RC Pro courtier, partenariats, références BTP',
        },
        {
          icon: '⚠️',
          title: '4 pièges à éviter',
          desc: 'Courtier mono-assureur, commissions opaques, pas spé BTP',
        },
        {
          icon: '🏆',
          title: 'Spécialistes recommandés',
          desc: 'Top courtiers ORIAS spé BTP 2026 vérifiés',
        },
        {
          icon: '📋',
          title: 'Process due diligence',
          desc: 'Méthodologie complète 5 étapes avant signer mandat',
        },
      ]}
      sections={[
        {
          h2: '8 critères pour choisir son courtier décennale',
          body: (
            <ol>
              <li>
                <strong>Numéro ORIAS valide</strong> : vérifier sur orias.fr (obligatoire R-541-1 C.
                assur.)
              </li>
              <li>
                <strong>RC Pro courtier en cours</strong> : attestation valide (protection contre
                fautes courtier)
              </li>
              <li>
                <strong>Carte Loi Hoguet</strong> : si gestion mandats (immobilier connexe)
              </li>
              <li>
                <strong>Partenariats multi-assureurs</strong> : minimum 5 partenaires BTP (April
                Pro, SMABTP, Allianz Pro BTP, MMA, AXA, Generali Pro)
              </li>
              <li>
                <strong>Spécialisation BTP</strong> : références constructeurs + maîtres
                d&apos;ouvrage
              </li>
              <li>
                <strong>Expertise sinistres BTP</strong> : équipe dédiée gestion sinistres BTP (pas
                généralistes)
              </li>
              <li>
                <strong>Transparence commissions</strong> : barème commissions affiché (obligation
                légale 2023)
              </li>
              <li>
                <strong>Avis vérifiés</strong> : Trustpilot ou Google &gt; 4,0 sur 5 sur 50+ avis
                BTP
              </li>
            </ol>
          ),
        },
        {
          h2: '4 pièges des courtiers à éviter',
          body: (
            <ol>
              <li>
                <strong>Courtier mono-assureur déguisé</strong> : prétend courtier mais en réalité
                agent général (UN seul assureur). Vérifier liste partenaires (mini 5 = vrai
                courtier).
              </li>
              <li>
                <strong>Commissions opaques</strong> : courtier qui refuse de communiquer barème
                commissions → fuir (obligation légale).
              </li>
              <li>
                <strong>Pas de spé BTP</strong> : courtier généraliste (auto + habitation + santé +
                pro) → manque expertise nuances décennale. Préférer spécialiste BTP exclusif.
              </li>
              <li>
                <strong>Absence accompagnement sinistre</strong> : courtier qui vend puis disparaît.
                Vérifier équipe sinistres avant signer.
              </li>
            </ol>
          ),
        },
        {
          h2: 'Process due diligence 5 étapes',
          body: (
            <ol>
              <li>
                <strong>Étape 1 — Recherche</strong> : Google &quot;courtier décennale BTP +
                ville&quot;, Trustpilot, recommandations confrères
              </li>
              <li>
                <strong>Étape 2 — Vérification ORIAS</strong> : orias.fr (numéro + activité courtier
                en assurance)
              </li>
              <li>
                <strong>Étape 3 — Demande devis comparatif</strong> : 3-5 courtiers en parallèle
                (gratuit)
              </li>
              <li>
                <strong>Étape 4 — Analyse offres</strong> :
                <ul>
                  <li>Nombre assureurs proposés (mini 3, idéal 5)</li>
                  <li>Tarifs proposés vs marché</li>
                  <li>Plafonds adaptés à votre activité</li>
                  <li>Exclusions clairement listées</li>
                  <li>Postériorité (mini 10 ans légale)</li>
                </ul>
              </li>
              <li>
                <strong>Étape 5 — Choix + signature mandat</strong> : choisir courtier avec
                meilleure combinaison transparence + tarifs + accompagnement
              </li>
            </ol>
          ),
        },
      ]}
      faq={[
        {
          q: 'Combien coûte un courtier décennale ?',
          a: 'GRATUIT pour vous : commissions payées par assureur (5-15% prime selon contrat). Inclus dans tarif final. Économies courtier négocie largement compensent commission. Net pour vous : -20-40% vs souscription directe.',
        },
        {
          q: 'Délai pour obtenir attestation via courtier ?',
          a: 'Devis comparatif : 24-72h ouvrées (analyse multi-assureurs). Souscription après choix : 24h ouvrées en moyenne. Attestation provisoire immédiate + définitive 48-72h après vérification dossier complet (10 ans expérience BTP).',
        },
        {
          q: 'Changer de courtier en cours de contrat ?',
          a: 'POSSIBLE mais complexe : nécessite résiliation mandat + nouveau mandat. Conseillons attendre échéance annuelle pour transition fluide. Loi Hamon ne s&apos;applique pas au mandat courtier (uniquement contrat assurance lui-même).',
        },
      ]}
      relatedMetiers={[
        {
          name: 'Courtier assurance décennale (vue globale)',
          slug: 'courtier/assurance-decennale',
        },
        { name: 'Assurance décennale (vue globale)', slug: 'assurance-decennale' },
        { name: 'Comparateur assurance décennale', slug: 'comparateur/assurance-decennale' },
        { name: 'April Pro BTP', slug: 'april-pro-btp' },
        { name: 'SMABTP', slug: 'smabtp' },
      ]}
    />
  )
}
