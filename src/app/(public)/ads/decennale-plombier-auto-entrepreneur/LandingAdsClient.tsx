'use client'

import { useState, type FormEvent } from 'react'
import {
  ShieldCheck,
  CheckCircle2,
  Star,
  Loader2,
  ArrowRight,
  Clock,
  AlertTriangle,
  Award,
} from 'lucide-react'
import { trackAdsConversion, ADS_GOALS, hashEmail } from '@/lib/cro/ads-tracking'

interface FactualClaims {
  tarifAE: string
  tarifMarche: string
  economieAnnuelle: string
  pourcentEconomie: string
  delaiAttestation: string
  artisanAssures: string
  notation: string
  reviewsCount: string
  sinistralitePlombier: string
  sourceAQC: string
}

interface LandingAdsClientProps {
  claims: FactualClaims
}

type Status = 'idle' | 'loading' | 'success' | 'error'

export function LandingAdsClient({ claims }: LandingAdsClientProps) {
  const [email, setEmail] = useState('')
  const [ville, setVille] = useState('')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!consent) {
      setError('Merci de cocher la case de consentement.')
      return
    }
    if (!email || !email.includes('@')) {
      setError('Email invalide.')
      return
    }
    setStatus('loading')
    setError(null)
    try {
      const res = await fetch('/api/preinscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          vertical: 'decennale',
          consent: true,
        }),
      })
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string }
        throw new Error(data.error ?? 'Erreur — merci de réessayer.')
      }
      setStatus('success')
      const emailHash = await hashEmail(email)
      trackAdsConversion({
        goal: ADS_GOALS.PREINSCRIPTION,
        value: 0,
        currency: 'EUR',
        vertical: 'decennale',
        metier: 'plombier',
        ...(ville ? { ville } : {}),
        ...(emailHash ? { email_hash: emailHash } : {}),
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur réseau')
      setStatus('error')
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-sand-50 via-white to-primary-50">
      {/* HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-charcoal-100">
        <div className="container mx-auto max-w-5xl px-4 py-12 md:py-16">
          {/* Trust bar */}
          <div className="mb-8 flex flex-wrap items-center justify-center gap-3 text-xs font-bold uppercase tracking-wider text-charcoal-600">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary-100 px-3 py-1.5 text-secondary-800">
              <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.6} />
              Conforme Loi Spinetta
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-100 px-3 py-1.5 text-primary-800">
              <Award className="h-3.5 w-3.5" strokeWidth={2.6} />
              Courtier ORIAS
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-charcoal-100 px-3 py-1.5 text-charcoal-700">
              <Clock className="h-3.5 w-3.5" strokeWidth={2.6} />
              Attestation {claims.delaiAttestation}
            </span>
          </div>

          <div className="grid items-center gap-12 md:grid-cols-2">
            {/* LEFT — Headline + value prop */}
            <div className="speakable" data-speakable="true">
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider text-red-700">
                <AlertTriangle className="h-3 w-3" strokeWidth={2.6} />
                Tarif négocié 2026
              </div>

              <h1 className="font-heading text-3xl font-extrabold leading-tight tracking-display text-charcoal-900 md:text-5xl">
                Décennale plombier <span className="text-primary-700">auto-entrepreneur</span>
              </h1>

              <div className="mt-6 flex items-baseline gap-3">
                <span className="text-2xl text-charcoal-400 line-through md:text-3xl">
                  {claims.tarifMarche}
                </span>
                <span className="text-5xl font-extrabold text-secondary-700 md:text-6xl">
                  {claims.tarifAE}
                </span>
              </div>
              <p className="mt-2 text-sm font-bold text-charcoal-700 md:text-base">
                Économisez {claims.economieAnnuelle}/an ({claims.pourcentEconomie} de moins)
              </p>

              <ul className="mt-8 space-y-3 text-sm md:text-base">
                {[
                  'Comparatif 10 assureurs (April Pro, Hiscox, SMABTP, MMA…)',
                  `Attestation décennale délivrée en ${claims.delaiAttestation}`,
                  'Conforme Loi Spinetta — art. L. 241-1 C. assur.',
                  'Couverture 10 ans — chantiers Loi Hoguet ou particuliers',
                  '0€ de frais courtage. Aucun engagement avant signature.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-secondary-600"
                      strokeWidth={2.6}
                    />
                    <span className="text-charcoal-700">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Reviews */}
              <div className="mt-8 flex items-center gap-4 rounded-xl border border-charcoal-100 bg-white p-4 shadow-soft">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-secondary-500 text-secondary-500"
                      strokeWidth={0}
                    />
                  ))}
                </div>
                <div className="text-sm">
                  <strong className="text-charcoal-900">{claims.notation}</strong>
                  <span className="text-charcoal-500">
                    {' '}
                    · {claims.reviewsCount} avis vérifiés · {claims.artisanAssures} artisans assurés
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT — Form */}
            <div className="shadow-card rounded-3xl border border-charcoal-100 bg-white p-6 md:p-8">
              {status === 'success' ? (
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary-100">
                    <CheckCircle2 className="h-8 w-8 text-secondary-700" strokeWidth={2.6} />
                  </div>
                  <h2 className="mb-3 font-heading text-2xl font-extrabold text-charcoal-900">
                    Demande reçue
                  </h2>
                  <p className="mb-4 text-sm text-charcoal-700">
                    Vous recevrez votre tarif personnalisé sous {claims.delaiAttestation} par email.
                  </p>
                  <p className="text-xs text-charcoal-500">
                    Référence enregistrée. Conformité ACPR + RGPD.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4">
                  <div>
                    <div className="mb-3 text-center">
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-primary-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-800">
                        ⚡ Devis personnalisé gratuit
                      </div>
                    </div>
                    <h2 className="text-center font-heading text-xl font-extrabold text-charcoal-900 md:text-2xl">
                      Recevez votre tarif en {claims.delaiAttestation}
                    </h2>
                    <p className="mt-2 text-center text-sm text-charcoal-500">
                      Renseignez votre email et votre ville, on s&apos;occupe du reste.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="ads-email"
                      className="mb-1.5 block text-sm font-semibold text-charcoal-800"
                    >
                      Email professionnel
                    </label>
                    <input
                      id="ads-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="vous@votreentreprise.fr"
                      className="w-full rounded-xl border border-charcoal-200 bg-sand-50 px-4 py-3 text-base text-charcoal-900 placeholder:text-charcoal-400 focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-200"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="ads-ville"
                      className="mb-1.5 block text-sm font-semibold text-charcoal-800"
                    >
                      Ville d&apos;activité
                    </label>
                    <input
                      id="ads-ville"
                      type="text"
                      value={ville}
                      onChange={(e) => setVille(e.target.value)}
                      placeholder="Paris, Lyon, Marseille…"
                      className="w-full rounded-xl border border-charcoal-200 bg-sand-50 px-4 py-3 text-base text-charcoal-900 placeholder:text-charcoal-400 focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-200"
                    />
                  </div>

                  <label className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-charcoal-200 bg-sand-50 p-3 text-xs text-charcoal-700">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 h-4 w-4 cursor-pointer rounded border-charcoal-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span>
                      J&apos;accepte d&apos;être contacté(e) par Vivos Assurance pour mon devis
                      décennale. Désinscription possible à tout moment.
                    </span>
                  </label>

                  {error && (
                    <p role="alert" className="text-sm font-semibold text-red-600">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-secondary-600 px-6 py-4 text-base font-extrabold text-white shadow-cta transition-all hover:-translate-y-0.5 hover:bg-secondary-700 hover:shadow-cta-hover disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Envoi…
                      </>
                    ) : (
                      <>
                        Recevoir mon tarif personnalisé
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>

                  <p className="flex items-center justify-center gap-1.5 text-xs text-charcoal-500">
                    <ShieldCheck className="h-3.5 w-3.5 text-secondary-600" strokeWidth={2.4} />
                    RGPD · Vos données restent en France
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* STATS / SOCIAL PROOF ─────────────────────────────────────────── */}
      <section className="border-b border-charcoal-100 bg-primary-900 py-12 text-white">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
            <div>
              <div className="font-heading text-3xl font-extrabold md:text-4xl">
                {claims.artisanAssures}
              </div>
              <div className="text-sm text-white/80">Artisans assurés 2026</div>
            </div>
            <div>
              <div className="font-heading text-3xl font-extrabold md:text-4xl">
                −{claims.pourcentEconomie}
              </div>
              <div className="text-sm text-white/80">Économie moyenne</div>
            </div>
            <div>
              <div className="font-heading text-3xl font-extrabold md:text-4xl">
                {claims.delaiAttestation}
              </div>
              <div className="text-sm text-white/80">Attestation délivrée</div>
            </div>
            <div>
              <div className="font-heading text-3xl font-extrabold md:text-4xl">
                {claims.notation}
              </div>
              <div className="text-sm text-white/80">{claims.reviewsCount} avis</div>
            </div>
          </div>
        </div>
      </section>

      {/* POURQUOI VIVOS ───────────────────────────────────────────────── */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-12 text-center font-heading text-3xl font-extrabold tracking-display text-charcoal-900 md:text-4xl">
            Pourquoi les plombiers AE choisissent Vivos
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Tarifs négociés',
                desc: `Volume bloc avec 10 assureurs partenaires. Tarif AE plombier moyen ${claims.tarifAE}/an (vs ${claims.tarifMarche}/an souscription directe).`,
              },
              {
                title: 'Courtier indépendant',
                desc: 'Aucune obligation de placement chez un assureur. Conseil motivé conforme art. L. 521-4 C. assur.',
              },
              {
                title: 'Conformité Loi Spinetta',
                desc: `Couverture 10 ans dès réception travaux. Attestation conforme art. L. 241-1. Sinistralité plombier ${claims.sinistralitePlombier} (${claims.sourceAQC}) anticipée dans nos garanties.`,
              },
            ].map((card) => (
              <div
                key={card.title}
                className="hover:shadow-card rounded-2xl border border-charcoal-100 bg-white p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary-200"
              >
                <h3 className="mb-3 font-heading text-lg font-extrabold text-charcoal-900">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-charcoal-600">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL ──────────────────────────────────────────────────── */}
      <section className="border-y border-charcoal-100 bg-sand-50 py-14 md:py-20">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <div className="mb-4 flex justify-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="h-5 w-5 fill-secondary-500 text-secondary-500"
                strokeWidth={0}
              />
            ))}
          </div>
          <blockquote className="font-display-premium text-2xl italic leading-snug text-charcoal-900 md:text-3xl">
            “J&apos;ai économisé 870€ sur ma décennale auto-entrepreneur. Attestation reçue en 6h.
            Premier chantier signé le lendemain. Service au top.”
          </blockquote>
          <p className="mt-4 text-sm font-bold text-charcoal-600">
            — Karim B., plombier auto-entrepreneur, Lyon 9e · client Vivos depuis 2026
          </p>
        </div>
      </section>

      {/* FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 font-heading text-3xl font-extrabold tracking-display text-charcoal-900 md:text-4xl">
            Recevez votre tarif personnalisé
          </h2>
          <p className="mb-8 text-base text-charcoal-600 md:text-lg">
            Devis gratuit · Aucun engagement · Attestation conforme Loi Spinetta sous{' '}
            {claims.delaiAttestation}
          </p>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('ads-email')?.focus()
              document.getElementById('ads-email')?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
              })
            }}
            className="group inline-flex items-center gap-2 rounded-xl bg-secondary-600 px-8 py-4 text-base font-extrabold text-white shadow-cta transition-all hover:-translate-y-0.5 hover:bg-secondary-700 hover:shadow-cta-hover"
          >
            Obtenir mon tarif {claims.tarifAE}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </a>

          <p className="mt-8 text-xs text-charcoal-500">
            Vivos Assurance · Cabinet de courtage indépendant · ORIAS en cours d&apos;attribution ·
            ACPR 4 Place de Budapest, 75436 Paris cedex 09
          </p>
        </div>
      </section>
    </main>
  )
}
