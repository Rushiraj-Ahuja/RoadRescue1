import { users, mechanics, assistanceRequests, vehicles } from '../mocks/mockData'
import type { User, Mechanic, AssistanceRequest, Vehicle } from '../types'

const DEFAULT_DELAY = 300

async function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms))
}

async function fetchWithMock<T>(data: T, path?: string): Promise<T> {
  const base = import.meta.env.VITE_API_URL
  if (base) {
    const url = path ? `${base.replace(/\/$/, '')}/${path}` : base
    const res = await fetch(url)
    return (await res.json()) as T
  }

  await delay(DEFAULT_DELAY)
  return data
}

export const api = {
  getUsers: async (): Promise<User[]> => fetchWithMock<User[]>(users, 'users'),
  getMechanics: async (): Promise<Mechanic[]> => fetchWithMock<Mechanic[]>(mechanics, 'mechanics'),
  getAssistanceRequests: async (): Promise<AssistanceRequest[]> => fetchWithMock<AssistanceRequest[]>(assistanceRequests, 'requests'),
  getVehicles: async (): Promise<Vehicle[]> => fetchWithMock<Vehicle[]>(vehicles, 'vehicles')
}

export default api
