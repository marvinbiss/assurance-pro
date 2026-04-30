'use client'

import { Target, Phone, Mail, MapPin, FileText, Clock, DollarSign } from 'lucide-react'

// ─── Score Badge ──────────────────────────────────────────────

interface LeadScoreBadgeProps {
  score: number
  size?: 'sm' | 'md'
}

function getScoreColor(score: number): { bg: string; text: string; ring: string } {
  if (score >= 70) return { bg: 'bg-green-100', text: 'text-green-700', ring: 'ring-green-200' }
  if (score >= 40) return { bg: 'bg-orange-100', text: 'text-orange-700', ring: 'ring-orange-200' }
  return { bg: 'bg-red-100', text: 'text-red-700', ring: 'ring-red-200' }
}

export function LeadScoreBadge({ score, size = 'md' }: LeadScoreBadgeProps) {
  const colors = getScoreColor(score)
  const sizeClasses = size === 'sm'
    ? 'px-2 py-0.5 text-xs'
    : 'px-3 py-1 text-sm'

  return (
    <span
      className={`inline-flex items-center gap-1.5 ${sizeClasses} font-bold rounded-full ring-1 ${colors.bg} ${colors.text} ${colors.ring}`}
      title={`Score lead : ${score}/100`}
    >
      <Target className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
      {score}
    </span>
  )
}

// ─── Score Detail ──────────────────────────────────────────────

interface LeadScoreDetailProps {
  score: number
  factors: Record<string, number>
}

const FACTOR_META: Record<string, { label: string; max: number; icon: typeof Phone }> = {
  urgency: { label: 'Urgence', max: 30, icon: Clock },
  phone: { label: 'Telephone fourni', max: 20, icon: Phone },
  budget: { label: 'Budget renseigne', max: 15, icon: DollarSign },
  city: { label: 'Ville precise', max: 15, icon: MapPin },
  description: { label: 'Description detaillee', max: 10, icon: FileText },
  email: { label: 'Email fourni', max: 10, icon: Mail },
}

export function LeadScoreDetail({ score, factors }: LeadScoreDetailProps) {
  const colors = getScoreColor(score)

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-900">Score du lead</h2>
        <span className={`text-2xl font-bold ${colors.text}`}>{score}</span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-100 rounded-full h-3 mb-6">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            score >= 70 ? 'bg-green-500' : score >= 40 ? 'bg-orange-500' : 'bg-red-500'
          }`}
          style={{ width: `${score}%` }}
        />
      </div>

      {/* Factors breakdown */}
      <div className="space-y-3">
        {Object.entries(FACTOR_META).map(([key, meta]) => {
          const value = factors[key] ?? 0
          const Icon = meta.icon
          const active = value > 0

          return (
            <div key={key} className="flex items-center gap-3">
              <div className={`p-1.5 rounded-lg ${active ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-400'}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${active ? 'text-gray-700' : 'text-gray-400'}`}>
                    {meta.label}
                  </span>
                  <span className={`text-xs font-medium ${active ? 'text-gray-900' : 'text-gray-400'}`}>
                    +{value}/{meta.max}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1 mt-1">
                  <div
                    className={`h-full rounded-full ${active ? 'bg-blue-500' : 'bg-gray-200'}`}
                    style={{ width: `${(value / meta.max) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
