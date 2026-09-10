import DashboardLayout from '../../layouts/DashboardLayout'
import CoursesTable from '../../components/Courses/CoursesTable'
import { courses } from '../../data/CoursesData'
import CourseFilter from '../../components/Courses/CourseFilter'
import { useState } from 'react'
import AddCourseModal from '../../components/Courses/AddCourseModal'
import toast from 'react-hot-toast'
import EditCourseModal from '../../components/Courses/EditCourseModal'
import DeleteCourseModal from '../../components/Courses/DeleteCourseModal'

const Courses = () => {
  const [search, setSearch] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('All')
  const [courseList, setCourseList] = useState(courses)
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false)
  const [courseToEdit, setCourseToEdit] = useState(null)
  const [courseToDelete, setCourseToDelete] = useState(null)

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
      'computer science': 'COMP',
      mathematics: 'MATH',
      science: 'SCNC',
      languages: 'ENGL',
      business: 'BUSI',
      arts: 'ARTS',
      hospitality: 'HSPT',
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
      prev.map(course => {
        if (course.id !== updatedCourse.id) {
          return course
        }

        // If department has not changed, keep the existing code
        if (course.department === updatedCourse.department) {
          return {
            ...course,
            ...updatedCourse,
          }
        }

        // Department changed, so generate a new course code
        const departmentPrefixes = {
          'computer science': 'COMP',
          mathematics: 'MATH',
          science: 'SCNC',
          languages: 'ENGL',
          business: 'BUSI',
          arts: 'ARTS',
          hospitality: 'HSPT',
        }

        const department = updatedCourse.department.toLowerCase().trim()
        const prefix = departmentPrefixes[department] || 'HOS'

        const departmentCourses = prev.filter(
          item =>
            item.id !== updatedCourse.id && item.department.toLowerCase().trim() === department
        )

        const highestNumber = departmentCourses.reduce((highest, course) => {
          const number = parseInt(course.code.split('-')[1], 10)

          return number > highest ? number : highest
        }, 100)

        const newCourseCode = `${prefix}-${highestNumber + 1}`

        return {
          ...course,
          ...updatedCourse,
          code: newCourseCode,
        }
      })
    )

    closeEditCourse()
    toast.success('Course details updated!')
  }

  /* delete */

  const handleDeleteCourse = course => {
    setCourseToDelete(course)
  }

  const confirmDeleteCourse = () => {
    setCourseList(prev => prev.filter(course => course.id !== courseToDelete.id))

    setCourseToDelete(null)
    toast.success('Course Deleted SuccessFully!')
  }

  const cancelDeleteCourse = () => {
    setCourseToDelete(null)
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
          <CoursesTable
            courses={filteredCourses}
            onEdit={course => setCourseToEdit(course)}
            onDelete={handleDeleteCourse}
          />
        </section>

        {/* add course */}
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

        {/* update course */}

        {courseToEdit && (
          <EditCourseModal
            onClose={closeEditCourse}
            onUpdate={handleEditCourse}
            course={courseToEdit}
            departments={uniqueDepartments}
            statuses={uniqueStatus}
          />
        )}

        {/*  delete course */}
        {courseToDelete && (
          <DeleteCourseModal
            onClose={cancelDeleteCourse}
            onConfirm={confirmDeleteCourse}
            course={courseToDelete}
          />
        )}
      </main>
    </DashboardLayout>
  )
}

export default Courses
