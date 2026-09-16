import { useState } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import ResultsTable from '../../components/Results/ResultsTable'
import ResultsFilter from '../../components/Results/ResultsFilter'
import AddResultModal from '../../components/Results/AddResultModal'
import EditResultModal from '../../components/Results/EditResultModal'
import DeleteResultModal from '../../components/Results/DeleteResultModal'
import useResults from '../../hooks/useResults'
import toast from 'react-hot-toast'

const Results = () => {
  const {
    resultList,
    paginatedResults,

    search,
    setSearch,

    selectedCourse,
    setSelectedCourse,

    selectedAssessment,
    setSelectedAssessment,

    selectedSemester,
    setSelectedSemester,

    selectedAcademicYear,
    setSelectedAcademicYear,

    uniqueCourses,
    uniqueAssessments,
    uniqueSemesters,
    uniqueAcademicYears,

    hasActiveFilters,
    clearFilters,

    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,

    currentPage,
    setCurrentPage,
    resultsPerPage,
    totalPages,
    startIndex,
    endIndex,
    pageNumbers,

    addResult,
    updateResult,
    deleteResult,
  } = useResults()

  const [isAddResultOpen, setIsAddResultOpen] = useState(false)
  const [resultToEdit, setResultToEdit] = useState(null)
  const [resultToDelete, setResultToDelete] = useState(null)

  const handleAddResult = newResult => {
    addResult(newResult)
    setIsAddResultOpen(false)
    toast.success('Result successfully added!')
  }

  const handleEditResult = updatedResult => {
    updateResult(updatedResult)
    setResultToEdit(null)
    toast.success('Result successfully updated!')
  }

  const handleDeleteResult = () => {
    deleteResult(resultToDelete.id)
    setResultToDelete(null)
    toast.success('Result deleted successfully!')
  }

  return (
    <DashboardLayout activeMenu='Results'>
      <div className='space-y-6 my-5 mx-auto px-2 sm:px-6 py-5 sm:py-8  bg-gray-50 dark:bg-slate-950 rounded-lg'>
        {/* Page Header */}
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h1 className='text-2xl font-semibold text-primary dark:text-dark'>Results</h1>

            <p className='mt-1 text-sm text-secondary dark:text-gray-400'>
              Manage student results and academic performance.
            </p>
          </div>

          <button type='button' onClick={() => setIsAddResultOpen(true)} className='add-btn'>
            + Add Result
          </button>
        </div>

        {/* Filters */}
        <ResultsFilter
          search={search}
          setSearch={setSearch}
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
          selectedAssessment={selectedAssessment}
          setSelectedAssessment={setSelectedAssessment}
          selectedSemester={selectedSemester}
          setSelectedSemester={setSelectedSemester}
          selectedAcademicYear={selectedAcademicYear}
          setSelectedAcademicYear={setSelectedAcademicYear}
          uniqueCourses={uniqueCourses}
          uniqueAssessments={uniqueAssessments}
          uniqueSemesters={uniqueSemesters}
          uniqueAcademicYears={uniqueAcademicYears}
          hasActiveFilters={hasActiveFilters}
          clearFilters={clearFilters}
        />

        {/* Results Table */}
        <ResultsTable
          results={paginatedResults}
          resultList={resultList}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          onEdit={setResultToEdit}
          onDelete={setResultToDelete}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          resultsPerPage={resultsPerPage}
          totalPages={totalPages}
          startIndex={startIndex}
          endIndex={endIndex}
          pageNumbers={pageNumbers}
        />
      </div>

      {/* Add Result Modal */}
      {isAddResultOpen && (
        <AddResultModal
          onClose={() => setIsAddResultOpen(false)}
          onAdd={handleAddResult}
          courses={uniqueCourses}
        />
      )}

      {/* Edit Result Modal */}
       {resultToEdit && (
        <EditResultModal
          result={resultToEdit}
          onClose={() => setResultToEdit(null)}
          onUpdate={handleEditResult}
          courses={uniqueCourses}
        />
      )}

      {/* Delete Result Modal */}
       {resultToDelete && (
        <DeleteResultModal
          result={resultToDelete}
          onClose={() => setResultToDelete(null)}
          onConfirm={handleDeleteResult}
        />
      )}
    </DashboardLayout>
  )
}

export default Results
