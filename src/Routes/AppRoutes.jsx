import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from '../pages/Dashboard/Dashboard'
import Login from '../pages/Auth/Login'
import Signup from '../pages/Auth/Signup'
import Courses from '../pages/Dashboard/Courses'
import Students from '../pages/Dashboard/Students'
import Results from '../pages/Dashboard/Results'
import Assignments from '../pages/Dashboard/Assignments'
import Calendar from '../pages/Dashboard/Calendar'
import Settings from '../pages/Dashboard/Settings'
import AuthLayout from '../layouts/AuthLayout'
import ProtectedRoute from '../components/ProtectedRoute'

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute permission='dashboard'>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path='/dashboard'
          element={
            <ProtectedRoute permission='dashboard'>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path='/courses'
          element={
            <ProtectedRoute permission='courses'>
              <Courses />
            </ProtectedRoute>
          }
        />

        <Route
          path='/students'
          element={
            <ProtectedRoute permission='students'>
              <Students />
            </ProtectedRoute>
          }
        />

        <Route
          path='/assignments'
          element={
            <ProtectedRoute permission='assignments'>
              <Assignments />
            </ProtectedRoute>
          }
        />

        <Route
          path='/results'
          element={
            <ProtectedRoute permission='results'>
              <Results />
            </ProtectedRoute>
          }
        />

        <Route
          path='/calendar'
          element={
            <ProtectedRoute permission='calendar'>
              <Calendar />
            </ProtectedRoute>
          }
        />

        <Route
          path='/settings'
          element={
            <ProtectedRoute permission='settings'>
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route element={<AuthLayout />}>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRoutes
