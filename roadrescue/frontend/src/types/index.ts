export interface User {
  id: string
  name: string
  email: string
  phone?: string
  avatarUrl?: string
  location?: { lat: number; lng: number }
}

export interface Mechanic {
  id: string
  name: string
  rating: number
  services: string[]
  vehicleTypes: string[]
  location: { lat: number; lng: number }
  distanceKm?: number
}

export interface AssistanceRequest {
  id: string
  userId: string
  vehicleId?: string
  description?: string
  status: 'open' | 'assigned' | 'resolved' | 'cancelled'
  location: { lat: number; lng: number }
  createdAt: string
  assignedMechanicId?: string
}

export interface Vehicle {
  id: string
  userId: string
  make?: string
  model?: string
  year?: number
}
