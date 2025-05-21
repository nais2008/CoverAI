import React from "react"
import { Navigate } from "react-router-dom"

import ProtectedRouteProps from "../../types/ProtectedRouteProps"


const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuthenticated, children }: ProtectedRouteProps) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
