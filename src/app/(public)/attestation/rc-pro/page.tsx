/**
 * Attestation — "attestation rc pro" (350 vol, KD 3, CPC 350€) MONEY
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'attestation/rc-pro'
const TITLE = 'Attestation RC Pro — Obtenir + télécharger en 24h'
const TAGLINE =
  'Obtenir votre attestation RC Pro rapidement : démarches express, modèle PDF, mentions obligatoires. Téléchargeable en 24h chez April Pro / Hiscox / Stello.'

export const metadata: Metadata = {
  title: `${TITLE} | Vivos Assurance`,
  description:
    'Attestation RC Pro : obtenir en 24h. Modèle PDF, mentions obligatoires. Hiscox/Stello immédiat, April Pro 24h, autres 24-48h. Tous statuts juridiques.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Comment obtenir votre attestation RC Pro rapidement : 3 chemins selon votre situation. 1) Pas encore d'assurance ? Devis comparatif gratuit + souscription = attestation immédiate (Hiscox/Stello). 2) Déjà assuré ? Connexion espace adhérent + téléchargement direct (24h max). 3) Urgence client ? Attestation provisoire émise sous 4h par certains assureurs."
      legalReference="art. L. 124-3 + L. 121-2 C. assur."
      benefits={[
        {
          icon: '⚡',
          title: 'Délai 24h max',
          desc: 'Hiscox/Stello immédiat • April Pro 24h • Allianz/MMA 48h',
        },
        {
          icon: '📄',
          title: 'PDF téléchargeable',
          desc: 'Format A4 standard, conforme Code des assurances',
        },
        {
          icon: '💼',
          title: 'Pour tous statuts',
          desc: 'AE, EI, EURL, SARL, SASU, SAS, profession libérale',
        },
        {
          icon: '🆘',
          title: 'Urgence possible',
          desc: 'Attestation provisoire 4h chez certains assureurs',
        },
      ]}
      sections={[
        {
          h2: '3 chemins pour obtenir une attestation RC Pro',
          body: (
            <ol>
              <li>
                <strong>Chemin 1 — Pas encore assuré</strong> :
                <ul>
                  <li>Devis comparatif gratuit via notre courtier ORIAS (5 min)</li>
                  <li>Souscription en ligne chez Hiscox ou Stello (5 min)</li>
                  <li>Paiement sécurisé</li>
                  <li>Attestation téléchargeable immédiatement (Hiscox/Stello)</li>
                </ul>
              </li>
              <li>
                <strong>Chemin 2 — Déjà assuré</strong> :
                <ul>
                  <li>Connexion espace adhérent assureur</li>
                  <li>Onglet &quot;Documents&quot; → &quot;Attestation RC Pro&quot;</li>
                  <li>Téléchargement PDF immédiat</li>
                  <li>
                    Délai : 0 min (téléchargement direct) ou 24h (demande nouvelle attestation)
                  </li>
                </ul>
              </li>
              <li>
                <strong>Chemin 3 — Urgence chantier/contrat</strong> :
                <ul>
                  <li>Demande attestation provisoire à votre assureur</li>
                  <li>Délai 4-24h ouvrées chez April Pro BTP, Hiscox, Allianz Pro</li>
                  <li>Attestation provisoire valide 30 jours en attendant définitive</li>
                  <li>Possibilité supplément urgence chez certains courtiers (50-100€)</li>
                </ul>
              </li>
            </ol>
          ),
        },
        {
          h2: 'Pièces requises (1ère souscription)',
          body: (
            <ul>
              <li>SIRET valide</li>
              <li>K-bis (SARL/SAS) ou ACOSS (AE)</li>
              <li>CNI / passeport</li>
              <li>Justificatif activité (diplôme, qualification, expérience)</li>
              <li>CA prévisionnel</li>
              <li>Antécédents sinistralité 36 mois</li>
              <li>RIB pour paiement</li>
            </ul>
          ),
        },
        {
          h2: 'Mentions clés vérification attestation',
          body: (
            <ul>
              <li>
                <strong>Période de validité</strong> : doit couvrir votre période d&apos;activité
              </li>
              <li>
                <strong>Plafond par sinistre</strong> : suffisant pour vos contrats clients
              </li>
              <li>
                <strong>Activité déclarée</strong> : correspond à votre activité réelle
              </li>
              <li>
                <strong>Numéro ORIAS</strong> du courtier intermédiaire (si applicable)
              </li>
              <li>
                <strong>Mention agrément ACPR</strong> de l&apos;assureur (vérifier sur
                acpr.banque-france.fr)
              </li>
              <li>
                <strong>Identité assuré</strong> : nom/raison sociale + SIRET cohérents
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Délai minimum pour obtenir une attestation RC Pro ?',
          a: 'Immédiat (téléchargement) si déjà assuré chez Hiscox/Stello/Allianz/MMA avec espace adhérent. 5 minutes total si pas encore assuré et choix Hiscox/Stello (souscription + attestation). 4h pour attestation provisoire urgence chez April Pro/Hiscox.',
        },
        {
          q: 'Coût pour avoir une attestation supplémentaire ?',
          a: 'Standard annuelle : gratuite (incluse dans prime). Attestation nominative client grand compte : généralement gratuite. Certains courtiers facturent 50-150€ pour services additionnels (attestation provisoire urgence, attestation rétroactive).',
        },
        {
          q: 'Peut-on télécharger attestation hors heures bureau ?',
          a: 'OUI 24/7 chez Hiscox/Stello/Allianz Pro/MMA (espace adhérent accessible). NON chez April Pro/AXA Pro (système indisponible la nuit). Stocker copie PDF sur cloud personnel pour accès illimité.',
        },
        {
          q: "L'attestation suffit-elle comme preuve d'assurance ?",
          a: 'OUI pour usage commercial standard (clients B2B, Ordres, administration). NON pour contentieux ou expertise sinistre : le contrat complet (CG + CP + IPID) est le document juridique de référence. Toujours conserver les 3 documents.',
        },
      ]}
      relatedMetiers={[
        {
          name: 'Attestation RC Pro complète',
          slug: 'attestation/responsabilite-civile-professionnelle',
        },
        {
          name: 'Attestation de RC Pro',
          slug: 'attestation/de-responsabilite-civile-professionnelle',
        },
        { name: "Attestation d'assurance RC Pro", slug: 'attestation/d-assurance-rc-pro' },
        { name: 'Attestation décennale', slug: 'attestation/decennale' },
        { name: 'Devis RC Pro', slug: 'devis/rc-pro' },
      ]}
    />
  )
}
