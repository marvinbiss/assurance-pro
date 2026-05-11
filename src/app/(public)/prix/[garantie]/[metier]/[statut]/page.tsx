/**
 * Template C — Prix/Tarif programmatique data-injected
 * Route : /prix/[garantie]/[metier]/[statut]
 * Couche : C (Money KW, yield Ahrefs 75.2 vis/page, intent commercial fort)
 *
 * Source data : v_page_enrichment_full (migration 015)
 * KW cible    : "prix [garantie] [metier] [statut]" + "tarif [garantie] [metier]" + "devis [garantie]"
 * CPC typique : 200-1300€ (high commercial intent)
 *
 * Génération statique avec dynamicParams = false + revalidate ISR 24h.
 * Filtrage par yield_score >= 15 (anti-thin) au niveau generateStaticParams.
 */

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  getPageEnrichment,
  getEligibleSlugsForTemplate,
  buildPageTitle,
  buildPageDescription,
  buildCanonical,
  buildSchemaOrg,
  shouldShowDevisForm,
  type PageEnrichmentRow,
} from '@/lib/programmatic/page-enrichment'
import { DevisAssuranceForm } from '@/components/assurance/DevisAssuranceForm'

// ────────────────────────────────────────────────────────────────────────────
// Configuration Next.js App Router
// ────────────────────────────────────────────────────────────────────────────

export const dynamicParams = false
export const revalidate = 86400 // ISR 24h (cohérent avec autres routes du repo)

type Params = {
  garantie: string
  metier: string
  statut: string
}

// ────────────────────────────────────────────────────────────────────────────
// generateStaticParams — filtré par yield_score (anti-thin)
// ────────────────────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const slugs = await getEligibleSlugsForTemplate('prix_garantie_ville_statut', 15)

  // Slugs au format "prix/[garantie]/[metier]/[statut]"
  return slugs
    .filter((s) => s.startsWith('prix/'))
    .map((slug) => {
      const [, garantie, metier, statut] = slug.split('/')
      return { garantie, metier, statut }
    })
    .filter((p) => p.garantie && p.metier && p.statut)
}

// ────────────────────────────────────────────────────────────────────────────
// generateMetadata
// ────────────────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const slug = `prix/${params.garantie}/${params.metier}/${params.statut}`
  const enrichment = await getPageEnrichment(slug)
  if (!enrichment) return {}

  return {
    title: buildPageTitle(enrichment),
    description: buildPageDescription(enrichment),
    alternates: { canonical: buildCanonical(slug) },
    openGraph: {
      title: buildPageTitle(enrichment),
      description: buildPageDescription(enrichment),
      url: buildCanonical(slug),
      type: 'website',
    },
    robots: { index: true, follow: true },
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Page Component
// ────────────────────────────────────────────────────────────────────────────

export default async function PrixPage({ params }: { params: Params }) {
  const slug = `prix/${params.garantie}/${params.metier}/${params.statut}`
  const enrichment = await getPageEnrichment(slug)
  if (!enrichment) notFound()

  const schemas = buildSchemaOrg(enrichment)
  const showDevisForm = shouldShowDevisForm(enrichment)

  return (
    <>
      {/* Schema.org JSON-LD */}
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <article className="prix-template mx-auto max-w-5xl px-4 py-12">
        <PageHeader enrichment={enrichment} />

        <section className="mt-12 grid gap-6 md:grid-cols-3">
          <PrixCard label="Tarif minimum marché" value={enrichment.prix_min_eur} highlight />
          <PrixCard label="Tarif médian" value={enrichment.prix_med_eur} />
          <PrixCard label="Tarif maximum" value={enrichment.prix_max_eur} />
        </section>

        <DataTrustSignals enrichment={enrichment} />

        <PrixContextBlock enrichment={enrichment} />

        <ComparatifAssureurs enrichment={enrichment} />

        <JurisprudenceBlock enrichment={enrichment} />

        <StatsSectoriellesBlock enrichment={enrichment} />

        <AvisVerifiesBlock enrichment={enrichment} />

        {showDevisForm && <DevisFormCTA enrichment={enrichment} />}

        <DisclaimerOrias />
      </article>
    </>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// Subcomponents (inline pour minimiser dépendances ; à externaliser plus tard)
// ────────────────────────────────────────────────────────────────────────────

function PageHeader({ enrichment }: { enrichment: PageEnrichmentRow }) {
  return (
    <header>
      <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
        Prix {enrichment.garantie_label} {enrichment.metier_nom} {enrichment.statut_label} en{' '}
        {new Date().getFullYear()}
      </h1>
      <p className="mt-3 text-lg text-slate-600">
        {enrichment.density_insee && enrichment.metier_nom && enrichment.ville_nom && (
          <>
            ~{enrichment.density_insee.toLocaleString('fr-FR')} {enrichment.metier_nom}s recensés à{' '}
            {enrichment.ville_nom} (INSEE Sirene).
          </>
        )}
      </p>
    </header>
  )
}

function PrixCard({
  label,
  value,
  highlight = false,
}: {
  label: string
  value: number | null
  highlight?: boolean
}) {
  if (value == null) return null
  return (
    <div
      className={`rounded-xl border p-6 ${highlight ? 'border-orange-300 bg-orange-50' : 'border-slate-200 bg-slate-50'}`}
    >
      <div className="text-sm text-slate-600">{label}</div>
      <div
        className={`mt-2 text-3xl font-bold ${highlight ? 'text-orange-700' : 'text-slate-900'}`}
      >
        {Math.round(value).toLocaleString('fr-FR')}€
        <span className="text-base font-normal">/an</span>
      </div>
    </div>
  )
}

function DataTrustSignals({ enrichment }: { enrichment: PageEnrichmentRow }) {
  return (
    <aside className="mt-10 rounded-lg border border-blue-200 bg-blue-50 p-5 text-sm">
      <strong className="mb-2 block text-blue-900">📊 Sources data vérifiées :</strong>
      <ul className="grid gap-1 text-blue-800 md:grid-cols-2">
        <li>✓ Tarifs : agrégation devis propriétaires + partenaires</li>
        <li>✓ Densité : INSEE Sirene (mis à jour mensuel)</li>
        {enrichment.sinistralite_pct && (
          <li>✓ Sinistralité : AQC SYCODÉS (référence sectorielle)</li>
        )}
        {enrichment.jurisprudence_refs?.length > 0 && <li>✓ Jurisprudence : Légifrance API</li>}
        {enrichment.assureurs_top3_jsonb?.length > 0 && (
          <li>✓ Solidité assureurs : Pappers (notation S&P/Moody&apos;s)</li>
        )}
        {enrichment.avis_top_jsonb?.length > 0 && <li>✓ Avis : Trustpilot ISO 20488 vérifiés</li>}
        {enrichment.stats_sectorielles_jsonb?.length > 0 && (
          <li>✓ Stats : FFA / FFB / CAPEB / Mutualité Française</li>
        )}
      </ul>
    </aside>
  )
}

function PrixContextBlock({ enrichment }: { enrichment: PageEnrichmentRow }) {
  if (!enrichment.prix_med_eur) return null
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-slate-900">
        Pourquoi ce tarif {enrichment.garantie_label} pour un {enrichment.metier_nom}{' '}
        {enrichment.statut_label} ?
      </h2>
      <div className="prose prose-slate mt-4 max-w-none">
        <p>
          Le tarif médian observé pour {enrichment.garantie_label} appliqué aux{' '}
          {enrichment.metier_nom}s sous statut {enrichment.statut_label}
          {enrichment.ville_nom && ` à ${enrichment.ville_nom}`} s&apos;établit à{' '}
          <strong>{Math.round(enrichment.prix_med_eur).toLocaleString('fr-FR')}€/an</strong>.
        </p>
        {enrichment.sinistralite_pct && (
          <p>
            La sinistralité métier (AQC SYCODÉS, dernière année disponible) est de{' '}
            <strong>{enrichment.sinistralite_pct.toFixed(1)}%</strong>, ce qui influence directement
            la prime calculée par les assureurs partenaires.
          </p>
        )}
        {enrichment.density_insee && enrichment.ville_nom && (
          <p>
            La densité de {enrichment.metier_nom}s à {enrichment.ville_nom} (
            {enrichment.density_insee.toLocaleString('fr-FR')} actifs INSEE Sirene) crée un marché
            concurrentiel modérément profond, avec {enrichment.assureurs_top3_jsonb?.length ?? 0}{' '}
            assureurs partenaires actifs sur la zone.
          </p>
        )}
      </div>
    </section>
  )
}

function ComparatifAssureurs({ enrichment }: { enrichment: PageEnrichmentRow }) {
  const top3 = enrichment.assureurs_top3_jsonb ?? []
  if (top3.length === 0) return null
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-slate-900">Top 3 assureurs partenaires</h2>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-100 text-left">
              <th className="border-b px-4 py-3">Assureur</th>
              <th className="border-b px-4 py-3">Solidité (Pappers)</th>
              <th className="border-b px-4 py-3">TrustScore</th>
              <th className="border-b px-4 py-3">Tarif indicatif</th>
            </tr>
          </thead>
          <tbody>
            {top3.map((a) => (
              <tr key={a.partner_slug} className="border-b">
                <td className="px-4 py-3 font-semibold">{a.nom}</td>
                <td className="px-4 py-3">
                  {a.score_solidite}/100
                  {a.rating && <span className="ml-2 text-xs text-slate-600">({a.rating})</span>}
                </td>
                <td className="px-4 py-3">{a.trustscore ? `${a.trustscore.toFixed(1)}/5` : '—'}</td>
                <td className="px-4 py-3">
                  {a.prix_indicatif_min ? `${a.prix_indicatif_min}€/an min` : 'Sur devis'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function JurisprudenceBlock({ enrichment }: { enrichment: PageEnrichmentRow }) {
  const refs = enrichment.jurisprudence_refs ?? []
  if (refs.length === 0) return null
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-slate-900">Cadre juridique</h2>
      <ul className="mt-4 space-y-3">
        {refs.slice(0, 3).map((r, i) => (
          <li key={i} className="border-l-4 border-slate-400 bg-slate-50 p-4">
            <strong className="block">{r.article}</strong>
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

function StatsSectoriellesBlock({ enrichment }: { enrichment: PageEnrichmentRow }) {
  const stats = enrichment.stats_sectorielles_jsonb ?? []
  if (stats.length === 0) return null
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-slate-900">Statistiques sectorielles</h2>
      <ul className="mt-4 grid gap-3 md:grid-cols-2">
        {stats.slice(0, 6).map((s, i) => (
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

function AvisVerifiesBlock({ enrichment }: { enrichment: PageEnrichmentRow }) {
  const avis = enrichment.avis_top_jsonb?.filter((a) => a.iso_20488) ?? []
  if (avis.length === 0) return null
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-slate-900">Avis clients vérifiés (ISO 20488)</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {avis.slice(0, 4).map((a, i) => (
          <blockquote key={i} className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2">
              <span className="text-orange-500">{'★'.repeat(a.note)}</span>
              <span className="text-slate-400">{'★'.repeat(5 - a.note)}</span>
            </div>
            <p className="mt-2 italic text-slate-700">&quot;{a.texte}&quot;</p>
            <footer className="mt-3 text-xs text-slate-500">
              — {a.auteur}
              {a.ville && `, ${a.ville}`} · {a.date} · vérifié ISO 20488
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  )
}

function DevisFormCTA({ enrichment }: { enrichment: PageEnrichmentRow }) {
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
        <p className="mt-3 text-slate-600">
          Vous serez recontacté gratuitement par notre courtier partenaire ORIAS sous 24h ouvrées.
        </p>
      </header>
      <DevisAssuranceForm prefill={prefill} source_url={enrichment.page_slug} />
    </section>
  )
}

function DisclaimerOrias() {
  return (
    <footer className="mt-16 rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600">
      <strong className="mb-1 block">Information précontractuelle DDA</strong>
      Cette page constitue une présentation factuelle des tarifs marché et ne vaut pas conseil. Les
      devis personnalisés sont émis par notre courtier partenaire ORIAS (n° à mettre à jour). Tarifs
      indicatifs basés sur agrégation données propriétaires + INSEE Sirene + AQC SYCODÉS.
      Conformément à l&apos;arrêté du 6 décembre 2022, le registre ORIAS est consultable sur{' '}
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
