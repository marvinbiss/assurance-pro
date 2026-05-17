/**
 * Calcul tarif mutuelle santé pro 2026 — Modèle data-driven
 *
 * Cible : Loi ANI (collective entreprise) + TNS Madelin (individuel travailleur non-salarié)
 *
 * Sources :
 * - Barèmes 2026 8 organismes (Pro BTP, Apicil, Malakoff Humanis, Harmonie Mutuelle,
 *   AG2R La Mondiale, Allianz, Generali, Klesia)
 * - DREES 2024 (consommation soins par tranche d'âge)
 * - Loi ANI obligatoire depuis 1er janvier 2016 (art. L. 911-7 CSS)
 *
 * Formule par adulte/mois :
 *   Tarif = TarifBase(formule) × Coef(âge) × Coef(régime) × Coef(zone) × Coef(famille)
 */

export type Formule =
  | 'minimale-ani' /* socle Loi ANI 100% BR + opto ou dentaire mini */
  | 'standard' /* 125% BR + dentaire 200% + optique 350€ */
  | 'confort' /* 200% BR + médecines douces + chambre particulière */
  | 'premium' /* 300% BR + remboursement integral 100% santé+ */

export type Regime = 'general-salarie' | 'tns-madelin' | 'agricole-msa' | 'alsace-moselle'

export type Zone = 'idf' | 'metropole' | 'corse' | 'dom'

export type Composition = 'isole' | 'duo' | 'famille-1enfant' | 'famille-2enfants' | 'famille-3plus'

export interface MutuelleInput {
  formule: Formule
  age: number /* ans — adhérent principal */
  regime: Regime
  zone: Zone
  composition: Composition
  effectif: number /* contexte ANI : 1 = TNS individuel, 1+ = collective */
}

export interface MutuelleResultat {
  tarifMensuelParAdulte: number
  tarifMensuelTotal: number
  tarifAnnuelTotal: number
  partEmployeurMensuelle: number /* 50% mini Loi ANI si collective ≥1 salarié */
  partSalarieMensuelle: number
  detail: {
    base: number
    coefAge: number
    coefRegime: number
    coefZone: number
    coefComposition: number
  }
}

const TARIF_BASE_FORMULE: Record<Formule, { perAdulte: number; description: string }> = {
  'minimale-ani': { perAdulte: 32, description: 'Socle ANI obligatoire (100% BR + 100% santé)' },
  standard: { perAdulte: 58, description: '125% BR + dentaire 200% + optique 350€' },
  confort: { perAdulte: 92, description: '200% BR + médecines douces + chambre particulière' },
  premium: { perAdulte: 145, description: '300% BR + remboursement intégral + assistance' },
}

const COEF_REGIME: Record<Regime, number> = {
  'general-salarie': 1.0,
  'tns-madelin': 1.18 /* sur-prime TNS — pas de couverture employeur */,
  'agricole-msa': 0.94 /* MSA mutualisée */,
  'alsace-moselle': 0.78 /* régime local Alsace-Moselle = remboursement supérieur SS */,
}

const COEF_ZONE: Record<Zone, number> = {
  metropole: 1.0,
  corse: 1.05,
  dom: 1.18,
  idf: 1.22 /* Île-de-France = sur-prime densité praticiens + dépassements honoraires */,
}

const COMPOSITION_PARTS: Record<
  Composition,
  { adultes: number; enfants: number; coefGlobal: number }
> = {
  isole: { adultes: 1, enfants: 0, coefGlobal: 1.0 },
  duo: { adultes: 2, enfants: 0, coefGlobal: 1.85 } /* duo = -7,5% vs 2× isolé */,
  'famille-1enfant': { adultes: 2, enfants: 1, coefGlobal: 2.25 },
  'famille-2enfants': { adultes: 2, enfants: 2, coefGlobal: 2.55 } /* gratuité 2e enfant souvent */,
  'famille-3plus': {
    adultes: 2,
    enfants: 3,
    coefGlobal: 2.75,
  } /* gratuité enfants 3+ très souvent */,
}

function coefAge(age: number): number {
  /* Tarif mutuelle pro suit consommation soins DREES par âge.
     Référence : 35 ans = ×1.0 */
  if (age < 25) return 0.78
  if (age < 30) return 0.88
  if (age < 35) return 0.95
  if (age < 40) return 1.0
  if (age < 45) return 1.08
  if (age < 50) return 1.2
  if (age < 55) return 1.38
  if (age < 60) return 1.58
  if (age < 65) return 1.85
  return 2.15 /* >65 ans — sur-prime majorée */
}

export function calculerMutuelle(input: MutuelleInput): MutuelleResultat {
  const base = TARIF_BASE_FORMULE[input.formule].perAdulte
  const cAge = coefAge(input.age)
  const cReg = COEF_REGIME[input.regime]
  const cZone = COEF_ZONE[input.zone]
  const comp = COMPOSITION_PARTS[input.composition]

  const tarifAdulte = Math.round(base * cAge * cReg * cZone)
  const tarifTotal = Math.round(base * cAge * cReg * cZone * comp.coefGlobal)
  const tarifAnnuel = tarifTotal * 12

  /* Loi ANI : si effectif >= 1 salarié, employeur prend 50% mini */
  const partEmployeur = input.effectif >= 1 ? Math.round(tarifTotal * 0.5) : 0
  const partSalarie = tarifTotal - partEmployeur

  return {
    tarifMensuelParAdulte: tarifAdulte,
    tarifMensuelTotal: tarifTotal,
    tarifAnnuelTotal: tarifAnnuel,
    partEmployeurMensuelle: partEmployeur,
    partSalarieMensuelle: partSalarie,
    detail: {
      base,
      coefAge: cAge,
      coefRegime: cReg,
      coefZone: cZone,
      coefComposition: comp.coefGlobal,
    },
  }
}

export const FORMULE_LABELS: Record<Formule, string> = {
  'minimale-ani': 'Socle ANI minimal (32 € par mois adulte ref)',
  standard: 'Standard (58 € par mois — recommandée)',
  confort: 'Confort (92 € par mois — médecines douces)',
  premium: 'Premium (145 € par mois — remboursement intégral)',
}

export const REGIME_LABELS: Record<Regime, string> = {
  'general-salarie': 'Régime général (salariés, dirigeants assimilés)',
  'tns-madelin': 'TNS — Travailleur non-salarié (Madelin)',
  'agricole-msa': 'Régime agricole (MSA)',
  'alsace-moselle': 'Alsace-Moselle (régime local)',
}

export const ZONE_LABELS: Record<Zone, string> = {
  metropole: 'France métropolitaine (hors IDF)',
  idf: 'Île-de-France',
  corse: 'Corse',
  dom: 'DOM (Guadeloupe, Martinique, Guyane, Réunion, Mayotte)',
}

export const COMPOSITION_LABELS: Record<Composition, string> = {
  isole: 'Isolé (1 adulte)',
  duo: 'Duo (2 adultes, sans enfant)',
  'famille-1enfant': 'Famille (2 adultes + 1 enfant)',
  'famille-2enfants': 'Famille (2 adultes + 2 enfants)',
  'famille-3plus': 'Famille nombreuse (2 adultes + 3 enfants ou +)',
}

export function getFormuleDescription(f: Formule): string {
  return TARIF_BASE_FORMULE[f].description
}
