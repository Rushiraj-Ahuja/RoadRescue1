import React, { useEffect, useState } from 'react'
import { api } from '../services/api'
import type { Mechanic } from '../types'
import MechanicCard from '../components/MechanicCard'
import Loader from '../components/common/Loader'

export default function Search() {
  const [mechanics, setMechanics] = useState<Mechanic[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    api.getMechanics().then((m) => {
      if (mounted) setMechanics(m)
      setLoading(false)
    })
    return () => {
      mounted = false
    }
  }, [])

  return (
    <main className="container py-8">
      <h1 className="text-2xl font-semibold mb-4">Nearby Mechanics</h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid gap-3">
          {mechanics.map((m) => (
            <MechanicCard key={m.id} mechanic={m} />
          ))}
        </div>
      )}
    </main>
  )
}
