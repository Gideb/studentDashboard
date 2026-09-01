import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import MainLayout from '../layouts/MainLayout'

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRoutes
