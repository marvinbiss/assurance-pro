/**
 * Pre-ORIAS feature flag — bascule entre mode "soft launch" et "full commercial".
 *
 * Mode soft (PRE-ORIAS = true) :
 *   - Bandeau top "En cours d'immatriculation"
 *   - Formulaires devis désactivés → page préinscription email
 *   - Chatbot RAG masqué
 *   - CTAs adaptés "Être notifié au lancement"
 *
 * Mode full (PRE-ORIAS = false) :
 *   - Site commercial complet
 *   - Tous formulaires + chatbot actifs
 *
 * Toggle : NEXT_PUBLIC_PRE_ORIAS env var (default true en attendant ORIAS).
 * Quand ORIAS reçue : NEXT_PUBLIC_PRE_ORIAS=false + redeploy → tout s'active.
 */

export const IS_PRE_ORIAS = process.env.NEXT_PUBLIC_PRE_ORIAS !== 'false'

/** Date estimée d'ouverture commerciale (à mettre à jour si planning bouge). */
export const ORIAS_EXPECTED_DATE = process.env.NEXT_PUBLIC_ORIAS_EXPECTED_DATE ?? 'fin juin 2026'

/** Email pour la liste d'attente / préinscription pendant le soft launch. */
export const PRE_ORIAS_NOTIFY_EMAIL =
  process.env.NEXT_PUBLIC_PRE_ORIAS_NOTIFY_EMAIL ?? 'contact@vivos-assurance.fr'

/** Textes CTAs adaptés selon le mode */
export const CTA_TEXTS = {
  primary: IS_PRE_ORIAS ? 'Être notifié au lancement' : 'Obtenir mon devis gratuit',
  short: IS_PRE_ORIAS ? 'Préinscription' : 'Devis gratuit',
  start: IS_PRE_ORIAS ? 'Rejoindre la liste' : 'Démarrer mon devis',
} as const
