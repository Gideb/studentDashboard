import { Navigate } from 'react-router-dom'
import useRole from '../hooks/useRole'

const ProtectedRoute = ({ permission, children }) => {
  const { hasPermission } = useRole()

  if (!hasPermission(permission)) {
    return <Navigate to='/dashboard' replace />
  }

  return children
}

export default ProtectedRoute
