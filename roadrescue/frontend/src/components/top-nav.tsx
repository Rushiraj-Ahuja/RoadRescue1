'use client'

import { LifeBuoy, Phone, ShieldCheck, User } from 'lucide-react'
import { cn } from '../lib/utils'

export type Role = 'user' | 'admin'

export function TopNav({
  role,
  onRoleChange,
}: {
  role: Role
  onRoleChange: (role: Role) => void
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/30">
            <LifeBuoy className="size-5" />
          </span>
          <div className="leading-tight">
            <p className="text-base font-extrabold tracking-tight text-foreground">RoadRescue</p>
            <p className="hidden text-xs font-medium text-muted-foreground sm:block">24/7 Emergency Dispatch</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a href="tel:18005550199" className="hidden items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted md:inline-flex">
            <Phone className="size-4 text-primary" />
            1-800-555-0199
          </a>

          <div role="tablist" aria-label="Switch view" className="flex items-center gap-1 rounded-full border border-border bg-muted/60 p-1">
            <RoleTab active={role === 'user'} onClick={() => onRoleChange('user')} icon={<User className="size-4" />} label="Driver" full="Driver / User View" />
            <RoleTab active={role === 'admin'} onClick={() => onRoleChange('admin')} icon={<ShieldCheck className="size-4" />} label="Admin" full="Admin / Dispatcher View" />
          </div>
        </div>
      </div>
    </header>
  )
}

function RoleTab({ active, onClick, icon, label, full }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string; full: string }) {
  return (
    <button type="button" role="tab" aria-selected={active} onClick={onClick} className={cn('inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold transition-all', active ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground')}>
      {icon}
      <span className="hidden lg:inline">{full}</span>
      <span className="lg:hidden">{label}</span>
    </button>
  )
}
