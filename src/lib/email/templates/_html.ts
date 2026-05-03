/**
 * Helpers HTML partagés pour tous les templates email.
 * Évite la duplication du `esc()` dans chaque template.
 */

export function esc(s: string | undefined | null): string {
  if (s == null) return ''
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * Strip control chars (CR/LF/TAB) d'un email subject — défense contre header
 * injection même si le sender (Resend) accepte JSON. À appliquer avant TOUT
 * subject construit avec un input utilisateur.
 */
export function escSubject(s: string | undefined | null): string {
  if (s == null) return ''
  return String(s).replace(/[\r\n\t]+/g, ' ').trim().slice(0, 200)
}
