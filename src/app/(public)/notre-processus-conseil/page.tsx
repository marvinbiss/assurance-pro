import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Sparkles, Scale, ShieldCheck, Workflow } from 'lucide-react'
import { SITE_URL } from '@/lib/seo/config'
import { PageHero } from '@/components/layout/PageHero'

export const metadata: Metadata = {
  title: 'Notre processus de conseil DDA | Vivos Assurance',
  description:
    'Comment notre cabinet ORIAS applique le devoir de conseil (art. L. 521-4 C. assur.) et la Recommandation ACPR 2024-R-03 : recueil exigences, analyse impartiale, recommandation motivée, traçabilité.',
  alternates: { canonical: `${SITE_URL}/notre-processus-conseil` },
  openGraph: {
    title: 'Notre processus de conseil DDA | Vivos Assurance',
    description:
      'Comment notre cabinet ORIAS applique le devoir de conseil (art. L. 521-4 C. assur.) et la Recommandation ACPR 2024-R-03 : recueil exigences, analyse impartiale, recommandation motivée, traçabilité.',
    url: `${SITE_URL}/notre-processus-conseil`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Notre processus de conseil DDA | Vivos Assurance',
    description:
      'Comment notre cabinet ORIAS applique le devoir de conseil (art. L. 521-4 C. assur.) et la Recommandation ACPR 2024-R-03 : recueil exigences, analyse impartiale, recommandation motivée, traçabilité.',
  },
}

export default function ProcessusPage() {
  return (
    <main className="min-h-screen bg-sand-50">
      <PageHero
        breadcrumbs={[{ label: 'Cabinet' }, { label: 'Processus conseil' }]}
        eyebrow="DDA art. L. 521-4 · ACPR 2024-R-03"
        EyebrowIcon={Workflow}
        title={
          <>
            Notre processus
            <br />
            <span className="text-secondary-200">de conseil motivé.</span>
          </>
        }
        description="Recueil d'exigences, analyse impartiale, recommandation écrite motivée et traçabilité. Conforme DDA et Recommandation ACPR 2024-R-03."
        meta={[
          { Icon: Scale, label: 'Devoir de conseil DDA' },
          { Icon: ShieldCheck, label: 'Traçabilité ACPR' },
        ]}
      />

      <div className="container mx-auto max-w-3xl px-4 py-14">
        <article className="pilier-prose prose prose-lg max-w-none text-charcoal-700">
          <p className="text-sm text-charcoal-500">
            Conforme art. L. 521-4 C. assur. et Recommandation ACPR 2024-R-03
          </p>

          <p>
            Le devoir de conseil n&apos;est pas une simple formalité&nbsp;: c&apos;est
            l&apos;essence même du métier de courtier. Notre cabinet documente chaque étape pour
            garantir une recommandation impartiale, motivée et auditable.
          </p>

          <h2>Étape 1 — Recueil des exigences et besoins</h2>
          <p>
            Au démarrage de la relation, nous collectons via un{' '}
            <strong>questionnaire structuré</strong> (web, téléphone ou rendez-vous) :
          </p>
          <ul>
            <li>Activité exacte (codes NAF, métiers exercés, sous-traitance)</li>
            <li>Statut juridique, ancienneté, chiffre d&apos;affaires, effectifs</li>
            <li>Sinistralité historique (3 dernières années)</li>
            <li>Garanties souhaitées et plafonds attendus</li>
            <li>
              Contraintes particulières (clients grands comptes, marchés publics, international)
            </li>
          </ul>
          <p>
            Ce recueil est <strong>horodaté et hashé en SHA-256</strong> pour garantir son intégrité
            en cas de contrôle ACPR ou de litige ultérieur.
          </p>

          <h2>Étape 2 — Identification des besoins légalement applicables</h2>
          <p>
            Sur la base de votre profil, nous identifions automatiquement les{' '}
            <strong>obligations légales</strong> qui s&apos;appliquent à votre activité&nbsp;:
          </p>
          <ul>
            <li>Décennale Loi Spinetta (BTP — art. L. 241-1)</li>
            <li>RC circulation VTC (art. L. 211-1)</li>
            <li>RC médicale Loi Kouchner (santé — art. L. 1142-2 CSP)</li>
            <li>RC Pro avocats (art. 27 Loi 71-1130)</li>
            <li>Et toutes les autres obligations sectorielles</li>
          </ul>

          <h2>Étape 3 — Analyse impartiale d&apos;un nombre suffisant de contrats</h2>
          <p>
            Conformément à l&apos;<strong>art. L. 521-4 II</strong>, nous fondons notre
            recommandation sur l&apos;analyse{' '}
            <strong>d&apos;un nombre suffisant de contrats</strong> du marché. Notre périmètre
            couvre 10 compagnies partenaires&nbsp;: Hiscox, April Pro, MMA, Generali, AXA Pro,
            SMABTP, Allianz Pro, MAAF, Wakam, Stello.
          </p>
          <p>Pour chaque produit, nous comparons&nbsp;:</p>
          <ul>
            <li>Plafonds et franchises</li>
            <li>Périmètre des garanties (clauses, exclusions)</li>
            <li>Garantie subséquente (durée et fonctionnement)</li>
            <li>Tarif et modalités de paiement</li>
            <li>Qualité de gestion sinistres (temps moyen, taux d&apos;acceptation)</li>
          </ul>

          <h2>Étape 4 — Recommandation écrite motivée</h2>
          <p>
            Nous formulons une <strong>recommandation écrite</strong> qui&nbsp;:
          </p>
          <ol>
            <li>Identifie le produit recommandé et le partenaire</li>
            <li>Motive le choix par rapport à votre profil et vos exigences</li>
            <li>Liste les alternatives examinées et la raison de leur écart</li>
            <li>Précise le nombre de contrats analysés (preuve d&apos;impartialité)</li>
          </ol>
          <p>
            Cette recommandation vous est délivrée par email (avec accusé de réception) ou en
            signature électronique selon le canal choisi. Elle est <strong>conservée 10 ans</strong>
            .
          </p>

          <h2>Étape 5 — Traçabilité immuable et audit ACPR</h2>
          <p>
            Conformément à la <strong>Recommandation ACPR 2024-R-03</strong> (applicable au
            31/12/2025), chaque dossier conseil est&nbsp;:
          </p>
          <ul>
            <li>Stocké dans une base de données dédiée</li>
            <li>Hashé en SHA-256 (preuve d&apos;intégrité immuable)</li>
            <li>Daté précisément (delivery_at au format ISO 8601)</li>
            <li>Disponible à tout moment pour audit interne ou contrôle ACPR</li>
          </ul>

          <h2>Étape 6 — Suivi et révision annuelle</h2>
          <p>
            Le devoir de conseil ne s&apos;arrête pas à la souscription. Chaque année, nous vous
            proposons un <strong>point d&apos;adéquation</strong> pour vérifier que votre couverture
            reste alignée avec votre activité (évolution CA, nouveaux marchés, sinistres récents,
            changements réglementaires).
          </p>

          <h2>Pour aller plus loin</h2>
          <ul>
            <li>
              <Link href="/equipe">Découvrir l&apos;équipe</Link>
            </li>
            <li>
              <Link href="/selection-assureurs">
                Comment nous sélectionnons nos assureurs partenaires
              </Link>
            </li>
            <li>
              <Link href="/comparateur-assureurs">Comparateur des 10 assureurs</Link>
            </li>
            <li>
              <Link href="/normes">Normes et conformité</Link>
            </li>
          </ul>
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
                Démarrer un dossier
              </span>
              <h2 className="mb-2 font-heading text-2xl font-extrabold tracking-display md:text-3xl">
                Devis gratuit, sans engagement.
              </h2>
              <p className="max-w-xl text-base text-white/85">
                Première recommandation motivée sous 24-72 h selon priorité.
              </p>
            </div>
            <Link
              href="/devis"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-extrabold text-primary-700 shadow-premium transition-all hover:-translate-y-0.5"
            >
              Demander un devis
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
