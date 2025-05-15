import React from 'react'

export function Card({ children, className = '' }) {
  return <div className={`bg-white border rounded-lg shadow-sm ${className}`}>{children}</div>
}
export function CardHeader({ children, className = '' }) {
  return <div className={`px-4 py-2 border-b font-semibold ${className}`}>{children}</div>
}
export function CardContent({ children, className = '' }) {
  return <div className={`p-4 ${className}`}>{children}</div>
}

