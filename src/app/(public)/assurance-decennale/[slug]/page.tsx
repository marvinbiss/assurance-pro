/**
 * Page dynamique /assurance-decennale/[slug]
 * Dispatch entre métier (12) et ville (top 100 villes hors collision).
 * Génération statique ISR (revalidate 24h).
 */

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { DECENNALE_METIERS } from '@/lib/data/decennale-metiers'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { DecennaleVilleTemplate } from '@/components/assurance/DecennaleVilleTemplate'
import { decennaleStaticSlugs, resolveDecennaleSlug } from '@/lib/seo/garantie-slug-dispatcher'
import { SITE_URL } from '@/lib/seo/config'

type Params = { slug: string }

export const dynamicParams = false
export const revalidate = 86400

export const generateStaticParams = decennaleStaticSlugs

export async function generateMetadata(props: { params: Promise<Params> }): Promise<Metadata> {
  const params = await props.params
  const r = resolveDecennaleSlug(params.slug)
  if (!r) return {}
  if (r.kind === 'metier') {
    const m = r.metier
    return {
      title: `Assurance décennale ${m.name} 2026 — Tarifs + comparatif`,
      description: `${m.tagline} Sinistralité ${m.sinistraliteAqc}% (AQC). Tarifs négociés à partir de ${m.tarifs.auto_entrepreneur.min}€/an pour les auto-entrepreneurs. Devis gratuit en 24h.`,
      alternates: { canonical: `${SITE_URL}/assurance-decennale/${m.slug}` },
    }
  }
  const v = r.ville
  return {
    title: `Assurance décennale ${v.nom} (${v.departementCode}) — Tarifs artisans BTP 2026`,
    description: `Garantie décennale obligatoire pour les artisans BTP de ${v.nom}. ~${v.artisansBtpEstime.toLocaleString('fr-FR')} entreprises BTP locales. Tarifs négociés à partir de 480€/an. Devis gratuit ORIAS sous 24h.`,
    alternates: { canonical: `${SITE_URL}/assurance-decennale/${v.slug}` },
  }
}

export default async function DecennaleSlugPage(props: { params: Promise<Params> }) {
  const params = await props.params
  const r = resolveDecennaleSlug(params.slug)
  if (!r) notFound()
  if (r.kind === 'ville') return <DecennaleVilleTemplate ville={r.ville} />
  const m = r.metier
  {
    const otherMetiers = Object.values(DECENNALE_METIERS)
      .filter((other) => other.slug !== m.slug)
      .slice(0, 8)
      .map((other) => ({ name: other.name, slug: other.slug }))

    return (
      <PilierLayout
        slug={`assurance-decennale/${m.slug}`}
        title={`Assurance décennale ${m.name}`}
        tagline={m.tagline}
        legalReference="Loi Spinetta — art. L. 241-1 du Code des assurances + art. 1792 C. civ."
        isObligatoire={true}
        intro={m.intro}
        benefits={[
          {
            icon: m.icon,
            title: m.name,
            desc: `~${m.nbEntreprisesFrance.toLocaleString('fr-FR')} en France`,
          },
          {
            icon: '📊',
            title: `Sinistralité ${m.sinistraliteAqc}%`,
            desc: 'Source AQC SYCODÉS 2024',
          },
          {
            icon: '💰',
            title: `À partir de ${m.tarifs.auto_entrepreneur.min}€/an`,
            desc: 'Tarif auto-entrepreneur',
          },
          { icon: '⚡', title: 'Attestation 24h', desc: 'Délivrée après souscription' },
        ]}
        sections={[
          {
            h2: `Pourquoi un ${m.name} doit-il souscrire une décennale ?`,
            body: (
              <>
                <p>
                  En tant que <strong>{m.name}</strong>, vous êtes tenu par la{' '}
                  <strong>Loi Spinetta du 4 janvier 1978</strong> de souscrire une garantie
                  décennale couvrant tous vos travaux susceptibles d&apos;affecter la solidité de
                  l&apos;ouvrage ou de le rendre impropre à sa destination.
                </p>
                <p>L&apos;absence de couverture est sanctionnée par&nbsp;:</p>
                <ul>
                  <li>
                    <strong>75 000€ d&apos;amende</strong>
                  </li>
                  <li>
                    <strong>6 mois d&apos;emprisonnement</strong>
                  </li>
                  <li>Interdiction d&apos;exercer l&apos;activité d&apos;artisan</li>
                  <li>Responsabilité civile et pénale personnelle en cas de sinistre</li>
                </ul>
                <p>
                  Depuis 2024, la mention de votre décennale (assureur, n° de police, période, zone
                  géographique couverte) est{' '}
                  <strong>obligatoire sur tous vos devis et factures</strong> clients.
                </p>
              </>
            ),
          },
          {
            h2: `Combien coûte la décennale ${m.name} ?`,
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
                    <tr>
                      <td className="border border-gray-300 p-2">
                        <strong>Auto-entrepreneur</strong> (CA &lt; 50k€)
                      </td>
                      <td className="border border-gray-300 p-2 text-right">
                        {m.tarifs.auto_entrepreneur.min}€ - {m.tarifs.auto_entrepreneur.max}€
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">
                        <strong>PME</strong> (CA 50-100k€)
                      </td>
                      <td className="border border-gray-300 p-2 text-right">
                        {m.tarifs.pme_50k_100k.min}€ - {m.tarifs.pme_50k_100k.max}€
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">
                        <strong>PME</strong> (CA 100-250k€)
                      </td>
                      <td className="border border-gray-300 p-2 text-right">
                        {m.tarifs.pme_100k_250k.min}€ - {m.tarifs.pme_100k_250k.max}€
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">
                        <strong>Grand compte</strong> (CA &gt; 500k€)
                      </td>
                      <td className="border border-gray-300 p-2 text-right">
                        {m.tarifs.grand_compte.min}€ - {m.tarifs.grand_compte.max}€
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-xs italic text-gray-600">
                  Tarifs indicatifs basés sur les barèmes 2026 de nos 10 assureurs partenaires
                  (Hiscox, April Pro, MMA, Generali, AXA Pro, SMABTP, Allianz Pro, MAAF, Wakam,
                  Stello). Le tarif réel dépend de votre profil (ancienneté, antécédents sinistres,
                  zone géographique) et fait l&apos;objet d&apos;un devis personnalisé.
                </p>
              </>
            ),
          },
          {
            h2: `Risques spécifiques au métier de ${m.name}`,
            body: (
              <>
                <p>
                  D&apos;après l&apos;AQC SYCODÉS 2024, les principales causes de sinistres
                  décennaux pour ce métier sont&nbsp;:
                </p>
                <ul>
                  {m.topCauses.map((c) => (
                    <li key={c.cause}>
                      <strong>{c.cause}</strong> — {c.pct}% des sinistres
                    </li>
                  ))}
                </ul>
                <p>
                  <strong>Sinistralité moyenne :</strong> {m.sinistraliteAqc}% des chantiers.{' '}
                  <strong>Coût moyen d&apos;un sinistre :</strong>{' '}
                  {m.coutSinistreMoyen.toLocaleString('fr-FR')}€.
                </p>
                <p>Risques additionnels à anticiper :</p>
                <ul>
                  {m.risques.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </>
            ),
          },
          {
            h2: 'Garanties recommandées en complément',
            body: (
              <ul>
                {m.garantiesSpecifiques.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
            ),
          },
        ]}
        faq={[
          {
            q: `Suis-je obligé de souscrire une décennale en tant que ${m.name} ?`,
            a: `Oui, l'obligation de l'art. L. 241-1 du Code des assurances s'applique à tout ${m.name} (artisan, auto-entrepreneur, SARL, SAS) qui réalise des travaux susceptibles d'affecter la solidité de l'ouvrage ou de le rendre impropre à sa destination.`,
          },
          {
            q: `Combien coûte la décennale ${m.name} pour un auto-entrepreneur ?`,
            a: `À partir de ${m.tarifs.auto_entrepreneur.min}€/an pour un auto-entrepreneur ${m.name} avec CA < 50k€. Le tarif moyen se situe entre ${m.tarifs.auto_entrepreneur.min}€ et ${m.tarifs.auto_entrepreneur.max}€ selon votre ancienneté et vos antécédents.`,
          },
          {
            q: `Quelle est la sinistralité moyenne d'un ${m.name} ?`,
            a: `Selon les données AQC SYCODÉS 2024, la sinistralité moyenne d'un ${m.name} est de ${m.sinistraliteAqc}% des chantiers, avec un coût moyen de sinistre de ${m.coutSinistreMoyen.toLocaleString('fr-FR')}€.`,
          },
          {
            q: 'Combien de temps avant un chantier dois-je souscrire ?',
            a: "La décennale doit être souscrite AVANT l'ouverture du chantier. Avec notre cabinet ORIAS, l'attestation est délivrée sous 24 heures après validation de votre dossier. Pour les chantiers d'urgence, une couverture provisoire peut être négociée.",
          },
          {
            q: `Que faire si plusieurs assureurs refusent de me couvrir en tant que ${m.name} ?`,
            a: 'Vous pouvez saisir le Bureau Central de Tarification (BCT) qui obligera un assureur à vous couvrir au tarif fixé. Notre cabinet vous accompagne dans cette démarche et vous propose les assureurs spécialisés dans les profils difficiles.',
          },
        ]}
        relatedMetiers={otherMetiers}
      />
    )
  }
}
