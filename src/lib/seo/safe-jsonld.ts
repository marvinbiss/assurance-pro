/**
 * Safe JSON-LD injection — escape `<`, `>`, `&` pour empêcher XSS breakout
 * depuis un `<script type="application/ld+json">` si la data contient des
 * caractères contrôlables par attaquant (rare, mais defense in depth).
 *
 * Référence : https://html.spec.whatwg.org/multipage/scripting.html#restrictions-for-contents-of-script-elements
 *
 * Source unique de vérité pour TOUTES les injections JSON-LD du projet.
 * Garantit cohérence avec le composant src/components/JsonLd.tsx.
 */

const LINE_SEPARATOR = ' '
const PARAGRAPH_SEPARATOR = ' '

/**
 * Sérialise un objet JSON-LD en string sûr pour injection inline.
 * Escape les séquences qui pourraient :
 *   - Terminer prématurément le `<script>` (`</script>` injection)
 *   - Casser certains parsers legacy (U+2028, U+2029)
 */
export function safeJsonLdStringify(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(new RegExp(LINE_SEPARATOR, 'g'), '\\u2028')
    .replace(new RegExp(PARAGRAPH_SEPARATOR, 'g'), '\\u2029')
}

/**
 * Helper pour construire les props d'un `<script type="application/ld+json">`.
 * À utiliser systématiquement dans toute la codebase.
 *
 * Usage :
 *   <script {...jsonLdScriptProps(schema, nonce)} />
 */
export function jsonLdScriptProps(
  data: unknown,
  nonce?: string
): {
  type: 'application/ld+json'
  nonce: string | undefined
  dangerouslySetInnerHTML: { __html: string }
} {
  return {
    type: 'application/ld+json',
    nonce,
    dangerouslySetInnerHTML: { __html: safeJsonLdStringify(data) },
  }
}
