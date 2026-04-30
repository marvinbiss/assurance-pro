'use client'

import Link from 'next/link'
import {
  Calendar,
  Phone,
  Mail,
  MessageSquare,
  MoreHorizontal,
  ArrowRight,
  Check,
  X,
  Loader2,
} from 'lucide-react'
import { useAdminFetch, adminMutate } from '@/hooks/admin/useAdminFetch'
import { useState } from 'react'

// ─── Types ──────────────────────────────────────────────────

interface LeadInfo {
  id: string
  service_name: string
  city: string | null
  client_name: string
  client_phone: string
  status: string
  lead_score: number
}

interface UpcomingFollowup {
  id: string
  lead_id: string
  scheduled_at: string
  type: 'call' | 'email' | 'sms' | 'other'
  note: string | null
  status: string
  created_by: string
  created_at: string
  lead: LeadInfo | null
}

interface UpcomingResponse {
  followups: UpcomingFollowup[]
  grouped: {
    today: UpcomingFollowup[]
    tomorrow: UpcomingFollowup[]
    later: UpcomingFollowup[]
  }
  total: number
}

// ─── Constants ──────────────────────────────────────────────

const TYPE_ICONS: Record<string, typeof Phone> = {
  call: Phone,
  email: Mail,
  sms: MessageSquare,
  other: MoreHorizontal,
}

const TYPE_LABELS: Record<string, string> = {
  call: 'Appel',
  email: 'Email',
  sms: 'SMS',
  other: 'Autre',
}

// ─── Component ──────────────────────────────────────────────

interface FollowupWidgetProps {
  loading?: boolean
}

export function FollowupWidget({ loading: externalLoading }: FollowupWidgetProps) {
  const { data, isLoading, mutate } = useAdminFetch<UpcomingResponse>(
    '/api/admin/followups/upcoming'
  )
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const todayFollowups = data?.grouped?.today || []
  const isLoadingAny = externalLoading || isLoading

  const handleUpdateStatus = async (followup: UpcomingFollowup, status: 'done' | 'skipped') => {
    setUpdatingId(followup.id)
    try {
      await adminMutate(`/api/admin/leads/${followup.lead_id}/followups/${followup.id}`, {
        method: 'PATCH',
        body: { status },
      })
      mutate()
    } catch {
      // Silent
    } finally {
      setUpdatingId(null)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Relances du jour</h3>
        </div>
        <div className="flex items-center gap-3">
          {!isLoadingAny && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              todayFollowups.length > 0
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-500'
            }`}>
              {todayFollowups.length} aujourd&apos;hui
            </span>
          )}
          <Link
            href="/admin/leads"
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Voir tout
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {isLoadingAny ? (
        <div className="p-6 space-y-3 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 bg-gray-100 rounded" />
          ))}
        </div>
      ) : todayFollowups.length === 0 ? (
        <div className="p-8 text-center text-gray-400 text-sm">
          Aucune relance prevue aujourd&apos;hui
        </div>
      ) : (
        <div className="divide-y divide-gray-50">
          {todayFollowups.map((followup) => {
            const Icon = TYPE_ICONS[followup.type] || MoreHorizontal
            const lead = followup.lead as LeadInfo | null
            const isUpdating = updatingId === followup.id
            const scheduledTime = new Date(followup.scheduled_at).toLocaleTimeString('fr-FR', {
              hour: '2-digit',
              minute: '2-digit',
            })

            return (
              <div key={followup.id} className="flex items-center justify-between px-6 py-3 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {TYPE_LABELS[followup.type]} — {lead?.service_name || 'Lead'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {lead?.client_name} {lead?.city ? `a ${lead.city}` : ''} &middot; {scheduledTime}
                    </p>
                    {followup.note && (
                      <p className="text-xs text-gray-400 truncate">{followup.note}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {lead?.client_phone && (
                    <a
                      href={`tel:${lead.client_phone.replace(/[\s.\-()]/g, '')}`}
                      className="p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                      title={`Appeler ${lead.client_phone}`}
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  )}
                  {isUpdating ? (
                    <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                  ) : (
                    <>
                      <button
                        onClick={() => handleUpdateStatus(followup, 'done')}
                        className="p-1.5 rounded-lg hover:bg-green-100 text-green-600 transition-colors"
                        title="Fait"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(followup, 'skipped')}
                        className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-400 transition-colors"
                        title="Ignorer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
