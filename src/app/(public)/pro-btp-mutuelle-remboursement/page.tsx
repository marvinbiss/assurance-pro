/**
 * Pilier — "pro btp mutuelle remboursement" (TIER S — 350 vol/mois, KD 0)
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'pro-btp-mutuelle-remboursement'
const TITLE = 'PRO BTP Mutuelle Remboursement — Délais, démarches, blocages'
const TAGLINE =
  'Tout savoir sur les remboursements PRO BTP : télétransmission automatique, envoi de factures papier, délais 3-10 jours ouvrés, recours en cas de retard.'

export const metadata: Metadata = {
  title: `${TITLE} | Vivos Assurance`,
  description:
    'Remboursement PRO BTP : délais 3-7j télétransmission, 7-10j papier. Démarches en cas de retard, recours médiation, solutions alternatives si insatisfaction.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Le remboursement PRO BTP fonctionne en 2 cas principaux : télétransmission automatique pour les professionnels conventionnés Sécu (carte vitale + tiers payant), ou envoi manuel de facture acquittée pour les frais hors télétransmission. Ce guide détaille les délais standards (3-7 jours ouvrés pour télétransmission, 7-10 jours pour papier), les pièces nécessaires, et la procédure exacte en cas de retard ou de refus."
      benefits={[
        {
          icon: '⚡',
          title: 'Télétransmission auto',
          desc: '3-7 jours ouvrés pour les pros conventionnés Sécu',
        },
        {
          icon: '📄',
          title: 'Envoi papier',
          desc: '7-10 jours ouvrés après réception complète dossier',
        },
        {
          icon: '🏥',
          title: 'Hospitalisation prise en charge',
          desc: '48-72h pour accord, paiement direct établissement',
        },
        { icon: '📞', title: 'Service adhérents', desc: '0 970 80 80 80 — Lun-Ven 8h-19h' },
      ]}
      sections={[
        {
          h2: 'Cas 1 — Télétransmission automatique',
          body: (
            <>
              <p>Procédure standard pour 95% des soins courants :</p>
              <ol>
                <li>Vous présentez carte vitale + carte tiers payant à la consultation</li>
                <li>Sécu rembourse sa part directement au pro de santé (tiers payant intégré)</li>
                <li>PRO BTP reçoit l&apos;info via télétransmission NOEMIE sous 24-48h</li>
                <li>PRO BTP calcule la part complémentaire selon votre formule (S1-S4)</li>
                <li>Virement sur votre compte bancaire sous 3-7 jours ouvrés</li>
              </ol>
              <p>
                Vous suivez le remboursement dans votre <strong>espace adhérent probtp.com</strong>{' '}
                (onglet &quot;Mes remboursements&quot;).
              </p>
            </>
          ),
        },
        {
          h2: 'Cas 2 — Remboursement avec facture papier',
          body: (
            <>
              <p>Pour les frais hors télétransmission :</p>
              <ul>
                <li>Médecines douces (ostéo non conventionné, étiopathe, naturopathe)</li>
                <li>Optique hors RAC0 (lentilles, chirurgie réfractive)</li>
                <li>Dentaire spécifique (implants, orthodontie adulte)</li>
                <li>Vaccins non remboursés</li>
                <li>Cures thermales non conventionnées</li>
              </ul>
              <p>
                Démarche : payer la facture, envoyer facture acquittée + RIB via espace adhérent
                (upload) OU par courrier. Délai : 7-10 jours ouvrés après réception complète.
              </p>
            </>
          ),
        },
        {
          h2: 'En cas de retard > 15 jours',
          body: (
            <>
              <ol>
                <li>
                  Vérifier dans votre espace adhérent le statut (reçu / en cours / payé / en attente
                  de pièce)
                </li>
                <li>Vérifier que votre RIB est à jour</li>
                <li>Appeler le 0 970 80 80 80 (numéro adhérent en main)</li>
                <li>Envoyer email à reclamation@probtp.com avec copie du dossier complet</li>
                <li>
                  Si pas de réponse sous 30 jours : saisir le{' '}
                  <strong>Médiateur de la Mutualité Française</strong> (saisine en ligne, gratuite)
                </li>
              </ol>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'Combien de temps pour un remboursement PRO BTP ?',
          a: 'Télétransmission : 3-7 jours ouvrés. Envoi papier : 7-10 jours ouvrés. Hospitalisation (prise en charge) : 48-72h pour accord. Délais conformes engagement service contractuel.',
        },
        {
          q: 'Comment télécharger ma carte tiers payant ?',
          a: 'Espace adhérent probtp.com → Mes documents → Carte tiers payant (PDF). Vous pouvez aussi la commander en physique via le formulaire en ligne (réception 5-7 jours).',
        },
        {
          q: 'Mon remboursement est bloqué, que faire ?',
          a: 'Vérifier dans Mon compte le motif (RIB obsolète, pièce manquante, dossier en attente analyse médicale). Appeler le 0 970 80 80 80 ou écrire à reclamation@probtp.com. Si pas de résolution sous 30j, saisir le Médiateur Mutualité Française.',
        },
        {
          q: 'Puis-je changer de mutuelle si PRO BTP me déçoit ?',
          a: 'Oui, après 1 an d&apos;engagement (loi infra-annuelle 2020). Résiliation par lettre recommandée AR, préavis 1 mois. Alternatives : April Pro Santé, Harmonie Mutuelle BTP, MMA Mutuelle Pro, Aon Santé Pro.',
        },
      ]}
      relatedMetiers={[
        { name: 'PRO BTP Mutuelle (vue globale)', slug: 'pro-btp-mutuelle' },
        {
          name: 'PRO BTP — Mon compte adhérent',
          slug: 'pro-btp-mutuelle-remboursement-mon-compte',
        },
        { name: 'Mutuelle pro BTP (comparatif)', slug: 'mutuelle-pro-btp' },
        { name: 'Mutuelle TNS', slug: 'mutuelle-tns' },
        { name: 'Réclamation mutuelle', slug: 'reclamation' },
      ]}
    />
  )
}
