import DashboardLayout from '../../layouts/DashboardLayout'
import CoursesTable from '../../components/Courses/CoursesTable'

const Courses = () => {
  return (
    <DashboardLayout activeMenu='Courses'>
      <CoursesTable />
    </DashboardLayout>
  )
}

export default Courses
