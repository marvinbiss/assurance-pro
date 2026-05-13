/**
 * MockOfferCard — Card individuelle dans le mockup comparateur du hero.
 * Composant pur (pas de hook, pas d'interaction client) — Server-safe.
 */

import { Star } from 'lucide-react'

interface MockOfferCardProps {
  name: string
  tag: string
  price: string
  recommended?: boolean
}

export function MockOfferCard({ name, tag, price, recommended = false }: MockOfferCardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-xl border p-4 backdrop-blur-md transition-all ${
        recommended
          ? 'border-secondary-300/60 bg-white/95 shadow-glow-gold'
          : 'border-white/15 bg-white/10 hover:translate-x-1'
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <div
            className={`mb-1 text-[10px] font-bold uppercase tracking-wider ${
              recommended ? 'text-secondary-700' : 'text-white/70'
            }`}
          >
            {tag}
          </div>
          <div
            className={`font-heading text-base font-extrabold ${
              recommended ? 'text-charcoal-900' : 'text-white'
            }`}
          >
            {name}
          </div>
        </div>
        <div
          className={`flex items-baseline gap-1 font-heading font-extrabold ${
            recommended ? 'text-secondary-700' : 'text-white'
          }`}
        >
          <span className="text-2xl">{price}</span>
          <span className="text-xs opacity-70">/an</span>
        </div>
      </div>
      {recommended && (
        <div className="mt-3 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-secondary-700">
          <Star className="h-3 w-3 fill-current" />
          Recommandation Vivos
        </div>
      )}
    </div>
  )
}
