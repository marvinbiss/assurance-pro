'use client'

/**
 * TarifCalculator — estimateur tarifaire interactif par garantie.
 *
 * Calcul 100% local (pas d'API) : prix = base_métier × ca_multiplier × statut_modifier.
 * Affichage range "min €/an → max €/an" en Fraunces tabular-nums.
 *
 * Accessibilité : aria-labels sur tous les contrôles, focus rings primary-400,
 * respecte prefers-reduced-motion (via RevealOnScroll).
 */

import Link from 'next/link'
import { useId, useMemo, useState } from 'react'
import { ArrowRight, Calculator, TrendingDown } from 'lucide-react'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'

type Garantie = 'decennale' | 'rc-pro' | 'multirisque-pro' | 'cyber'
type Statut = 'auto-entrepreneur' | 'sarl' | 'sas'

export interface TarifCalculatorProps {
  garantie: Garantie
  className?: string
}

interface MetierOption {
  readonly value: string
  readonly label: string
  /** Prix de base annuel pour CA = 80k€ et statut SARL (€). */
  readonly base: number
  /** Spread minimal autour de la base pour le range affiché (ex: 0.25 → ±25%). */
  readonly spread: number
}

// ---------------------------------------------------------------------------
// Catalogues métiers — tarifs base France 2026, indicatifs.
// ---------------------------------------------------------------------------

const METIERS_DECENNALE: readonly MetierOption[] = [
  { value: 'plombier', label: 'Plombier chauffagiste', base: 1100, spread: 0.32 },
  { value: 'electricien', label: 'Électricien', base: 900, spread: 0.33 },
  { value: 'macon', label: 'Maçon', base: 1700, spread: 0.3 },
  { value: 'couvreur', label: 'Couvreur', base: 2000, spread: 0.25 },
  { value: 'peintre', label: 'Peintre en bâtiment', base: 750, spread: 0.33 },
  { value: 'menuisier', label: 'Menuisier', base: 1050, spread: 0.3 },
  { value: 'carreleur', label: 'Carreleur', base: 950, spread: 0.32 },
  { value: 'platrier', label: 'Plâtrier-plaquiste', base: 850, spread: 0.3 },
  { value: 'terrassier', label: 'Terrassier / VRD', base: 1600, spread: 0.3 },
  { value: 'charpentier', label: 'Charpentier', base: 1800, spread: 0.28 },
  { value: 'chauffagiste', label: 'Chauffagiste / clim', base: 1200, spread: 0.3 },
  { value: 'paysagiste', label: 'Paysagiste avec gros œuvre', base: 950, spread: 0.32 },
] as const

const METIERS_RC_PRO: readonly MetierOption[] = [
  { value: 'consultant', label: 'Consultant indépendant', base: 320, spread: 0.4 },
  { value: 'freelance-it', label: 'Freelance IT / dev', base: 420, spread: 0.42 },
  { value: 'agence-web', label: 'Agence web / digitale', base: 580, spread: 0.4 },
  { value: 'coach', label: 'Coach / formateur', base: 280, spread: 0.4 },
  { value: 'graphiste', label: 'Graphiste / designer', base: 260, spread: 0.4 },
  { value: 'photographe', label: 'Photographe / vidéaste', base: 340, spread: 0.4 },
  { value: 'avocat-conseil', label: 'Avocat / conseil juridique', base: 720, spread: 0.35 },
  { value: 'comptable', label: 'Comptable / expert-comptable', base: 650, spread: 0.35 },
  { value: 'architecte-interieur', label: 'Architecte d’intérieur', base: 480, spread: 0.38 },
  { value: 'redacteur', label: 'Rédacteur / traducteur', base: 220, spread: 0.4 },
] as const

const METIERS_MULTIRISQUE: readonly MetierOption[] = [
  { value: 'commerce-detail', label: 'Commerce de détail', base: 540, spread: 0.35 },
  { value: 'restaurant', label: 'Restaurant / brasserie', base: 980, spread: 0.32 },
  { value: 'salon-coiffure', label: 'Salon coiffure / esthétique', base: 460, spread: 0.35 },
  { value: 'bureau-services', label: 'Bureau / activité de services', base: 380, spread: 0.36 },
  { value: 'atelier-artisan', label: 'Atelier artisan', base: 620, spread: 0.34 },
  { value: 'cabinet-medical', label: 'Cabinet médical / paramédical', base: 540, spread: 0.33 },
  { value: 'boulangerie', label: 'Boulangerie / pâtisserie', base: 880, spread: 0.32 },
  { value: 'garage-auto', label: 'Garage automobile', base: 1180, spread: 0.3 },
  { value: 'pharmacie', label: 'Pharmacie / officine', base: 1320, spread: 0.28 },
  { value: 'hotel', label: 'Hôtellerie', base: 1450, spread: 0.3 },
] as const

const METIERS_CYBER: readonly MetierOption[] = [
  { value: 'tpe-services', label: 'TPE services (<10 salariés)', base: 480, spread: 0.4 },
  { value: 'pme-services', label: 'PME services (10-50)', base: 1200, spread: 0.38 },
  { value: 'ecommerce', label: 'E-commerce / marketplace', base: 1450, spread: 0.4 },
  { value: 'editeur-saas', label: 'Éditeur SaaS / tech', base: 1800, spread: 0.38 },
  { value: 'cabinet-conseil', label: 'Cabinet conseil / audit', base: 920, spread: 0.36 },
  { value: 'sante', label: 'Acteur santé / cabinet', base: 1650, spread: 0.35 },
  { value: 'industrie-pme', label: 'Industrie / PME production', base: 1380, spread: 0.36 },
  { value: 'media-agence', label: 'Média / agence', base: 780, spread: 0.38 },
  { value: 'finance-courtage', label: 'Finance / courtage', base: 2100, spread: 0.34 },
  { value: 'association', label: 'Association / ESS', base: 360, spread: 0.4 },
] as const

const METIERS_BY_GARANTIE: Readonly<Record<Garantie, readonly MetierOption[]>> = {
  decennale: METIERS_DECENNALE,
  'rc-pro': METIERS_RC_PRO,
  'multirisque-pro': METIERS_MULTIRISQUE,
  cyber: METIERS_CYBER,
}

const GARANTIE_LABELS: Readonly<Record<Garantie, string>> = {
  decennale: 'Décennale BTP',
  'rc-pro': 'RC Pro',
  'multirisque-pro': 'Multirisque Pro',
  cyber: 'Cyber-assurance',
}

const STATUT_MODIFIER: Readonly<Record<Statut, number>> = {
  'auto-entrepreneur': 0.82,
  sarl: 1.0,
  sas: 1.06,
}

const STATUTS: readonly { readonly value: Statut; readonly label: string }[] = [
  { value: 'auto-entrepreneur', label: 'Auto-entrepreneur' },
  { value: 'sarl', label: 'SARL' },
  { value: 'sas', label: 'SAS / SASU' },
] as const

// ---------------------------------------------------------------------------
// Formules de calcul
// ---------------------------------------------------------------------------

const CA_REF = 80_000

/** Multiplicateur CA — courbe sous-linéaire, plafonnée. */
function caMultiplier(caEuros: number): number {
  // Garantit > 0 même si l'utilisateur descend à 0
  const ca = Math.max(caEuros, 5_000)
  // Mix log/lin pour adoucir la pente sur les gros CA
  return 0.55 + 0.45 * Math.pow(ca / CA_REF, 0.55)
}

function computeRange(
  metier: MetierOption,
  ca: number,
  statut: Statut
): {
  min: number
  max: number
} {
  const mid = metier.base * caMultiplier(ca) * STATUT_MODIFIER[statut]
  const min = Math.round((mid * (1 - metier.spread)) / 10) * 10
  const max = Math.round((mid * (1 + metier.spread)) / 10) * 10
  return { min, max }
}

const eurosFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'decimal',
  maximumFractionDigits: 0,
})

function formatEuros(n: number): string {
  return `${eurosFormatter.format(n)} €`
}

function formatCaShort(n: number): string {
  if (n >= 1000) return `${Math.round(n / 1000)} k€`
  return `${n} €`
}

// ---------------------------------------------------------------------------
// Composant
// ---------------------------------------------------------------------------

export function TarifCalculator({ garantie, className = '' }: TarifCalculatorProps) {
  const metiers = METIERS_BY_GARANTIE[garantie]
  const firstMetier = metiers[0]
  // Garde-fou TS: la liste est toujours non vide, mais noUncheckedIndexedAccess
  // nous force à expliciter le fallback.
  const defaultMetierValue = firstMetier ? firstMetier.value : ''

  const [metierValue, setMetierValue] = useState<string>(defaultMetierValue)
  const [ca, setCa] = useState<number>(80_000)
  const [statut, setStatut] = useState<Statut>('sarl')

  const selectedMetier = useMemo<MetierOption | undefined>(
    () => metiers.find((m) => m.value === metierValue),
    [metiers, metierValue]
  )

  const range = useMemo(() => {
    if (!selectedMetier) return { min: 0, max: 0 }
    return computeRange(selectedMetier, ca, statut)
  }, [selectedMetier, ca, statut])

  const reactId = useId()
  const metierId = `${reactId}-metier`
  const caId = `${reactId}-ca`
  const statutGroupId = `${reactId}-statut`
  const resultId = `${reactId}-result`

  return (
    <RevealOnScroll className={className}>
      <section
        aria-labelledby={`${reactId}-title`}
        className="rounded-2xl border border-sand-300 bg-white p-8 shadow-md md:p-10"
      >
        <header className="mb-6 flex items-start gap-3">
          <span
            aria-hidden
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600"
          >
            <Calculator className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wider text-charcoal-500">
              Estimateur tarifaire
            </p>
            <h3
              id={`${reactId}-title`}
              className="font-heading text-xl font-semibold leading-tight text-charcoal-900 md:text-2xl"
            >
              {GARANTIE_LABELS[garantie]} — votre fourchette annuelle
            </h3>
          </div>
        </header>

        {/* Inputs */}
        <div className="grid gap-5 md:grid-cols-2">
          {/* Métier */}
          <div className="md:col-span-2">
            <label
              htmlFor={metierId}
              className="mb-1.5 block text-sm font-medium text-charcoal-800"
            >
              Métier / activité
            </label>
            <select
              id={metierId}
              value={metierValue}
              onChange={(e) => setMetierValue(e.target.value)}
              aria-label="Sélection du métier"
              className="w-full appearance-none rounded-lg border border-sand-300 bg-white px-3.5 py-2.5 text-sm text-charcoal-900 shadow-sm transition-colors hover:border-sand-400 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/40"
            >
              {metiers.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          {/* CA slider */}
          <div className="md:col-span-2">
            <div className="mb-1.5 flex items-baseline justify-between">
              <label htmlFor={caId} className="text-sm font-medium text-charcoal-800">
                Chiffre d&apos;affaires annuel
              </label>
              <span className="text-sm font-semibold tabular-nums text-charcoal-900">
                {formatCaShort(ca)}
              </span>
            </div>
            <input
              id={caId}
              type="range"
              min={0}
              max={500_000}
              step={10_000}
              value={ca}
              onChange={(e) => setCa(Number(e.target.value))}
              aria-label="Chiffre d'affaires annuel en euros"
              aria-valuemin={0}
              aria-valuemax={500_000}
              aria-valuenow={ca}
              aria-valuetext={`${formatCaShort(ca)} de chiffre d'affaires annuel`}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-sand-200 accent-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-400/40"
            />
            <div className="mt-1 flex justify-between text-[11px] tabular-nums text-charcoal-500">
              <span>0 €</span>
              <span>250 k€</span>
              <span>500 k€</span>
            </div>
          </div>

          {/* Statut radio */}
          <div className="md:col-span-2">
            <span id={statutGroupId} className="mb-1.5 block text-sm font-medium text-charcoal-800">
              Statut juridique
            </span>
            <div
              role="radiogroup"
              aria-labelledby={statutGroupId}
              className="grid grid-cols-1 gap-2 sm:grid-cols-3"
            >
              {STATUTS.map((s) => {
                const checked = statut === s.value
                return (
                  <label
                    key={s.value}
                    className={`flex cursor-pointer items-center justify-center rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors focus-within:ring-2 focus-within:ring-primary-400/40 ${
                      checked
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-sand-300 bg-white text-charcoal-800 hover:border-sand-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name={statutGroupId}
                      value={s.value}
                      checked={checked}
                      onChange={() => setStatut(s.value)}
                      aria-label={`Statut ${s.label}`}
                      className="sr-only"
                    />
                    {s.label}
                  </label>
                )
              })}
            </div>
          </div>
        </div>

        {/* Résultat */}
        <div
          id={resultId}
          aria-live="polite"
          className="mt-8 rounded-xl border border-sand-200 bg-gradient-to-br from-sand-50 to-white p-5 md:p-6"
        >
          <p className="mb-1 text-[11px] font-medium uppercase tracking-wider text-charcoal-500">
            Fourchette indicative
          </p>
          <p
            className="font-display text-3xl font-medium tabular-nums leading-tight text-charcoal-900 md:text-4xl"
            style={{ fontFamily: 'var(--font-heading), Fraunces, serif', fontWeight: 500 }}
          >
            {formatEuros(range.min)}
            <span className="mx-2 text-charcoal-400">→</span>
            {formatEuros(range.max)}
            <span className="font-body ml-1 align-baseline text-base font-normal text-charcoal-600">
              /an
            </span>
          </p>
          <p className="mt-2 flex items-start gap-1.5 text-xs leading-relaxed text-charcoal-600">
            <TrendingDown className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-500" aria-hidden />
            <span>
              Estimation indicative basée sur métier, CA et statut. Tarif définitif après étude
              dossier (sinistralité, ancienneté, garanties spécifiques).
            </span>
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/devis"
              aria-label="Obtenir un devis exact sous 24 heures"
              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2"
            >
              Devis exact en 24h
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <span className="text-xs text-charcoal-500">Sans engagement · réponse 24h ouvrées</span>
          </div>
        </div>
      </section>
    </RevealOnScroll>
  )
}
