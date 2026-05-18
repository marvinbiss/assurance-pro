/**
 * Vivos Assurance — voix éditoriale & brand identity.
 *
 * Source unique de vérité pour:
 *  - Tagline brand (différenciation marché)
 *  - Manifesto (raison d'être)
 *  - Promesses (3 piliers)
 *  - Voix (do/don'ts)
 */

export const BRAND = {
  name: 'Vivos Assurance',
  shortName: 'Vivos',
  tagline: "L'assurance pro qui tient ses promesses.",
  taglineLong: 'Courtage indépendant ORIAS — pour les pros qui veulent être vraiment protégés.',
  baseline: 'Conseil motivé, garanties négociées, sinistre accompagné.',
} as const

export const MANIFESTO = {
  hero: "Nous croyons qu'une assurance professionnelle ne devrait jamais être un papier de plus.",
  body: "Vivos est un cabinet de courtage indépendant ORIAS, fondé pour rendre l'assurance pro lisible, négociée et tenue. Nous comparons 10+ assureurs partenaires, nous expliquons chaque exclusion, nous restons à vos côtés le jour du sinistre. Pas de jargon. Pas d'engagement. Pas de frais de courtage cachés.",
  cta: "Vivos signifie « les vivants » en latin. C'est la promesse d'une assurance qui suit votre activité — pas l'inverse.",
} as const

export const BRAND_PROMISES = [
  {
    Icon: 'ShieldCheck',
    title: 'Conseil motivé',
    body: 'Recommandation écrite conforme art. L. 521-4 du Code des assurances. Vous savez pourquoi on vous propose ce contrat.',
  },
  {
    Icon: 'Scale',
    title: 'Négociation transparente',
    body: '10+ assureurs comparés. Tarifs négociés. Aucun frais de courtage facturé au client.',
  },
  {
    Icon: 'Headphones',
    title: 'Accompagnement sinistre',
    body: 'Le jour où ça casse, on prend le téléphone avec votre assureur. Pas un numéro vert, un courtier nommé.',
  },
] as const

/**
 * Voix éditoriale — do / don't.
 * Référence pour rédaction blog, emails, micro-copy UI.
 */
export const BRAND_VOICE = {
  do: [
    'Vouvoyer (audience pro)',
    'Citer la loi (Légifrance, ACPR, AQC)',
    "Donner un chiffre quand c'est possible",
    "Nommer l'expert qui signe",
    'Court, dense, scannable',
  ],
  dont: [
    'Pas de jargon assurantiel sans définition',
    'Pas de superlatifs creux ("incroyable", "révolutionnaire")',
    'Pas de promesse non tenue ("100% remboursé en 24h")',
    'Pas de tutoiement sauf landing campagne ciblée',
    "Pas d'emojis dans contenu éditorial YMYL",
  ],
} as const
