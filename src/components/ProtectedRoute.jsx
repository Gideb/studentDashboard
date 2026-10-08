import { Navigate, useLocation } from 'react-router-dom'
import useRole from '../hooks/useRole'

const ProtectedRoute = ({ permission, children }) => {
  const location = useLocation()
  const { user, hasPermission } = useRole()

  if (!user) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }

  if (!hasPermission(permission)) {
    return <Navigate to='/dashboard' replace />
  }

  return children
}

export default ProtectedRoute
