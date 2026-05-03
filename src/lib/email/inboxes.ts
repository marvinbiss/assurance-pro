/**
 * Adresses email métier — single source of truth.
 * Référencées par les API routes (reclamation, cron, contact).
 */

export const RECLAMATIONS_INBOX = process.env.RECLAMATIONS_INBOX ?? 'reclamations@assurance-pro.fr'
export const COURTIER_INBOX = process.env.COURTIER_INBOX ?? 'leads@assurance-pro.fr'
export const CONTACT_INBOX = 'contact@assurance-pro.fr'
export const NOREPLY_FROM = process.env.RESEND_FROM ?? 'Assurance Pro <noreply@assurance-pro.fr>'
