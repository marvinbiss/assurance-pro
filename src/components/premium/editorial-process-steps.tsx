import type { LucideIcon } from 'lucide-react'

interface ProcessStep {
  n: string
  title: string
  desc: string
  Icon?: LucideIcon
}

interface EditorialProcessStepsProps {
  steps: readonly ProcessStep[]
  className?: string
}

const OFFSETS = ['lg:ml-0', 'lg:ml-24', 'lg:ml-8']

export function EditorialProcessSteps({ steps, className = '' }: EditorialProcessStepsProps) {
  return (
    <div className={`mx-auto max-w-5xl space-y-16 lg:space-y-24 ${className}`}>
      {steps.map((step, i) => (
        <div
          key={step.n}
          className={`relative flex flex-col items-start gap-6 md:flex-row md:items-end md:gap-10 ${
            OFFSETS[i % OFFSETS.length]
          }`}
        >
          <span
            aria-hidden
            className="font-display select-none text-[6rem] font-medium leading-none tracking-tight text-primary-200 md:text-[9rem]"
            style={{
              fontFamily: 'var(--font-heading), Fraunces, serif',
              fontVariationSettings: '"SOFT" 100, "WONK" 1',
              opacity: 0.55,
            }}
          >
            {step.n}
          </span>

          <div className="md:mb-6 md:flex-1">
            <div className="mb-3 flex items-center gap-3">
              {step.Icon && <step.Icon className="h-5 w-5 text-primary-600" aria-hidden />}
              <h3 className="font-heading text-2xl font-semibold text-charcoal-900 md:text-3xl">
                {step.title}
              </h3>
            </div>
            <p className="max-w-md text-base leading-relaxed text-charcoal-700 md:text-lg">
              {step.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
