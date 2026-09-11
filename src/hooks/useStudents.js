import { useEffect, useState } from 'react'
import { students } from '../data/StudentsData'

const STUDENTS_STORAGE_KEY = 'students'

const useStudents = () => {
  // -----------------------------
  // Student data
  // -----------------------------

  const [studentList, setStudentList] = useState(() => {
    try {
      const savedStudents = localStorage.getItem(STUDENTS_STORAGE_KEY)

      return savedStudents ? JSON.parse(savedStudents) : students
    } catch (error) {
      console.error('Failed to load students from localStorage:', error)

      return students
    }
  })

  // -----------------------------
  // Search and filters
  // -----------------------------

  const [search, setSearch] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('All')
  const [selectedLevel, setSelectedLevel] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')

  // -----------------------------
  // Sorting
  // -----------------------------

  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')

  // -----------------------------
  // Pagination
  // -----------------------------

  const [currentPage, setCurrentPage] = useState(1)

  const studentsPerPage = 5

  // -----------------------------
  // Save to localStorage
  // -----------------------------

  useEffect(() => {
    localStorage.setItem(STUDENTS_STORAGE_KEY, JSON.stringify(studentList))
  }, [studentList])

  // -----------------------------
  // Filter options
  // -----------------------------

  const uniqueDepartments = [...new Set(studentList.map(student => student.department))]

  const uniqueLevels = [...new Set(studentList.map(student => student.level))]

  const uniqueStatus = [...new Set(studentList.map(student => student.status))]

  // -----------------------------
  // Filtering
  // -----------------------------

  const filteredStudents = studentList.filter(student => {
    const searchValue = search.toLowerCase()

    const matchesSearch =
      student.name.toLowerCase().includes(searchValue) ||
      student.studentId.toLowerCase().includes(searchValue) ||
      student.email.toLowerCase().includes(searchValue)

    const matchesDepartment =
      selectedDepartment === 'All' || student.department === selectedDepartment

    const matchesLevel = selectedLevel === 'All' || student.level === selectedLevel

    const matchesStatus = selectedStatus === 'All' || student.status === selectedStatus

    return matchesSearch && matchesDepartment && matchesLevel && matchesStatus
  })

  // -----------------------------
  // Active filters
  // -----------------------------

  const hasActiveFilters =
    search.trim() !== '' ||
    selectedDepartment !== 'All' ||
    selectedLevel !== 'All' ||
    selectedStatus !== 'All'

  // -----------------------------
  // Sorting
  // -----------------------------

  const sortedStudents = [...filteredStudents].sort((a, b) => {
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

  // -----------------------------
  // Pagination calculations
  // -----------------------------

  const totalPages = Math.ceil(sortedStudents.length / studentsPerPage)

  const startIndex = (currentPage - 1) * studentsPerPage

  const endIndex = startIndex + studentsPerPage

  const paginatedStudents = sortedStudents.slice(startIndex, endIndex)

  // Reset page when filters/sorting change
  useEffect(() => {
    setCurrentPage(1)
  }, [search, selectedDepartment, selectedLevel, selectedStatus, sortBy, sortOrder])

  // Prevent invalid page after deletion/filtering
  useEffect(() => {
    if (totalPages === 0) {
      setCurrentPage(1)
      return
    }

    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [totalPages, currentPage])

  // -----------------------------
  // Pagination page numbers
  // -----------------------------

  const getPageNumbers = () => {
    const pages = []

    if (totalPages <= 7) {
      for (let page = 1; page <= totalPages; page++) {
        pages.push(page)
      }

      return pages
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, '...', totalPages]
    }

    if (currentPage >= totalPages - 3) {
      return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    }

    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]
  }

  const pageNumbers = getPageNumbers()

  // -----------------------------
  // Clear filters
  // -----------------------------

  const clearFilters = () => {
    setSearch('')
    setSelectedDepartment('All')
    setSelectedLevel('All')
    setSelectedStatus('All')
  }

  // -----------------------------
  // Return everything
  // -----------------------------

  return {
    // Data
    studentList,
    filteredStudents,
    sortedStudents,
    paginatedStudents,

    // Search
    search,
    setSearch,

    // Filters
    selectedDepartment,
    setSelectedDepartment,
    selectedLevel,
    setSelectedLevel,
    selectedStatus,
    setSelectedStatus,
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
    studentsPerPage,
    totalPages,
    startIndex,
    endIndex,
    pageNumbers,

    // Filter options
    uniqueDepartments,
    uniqueLevels,
    uniqueStatus,
  }
}

export default useStudents
