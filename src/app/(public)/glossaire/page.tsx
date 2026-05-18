import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Sparkles, BookOpen, Hash, Link2, Search, ShieldCheck } from 'lucide-react'
import { SITE_URL } from '@/lib/seo/config'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'

export const metadata: Metadata = {
  title: "Glossaire de l'assurance pro — 40+ définitions claires",
  description:
    "Glossaire complet de l'assurance professionnelle : décennale, RC Pro, DDA, Loi Spinetta, Madelin, IPID, ACPR, ORIAS... 40+ définitions rédigées par nos courtiers ORIAS.",
  alternates: { canonical: `${SITE_URL}/glossaire` },
  openGraph: {
    title: "Glossaire de l'assurance pro — 40+ définitions claires",
    description:
      "40+ définitions claires de l'assurance professionnelle, rédigées par nos courtiers ORIAS.",
    url: `${SITE_URL}/glossaire`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Glossaire de l'assurance pro — 40+ définitions claires",
    description:
      "40+ définitions claires de l'assurance professionnelle, rédigées par nos courtiers ORIAS.",
  },
}

interface Term {
  term: string
  definition: string
  related?: string[]
}

const TERMS: Term[] = [
  {
    term: 'ACPR',
    definition:
      "Autorité de Contrôle Prudentiel et de Résolution. Autorité publique française qui supervise les banques et les assurances. Tout courtier ORIAS est soumis à son contrôle (art. L. 612-1 CMF). Sanctions possibles : avertissement, blâme, interdiction d'exercer, radiation ORIAS, amende jusqu'à 100 M€.",
    related: ['ORIAS', 'CSCA'],
  },
  {
    term: 'Article 1792 du Code civil',
    definition:
      "Texte fondateur de la responsabilité décennale en France. Il établit la présomption de responsabilité des constructeurs pour les dommages compromettant la solidité de l'ouvrage ou le rendant impropre à sa destination, pendant 10 ans après réception.",
    related: ['Décennale', 'Loi Spinetta'],
  },
  {
    term: 'Attestation décennale',
    definition:
      "Document obligatoire à remettre au client AVANT le début des travaux. Mentionne l'assureur, le numéro de police, la période de validité, la zone géographique couverte et les activités assurées. Depuis 2024, sa mention est obligatoire sur tous les devis et factures.",
  },
  {
    term: 'Auto-entrepreneur (micro-entrepreneur)',
    definition:
      "Statut juridique simplifié permettant d'exercer une activité indépendante. L'obligation de souscription d'assurance pro (décennale, RC Pro selon métier) s'applique aussi à l'auto-entrepreneur. Plafond CA 2026 : 77 700 € (services) — 188 700 € (vente).",
    related: ['Loi Madelin'],
  },
  {
    term: 'Bureau Central de Tarification (BCT)',
    definition:
      "Institution permettant à un professionnel refusé par plusieurs assureurs d'obtenir une couverture obligatoire (décennale, RC Pro auto). Le BCT fixe le tarif et oblige un assureur à couvrir. Recours en dernier ressort.",
    related: ['Décennale'],
  },
  {
    term: 'Capacité financière (courtier)',
    definition:
      'Garantie obligatoire pour les courtiers ORIAS qui encaissent des fonds clients (art. L. 512-7 C. assur.). Montant minimum 115 000 €. Notre cabinet en est doté pour la sécurité de vos primes.',
    related: ['ORIAS', 'RCP'],
  },
  {
    term: 'CSCA',
    definition:
      "Chambre Syndicale des Courtiers d'Assurances. Association professionnelle agréée (art. L. 513-3 C. assur.) à laquelle adhèrent les courtiers ORIAS. Notre cabinet est membre actif.",
    related: ['ORIAS', 'ACPR'],
  },
  {
    term: 'Décennale (garantie)',
    definition:
      "Garantie obligatoire pour les constructeurs (Loi Spinetta 1978 + art. L. 241-1 C. assur.). Couvre pendant 10 ans après réception les dommages compromettant la solidité de l'ouvrage ou le rendant impropre à destination.",
    related: ['Article 1792 du Code civil', 'Loi Spinetta', 'Dommages-ouvrage'],
  },
  {
    term: 'DDA (Directive Distribution Assurance)',
    definition:
      "Directive européenne 2016/97 transposée en France (Ordonnance 2018-361). Encadre la distribution d'assurance : information précontractuelle, devoir de conseil, transparence des rémunérations.",
    related: ['Devoir de conseil', 'IPID'],
  },
  {
    term: 'Devoir de conseil (DDA art. L. 521-4)',
    definition:
      'Obligation pour le courtier de recueillir les exigences et besoins du client AVANT toute souscription, et de formuler une recommandation personnalisée motivée par écrit. La Reco ACPR 2024-R-03 (applicable 31 décembre 2025) durcit la traçabilité.',
    related: ['DDA'],
  },
  {
    term: 'Dommages-ouvrage (assurance)',
    definition:
      "Assurance souscrite par le maître d'ouvrage (particulier ou pro qui fait construire) pour bénéficier rapidement d'une indemnisation en cas de sinistre décennal, sans attendre la décision judiciaire. Obligatoire (art. L. 242-1 C. assur.).",
    related: ['Décennale'],
  },
  {
    term: 'Éligibilité ORIAS',
    definition:
      "Conditions pour s'immatriculer comme courtier ORIAS : honorabilité (casier vierge), capacité professionnelle (formation 150h + examen ou expérience), garantie financière, RCP renforcée, adhésion à une association agréée.",
  },
  {
    term: 'Exclusion de garantie',
    definition:
      "Clause d'un contrat d'assurance excluant certains risques de la couverture (art. L. 113-1 C. assur.). Doit être rédigée en caractères apparents et limitée aux cas listés. Toute exclusion non-conforme est inopposable au client.",
  },
  {
    term: 'Franchise',
    definition:
      "Montant restant à la charge de l'assuré en cas de sinistre. Peut être fixe (ex : 500€), proportionnelle (ex : 10% du sinistre) ou mixte. Varie selon l'assureur et le type de garantie.",
  },
  {
    term: 'Garantie subséquente',
    definition:
      "Période pendant laquelle l'assureur couvre les sinistres déclarés APRÈS la fin du contrat, pour des faits survenus pendant la période de validité. Durée habituelle : 5 ans (RC Pro) à 10 ans (RC médicale).",
  },
  {
    term: 'IPID (DIPA)',
    definition:
      "Document d'Information sur le Produit d'Assurance. Imposé par DDA. Format standardisé européen, doit être remis au client AVANT souscription. Résume les garanties, exclusions, primes, plafonds.",
    related: ['DDA'],
  },
  {
    term: 'Loi Hamon',
    definition:
      "Loi du 17 mars 2014 permettant la résiliation de la plupart des contrats d'assurance après la 1ère année, à tout moment, avec préavis 1 mois. Concerne aussi la décennale et la RC Pro.",
  },
  {
    term: 'Loi Kouchner',
    definition:
      'Loi du 4 mars 2002 relative aux droits des malades. Impose à tout professionnel de santé exerçant à titre libéral de souscrire une RC Pro (art. L. 1142-2 CSP).',
    related: ['RC Pro'],
  },
  {
    term: 'Loi Madelin',
    definition:
      'Loi du 11 février 1994 (art. 154 bis CGI) permettant aux TNS (travailleurs non salariés) de déduire fiscalement les cotisations de mutuelle, prévoyance et retraite. Plafond 2026 : 4 997 € par an.',
    related: ['Mutuelle TNS'],
  },
  {
    term: 'Loi Naegelen',
    definition:
      'Loi du 24 juillet 2020 + décret 2022-34. Encadre le démarchage téléphonique : autorisé uniquement lundi-vendredi 10h-13h et 14h-20h, max 4 appels par mois par personne, intégration Bloctel obligatoire.',
  },
  {
    term: 'Loi Spinetta',
    definition:
      "Loi 78-12 du 4 janvier 1978 instituant la responsabilité civile décennale obligatoire pour les constructeurs et la garantie dommages-ouvrage pour les maîtres d'ouvrage.",
    related: ['Décennale', 'Dommages-ouvrage'],
  },
  {
    term: "Médiateur de l'Assurance",
    definition:
      'Organisme indépendant chargé de résoudre amiablement les litiges entre assurés et assureurs. Saisi gratuitement après échec du recours interne. www.mediation-assurance.org.',
  },
  {
    term: 'Multirisque Professionnelle (MRP)',
    definition:
      "Contrat tout-en-un couvrant les locaux pro, leur contenu (mobilier, matériel, stocks), la perte d'exploitation et la RC Exploitation. Pas obligatoire mais incontournable pour les commerces et artisans avec atelier.",
  },
  {
    term: 'Mutuelle TNS',
    definition:
      'Mutuelle santé pour Travailleurs Non Salariés (auto-entrepreneurs, EI, gérants majoritaires SARL). Cotisations déductibles via Loi Madelin pour les non-AE.',
    related: ['Loi Madelin'],
  },
  {
    term: 'Note de couverture',
    definition:
      "Document temporaire émis par le courtier ou l'assureur attestant qu'une couverture est en cours, en attendant l'émission du contrat définitif. Valeur juridique d'une attestation provisoire.",
  },
  {
    term: 'ORIAS',
    definition:
      'Registre Unique des Intermédiaires en Assurance, Banque et Finance. Tout courtier en assurance doit y être immatriculé (art. L. 512-1 C. assur.). Vérifiable sur orias.fr. Cliquabilité obligatoire sur les sites courtiers (arrêté 6 décembre 2022).',
    related: ['ACPR', 'CSCA'],
  },
  {
    term: 'Plafond de garantie',
    definition:
      "Montant maximum versé par l'assureur en cas de sinistre. Peut être par sinistre, par année, par garantie. Pour la RC Pro : généralement 0,5 à 5 M€. Pour les chirurgiens : jusqu'à 25 M€.",
  },
  {
    term: "Prime d'assurance",
    definition:
      "Cotisation versée par l'assuré à l'assureur en contrepartie de la couverture. Calculée selon le risque, le profil, les garanties choisies. Payable en une fois (annuelle) ou fractionnée (mensuelle — trimestrielle).",
  },
  {
    term: 'Profession réglementée',
    definition:
      "Profession dont l'accès et l'exercice sont encadrés par la loi (médecins, avocats, notaires, agents immobiliers, experts-comptables, etc.). La RC Pro est OBLIGATOIRE pour ces professions.",
  },
  {
    term: "Quittance d'assurance",
    definition:
      "Reçu fiscal délivré par l'assureur après paiement de la prime, attestant que la couverture est active pour la période. Document à conserver pour la déduction fiscale (BIC, BNC).",
  },
  {
    term: 'Ratio S/P (Sinistres ou Primes)',
    definition:
      "Indicateur calculé par les assureurs : montant des sinistres payés — primes encaissées. Si > 100%, l'assureur est en perte. Détermine le tarif applicable l'année suivante (surprime, refus).",
  },
  {
    term: 'RC Exploitation',
    definition:
      'Couvre les dommages causés à des tiers EN DEHORS de la prestation pro (ex : un client glisse dans vos locaux). À distinguer de la RC Pro qui couvre les dommages liés au métier.',
  },
  {
    term: 'RC Pro (Responsabilité Civile Professionnelle)',
    definition:
      "Assurance couvrant les dommages corporels, matériels et immatériels causés à des tiers dans l'exercice du métier. Obligatoire pour les professions réglementées (médical, juridique, immobilier).",
    related: ['Loi Kouchner'],
  },
  {
    term: 'RCP renforcée (courtier)',
    definition:
      "Responsabilité Civile Professionnelle obligatoire pour les courtiers ORIAS (art. L. 512-6 C. assur.). Plafond minimum 1,85M€ par sinistre — 2,5M€ par an. Notre cabinet est doté d'une RCP renforcée 5M€ ou 7,5M€.",
  },
  {
    term: 'Réception (des travaux)',
    definition:
      "Acte par lequel le maître d'ouvrage déclare accepter l'ouvrage. Point de départ des garanties légales (parfait achèvement 1 an, biennale 2 ans, décennale 10 ans).",
    related: ['Décennale'],
  },
  {
    term: 'Recommandation ACPR 2024-R-02',
    definition:
      'Recommandation du 2 juillet 2024 sur le traitement des réclamations. Applicable au 31 décembre 2025. Impose accusé réception 10 jours, réponse fond 2 mois, registre + reporting interne mensuel.',
    related: ['ACPR'],
  },
  {
    term: 'Recommandation ACPR 2024-R-03',
    definition:
      'Recommandation du 21 novembre 2024 sur le recueil des informations relatives au client (devoir de conseil DDA). Applicable au 31 décembre 2025. Durcit la traçabilité du conseil personnalisé.',
    related: ['DDA', 'Devoir de conseil'],
  },
  {
    term: 'Sinistralité',
    definition:
      'Taux de fréquence des sinistres pour un métier ou une activité. Calculé par les observatoires sectoriels (AQC SYCODÉS pour le BTP). Détermine le tarif appliqué par les assureurs.',
  },
  {
    term: 'Sous-traitant BTP',
    definition:
      "Entreprise intervenant sur un chantier pour le compte d'une autre. Doit avoir SA propre décennale. Le donneur d'ordre engage sa responsabilité s'il fait appel à un sous-traitant non couvert.",
    related: ['Décennale'],
  },
  {
    term: 'Surprime',
    definition:
      "Majoration de la prime appliquée par l'assureur en cas de risque aggravé : antécédents sinistres, non-conformité, métier à risque, zone à fort sinistre. Peut atteindre +50 à +100% du tarif standard.",
  },
  {
    term: 'TRC (Tous Risques Chantier)',
    definition:
      "Assurance facultative couvrant le chantier lui-même contre tous les risques (vol, incendie, dégradation, intempérie). Souscrite par le maître d'ouvrage ou l'entreprise principale.",
  },
]

function firstLetter(term: string): string {
  return term[0]?.toUpperCase() ?? '#'
}

const ALPHABET = Array.from(new Set(TERMS.map((t) => firstLetter(t.term))))
  .filter(Boolean)
  .sort()

const TERMS_BY_LETTER = ALPHABET.map((letter) => ({
  letter,
  items: TERMS.filter((t) => firstLetter(t.term) === letter),
}))

export default function GlossairePage() {
  return (
    <main className="min-h-screen bg-sand-50 dark:bg-charcoal-950">
      <BreadcrumbSchema items={[{ label: 'Glossaire' }]} />
      {/* Hero */}
      <section className="noise-overlay relative overflow-hidden bg-charcoal-900 py-16 text-white md:py-24">
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
            <span className="text-white">Glossaire</span>
          </nav>

          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
            <BookOpen className="h-3.5 w-3.5 text-secondary-300" strokeWidth={2.4} />
            Référentiel terminologique
          </span>
          <h1 className="mb-5 max-w-3xl font-display-premium font-heading text-4xl font-extrabold leading-[1.05] tracking-display sm:text-5xl md:text-6xl">
            Glossaire de
            <br />
            <span className="text-secondary-200">l&apos;assurance pro</span>
          </h1>
          <p className="max-w-2xl text-lg text-white/85 md:text-xl">
            {TERMS.length}+ définitions claires et sourcées (Code des assurances, ACPR, DDA, Loi
            Spinetta&hellip;) rédigées par nos courtiers ORIAS.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/75">
            <span className="inline-flex items-center gap-1.5">
              <Hash className="h-4 w-4 text-secondary-300" strokeWidth={2.4} />
              {TERMS.length} termes
            </span>
            <span className="hidden text-white/30 sm:inline">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Search className="h-4 w-4 text-secondary-300" strokeWidth={2.4} />
              {ALPHABET.length} lettres
            </span>
            <span className="hidden text-white/30 sm:inline">·</span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-secondary-300" strokeWidth={2.4} />
              Sources Légifrance &amp; ACPR
            </span>
          </div>
        </div>
      </section>

      {/* Nav alphabétique sticky */}
      <section className="sticky top-[68px] z-30 border-b border-charcoal-100 bg-white/95 py-4 backdrop-blur-md">
        <div className="container mx-auto max-w-6xl px-4">
          <nav aria-label="Navigation alphabétique" className="flex flex-wrap items-center gap-1.5">
            <span className="mr-1 text-xs font-extrabold uppercase tracking-wider text-charcoal-500">
              Index&nbsp;:
            </span>
            {ALPHABET.map((letter) => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="inline-flex h-8 min-w-[2rem] items-center justify-center rounded-lg border border-charcoal-200 bg-white px-2 text-sm font-extrabold text-charcoal-800 transition-all hover:-translate-y-0.5 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700"
              >
                {letter}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4 py-14">
        {/* Termes groupés par lettre */}
        <div className="space-y-12">
          {TERMS_BY_LETTER.map(({ letter, items }) => (
            <section key={letter} id={`letter-${letter}`} className="scroll-mt-40">
              <div className="mb-6 flex items-center gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 font-heading text-2xl font-extrabold text-white shadow-glow-clay">
                  {letter}
                </span>
                <div className="flex-1">
                  <h2 className="font-heading text-2xl font-extrabold tracking-tight text-charcoal-900">
                    Termes en {letter}
                  </h2>
                  <p className="text-sm text-charcoal-500">
                    {items.length} terme{items.length > 1 ? 's' : ''}
                  </p>
                </div>
                <div className="hidden h-px flex-1 bg-gradient-to-r from-charcoal-200 to-transparent md:block" />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {items.map((t) => (
                  <article
                    key={t.term}
                    className="group relative overflow-hidden rounded-2xl border border-charcoal-100 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-premium"
                  >
                    <span
                      className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary-500 to-primary-700 opacity-60 transition-opacity group-hover:opacity-100"
                      aria-hidden="true"
                    />
                    <h3 className="mb-2 font-heading text-base font-extrabold leading-tight tracking-tight text-charcoal-900 md:text-lg">
                      {t.term}
                    </h3>
                    <p className="text-sm leading-relaxed text-charcoal-700">{t.definition}</p>
                    {t.related &&
                      t.related.length > 0 &&
                      (() => {
                        const related = t.related
                        return (
                          <div className="mt-4 flex flex-wrap items-center gap-1.5 border-t border-charcoal-100 pt-3">
                            <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-charcoal-500">
                              <Link2 className="h-3 w-3" strokeWidth={2.4} />
                              Voir aussi
                            </span>
                            {related.map((r) => (
                              <span
                                key={r}
                                className="inline-flex items-center rounded-full bg-primary-50 px-2 py-0.5 text-[11px] font-bold text-primary-700"
                              >
                                {r}
                              </span>
                            ))}
                          </div>
                        )
                      })()}
                  </article>
                ))}
              </div>
            </section>
          ))}
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
                Conseil personnalisé
              </span>
              <h2 className="mb-2 font-heading text-3xl font-extrabold tracking-display md:text-4xl">
                Une question sur un terme&nbsp;?
              </h2>
              <p className="max-w-xl text-base text-white/85 md:text-lg">
                Notre équipe ORIAS vous explique les subtilités d&apos;un contrat ou d&apos;une
                clause, gratuitement et sans engagement.
              </p>
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
    </main>
  )
}
