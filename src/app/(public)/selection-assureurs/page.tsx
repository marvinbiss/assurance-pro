import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Award, Filter, Scale, Sparkles } from 'lucide-react'
import { SITE_URL } from '@/lib/seo/config'
import { PageHero } from '@/components/layout/PageHero'

export const metadata: Metadata = {
  title: 'Comment nous sélectionnons nos assureurs partenaires',
  description:
    "Méthodologie de sélection des 10 assureurs partenaires d'Vivos Assurance : critères de solvabilité, qualité de gestion sinistres, indépendance, transparence.",
  alternates: { canonical: `${SITE_URL}/selection-assureurs` },
  openGraph: {
    title: 'Comment nous sélectionnons nos assureurs partenaires',
    description: 'Méthodologie de sélection des 10 assureurs partenaires d\\',
    url: `${SITE_URL}/selection-assureurs`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Comment nous sélectionnons nos assureurs partenaires',
    description: 'Méthodologie de sélection des 10 assureurs partenaires d\\',
  },
}

export default function SelectionPage() {
  return (
    <main className="min-h-screen bg-sand-50">
      <PageHero
        breadcrumbs={[{ label: 'Cabinet' }, { label: 'Sélection assureurs' }]}
        eyebrow="Méthodologie publique"
        EyebrowIcon={Filter}
        title={
          <>
            Comment nous sélectionnons
            <br />
            <span className="text-secondary-200">nos assureurs partenaires.</span>
          </>
        }
        description="Indépendance capitalistique, qualité de gestion sinistres, transparence — méthodologie en 6 critères publique."
        meta={[
          { Icon: Award, label: 'Solvabilité ≥ A-' },
          { Icon: Scale, label: 'Audit trimestriel' },
        ]}
      />

      <div className="container mx-auto max-w-3xl px-4 py-14">
        <article className="pilier-prose prose prose-lg max-w-none text-charcoal-700">
          <p>
            Notre cabinet est <strong>indépendant</strong>. Nous n&apos;avons aucun lien
            capitalistique avec les compagnies d&apos;assurance que nous distribuons (aucune
            participation supérieure à 10 %), et aucune obligation contractuelle de placer un volume
            minimum chez un partenaire en particulier.
          </p>

          <h2>Nos 6 critères de sélection</h2>

          <h3>1. Solvabilité et notation</h3>
          <p>
            Nous travaillons exclusivement avec des compagnies <strong>notées au moins A-</strong>{' '}
            (Standard &amp; Poor&apos;s, AM Best ou équivalent) ou disposant d&apos;un ratio
            Solvabilité 2 (SCR) supérieur à 150 %. Cette exigence garantit la capacité de
            l&apos;assureur à honorer ses engagements même en cas de sinistralité majeure.
          </p>

          <h3>2. Qualité de gestion sinistres</h3>
          <p>Nous mesurons trimestriellement&nbsp;:</p>
          <ul>
            <li>Délai moyen d&apos;ouverture du dossier sinistre (objectif &lt; 5 jours)</li>
            <li>Délai moyen d&apos;indemnisation (objectif &lt; 60 jours)</li>
            <li>Taux de litiges en médiation (objectif &lt; 2 %)</li>
            <li>Note de satisfaction client post-sinistre (objectif &gt; 4 / 5)</li>
          </ul>
          <p>
            Un partenaire dont les indicateurs se dégradent significativement (deux trimestres
            consécutifs) fait l&apos;objet d&apos;un audit, voire d&apos;un retrait du panel.
          </p>

          <h3>3. Spécialisation sectorielle</h3>
          <p>
            Nous privilégions les compagnies <strong>spécialistes</strong> sur leur segment&nbsp;:
          </p>
          <ul>
            <li>SMABTP, Allianz Pro, MAAF — décennale BTP</li>
            <li>Hiscox, AXA Pro — RC Pro et professions réglementées</li>
            <li>April Pro — santé/prévoyance TNS Madelin</li>
            <li>Wakam, Stello — auto pro et VTC</li>
            <li>MMA, Generali — multirisque pro et grandes lignes</li>
          </ul>

          <h3>4. Indépendance commerciale</h3>
          <p>
            Aucun partenaire ne représente plus de{' '}
            <strong>25 % de notre chiffre d&apos;affaires</strong>. Cette diversification protège
            nos clients d&apos;une éventuelle pression commerciale qui biaiserait nos
            recommandations.
          </p>

          <h3>5. Transparence sur les commissions</h3>
          <p>
            Nous exigeons de chaque partenaire une grille tarifaire <strong>auditable</strong> et la
            possibilité pour le client de connaître, sur demande écrite, le détail de notre
            rémunération (art. L. 521-2 IV C. assur.).
          </p>

          <h3>6. Conformité ACPR et solidité juridique</h3>
          <p>
            Vérification annuelle de l&apos;immatriculation ACPR, du rapport SFCR (Solvabilité 2),
            de l&apos;absence de sanction publique récente, et de la qualité des Conditions
            Générales (clauses abusives, ambiguïtés rédactionnelles).
          </p>

          <h2>Nos 10 assureurs partenaires</h2>
          <p>
            <Link href="/comparateur-assureurs">Voir le comparateur détaillé</Link> avec tarifs,
            plafonds, sinistralité et délais de gestion pour chacun.
          </p>

          <h2>Renouvellement annuel du panel</h2>
          <p>Chaque année, en novembre, nous procédons à une revue complète du panel&nbsp;:</p>
          <ol>
            <li>Audit des indicateurs trimestriels cumulés</li>
            <li>Comparaison avec des partenaires alternatifs du marché</li>
            <li>Décision collégiale (direction + responsables de pôles)</li>
            <li>Information transparente aux clients existants en cas de changement</li>
          </ol>

          <h2>Pas un comparateur low-cost</h2>
          <p>
            Nous ne référençons <strong>pas</strong> les comparateurs en ligne low-cost (LesFurets,
            Assurland) qui ne fournissent pas les garanties subséquentes longues, les analyses
            impartiales détaillées et la traçabilité conseil exigées par la DDA pour les
            professionnels.
          </p>
        </article>

        <section className="relative mt-12 overflow-hidden rounded-3xl bg-charcoal-900 p-8 text-white shadow-premium md:p-10">
          <div className="hero-gradient-anim absolute inset-0 bg-gradient-hero-warm opacity-95" />
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-secondary-400/30 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr_auto]">
            <div>
              <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm">
                <Sparkles className="h-3 w-3 text-secondary-300" />
                Preuve d&apos;impartialité art. L. 521-4 II
              </span>
              <h2 className="mb-2 font-heading text-2xl font-extrabold tracking-display md:text-3xl">
                Une question sur nos partenaires&nbsp;?
              </h2>
              <p className="max-w-xl text-base text-white/85">
                Nous communiquons sur demande écrite la liste exhaustive des contrats analysés pour
                votre dossier.
              </p>
            </div>
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-extrabold text-primary-700 shadow-premium transition-all hover:-translate-y-0.5"
            >
              Nous contacter
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
