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

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/students' element={<Students />} />
        <Route path='/calendar' element={<Calendar />} />
        <Route path='/assignments' element={<Assignments />} />
        <Route path='/results' element={<Results />} />
        <Route path='/settings' element={<Settings />} />

        <Route element={<AuthLayout />}>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRoutes
