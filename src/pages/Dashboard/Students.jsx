import { useState } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import StudentsTable from '../../components/Students/StudentsTable'
import useStudents from '../../hooks/useStudents'
import toast from 'react-hot-toast'
import StudentsFilter from '../../components/Students/StudentsFilter'
import AddStudentModal from '../../components/Students/AddStudentModal'
import EditStudentModal from '../../components/Students/EditStudentModal'
import DeleteStudentModal from '../../components/Students/DeleteStudentModal'

const Students = () => {
  const {
    studentList,
    filteredStudents,
    paginatedStudents,

    search,
    setSearch,

    selectedDepartment,
    setSelectedDepartment,

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
    toast.success('Student added successfully!')
  }

  const handleEditStudent = updatedStudent => {
    updateStudent(updatedStudent)
    setStudentToEdit(null)
    toast.success('Student details updated!')
  }

  const handleDeleteStudent = student => {
    setStudentToDelete(student)
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
            <h1 className='text-2xl font-semibold text-black dark:text-white'>Students</h1>

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
        <section className='flex flex-col gap-3'>
          <div className='flex-1'>
            <StudentsFilter
              search={search}
              setSearch={setSearch}
              selectedDepartment={selectedDepartment}
              setSelectedDepartment={setSelectedDepartment}
              departments={uniqueDepartments}
            />
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
            <div className='mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
              <p className='text-xs text-gray-500 dark:text-gray-400'>
                Showing {startIndex + 1}–{Math.min(endIndex, filteredStudents.length)} of{' '}
                {filteredStudents.length} students
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

                {pageNumbers.map((page, index) =>
                  page === '...' ? (
                    <span
                      key={`ellipsis-${index}`}
                      className='px-2 text-sm text-gray-500 dark:text-gray-400'
                    >
                      ...
                    </span>
                  ) : (
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
                  )
                )}

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

        {/* add Student */}
        {isAddStudentOpen && (
          <AddStudentModal
            onClose={() => setIsAddStudentOpen(false)}
            onAdd={newStudent => {
              handleAddStudent(newStudent)
              setIsAddStudentOpen(false)
            }}
            departments={uniqueDepartments}
            statuses={uniqueStatus}
          />
        )}

        {/* update Student needs work */}

        {studentToEdit && (
          <EditStudentModal
            onClose={closeEditStudent}
            onUpdate={handleEditStudent}
            Student={studentToEdit}
            departments={uniqueDepartments}
            statuses={uniqueStatus}
          />
        )}

        {/*  delete Student needs work */}
        {studentToDelete && (
          <DeleteStudentModal
            onClose={cancelDeleteStudent}
            onConfirm={confirmDeleteStudent}
            Student={studentToDelete}
          />
        )}
      </main>
    </DashboardLayout>
  )
}

export default Students
