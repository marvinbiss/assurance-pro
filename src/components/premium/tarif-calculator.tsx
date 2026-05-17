'use client'

/**
 * TarifCalculator — estimateur tarifaire interactif par garantie.
 *
 * 100% local (zéro API). Chaque verticale a son propre schéma de formulaire
 * et sa propre formule. Aucun champ générique imposé : tout est strict
 * vertical-specific (zéro tolérance).
 *
 * Verticales supportées :
 *   - decennale       : métier BTP + CA + statut + ancienneté + sinistralité
 *   - rc-pro          : profession + CA + statut + activité sensible + effectif
 *   - multirisque-pro : type local + surface m² + valeur contenu + statut
 *   - cyber           : secteur + CA + effectif + données sensibles + statut
 *   - mutuelle-pro    : âge + statut + niveau couverture + ayants droit
 *   - vtc             : zone + ancienneté permis + plateforme + véhicule
 *
 * Tarifs base 2026 France, indicatifs. Fourchette ±spread% autour du mid.
 *
 * A11y : aria-labels, focus rings, radiogroup, aria-live result.
 */

import Link from 'next/link'
import { useId, useMemo, useState } from 'react'
import { ArrowRight, Calculator, TrendingDown } from 'lucide-react'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'

export type Garantie = 'decennale' | 'rc-pro' | 'multirisque-pro' | 'cyber' | 'mutuelle-pro' | 'vtc'

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

const GARANTIE_LABELS: Readonly<Record<Garantie, string>> = {
  decennale: 'Décennale BTP',
  'rc-pro': 'RC Pro',
  'multirisque-pro': 'Multirisque Pro',
  cyber: 'Cyber-assurance',
  'mutuelle-pro': 'Mutuelle TNS / Pro',
  vtc: 'Assurance VTC / Taxi',
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const CA_REF = 80_000

/** Multiplicateur CA — courbe sous-linéaire, plafonnée. */
function caMultiplier(caEuros: number): number {
  const ca = Math.max(caEuros, 5_000)
  return 0.55 + 0.45 * Math.pow(ca / CA_REF, 0.55)
}

function roundTen(n: number): number {
  return Math.round(n / 10) * 10
}

function spreadRange(mid: number, spread: number): { min: number; max: number } {
  return {
    min: roundTen(mid * (1 - spread)),
    max: roundTen(mid * (1 + spread)),
  }
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
// UI sub-components (réutilisés)
// ---------------------------------------------------------------------------

interface SelectFieldProps {
  id: string
  label: string
  ariaLabel: string
  value: string
  onChange: (v: string) => void
  options: readonly { value: string; label: string }[]
  colSpan?: 1 | 2
}

function SelectField({
  id,
  label,
  ariaLabel,
  value,
  onChange,
  options,
  colSpan = 2,
}: SelectFieldProps) {
  return (
    <div className={colSpan === 2 ? 'md:col-span-2' : ''}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-charcoal-800">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={ariaLabel}
        className="w-full appearance-none rounded-lg border border-sand-300 bg-white px-3.5 py-2.5 text-sm text-charcoal-900 shadow-sm transition-colors hover:border-sand-400 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/40"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}

interface SliderFieldProps {
  id: string
  label: string
  ariaLabel: string
  value: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
  display: string
  ticks?: readonly string[]
}

function SliderField({
  id,
  label,
  ariaLabel,
  value,
  min,
  max,
  step,
  onChange,
  display,
  ticks,
}: SliderFieldProps) {
  return (
    <div className="md:col-span-2">
      <div className="mb-1.5 flex items-baseline justify-between">
        <label htmlFor={id} className="text-sm font-medium text-charcoal-800">
          {label}
        </label>
        <span className="text-sm font-semibold tabular-nums text-charcoal-900">{display}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={ariaLabel}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={display}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-sand-200 accent-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-400/40"
      />
      {ticks && (
        <div className="mt-1 flex justify-between text-[11px] tabular-nums text-charcoal-500">
          {ticks.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      )}
    </div>
  )
}

interface RadioGroupFieldProps<T extends string> {
  id: string
  label: string
  value: T
  options: readonly { value: T; label: string }[]
  onChange: (v: T) => void
  /** ariaLabelPrefix devient `${prefix} ${optionLabel}` pour matcher tests. */
  ariaLabelPrefix?: string
  cols?: 2 | 3 | 4
}

function RadioGroupField<T extends string>({
  id,
  label,
  value,
  options,
  onChange,
  ariaLabelPrefix,
  cols = 3,
}: RadioGroupFieldProps<T>) {
  const colsCls = cols === 2 ? 'sm:grid-cols-2' : cols === 4 ? 'sm:grid-cols-4' : 'sm:grid-cols-3'
  return (
    <div className="md:col-span-2">
      <span id={id} className="mb-1.5 block text-sm font-medium text-charcoal-800">
        {label}
      </span>
      <div role="radiogroup" aria-labelledby={id} className={`grid grid-cols-1 gap-2 ${colsCls}`}>
        {options.map((o) => {
          const checked = value === o.value
          const aria = ariaLabelPrefix ? `${ariaLabelPrefix} ${o.label}` : o.label
          return (
            <label
              key={o.value}
              className={`flex cursor-pointer items-center justify-center rounded-lg border px-3 py-2.5 text-center text-sm font-medium transition-colors focus-within:ring-2 focus-within:ring-primary-400/40 ${
                checked
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-sand-300 bg-white text-charcoal-800 hover:border-sand-400'
              }`}
            >
              <input
                type="radio"
                name={id}
                value={o.value}
                checked={checked}
                onChange={() => onChange(o.value)}
                aria-label={aria}
                className="sr-only"
              />
              {o.label}
            </label>
          )
        })}
      </div>
    </div>
  )
}

interface ToggleFieldProps {
  id: string
  label: string
  value: boolean
  onChange: (v: boolean) => void
  hint?: string
}

function ToggleField({ id, label, value, onChange, hint }: ToggleFieldProps) {
  return (
    <div className="md:col-span-2">
      <label
        htmlFor={id}
        className="flex cursor-pointer items-start justify-between gap-3 rounded-lg border border-sand-300 bg-white px-4 py-3 text-sm hover:border-sand-400"
      >
        <span className="flex-1">
          <span className="block font-medium text-charcoal-900">{label}</span>
          {hint && <span className="mt-0.5 block text-[12px] text-charcoal-600">{hint}</span>}
        </span>
        <span className="relative mt-0.5 inline-flex h-6 w-11 shrink-0 items-center">
          <input
            id={id}
            type="checkbox"
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
            className="peer sr-only"
          />
          <span
            aria-hidden
            className="absolute inset-0 rounded-full bg-sand-300 transition-colors peer-checked:bg-primary-500 peer-focus:ring-2 peer-focus:ring-primary-400/40"
          />
          <span
            aria-hidden
            className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5"
          />
        </span>
      </label>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Per-vertical state hooks + compute
// ---------------------------------------------------------------------------

type Range = { min: number; max: number }

// ---- DECENNALE -------------------------------------------------------------

type Anciennete = 'creation' | '1-5ans' | '5plus'
type Sinistralite = '0' | '1' | '2plus'

const ANCIENNETE_MOD: Record<Anciennete, number> = {
  creation: 1.18,
  '1-5ans': 1.0,
  '5plus': 0.92,
}
const SINISTRALITE_MOD: Record<Sinistralite, number> = {
  '0': 1.0,
  '1': 1.18,
  '2plus': 1.45,
}

function useDecennaleForm() {
  const [metierValue, setMetierValue] = useState<string>(METIERS_DECENNALE[0]?.value ?? '')
  const [ca, setCa] = useState<number>(80_000)
  const [statut, setStatut] = useState<Statut>('sarl')
  const [anciennete, setAnciennete] = useState<Anciennete>('1-5ans')
  const [sinistralite, setSinistralite] = useState<Sinistralite>('0')

  const range = useMemo<Range>(() => {
    const metier = METIERS_DECENNALE.find((m) => m.value === metierValue)
    if (!metier) return { min: 0, max: 0 }
    const mid =
      metier.base *
      caMultiplier(ca) *
      STATUT_MODIFIER[statut] *
      ANCIENNETE_MOD[anciennete] *
      SINISTRALITE_MOD[sinistralite]
    return spreadRange(mid, metier.spread)
  }, [metierValue, ca, statut, anciennete, sinistralite])

  return {
    metierValue,
    setMetierValue,
    ca,
    setCa,
    statut,
    setStatut,
    anciennete,
    setAnciennete,
    sinistralite,
    setSinistralite,
    range,
  }
}

// ---- RC PRO ----------------------------------------------------------------

const ACTIVITE_RISQUE_MOD = { standard: 1.0, sensible: 1.28 } as const
type ActiviteRisque = keyof typeof ACTIVITE_RISQUE_MOD

function effectifMultiplier(n: number): number {
  // Sous-linéaire : 0 salarié = 1.0, 10 = ~1.3, 50 = ~1.85
  return 1 + 0.18 * Math.pow(Math.max(n, 0), 0.55)
}

function useRcProForm() {
  const [metierValue, setMetierValue] = useState<string>(METIERS_RC_PRO[0]?.value ?? '')
  const [ca, setCa] = useState<number>(80_000)
  const [statut, setStatut] = useState<Statut>('sarl')
  const [activite, setActivite] = useState<ActiviteRisque>('standard')
  const [effectif, setEffectif] = useState<number>(0)

  const range = useMemo<Range>(() => {
    const metier = METIERS_RC_PRO.find((m) => m.value === metierValue)
    if (!metier) return { min: 0, max: 0 }
    const mid =
      metier.base *
      caMultiplier(ca) *
      STATUT_MODIFIER[statut] *
      ACTIVITE_RISQUE_MOD[activite] *
      effectifMultiplier(effectif)
    return spreadRange(mid, metier.spread)
  }, [metierValue, ca, statut, activite, effectif])

  return {
    metierValue,
    setMetierValue,
    ca,
    setCa,
    statut,
    setStatut,
    activite,
    setActivite,
    effectif,
    setEffectif,
    range,
  }
}

// ---- MULTIRISQUE -----------------------------------------------------------

function surfaceMultiplier(m2: number): number {
  // 50m² = 1.0, 200m² = ~1.7, 500m² = ~2.5
  return 0.6 + 0.4 * Math.pow(Math.max(m2, 10) / 50, 0.6)
}
function contenuMultiplier(eur: number): number {
  // 20k = 1.0, 100k = ~1.5, 500k = ~2.3
  return 0.7 + 0.3 * Math.pow(Math.max(eur, 5_000) / 20_000, 0.55)
}

function useMultirisqueForm() {
  const [metierValue, setMetierValue] = useState<string>(METIERS_MULTIRISQUE[0]?.value ?? '')
  const [surface, setSurface] = useState<number>(80)
  const [contenu, setContenu] = useState<number>(40_000)
  const [statut, setStatut] = useState<Statut>('sarl')

  const range = useMemo<Range>(() => {
    const metier = METIERS_MULTIRISQUE.find((m) => m.value === metierValue)
    if (!metier) return { min: 0, max: 0 }
    const mid =
      metier.base *
      surfaceMultiplier(surface) *
      contenuMultiplier(contenu) *
      STATUT_MODIFIER[statut]
    return spreadRange(mid, metier.spread)
  }, [metierValue, surface, contenu, statut])

  return {
    metierValue,
    setMetierValue,
    surface,
    setSurface,
    contenu,
    setContenu,
    statut,
    setStatut,
    range,
  }
}

// ---- CYBER -----------------------------------------------------------------

function useCyberForm() {
  const [metierValue, setMetierValue] = useState<string>(METIERS_CYBER[0]?.value ?? '')
  const [ca, setCa] = useState<number>(80_000)
  const [statut, setStatut] = useState<Statut>('sarl')
  const [effectif, setEffectif] = useState<number>(5)
  const [dataSensibles, setDataSensibles] = useState<boolean>(false)

  const range = useMemo<Range>(() => {
    const metier = METIERS_CYBER.find((m) => m.value === metierValue)
    if (!metier) return { min: 0, max: 0 }
    const mid =
      metier.base *
      caMultiplier(ca) *
      STATUT_MODIFIER[statut] *
      effectifMultiplier(effectif) *
      (dataSensibles ? 1.35 : 1.0)
    return spreadRange(mid, metier.spread)
  }, [metierValue, ca, statut, effectif, dataSensibles])

  return {
    metierValue,
    setMetierValue,
    ca,
    setCa,
    statut,
    setStatut,
    effectif,
    setEffectif,
    dataSensibles,
    setDataSensibles,
    range,
  }
}

// ---- MUTUELLE PRO ----------------------------------------------------------

type NiveauMutuelle = 'eco' | 'median' | 'premium'

const NIVEAU_BASE: Record<NiveauMutuelle, number> = {
  eco: 480,
  median: 780,
  premium: 1180,
}
const NIVEAU_SPREAD: Record<NiveauMutuelle, number> = {
  eco: 0.28,
  median: 0.26,
  premium: 0.24,
}

function ageMultiplier(age: number): number {
  // 30 ans = 1.0, 50 ans = ~1.45, 60 ans = ~1.78
  const a = Math.max(age, 18)
  return 0.7 + 0.012 * (a - 18) + 0.0006 * Math.pow(Math.max(a - 30, 0), 2)
}

function useMutuelleForm() {
  const [age, setAge] = useState<number>(40)
  const [statut, setStatut] = useState<Statut>('sarl')
  const [niveau, setNiveau] = useState<NiveauMutuelle>('median')
  const [ayantsDroit, setAyantsDroit] = useState<'0' | '1' | '2' | '3plus'>('0')

  const range = useMemo<Range>(() => {
    const ayantsMul =
      ayantsDroit === '0' ? 1 : ayantsDroit === '1' ? 1.45 : ayantsDroit === '2' ? 1.85 : 2.3
    const mid = NIVEAU_BASE[niveau] * ageMultiplier(age) * STATUT_MODIFIER[statut] * ayantsMul
    return spreadRange(mid, NIVEAU_SPREAD[niveau])
  }, [age, statut, niveau, ayantsDroit])

  return { age, setAge, statut, setStatut, niveau, setNiveau, ayantsDroit, setAyantsDroit, range }
}

// ---- VTC -------------------------------------------------------------------

type ZoneVtc = 'paris' | 'idf' | 'grande-ville' | 'regions'
type Vehicule = 'standard' | 'premium' | 'van'
type Plateforme = 'uber-bolt' | 'taxi'

const ZONE_BASE: Record<ZoneVtc, number> = {
  paris: 2600,
  idf: 2100,
  'grande-ville': 1700,
  regions: 1400,
}
const ZONE_SPREAD: Record<ZoneVtc, number> = {
  paris: 0.28,
  idf: 0.3,
  'grande-ville': 0.32,
  regions: 0.34,
}
const VEHICULE_MOD: Record<Vehicule, number> = { standard: 1.0, premium: 1.22, van: 1.35 }
const PLATEFORME_MOD: Record<Plateforme, number> = { 'uber-bolt': 1.0, taxi: 0.92 }

function permisMultiplier(years: number): number {
  // 2 ans = 1.4 (jeune), 5 ans = 1.15, 10 ans = 1.0, 20+ = 0.92
  const y = Math.max(years, 2)
  if (y < 5) return 1.55 - 0.075 * (y - 2)
  if (y < 10) return 1.32 - 0.04 * (y - 5)
  return Math.max(0.92, 1.12 - 0.012 * (y - 10))
}

function useVtcForm() {
  const [zone, setZone] = useState<ZoneVtc>('paris')
  const [permis, setPermis] = useState<number>(8)
  const [vehicule, setVehicule] = useState<Vehicule>('standard')
  const [plateforme, setPlateforme] = useState<Plateforme>('uber-bolt')
  const [statut, setStatut] = useState<Statut>('auto-entrepreneur')

  const range = useMemo<Range>(() => {
    const mid =
      ZONE_BASE[zone] *
      permisMultiplier(permis) *
      VEHICULE_MOD[vehicule] *
      PLATEFORME_MOD[plateforme] *
      STATUT_MODIFIER[statut]
    return spreadRange(mid, ZONE_SPREAD[zone])
  }, [zone, permis, vehicule, plateforme, statut])

  return {
    zone,
    setZone,
    permis,
    setPermis,
    vehicule,
    setVehicule,
    plateforme,
    setPlateforme,
    statut,
    setStatut,
    range,
  }
}

// ---------------------------------------------------------------------------
// Shared statut radio (réutilisé par toutes verticales)
// ---------------------------------------------------------------------------

function StatutField({
  id,
  value,
  onChange,
}: {
  id: string
  value: Statut
  onChange: (v: Statut) => void
}) {
  return (
    <RadioGroupField<Statut>
      id={id}
      label="Statut juridique"
      value={value}
      options={STATUTS}
      onChange={onChange}
      ariaLabelPrefix="Statut"
    />
  )
}

// ---------------------------------------------------------------------------
// Per-vertical form renderers
// ---------------------------------------------------------------------------

function DecennaleFields({ ids }: { ids: Record<string, string> }) {
  const f = useDecennaleForm()
  return (
    <>
      <div className="grid gap-5 md:grid-cols-2">
        <SelectField
          id={ids.metier!}
          label="Métier BTP"
          ariaLabel="Sélection du métier"
          value={f.metierValue}
          onChange={f.setMetierValue}
          options={METIERS_DECENNALE}
        />
        <SliderField
          id={ids.ca!}
          label="Chiffre d'affaires annuel"
          ariaLabel="Chiffre d'affaires annuel en euros"
          value={f.ca}
          min={0}
          max={500_000}
          step={10_000}
          onChange={f.setCa}
          display={formatCaShort(f.ca)}
          ticks={['0 €', '250 k€', '500 k€']}
        />
        <StatutField id={ids.statut!} value={f.statut} onChange={f.setStatut} />
        <RadioGroupField<Anciennete>
          id={ids.anciennete!}
          label="Ancienneté entreprise"
          value={f.anciennete}
          options={[
            { value: 'creation', label: 'Création (<1 an)' },
            { value: '1-5ans', label: '1 à 5 ans' },
            { value: '5plus', label: 'Plus de 5 ans' },
          ]}
          onChange={f.setAnciennete}
        />
        <RadioGroupField<Sinistralite>
          id={ids.sinistralite!}
          label="Sinistralité 24 derniers mois"
          value={f.sinistralite}
          options={[
            { value: '0', label: '0 sinistre' },
            { value: '1', label: '1 sinistre' },
            { value: '2plus', label: '2 ou +' },
          ]}
          onChange={f.setSinistralite}
        />
      </div>
      <ResultBlock
        range={f.range}
        hint="Tarif décennale soumis à l'attestation Loi Spinetta (art. L. 241-1 C. assur.)."
      />
    </>
  )
}

function RcProFields({ ids }: { ids: Record<string, string> }) {
  const f = useRcProForm()
  return (
    <>
      <div className="grid gap-5 md:grid-cols-2">
        <SelectField
          id={ids.metier!}
          label="Profession"
          ariaLabel="Sélection du métier"
          value={f.metierValue}
          onChange={f.setMetierValue}
          options={METIERS_RC_PRO}
        />
        <SliderField
          id={ids.ca!}
          label="Chiffre d'affaires annuel"
          ariaLabel="Chiffre d'affaires annuel en euros"
          value={f.ca}
          min={0}
          max={500_000}
          step={10_000}
          onChange={f.setCa}
          display={formatCaShort(f.ca)}
          ticks={['0 €', '250 k€', '500 k€']}
        />
        <StatutField id={ids.statut!} value={f.statut} onChange={f.setStatut} />
        <SliderField
          id={ids.effectif!}
          label="Effectif salariés"
          ariaLabel="Nombre de salariés"
          value={f.effectif}
          min={0}
          max={50}
          step={1}
          onChange={f.setEffectif}
          display={`${f.effectif} salarié${f.effectif > 1 ? 's' : ''}`}
          ticks={['0', '25', '50']}
        />
        <RadioGroupField<ActiviteRisque>
          id={ids.activite!}
          label="Type de mission"
          value={f.activite}
          options={[
            { value: 'standard', label: 'Standard' },
            { value: 'sensible', label: 'Sensible (finance / santé / juridique)' },
          ]}
          onChange={f.setActivite}
          cols={2}
        />
      </div>
      <ResultBlock
        range={f.range}
        hint="RC Pro obligatoire pour professions réglementées (art. L. 113-2 C. assur.)."
      />
    </>
  )
}

function MultirisqueFields({ ids }: { ids: Record<string, string> }) {
  const f = useMultirisqueForm()
  return (
    <>
      <div className="grid gap-5 md:grid-cols-2">
        <SelectField
          id={ids.metier!}
          label="Type de local"
          ariaLabel="Sélection du métier"
          value={f.metierValue}
          onChange={f.setMetierValue}
          options={METIERS_MULTIRISQUE}
        />
        <SliderField
          id={ids.surface!}
          label="Surface du local (m²)"
          ariaLabel="Surface du local en mètres carrés"
          value={f.surface}
          min={20}
          max={500}
          step={10}
          onChange={f.setSurface}
          display={`${f.surface} m²`}
          ticks={['20 m²', '250 m²', '500 m²']}
        />
        <SliderField
          id={ids.contenu!}
          label="Valeur du contenu (matériel + stock)"
          ariaLabel="Valeur du contenu en euros"
          value={f.contenu}
          min={5_000}
          max={500_000}
          step={5_000}
          onChange={f.setContenu}
          display={formatCaShort(f.contenu)}
          ticks={['5 k€', '250 k€', '500 k€']}
        />
        <StatutField id={ids.statut!} value={f.statut} onChange={f.setStatut} />
      </div>
      <ResultBlock
        range={f.range}
        hint="Tarif multirisque pro indicatif — inclut vol, incendie, dégâts des eaux, perte d'exploitation."
      />
    </>
  )
}

function CyberFields({ ids }: { ids: Record<string, string> }) {
  const f = useCyberForm()
  return (
    <>
      <div className="grid gap-5 md:grid-cols-2">
        <SelectField
          id={ids.metier!}
          label="Secteur d'activité"
          ariaLabel="Sélection du métier"
          value={f.metierValue}
          onChange={f.setMetierValue}
          options={METIERS_CYBER}
        />
        <SliderField
          id={ids.ca!}
          label="Chiffre d'affaires annuel"
          ariaLabel="Chiffre d'affaires annuel en euros"
          value={f.ca}
          min={0}
          max={500_000}
          step={10_000}
          onChange={f.setCa}
          display={formatCaShort(f.ca)}
          ticks={['0 €', '250 k€', '500 k€']}
        />
        <SliderField
          id={ids.effectif!}
          label="Effectif salariés"
          ariaLabel="Nombre de salariés"
          value={f.effectif}
          min={1}
          max={200}
          step={1}
          onChange={f.setEffectif}
          display={`${f.effectif} salarié${f.effectif > 1 ? 's' : ''}`}
          ticks={['1', '100', '200']}
        />
        <StatutField id={ids.statut!} value={f.statut} onChange={f.setStatut} />
        <ToggleField
          id={ids.data!}
          label="Données sensibles (santé, finance, données bancaires)"
          hint="Active si vous traitez des PII sensibles soumises au RGPD renforcé."
          value={f.dataSensibles}
          onChange={f.setDataSensibles}
        />
      </div>
      <ResultBlock
        range={f.range}
        hint="Cyber-assurance — couverture ransomware, RGPD breach, perte d'exploitation IT."
      />
    </>
  )
}

function MutuelleFields({ ids }: { ids: Record<string, string> }) {
  const f = useMutuelleForm()
  return (
    <>
      <div className="grid gap-5 md:grid-cols-2">
        <SliderField
          id={ids.age!}
          label="Âge du dirigeant assuré"
          ariaLabel="Âge en années"
          value={f.age}
          min={20}
          max={70}
          step={1}
          onChange={f.setAge}
          display={`${f.age} ans`}
          ticks={['20', '45', '70']}
        />
        <RadioGroupField<NiveauMutuelle>
          id={ids.niveau!}
          label="Niveau de couverture"
          value={f.niveau}
          options={[
            { value: 'eco', label: 'Éco (100 %)' },
            { value: 'median', label: 'Médian (200 %)' },
            { value: 'premium', label: 'Premium (300 %+)' },
          ]}
          onChange={f.setNiveau}
        />
        <RadioGroupField<'0' | '1' | '2' | '3plus'>
          id={ids.ayants!}
          label="Ayants droit (conjoint + enfants)"
          value={f.ayantsDroit}
          options={[
            { value: '0', label: '0' },
            { value: '1', label: '1' },
            { value: '2', label: '2' },
            { value: '3plus', label: '3 ou +' },
          ]}
          onChange={f.setAyantsDroit}
          cols={4}
        />
        <StatutField id={ids.statut!} value={f.statut} onChange={f.setStatut} />
      </div>
      <ResultBlock
        range={f.range}
        hint="Mutuelle TNS — déductible fiscalement (Loi Madelin, art. 154 bis CGI)."
      />
    </>
  )
}

function VtcFields({ ids }: { ids: Record<string, string> }) {
  const f = useVtcForm()
  return (
    <>
      <div className="grid gap-5 md:grid-cols-2">
        <RadioGroupField<ZoneVtc>
          id={ids.zone!}
          label="Zone d'exploitation"
          value={f.zone}
          options={[
            { value: 'paris', label: 'Paris intra-muros' },
            { value: 'idf', label: 'Île-de-France' },
            { value: 'grande-ville', label: 'Grande ville (>200k hab.)' },
            { value: 'regions', label: 'Régions' },
          ]}
          onChange={f.setZone}
          cols={4}
        />
        <SliderField
          id={ids.permis!}
          label="Ancienneté permis B (années)"
          ariaLabel="Ancienneté du permis B en années"
          value={f.permis}
          min={2}
          max={40}
          step={1}
          onChange={f.setPermis}
          display={`${f.permis} an${f.permis > 1 ? 's' : ''}`}
          ticks={['2', '20', '40']}
        />
        <RadioGroupField<Vehicule>
          id={ids.vehicule!}
          label="Catégorie véhicule"
          value={f.vehicule}
          options={[
            { value: 'standard', label: 'Standard (berline)' },
            { value: 'premium', label: 'Premium / luxe' },
            { value: 'van', label: 'Van / 6+ places' },
          ]}
          onChange={f.setVehicule}
        />
        <RadioGroupField<Plateforme>
          id={ids.plateforme!}
          label="Mode d'exploitation"
          value={f.plateforme}
          options={[
            { value: 'uber-bolt', label: 'VTC plateformes (Uber / Bolt)' },
            { value: 'taxi', label: 'Taxi traditionnel (licence ADS)' },
          ]}
          onChange={f.setPlateforme}
          cols={2}
        />
        <StatutField id={ids.statut!} value={f.statut} onChange={f.setStatut} />
      </div>
      <ResultBlock
        range={f.range}
        hint="Assurance VTC / taxi — usage transport public de personnes (art. R. 211-3 C. assur.)."
      />
    </>
  )
}

// ---------------------------------------------------------------------------
// Result block (shared)
// ---------------------------------------------------------------------------

function ResultBlock({ range, hint }: { range: Range; hint: string }) {
  return (
    <div
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
        <span>{hint} Tarif définitif après étude dossier complète.</span>
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
  )
}

// ---------------------------------------------------------------------------
// Root component
// ---------------------------------------------------------------------------

export function TarifCalculator({ garantie, className = '' }: TarifCalculatorProps) {
  const reactId = useId()
  const ids = useMemo(
    () => ({
      metier: `${reactId}-metier`,
      ca: `${reactId}-ca`,
      statut: `${reactId}-statut`,
      anciennete: `${reactId}-anciennete`,
      sinistralite: `${reactId}-sinistralite`,
      activite: `${reactId}-activite`,
      effectif: `${reactId}-effectif`,
      surface: `${reactId}-surface`,
      contenu: `${reactId}-contenu`,
      data: `${reactId}-data`,
      age: `${reactId}-age`,
      niveau: `${reactId}-niveau`,
      ayants: `${reactId}-ayants`,
      zone: `${reactId}-zone`,
      permis: `${reactId}-permis`,
      vehicule: `${reactId}-vehicule`,
      plateforme: `${reactId}-plateforme`,
    }),
    [reactId]
  )

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

        {garantie === 'decennale' && <DecennaleFields ids={ids} />}
        {garantie === 'rc-pro' && <RcProFields ids={ids} />}
        {garantie === 'multirisque-pro' && <MultirisqueFields ids={ids} />}
        {garantie === 'cyber' && <CyberFields ids={ids} />}
        {garantie === 'mutuelle-pro' && <MutuelleFields ids={ids} />}
        {garantie === 'vtc' && <VtcFields ids={ids} />}
      </section>
    </RevealOnScroll>
  )
}
