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

export const generateStudentCode = (students, department, excludeId = null) => {
  const normalizedDepartment = department.toLowerCase().trim()

  const prefix = DEPARTMENT_PREFIXES[normalizedDepartment] || 'CODE'

  const departmentStudents = students.filter(student => {
    return (
      student.id !== excludeId && student.department.toLowerCase().trim() === normalizedDepartment
    )
  })

  const highestNumber = departmentStudents.reduce((highest, student) => {
    const number = parseInt(student.code.split('-')[1], 10)

    if (Number.isNaN(number)) {
      return highest
    }

    return number > highest ? number : highest
  }, 100)

  return `${prefix}-${highestNumber + 1}`
}
