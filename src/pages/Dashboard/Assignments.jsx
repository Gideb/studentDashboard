import { useState } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import AssignmentsTable from '../../components/Assignments/AssignmentsTable'
import AssignmentsFilter from '../../components/Assignments/AssignmentsFilter'
import AddAssignmentModal from '../../components/Assignments/AddAssignmentModal'
import EditAssignmentModal from '../../components/Assignments/EditAssignmentModal'
import DeleteAssignmentModal from '../../components/Assignments/DeleteAssignmentModal'
import useAssignments from '../../hooks/useAssignments'
import toast from 'react-hot-toast'

const Assignments = () => {
  const {
    assignmentList,
    paginatedAssignments,

    search,
    setSearch,

    selectedCourse,
    setSelectedCourse,

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
    assignmentsPerPage,
    totalPages,
    startIndex,
    endIndex,
    pageNumbers,

    uniqueCourses,
    uniqueStatus,

    addAssignment,
    updateAssignment,
    deleteAssignment,
  } = useAssignments()

  const [isAddAssignmentOpen, setIsAddAssignmentOpen] = useState(false)

  const [assignmentToEdit, setAssignmentToEdit] = useState(null)

  const [assignmentToDelete, setAssignmentToDelete] = useState(null)

  // ==============================
  // Add Assignment
  // ==============================

  const handleAddAssignment = newAssignment => {
    addAssignment(newAssignment)
    setIsAddAssignmentOpen(false)

    toast.success('Assignment successfully added!')
  }

  // ==============================
  // Edit Assignment
  // ==============================

  const handleEditAssignment = updatedAssignment => {
    updateAssignment(updatedAssignment)
    setAssignmentToEdit(null)

    toast.success('Assignment successfully updated!')
  }

  // ==============================
  // Delete Assignment
  // ==============================

  const handleDeleteAssignment = () => {
    deleteAssignment(assignmentToDelete.id)
    setAssignmentToDelete(null)

    toast.success('Assignment deleted successfully!')
  }

  return (
    <DashboardLayout activeMenu='Assignments'>
      <div className='space-y-6 my-5 mx-auto w-full min-w-0 px-3 sm:px-6 py-5 sm:py-8'>
        {/* Page Header */}
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h1 className='text-2xl font-semibold text-primary dark:text-dark'>Assignments</h1>

            <p className='mt-1 text-sm text-secondary dark:text-gray-400'>
              Manage assignments and track student submissions.
            </p>
          </div>

          <button type='button' onClick={() => setIsAddAssignmentOpen(true)} className=' add-btn'>
            + Add Assignment
          </button>
        </div>

        {/* Filters */}
        <AssignmentsFilter
          search={search}
          setSearch={setSearch}
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          uniqueCourses={uniqueCourses}
          uniqueStatus={uniqueStatus}
          hasActiveFilters={hasActiveFilters}
          clearFilters={clearFilters}
        />

        {/* Table */}
        <AssignmentsTable
          assignments={paginatedAssignments}
          assignmentList={assignmentList}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          onEdit={setAssignmentToEdit}
          onDelete={setAssignmentToDelete}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          assignmentsPerPage={assignmentsPerPage}
          totalPages={totalPages}
          startIndex={startIndex}
          endIndex={endIndex}
          pageNumbers={pageNumbers}
        />
      </div>

      {/* Add Modal */}
      {isAddAssignmentOpen && (
        <AddAssignmentModal
          onClose={() => setIsAddAssignmentOpen(false)}
          onAdd={handleAddAssignment}
          courses={uniqueCourses}
          statuses={uniqueStatus}
        />
      )}

      {/* Edit Modal */}
      {assignmentToEdit && (
        <EditAssignmentModal
          assignment={assignmentToEdit}
          onClose={() => setAssignmentToEdit(null)}
          onUpdate={handleEditAssignment}
          courses={uniqueCourses}
          statuses={uniqueStatus}
        />
      )}

      {/* Delete Modal */}
      {assignmentToDelete && (
        <DeleteAssignmentModal
          assignment={assignmentToDelete}
          onClose={() => setAssignmentToDelete(null)}
          onConfirm={handleDeleteAssignment}
        />
      )}
    </DashboardLayout>
  )
}

export default Assignments
