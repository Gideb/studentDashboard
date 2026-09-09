import DashboardLayout from '../../layouts/DashboardLayout'
import CoursesTable from '../../components/Courses/CoursesTable'
import { courses } from '../../data/CoursesData'
import CourseFilter from '../../components/Courses/CourseFilter'
import { useState } from 'react'
import AddCourseModal from '../../components/Courses/AddCourseModal'
import toast from 'react-hot-toast'
import EditCourseModal from '../../components/Courses/EditCourseModal'

const Courses = () => {
  const [search, setSearch] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('All')
  const [courseList, setCourseList] = useState(courses)
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false)
  const [CourseToEdit, setCourseToEdit] = useState(null)

  const uniqueDepartments = [...new Set(courseList.map(course => course.department))]
  const uniqueStatus = [...new Set(courseList.map(course => course.status))]

  const filteredCourses = courseList.filter(course => {
    const matchesSearch =
      course.name.toLowerCase().includes(search.toLowerCase()) ||
      course.code.toLowerCase().includes(search.toLowerCase())

    const matchesDepartment =
      selectedDepartment === 'All' || course.department === selectedDepartment

    return matchesSearch && matchesDepartment
  })

  const closeEditCourse = () => {
    setCourseToEdit(null)
  }

  const handleAddCourse = newCourse => {
    const newId = (courseList.length > 0 ? Math.max(...courseList.map(course => course.id)) : 0) + 1

    const departmentPrefixes = {
      'computer science': 'ICT',
      mathematics: 'MAT',
      science: 'SCI',
      languages: 'ENG',
      business: 'BUS',
      arts: 'ART',
      history: 'HTR',
    }

    const department = newCourse.department.toLowerCase().trim()
    const prefix = departmentPrefixes[department] || 'HOS'

    const departmentCourses = courseList.filter(
      course => course.department.toLowerCase().trim() === department
    )

    const highestNumber = departmentCourses.reduce((highest, course) => {
      const number = parseInt(course.code.split('-')[1], 10)

      return number > highest ? number : highest
    }, 100)

    const newCourseCode = `${prefix}-${highestNumber + 1}`

    const courseToAdd = {
      id: newId,
      name: newCourse.name,
      code: newCourseCode,
      department: newCourse.department,
      lecturer: newCourse.lecturer,
      students: Number(newCourse.students),
      status: newCourse.status,
    }

    setCourseList(prev => [...prev, courseToAdd])
    setIsAddCourseOpen(false)
    toast.success('Course added successfully!')
  }

  const handleEditCourse = updatedCourse => {
    setCourseList(prev =>
      prev.map(course =>
        course.id === updatedCourse.id ? { ...course, ...updatedCourse } : course
      )
    )
    closeEditCourse()
    toast.success('Course details updated!')
  }

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
          <button className='add-btn self-start' onClick={() => setIsAddCourseOpen(true)}>
            + Add Course
          </button>
        </div>

        <section id='course-filter'>
          <CourseFilter
            search={search}
            setSearch={setSearch}
            selectedDepartment={selectedDepartment}
            setSelectedDepartment={setSelectedDepartment}
            departments={uniqueDepartments}
          />
        </section>

        <section id='course-table' className=''>
          <h2 className='my-2 text-sm text-black dark:text-white'>List of Available Courses</h2>
          <CoursesTable courses={filteredCourses} onEdit={course => setCourseToEdit(course)} />
        </section>

        {isAddCourseOpen && (
          <AddCourseModal
            onClose={() => setIsAddCourseOpen(false)}
            onAdd={newCourse => {
              handleAddCourse(newCourse)
              setIsAddCourseOpen(false)
            }}
            departments={uniqueDepartments}
            statuses={uniqueStatus}
          />
        )}

        {CourseToEdit && (
          <EditCourseModal
            onClose={closeEditCourse}
            onUpdate={handleEditCourse}
            course={CourseToEdit}
            departments={uniqueDepartments}
            statuses={uniqueStatus}
          />
        )}
      </main>
    </DashboardLayout>
  )
}

export default Courses
