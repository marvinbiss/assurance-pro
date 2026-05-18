import { ReactNode } from 'react'

interface FormSectionProps {
  title: string
  description?: string
  children: ReactNode
}

export function FormSection({ title, description, children }: FormSectionProps) {
  return (
    <div className="rounded-xl border border-sand-200 bg-white p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-charcoal-900">{title}</h3>
        {description && <p className="mt-1 text-sm text-charcoal-500">{description}</p>}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  )
}
