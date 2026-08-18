'use client'

import { useRef, useState } from 'react'
import {
  Check,
  ChevronDown,
  Clock,
  Copy,
  Loader2,
  MapPin,
  Navigation,
  PhoneCall,
  Send,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'
import { Button } from './ui/button'
import { StatusBadge } from './status-badge'
import { cn } from '../lib/utils'
import {
  PROBLEM_ICONS,
  PROBLEM_TYPES,
  VEHICLE_TYPES,
  type ProblemType,
  type RescueRequest,
  type VehicleType,
} from '../lib/road-rescue'

interface FormState {
  name: string
  phone: string
  vehicle: VehicleType | ''
  problem: ProblemType | ''
  location: string
  notes: string
}

type Errors = Partial<Record<keyof FormState, string>>

const EMPTY: FormState = {
  name: '',
  phone: '',
  vehicle: '',
  problem: '',
  location: '',
  notes: '',
}

const TRUST = [
  { icon: Clock, label: 'Avg 15-Min Arrival', sub: 'Rapid nationwide response' },
  { icon: ShieldCheck, label: 'Verified Technicians', sub: 'Vetted & insured pros' },
  { icon: Navigation, label: 'GPS Dispatch', sub: 'Live location tracking' },
]

export function UserView({
  onCreate,
}: {
  onCreate: (data: Omit<RescueRequest, 'id' | 'submittedAt' | 'status'>) => RescueRequest
}) {
  const [form, setForm] = useState<FormState>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState(false)
  const [detecting, setDetecting] = useState(false)
  const [confirmed, setConfirmed] = useState<RescueRequest | null>(null)
  const formRef = useRef<HTMLDivElement>(null)

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function detectLocation() {
    setDetecting(true)
    if (!navigator.geolocation) {
      setDetecting(false)
      set('location', 'Location services unavailable — enter manually')
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        set('location', `Lat ${latitude.toFixed(4)}, Lng ${longitude.toFixed(4)}`)
        setDetecting(false)
      },
      () => {
        set('location', 'Unable to detect — please enter your location')
        setDetecting(false)
      },
      { enableHighAccuracy: true, timeout: 8000 },
    )
  }

  function validate(): boolean {
    const e: Errors = {}
    if (!form.name.trim()) e.name = 'Please enter your full name.'
    if (!form.phone.trim()) e.phone = 'A phone number is required.'
    else if (!/[\d][\d\s().+-]{6,}/.test(form.phone)) e.phone = 'Enter a valid phone number.'
    if (!form.vehicle) e.vehicle = 'Select your vehicle type.'
    if (!form.problem) e.problem = 'Select the problem type.'
    if (!form.location.trim()) e.location = 'Tell us where you are.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    setTimeout(() => {
      const created = onCreate({
        name: form.name.trim(),
        phone: form.phone.trim(),
        vehicle: form.vehicle as VehicleType,
        problem: form.problem as ProblemType,
        location: form.location.trim(),
        notes: form.notes.trim() || undefined,
      })
      setConfirmed(created)
      setSubmitting(false)
    }, 900)
  }

  function resetForm() {
    setForm(EMPTY)
    setErrors({})
    setConfirmed(null)
    scrollToForm()
  }

  return (
    <div>
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        <div className="relative mx-auto max-w-6xl px-4 pt-14 pb-10 sm:px-6 sm:pt-20 sm:pb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-bold tracking-wide text-primary uppercase">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-70" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            Dispatchers online now
          </span>

          <h1 className="mt-5 max-w-2xl text-4xl font-extrabold tracking-tight text-balance sm:text-6xl">Fast 24/7 Emergency Roadside Assistance</h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">Stuck on the side of the road? Get a verified technician dispatched to your exact location in minutes — day or night, wherever you are.</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" onClick={scrollToForm} className="h-12 rounded-xl px-6 text-base shadow-lg shadow-primary/25">
              <Send className="size-4" />
              Request Immediate Help
            </Button>
            <Button size="lg" variant="outline" className="h-12 rounded-xl px-6 text-base">
              <PhoneCall className="size-4 text-primary" />
              Call 1-800-555-0199
            </Button>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {TRUST.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-start gap-3 rounded-2xl border border-border bg-card/70 p-4 backdrop-blur-sm">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <Icon className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-bold text-foreground">{label}</p>
                  <p className="text-xs text-muted-foreground">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={formRef} className="mx-auto max-w-3xl scroll-mt-20 px-4 py-12 sm:px-6">
        <div className="mb-6 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-bold tracking-wide text-accent uppercase">
            <Sparkles className="size-3.5" />
            Roadside Help Request
          </span>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">Tell us what happened</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">Fill out the details below and we&apos;ll dispatch the nearest technician.</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-3xl border border-border bg-card p-5 shadow-xl shadow-primary/5 sm:p-7" noValidate>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Full Name" error={errors.name} htmlFor="name">
              <input id="name" type="text" autoComplete="name" value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Jane Doe" className={inputCls(!!errors.name)} />
            </Field>

            <Field label="Phone Number" error={errors.phone} htmlFor="phone">
              <input id="phone" type="tel" autoComplete="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="(555) 123-4567" className={inputCls(!!errors.phone)} />
            </Field>

            <Field label="Vehicle Type" error={errors.vehicle} htmlFor="vehicle">
              <SelectShell>
                <select id="vehicle" value={form.vehicle} onChange={(e) => set('vehicle', e.target.value as VehicleType)} className={selectCls(!form.vehicle)}>
                  <option value="" disabled>
                    Select vehicle…
                  </option>
                  {VEHICLE_TYPES.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </SelectShell>
            </Field>

            <Field label="Problem Type" error={errors.problem} htmlFor="problem">
              <SelectShell>
                <select id="problem" value={form.problem} onChange={(e) => set('problem', e.target.value as ProblemType)} className={selectCls(!form.problem)}>
                  <option value="" disabled>
                    Select problem…
                  </option>
                  {PROBLEM_TYPES.map(({ value }) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </SelectShell>
            </Field>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {PROBLEM_TYPES.map(({ value, icon: Icon }) => {
              const active = form.problem === value
              return (
                <button key={value} type="button" onClick={() => set('problem', value)} className={cn('inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors', active ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-muted/40 text-muted-foreground hover:text-foreground')}>
                  <Icon className="size-3.5" />
                  {value}
                </button>
              )
            })}
          </div>

          <div className="mt-5">
            <Field label="Location" error={errors.location} htmlFor="location">
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative flex-1">
                  <MapPin className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input id="location" type="text" value={form.location} onChange={(e) => set('location', e.target.value)} placeholder="Address, highway exit, or landmark" className={cn(inputCls(!!errors.location), 'pl-9')} />
                </div>
                <Button type="button" variant="outline" onClick={detectLocation} disabled={detecting} className="h-11 shrink-0 rounded-xl">
                  {detecting ? <Loader2 className="size-4 animate-spin" /> : <Navigation className="size-4 text-primary" />}
                  {detecting ? 'Detecting…' : 'Detect My Location'}
                </Button>
              </div>
            </Field>
          </div>

          <div className="mt-5">
            <Field label="Additional Notes" htmlFor="notes" optional>
              <textarea id="notes" rows={3} value={form.notes} onChange={(e) => set('notes', e.target.value)} placeholder="Anything the technician should know (e.g. parked in garage, hazards on)…" className={cn(inputCls(false), 'min-h-[80px] resize-y py-2.5')} />
            </Field>
          </div>

          <Button type="submit" size="lg" disabled={submitting} className="mt-6 h-12 w-full rounded-xl text-base shadow-lg shadow-primary/25">
            {submitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Dispatching…
              </>
            ) : (
              <>
                <Send className="size-4" />
                Submit Emergency Request
              </>
            )}
          </Button>
        </form>
      </section>

      {confirmed && (
        <ConfirmationModal request={confirmed} onClose={() => setConfirmed(null)} onAnother={resetForm} />
      )}
    </div>
  )
}

function ConfirmationModal({ request, onClose, onAnother }: { request: RescueRequest; onClose: () => void; onAnother: () => void }) {
  const [copied, setCopied] = useState(false)
  const Icon = PROBLEM_ICONS[request.problem]

  function copyId() {
    navigator.clipboard?.writeText(request.id).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 p-4 backdrop-blur-sm sm:items-center">
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
        <div className="relative bg-gradient-to-br from-primary/15 to-accent/15 px-6 pt-7 pb-6 text-center">
          <button type="button" onClick={onClose} aria-label="Close" className="absolute top-4 right-4 flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-background/60 hover:text-foreground">
            <X className="size-4" />
          </button>
          <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 ring-8 ring-emerald-50">
            <Check className="size-7" />
          </span>
          <h3 className="mt-4 text-xl font-extrabold tracking-tight">Help is on the way!</h3>
          <p className="mt-1 text-sm text-muted-foreground">Your request has been received by our dispatch team.</p>
        </div>

        <div className="px-6 py-5">
          <div className="flex items-center justify-between rounded-2xl border border-dashed border-primary/40 bg-primary/5 px-4 py-3">
            <div>
              <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Request ID</p>
              <p className="font-mono text-lg font-extrabold text-primary">{request.id}</p>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={copyId} className="rounded-lg">
              {copied ? (
                <>
                  <Check className="size-3.5 text-emerald-600" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="size-3.5" />
                  Copy ID
                </>
              )}
            </Button>
          </div>

          <dl className="mt-4 space-y-2.5 text-sm">
            <SummaryRow label="Status">
              <StatusBadge status={request.status} />
            </SummaryRow>
            <SummaryRow label="Name">{request.name}</SummaryRow>
            <SummaryRow label="Phone">{request.phone}</SummaryRow>
            <SummaryRow label="Vehicle">{request.vehicle}</SummaryRow>
            <SummaryRow label="Problem">
              <span className="inline-flex items-center gap-1.5">
                <Icon className="size-4 text-primary" />
                {request.problem}
              </span>
            </SummaryRow>
            <SummaryRow label="Location">
              <span className="text-right">{request.location}</span>
            </SummaryRow>
          </dl>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <Button className="h-11 flex-1 rounded-xl" onClick={onClose}>
              <Navigation className="size-4" />
              Track Request
            </Button>
            <Button variant="outline" className="h-11 flex-1 rounded-xl" onClick={onAnother}>
              Submit Another
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function SummaryRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-semibold text-foreground">{children}</dd>
    </div>
  )
}

function Field({ label, error, htmlFor, optional, children }: { label: string; error?: string; htmlFor: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-foreground">
        {label}
        {optional && <span className="text-xs font-normal text-muted-foreground">(optional)</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs font-medium text-destructive">{error}</p>}
    </div>
  )
}

function SelectShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  )
}

function inputCls(invalid: boolean) {
  return cn('h-11 w-full rounded-xl border bg-background px-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-3 focus:ring-primary/20', invalid ? 'border-destructive' : 'border-input')
}

function selectCls(placeholder: boolean) {
  return cn('h-11 w-full appearance-none rounded-xl border border-input bg-background pr-9 pl-3.5 text-sm outline-none transition-colors focus:border-primary focus:ring-3 focus:ring-primary/20', placeholder ? 'text-muted-foreground/70' : 'text-foreground')
}
