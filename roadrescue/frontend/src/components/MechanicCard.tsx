import React from 'react'
import Card from './common/Card'
import type { Mechanic } from '../types'
import { MapPin } from 'lucide-react'

export default function MechanicCard({ mechanic }: { mechanic: Mechanic }) {
  return (
    <Card className="flex items-center gap-3">
      <div className="p-3 bg-gray-100 rounded-md">
        <MapPin />
      </div>
      <div className="flex-1">
        <div className="font-medium">{mechanic.name}</div>
        <div className="text-sm text-gray-600">Rating: {mechanic.rating} · {mechanic.distanceKm ?? '—'} km</div>
        <div className="text-xs text-gray-500 mt-1">{mechanic.services.join(' · ')}</div>
      </div>
    </Card>
  )
}
