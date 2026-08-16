import React, { useEffect, useState } from 'react'
import { api } from '../services/api'
import type { AssistanceRequest } from '../types'
import Card from '../components/common/Card'

export default function Dashboard() {
  const [requests, setRequests] = useState<AssistanceRequest[]>([])

  useEffect(() => {
    api.getAssistanceRequests().then(setRequests)
  }, [])

  return (
    <main className="container py-8">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <div className="space-y-3">
        {requests.map((r) => (
          <Card key={r.id}>
            <div className="flex justify-between">
              <div>
                <div className="font-medium">Request {r.id}</div>
                <div className="text-sm text-gray-600">{r.description}</div>
              </div>
              <div className="text-sm text-gray-500">{r.status}</div>
            </div>
          </Card>
        ))}
      </div>
    </main>
  )
}
