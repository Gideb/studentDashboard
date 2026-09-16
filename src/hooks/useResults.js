import { useEffect, useState } from 'react'
import { results } from '../data/ResultsData'
import { generateId } from '../utils/generateId'
import useTableControls from './useTableControls'

const RESULTS_STORAGE_KEY = 'results'

const useResults = () => {
  const [resultList, setResultList] = useState(() => {
    try {
      const savedResults = localStorage.getItem(RESULTS_STORAGE_KEY)

      return savedResults ? JSON.parse(savedResults) : results
    } catch (error) {
      console.error('Failed to load results from localStorage:', error)

      return results
    }
  })

  const [selectedCourse, setSelectedCourse] = useState('All')
  const [selectedAssessment, setSelectedAssessment] = useState('All')
  const [selectedSemester, setSelectedSemester] = useState('All')
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('All')

  useEffect(() => {
    localStorage.setItem(RESULTS_STORAGE_KEY, JSON.stringify(resultList))
  }, [resultList])

  // Get unique filter values
  const uniqueCourses = [...new Set(resultList.map(result => result.course))]

  const uniqueAssessments = [...new Set(resultList.map(result => result.assessment))]

  const uniqueSemesters = [...new Set(resultList.map(result => result.semester))]

  const uniqueAcademicYears = [...new Set(resultList.map(result => result.academicYear))]

  // Apply filters
  const resultFilteredData = resultList.filter(result => {
    const matchesCourse = selectedCourse === 'All' || result.course === selectedCourse

    const matchesAssessment =
      selectedAssessment === 'All' || result.assessment === selectedAssessment

    const matchesSemester = selectedSemester === 'All' || result.semester === selectedSemester

    const matchesAcademicYear =
      selectedAcademicYear === 'All' || result.academicYear === selectedAcademicYear

    return matchesCourse && matchesAssessment && matchesSemester && matchesAcademicYear
  })

  // Search, sorting and pagination
  const {
    search,
    setSearch,
    filteredData: filteredResults,
    sortedData: sortedResults,
    paginatedData: paginatedResults,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    currentPage,
    setCurrentPage,
    itemsPerPage: resultsPerPage,
    totalPages,
    startIndex,
    endIndex,
    pageNumbers,
  } = useTableControls({
    data: resultFilteredData,
    searchableFields: [
      'studentName',
      'studentId',
      'resultId',
      'course',
      'courseCode',
      'assessment',
    ],
    itemsPerPage: 5,
    resetDependencies: [selectedCourse, selectedAssessment, selectedSemester, selectedAcademicYear],
  })

  const hasActiveFilters =
    search.trim() !== '' ||
    selectedCourse !== 'All' ||
    selectedAssessment !== 'All' ||
    selectedSemester !== 'All' ||
    selectedAcademicYear !== 'All'

  // Add result
  const addResult = newResult => {
    const newId = generateId(resultList)

    const newResultId = `RES-${String(newId).padStart(3, '0')}`

    const resultToAdd = {
      id: newId,
      resultId: newResultId,
      studentId: newResult.studentId,
      studentName: newResult.studentName,
      courseCode: newResult.courseCode,
      course: newResult.course,
      assessment: newResult.assessment,
      score: Number(newResult.score),
      semester: newResult.semester,
      academicYear: newResult.academicYear,
    }

    setResultList(prev => [...prev, resultToAdd])
  }

  // Update result
  const updateResult = updatedResult => {
    setResultList(prev =>
      prev.map(result =>
        result.id === updatedResult.id
          ? {
              ...result,
              ...updatedResult,
              score: Number(updatedResult.score),
            }
          : result
      )
    )
  }

  // Delete result
  const deleteResult = resultId => {
    setResultList(prev => prev.filter(result => result.id !== resultId))
  }

  // Clear filters
  const clearFilters = () => {
    setSearch('')
    setSelectedCourse('All')
    setSelectedAssessment('All')
    setSelectedSemester('All')
    setSelectedAcademicYear('All')
  }

  return {
    resultList,

    // Data
    filteredResults,
    sortedResults,
    paginatedResults,

    // Search
    search,
    setSearch,

    // Filters
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

    // Sorting
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,

    // Pagination
    currentPage,
    setCurrentPage,
    resultsPerPage,
    totalPages,
    startIndex,
    endIndex,
    pageNumbers,

    // CRUD
    addResult,
    updateResult,
    deleteResult,
  }
}

export default useResults
