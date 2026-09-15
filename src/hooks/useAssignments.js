import { useEffect, useState } from 'react'
import { assignments } from '../data/AssignmentsData'
import { generateId } from '../utils/generateId'
import useTableControls from './useTableControls'

const ASSIGNMENTS_STORAGE_KEY = 'assignments'

const useAssignments = () => {
  // ==============================
  // Assignment Data
  // ==============================
  const [assignmentList, setAssignmentList] = useState(() => {
    try {
      const savedAssignments = localStorage.getItem(ASSIGNMENTS_STORAGE_KEY)

      return savedAssignments ? JSON.parse(savedAssignments) : assignments
    } catch (error) {
      console.error('Failed to load assignments from localStorage:', error)

      return assignments
    }
  })

  // ==============================
  // Filters
  // ==============================
  const [selectedCourse, setSelectedCourse] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')

  // ==============================
  // Save to localStorage
  // ==============================
  useEffect(() => {
    localStorage.setItem(ASSIGNMENTS_STORAGE_KEY, JSON.stringify(assignmentList))
  }, [assignmentList])

  // ==============================
  // Filter Options
  // ==============================
  const uniqueCourses = [...new Set(assignmentList.map(assignment => assignment.course))]

  const uniqueStatus = [...new Set(assignmentList.map(assignment => assignment.status))]

  // ==============================
  // Course + Status Filtering
  // ==============================
  const assignmentFilteredData = assignmentList.filter(assignment => {
    const matchesCourse = selectedCourse === 'All' || assignment.course === selectedCourse

    const matchesStatus = selectedStatus === 'All' || assignment.status === selectedStatus

    return matchesCourse && matchesStatus
  })

  // ==============================
  // Search, Sort & Pagination
  // ==============================
  const {
    search,
    setSearch,

    filteredData: filteredAssignments,
    sortedData: sortedAssignments,
    paginatedData: paginatedAssignments,

    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,

    currentPage,
    setCurrentPage,

    itemsPerPage: assignmentsPerPage,
    totalPages,
    startIndex,
    endIndex,
    pageNumbers,
  } = useTableControls({
    data: assignmentFilteredData,
    searchableFields: ['title', 'assignmentId', 'course', 'lecturer'],
    itemsPerPage: 5,
    resetDependencies: [selectedCourse, selectedStatus],
  })

  // ==============================
  // Active Filters
  // ==============================
  const hasActiveFilters =
    search.trim() !== '' || selectedCourse !== 'All' || selectedStatus !== 'All'

  // ==============================
  // Add Assignment
  // ==============================
  const addAssignment = newAssignment => {
    const newId = generateId(assignmentList)

    const newAssignmentId = `ASM-${String(newId).padStart(3, '0')}`

    const assignmentToAdd = {
      id: newId,
      assignmentId: newAssignmentId,
      title: newAssignment.title,
      course: newAssignment.course,
      lecturer: newAssignment.lecturer,
      dueDate: newAssignment.dueDate,
      submissions: Number(newAssignment.submissions) || 0,
      totalStudents: Number(newAssignment.totalStudents) || 0,
      status: newAssignment.status,
    }

    setAssignmentList(prev => [...prev, assignmentToAdd])
  }

  // ==============================
  // Update Assignment
  // ==============================
  const updateAssignment = updatedAssignment => {
    setAssignmentList(prev =>
      prev.map(assignment =>
        assignment.id === updatedAssignment.id
          ? {
              ...assignment,
              ...updatedAssignment,
            }
          : assignment
      )
    )
  }

  // ==============================
  // Delete Assignment
  // ==============================
  const deleteAssignment = assignmentId => {
    setAssignmentList(prev => prev.filter(assignment => assignment.id !== assignmentId))
  }

  // ==============================
  // Clear Filters
  // ==============================
  const clearFilters = () => {
    setSearch('')
    setSelectedCourse('All')
    setSelectedStatus('All')
  }

  // ==============================
  // Return
  // ==============================
  return {
    assignmentList,

    filteredAssignments,
    sortedAssignments,
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
  }
}

export default useAssignments
