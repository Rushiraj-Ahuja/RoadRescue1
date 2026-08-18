import React from 'react'
type Props = { onNavigate?: (view: string) => void }

export default function Navbar({ onNavigate }: Props) {
  return (
    <header className="bg-white shadow-sm">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center space-x-3">
          <div className="text-xl font-semibold">RoadRescue</div>
          <nav className="hidden md:flex space-x-4 text-sm text-gray-600">
            <button onClick={() => onNavigate?.('home')} className="hover:underline">Home</button>
            <button onClick={() => onNavigate?.('dashboard')} className="hover:underline">Dashboard</button>
            <button onClick={() => onNavigate?.('login')} className="hover:underline">Sign in</button>
            <button onClick={() => onNavigate?.('register')} className="hover:underline">Sign up</button>
          </nav>
        </div>
      </div>
    </header>
  )
}
