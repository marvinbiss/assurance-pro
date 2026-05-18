import { AlertCircle, AlertTriangle, CheckCircle2, Info, Sparkles } from 'lucide-react'
import type { CalloutTone } from '@/lib/data/blog-blocks'

export interface CalloutBlockProps {
  tone: CalloutTone
  title?: string
  text: string
}

const THEMES: Record<
  CalloutTone,
  { Icon: typeof Info; container: string; iconBg: string; defaultTitle: string }
> = {
  info: {
    Icon: Info,
    container: 'border-accent-200 bg-accent-50/60 dark:border-accent-800 dark:bg-accent-950/40',
    iconBg: 'bg-accent-100 text-accent-700 dark:bg-accent-900 dark:text-accent-200',
    defaultTitle: 'À noter',
  },
  warning: {
    Icon: AlertTriangle,
    container: 'border-amber-200 bg-amber-50/70',
    iconBg: 'bg-amber-100 text-amber-700',
    defaultTitle: 'Point de vigilance',
  },
  success: {
    Icon: CheckCircle2,
    container: 'border-secondary-200 bg-secondary-50/70',
    iconBg: 'bg-secondary-100 text-secondary-700',
    defaultTitle: 'Bonne pratique',
  },
  critical: {
    Icon: AlertCircle,
    container: 'border-red-200 bg-red-50/70',
    iconBg: 'bg-red-100 text-red-700',
    defaultTitle: 'Attention',
  },
  tip: {
    Icon: Sparkles,
    container: 'border-secondary-200 bg-secondary-50/40',
    iconBg: 'bg-secondary-100 text-secondary-700',
    defaultTitle: 'Conseil expert',
  },
}

export function CalloutBlock({ tone, title, text }: CalloutBlockProps) {
  const theme = THEMES[tone]
  const t = title ?? theme.defaultTitle
  return (
    <div role="note" className={`my-6 flex gap-4 rounded-2xl border p-5 ${theme.container}`}>
      <div
        className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ${theme.iconBg}`}
        aria-hidden="true"
      >
        <theme.Icon className="h-5 w-5" strokeWidth={2.4} />
      </div>
      <div className="flex-1">
        <div className="mb-1 text-xs font-extrabold uppercase tracking-wider text-charcoal-700">
          {t}
        </div>
        <p className="m-0 text-[15px] leading-relaxed text-charcoal-800">{text}</p>
      </div>
    </div>
  )
}
