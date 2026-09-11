const DEPARTMENT_PREFIXES = {
  'computer science': 'COMP',
  mathematics: 'MATH',
  science: 'SCNC',
  languages: 'ENGL',
  business: 'BUSI',
  arts: 'ARTS',
  hospitality: 'HSPT',
  engineering: 'ENGR',
}

export const generateCourseCode = (courses, department, excludeId = null) => {
  const normalizedDepartment = department.toLowerCase().trim()

  const prefix = DEPARTMENT_PREFIXES[normalizedDepartment] || 'CODE'

  const departmentCourses = courses.filter(course => {
    return (
      course.id !== excludeId && course.department.toLowerCase().trim() === normalizedDepartment
    )
  })

  const highestNumber = departmentCourses.reduce((highest, course) => {
    const number = parseInt(course.code.split('-')[1], 10)

    if (Number.isNaN(number)) {
      return highest
    }

    return number > highest ? number : highest
  }, 100)

  return `${prefix}-${highestNumber + 1}`
}