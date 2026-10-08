import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const PublicRoute = ({ children }) => {
  const location = useLocation()
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    const from = location.state?.from?.pathname || '/dashboard'

    return <Navigate to={from} replace />
  }

  return children
}

export default PublicRoute
