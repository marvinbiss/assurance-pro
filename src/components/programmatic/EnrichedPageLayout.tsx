/**
 * Composant partagé pour pages C+D programmatiques.
 *
 * Réutilisé par les 5 templates (prix, comparateur, guide, devis, tarif).
 * Évite la duplication du rendu data-injected.
 */

import { headers } from 'next/headers'
import type { PageEnrichmentRow } from '@/lib/programmatic/page-enrichment'
import { buildSchemaOrg, shouldShowDevisForm } from '@/lib/programmatic/page-enrichment'
import { jsonLdScriptProps } from '@/lib/seo/safe-jsonld'
import { DevisAssuranceForm } from '@/components/assurance/DevisAssuranceForm'

interface Props {
  enrichment: PageEnrichmentRow
  variant: 'prix' | 'comparateur' | 'guide' | 'devis' | 'tarif'
  headline: string
  intro?: React.ReactNode
  extraSections?: React.ReactNode
}

export async function EnrichedPageLayout({
  enrichment,
  variant,
  headline,
  intro,
  extraSections,
}: Props) {
  const schemas = buildSchemaOrg(enrichment)
  const showDevis = shouldShowDevisForm(enrichment)
  const nonce = (await headers()).get('x-nonce') ?? undefined

  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} {...jsonLdScriptProps(schema, nonce)} />
      ))}

      <article className="enriched-page mx-auto max-w-5xl px-4 py-12">
        <header>
          <span className="inline-block text-xs font-semibold uppercase tracking-wide text-orange-600">
            {variant}
          </span>
          <h1 className="mt-1 text-3xl font-bold text-slate-900 md:text-4xl">{headline}</h1>
          {intro && <div className="mt-3 text-lg text-slate-600">{intro}</div>}
        </header>

        <DensityBanner enrichment={enrichment} />

        {(enrichment.prix_min_eur || enrichment.prix_med_eur) && (
          <PrixGrid enrichment={enrichment} />
        )}

        <TrustSources enrichment={enrichment} />

        {extraSections}

        {enrichment.assureurs_top3_jsonb?.length > 0 && <AssureursTop3 enrichment={enrichment} />}

        {enrichment.jurisprudence_refs?.length > 0 && <Jurisprudence enrichment={enrichment} />}

        {enrichment.stats_sectorielles_jsonb?.length > 0 && <StatsBlock enrichment={enrichment} />}

        {enrichment.avis_top_jsonb?.filter((a) => a.iso_20488)?.length > 0 && (
          <AvisBlock enrichment={enrichment} />
        )}

        {showDevis && <DevisCta enrichment={enrichment} />}

        <DdaDisclaimer />
      </article>
    </>
  )
}

function DensityBanner({ enrichment }: { enrichment: PageEnrichmentRow }) {
  if (!enrichment.density_insee || !enrichment.metier_nom || !enrichment.ville_nom) return null
  return (
    <p className="mt-4 text-sm text-slate-500">
      📍 ~{enrichment.density_insee.toLocaleString('fr-FR')} {enrichment.metier_nom}s recensés à{' '}
      {enrichment.ville_nom} (INSEE Sirene {enrichment.enriched_at?.slice(0, 7)}).
    </p>
  )
}

function PrixGrid({ enrichment }: { enrichment: PageEnrichmentRow }) {
  return (
    <section className="mt-10 grid gap-4 md:grid-cols-3">
      {enrichment.prix_min_eur && (
        <PrixCell label="Tarif min marché" value={enrichment.prix_min_eur} highlight />
      )}
      {enrichment.prix_med_eur && <PrixCell label="Tarif médian" value={enrichment.prix_med_eur} />}
      {enrichment.prix_max_eur && (
        <PrixCell label="Tarif maximum" value={enrichment.prix_max_eur} />
      )}
    </section>
  )
}

function PrixCell({
  label,
  value,
  highlight = false,
}: {
  label: string
  value: number
  highlight?: boolean
}) {
  return (
    <div
      className={`rounded-xl border p-5 ${
        highlight ? 'border-orange-300 bg-orange-50' : 'border-slate-200 bg-slate-50'
      }`}
    >
      <div className="text-sm text-slate-600">{label}</div>
      <div
        className={`mt-2 text-2xl font-bold ${highlight ? 'text-orange-700' : 'text-slate-900'}`}
      >
        {Math.round(value).toLocaleString('fr-FR')}€<span className="text-sm font-normal">/an</span>
      </div>
    </div>
  )
}

function TrustSources({ enrichment }: { enrichment: PageEnrichmentRow }) {
  const sources: string[] = []
  if (enrichment.prix_min_eur) sources.push('Tarifs propriétaires')
  if (enrichment.density_insee) sources.push('INSEE Sirene')
  if (enrichment.sinistralite_pct) sources.push('AQC SYCODÉS')
  if (enrichment.jurisprudence_refs?.length > 0) sources.push('Légifrance')
  if (enrichment.assureurs_top3_jsonb?.length > 0) sources.push('Pappers')
  if (enrichment.avis_top_jsonb?.length > 0) sources.push('Trustpilot ISO 20488')
  if (enrichment.stats_sectorielles_jsonb?.length > 0) sources.push('FFA/FFB/CAPEB')

  if (sources.length === 0) return null
  return (
    <aside className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-4">
      <strong className="text-sm text-blue-900">📊 Données vérifiées :</strong>
      <ul className="mt-2 flex flex-wrap gap-2 text-xs">
        {sources.map((s) => (
          <li key={s} className="rounded border border-blue-300 bg-white px-2 py-1 text-blue-800">
            ✓ {s}
          </li>
        ))}
      </ul>
    </aside>
  )
}

function AssureursTop3({ enrichment }: { enrichment: PageEnrichmentRow }) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold">Top 3 assureurs partenaires</h2>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-3 text-left">Assureur</th>
              <th className="px-4 py-3 text-left">Solidité (Pappers)</th>
              <th className="px-4 py-3 text-left">TrustScore</th>
            </tr>
          </thead>
          <tbody>
            {enrichment.assureurs_top3_jsonb.map((a) => (
              <tr key={a.partner_slug} className="border-b">
                <td className="px-4 py-3 font-semibold">{a.nom}</td>
                <td className="px-4 py-3">
                  {a.score_solidite}/100{' '}
                  {a.rating && <span className="text-xs text-slate-500">({a.rating})</span>}
                </td>
                <td className="px-4 py-3">{a.trustscore ? `${a.trustscore.toFixed(1)}/5` : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function Jurisprudence({ enrichment }: { enrichment: PageEnrichmentRow }) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold">Cadre juridique</h2>
      <ul className="mt-4 space-y-3">
        {enrichment.jurisprudence_refs.slice(0, 3).map((r, i) => (
          <li key={i} className="border-l-4 border-slate-400 bg-slate-50 p-4">
            <strong>{r.article}</strong>
            <p className="mt-1 text-sm text-slate-700">{r.texte_court}</p>
            <a
              href={r.legifrance_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm text-blue-600 hover:underline"
            >
              Texte intégral (Légifrance) →
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

function StatsBlock({ enrichment }: { enrichment: PageEnrichmentRow }) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold">Statistiques sectorielles</h2>
      <ul className="mt-4 grid gap-3 md:grid-cols-2">
        {enrichment.stats_sectorielles_jsonb.slice(0, 6).map((s, i) => (
          <li key={i} className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
            <div className="text-2xl font-bold text-emerald-700">
              {s.valeur}
              {s.unite === '%' ? '%' : s.unite === 'EUR' ? '€' : ''}
            </div>
            <div className="mt-1 text-sm text-emerald-900">{s.indicateur}</div>
            <div className="mt-1 text-xs text-slate-500">
              Source : {s.source} · {s.annee}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

function AvisBlock({ enrichment }: { enrichment: PageEnrichmentRow }) {
  const avis = enrichment.avis_top_jsonb.filter((a) => a.iso_20488).slice(0, 4)
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold">Avis clients vérifiés (ISO 20488)</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {avis.map((a, i) => (
          <blockquote key={i} className="rounded-xl border border-slate-200 bg-white p-5">
            <div>
              <span className="text-orange-500">{'★'.repeat(a.note)}</span>
              <span className="text-slate-400">{'★'.repeat(5 - a.note)}</span>
            </div>
            <p className="mt-2 italic text-slate-700">&quot;{a.texte}&quot;</p>
            <footer className="mt-3 text-xs text-slate-500">
              — {a.auteur}
              {a.ville && `, ${a.ville}`} · {a.date} · ISO 20488
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  )
}

function DevisCta({ enrichment }: { enrichment: PageEnrichmentRow }) {
  const prefill = {
    garantie_code: enrichment.garantie_code ?? '',
    metier_code: enrichment.metier_code ?? '',
    ville: enrichment.ville_nom ?? '',
    statut_juridique: enrichment.statut_juridique ?? '',
  }

  return (
    <section id="devis" className="mt-16 rounded-2xl border border-slate-200 bg-slate-50 p-8">
      <header className="mb-6">
        <h2 className="text-3xl font-bold text-slate-900">
          Demande d&apos;information gratuite — {enrichment.garantie_label}
        </h2>
        <p className="mt-2 text-slate-600">
          Recontact gratuit sous 24h par notre courtier partenaire ORIAS. Aucun engagement.
        </p>
      </header>
      <DevisAssuranceForm prefill={prefill} source_url={enrichment.page_slug} />
    </section>
  )
}

function DdaDisclaimer() {
  return (
    <footer className="mt-16 rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600">
      <strong className="mb-1 block">Information précontractuelle DDA</strong>
      Présentation factuelle, sans conseil personnalisé. Devis émis par courtier partenaire ORIAS.
      Tarifs basés sur données propriétaires + INSEE Sirene + AQC SYCODÉS. Registre :{' '}
      <a
        href="https://www.orias.fr"
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
      >
        orias.fr
      </a>
      .
    </footer>
  )
}
