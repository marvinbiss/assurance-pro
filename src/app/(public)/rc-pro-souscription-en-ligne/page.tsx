/**
 * Souscription — "rc pro souscription en ligne" (90 vol, KD 13, CPC 800€)
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'rc-pro-souscription-en-ligne'
const TITLE = 'RC Pro Souscription En Ligne — Process digital complet'
const TAGLINE =
  'RC Pro souscription 100% en ligne : 6 étapes digitales pour souscrire votre contrat en 5 min. Hiscox + Stello + April Pro digital pure. CPC 800€.'

export const metadata: Metadata = {
  title: `${TITLE} | Vivos Assurance`,
  description:
    'RC Pro souscription en ligne : process digital 6 étapes, 5 min total. Hiscox, Stello, April Pro 100% online. Attestation immédiate. CPC Google Ads 800€.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Process complet de souscription RC Pro 100% en ligne : 6 étapes digitales orchestrées (devis, comparaison, saisie infos, paiement, attestation, confirmation) pour souscrire en 5 minutes. KW à 800€ CPC Google Ads — l'un des MONEY KW les plus chers du marché, reflet de la valeur client. Cette page détaille chaque étape et compare les 3 leaders digital pure (Hiscox, Stello, April Pro BTP)."
      legalReference="art. L. 124-3 + L. 121-2 C. assur. + Loi Hamon"
      benefits={[
        {
          icon: '🔄',
          title: '6 étapes structurées',
          desc: 'Process digital éprouvé avec sécurités à chaque étape',
        },
        {
          icon: '🔒',
          title: 'Sécurisé bout en bout',
          desc: 'TLS 1.3 + paiement PCI-DSS + e-signature qualifiée',
        },
        {
          icon: '⚡',
          title: '5 minutes total',
          desc: 'Toutes étapes en moins de 5 min sur ordi ou mobile',
        },
        {
          icon: '📋',
          title: 'Documents archivés',
          desc: 'Espace adhérent permanent avec contrat + attestation',
        },
      ]}
      sections={[
        {
          h2: '6 étapes du process de souscription',
          body: (
            <ol>
              <li>
                <strong>Étape 1 — Saisie profil</strong> (2 min) :
                <ul>
                  <li>Statut juridique (AE, SARL, SAS)</li>
                  <li>Activité (liste déroulante NAF/APE)</li>
                  <li>Chiffre d&apos;affaires prévisionnel</li>
                  <li>Antécédents sinistres 3-5 ans</li>
                  <li>Options souhaitées (cyber, juridique, dommages biens)</li>
                </ul>
              </li>
              <li>
                <strong>Étape 2 — Comparaison offres</strong> (1 min) :
                <ul>
                  <li>3-5 offres affichées en parallèle</li>
                  <li>Prix annuel + plafond + franchise + postériorité</li>
                  <li>Scoring automatique selon profil</li>
                </ul>
              </li>
              <li>
                <strong>Étape 3 — Saisie identifiants</strong> (1 min) :
                <ul>
                  <li>SIRET (vérification API INSEE)</li>
                  <li>Kbis ou ACOSS attestation</li>
                  <li>RIB IBAN pour prélèvement</li>
                  <li>Pièce identité dirigeant (KYC LCB-FT)</li>
                </ul>
              </li>
              <li>
                <strong>Étape 4 — Paiement sécurisé</strong> (30 sec) :
                <ul>
                  <li>CB (Visa, MasterCard) annuel ou mensuel</li>
                  <li>OU prélèvement automatique mensuel</li>
                  <li>3D Secure pour validation</li>
                </ul>
              </li>
              <li>
                <strong>Étape 5 — E-signature</strong> (30 sec) : signature qualifiée eIDAS via
                DocuSign/Universign
              </li>
              <li>
                <strong>Étape 6 — Téléchargement</strong> (immédiat) : attestation PDF + contrat
                complet + IPID
              </li>
            </ol>
          ),
        },
        {
          h2: 'Sécurités à chaque étape',
          body: (
            <ul>
              <li>
                <strong>Étape saisie profil</strong> : pas de stockage data tant que pas validé
                étape 4
              </li>
              <li>
                <strong>Étape SIRET</strong> : vérification API INSEE temps réel (anti-fraude)
              </li>
              <li>
                <strong>Étape RIB</strong> : vérification IBAN + mandat SEPA (XML signé)
              </li>
              <li>
                <strong>Étape identité</strong> : KYC LCB-FT (Lutte Contre Blanchiment + Financement
                Terrorisme)
              </li>
              <li>
                <strong>Étape paiement</strong> : 3D Secure obligatoire (DSP2)
              </li>
              <li>
                <strong>Étape e-signature</strong> : eIDAS qualifié = valeur probante renforcée
              </li>
              <li>
                <strong>Confirmation</strong> : email avec contrat PDF + lien espace adhérent
                permanent
              </li>
            </ul>
          ),
        },
        {
          h2: 'Comparatif process 3 leaders digital',
          body: (
            <ul>
              <li>
                <strong>Hiscox</strong> : process 5 étapes (paie + signature combinées). 5 min
                effectif. Attestation immédiate. UX éprouvée 30 ans.
              </li>
              <li>
                <strong>Stello</strong> : process 6 étapes optimisées mobile. App native
                iOS/Android. Attestation immédiate. UX moderne 2026.
              </li>
              <li>
                <strong>April Pro BTP</strong> : process 7 étapes (vérifications décennale 24-48h).
                Attestation provisoire immédiate + définitive 48h. Spé BTP.
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Pourquoi CPC à 800€ sur ce KW ?',
          a: 'Combinaison : 1) Intent souscription forte (proche conversion). 2) LTV client élevée (RC Pro annuelle + cyber + cross-sell). 3) Concurrence forte 50+ assureurs. 4) Volume modéré (90/mois) = enchères agressives par clic. CPC Google Ads = 800€/clic en 2026.',
        },
        {
          q: 'Process aussi sûr qu&apos;en agence ?',
          a: 'OUI strictement, voire MIEUX : signature eIDAS qualifiée = valeur probante renforcée vs signature manuscrite. KYC LCB-FT obligatoire. Traçabilité audit log complète. Agréments ACPR identiques.',
        },
        {
          q: 'Erreur après e-signature ?',
          a: 'Loi Hamon : 14 jours rétractation après e-signature. Procédure : email support assureur dans 14j → résiliation gratuite + remboursement 100% prime payée. Au-delà 14j : résiliation possible mais selon clauses contrat.',
        },
      ]}
      relatedMetiers={[
        { name: 'RC Pro en ligne (vue globale)', slug: 'rc-pro-en-ligne' },
        { name: 'Souscrire RC Pro en ligne', slug: 'souscrire-rc-pro-en-ligne' },
        { name: 'Assurance RC Pro en ligne', slug: 'assurance-rc-pro-en-ligne' },
        { name: 'Devis RC Pro en ligne', slug: 'devis/rc-pro-en-ligne' },
        { name: 'Hiscox RC Pro', slug: 'hiscox-rc-pro' },
      ]}
    />
  )
}
