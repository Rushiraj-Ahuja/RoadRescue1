import React from 'react'

export default function Footer() {
  return (
    <footer className="mt-12 py-6 text-center text-sm text-gray-500">
      <div className="container">© {new Date().getFullYear()} RoadRescue — Built for the hackathon</div>
    </footer>
  )
}
