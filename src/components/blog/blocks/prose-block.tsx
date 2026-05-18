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

function renderInline(raw: string): string {
  let html = escapeHtml(raw)
  // links [label](url)
  html = html.replace(
    /\[([^\]]+)\]\(([^)\s]+)\)/g,
    '<a href="$2" class="font-semibold text-primary-700 underline-offset-4 hover:underline">$1</a>'
  )
  // bold **text**
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-charcoal-900">$1</strong>')
  // italic *text* (avoid bold collision: already replaced)
  html = html.replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, '<em class="italic">$1</em>')
  return html
}

export function ProseBlock({ text }: ProseBlockProps) {
  return (
    <p
      className="my-5 text-[17px] leading-[1.75] text-charcoal-700"
      dangerouslySetInnerHTML={{ __html: renderInline(text) }}
    />
  )
}
