import { useState } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import StudentsTable from '../../components/Students/StudentsTable'
import useStudents from '../../hooks/useStudents'
import toast from 'react-hot-toast'
import StudentsFilter from '../../components/Students/StudentsFilter'
import AddStudentModal from '../../components/Students/AddStudentModal'
import EditStudentModal from '../../components/Students/EditStudentModal'
import DeleteStudentModal from '../../components/Students/DeleteStudentModal'
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu'

const Students = () => {
  const {
    studentList,
    filteredStudents,
    paginatedStudents,

    search,
    setSearch,

    selectedDepartment,
    setSelectedDepartment,

    selectedLevel,
    setSelectedLevel,

    selectedStatus,
    setSelectedStatus,

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
    uniqueLevels,
    uniqueStatus,

    addStudent,
    updateStudent,
    deleteStudent,
  } = useStudents()

  const closeEditStudent = () => {
    setStudentToEdit(null)
  }

  const cancelDeleteStudent = () => {
    setStudentToDelete(null)
  }

  const handleAddStudent = newStudent => {
    addStudent(newStudent)
    setIsAddStudentOpen(false)
    toast.success('Student successfully added!')
  }

  const handleEditStudent = updatedStudent => {
    updateStudent(updatedStudent)
    setStudentToEdit(null)
    toast.success('Student details successfully updated!')
  }

  const confirmDeleteStudent = () => {
    deleteStudent(studentToDelete.id)
    setStudentToDelete(null)
    toast.success('Student deleted successfully!')
  }

  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false)
  const [studentToEdit, setStudentToEdit] = useState(null)
  const [studentToDelete, setStudentToDelete] = useState(null)

  return (
    <DashboardLayout activeMenu='Students'>
      <main className='my-5 mx-auto w-full min-w-0 space-y-4 px-3 py-5 sm:px-6 sm:py-8'>
        {/* Header */}
        <div className='flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center'>
          <div>
            <h1 className='text-2xl font-semibold text-primary dark:text-dark'>Students</h1>

            <p className='text-xs text-gray-600 dark:text-gray-400 sm:text-sm'>
              Manage all registered students
            </p>
          </div>

          <button
            type='button'
            className='add-btn self-start'
            onClick={() => setIsAddStudentOpen(true)}
          >
            + Add Student
          </button>
        </div>

        {/* Filters needs work */}
        <section id='students-filter' className='flex flex-col gap-3 sm:flex-row sm:items-center'>
          <div className='flex-1'>
            <StudentsFilter
              search={search}
              setSearch={setSearch}
              selectedDepartment={selectedDepartment}
              setSelectedDepartment={setSelectedDepartment}
              selectedLevel={selectedLevel}
              setSelectedLevel={setSelectedLevel}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              departments={uniqueDepartments}
              levels={uniqueLevels}
              statuses={uniqueStatus}
              hasActiveFilters={hasActiveFilters}
              clearFilters={clearFilters}
            />
          </div>

          <div className='flex items-center gap-2'>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              aria-label='Sort students by'
              className='rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white'
            >
              <option value='name'>Student Name</option>
              <option value='studentId'>Student ID</option>
              <option value='department'>Department</option>
              <option value='level'>Level</option>
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
          </div>
        </section>

        {/* Student list */}
        <section>
          <div className='my-2 flex items-center justify-between gap-3'>
            <div>
              <h2 className='text-sm font-medium text-black dark:text-white'>List of Students</h2>

              <p className='mt-1 text-xs text-gray-500 dark:text-gray-400'>
                Showing {filteredStudents.length} of {studentList.length} students
              </p>
            </div>
          </div>

          <StudentsTable
            students={paginatedStudents}
            onEdit={student => setStudentToEdit(student)}
            onDelete={student => setStudentToDelete(student)}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className='mt-4 flex gap-3 flex-row items-center justify-between'>
              <p className='text-xs text-gray-500 dark:text-gray-400'>
                Showing {startIndex + 1}–{Math.min(endIndex, filteredStudents.length)} of{' '}
                {filteredStudents.length} students
              </p>

              <div className='flex items-center gap-1'>
                <button
                  type='button'
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  className='rounded-lg p-2 text-secondary transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-gray-400 dark:hover:bg-slate-800'
                  aria-label='Previous page'
                >
                  <LuChevronLeft />
                </button>

                {pageNumbers.map((page, index) =>
                  page === '...' ? (
                    <span
                      key={`ellipsis-${index}`}
                      className='px-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400'
                    >
                      ...
                    </span>
                  ) : (
                    <button
                      key={page}
                      type='button'
                      onClick={() => setCurrentPage(page)}
                      className={`min-w-9 rounded-md border px-2 py-1 sm:px-3 sm:py-2  text-xs sm:text-sm ${
                        currentPage === page
                          ? 'border-primary bg-primary dark:bg-dark dark:border-dark text-white dark:text-black'
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
                  className='rounded-lg p-2 text-secondary transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-gray-400 dark:hover:bg-slate-800'
                  aria-label='Next page'
                >
                  <LuChevronRight />
                </button>
              </div>
            </div>
          )}
        </section>

        {/* add Student */}
        {isAddStudentOpen && (
          <AddStudentModal
            onClose={() => setIsAddStudentOpen(false)}
            onAdd={handleAddStudent}
            departments={uniqueDepartments}
            levels={uniqueLevels}
            statuses={uniqueStatus}
          />
        )}

        {/* update Student needs work */}

        {studentToEdit && (
          <EditStudentModal
            onClose={closeEditStudent}
            onUpdate={handleEditStudent}
            student={studentToEdit}
            departments={uniqueDepartments}
            levels={uniqueLevels}
            statuses={uniqueStatus}
          />
        )}

        {/*  delete Student needs work */}
        {studentToDelete && (
          <DeleteStudentModal
            onClose={cancelDeleteStudent}
            onConfirm={confirmDeleteStudent}
            student={studentToDelete}
          />
        )}
      </main>
    </DashboardLayout>
  )
}

export default Students
