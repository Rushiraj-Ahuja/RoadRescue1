import React from 'react'
import Card from '../components/common/Card'

export default function Home() {
  return (
    <main className="container py-8">
      <h1 className="text-2xl font-semibold mb-4">Find help nearby</h1>
      <Card>
        <p className="text-gray-700">This is a scaffolded Home page. Integrate maps and live requests here.</p>
      </Card>
    </main>
  )
}
