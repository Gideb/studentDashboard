import { useEffect, useState } from 'react'
import { courses } from '../data/CoursesData'
import { generateCourseCode } from '../utils/courseCode'
import { generateId } from '../utils/generateId'

const COURSES_STORAGE_KEY = 'courses'

const useCourses = () => {
  // -----------------------------
  // Course data
  // -----------------------------

  const [courseList, setCourseList] = useState(() => {
    try {
      const savedCourses = localStorage.getItem(COURSES_STORAGE_KEY)

      return savedCourses ? JSON.parse(savedCourses) : courses
    } catch (error) {
      console.error('Failed to load courses from localStorage:', error)
      return courses
    }
  })

  // -----------------------------
  // Search, filter and sorting
  // -----------------------------

  const [search, setSearch] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('All')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')

  // -----------------------------
  // Pagination
  // -----------------------------

  const [currentPage, setCurrentPage] = useState(1)

  const coursesPerPage = 5

  // -----------------------------
  // Save courses to localStorage
  // -----------------------------

  useEffect(() => {
    localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(courseList))
  }, [courseList])

  // -----------------------------
  // Departments and statuses
  // -----------------------------

  const uniqueDepartments = [...new Set(courseList.map(course => course.department))]

  const uniqueStatus = [...new Set(courseList.map(course => course.status))]

  // -----------------------------
  // Filtering
  // -----------------------------

  const filteredCourses = courseList.filter(course => {
    const searchValue = search.toLowerCase()

    const matchesSearch =
      course.name.toLowerCase().includes(searchValue) ||
      course.code.toLowerCase().includes(searchValue)

    const matchesDepartment =
      selectedDepartment === 'All' || course.department === selectedDepartment

    return matchesSearch && matchesDepartment
  })

  // -----------------------------
  // Active filters
  // -----------------------------

  const hasActiveFilters = search.trim() !== '' || selectedDepartment !== 'All'

  // -----------------------------
  // Sorting
  // -----------------------------

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

  // -----------------------------
  // Pagination calculations
  // -----------------------------

  const totalPages = Math.ceil(sortedCourses.length / coursesPerPage)

  const startIndex = (currentPage - 1) * coursesPerPage

  const endIndex = startIndex + coursesPerPage

  const paginatedCourses = sortedCourses.slice(startIndex, endIndex)

  // Reset page when filters or sorting change
  useEffect(() => {
    setCurrentPage(1)
  }, [search, selectedDepartment, sortBy, sortOrder])

  // Prevent invalid page after deleting courses
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
  // Add course
  // -----------------------------

  const addCourse = newCourse => {
    const newId = generateId(courseList)

    const newCourseCode = generateCourseCode(courseList, newCourse.department)

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
  }

  // -----------------------------
  // Update course
  // -----------------------------

  const updateCourse = updatedCourse => {
    setCourseList(prev =>
      prev.map(course => {
        if (course.id !== updatedCourse.id) {
          return course
        }

        // Department has not changed
        if (course.department === updatedCourse.department) {
          return {
            ...course,
            ...updatedCourse,
          }
        }

        // Department changed → generate new course code
        const newCourseCode = generateCourseCode(prev, updatedCourse.department, updatedCourse.id)

        return {
          ...course,
          ...updatedCourse,
          code: newCourseCode,
        }
      })
    )
  }

  // -----------------------------
  // Delete course
  // -----------------------------

  const deleteCourse = courseId => {
    setCourseList(prev => prev.filter(course => course.id !== courseId))
  }

  // -----------------------------
  // Clear filters
  // -----------------------------

  const clearFilters = () => {
    setSearch('')
    setSelectedDepartment('All')
  }

  return {
    // Data
    courseList,
    filteredCourses,
    sortedCourses,
    paginatedCourses,

    // Filter
    search,
    setSearch,
    selectedDepartment,
    setSelectedDepartment,
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
    coursesPerPage,
    totalPages,
    startIndex,
    endIndex,
    pageNumbers,

    // Options
    uniqueDepartments,
    uniqueStatus,

    // CRUD
    addCourse,
    updateCourse,
    deleteCourse,
  }
}

export default useCourses
