import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useRole from '../hooks/useRole'

const ProtectedRoute = ({ permission, children }) => {
  const location = useLocation()
  const { isAuthenticated } = useAuth()
  const { hasPermission } = useRole()

  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }

  if (!hasPermission(permission)) {
    return <Navigate to='/dashboard' replace />
  }

  return children
}

export default ProtectedRoute
