/**
 * Pilier — "rc pro agent immobilier" (200 vol, KD 1, CPC 500€) — MONEY KW
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'rc-pro-agent-immobilier'
const TITLE = 'RC Pro Agent Immobilier — Obligation Carte T, plafonds, tarifs'
const TAGLINE =
  "L'agent immobilier titulaire de la Carte T (transactions) doit obligatoirement avoir une RC Pro. Plafond légal 305k€ minimum, tarifs 2026 et démarches CCI."

export const metadata: Metadata = {
  title: `${TITLE} | Vivos Assurance`,
  description:
    'RC Pro agent immobilier Carte T : obligation Loi Hoguet, plafond minimum 305 000€. Tarif 350-1 800€/an selon CA et agence. Présentation CCI lors renouvellement carte T.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'agent immobilier titulaire de la Carte T (Transactions) délivrée par la CCI doit obligatoirement détenir une RC Pro conforme aux exigences de la Loi Hoguet (art. 49 loi 70-9 + décret 72-678). Cette page détaille les obligations spécifiques aux agents Carte T : plafond légal minimum, attestation à présenter à la CCI tous les 3 ans (renouvellement carte), responsabilités couvertes et erreurs fréquentes à éviter."
      legalReference="Loi Hoguet (art. 49 loi 70-9) + décret 72-678 art. 50 + art. L. 124-3 C. assur."
      isObligatoire={true}
      benefits={[
        {
          icon: '📋',
          title: 'Carte T renouvelée tous les 3 ans',
          desc: 'Attestation RC Pro présentée à la CCI lors du renouvellement',
        },
        {
          icon: '🛡️',
          title: 'Plafond 305 000€ minimum',
          desc: 'Mini légal Hoguet. Recommandé 1-2M€ pour agences moyennes',
        },
        {
          icon: '💰',
          title: '350-1 800€/an',
          desc: 'Indépendant 350-600€ • Agence TPE 800-1 800€ selon CA',
        },
        {
          icon: '🤝',
          title: 'Garantie financière séparée',
          desc: '110 000€ mini si vous détenez fonds clients (loyers, dépôts)',
        },
      ]}
      sections={[
        {
          h2: 'Activités encadrées par la Carte T',
          body: (
            <ul>
              <li>
                <strong>Transaction vente immobilière</strong> (résidentiel + commercial)
              </li>
              <li>
                <strong>Recherche acquéreur ou locataire</strong>
              </li>
              <li>
                <strong>Estimation de bien</strong> dans le cadre transaction
              </li>
              <li>
                <strong>Rédaction compromis et acte sous seing privé</strong>
              </li>
              <li>
                <strong>Négociation prix et conditions</strong>
              </li>
              <li>
                <strong>Suivi jusqu&apos;au compromis chez notaire</strong>
              </li>
              <li>
                <strong>Vente en VEFA (vente état futur achèvement)</strong>
              </li>
            </ul>
          ),
        },
        {
          h2: 'Sinistres fréquents agents immobiliers',
          body: (
            <ul>
              <li>
                <strong>Estimation erronée du bien</strong> : sous-évaluation ou sur-évaluation
                préjudiciable
              </li>
              <li>
                <strong>Erreur de conseil urbanisme</strong> : POS/PLU non vérifié, terrain non
                constructible
              </li>
              <li>
                <strong>Omission information critique</strong> : servitude, hypothèque, mitoyenneté
              </li>
              <li>
                <strong>Faute dans compromis</strong> : clause manquante, délai non respecté
              </li>
              <li>
                <strong>Manquement obligation d&apos;information</strong> (loi Carrez, DPE, ERP, RC)
              </li>
              <li>
                <strong>Discrimination dans sélection candidats</strong> (sanction CNIL + Hoguet)
              </li>
              <li>
                <strong>Vice caché révélé post-vente</strong> : si responsabilité agent engagée
              </li>
            </ul>
          ),
        },
        {
          h2: 'Démarches CCI lors renouvellement Carte T',
          body: (
            <ol>
              <li>
                <strong>Préparer dossier 3 mois avant échéance</strong> : RC Pro à jour, garantie
                financière (si gestion), formation continue 42h sur 3 ans
              </li>
              <li>
                <strong>Demander attestation RC Pro auprès de votre assureur</strong> : mention
                nominative Carte T + plafond &gt; 305 000€
              </li>
              <li>
                <strong>Soumettre dossier complet à la CCI compétente</strong> : agent immobilier
                carte T, syndic carte S, gestion carte G
              </li>
              <li>
                <strong>Recevoir nouvelle Carte T</strong> sous 3-6 semaines
              </li>
              <li>
                <strong>Conserver attestation visible dans agence</strong> + sur sites internet
              </li>
            </ol>
          ),
        },
      ]}
      faq={[
        {
          q: 'Mon assureur peut-il refuser de m&apos;assurer en RC Pro Hoguet ?',
          a: 'Oui en théorie (liberté contractuelle). En pratique : Allianz, MMA, AXA Pro, Generali, April couvrent la quasi-totalité des profils Carte T. Refus possible si sinistralité grave passée ou activité à risque atypique (marchand de biens, locations meublées tourisme).',
        },
        {
          q: 'Quel plafond RC Pro recommandé pour un mandataire indépendant ?',
          a: '305 000€ minimum légal pour démarrer. Recommandé 1M€ dès que vous traitez biens > 500k€ (transactions immobilier moyen Paris/IDF, biens commerciaux). Pour activité résidence luxe : 2-5M€.',
        },
        {
          q: 'Comment trouver un assureur Carte T rapidement ?',
          a: 'Allianz Pro Immobilier ou MMA Pro Immobilier sont les leaders avec attestation conforme délivrée sous 48h. Souscription en ligne possible avec courtier ORIAS spécialisé. Comparaison 5 assureurs avant signature.',
        },
        {
          q: 'Que faire si je perds ma Carte T faute de RC Pro ?',
          a: 'Action urgente : 1) Souscrire RC Pro conforme sous 48h (Allianz, MMA disponibles), 2) Demander réintégration CCI avec attestation. Pendant la suspension : interdiction d&apos;exercer (Loi Hoguet art. 14 — sanctions pénales).',
        },
      ]}
      relatedMetiers={[
        { name: 'RC Pro Immobilier (vue globale)', slug: 'rc-pro-immobilier' },
        { name: 'Assurance RC Pro (pilier)', slug: 'assurance-rc-pro' },
        { name: 'RC Pro auto-entrepreneur', slug: 'rc-pro/auto-entrepreneur' },
        { name: 'Comparateur RC Pro', slug: 'comparateur-rc-pro' },
      ]}
    />
  )
}
