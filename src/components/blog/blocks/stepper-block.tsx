export interface StepperBlockProps {
  steps: Array<{ title: string; body: string }>
}

export function StepperBlock({ steps }: StepperBlockProps) {
  return (
    <ol className="my-10 space-y-6">
      {steps.map((step, i) => (
        <li key={i} className="relative flex gap-5">
          {i < steps.length - 1 && (
            <span
              className="absolute left-5 top-12 h-[calc(100%-2rem)] w-0.5 bg-gradient-to-b from-primary-300 to-primary-100"
              aria-hidden="true"
            />
          )}
          <span
            className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-600 to-primary-700 text-sm font-extrabold text-white shadow-soft"
            aria-hidden="true"
          >
            {i + 1}
          </span>
          <div className="flex-1 pt-1">
            <h4 className="mb-2 font-heading text-lg font-extrabold text-charcoal-900">
              {step.title}
            </h4>
            <p className="text-[16px] leading-relaxed text-charcoal-700">{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
