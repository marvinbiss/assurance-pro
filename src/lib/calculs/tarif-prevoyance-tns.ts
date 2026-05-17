/**
 * Calcul tarif prévoyance TNS Madelin 2026 — Modèle data-driven
 *
 * Cible : Travailleurs Non Salariés (Loi Madelin art. 154 bis CGI)
 * Couvre : Indemnités Journalières (IJ), invalidité, décès, capital
 *
 * Sources :
 * - Barèmes 2026 nos 7 assureurs prévoyance TNS (Generali, MMA Pro, AXA Pro, Allianz,
 *   Pro BTP, Apicil, Swisslife)
 * - Loi Madelin (art. 154 bis CGI) — déductibilité 3,75% PASS + 7% PASS
 * - PASS 2026 : 47 100€ → plafond Madelin déductible ≈ 7 200€/an
 */

export type Statut = 'auto-entrepreneur' | 'ei' | 'eurl' | 'sasu-tns' | 'gerant-majoritaire'

export type Profession =
  | 'commerçant'
  | 'artisan-btp'
  | 'profession-liberale-medicale'
  | 'profession-liberale-juridique'
  | 'profession-liberale-conseil'
  | 'agriculteur'
  | 'agent-commercial'
  | 'taxi-vtc'

export type Formule = 'essentielle' | 'standard' | 'confort' | 'premium'

export type AgeCategory = '<35' | '35-45' | '45-55' | '55-65'

export interface PrevoyanceInput {
  statut: Statut
  profession: Profession
  age: number
  revenus: number /* € HT par an — base déclaration sociale */
  formule: Formule
  fumeur: boolean
  capitalDeces: number /* € — capital versé bénéficiaires en cas décès */
}

export interface PrevoyanceResultat {
  cotisationMensuelle: number
  cotisationAnnuelle: number
  ijQuotidienneCouverte: number /* € versés par jour en cas arrêt maladie */
  capitalDecesEffectif: number
  rentesInvaliditeMensuelle: number /* € versés par mois si invalidité totale */
  deductibiliteMadelin: number /* € déductibles fiscalement */
  detail: {
    base: number
    coefAge: number
    coefProfession: number
    coefRevenus: number
    coefFormule: number
    coefFumeur: number
  }
}

const TARIF_BASE_FORMULE: Record<
  Formule,
  { perAdulte: number; ijPourcentage: number; capitalMultiplicateur: number }
> = {
  essentielle: { perAdulte: 38, ijPourcentage: 60, capitalMultiplicateur: 0.5 },
  standard: { perAdulte: 78, ijPourcentage: 80, capitalMultiplicateur: 1.0 },
  confort: { perAdulte: 142, ijPourcentage: 90, capitalMultiplicateur: 2.0 },
  premium: { perAdulte: 218, ijPourcentage: 100, capitalMultiplicateur: 3.5 },
}

const COEF_PROFESSION: Record<Profession, number> = {
  commerçant: 1.0,
  'artisan-btp': 1.18 /* sur-prime risque corporel chantier */,
  'profession-liberale-medicale': 1.32 /* sur-prime exposition risque pro */,
  'profession-liberale-juridique': 0.92 /* sous-prime profession sédentaire */,
  'profession-liberale-conseil': 0.88 /* la plus faible — bureautique */,
  agriculteur: 1.42 /* sur-prime maximale risque corporel */,
  'agent-commercial': 1.05,
  'taxi-vtc': 1.28 /* sur-prime risque routier */,
}

function coefAge(age: number): number {
  if (age < 30) return 0.78
  if (age < 35) return 0.88
  if (age < 40) return 1.0
  if (age < 45) return 1.15
  if (age < 50) return 1.35
  if (age < 55) return 1.62
  if (age < 60) return 1.95
  return 2.4 /* >60 ans — sur-prime majeure */
}

function coefRevenus(revenus: number): number {
  /* Plus le revenu est élevé, plus la couverture IJ/rente est élevée → cotisation prop */
  if (revenus <= 20000) return 0.7
  if (revenus <= 40000) return 1.0
  if (revenus <= 70000) return 1.45
  if (revenus <= 100000) return 1.85
  if (revenus <= 200000) return 2.6
  return Math.min(3.5 + (revenus - 200000) / 500000, 5.5)
}

function calculDeductibilite(cotisationAnnuelle: number, revenus: number): number {
  /* Loi Madelin art. 154 bis CGI :
     Plafond = 3,75% PASS + 7% (revenus - PASS) si revenus > PASS
     PASS 2026 = 47 100€
     Plafond mini = 3,75% × PASS = 1 766€
     Plafond pour revenu 100k€ = 1 766 + 7% × 52 900 = 5 469€ */
  const PASS = 47100
  const plafondMini = 0.0375 * PASS
  const plafondMax = revenus > PASS ? plafondMini + 0.07 * (revenus - PASS) : plafondMini
  return Math.min(cotisationAnnuelle, Math.round(plafondMax))
}

export function calculerPrevoyance(input: PrevoyanceInput): PrevoyanceResultat {
  const formule = TARIF_BASE_FORMULE[input.formule]
  const baseM = formule.perAdulte
  const cAge = coefAge(input.age)
  const cProf = COEF_PROFESSION[input.profession]
  const cRev = coefRevenus(input.revenus)
  const cFum = input.fumeur ? 1.32 : 1.0
  const cFor = 1.0 /* déjà intégré dans baseM */

  const cotMois = Math.round(baseM * cAge * cProf * cRev * cFum * cFor)
  const cotAnnee = cotMois * 12

  const ijQuot = Math.round((input.revenus / 365) * (formule.ijPourcentage / 100))
  const capitalDeces = Math.max(
    input.capitalDeces,
    Math.round(input.revenus * formule.capitalMultiplicateur)
  )
  const renteInvalidite = Math.round((input.revenus / 12) * (formule.ijPourcentage / 100))
  const deductibilite = calculDeductibilite(cotAnnee, input.revenus)

  return {
    cotisationMensuelle: cotMois,
    cotisationAnnuelle: cotAnnee,
    ijQuotidienneCouverte: ijQuot,
    capitalDecesEffectif: capitalDeces,
    rentesInvaliditeMensuelle: renteInvalidite,
    deductibiliteMadelin: deductibilite,
    detail: {
      base: baseM,
      coefAge: cAge,
      coefProfession: cProf,
      coefRevenus: cRev,
      coefFormule: cFor,
      coefFumeur: cFum,
    },
  }
}

export const STATUT_LABELS: Record<Statut, string> = {
  'auto-entrepreneur': 'Auto-entrepreneur (micro-BIC ou BNC)',
  ei: 'Entreprise individuelle (EI réel)',
  eurl: 'EURL gérant majoritaire',
  'sasu-tns': 'SASU président TNS (rare)',
  'gerant-majoritaire': 'Gérant majoritaire SARL ou SELARL',
}

export const PROFESSION_LABELS: Record<Profession, string> = {
  commerçant: 'Commerçant',
  'artisan-btp': 'Artisan BTP',
  'profession-liberale-medicale': 'Profession libérale médicale (médecin, kiné, infirmier)',
  'profession-liberale-juridique': 'Profession libérale juridique (avocat, notaire)',
  'profession-liberale-conseil': 'Profession libérale conseil (consultant, expert-comptable)',
  agriculteur: 'Agriculteur (MSA)',
  'agent-commercial': 'Agent commercial',
  'taxi-vtc': 'Taxi — VTC',
}

export const FORMULE_LABELS: Record<Formule, string> = {
  essentielle: 'Essentielle (38 € par mois — IJ 60%, capital 0,5× revenus)',
  standard: 'Standard (78 € par mois — IJ 80%, capital 1× revenus) — recommandée',
  confort: 'Confort (142 € par mois — IJ 90%, capital 2× revenus + médecines douces)',
  premium: 'Premium (218 € par mois — IJ 100%, capital 3,5× revenus + assistance internationale)',
}
