export interface TimelineBlockProps {
  steps: Array<{ when: string; label: string; detail?: string }>
}

export function TimelineBlock({ steps }: TimelineBlockProps) {
  return (
    <ol className="my-10 space-y-6 md:flex md:items-start md:space-x-4 md:space-y-0">
      {steps.map((step, i) => (
        <li key={i} className="relative flex gap-4 md:flex-1 md:flex-col md:gap-2">
          {/* Connector */}
          {i < steps.length - 1 && (
            <>
              <span
                className="absolute left-1.5 top-6 h-[calc(100%-1rem)] w-0.5 bg-primary-200 md:hidden"
                aria-hidden="true"
              />
              <span
                className="absolute left-1/2 top-1.5 hidden h-0.5 w-full bg-primary-200 md:block"
                aria-hidden="true"
              />
            </>
          )}
          <span
            className="relative z-10 mt-1 h-3 w-3 flex-shrink-0 rounded-full bg-primary-600 ring-4 ring-primary-100 md:mt-0"
            aria-hidden="true"
          />
          <div className="flex-1 md:pt-2">
            <p className="m-0 text-xs font-extrabold uppercase tracking-wider text-primary-700">
              {step.when}
            </p>
            <p className="m-0 mt-1 font-heading text-base font-extrabold text-charcoal-900">
              {step.label}
            </p>
            {step.detail && (
              <p className="m-0 mt-1.5 text-xs leading-relaxed text-charcoal-600">{step.detail}</p>
            )}
          </div>
        </li>
      ))}
    </ol>
  )
}
