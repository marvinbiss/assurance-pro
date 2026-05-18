/**
 * Pilier — Assurance juridique professionnelle
 * KW Ahrefs : "assurance juridique professionnelle" 150 vol KD 0 CPC 200€
 * Cousin de /protection-juridique-professionnelle (PJ pro), positionnement légèrement différent.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import {
  COMPARATIF_SERVICES,
  EXPERT_SERVICES,
  STATS_DEFAULT,
} from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'assurance-juridique-professionnelle'
const TITLE = 'Assurance juridique professionnelle — Frais avocat + procédure 2026'
const TAGLINE =
  "L'assurance juridique pour les professionnels : frais avocat, conseil illimité, défense pénale dirigeant, recouvrement créances. Tarifs négociés ORIAS."

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    "Assurance juridique professionnelle : prise en charge frais avocat (jusqu'à 30 000€ par litige), conseil juridique illimité 7j/7, défense pénale dirigeant, recouvrement impayés. Tarifs 280-1 800€ par an. Devis gratuit ORIAS sous 24h.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance juridique professionnelle (souvent appelée Protection Juridique Pro ou PJ pro) prend en charge les frais d'avocat, d'huissier, d'expert et de procédure d'une entreprise confrontée à un litige : impayé client, conflit fournisseur, litige bail commercial, contentieux salarié, contrôle URSSAF, infraction routière, procédure pénale du dirigeant. Elle inclut un service de conseil juridique téléphonique illimité 7j/7 (avocats, juristes spécialisés). C'est l'une des assurances avec le meilleur rapport coût ou protection : 1 entreprise sur 3 connaît un litige juridique majeur dans ses 5 premières années (INSEE 2024), et un seul litige (ex : contestation licenciement à 12 000€) compense 5 à 20 ans de cotisations PJ. Tarifs 2026 : 280-1 800 € par an selon taille."
      legalReference="Articles L. 127-1 et suivants du Code des assurances"
      isObligatoire={false}
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="protection-juridique"
      expertBio={EXPERT_SERVICES}
      comparatifRows={COMPARATIF_SERVICES}
      benefits={[
        {
          icon: '⚖️',
          title: 'Frais avocat 30k€ par litige',
          desc: 'Plafond standard. Recouvrement créances + défense pénale + conseil illimité',
        },
        {
          icon: '📞',
          title: 'Conseil illimité 7j/7',
          desc: 'Hotline avocats + juristes (droit du travail, fiscal, commercial, RGPD, bail)',
        },
        {
          icon: '💼',
          title: 'Défense dirigeant',
          desc: "Sous-limite spécifique pour la défense pénale du chef d'entreprise (6-15k€)",
        },
        {
          icon: '💰',
          title: 'À partir de 280 € par an',
          desc: 'TPE solo. PME 25 salariés : 680-980€ par an. PME 50 salariés : 1 200-1 800€ par an',
        },
      ]}
      sections={[
        {
          h2: 'Pour aller plus loin',
          body: (
            <>
              <p>
                Cette page est complémentaire à notre pilier{' '}
                <Link
                  href="/protection-juridique-professionnelle"
                  className="text-primary-600 underline"
                >
                  /protection-juridique-professionnelle
                </Link>{' '}
                qui détaille en profondeur :
              </p>
              <ul>
                <li>Les couvertures standard et optionnelles</li>
                <li>Les tarifs 2026 par taille d&apos;entreprise</li>
                <li>Le ROI typique d&apos;une PJ Pro (1 litige = 5-20 ans cotisations)</li>
                <li>La distinction PJ Pro vs RC Pro</li>
                <li>Les 7 questions FAQ détaillées</li>
              </ul>
              <p>
                Voir aussi notre guide pratique{' '}
                <Link href="/guides/avocat-litige-assurance" className="text-primary-600 underline">
                  /guides ou avocat-litige-assurance
                </Link>{' '}
                pour les cas où vous êtes en conflit avec votre propre assureur.
              </p>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'Différence entre assurance juridique pro et protection juridique pro ?',
          a: 'Les 2 termes désignent la MÊME garantie. « Assurance juridique professionnelle » est le terme institutionnel large, « Protection Juridique Pro » (PJ Pro) est le nom marketing utilisé par la majorité des assureurs. Couvertures identiques : frais avocat + huissier + expert + procédure pour litiges entreprise.',
        },
        {
          q: 'Combien coûte une assurance juridique pro ?',
          a: '280€ par an pour TPE solo (plafond 15 000€ par litige). 480-780€ par an pour TPE 5 salariés (plafond 30 000€). 680-980€ par an pour PME 25 salariés. 1 200-1 800€ par an pour PME 50 salariés (plafond 50 000€). Souvent disponible en option +30€ par mois sur un contrat multirisque pro existant.',
        },
        {
          q: 'Quand est-elle utile ?',
          a: "Pour TOUT litige juridique entreprise : impayé client B2B, conflit fournisseur, litige bail commercial, contestation licenciement aux prud'hommes, contrôle fiscal ou URSSAF, infraction routière disputée, procédure pénale du dirigeant. 1 entreprise sur 3 connaît un litige majeur dans ses 5 premières années (INSEE 2024).",
        },
        {
          q: 'Plus de détails ?',
          a: "Voir notre pilier complet <a href='/protection-juridique-professionnelle' class='text-primary-600 underline'>/protection-juridique-professionnelle</a> avec tarifs détaillés, ROI documenté et 7 FAQ approfondies.",
        },
      ]}
    />
  )
}
