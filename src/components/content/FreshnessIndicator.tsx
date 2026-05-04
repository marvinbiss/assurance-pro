/**
 * FreshnessIndicator — Badge "récemment mis à jour" pour signaler freshness Google.
 *
 * Pattern NerdWallet : affiche "Updated 2 days ago" en couleur verte si <30j.
 * Signal puissant pour Google E-E-A-T (contenu actuel = haute qualité).
 */

interface FreshnessIndicatorProps {
  dateModified: string /* ISO date */
  /** Si true, affiche en compact inline (vs badge) */
  compact?: boolean
}

function daysSince(iso: string): number {
  const then = new Date(iso).getTime()
  const now = Date.now()
  return Math.floor((now - then) / (1000 * 60 * 60 * 24))
}

function freshnessLabel(days: number): { label: string; tone: 'fresh' | 'recent' | 'older' } {
  if (days < 7) return { label: 'Récemment mis à jour', tone: 'fresh' }
  if (days < 30) return { label: `Mis à jour il y a ${days} jours`, tone: 'fresh' }
  if (days < 90) return { label: `Mis à jour il y a ${Math.floor(days / 30)} mois`, tone: 'recent' }
  if (days < 180)
    return { label: `Mis à jour il y a ${Math.floor(days / 30)} mois`, tone: 'recent' }
  if (days < 365) return { label: `Mis à jour il y a ${Math.floor(days / 30)} mois`, tone: 'older' }
  return {
    label: `Mis à jour il y a ${Math.floor(days / 365)} an${days >= 730 ? 's' : ''}`,
    tone: 'older',
  }
}

const TONE_STYLES = {
  fresh: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  recent: 'bg-blue-100 text-blue-800 border-blue-200',
  older: 'bg-gray-100 text-gray-700 border-gray-200',
}

export function FreshnessIndicator({ dateModified, compact = false }: FreshnessIndicatorProps) {
  const days = daysSince(dateModified)
  const { label, tone } = freshnessLabel(days)

  if (compact) {
    return (
      <span
        className={`inline-flex items-center gap-1 rounded border px-2 py-0.5 text-xs ${TONE_STYLES[tone]}`}
      >
        {tone === 'fresh' ? '🟢' : tone === 'recent' ? '🔵' : '⚪'}
        <time dateTime={dateModified}>{label}</time>
      </span>
    )
  }

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium ${TONE_STYLES[tone]}`}
      role="status"
    >
      <span aria-hidden="true">{tone === 'fresh' ? '🟢' : tone === 'recent' ? '🔵' : '⚪'}</span>
      <time dateTime={dateModified}>{label}</time>
    </div>
  )
}
