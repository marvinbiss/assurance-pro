export interface ProseBlockProps {
  text: string
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * Whitelist URL schemes — prévient XSS via javascript:, data:, vbscript:.
 * Accepte: http(s)://, mailto:, tel:, et URLs relatives (commençant par / ou #).
 */
function isSafeUrl(url: string): boolean {
  const u = url.trim().toLowerCase()
  if (u.startsWith('/') || u.startsWith('#')) return true
  return /^(https?:|mailto:|tel:)/.test(u)
}

function renderInline(raw: string): string {
  let html = escapeHtml(raw)
  // links [label](url) — XSS-safe: validate URL scheme (http/https/mailto/relative only)
  html = html.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_match, label, url) => {
    const safeUrl = isSafeUrl(url) ? url : '#'
    // escapeHtml double-encode déjà appliqué — url contient déjà &amp; etc.
    return `<a href="${safeUrl}" class="font-semibold text-primary-700 underline-offset-4 hover:underline dark:text-primary-300">${label}</a>`
  })
  // bold **text**
  html = html.replace(
    /\*\*([^*]+)\*\*/g,
    '<strong class="font-bold text-charcoal-900 dark:text-charcoal-50">$1</strong>'
  )
  // italic *text* (avoid bold collision: already replaced)
  html = html.replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, '<em class="italic">$1</em>')
  return html
}

export function ProseBlock({ text }: ProseBlockProps) {
  return (
    <p
      className="my-5 text-[17px] leading-[1.75] text-charcoal-700 dark:text-charcoal-200"
      dangerouslySetInnerHTML={{ __html: renderInline(text) }}
    />
  )
}
