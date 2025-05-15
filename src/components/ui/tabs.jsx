import React from 'react'

export function Tabs({ value, onValueChange, children }) {
  return <div>{children}</div>
}
export function TabsList({ children, className = '' }) {
  return <div className={`flex space-x-2 mb-4 ${className}`}>{children}</div>
}
export function TabsTrigger({ value: v, children, onClick }) {
  return (
    <button onClick={() => onClick(v)} className="px-4 py-2 border rounded">
      {children}
    </button>
  )
}
export function TabsContent({ value, children, currentValue }) {
  return value === currentValue ? <div>{children}</div> : null
}
