import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useRole from '../hooks/useRole'

const ProtectedRoute = ({ permission, children }) => {
  const location = useLocation()
  const { isAuthenticated, isLoading } = useAuth()
  const { hasPermission } = useRole()

  if (isLoading) {
    return <div className='flex min-h-screen items-center justify-center text-sm text-slate-600'>Checking your session...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }

  if (!hasPermission(permission)) {
    return <Navigate to='/dashboard' replace />
  }

  return children
}

export default ProtectedRoute
