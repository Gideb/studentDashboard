import { useEffect, useState } from 'react'
import { students } from '../data/StudentsData'
import { generateStudentId } from '../utils/studentId'
import { generateId } from '../utils/generateId'
import useTableControls from './useTableControls'

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
  // Student filters
  // -----------------------------

  const [selectedDepartment, setSelectedDepartment] = useState('All')
  const [selectedLevel, setSelectedLevel] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')

  // -----------------------------
  // Save students to localStorage
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
  // Student filtering
  // -----------------------------

  const studentFilteredData = studentList.filter(student => {
    const matchesDepartment =
      selectedDepartment === 'All' || student.department === selectedDepartment

    const matchesLevel = selectedLevel === 'All' || student.level === selectedLevel

    const matchesStatus = selectedStatus === 'All' || student.status === selectedStatus

    return matchesDepartment && matchesLevel && matchesStatus
  })

  // -----------------------------
  // Search, sorting & pagination
  // -----------------------------

  const {
    search,
    setSearch,

    filteredData: filteredStudents,
    sortedData: sortedStudents,
    paginatedData: paginatedStudents,

    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,

    currentPage,
    setCurrentPage,

    itemsPerPage: studentsPerPage,
    totalPages,
    startIndex,
    endIndex,
    pageNumbers,
  } = useTableControls({
    data: studentFilteredData,
    searchableFields: ['name', 'studentId', 'email'],
    itemsPerPage: 5,
    resetDependencies: [selectedDepartment, selectedLevel, selectedStatus],
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
  // Add student
  // -----------------------------

  const addStudent = newStudent => {
    const newId = generateId(studentList)

    const newStudentId = generateStudentId(studentList)

    const studentToAdd = {
      id: newId,
      studentId: newStudentId,
      name: newStudent.name,
      email: newStudent.email,
      gender: newStudent.gender,
      department: newStudent.department,
      level: newStudent.level,
      phone: newStudent.phone,
      status: newStudent.status,
    }

    setStudentList(prev => [...prev, studentToAdd])
  }

  // -----------------------------
  // Update student
  // -----------------------------

  const updateStudent = updatedStudent => {
    setStudentList(prev =>
      prev.map(student =>
        student.id === updatedStudent.id
          ? {
              ...student,
              ...updatedStudent,
            }
          : student
      )
    )
  }

  // -----------------------------
  // Delete student
  // -----------------------------

  const deleteStudent = studentId => {
    setStudentList(prev => prev.filter(student => student.id !== studentId))
  }

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

    // CRUD
    addStudent,
    updateStudent,
    deleteStudent,
  }
}

export default useStudents
