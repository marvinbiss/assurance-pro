/**
 * Adresses email métier — single source of truth.
 * Référencées par les API routes (reclamation, cron, contact).
 */

export const RECLAMATIONS_INBOX =
  process.env.RECLAMATIONS_INBOX ?? 'reclamations@vivos-assurance.fr'
export const COURTIER_INBOX = process.env.COURTIER_INBOX ?? 'leads@vivos-assurance.fr'
export const CONTACT_INBOX = 'contact@vivos-assurance.fr'
export const NOREPLY_FROM =
  process.env.RESEND_FROM ?? 'Vivos Assurance <noreply@vivos-assurance.fr>'
