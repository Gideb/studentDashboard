import DashboardLayout from '../../layouts/DashboardLayout'
import CoursesTable from '../../components/Courses/CoursesTable'
import CourseFilter from '../../components/Courses/CourseFilter'
import { useState } from 'react'
import AddCourseModal from '../../components/Courses/AddCourseModal'
import toast from 'react-hot-toast'
import EditCourseModal from '../../components/Courses/EditCourseModal'
import DeleteCourseModal from '../../components/Courses/DeleteCourseModal'
import useCourses from '../../hooks/useCourse'

const Courses = () => {
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false)
  const [courseToEdit, setCourseToEdit] = useState(null)
  const [courseToDelete, setCourseToDelete] = useState(null)

  const {
    courseList,
    filteredCourses,
    sortedCourses,
    paginatedCourses,

    search,
    setSearch,
    selectedDepartment,
    setSelectedDepartment,
    hasActiveFilters,
    clearFilters,

    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,

    currentPage,
    setCurrentPage,
    totalPages,
    startIndex,
    endIndex,
    pageNumbers,

    uniqueDepartments,
    uniqueStatus,

    addCourse,
    updateCourse,
    deleteCourse,
  } = useCourses()

  const closeEditCourse = () => {
    setCourseToEdit(null)
  }

  const cancelDeleteCourse = () => {
    setCourseToDelete(null)
  }

  const handleAddCourse = newCourse => {
    addCourse(newCourse)
    setIsAddCourseOpen(false)
    toast.success('Course added successfully!')
 
  }

  const handleEditCourse = updatedCourse => {
    updateCourse(updatedCourse)
    setCourseToEdit(null)
    toast.success('Course details updated!')
   
  }

  const handleDeleteCourse = course => {
    setCourseToDelete(course)
  }

  const confirmDeleteCourse = () => {
    deleteCourse(courseToDelete.id)
    setCourseToDelete(null)
    toast.success('Course deleted successfully!')
    
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
                onClick={clearFilters}
                className='whitespace-nowrap text-sm font-medium text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white'
              >
                Clear Filters
              </button>
            )}
          </div>
        </section>

        {/* course table */}

        <section id='course-table' className='space-y-6'>
          <div className='flex items-center justify-between gap-3 mt-8 mb-5'>
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
                  className='rounded-md border border-gray-300 px-2 py-1 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 text-xs cursor-pointer'
                >
                  Previous
                </button>

                {pageNumbers.map((page, index) =>
                  page === '...' ? (
                    <span
                      key={`ellipsis-${index}`}
                      className='px-2 text-xs text-gray-500 dark:text-gray-400'
                    >
                      ...
                    </span>
                  ) : (
                    <button
                      key={page}
                      type='button'
                      onClick={() => setCurrentPage(page)}
                      className={`min-w-9 rounded-md border cursor-pointer px-2 py-1 text-xs ${
                        currentPage === page
                          ? 'border-primary bg-primary text-white'
                          : 'border-gray-300 dark:border-gray-700 dark:text-white'
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  type='button'
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className='rounded-md border border-gray-300 cursor-pointer px-2 py-1 text-xs disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700'
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
