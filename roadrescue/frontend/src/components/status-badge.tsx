import { cn } from '../lib/utils'
import type { RequestStatus } from '../lib/road-rescue'

const STYLES: Record<RequestStatus, string> = {
  Pending: 'bg-amber-100 text-amber-700 ring-amber-200',
  'In Progress': 'bg-sky-100 text-sky-700 ring-sky-200',
  Completed: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
  Cancelled: 'bg-rose-100 text-rose-700 ring-rose-200',
}

const DOT: Record<RequestStatus, string> = {
  Pending: 'bg-amber-500',
  'In Progress': 'bg-sky-500',
  Completed: 'bg-emerald-500',
  Cancelled: 'bg-rose-500',
}

export function StatusBadge({
  status,
  className,
}: {
  status: RequestStatus
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset',
        STYLES[status],
        className,
      )}
    >
      <span className={cn('size-1.5 rounded-full', DOT[status])} aria-hidden />
      {status}
    </span>
  )
}
