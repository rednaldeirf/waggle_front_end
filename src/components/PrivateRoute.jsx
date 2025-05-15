import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'

const PrivateRoute = ({ children }) => {
  const { user, shelter } = useContext(UserContext)

  // Check if user is authenticated
  if (!user) {
    // Redirect to sign in if not authenticated
    return <Navigate to="/" replace />
  }

  // For shelter-specific routes, check if user is a shelter
  if (window.location.pathname.startsWith('/shelter') && !shelter) {
    // Redirect to home if not a shelter
    return <Navigate to="/" replace />
  }

  // If authenticated and authorized, render the protected component
  return children
}

export default PrivateRoute 