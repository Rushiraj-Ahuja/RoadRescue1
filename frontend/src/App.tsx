import React, { useState } from 'react'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'

type View = 'home' | 'login' | 'register' | 'dashboard'

export default function App() {
  const [view, setView] = useState<View>('home')

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onNavigate={(v) => setView(v as View)} />
      <div className="flex-1">
        {view === 'home' && <Home />}
        {view === 'dashboard' && <Dashboard />}
        {view === 'login' && <Login />}
        {view === 'register' && <Register />}
      </div>
      <Footer />
    </div>
  )
}
