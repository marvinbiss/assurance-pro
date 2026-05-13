import type { Metadata } from 'next'
import Link from 'next/link'
import { headers } from 'next/headers'
import {
  ArrowRight,
  Sparkles,
  Building2,
  Hammer,
  Briefcase,
  Heart,
  AlertTriangle,
  Euro,
  FileWarning,
  ChevronDown,
  HelpCircle,
  ShieldCheck,
} from 'lucide-react'
import { SITE_URL } from '@/lib/seo/config'
import { jsonLdScriptProps } from '@/lib/seo/safe-jsonld'
import { getFAQPageSchema } from '@/lib/seo/jsonld'

export const metadata: Metadata = {
  title: 'FAQ — Assurance professionnelle 2026',
  description:
    "20+ questions fréquentes sur l'assurance pro : décennale, RC Pro, courtage ORIAS, ACPR, Loi Madelin, sinistre, résiliation. Réponses motivées et sourcées.",
  alternates: { canonical: `${SITE_URL}/faq` },
  openGraph: {
    title: 'FAQ — Assurance professionnelle 2026',
    description:
      "20+ questions fréquentes sur l'assurance pro. Réponses motivées et sourcées par nos courtiers ORIAS.",
    url: `${SITE_URL}/faq`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ — Assurance professionnelle 2026',
    description:
      "20+ questions fréquentes sur l'assurance pro. Réponses motivées et sourcées par nos courtiers ORIAS.",
  },
}

interface FaqItem {
  q: string
  a: string
  category: string
}

const FAQ: FaqItem[] = [
  {
    category: 'Notre cabinet',
    q: "Qu'est-ce qu'un courtier ORIAS ?",
    a: "Un courtier ORIAS est un intermédiaire en assurance immatriculé au Registre Unique des Intermédiaires en Assurance, Banque et Finance (ORIAS). Il représente le client (vous) et compare les offres de plusieurs compagnies pour vous proposer la meilleure couverture. À la différence d'un agent général lié à une seule compagnie, le courtier travaille pour vos intérêts.",
  },
  {
    category: 'Notre cabinet',
    q: 'Quelle est la différence entre courtier et agent général ?',
    a: "L'agent général est mandaté par UNE compagnie d'assurance et ne propose que ses produits. Le courtier est INDÉPENDANT et compare 5-15 compagnies. Le courtier est plus pertinent pour optimiser votre tarif et votre couverture.",
  },
  {
    category: 'Notre cabinet',
    q: 'Combien coûte vos services de courtage ?',
    a: "Aucun frais de courtage n'est facturé à nos clients. Notre rémunération provient exclusivement des commissions versées par les compagnies d'assurance partenaires (transparence DDA, art. L. 521-2 C. assur.). Cette information est communiquée par écrit avant toute souscription.",
  },
  {
    category: 'Notre cabinet',
    q: "Combien d'assureurs comparez-vous ?",
    a: 'Nous travaillons avec 10 assureurs partenaires : Hiscox, April Pro, Allianz Pro, MMA Pro, Generali Pro, AXA Pro, MAAF Pro, SMABTP, Wakam et Stello. Selon votre profil, nous interrogeons les 3-5 plus pertinents.',
  },
  {
    category: 'Décennale BTP',
    q: "L'assurance décennale est-elle vraiment obligatoire ?",
    a: "Oui, c'est une obligation légale (Loi Spinetta du 4 janvier 1978 + art. L. 241-1 du Code des assurances) pour tout professionnel du BTP qui réalise des travaux affectant la solidité de l'ouvrage ou le rendant impropre à sa destination. Sanctions en cas de défaut : 75 000 € d'amende et 6 mois d'emprisonnement.",
  },
  {
    category: 'Décennale BTP',
    q: "L'auto-entrepreneur BTP doit-il avoir une décennale ?",
    a: "Oui. L'obligation s'applique à TOUS les statuts juridiques, y compris les auto-entrepreneurs et micro-entrepreneurs du BTP. L'amende prévue (75 000 €) est identique. Notre cabinet propose des contrats spécifiques AE à partir de 35€/mois selon le métier.",
  },
  {
    category: 'Décennale BTP',
    q: "Puis-je commencer un chantier avant d'avoir la décennale ?",
    a: "NON. La décennale doit être active AVANT l'ouverture du chantier. Avec notre cabinet, l'attestation est délivrée sous 24 heures après validation de votre dossier. Pour les chantiers urgents, une couverture provisoire peut être négociée.",
  },
  {
    category: 'Décennale BTP',
    q: 'Que se passe-t-il si plusieurs assureurs me refusent ?',
    a: 'Vous pouvez saisir le Bureau Central de Tarification (BCT) qui obligera un assureur à vous couvrir au tarif fixé. Notre cabinet vous accompagne dans cette démarche et vous propose les assureurs spécialisés dans les profils difficiles (jeunes entreprises, antécédents sinistres).',
  },
  {
    category: 'Décennale BTP',
    q: 'La décennale couvre-t-elle les travaux en sous-traitance ?',
    a: "Oui, sous conditions. Le sous-traitant DOIT avoir sa propre décennale active. Le donneur d'ordre engage sa responsabilité s'il fait appel à un sous-traitant non couvert. Demandez systématiquement l'attestation de votre sous-traitant avant le chantier.",
  },
  {
    category: 'RC Pro',
    q: 'La RC Pro est-elle obligatoire ?',
    a: 'Oui pour les professions réglementées (médecins, avocats, agents immobiliers, experts-comptables, agences de voyage, IOBSP, architectes…). Pour les autres (consultants, freelances, agences digitales), elle est fortement recommandée et souvent exigée par les clients pros.',
  },
  {
    category: 'RC Pro',
    q: 'Différence entre RC Pro et RC Exploitation ?',
    a: 'La RC Pro couvre les dommages causés DANS LE CADRE de votre prestation (mauvais conseil, erreur professionnelle). La RC Exploitation couvre les dommages causés EN DEHORS de la prestation (un visiteur tombe dans vos locaux). Les deux peuvent être combinées dans un contrat multirisque pro.',
  },
  {
    category: 'RC Pro',
    q: 'Quel plafond de garantie choisir ?',
    a: 'Pour un auto-entrepreneur consultant, 500k-1M€ par sinistre suffit généralement. Pour une agence ou un freelance qui intervient sur des projets stratégiques (>50k€), prévoir 2-3M€. Pour les professions à risque élevé (médical, juridique, IT critique), 5M€+ sont recommandés.',
  },
  {
    category: 'Mutuelle TNS / Madelin',
    q: "Qu'est-ce que la Loi Madelin ?",
    a: "La Loi Madelin (1994, art. 154 bis CGI) permet aux Travailleurs Non Salariés de déduire fiscalement les cotisations de mutuelle, prévoyance et retraite. Plafond 2026 : 4 997 €/an. Économie d'impôts moyenne : 30-45% selon votre TMI.",
  },
  {
    category: 'Mutuelle TNS / Madelin',
    q: 'Auto-entrepreneur : Madelin est-il intéressant ?',
    a: "Pour les AE en micro, la Loi Madelin n'est PAS applicable (vous êtes au régime micro-fiscal sans bénéfice imposable). Mieux vaut une mutuelle « santé indépendant » non-Madelin, souvent moins chère.",
  },
  {
    category: 'Mutuelle TNS / Madelin',
    q: "Quelle différence entre mutuelle TNS et mutuelle d'entreprise ?",
    a: "La mutuelle d'entreprise (collective) est obligatoirement souscrite par l'employeur pour ses salariés (depuis 2016). La mutuelle TNS est INDIVIDUELLE pour les non-salariés (gérants majoritaires SARL, EI, AE), avec déduction Madelin pour les non-AE.",
  },
  {
    category: 'Sinistre & gestion',
    q: 'Que faire en cas de sinistre ?',
    a: '1) Mettre les personnes en sécurité (urgence). 2) Constater par écrit (constat amiable, photos, témoignages). 3) Déclarer à votre assureur sous les délais (5 jours pour la plupart, 2 jours pour vol). 4) Conserver toutes les preuves (factures, devis réparation). Notre cabinet gère le suivi du dossier pour vous.',
  },
  {
    category: 'Sinistre & gestion',
    q: 'Combien de temps pour être indemnisé ?',
    a: "Cela dépend de la complexité : 15 jours pour un sinistre simple (vol, dégât des eaux clair), 1-3 mois si expertise nécessaire, plusieurs années pour les contentieux décennaux. Notre cabinet accélère les démarches en mobilisant les bons interlocuteurs chez l'assureur.",
  },
  {
    category: 'Sinistre & gestion',
    q: "Comment changer d'assureur ?",
    a: 'Grâce à la Loi Hamon (2014), vous pouvez résilier la plupart des contrats après la 1ère année à tout moment, avec préavis 1 mois. Notre cabinet gère la résiliation et la transition vers le nouveau contrat sans interruption de couverture.',
  },
  {
    category: 'Tarifs',
    q: "Comment est calculée ma prime d'assurance ?",
    a: 'Plusieurs facteurs : votre métier (sinistralité), votre CA, votre statut juridique, votre ancienneté, vos antécédents sinistres (3-5 ans), votre zone géographique, les garanties souhaitées. Notre cabinet optimise chaque variable pour réduire votre prime.',
  },
  {
    category: 'Tarifs',
    q: 'Pourquoi mon tarif a-t-il augmenté au renouvellement ?',
    a: 'Plusieurs causes possibles : sinistre déclaré, augmentation du CA, durcissement du marché (réassurance), modification du barème assureur. Si la hausse est >10%, contactez-nous : nous comparons immédiatement avec les concurrents.',
  },
  {
    category: 'Tarifs',
    q: 'Peut-on payer mensuellement ?',
    a: "Oui, la plupart des assureurs acceptent le paiement mensuel (sans frais ou avec frais 1-2%). C'est plus confortable pour la trésorerie mais légèrement plus cher qu'un paiement annuel.",
  },
  {
    category: 'ACPR / Réclamation',
    q: 'Que faire si je ne suis pas satisfait du service de mon courtier ?',
    a: "Adressez votre réclamation par écrit (email ou courrier) à reclamations@vivos-assurance.fr. Conformément à la Recommandation ACPR 2024-R-02, nous accusons réception sous 10 jours ouvrés et répondons sur le fond sous 2 mois. En cas de désaccord persistant, vous pouvez saisir le Médiateur de l'Assurance.",
  },
  {
    category: 'ACPR / Réclamation',
    q: "Comment vérifier qu'un courtier est ORIAS ?",
    a: 'Sur le site officiel orias.fr, entrez le numéro ORIAS du courtier (8 chiffres). Vous obtenez sa fiche : statut (actif, suspendu, radié), catégorie, immatriculation. Tout courtier sérieux affiche son numéro ORIAS de manière cliquable sur son site (arrêté 6/12/2022).',
  },
  {
    category: 'ACPR / Réclamation',
    q: 'Le courtier peut-il me conseiller un produit non-adapté ?',
    a: 'Non. La DDA (Directive Distribution Assurance, art. L. 521-4 C. assur.) impose au courtier un devoir de conseil personnalisé motivé. Il doit recueillir vos exigences, identifier vos besoins et formuler par écrit la justification du produit choisi. La Reco ACPR 2024-R-03 durcit cette traçabilité.',
  },
]

interface CategoryConfig {
  Icon: typeof Building2
  bg: string
  text: string
  gradient: string
}

const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
  'Notre cabinet': {
    Icon: Building2,
    bg: 'bg-charcoal-100',
    text: 'text-charcoal-800',
    gradient: 'from-charcoal-700 via-charcoal-800 to-charcoal-950',
  },
  'Décennale BTP': {
    Icon: Hammer,
    bg: 'bg-primary-50',
    text: 'text-primary-700',
    gradient: 'from-primary-500 via-primary-600 to-primary-800',
  },
  'RC Pro': {
    Icon: Briefcase,
    bg: 'bg-secondary-50',
    text: 'text-secondary-700',
    gradient: 'from-secondary-500 via-secondary-600 to-secondary-700',
  },
  'Mutuelle TNS / Madelin': {
    Icon: Heart,
    bg: 'bg-rose-50',
    text: 'text-rose-700',
    gradient: 'from-rose-500 via-rose-600 to-rose-700',
  },
  'Sinistre & gestion': {
    Icon: AlertTriangle,
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    gradient: 'from-amber-500 via-amber-600 to-amber-700',
  },
  Tarifs: {
    Icon: Euro,
    bg: 'bg-accent-50',
    text: 'text-accent-700',
    gradient: 'from-accent-500 via-accent-600 to-accent-700',
  },
  'ACPR / Réclamation': {
    Icon: FileWarning,
    bg: 'bg-violet-50',
    text: 'text-violet-700',
    gradient: 'from-violet-500 via-violet-600 to-violet-700',
  },
}

const DEFAULT_CONFIG: CategoryConfig = {
  Icon: HelpCircle,
  bg: 'bg-charcoal-100',
  text: 'text-charcoal-700',
  gradient: 'from-charcoal-600 via-charcoal-700 to-charcoal-900',
}

function configFor(category: string): CategoryConfig {
  return CATEGORY_CONFIG[category] ?? DEFAULT_CONFIG
}

const CATEGORIES = Array.from(new Set(FAQ.map((f) => f.category)))

function slugify(s: string): string {
  return s.replace(/[^a-z0-9]/gi, '-').toLowerCase()
}

export default async function FaqPage() {
  const nonce = (await headers()).get('x-nonce') ?? undefined

  const grouped = CATEGORIES.map((cat) => ({
    cat,
    items: FAQ.filter((f) => f.category === cat),
  }))

  return (
    <main className="min-h-screen bg-sand-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-charcoal-900 py-16 text-white md:py-24">
        <div className="hero-gradient-anim absolute inset-0 bg-gradient-hero-warm opacity-90" />
        <div
          className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-secondary-400/25 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-primary-700/40 blur-3xl"
          aria-hidden="true"
        />

        <div className="container relative mx-auto max-w-6xl px-4">
          <nav
            aria-label="Fil d'Ariane"
            className="mb-6 flex items-center gap-2 text-sm text-white/70"
          >
            <Link href="/" className="transition-colors hover:text-white">
              Accueil
            </Link>
            <span aria-hidden="true">›</span>
            <span className="text-white">FAQ</span>
          </nav>

          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
            <HelpCircle className="h-3.5 w-3.5 text-secondary-300" strokeWidth={2.4} />
            Questions fréquentes
          </span>
          <h1 className="font-display-premium mb-5 max-w-3xl font-heading text-4xl font-extrabold leading-[1.05] tracking-display sm:text-5xl md:text-6xl">
            {FAQ.length}+ réponses
            <br />
            <span className="text-secondary-200">claires &amp; sourcées</span>
          </h1>
          <p className="max-w-2xl text-lg text-white/85 md:text-xl">
            Décennale, RC Pro, ORIAS, Loi Madelin, sinistre, résiliation. Rédigées par nos courtiers
            avec les références au Code des assurances.
          </p>
        </div>
      </section>

      {/* Filtres catégories */}
      <section className="border-b border-charcoal-100 bg-white py-6">
        <div className="container mx-auto max-w-6xl px-4">
          <nav aria-label="Catégories" className="flex flex-wrap items-center gap-2">
            <span className="mr-2 text-xs font-extrabold uppercase tracking-wider text-charcoal-500">
              Naviguer&nbsp;:
            </span>
            {CATEGORIES.map((cat) => {
              const cfg = configFor(cat)
              const itemsCount = FAQ.filter((f) => f.category === cat).length
              return (
                <a
                  key={cat}
                  href={`#cat-${slugify(cat)}`}
                  className="group inline-flex items-center gap-1.5 rounded-full border border-charcoal-200 bg-white px-3.5 py-1.5 text-xs font-bold text-charcoal-700 transition-all hover:-translate-y-0.5 hover:border-charcoal-300 hover:shadow-soft"
                >
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full ${cfg.bg}`}
                  >
                    <cfg.Icon className={`h-3 w-3 ${cfg.text}`} strokeWidth={2.4} />
                  </span>
                  {cat}
                  <span className="rounded-full bg-charcoal-100 px-1.5 py-0 text-[10px] font-extrabold text-charcoal-600 group-hover:bg-charcoal-200">
                    {itemsCount}
                  </span>
                </a>
              )
            })}
          </nav>
        </div>
      </section>

      <div className="container mx-auto max-w-4xl px-4 py-14">
        <div className="space-y-12">
          {grouped.map(({ cat, items }) => {
            const cfg = configFor(cat)
            return (
              <section key={cat} id={`cat-${slugify(cat)}`} className="scroll-mt-32">
                <header className="mb-6 flex items-center gap-4">
                  <span
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${cfg.gradient} shadow-soft`}
                  >
                    <cfg.Icon className="h-6 w-6 text-white" strokeWidth={2.2} />
                  </span>
                  <div>
                    <h2 className="font-heading text-2xl font-extrabold tracking-tight text-charcoal-900">
                      {cat}
                    </h2>
                    <p className="text-sm text-charcoal-500">
                      {items.length} question{items.length > 1 ? 's' : ''}
                    </p>
                  </div>
                </header>

                <div className="space-y-3">
                  {items.map((f) => (
                    <details
                      key={f.q}
                      className="group overflow-hidden rounded-2xl border border-charcoal-100 bg-white shadow-soft transition-all open:border-primary-200 open:shadow-premium hover:border-charcoal-200 hover:shadow-premium"
                    >
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-5 transition-colors hover:bg-sand-50/60 md:p-6">
                        <span className="flex items-start gap-3 text-left">
                          <span
                            className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg ${cfg.bg}`}
                          >
                            <HelpCircle className={`h-3.5 w-3.5 ${cfg.text}`} strokeWidth={2.4} />
                          </span>
                          <span className="font-heading text-base font-extrabold leading-snug tracking-tight text-charcoal-900 md:text-lg">
                            {f.q}
                          </span>
                        </span>
                        <span
                          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-700 transition-transform group-open:rotate-180"
                          aria-hidden="true"
                        >
                          <ChevronDown className="h-4 w-4" strokeWidth={2.6} />
                        </span>
                      </summary>
                      <div className="border-t border-charcoal-100 bg-sand-50/40 px-5 py-5 pl-14 md:px-6 md:py-6 md:pl-16">
                        <p className="text-sm leading-relaxed text-charcoal-700 md:text-base">
                          {f.a}
                        </p>
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            )
          })}
        </div>

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
                Réponse sous 24 h ouvrées
              </span>
              <h2 className="mb-2 font-heading text-3xl font-extrabold tracking-display md:text-4xl">
                Votre question n&apos;est pas listée&nbsp;?
              </h2>
              <p className="max-w-xl text-base text-white/85 md:text-lg">
                Notre équipe ORIAS répond à toutes vos questions, gratuitement et sans engagement.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/75">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-secondary-300" strokeWidth={2.4} />
                  Devoir de conseil DDA L. 521-4
                </span>
              </div>
            </div>
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 text-base font-extrabold text-primary-700 shadow-premium transition-all hover:-translate-y-0.5"
            >
              Nous contacter
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>
      </div>

      <script {...jsonLdScriptProps(getFAQPageSchema(FAQ), nonce)} />
    </main>
  )
}
