import type { ComponentType } from 'react'
import type { IllustrationProps } from './_shared'

import { IllustrationMacon } from './illustration-macon'
import { IllustrationPlombier } from './illustration-plombier'
import { IllustrationElectricien } from './illustration-electricien'
import { IllustrationCouvreur } from './illustration-couvreur'
import { IllustrationCharpentier } from './illustration-charpentier'
import { IllustrationPeintre } from './illustration-peintre'
import { IllustrationCarreleur } from './illustration-carreleur'
import { IllustrationPlaquiste } from './illustration-plaquiste'
import { IllustrationMenuisier } from './illustration-menuisier'
import { IllustrationFacadier } from './illustration-facadier'
import { IllustrationEtancheur } from './illustration-etancheur'
import { IllustrationPhotovoltaique } from './illustration-photovoltaique'
import { IllustrationConsultant } from './illustration-consultant'
import { IllustrationFreelanceIt } from './illustration-freelance-it'
import { IllustrationAgenceWeb } from './illustration-agence-web'
import { IllustrationPhotographe } from './illustration-photographe'
import { IllustrationCoach } from './illustration-coach'
import { IllustrationFormateur } from './illustration-formateur'
import { IllustrationExpertComptable } from './illustration-expert-comptable'
import { IllustrationMedecin } from './illustration-medecin'
import { IllustrationAvocat } from './illustration-avocat'
import { IllustrationRestaurateur } from './illustration-restaurateur'

export type { IllustrationProps } from './_shared'
export {
  IllustrationMacon,
  IllustrationPlombier,
  IllustrationElectricien,
  IllustrationCouvreur,
  IllustrationCharpentier,
  IllustrationPeintre,
  IllustrationCarreleur,
  IllustrationPlaquiste,
  IllustrationMenuisier,
  IllustrationFacadier,
  IllustrationEtancheur,
  IllustrationPhotovoltaique,
  IllustrationConsultant,
  IllustrationFreelanceIt,
  IllustrationAgenceWeb,
  IllustrationPhotographe,
  IllustrationCoach,
  IllustrationFormateur,
  IllustrationExpertComptable,
  IllustrationMedecin,
  IllustrationAvocat,
  IllustrationRestaurateur,
}

const REGISTRY: Record<string, ComponentType<IllustrationProps>> = {
  macon: IllustrationMacon,
  plombier: IllustrationPlombier,
  electricien: IllustrationElectricien,
  couvreur: IllustrationCouvreur,
  'couvreur-zingueur': IllustrationCouvreur,
  charpentier: IllustrationCharpentier,
  'charpentier-bois': IllustrationCharpentier,
  peintre: IllustrationPeintre,
  'peintre-plaquiste': IllustrationPeintre,
  carreleur: IllustrationCarreleur,
  plaquiste: IllustrationPlaquiste,
  'plaquiste-platrier': IllustrationPlaquiste,
  menuisier: IllustrationMenuisier,
  'menuisier-interieur': IllustrationMenuisier,
  facadier: IllustrationFacadier,
  'facadier-ite': IllustrationFacadier,
  etancheur: IllustrationEtancheur,
  photovoltaique: IllustrationPhotovoltaique,
  'installateur-photovoltaique': IllustrationPhotovoltaique,
  consultant: IllustrationConsultant,
  'freelance-it': IllustrationFreelanceIt,
  informatique: IllustrationFreelanceIt,
  'agence-web': IllustrationAgenceWeb,
  photographe: IllustrationPhotographe,
  coach: IllustrationCoach,
  'coach-sportif': IllustrationCoach,
  'coach-professionnel': IllustrationCoach,
  formateur: IllustrationFormateur,
  'expert-comptable': IllustrationExpertComptable,
  medecin: IllustrationMedecin,
  'sante-paramedical': IllustrationMedecin,
  avocat: IllustrationAvocat,
  restaurateur: IllustrationRestaurateur,
  restaurant: IllustrationRestaurateur,
}

interface IllustrationForMetierProps extends IllustrationProps {
  slug: string
  fallback?: ComponentType<IllustrationProps>
}

export function IllustrationForMetier({
  slug,
  fallback: Fallback,
  ...rest
}: IllustrationForMetierProps) {
  const Component = REGISTRY[slug] ?? Fallback ?? IllustrationConsultant
  return <Component {...rest} />
}
