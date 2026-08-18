'use client'

import { useMemo, useState } from 'react'
import { CheckCircle2, ClipboardList, Clock3, Eye, Phone, Search, X } from 'lucide-react'
import { Button } from './ui/button'
import { StatusBadge } from './status-badge'
import { cn } from '../lib/utils'
import {
  PROBLEM_ICONS,
  STATUS_ORDER,
  formatTime,
  type RequestStatus,
  type RescueRequest,
} from '../lib/road-rescue'

type Filter = 'All' | RequestStatus

export function AdminView({ requests, onStatusChange }: { requests: RescueRequest[]; onStatusChange: (id: string, status: RequestStatus) => void }) {
  const [filter, setFilter] = useState<Filter>('All')
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const kpis = useMemo(() => {
    return {
      total: requests.length,
      pending: requests.filter((r) => r.status === 'Pending').length,
      inProgress: requests.filter((r) => r.status === 'In Progress').length,
      completed: requests.filter((r) => r.status === 'Completed').length,
    }
  }, [requests])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return requests
      .filter((r) => (filter === 'All' ? true : r.status === filter))
      .filter((r) => !q || r.id.toLowerCase().includes(q) || r.name.toLowerCase().includes(q) || r.location.toLowerCase().includes(q))
      .sort((a, b) => b.submittedAt - a.submittedAt)
  }, [requests, filter, query])

  const selected = requests.find((r) => r.id === selectedId) ?? null

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Dispatch Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">Monitor incoming requests and coordinate technician response in real time.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <KpiCard label="Total Requests" value={kpis.total} icon={ClipboardList} tone="primary" />
        <KpiCard label="Pending Requests" value={kpis.pending} icon={Clock3} tone="amber" badge={`${kpis.inProgress} in progress`} />
        <KpiCard label="Completed Requests" value={kpis.completed} icon={CheckCircle2} tone="emerald" />
      </div>

      <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {(['All', ...STATUS_ORDER] as Filter[]).map((f) => {
            const active = filter === f
            const count = f === 'All' ? requests.length : requests.filter((r) => r.status === f).length
            return (
              <button key={f} type="button" onClick={() => setFilter(f)} className={cn('inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors', active ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card text-muted-foreground hover:text-foreground')}>
                {f}
                <span className={cn('rounded-full px-1.5 text-[10px]', active ? 'bg-primary-foreground/20' : 'bg-muted')}>{count}</span>
              </button>
            )
          })}
        </div>

        <div className="relative w-full lg:w-72">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search ID, name, or location…" className="h-10 w-full rounded-xl border border-input bg-card pr-3 pl-9 text-sm outline-none transition-colors focus:border-primary focus:ring-3 focus:ring-primary/20" />
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                <Th>Request ID</Th>
                <Th>Customer</Th>
                <Th>Phone</Th>
                <Th>Vehicle</Th>
                <Th>Problem</Th>
                <Th>Location</Th>
                <Th>Time</Th>
                <Th>Status</Th>
                <Th className="text-right">Actions</Th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => {
                const Icon = PROBLEM_ICONS[r.problem]
                return (
                  <tr key={r.id} className="border-b border-border/70 transition-colors last:border-0 hover:bg-muted/30">
                    <td className="px-4 py-3 font-mono text-xs font-bold text-primary">{r.id}</td>
                    <td className="px-4 py-3 font-semibold text-foreground">{r.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.phone}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.vehicle}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 text-foreground">
                        <Icon className="size-4 text-accent" />
                        {r.problem}
                      </span>
                    </td>
                    <td className="max-w-[180px] truncate px-4 py-3 text-muted-foreground">{r.location}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">{formatTime(r.submittedAt)}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={r.status} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="outline" size="sm" className="rounded-lg" onClick={() => setSelectedId(r.id)}>
                        <Eye className="size-3.5" />
                        View
                      </Button>
                    </td>
                  </tr>
                )
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-16 text-center text-muted-foreground">No requests match your filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selected && <DetailDrawer request={selected} onClose={() => setSelectedId(null)} onStatusChange={onStatusChange} />}
    </div>
  )
}

function DetailDrawer({ request, onClose, onStatusChange }: { request: RescueRequest; onClose: () => void; onStatusChange: (id: string, status: RequestStatus) => void }) {
  const Icon = PROBLEM_ICONS[request.problem]

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-foreground/40 backdrop-blur-sm">
      <button type="button" aria-label="Close panel" className="flex-1" onClick={onClose} />
      <aside className="flex h-full w-full max-w-md flex-col overflow-y-auto border-l border-border bg-card shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-border bg-gradient-to-br from-primary/10 to-accent/10 px-6 py-5">
          <div>
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Request Details</p>
            <p className="mt-0.5 font-mono text-lg font-extrabold text-primary">{request.id}</p>
            <div className="mt-2">
              <StatusBadge status={request.status} />
            </div>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-background/60 hover:text-foreground">
            <X className="size-4" />
          </button>
        </div>

        <div className="flex-1 px-6 py-5">
          <SectionTitle>Customer</SectionTitle>
          <div className="rounded-2xl border border-border bg-muted/30 p-4">
            <p className="text-base font-bold text-foreground">{request.name}</p>
            <a href={`tel:${request.phone.replace(/[^\d+]/g, '')}`} className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
              <Phone className="size-3.5" />
              {request.phone}
            </a>
          </div>

          <SectionTitle className="mt-6">Incident</SectionTitle>
          <dl className="space-y-3 rounded-2xl border border-border bg-muted/30 p-4 text-sm">
            <DetailRow label="Vehicle">{request.vehicle}</DetailRow>
            <DetailRow label="Problem">
              <span className="inline-flex items-center gap-1.5">
                <Icon className="size-4 text-accent" />
                {request.problem}
              </span>
            </DetailRow>
            <DetailRow label="Location">{request.location}</DetailRow>
            <DetailRow label="Submitted">{formatTime(request.submittedAt)}</DetailRow>
          </dl>

          {request.notes && (
            <>
              <SectionTitle className="mt-6">Notes</SectionTitle>
              <p className="rounded-2xl border border-border bg-muted/30 p-4 text-sm leading-relaxed text-foreground">{request.notes}</p>
            </>
          )}

          <SectionTitle className="mt-6">Update Status</SectionTitle>
          <div className="grid grid-cols-2 gap-2">
            {STATUS_ORDER.map((s) => {
              const active = request.status === s
              return (
                <button key={s} type="button" onClick={() => onStatusChange(request.id, s)} aria-pressed={active} className={cn('rounded-xl border px-3 py-2.5 text-sm font-semibold transition-all', active ? 'border-primary bg-primary text-primary-foreground shadow-sm' : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground')}>
                  {s}
                </button>
              )
            })}
          </div>
        </div>

        <div className="border-t border-border px-6 py-4">
          <Button className="h-11 w-full rounded-xl" onClick={onClose}>
            Done
          </Button>
        </div>
      </aside>
    </div>
  )
}

function KpiCard({ label, value, icon: Icon, tone, badge }: { label: string; value: number; icon: typeof ClipboardList; tone: 'primary' | 'amber' | 'emerald'; badge?: string }) {
  const tones = { primary: 'bg-primary/10 text-primary', amber: 'bg-amber-100 text-amber-600', emerald: 'bg-emerald-100 text-emerald-600' }
  const badgeTones = { primary: 'bg-primary/10 text-primary', amber: 'bg-amber-100 text-amber-700', emerald: 'bg-emerald-100 text-emerald-700' }
  return (
    <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="mt-1 text-3xl font-extrabold tracking-tight text-foreground">{value}</p>
        {badge && <span className={cn('mt-2 inline-flex rounded-full px-2 py-0.5 text-xs font-semibold', badgeTones[tone])}>{badge}</span>}
      </div>
      <span className={cn('flex size-12 items-center justify-center rounded-2xl', tones[tone])}>
        <Icon className="size-6" />
      </span>
    </div>
  )
}

function Th({ children, className }: { children: React.ReactNode; className?: string }) {
  return <th className={cn('px-4 py-3 font-semibold', className)}>{children}</th>
}

function SectionTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn('mb-2 text-xs font-bold tracking-wide text-muted-foreground uppercase', className)}>{children}</p>
}

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-semibold text-foreground">{children}</dd>
    </div>
  )
}
