import type { User, Mechanic, AssistanceRequest, Vehicle } from '../types'

export const users: User[] = [
  {
    id: 'u1',
    name: 'Aisha Khan',
    email: 'aisha@example.com',
    phone: '+1-555-0100',
    avatarUrl: '',
    location: { lat: 37.7749, lng: -122.4194 }
  }
]

export const vehicles: Vehicle[] = [
  { id: 'v1', userId: 'u1', make: 'Toyota', model: 'Corolla', year: 2016 }
]

export const mechanics: Mechanic[] = [
  {
    id: 'm1',
    name: 'QuickFix Auto',
    rating: 4.8,
    services: ['towing', 'battery', 'tyre-change'],
    vehicleTypes: ['car', 'van'],
    location: { lat: 37.77986, lng: -122.42905 },
    distanceKm: 1.2
  },
  {
    id: 'm2',
    name: 'Roadside Rescue Co',
    rating: 4.6,
    services: ['battery', 'tire', 'fuel-delivery'],
    vehicleTypes: ['car', 'truck'],
    location: { lat: 37.7685, lng: -122.4148 },
    distanceKm: 2.3
  }
]

export const assistanceRequests: AssistanceRequest[] = [
  {
    id: 'r1',
    userId: 'u1',
    vehicleId: 'v1',
    description: 'Flat tyre on the side of the road',
    status: 'open',
    location: { lat: 37.772, lng: -122.42 },
    createdAt: new Date().toISOString()
  }
]
