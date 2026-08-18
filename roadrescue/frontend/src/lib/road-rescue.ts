import {
  Battery,
  CircleDashed,
  Fuel,
  KeyRound,
  Truck,
  Wrench,
  type LucideIcon,
} from 'lucide-react'

export type VehicleType = 'Car' | 'SUV' | 'Motorcycle' | 'Truck' | 'Electric Vehicle'

export type ProblemType =
  | 'Flat Tire'
  | 'Dead Battery / Jumpstart'
  | 'Engine Breakdown'
  | 'Fuel Delivery'
  | 'Locked Out'
  | 'Tow Required'

export type RequestStatus = 'Pending' | 'In Progress' | 'Completed' | 'Cancelled'

export interface RescueRequest {
  id: string
  name: string
  phone: string
  vehicle: VehicleType
  problem: ProblemType
  location: string
  notes?: string
  submittedAt: number
  status: RequestStatus
}

export const VEHICLE_TYPES: VehicleType[] = [
  'Car',
  'SUV',
  'Motorcycle',
  'Truck',
  'Electric Vehicle',
]

export const PROBLEM_TYPES: { value: ProblemType; icon: LucideIcon }[] = [
  { value: 'Flat Tire', icon: CircleDashed },
  { value: 'Dead Battery / Jumpstart', icon: Battery },
  { value: 'Engine Breakdown', icon: Wrench },
  { value: 'Fuel Delivery', icon: Fuel },
  { value: 'Locked Out', icon: KeyRound },
  { value: 'Tow Required', icon: Truck },
]

export const PROBLEM_ICONS: Record<ProblemType, LucideIcon> = PROBLEM_TYPES.reduce(
  (acc, { value, icon }) => {
    acc[value] = icon
    return acc
  },
  {} as Record<ProblemType, LucideIcon>,
)

export const STATUS_ORDER: RequestStatus[] = [
  'Pending',
  'In Progress',
  'Completed',
  'Cancelled',
]

export function generateRequestId(): string {
  const n = Math.floor(10000 + Math.random() * 89999)
  return `#RR-${n}`
}

export function formatTime(ts: number): string {
  return new Date(ts).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

const now = Date.now()
const min = 60 * 1000

export const INITIAL_REQUESTS: RescueRequest[] = [
  {
    id: '#RR-40218',
    name: 'Marcus Bell',
    phone: '(415) 555-0182',
    vehicle: 'SUV',
    problem: 'Dead Battery / Jumpstart',
    location: '2400 Market St, San Francisco, CA',
    notes: 'Parked in an underground garage, level 2.',
    submittedAt: now - 8 * min,
    status: 'Pending',
  },
  {
    id: '#RR-77301',
    name: 'Priya Nair',
    phone: '(206) 555-0147',
    vehicle: 'Electric Vehicle',
    problem: 'Flat Tire',
    location: 'I-5 N near Exit 165, Seattle, WA',
    notes: 'Rear passenger tire, spare available in trunk.',
    submittedAt: now - 34 * min,
    status: 'In Progress',
  },
  {
    id: '#RR-51944',
    name: 'Diego Ramirez',
    phone: '(512) 555-0119',
    vehicle: 'Truck',
    problem: 'Fuel Delivery',
    location: 'US-290 W, Austin, TX',
    submittedAt: now - 92 * min,
    status: 'Pending',
  },
  {
    id: '#RR-63820',
    name: 'Hannah Cole',
    phone: '(312) 555-0173',
    vehicle: 'Car',
    problem: 'Locked Out',
    location: '875 N Michigan Ave, Chicago, IL',
    notes: 'Keys locked inside, engine running.',
    submittedAt: now - 3 * 60 * min,
    status: 'Completed',
  },
  {
    id: '#RR-29055',
    name: 'Tyler Okafor',
    phone: '(646) 555-0198',
    vehicle: 'Motorcycle',
    problem: 'Engine Breakdown',
    location: 'Brooklyn Bridge Blvd, New York, NY',
    submittedAt: now - 5 * 60 * min,
    status: 'Completed',
  },
]
