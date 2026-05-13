import type { Metadata } from 'next'
import { CheckCircle2, FileWarning, ListOrdered, Mail, MapPin } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { ReclamationForm } from '@/components/forms/ReclamationForm'
import { SITE_URL } from '@/lib/seo/config'

export const metadata: Metadata = {
  title: 'Déposer une réclamation | Vivos Assurance',
  description:
    'Procédure de réclamation conforme à la Recommandation ACPR 2024-R-02. Formulaire en ligne, accusé réception sous 10 jours ouvrés, réponse sous 2 mois.',
  alternates: { canonical: `${SITE_URL}/reclamation` },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Déposer une réclamation | Vivos Assurance',
    description:
      'Procédure de réclamation conforme à la Recommandation ACPR 2024-R-02. Formulaire en ligne, accusé réception sous 10 jours ouvrés, réponse sous 2 mois.',
    url: `${SITE_URL}/reclamation`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Déposer une réclamation | Vivos Assurance',
    description:
      'Procédure de réclamation conforme à la Recommandation ACPR 2024-R-02. Formulaire en ligne, accusé réception sous 10 jours ouvrés, réponse sous 2 mois.',
  },
}

export default function ReclamationPage() {
  return (
    <main className="min-h-screen bg-sand-50">
      <PageHero
        breadcrumbs={[{ label: 'Réclamation' }]}
        eyebrow="Reco ACPR 2024-R-02"
        EyebrowIcon={FileWarning}
        title="Déposer une réclamation"
        description="Différend avec notre cabinet ou avec un produit distribué ? Nous traitons votre réclamation dans le respect de la Recommandation ACPR 2024-R-02."
        size="sm"
      />

      <div className="container mx-auto max-w-3xl px-4 py-14">
        {/* Engagements ACPR */}
        <section className="mb-8 overflow-hidden rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50/60 to-white p-6 shadow-soft">
          <header className="mb-4 flex items-start gap-3">
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-soft">
              <FileWarning className="h-5 w-5 text-white" strokeWidth={2.2} />
            </span>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-wider text-amber-700">
                Recommandation ACPR 2024-R-02
              </p>
              <h2 className="font-heading text-lg font-extrabold tracking-tight text-charcoal-900">
                Engagements de notre cabinet
              </h2>
            </div>
          </header>
          <ul className="space-y-2.5 text-sm">
            {[
              {
                strong: 'Accusé de réception',
                rest: ' sous 10 jours ouvrés à compter de la réception',
              },
              { strong: 'Réponse sur le fond', rest: ' sous 2 mois maximum' },
              {
                strong: 'Registre des réclamations',
                rest: ' tenu conformément à la recommandation ACPR',
              },
              {
                strong: 'Information',
                rest: " sur la possibilité de saisir le Médiateur de l'Assurance",
              },
            ].map((e) => (
              <li key={e.strong} className="flex items-start gap-2.5 text-charcoal-700">
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-700"
                  strokeWidth={2.4}
                />
                <span className="leading-relaxed">
                  <strong className="text-charcoal-900">{e.strong}</strong>
                  {e.rest}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Comment procéder — étapes numérotées brand */}
        <section className="mb-8">
          <header className="mb-6 flex items-start gap-3">
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-glow-clay">
              <ListOrdered className="h-5 w-5 text-white" strokeWidth={2.2} />
            </span>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-wider text-primary-700">
                3 étapes
              </p>
              <h2 className="font-heading text-xl font-extrabold tracking-tight text-charcoal-900 md:text-2xl">
                Comment procéder&nbsp;?
              </h2>
            </div>
          </header>
          <ol className="space-y-3">
            {[
              {
                step: '1',
                title: 'Étape interne',
                body: (
                  <>
                    Remplissez le formulaire ci-dessous ou écrivez à{' '}
                    <a
                      href="mailto:reclamations@vivos-assurance.fr"
                      className="font-bold text-primary-700 underline-offset-2 hover:underline"
                    >
                      reclamations@vivos-assurance.fr
                    </a>
                    .
                  </>
                ),
              },
              {
                step: '2',
                title: 'Médiation',
                body: (
                  <>
                    Si la réponse interne ne vous satisfait pas, vous pouvez saisir gratuitement le
                    Médiateur de l&apos;Assurance.{' '}
                    <a
                      href="/mediation"
                      className="font-bold text-primary-700 underline-offset-2 hover:underline"
                    >
                      Procédure détaillée
                    </a>
                    .
                  </>
                ),
              },
              {
                step: '3',
                title: 'Recours juridictionnel',
                body: (
                  <>
                    À tout moment, vous conservez la possibilité de saisir les tribunaux compétents.
                  </>
                ),
              },
            ].map((s) => (
              <li
                key={s.step}
                className="flex items-start gap-4 rounded-2xl border border-charcoal-100 bg-white p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-premium"
              >
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 font-heading text-sm font-extrabold text-white shadow-glow-clay">
                  {s.step}
                </span>
                <div className="flex-1 text-sm leading-relaxed text-charcoal-700">
                  <strong className="block font-heading font-extrabold text-charcoal-900">
                    {s.title}
                  </strong>
                  <p className="mt-1">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Formulaire */}
        <section className="mb-8 overflow-hidden rounded-2xl border border-charcoal-100 bg-white p-6 shadow-soft md:p-8">
          <ReclamationForm />
        </section>

        {/* Adresse postale */}
        <section className="overflow-hidden rounded-2xl border border-charcoal-100 bg-white p-6 shadow-soft">
          <header className="mb-3 flex items-start gap-3">
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-charcoal-100">
              <MapPin className="h-4 w-4 text-charcoal-700" strokeWidth={2.4} />
            </span>
            <h2 className="font-heading text-base font-extrabold tracking-tight text-charcoal-900">
              Adresse postale
            </h2>
          </header>
          <p className="ml-12 flex items-start gap-2 text-sm leading-relaxed text-charcoal-700">
            <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-700" strokeWidth={2.4} />
            <span>
              Service Réclamations — Vivos Assurance
              <br />
              {process.env.NEXT_PUBLIC_LEGAL_ADDRESS ?? 'XX rue de la Paix, 75000 Paris'}
            </span>
          </p>
        </section>
      </div>
    </main>
  )
}
