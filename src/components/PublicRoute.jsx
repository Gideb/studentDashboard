import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const PublicRoute = ({ children }) => {
  const location = useLocation()
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <div className='flex min-h-screen items-center justify-center text-sm text-slate-600'>Checking your session...</div>
  }

  if (isAuthenticated) {
    const from = location.state?.from?.pathname || '/dashboard'

    return <Navigate to={from} replace />
  }

  return children
}

export default PublicRoute
