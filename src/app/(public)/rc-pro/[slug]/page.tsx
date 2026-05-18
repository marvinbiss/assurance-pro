/**
 * Page dynamique /rc-pro/[slug]
 * Dispatch entre profession (8) et ville (top 100 villes hors collision).
 * Génération statique ISR (revalidate 24h).
 */

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { RC_PRO_PROFESSIONS } from '@/lib/data/rc-pro-professions'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import {
  COMPARATIF_SERVICES,
  EXPERT_SERVICES,
  STATS_DEFAULT,
} from '@/lib/data/pilier-premium-defaults'
import { RcProVilleTemplate } from '@/components/assurance/RcProVilleTemplate'
import { rcProStaticSlugs, resolveRcProSlug } from '@/lib/seo/garantie-slug-dispatcher'
import { SITE_URL } from '@/lib/seo/config'

type Params = { slug: string }

export const dynamicParams = false
export const revalidate = 86400

export const generateStaticParams = rcProStaticSlugs

export async function generateMetadata(props: { params: Promise<Params> }): Promise<Metadata> {
  const params = await props.params
  const r = resolveRcProSlug(params.slug)
  if (!r) return {}
  if (r.kind === 'profession') {
    const p = r.profession
    return {
      title: `RC Pro ${p.name} 2026 — Tarifs + Comparatif`,
      description: `${p.tagline} Tarifs négociés à partir de ${p.tarifs.auto_entrepreneur.max > 0 ? p.tarifs.auto_entrepreneur.min : p.tarifs.sarl_sas.min}€ par an. Plafond recommandé ${p.plafondRecommande}M€. Devis gratuit en 24h.`,
      alternates: { canonical: `${SITE_URL}/rc-pro/${p.slug}` },
    }
  }
  const v = r.ville
  return {
    title: `RC Pro ${v.nom} (${v.departementCode}) — Freelances, consultants, agences`,
    description: `Responsabilité civile professionnelle pour les ~${v.freelancesEstime.toLocaleString('fr-FR')} freelances, consultants et agences de ${v.nom}. Plafond 500k€-2M€. Tarifs à partir de 95€ par an. Devis gratuit ORIAS.`,
    alternates: { canonical: `${SITE_URL}/rc-pro/${v.slug}` },
  }
}

export default async function RcProSlugPage(props: { params: Promise<Params> }) {
  const params = await props.params
  const r = resolveRcProSlug(params.slug)
  if (!r) notFound()
  if (r.kind === 'ville') return <RcProVilleTemplate ville={r.ville} />
  const p = r.profession

  // Pour les professions non éligibles AE (notaires, CAC, dentistes…), tarifs.auto_entrepreneur = {0,0}.
  // On affiche alors le tarif SARL/SAS comme "à partir de" pour ne pas afficher "0€/an".
  const tarifAutoEnt =
    p.tarifs.auto_entrepreneur.max > 0 ? p.tarifs.auto_entrepreneur : p.tarifs.sarl_sas
  const tarifLabel =
    p.tarifs.auto_entrepreneur.max > 0 ? 'Tarif auto-entrepreneur' : 'Tarif SARL ou SAS'

  const otherProfessions = Object.values(RC_PRO_PROFESSIONS)
    .filter((other) => other.slug !== p.slug)
    .slice(0, 6)
    .map((other) => ({ name: other.name, slug: other.slug }))

  return (
    <PilierLayout
      slug={`rc-pro/${p.slug}`}
      title={`RC Pro ${p.name}`}
      tagline={p.tagline}
      legalReference={p.referenceLegale ?? 'art. L. 124-3 et L. 121-2 du Code des assurances'}
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="rc-pro"
      expertBio={EXPERT_SERVICES}
      comparatifRows={COMPARATIF_SERVICES}
      isObligatoire={p.obligatoire}
      intro={p.intro}
      benefits={[
        {
          icon: p.icon,
          title: p.name,
          desc: `~${p.nbProsFrance.toLocaleString('fr-FR')} en France`,
        },
        {
          icon: '🛡️',
          title: `Plafond ${p.plafondRecommande}M€`,
          desc: 'Recommandé pour ce métier',
        },
        { icon: '💰', title: `À partir de ${tarifAutoEnt.min}€ par an`, desc: tarifLabel },
        { icon: '⚡', title: 'Souscription en ligne', desc: 'Attestation immédiate' },
      ]}
      sections={[
        {
          h2: `Pourquoi un ${p.name} doit-il souscrire une RC Pro ?`,
          body: (
            <>
              <p>
                {p.obligatoire
                  ? `La RC Pro est OBLIGATOIRE pour les ${p.name} (${p.referenceLegale ?? 'profession réglementée'}).`
                  : `La RC Pro n'est pas légalement obligatoire pour les ${p.name}, mais elle est fortement recommandée et souvent exigée par les clients pros (ESN, grands comptes, appels d'offres).`}
              </p>
              <p>
                Sans RC Pro, vous engagez votre patrimoine personnel (auto-entrepreneur, EI) ou
                celui de votre société en cas de mise en cause par un client mécontent. Un litige
                peut représenter plusieurs dizaines voire centaines de milliers d'euros (frais
                d'avocats, dommages-intérêts, perte d'exploitation).
              </p>
            </>
          ),
        },
        {
          h2: `Risques spécifiques au métier de ${p.name}`,
          body: (
            <>
              <ul>
                {p.risques.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
              <p>
                Notre cabinet ORIAS recommande pour ce métier un plafond de garantie de{' '}
                <strong>{p.plafondRecommande}M€</strong> par sinistre, avec les garanties suivantes
                :
              </p>
              <ul>
                {p.garantiesRecommandees.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
            </>
          ),
        },
        {
          h2: `Combien coûte la RC Pro ${p.name} ?`,
          body: (
            <>
              <table className="my-4 w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2 text-left">Profil</th>
                    <th className="border border-gray-300 p-2 text-right">Tarif annuel HT</th>
                  </tr>
                </thead>
                <tbody>
                  {p.tarifs.auto_entrepreneur.max > 0 ? (
                    <tr>
                      <td className="border border-gray-300 p-2">
                        <strong>Auto-entrepreneur</strong>
                      </td>
                      <td className="border border-gray-300 p-2 text-right">
                        {p.tarifs.auto_entrepreneur.min}€ - {p.tarifs.auto_entrepreneur.max}€
                      </td>
                    </tr>
                  ) : null}
                  {p.tarifs.sarl_sas.max > 0 ? (
                    <tr>
                      <td className="border border-gray-300 p-2">
                        <strong>SARL — SAS — SASU</strong>
                      </td>
                      <td className="border border-gray-300 p-2 text-right">
                        {p.tarifs.sarl_sas.min}€ - {p.tarifs.sarl_sas.max}€
                      </td>
                    </tr>
                  ) : null}
                  {p.tarifs.grand_compte.max > 0 ? (
                    <tr>
                      <td className="border border-gray-300 p-2">
                        <strong>Grand compte</strong> (CA &gt; 500k€)
                      </td>
                      <td className="border border-gray-300 p-2 text-right">
                        {p.tarifs.grand_compte.min}€ - {p.tarifs.grand_compte.max}€
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
              <p className="text-xs italic text-gray-600">
                Tarifs indicatifs basés sur les barèmes 2026 de nos 10 assureurs partenaires. Le
                tarif réel dépend de votre profil (CA, ancienneté, garanties souhaitées) et fait
                l’objet d’un devis personnalisé.
              </p>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: `La RC Pro est-elle obligatoire pour un ${p.name} ?`,
          a: p.obligatoire
            ? `Oui, ${p.referenceLegale ?? 'la loi impose'} la souscription d'une RC Pro pour cette profession.`
            : `Pas légalement, mais elle est fortement recommandée et souvent exigée par les clients (ESN, grands comptes, appels d'offres). Sans RC Pro, vous engagez votre patrimoine personnel.`,
        },
        {
          q: `Quel plafond de garantie choisir en tant que ${p.name} ?`,
          a: `Pour un ${p.name}, nous recommandons un plafond de ${p.plafondRecommande}M€ par sinistre, qui couvre la majorité des cas de mise en cause. Pour les projets stratégiques (>50k€) ou les clients grands comptes, un plafond plus élevé peut être négocié.`,
        },
        p.tarifs.auto_entrepreneur.max > 0
          ? {
              q: `Combien coûte la RC Pro ${p.name} pour un auto-entrepreneur ?`,
              a: `Entre ${p.tarifs.auto_entrepreneur.min}€ et ${p.tarifs.auto_entrepreneur.max}€ par an pour un auto-entrepreneur, soit ${Math.round(p.tarifs.auto_entrepreneur.min / 12)}-${Math.round(p.tarifs.auto_entrepreneur.max / 12)}€ par mois. Tarifs négociés sur 10 assureurs partenaires.`,
            }
          : {
              q: `Combien coûte la RC Pro ${p.name} ?`,
              a: `Entre ${p.tarifs.sarl_sas.min}€ et ${p.tarifs.sarl_sas.max}€ par an en SARL / SAS. Cette profession n'est pas éligible au statut auto-entrepreneur. Tarifs négociés sur 10 assureurs partenaires.`,
            },
        {
          q: "Que se passe-t-il si je n'ai pas de RC Pro et qu'un client me met en cause ?",
          a: "Vous engagez votre patrimoine personnel (auto-entrepreneur, EI) ou celui de votre société. Les frais incluent : frais d'avocats (10-50k€), dommages-intérêts au client, éventuelle perte de marché. Pour les professions réglementées : suspension ou radiation possible.",
        },
        {
          q: 'Mon contrat couvre-t-il les sinistres antérieurs à la souscription ?',
          a: 'La plupart des contrats RC Pro fonctionnent en "réclamation" : ils couvrent les sinistres déclarés pendant la période de validité, même pour des faits antérieurs (sous condition de "garantie subséquente"). Notre cabinet vérifie ce point lors de la souscription.',
        },
      ]}
      relatedMetiers={otherProfessions}
    />
  )
}
