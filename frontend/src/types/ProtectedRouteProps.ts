import { JSX } from "react"

export default interface ProtectedRouteProps {
  isAuthenticated: boolean
  children: JSX.Element
}
