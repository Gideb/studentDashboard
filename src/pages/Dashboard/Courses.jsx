import DashboardLayout from '../../layouts/DashboardLayout'
import CoursesTable from '../../components/Courses/CoursesTable'
import { courses } from '../../data/CoursesData'
import CourseFilter from '../../components/Courses/CourseFilter'
import { useEffect, useState } from 'react'
import AddCourseModal from '../../components/Courses/AddCourseModal'
import toast from 'react-hot-toast'
import EditCourseModal from '../../components/Courses/EditCourseModal'
import DeleteCourseModal from '../../components/Courses/DeleteCourseModal'

const Courses = () => {
  const [search, setSearch] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('All')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')
  const [currentPage, setCurrentPage] = useState(1)
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

  const hasActiveFilters = search.trim() !== '' || selectedDepartment !== 'All'

  /* sort array */

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    let valueA = a[sortBy]
    let valueB = b[sortBy]

    if (typeof valueA === 'string') {
      valueA = valueA.toLowerCase()
      valueB = valueB.toLowerCase()
    }

    if (valueA < valueB) {
      return sortOrder === 'asc' ? -1 : 1
    }

    if (valueA > valueB) {
      return sortOrder === 'asc' ? 1 : -1
    }

    return 0
  })

  /* pagination */
  const coursesPerPage = 5
  const totalPages = Math.ceil(sortedCourses.length / coursesPerPage)

  const startIndex = (currentPage - 1) * coursesPerPage
  const endIndex = startIndex + coursesPerPage

  const paginatedCourses = sortedCourses.slice(startIndex, endIndex)

  useEffect(() => {
    setCurrentPage(1)
  }, [search, selectedDepartment, sortBy, sortOrder])

  /* edit course */

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

        {/* filter courses */}

        <section id='course-filter' className='flex flex-col gap-3 sm:flex-row sm:items-center'>
          <div className='flex-1'>
            <CourseFilter
              search={search}
              setSearch={setSearch}
              selectedDepartment={selectedDepartment}
              setSelectedDepartment={setSelectedDepartment}
              departments={uniqueDepartments}
            />
          </div>

          <div className='flex items-center gap-2'>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className='rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white'
              aria-label='Sort courses by'
            >
              <option value='name'>Course Name</option>
              <option value='code'>Course Code</option>
              <option value='department'>Department</option>
              <option value='students'>Students</option>
              <option value='status'>Status</option>
            </select>

            <button
              type='button'
              onClick={() => setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))}
              className='rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white'
              aria-label={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>

            {hasActiveFilters && (
              <button
                type='button'
                onClick={() => {
                  setSearch('')
                  setSelectedDepartment('All')
                }}
                className='whitespace-nowrap text-sm font-medium text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white'
              >
                Clear Filters
              </button>
            )}
          </div>
        </section>

        {/* course table */}

        <section id='course-table' className=''>
          <div className='flex items-center justify-between gap-3 mb-3'>
            <div>
              <h2 className='text-sm font-medium text-black dark:text-white'>
                List of Available Courses
              </h2>

              <p className='mt-1 text-xs text-gray-500 dark:text-gray-400'>
                Showing {filteredCourses.length} of {courseList.length} courses
              </p>
            </div>
          </div>

          <CoursesTable
            courses={paginatedCourses}
            onEdit={course => setCourseToEdit(course)}
            onDelete={handleDeleteCourse}
          />

          {totalPages > 1 && (
            <div className='mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
              <p className='text-xs text-gray-500 dark:text-gray-400'>
                Showing {startIndex + 1}–{Math.min(endIndex, sortedCourses.length)} of{' '}
                {sortedCourses.length} courses
              </p>

              <div className='flex items-center gap-1'>
                <button
                  type='button'
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  className='rounded-md border border-gray-300 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700'
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
                  <button
                    key={page}
                    type='button'
                    onClick={() => setCurrentPage(page)}
                    className={`min-w-9 rounded-md border px-3 py-2 text-sm ${
                      currentPage === page
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-300 dark:border-gray-700 dark:text-white'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type='button'
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className='rounded-md border border-gray-300 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700'
                >
                  Next
                </button>
              </div>
            </div>
          )}
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
