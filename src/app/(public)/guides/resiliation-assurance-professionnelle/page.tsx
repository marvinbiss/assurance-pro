/**
 * Guide — Résiliation assurance professionnelle
 * KW long-tail : "résiliation assurance professionnelle", "résilier assurance pro", "loi Hamon assurance pro"
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'guides/resiliation-assurance-professionnelle'
const TITLE = 'Résiliation assurance professionnelle — Loi Hamon, infra-annuelle 2026'
const TAGLINE =
  'Comment résilier son assurance professionnelle : Loi Hamon, résiliation infra-annuelle, lettre type, délais, mandat nouveau courtier. Guide complet 2026.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    "Résiliation assurance pro : Loi Hamon (15 mars 2014), résiliation infra-annuelle après 1 an d'engagement, lettre recommandée AR, délais 1 mois, mandat de résiliation par nouveau courtier. Cas particuliers (cession fonds, changement situation).",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'article' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Résilier son assurance professionnelle est devenu beaucoup plus simple depuis la Loi Hamon du 17 mars 2014 (consommation) qui a instauré la RÉSILIATION INFRA-ANNUELLE : après la 1re année d'engagement, vous pouvez résilier à tout moment, sans frais, sans motif, par lettre recommandée AR ou notification dans votre espace assuré. Le délai d'effet est de 1 mois après la réception par l'assureur. Le NOUVEL ASSUREUR peut effectuer la démarche pour vous (mandat de résiliation). Cette page détaille la procédure standard, le modèle de lettre, les cas particuliers (cession du fonds de commerce, cessation d'activité, changement de situation - art. L. 113-2) et les pièges à éviter (rupture de couverture en cas de mauvaise transition)."
      legalReference="Loi Hamon du 17 mars 2014 + Article L. 113-2 du Code des assurances"
      isObligatoire={false}
      benefits={[
        {
          icon: '✂️',
          title: 'Loi Hamon',
          desc: "Résiliation infra-annuelle possible APRÈS 1 an d'engagement, sans frais, sans motif",
        },
        {
          icon: '📧',
          title: 'Lettre AR ou espace assuré',
          desc: "Notification écrite simple. Pas d'obligation de motif. Délai 1 mois",
        },
        {
          icon: '🔄',
          title: 'Mandat nouveau courtier',
          desc: 'Le nouvel assureur peut effectuer la résiliation à votre place (mandat)',
        },
        {
          icon: '⚠️',
          title: 'Éviter rupture couverture',
          desc: "Valider la souscription du nouveau contrat AVANT de résilier l'ancien",
        },
      ]}
      sections={[
        {
          h2: 'Procédure standard de résiliation',
          body: (
            <>
              <ol>
                <li>
                  <strong>Vérifier l&apos;ancienneté du contrat</strong> : la résiliation
                  infra-annuelle nécessite AU MOINS 1 an d&apos;engagement (vs résiliation annuelle
                  classique à l&apos;échéance avant Loi Hamon)
                </li>
                <li>
                  <strong>Souscrire le NOUVEAU contrat AVANT</strong> de résilier l&apos;ancien
                  (éviter rupture de couverture)
                </li>
                <li>
                  <strong>Lettre recommandée AR</strong> à l&apos;ancien assureur OU notification
                  dans l&apos;espace assuré (preuve datée)
                </li>
                <li>
                  <strong>Délai d&apos;effet</strong> : 1 mois après réception par l&apos;assureur
                </li>
                <li>
                  <strong>Remboursement prorata temporis</strong> de la prime annuelle déjà versée
                </li>
              </ol>
              <p className="mt-3">
                <strong>Astuce</strong> : laisser le NOUVEAU courtier s&apos;occuper de la
                résiliation (mandat de résiliation). Notre cabinet ORIAS gère systématiquement ce
                volet pour ses nouveaux clients — gain de temps + zéro risque de rupture de
                couverture.
              </p>
            </>
          ),
        },
        {
          h2: 'Cas particuliers (résiliation IMMÉDIATE possible)',
          body: (
            <>
              <ul>
                <li>
                  <strong>Cession du fonds de commerce</strong> : résiliation possible à la date de
                  cession (art. L. 113-16 C. assur.)
                </li>
                <li>
                  <strong>Cessation d&apos;activité</strong> (radiation Kbis) : résiliation
                  immédiate sur justificatif
                </li>
                <li>
                  <strong>Changement de situation MATÉRIELLE</strong> (déménagement local,
                  changement métier, mise en vente bien) : art. L. 113-16 — résiliation possible
                </li>
                <li>
                  <strong>Augmentation tarif unilatérale</strong> &gt; 10% : résiliation 30 jours
                  après notification (art. L. 113-12)
                </li>
                <li>
                  <strong>Refus de modification</strong> par l&apos;assureur après changement de
                  situation : résiliation possible
                </li>
              </ul>
            </>
          ),
        },
        {
          h2: 'Modèle de lettre de résiliation',
          body: (
            <>
              <p className="my-3 whitespace-pre-line border-l-4 border-primary-500 bg-gray-50 p-4 text-sm">
                {`[Vos nom + prénom + adresse]
[Date]

Lettre recommandée AR
[Nom assureur]
[Adresse assureur]

Objet : Résiliation contrat n° [NUMERO POLICE] (Loi Hamon)

Madame, Monsieur,

Conformément à la Loi du 17 mars 2014 (dite Loi Hamon) et à l'article L. 113-15-2 du Code des assurances, je vous notifie par la présente la résiliation de mon contrat d'assurance professionnelle n° [NUMERO POLICE] souscrit le [DATE SOUSCRIPTION].

La résiliation prendra effet 1 mois après la réception de cette lettre, soit le [DATE EFFET].

Je vous prie de bien vouloir me rembourser au prorata temporis la fraction de cotisation déjà versée pour la période postérieure à la date d'effet.

Cordialement,
[Signature]`}
              </p>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'Comment résilier mon assurance pro ?',
          a: "Loi Hamon : résiliation infra-annuelle possible APRÈS 1 an d'engagement, sans frais, sans motif. Lettre recommandée AR ou notification dans l'espace assuré. Délai d'effet : 1 mois. Le nouvel assureur peut faire la démarche pour vous (mandat). Remboursement prorata temporis de la prime déjà versée.",
        },
        {
          q: "Puis-je résilier avant 1 an d'engagement ?",
          a: "OUI dans 5 cas particuliers : cession fonds de commerce, cessation d'activité (radiation Kbis), changement situation matérielle (déménagement, changement métier), augmentation tarif > 10%, refus modification après changement situation. Sinon : attendre l'échéance annuelle (résiliation classique à préavis 2 mois).",
        },
        {
          q: 'Comment éviter la rupture de couverture ?',
          a: "RÈGLE D'OR : souscrire le NOUVEAU contrat AVANT de résilier l'ancien. Idéalement, demander au nouvel assureur de faire la démarche de résiliation à votre place (mandat). Vérifier que le nouveau contrat prend effet À LA MÊME DATE que la fin de l'ancien.",
        },
        {
          q: "L'assureur peut-il refuser ma résiliation Loi Hamon ?",
          a: "NON si vous avez plus d'1 an d'engagement et que vous notifiez par écrit (LR/AR ou espace assuré). Tout refus est ABUSIF et signalable à l'ACPR (autorité de contrôle des assurances) ou au Médiateur de l'Assurance (gratuit, mediation-assurance.org).",
        },
      ]}
    />
  )
}
