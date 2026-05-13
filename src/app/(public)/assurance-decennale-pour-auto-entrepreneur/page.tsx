/**
 * Auto-entrepreneur — "assurance décennale pour auto entrepreneur" (150 vol, KD 2, CPC 500€) MONEY
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'assurance-decennale-pour-auto-entrepreneur'
const TITLE = 'Assurance Décennale Pour Auto Entrepreneur — Démarches simplifiées'
const TAGLINE =
  "Souscrire une décennale en tant qu'auto-entrepreneur BTP : pièces (SIRET + ACOSS), démarches simplifiées, tarifs April Pro best price 950-3 500€/an."

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Décennale pour auto-entrepreneur BTP : démarches en ligne 24h. SIRET + ACOSS + CNI suffisent. April Pro best price 950€/an peintre, 1 400€/an plombier.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Souscrire une décennale POUR un auto-entrepreneur est plus simple qu'une SARL : pas de Kbis requis, pas de bilan, juste un SIRET valide + attestation ACOSS + CNI + RIB. Le délai de souscription en ligne est de 24h ouvrées avec April Pro BTP (le best price AE). Cette page détaille spécifiquement les démarches pour AE, les pièces nécessaires et les tarifs par métier BTP."
      legalReference="Loi Spinetta + art. 1792 Code civil + art. L. 241-1 C. assur."
      isObligatoire={true}
      benefits={[
        {
          icon: '📄',
          title: 'Pièces simplifiées AE',
          desc: 'SIRET + ACOSS + CNI + RIB — pas de Kbis ni bilan',
        },
        {
          icon: '⚡',
          title: 'Souscription 24h',
          desc: 'April Pro BTP : devis en ligne 5 min + attestation sous 24h ouvrées',
        },
        {
          icon: '💰',
          title: '950-3 500€/an selon métier',
          desc: 'Peintre AE 950€ • Plombier 1 400€ • Maçon 1 800€ • Couvreur 2 500€',
        },
        {
          icon: '🛡️',
          title: 'Plafond 1M€ standard',
          desc: 'Conforme Loi Spinetta pour AE BTP — minimum recommandé',
        },
      ]}
      sections={[
        {
          h2: 'Pièces nécessaires pour décennale AE BTP',
          body: (
            <ol>
              <li>
                <strong>SIRET valide</strong> (vérifié Insee.fr — &lt; 3 mois)
              </li>
              <li>
                <strong>Attestation ACOSS / URSSAF</strong> (téléchargeable
                autoentrepreneur.urssaf.fr)
              </li>
              <li>
                <strong>CNI ou passeport recto-verso</strong>
              </li>
              <li>
                <strong>Justificatif activité BTP</strong> : CAP/BEP/diplôme BTP OU expérience
                professionnelle 3 ans+ (CV + attestations employeurs précédents)
              </li>
              <li>
                <strong>Qualifications RGE/Qualibat</strong> (optionnel — donne -5-10% prime)
              </li>
              <li>
                <strong>CA prévisionnel 12 mois</strong> (estimation honnête)
              </li>
              <li>
                <strong>Antécédents sinistralité 36 mois</strong> (déclaration honneur — si déjà
                assuré)
              </li>
              <li>
                <strong>RIB</strong> pour paiement annuel ou mensuel
              </li>
            </ol>
          ),
        },
        {
          h2: 'Démarches souscription décennale AE en ligne',
          body: (
            <ol>
              <li>
                <strong>Étape 1 — Choisir métier BTP précis</strong> : peintre, plombier, maçon,
                etc. (impact direct sur prime)
              </li>
              <li>
                <strong>Étape 2 — Devis April Pro BTP</strong> (le best price) en ligne : 5 min de
                remplissage
              </li>
              <li>
                <strong>Étape 3 — Comparer 2-3 autres devis</strong> : SMABTP, Allianz Pro BTP, MMA
                Pro BTP
              </li>
              <li>
                <strong>Étape 4 — Choisir offre</strong> : plafond 1M€ minimum, franchise 800-1
                500€, postériorité 10 ans
              </li>
              <li>
                <strong>Étape 5 — Upload pièces digitales</strong> (5 min)
              </li>
              <li>
                <strong>Étape 6 — Paiement</strong> : annuel (-3-7%) ou mensuel
              </li>
              <li>
                <strong>Étape 7 — Validation assureur</strong> : 24h ouvrées chez April Pro
              </li>
              <li>
                <strong>Étape 8 — Attestation téléchargeable</strong> dans espace adhérent
              </li>
            </ol>
          ),
        },
        {
          h2: 'Tarifs décennale AE BTP 2026 par métier (April Pro best price)',
          body: (
            <ul>
              <li>
                <strong>Peintre AE</strong> : 950-1 400€/an (le moins risqué — sinistralité
                finitions 6% AQC)
              </li>
              <li>
                <strong>Plâtrier AE</strong> : 1 100-1 600€/an
              </li>
              <li>
                <strong>Carreleur AE</strong> : 1 200-1 700€/an
              </li>
              <li>
                <strong>Plombier AE</strong> : 1 400-2 100€/an (18% sinistralité AQC)
              </li>
              <li>
                <strong>Plombier-chauffagiste AE</strong> : 1 600-2 500€/an
              </li>
              <li>
                <strong>Électricien AE</strong> : 1 500-2 200€/an
              </li>
              <li>
                <strong>Maçon AE traditionnel</strong> : 1 800-2 800€/an (12% sinistralité)
              </li>
              <li>
                <strong>Couvreur AE</strong> : 2 200-3 500€/an (24% sinistralité — top BTP)
              </li>
              <li>
                <strong>Charpentier AE</strong> : 2 400-3 800€/an
              </li>
              <li>
                <strong>Multi-services BTP AE</strong> : 2 200-3 500€/an (pack 5-10 métiers)
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Souscrire une décennale AE sans expérience préalable possible ?',
          a: "April Pro et Allianz Pro acceptent débutants AE BTP avec CAP/BEP/diplôme. SMABTP et MMA exigent généralement 1-3 ans d'expérience minimum. Sans diplôme ET sans expérience : refus probable de tous les assureurs (formation à valider d'abord).",
        },
        {
          q: 'Quel est le délai minimum pour avoir une décennale AE ?',
          a: 'Chez April Pro BTP : 24h ouvrées (le plus rapide). Allianz Pro BTP : 48h. MMA Pro BTP : 48-72h. AXA Pro BTP : 72h. Dossier complet + pièces digitales = condition pour respect du délai.',
        },
        {
          q: "Tarif décennale AE BTP plus cher qu'une SARL ?",
          a: 'NON, plus cher pour SARL : la prime décennale est proportionnelle au CA déclaré (plafonné 77 700€ services / 188 700€ vente pour AE), donc AE souvent moins chère que SARL équivalente. Mais plafond couverture identique 1M€ minimum.',
        },
        {
          q: 'Comment trouver le moins cher pour décennale AE peintre ?',
          a: 'April Pro BTP à 950€/an est le best price marché vérifié pour peintre AE débutant. En-dessous de 800€/an : SUSPECT (assureur non-agréé ACPR, plafond &lt; 500k€, exclusions étendues). Vérifier toujours sur Refassu ACPR avant signature.',
        },
      ]}
      relatedMetiers={[
        {
          name: 'Décennale auto-entrepreneur (vue globale)',
          slug: 'assurance-decennale-auto-entrepreneur',
        },
        { name: 'Décennale AE BTP pack', slug: 'assurance-decennale-auto-entrepreneur-pro-btp' },
        { name: 'Décennale BTP (vue globale)', slug: 'assurance-decennale-btp' },
        { name: 'Décennale obligatoire', slug: 'assurance-decennale-obligatoire' },
        {
          name: 'RC Pro auto-entrepreneur',
          slug: 'responsabilite-civile-professionnelle-auto-entrepreneur',
        },
      ]}
    />
  )
}
