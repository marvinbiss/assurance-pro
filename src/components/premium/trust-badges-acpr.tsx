import { Award, Scale, ShieldCheck } from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'

interface TrustBadgesAcprProps {
  orias?: string
  className?: string
}

interface BadgeDef {
  readonly key: string
  readonly Icon: ComponentType<SVGProps<SVGSVGElement>>
  readonly label: string
  readonly tooltip: string
  readonly ariaLabel: string
}

export function TrustBadgesAcpr({ orias, className = '' }: TrustBadgesAcprProps) {
  const oriasLabel = orias ? `ORIAS n°${orias}` : 'ORIAS n°XXX'
  const oriasTooltip = orias
    ? `Inscription au registre ORIAS sous le numéro ${orias} — intermédiaire en assurance vérifié.`
    : 'Registre unique des intermédiaires en assurance, banque et finance — vérification d’identité légale.'

  const badges: readonly BadgeDef[] = [
    {
      key: 'orias',
      Icon: ShieldCheck,
      label: oriasLabel,
      tooltip: oriasTooltip,
      ariaLabel: `Inscription ORIAS — ${oriasLabel}`,
    },
    {
      key: 'acpr',
      Icon: Scale,
      label: 'ACPR Conformité',
      tooltip:
        'Conforme à la supervision de l’Autorité de Contrôle Prudentiel et de Résolution (Banque de France).',
      ariaLabel: 'Conformité ACPR — Autorité de Contrôle Prudentiel et de Résolution',
    },
    {
      key: 'dda',
      Icon: Award,
      label: 'DDA Compliant',
      tooltip:
        'Respect de la Directive sur la Distribution d’Assurance (DDA) — devoir de conseil et transparence.',
      ariaLabel: 'Conformité DDA — Directive sur la Distribution d’Assurance',
    },
  ]

  return (
    <ul
      className={`flex flex-wrap items-center gap-2 motion-safe:transition-colors sm:gap-3 ${className}`}
      aria-label="Badges de conformité réglementaire"
    >
      {badges.map(({ key, Icon, label, tooltip, ariaLabel }) => (
        <li key={key}>
          <span
            title={tooltip}
            aria-label={ariaLabel}
            tabIndex={0}
            className="group inline-flex items-center gap-1.5 rounded-full border border-secondary-300 bg-secondary-50/40 px-3 py-1.5 text-charcoal-800 outline-none hover:bg-secondary-50/70 focus-visible:ring-2 focus-visible:ring-secondary-400 focus-visible:ring-offset-1 motion-safe:transition-colors"
          >
            <Icon className="h-3.5 w-3.5 text-accent-600" aria-hidden="true" strokeWidth={2} />
            <span className="font-heading text-[10px] font-semibold uppercase tracking-wider">
              {label}
            </span>
          </span>
        </li>
      ))}
    </ul>
  )
}
