import { useEffect, useState } from 'react'
import { courses } from '../data/CoursesData'
import { generateCourseCode } from '../utils/courseCode'
import { generateId } from '../utils/generateId'
import useTableControls from './useTableControls'

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
  // Course filters
  // -----------------------------

  const [selectedDepartment, setSelectedDepartment] = useState('All')

  // -----------------------------
  // Save courses to localStorage
  // -----------------------------

  useEffect(() => {
    localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(courseList))
  }, [courseList])

  // -----------------------------
  // Filter options
  // -----------------------------

  const uniqueDepartments = [...new Set(courseList.map(course => course.department))]

  const uniqueStatus = [...new Set(courseList.map(course => course.status))]

  // -----------------------------
  // Department filtering
  // -----------------------------

  const departmentFilteredCourses = courseList.filter(course => {
    return selectedDepartment === 'All' || course.department === selectedDepartment
  })

  // -----------------------------
  // Search, sorting & pagination
  // -----------------------------

  const {
    search,
    setSearch,

    filteredData: filteredCourses,
    sortedData: sortedCourses,
    paginatedData: paginatedCourses,

    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,

    currentPage,
    setCurrentPage,

    itemsPerPage: coursesPerPage,
    totalPages,
    startIndex,
    endIndex,
    pageNumbers,
  } = useTableControls({
    data: departmentFilteredCourses,
    searchableFields: ['name', 'code'],
    itemsPerPage: 5,
    resetDependencies: [selectedDepartment],
  })

  // -----------------------------
  // Active filters
  // -----------------------------

  const hasActiveFilters = search.trim() !== '' || selectedDepartment !== 'All'

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

  // -----------------------------
  // Return everything
  // -----------------------------

  return {
    // Data
    courseList,
    filteredCourses,
    sortedCourses,
    paginatedCourses,

    // Search
    search,
    setSearch,

    // Filters
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

    // Filter options
    uniqueDepartments,
    uniqueStatus,

    // CRUD
    addCourse,
    updateCourse,
    deleteCourse,
  }
}

export default useCourses
