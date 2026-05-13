import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Award, Building2, ShieldCheck, Scale, Mail, Sparkles } from 'lucide-react'
import { buildOriasFicheUrl, formatOriasDisplay, buildOriasRegistryUrl } from '@/lib/api/orias'
import { SITE_URL } from '@/lib/seo/config'
import { PageHero } from '@/components/layout/PageHero'

const ORIAS = process.env.NEXT_PUBLIC_ORIAS_NUMBER ?? '07 0XX XXX'

const PARTENAIRES = [
  'Hiscox',
  'April Pro',
  'Allianz Pro',
  'MMA Pro',
  'Generali Pro',
  'AXA Pro',
  'MAAF Pro',
  'SMABTP',
  'Wakam',
  'Stello',
] as const

export const metadata: Metadata = {
  title: 'À propos — Cabinet de courtage ORIAS | Vivos Assurance',
  description:
    'Cabinet de courtage indépendant ORIAS spécialisé en assurance professionnelle. 17 verticaux. 10+ assureurs partenaires. Membre CSCA.',
  alternates: { canonical: `${SITE_URL}/a-propos` },
  openGraph: {
    title: 'À propos — Cabinet de courtage ORIAS | Vivos Assurance',
    description:
      'Cabinet de courtage indépendant ORIAS. 17 verticaux. 10+ assureurs partenaires. Membre CSCA.',
    url: `${SITE_URL}/a-propos`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'À propos — Cabinet de courtage ORIAS',
    description: 'Cabinet de courtage indépendant ORIAS. 17 verticaux. 10+ assureurs partenaires.',
  },
}

export default function AProposPage() {
  const oriasFiche = buildOriasFicheUrl(ORIAS.replace(/\s/g, '') || '07000000')
  const oriasFormatted = formatOriasDisplay(ORIAS.replace(/\s/g, '') || '07000000')

  return (
    <main className="min-h-screen bg-sand-50">
      <PageHero
        breadcrumbs={[{ label: 'Cabinet' }, { label: 'À propos' }]}
        eyebrow="Cabinet ORIAS &middot; Indépendant"
        EyebrowIcon={Building2}
        title={
          <>
            Notre cabinet,
            <br />
            <span className="text-secondary-200">votre meilleur tarif.</span>
          </>
        }
        description={
          <>
            Courtier en assurance professionnelle ORIAS, indépendant, transparent. Notre mission :
            obtenir pour vous la meilleure couverture au tarif le plus juste, sur les 17 verticaux
            de l&apos;assurance pro française.
          </>
        }
        meta={[
          { Icon: ShieldCheck, label: 'ORIAS · ACPR · CSCA' },
          { Icon: Award, label: '10+ assureurs partenaires' },
          { Icon: Scale, label: 'RCP renforcée 5 M€' },
        ]}
      />

      <div className="container mx-auto max-w-4xl px-4 py-14">
        <article className="pilier-prose prose prose-lg max-w-none text-charcoal-700">
          <h2>Qui sommes-nous ?</h2>
          <p>
            Vivos Assurance est un cabinet de courtage en assurance indépendant, immatriculé à
            l&apos;ORIAS sous le numéro{' '}
            <a href={oriasFiche} target="_blank" rel="noopener noreferrer">
              {oriasFormatted}
            </a>{' '}
            (catégorie : Courtier en Assurance, type b).
          </p>
          <p>
            Notre cabinet est spécialisé dans l&apos;
            <strong>assurance professionnelle multi-vertical</strong> : artisans du BTP, professions
            libérales, services aux entreprises, restauration, commerce, médical, juridique,
            transport (VTC/Taxi), e-commerce et cyber. Nous travaillons avec un panel de plus de 10
            assureurs partenaires (Hiscox, April Pro, Allianz Pro, MMA, Generali, AXA Pro, MAAF,
            SMABTP, Wakam, Stello&hellip;) afin de comparer pour vous les meilleures offres du
            marché.
          </p>

          <h2>Pourquoi un courtier ?</h2>
          <p>
            Contrairement à un agent général lié à une seule compagnie, le courtier travaille pour{' '}
            <strong>votre intérêt</strong>. Nous interrogeons plusieurs assureurs, négocions les
            conditions, et vous accompagnons dans la durée (modifications de garanties, gestion de
            sinistres, renouvellement, résiliation Hamon).
          </p>
          <p>
            Notre rémunération est exclusivement assurée par les{' '}
            <strong>commissions versées par les compagnies d&apos;assurance partenaires</strong>.
            Aucun frais de courtage n&apos;est facturé à nos clients, conformément à la transparence
            DDA (art. L.&nbsp;521-2 du Code des assurances).
          </p>

          <h2>Notre méthode</h2>
          <ol>
            <li>
              <strong>Recueil d&apos;exigences et besoins</strong> — Nous analysons votre activité,
              votre profil de risque, vos antécédents et vos objectifs (Recommandation ACPR
              2024-R-03).
            </li>
            <li>
              <strong>Mise en concurrence</strong> — Nous interrogeons 3 à 5 assureurs partenaires
              compatibles avec votre profil et négocions les conditions.
            </li>
            <li>
              <strong>Conseil personnalisé motivé</strong> — Nous vous remettons par écrit notre
              recommandation, l&apos;explication du choix produit et l&apos;examen des alternatives
              (devoir de conseil DDA, art. L.&nbsp;521-4).
            </li>
            <li>
              <strong>Accompagnement</strong> — Nous gérons la souscription, l&apos;attestation et
              les évolutions du contrat tout au long de la relation.
            </li>
          </ol>

          <h2>Notre conformité</h2>
          <p>
            Nous opérons dans le strict respect du Code des assurances et de la doctrine de
            l&apos;Autorité de Contrôle Prudentiel et de Résolution (ACPR) :
          </p>
          <ul>
            <li>
              Immatriculation ORIAS à jour, vérifiable sur{' '}
              <a href={buildOriasRegistryUrl()} target="_blank" rel="noopener noreferrer">
                orias.fr
              </a>
            </li>
            <li>
              RCP renforcée et garantie financière conformes aux art. L.&nbsp;512-6 et L.&nbsp;512-7
              C.&nbsp;assur.
            </li>
            <li>
              Procédure de réclamation conforme à la <strong>Recommandation ACPR 2024-R-02</strong>
            </li>
            <li>
              Recueil du devoir de conseil traçable conforme à la{' '}
              <strong>Recommandation ACPR 2024-R-03</strong>
            </li>
            <li>Adhérent CSCA (Chambre Syndicale des Courtiers d&apos;Assurances)</li>
            <li>DPO externe et registre des traitements RGPD à jour</li>
          </ul>
        </article>

        {/* Partenaires assureurs en grid premium */}
        <section className="mt-14">
          <header className="mb-6">
            <span className="mb-2 inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-primary-700">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={2.4} />
              Panel sélectionné
            </span>
            <h2 className="font-heading text-2xl font-extrabold tracking-tight text-charcoal-900 md:text-3xl">
              Nos partenaires assureurs
            </h2>
          </header>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {PARTENAIRES.map((p) => (
              <div
                key={p}
                className="group flex items-center justify-center rounded-2xl border border-charcoal-100 bg-white px-4 py-5 text-center font-heading text-sm font-extrabold text-charcoal-800 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary-200 hover:text-primary-700 hover:shadow-premium"
              >
                {p}
              </div>
            ))}
          </div>
        </section>

        {/* CTA contact */}
        <section className="relative mt-16 overflow-hidden rounded-3xl bg-charcoal-900 p-10 text-white shadow-premium-lg md:p-14">
          <div className="hero-gradient-anim absolute inset-0 bg-gradient-hero-warm opacity-95" />
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-secondary-400/30 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm">
                <Sparkles className="h-3 w-3 text-secondary-300" />
                Échanger avec un courtier
              </span>
              <h2 className="mb-2 font-heading text-3xl font-extrabold tracking-display md:text-4xl">
                Parlons de votre situation.
              </h2>
              <p className="max-w-xl text-base text-white/85 md:text-lg">
                Demande de devis personnalisé, réclamation, conseil sur un sinistre : notre équipe
                vous répond sous 24 h ouvrées.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/75">
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="h-4 w-4 text-secondary-300" strokeWidth={2.4} />
                  reclamations@vivos-assurance.fr
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                href="/devis"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 text-base font-extrabold text-primary-700 shadow-premium transition-all hover:-translate-y-0.5"
              >
                Demander un devis
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10"
              >
                Page contact
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
