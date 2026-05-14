import type { ReactNode } from 'react'

/**
 * Marquee — défilement horizontal infini (logos, témoignages, tags).
 * Inspiration Magic UI marquee, pure CSS (animation `marquee-scroll`
 * définie dans globals.css). Aucun JS, respect prefers-reduced-motion.
 *
 * Usage :
 *   <Marquee duration="40s" gap="4rem">
 *     {partenaires.map(p => <LogoCard key={p.name} {...p} />)}
 *   </Marquee>
 *
 * Le contenu est dupliqué pour seamless loop. Le mask gradient fade
 * sur les bords (configuré dans globals.css).
 */
interface MarqueeProps {
  children: ReactNode
  /** Durée d'un cycle complet (défaut 30s) */
  duration?: string
  /** Espacement entre items (défaut 3rem) */
  gap?: string
  /** Pause au hover */
  pauseOnHover?: boolean
  className?: string
}

export function Marquee({
  children,
  duration = '30s',
  gap = '3rem',
  pauseOnHover = true,
  className,
}: MarqueeProps) {
  const style = {
    '--marquee-duration': duration,
    '--marquee-gap': gap,
  } as React.CSSProperties

  return (
    <div
      className={`marquee ${pauseOnHover ? 'hover:[&_.marquee__track]:[animation-play-state:paused]' : ''} ${className ?? ''}`}
      style={style}
      role="marquee"
      aria-label="Défilement de logos partenaires"
    >
      {/* Duplication pour seamless loop */}
      <div className="marquee__track" aria-hidden="false">
        {children}
      </div>
      <div className="marquee__track" aria-hidden="true">
        {children}
      </div>
    </div>
  )
}
