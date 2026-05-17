/**
 * Devis — "devis assurance décennale" (450 vol, KD 7, CPC 900€) MONEY
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'devis / assurance-decennale'
const TITLE = 'Devis Assurance Décennale — Comparatif 5 assureurs BTP, 24h'
const TAGLINE =
  'Devis assurance décennale GRATUIT en 5 min. Comparatif April Pro, SMABTP, Allianz, MMA, AXA. Tous métiers BTP, AE et SARL. Attestation sous 24h.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Devis décennale gratuit. April Pro best price 950€ par an peintre AE, 2 500€ par an maçon SARL. Comparatif 5 assureurs BTP. Attestation Loi Spinetta sous 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Demande de devis décennale GRATUITE et SANS ENGAGEMENT en 5 minutes. Notre courtier ORIAS partenaire compare en temps réel les 5 assureurs spécialisés BTP les plus compétitifs en France (April Pro, SMABTP, Allianz Pro, MMA Pro BTP, AXA Pro BTP) pour vous proposer le meilleur tarif décennale conforme à votre activité, statut juridique et CA. Attestation conforme Loi Spinetta téléchargeable sous 24h ouvrées."
      legalReference="Loi Spinetta + art. 1792 Code civil + art. L. 241-1 C. assur."
      benefits={[
        {
          icon: '🆓',
          title: 'Gratuit et sans engagement',
          desc: 'Devis comparatif réel, vous décidez sans pression',
        },
        {
          icon: '⚡',
          title: 'Devis en 5 minutes',
          desc: 'Formulaire simple, réponse par email sous 30 min ouvrées',
        },
        {
          icon: '🔍',
          title: '5 assureurs BTP comparés',
          desc: 'April Pro, SMABTP, Allianz Pro, MMA Pro BTP, AXA Pro BTP',
        },
        {
          icon: '📋',
          title: 'Attestation 24h',
          desc: 'Conforme Loi Spinetta, présentable maître d&apos;ouvrage',
        },
      ]}
      sections={[
        {
          h2: 'Pourquoi demander un devis comparatif',
          body: (
            <ul>
              <li>
                <strong>Économies réelles -15-25%</strong> : la prime décennale varie ×1.5-2 entre
                April Pro ou SMABTP ou Allianz Pro pour profil équivalent
              </li>
              <li>
                <strong>Garanties harmonisées</strong> : assureurs proposent des couvertures
                différentes (plafonds, exclusions, postériorité)
              </li>
              <li>
                <strong>Conformité vérifiée</strong> : tous les assureurs comparés sont agréés ACPR
                (consultable Refassu)
              </li>
              <li>
                <strong>Conseils personnalisés</strong> : notre courtier ORIAS oriente selon votre
                métier et votre profil
              </li>
              <li>
                <strong>Aucun risque</strong> : devis 100% gratuit, vous choisissez librement
              </li>
            </ul>
          ),
        },
        {
          h2: 'Tarifs décennale par profil 2026',
          body: (
            <ul>
              <li>
                <strong>Auto-entrepreneur peintre</strong> : 950-1 400€ par an (April Pro best)
              </li>
              <li>
                <strong>AE plombier</strong> : 1 400-2 100€ par an
              </li>
              <li>
                <strong>AE maçon</strong> : 1 800-2 800€ par an
              </li>
              <li>
                <strong>AE couvreur</strong> : 2 200-3 500€ par an
              </li>
              <li>
                <strong>SARL plomberie 3 salariés</strong> : 2 200-3 500€ par an
              </li>
              <li>
                <strong>SARL maçonnerie 5 salariés</strong> : 3 500-5 500€ par an
              </li>
              <li>
                <strong>SAS BTP PME 10 salariés</strong> : 5 500-12 000€ par an
              </li>
              <li>
                <strong>SAS gros œuvre 30 salariés</strong> : 12 000-30 000€ par an
              </li>
            </ul>
          ),
        },
        {
          h2: 'Démarche en 6 étapes',
          body: (
            <ol>
              <li>
                Remplir formulaire (5 min) : statut juridique, métier(s) BTP, CA prévisionnel,
                ancienneté
              </li>
              <li>Notre courtier compare 5 assureurs en temps réel</li>
              <li>Recevoir devis détaillé par email sous 30 min ouvrées</li>
              <li>Choisir l&apos;offre adaptée (tarif, plafond, franchise, postériorité)</li>
              <li>Souscription en ligne sécurisée</li>
              <li>Attestation téléchargeable sous 24h ouvrées</li>
            </ol>
          ),
        },
      ]}
      faq={[
        {
          q: 'Combien de temps pour recevoir un devis ?',
          a: 'Email avec devis comparatif sous 30 minutes ouvrées après remplissage formulaire. Réponse immédiate pour devis simple, plus longue pour profils complexes (SAS multi-corps avec sous-traitance étendue).',
        },
        {
          q: 'Le devis est-il vraiment gratuit ?',
          a: 'OUI 100% gratuit et sans engagement. Le courtier ORIAS est rémunéré par l&apos;assureur en cas de souscription (commission standard incluse dans la prime). Pas de surcoût pour vous.',
        },
        {
          q: 'Quelle décennale est la moins chère ?',
          a: 'April Pro BTP est généralement le best price pour AE et SARL BTP (-10-20% vs concurrents). SMABTP et Allianz Pro restent compétitifs sur SAS PME. Notre comparatif vous indique précisément le moins cher pour votre profil.',
        },
        {
          q: 'Peut-on changer d&apos;avis après devis ?',
          a: 'OUI à tout moment. Le devis est sans engagement — vous pouvez le refuser ou négocier. Si vous avez déjà signé : résiliation libre après 1 an d&apos;engagement (loi infra-annuelle 2020), préavis 1 mois.',
        },
      ]}
      relatedMetiers={[
        { name: 'Assurance décennale (vue globale)', slug: 'assurance-decennale' },
        { name: 'Décennale pas chère', slug: 'assurance-decennale-pas-cher' },
        { name: 'Décennale BTP', slug: 'assurance-decennale-btp' },
        { name: 'Décennale immédiate', slug: 'assurance-decennale-immediate' },
        { name: 'Devis décennale AE', slug: 'devis/assurance-decennale-auto-entrepreneur' },
      ]}
    />
  )
}
