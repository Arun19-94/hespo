import { ReactNode } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
export default function ProtectedRoute({
  condition,
  redirectTo,
}: ConditionalRouteProps): JSX.Element {
  return condition ? <Outlet/> : <Navigate to={redirectTo} replace />
}

export type ConditionalRouteProps = {
  condition: boolean
  redirectTo: string
  // children?: ReactNode
}