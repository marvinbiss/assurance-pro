/**
 * BlogBlock union discriminée — schema éditorial premium.
 * Additive vs BlogSection legacy (paragraphs/list/callout).
 * Renderer fallback sur legacy si `blocks` absent.
 */

export type CalloutTone = 'info' | 'warning' | 'success' | 'critical' | 'tip'

export type BlogBlock =
  | { kind: 'prose'; text: string }
  | { kind: 'lead'; text: string }
  | { kind: 'list'; ordered?: boolean; variant?: 'check' | 'numbered' | 'bullet'; items: string[] }
  | { kind: 'callout'; tone: CalloutTone; title?: string; text: string }
  | {
      kind: 'stat'
      value: string
      label: string
      trend?: 'up' | 'down' | 'flat'
      trendValue?: string
      source?: string
    }
  | { kind: 'keyFigures'; items: Array<{ value: string; label: string; source?: string }> }
  | { kind: 'pullQuote'; text: string; attribution?: string; sourceUrl?: string }
  | {
      kind: 'comparison'
      columns: string[]
      rows: Array<{ label: string; cells: string[] }>
      emphasizeCol?: number
    }
  | {
      kind: 'image'
      src: string
      alt: string
      caption?: string
      credit?: string
      ratio?: '16/9' | '4/3' | '1/1' | '21/9'
    }
  | { kind: 'timeline'; steps: Array<{ when: string; label: string; detail?: string }> }
  | { kind: 'stepper'; steps: Array<{ title: string; body: string }> }
  | { kind: 'keyTakeaways'; points: string[] }
  | { kind: 'accordion'; items: Array<{ q: string; a: string }> }
  | {
      kind: 'expertQuote'
      expertName: string
      expertRole: string
      expertAvatar?: string
      quote: string
    }

export interface BlogAuthor {
  name: string
  role: string
  avatar?: string
  oriasN?: string
  linkedinUrl?: string
  bio?: string
  /** URLs entité (LinkedIn, Wikipedia, Wikidata, ORCID…) — schema.org sameAs. */
  sameAs?: string[]
  /** Établissement de formation (ex: "EM Lyon", "ENASS"). */
  alumniOf?: string
  /** URL page auteur dédiée (/auteurs/[slug]). */
  url?: string
}

export interface BlogCoverImage {
  src: string
  alt: string
  credit?: string
  focal?: 'center' | 'top' | 'bottom'
}
