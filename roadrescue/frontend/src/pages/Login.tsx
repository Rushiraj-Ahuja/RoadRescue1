import React from 'react'
import Card from '../components/common/Card'

export default function Login() {
  return (
    <main className="container py-8">
      <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
      <Card>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" className="mt-1 block w-full rounded-md border-gray-200 p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" className="mt-1 block w-full rounded-md border-gray-200 p-2" />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Sign in</button>
          </div>
        </form>
      </Card>
    </main>
  )
}
