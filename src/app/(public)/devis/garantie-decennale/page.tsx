/**
 * Devis — "devis garantie décennale" (40 vol, KD 37, CPC 600€) MONEY
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'devis/garantie-decennale'
const TITLE = 'Devis Garantie Décennale — Comparatif 5 assureurs BTP, 24h'
const TAGLINE =
  'Devis garantie décennale GRATUIT en 5 min. April Pro best price AE 950€/an. Comparatif SMABTP, Allianz, MMA, AXA. Attestation Loi Spinetta 24h.'

export const metadata: Metadata = {
  title: `${TITLE} | Vivos Assurance`,
  description:
    'Devis garantie décennale gratuit. April Pro 950€/an peintre, 1 400€/an plombier. SMABTP, Allianz, MMA, AXA comparés. Attestation conforme 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Devis garantie décennale gratuit en 5 minutes. Notre courtier ORIAS partenaire compare 5 assureurs spécialisés BTP (April Pro, SMABTP, Allianz Pro, MMA Pro BTP, AXA Pro BTP) pour vous trouver le meilleur tarif conforme Loi Spinetta (art. 1792 Code civil). Attestation conforme téléchargeable sous 24h ouvrées chez April Pro (le plus rapide)."
      legalReference="Loi Spinetta + art. 1792 Code civil + art. L. 241-1 C. assur."
      isObligatoire={true}
      benefits={[
        {
          icon: '⚖️',
          title: 'Conforme Loi Spinetta',
          desc: 'Attestation présentable au maître d&apos;ouvrage',
        },
        {
          icon: '💰',
          title: 'April Pro best price',
          desc: 'AE peintre 950€/an, plombier 1 400€/an, maçon 1 800€/an',
        },
        {
          icon: '⚡',
          title: 'Devis 5 min, attestation 24h',
          desc: 'April Pro = le plus rapide marché',
        },
        {
          icon: '🔍',
          title: '5 assureurs BTP comparés',
          desc: 'April Pro, SMABTP, Allianz Pro, MMA Pro BTP, AXA Pro BTP',
        },
      ]}
      sections={[
        {
          h2: 'Pour qui ce devis garantie décennale',
          body: (
            <ul>
              <li>
                <strong>Auto-entrepreneurs BTP</strong> : peintre, plombier, électricien, maçon,
                couvreur, etc.
              </li>
              <li>
                <strong>SARL / EURL BTP</strong> 1-15 salariés
              </li>
              <li>
                <strong>SAS BTP PME</strong> 15-50 salariés
              </li>
              <li>
                <strong>Architectes DPLG / maîtres d&apos;œuvre</strong> (décennale conception)
              </li>
              <li>
                <strong>BET techniques</strong>
              </li>
              <li>
                <strong>Constructeurs maisons individuelles (CMI)</strong>
              </li>
              <li>
                <strong>Promoteurs immobiliers</strong>
              </li>
              <li>
                <strong>Sous-traitants BTP</strong>
              </li>
              <li>
                <strong>Foreurs géothermie / spécialistes RGE</strong>
              </li>
            </ul>
          ),
        },
        {
          h2: 'Tarifs garantie décennale 2026 (April Pro best price)',
          body: (
            <ul>
              <li>
                <strong>Peintre AE</strong> : 950-1 400€/an
              </li>
              <li>
                <strong>Plâtrier / carreleur AE</strong> : 1 100-1 700€/an
              </li>
              <li>
                <strong>Plombier / électricien AE</strong> : 1 400-2 200€/an
              </li>
              <li>
                <strong>Maçon AE</strong> : 1 800-2 800€/an
              </li>
              <li>
                <strong>Couvreur / charpentier AE</strong> : 2 200-3 800€/an
              </li>
              <li>
                <strong>Terrassier / TP AE</strong> : 2 800-4 500€/an
              </li>
              <li>
                <strong>Multi-services BTP AE</strong> : 2 200-3 500€/an
              </li>
              <li>
                <strong>SARL plomberie 3 salariés</strong> : 2 200-3 500€/an
              </li>
              <li>
                <strong>SAS BTP gros œuvre 30 salariés</strong> : 12 000-30 000€/an+
              </li>
              <li>
                <strong>Architecte DPLG libéral</strong> : 2 500-5 000€/an
              </li>
            </ul>
          ),
        },
        {
          h2: 'Démarche devis garantie décennale',
          body: (
            <ol>
              <li>
                Remplir formulaire (5 min) : métier(s) BTP, statut juridique, CA prévisionnel,
                qualifications
              </li>
              <li>Courtier ORIAS compare 5 assureurs spé BTP en temps réel</li>
              <li>Email devis comparatif sous 30 min ouvrées</li>
              <li>Comparer offres : tarif + plafond + franchise + exclusions clés</li>
              <li>Choisir l&apos;offre adaptée</li>
              <li>
                Souscription en ligne avec upload pièces (SIRET, ACOSS/Kbis, CNI, RIB, justificatifs
                activité)
              </li>
              <li>Attestation conforme téléchargeable sous 24h chez April Pro</li>
              <li>Présentation attestation au maître d&apos;ouvrage AVANT démarrage chantier</li>
            </ol>
          ),
        },
      ]}
      faq={[
        {
          q: 'Garantie décennale obligatoire pour qui ?',
          a: 'TOUS les constructeurs BTP (Loi Spinetta art. 1792-1) : artisans BTP (52 métiers), entreprises BTP, architectes, MOE, BET, CMI, promoteurs, sous-traitants. Aucune exception au statut juridique (AE, SARL, SAS également concernés).',
        },
        {
          q: 'Décennale la moins chère pour un peintre AE ?',
          a: 'April Pro BTP à 950€/an (plafond 1M€, postériorité 10 ans). Best price marché vérifié 2026. En-dessous = SUSPECT (assureur non-agréé ACPR ou exclusions étendues).',
        },
        {
          q: 'Délai attestation décennale après souscription ?',
          a: 'April Pro : 24h ouvrées (le plus rapide). Allianz Pro / MMA Pro BTP : 48h. SMABTP / AXA Pro BTP : 48-72h. Délai dépend de la complexité dossier et heure de souscription.',
        },
        {
          q: 'Garantie décennale en ligne possible ?',
          a: 'OUI chez April Pro BTP (100% en ligne avec upload pièces). SMABTP, Allianz Pro et MMA Pro BTP proposent souscription mixte (en ligne + validation conseiller). AXA Pro BTP requiert souvent passage agence pour finalisation.',
        },
      ]}
      relatedMetiers={[
        { name: 'Devis assurance décennale', slug: 'devis/assurance-decennale' },
        { name: 'Devis décennale AE', slug: 'devis/assurance-decennale-auto-entrepreneur' },
        { name: 'Assurance décennale (vue globale)', slug: 'assurance-decennale' },
        { name: 'Décennale BTP', slug: 'assurance-decennale-btp' },
        { name: 'Décennale immédiate', slug: 'assurance-decennale-immediate' },
      ]}
    />
  )
}
