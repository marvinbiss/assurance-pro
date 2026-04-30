'use client'

import { useState } from 'react'
import {
  Calendar,
  Clock,
  Phone,
  Mail,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Check,
  X,
  Loader2,
} from 'lucide-react'
import { useAdminFetch, adminMutate } from '@/hooks/admin/useAdminFetch'

// ─── Types ──────────────────────────────────────────────────

interface Followup {
  id: string
  lead_id: string
  scheduled_at: string
  type: 'call' | 'email' | 'sms' | 'other'
  note: string | null
  status: 'pending' | 'done' | 'skipped'
  completed_at: string | null
  created_by: string
  created_at: string
  updated_at: string
}

interface FollowupsResponse {
  followups: Followup[]
}

interface FollowupSectionProps {
  leadId: string
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

const STATUS_STYLES: Record<string, { dot: string; text: string }> = {
  pending: { dot: 'bg-yellow-400', text: 'text-yellow-700' },
  done: { dot: 'bg-green-400', text: 'text-green-700' },
  skipped: { dot: 'bg-gray-400', text: 'text-gray-500' },
}

const STATUS_LABELS: Record<string, string> = {
  pending: 'En attente',
  done: 'Fait',
  skipped: 'Ignore',
}

// ─── Component ──────────────────────────────────────────────

export function FollowupSection({ leadId }: FollowupSectionProps) {
  const [showForm, setShowForm] = useState(false)
  const [formType, setFormType] = useState<'call' | 'email' | 'sms' | 'other'>('call')
  const [formDate, setFormDate] = useState('')
  const [formNote, setFormNote] = useState('')
  const [creating, setCreating] = useState(false)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const { data, mutate } = useAdminFetch<FollowupsResponse>(
    `/api/admin/leads/${leadId}/followups`
  )

  const followups = data?.followups || []

  const handleCreate = async () => {
    if (!formDate) return
    setCreating(true)
    try {
      await adminMutate(`/api/admin/leads/${leadId}/followups`, {
        method: 'POST',
        body: {
          scheduled_at: new Date(formDate).toISOString(),
          type: formType,
          note: formNote || undefined,
        },
      })
      setShowForm(false)
      setFormDate('')
      setFormNote('')
      mutate()
    } catch {
      // Error handled by adminMutate
    } finally {
      setCreating(false)
    }
  }

  const handleUpdateStatus = async (followupId: string, status: 'done' | 'skipped') => {
    setUpdatingId(followupId)
    try {
      await adminMutate(`/api/admin/leads/${leadId}/followups/${followupId}`, {
        method: 'PATCH',
        body: { status },
      })
      mutate()
    } catch {
      // Error handled by adminMutate
    } finally {
      setUpdatingId(null)
    }
  }

  const pendingFollowups = followups.filter(f => f.status === 'pending')
  const completedFollowups = followups.filter(f => f.status !== 'pending')

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-blue-600" />
          Relances programmees ({followups.length})
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Nouvelle relance
        </button>
      </div>

      {/* Creation form */}
      {showForm && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Date et heure</label>
              <input
                type="datetime-local"
                value={formDate}
                onChange={(e) => setFormDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Type</label>
              <select
                value={formType}
                onChange={(e) => setFormType(e.target.value as typeof formType)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="call">Appel</option>
                <option value="email">Email</option>
                <option value="sms">SMS</option>
                <option value="other">Autre</option>
              </select>
            </div>
          </div>
          <div className="mt-3">
            <label className="block text-xs font-medium text-gray-600 mb-1">Note (optionnel)</label>
            <textarea
              value={formNote}
              onChange={(e) => setFormNote(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Note pour cette relance..."
            />
          </div>
          <div className="flex justify-end gap-2 mt-3">
            <button
              onClick={() => setShowForm(false)}
              className="px-3 py-1.5 text-xs text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-100"
            >
              Annuler
            </button>
            <button
              onClick={handleCreate}
              disabled={!formDate || creating}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {creating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
              Creer
            </button>
          </div>
        </div>
      )}

      {/* Pending followups */}
      {pendingFollowups.length > 0 && (
        <div className="space-y-2 mb-4">
          {pendingFollowups.map((followup) => (
            <FollowupCard
              key={followup.id}
              followup={followup}
              updatingId={updatingId}
              onUpdateStatus={handleUpdateStatus}
            />
          ))}
        </div>
      )}

      {/* Completed followups */}
      {completedFollowups.length > 0 && (
        <div>
          {pendingFollowups.length > 0 && (
            <p className="text-xs font-medium text-gray-400 uppercase mb-2">Terminees</p>
          )}
          <div className="space-y-2 opacity-60">
            {completedFollowups.map((followup) => (
              <FollowupCard
                key={followup.id}
                followup={followup}
                updatingId={updatingId}
                onUpdateStatus={handleUpdateStatus}
              />
            ))}
          </div>
        </div>
      )}

      {followups.length === 0 && !showForm && (
        <p className="text-sm text-gray-400 text-center py-4">Aucune relance programmee</p>
      )}
    </div>
  )
}

// ─── Followup Card ──────────────────────────────────────────

interface FollowupCardProps {
  followup: Followup
  updatingId: string | null
  onUpdateStatus: (id: string, status: 'done' | 'skipped') => void
}

function FollowupCard({ followup, updatingId, onUpdateStatus }: FollowupCardProps) {
  const Icon = TYPE_ICONS[followup.type] || MoreHorizontal
  const defaultStatusStyle = { dot: 'bg-gray-400', text: 'text-gray-600' }; const statusStyle = STATUS_STYLES[followup.status] ?? defaultStatusStyle
  const isUpdating = updatingId === followup.id
  const isPending = followup.status === 'pending'

  const scheduledDate = new Date(followup.scheduled_at)
  const isPast = scheduledDate < new Date() && isPending

  return (
    <div className={`flex items-start gap-3 p-3 rounded-lg border ${
      isPast ? 'border-red-200 bg-red-50/50' : 'border-gray-200 bg-gray-50'
    }`}>
      <div className={`p-1.5 rounded-lg ${isPast ? 'bg-red-100 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-900">
            {TYPE_LABELS[followup.type]}
          </span>
          <span className="flex items-center gap-1">
            <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
            <span className={`text-xs ${statusStyle.text}`}>
              {STATUS_LABELS[followup.status]}
            </span>
          </span>
          {isPast && (
            <span className="text-xs text-red-600 font-medium">En retard</span>
          )}
        </div>
        <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-500">
          <Clock className="w-3 h-3" />
          {scheduledDate.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
        {followup.note && (
          <p className="text-xs text-gray-600 mt-1">{followup.note}</p>
        )}
      </div>

      {isPending && (
        <div className="flex items-center gap-1 shrink-0">
          {isUpdating ? (
            <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
          ) : (
            <>
              <button
                onClick={() => onUpdateStatus(followup.id, 'done')}
                className="p-1.5 rounded-lg hover:bg-green-100 text-green-600 transition-colors"
                title="Marquer comme fait"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={() => onUpdateStatus(followup.id, 'skipped')}
                className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-400 transition-colors"
                title="Ignorer"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
