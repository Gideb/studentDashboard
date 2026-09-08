import DashboardLayout from '../../layouts/DashboardLayout'
import CoursesTable from '../../components/Courses/CoursesTable'
import { courses } from '../../data/CoursesData'
import CourseFilter from '../../components/Courses/CourseFilter'
import { useState } from 'react'

const Courses = () => {
  const [search, setSearch] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('All')

  const uniqueDepartments = [...new Set(courses.map(course => course.department))]

  const filteredCourses = courses.filter(course => {
    const matchesSearch =
      course.department.toLowerCase().includes(search.toLowerCase()) ||
      course.name
        .toLowerCase()
        .includes(search.toLowerCase() || course.code.toLowerCase().includes(search.toLowerCase()))

    const matchesDepartment =
      selectedDepartment === 'All' || course.department === selectedDepartment

    return matchesSearch && matchesDepartment
  })
  const handleAddCourse = () => {}

  return (
    <DashboardLayout activeMenu='Courses'>
      <main className='my-5 mx-auto w-full min-w-0 px-3 sm:px-6 py-5 sm:py-8 space-y-4'>
        <div className='flex flex-col gap-5 sm:flex-row items-start sm:items-center justify-between'>
          <div>
            <h1 className=' text-2xl font-semibold text-black dark:text-white'> Courses</h1>
            <p className='text-xs sm:text-sm text-gray-600 dark:text-gray-400'>
              Manage all available courses
            </p>
          </div>
          <button className='add-btn' onClick={handleAddCourse}>
            + Add Course
          </button>
        </div>

        <section id='course-filter'>
          <CourseFilter
            search={search}
            setSearch={setSearch}
            selectDepartment={selectedDepartment}
            setSelectDepartment={setSelectedDepartment}
            departments={uniqueDepartments}
          />
        </section>

        <section id='course-table' className=''>
          <h2 className='my-2 text-sm text-black dark:text-white'>List of Available Courses</h2>
          <CoursesTable courses={filteredCourses} />
        </section>
      </main>
    </DashboardLayout>
  )
}

export default Courses
