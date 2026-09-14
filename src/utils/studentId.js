export const generateStudentId = (students, excludeId = null) => {
  const existingStudents = students.filter(student => student.id !== excludeId)

  const highestNumber = existingStudents.reduce((highest, student) => {
    const number = parseInt(student.studentId.split('-')[1], 10)

    if (Number.isNaN(number)) {
      return highest
    }

    return number > highest ? number : highest
  }, 0)

  return `STU-${String(highestNumber + 1).padStart(3, '0')}`
}
