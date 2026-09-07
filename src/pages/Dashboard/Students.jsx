import { useState } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import StudentTable from '../../components/Students/StudentTable'
import StudentFilter from '../../components/Students/StudentFilter'
import DeleteStudentModal from '../../components/Students/DeleteStudentModal'
import { students } from '../../data/studentsData'
import AddStudentModal from '../../components/Students/AddStudentModal'
import EditStudentModal from '../../components/Students/EditStudentModal'
import toast from 'react-hot-toast'

const Students = () => {
  const [search, setSearch] = useState('')
  const [selectedClass, setSelectedClass] = useState('All')
  const [studentToEdit, setStudentToEdit] = useState(null)
  const [studentList, setStudentList] = useState(students)
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false)

  const [studentToDelete, setStudentToDelete] = useState(null)

  const filteredStudents = studentList.filter(student => {
    const matchesSearch =
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.studentId.toLowerCase().includes(search.toLowerCase())

    const matchesClass = selectedClass === 'All' || student.class === selectedClass

    return matchesSearch && matchesClass
  })

  const handleEditStudent = student => {
    setStudentToEdit(student)
  }
  const closeEditStudent = () => {
    setStudentToEdit(null)
  }

  const handleOpenDeleteStudent = student => {
    setStudentToDelete(student)
  }

  const closeDeleteModal = () => {
    setStudentToDelete(null)
  }

  const handleConfirmDelete = id => {
    setStudentList(prev => prev.filter(student => student.id !== id))

    setStudentToDelete(null)
    toast.success('Student deleted successfully!')
  }

  const handleAddStudent = newStudent => {
    const newId =
      (studentList.length > 0 ? Math.max(...studentList.map(student => student.id)) : 0) + 1

    const newStudentId = `STD-${newId.toString().padStart(3, '0')}`

    const studentToAdd = {
      id: newId,
      name: newStudent.name,
      studentId: newStudentId,
      class: newStudent.class,
      status: newStudent.status,
    }

    setStudentList(prev => [...prev, studentToAdd])
  }

  const handleUpdateStudent = updatedStudent => {
    setStudentList(prev =>
      prev.map(student =>
        student.id === updatedStudent.id ? { ...student, ...updatedStudent } : student
      )
    )
    closeEditStudent()
    toast.success('Student details updated!')
  }

  return (
    <DashboardLayout activeMenu='Students'>
      <main className='my-5 mx-auto w-full min-w-0 px-3 sm:px-6 py-5 sm:py-8'>
        {/* PAGE HEADER */}
        <header className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-5'>
          <div>
            <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>Students</h1>

            <p className='text-gray-500 dark:text-gray-400 text-sm'>
              Manage all registered students.
            </p>
          </div>

          <button
            type='button'
            className='add-btn self-start'
            onClick={() => setIsAddStudentOpen(true)}
          >
            + Add Student
          </button>
        </header>

        {/* FILTER */}
        <section className='mb-6 w-full' aria-labelledby='students-filter-heading'>
          <h2 id='students-filter-heading' className='sr-only'>
            Filter Students
          </h2>

          <StudentFilter
            search={search}
            setSearch={setSearch}
            selectedClass={selectedClass}
            setSelectedClass={setSelectedClass}
          />
        </section>

        {/* TABLE */}
        <section className='mb-6' aria-labelledby='students-table-heading'>
          <h2 id='students-table-heading' className='sr-only'>
            Registered Students
          </h2>

          <StudentTable
            students={filteredStudents}
            onEdit={handleEditStudent}
            onDelete={handleOpenDeleteStudent}
          />
        </section>

        {/* Edit STUDENT MODAL */}
        {studentToEdit && (
          <EditStudentModal
            student={studentToEdit}
            onClose={closeEditStudent}
            onUpdate={handleUpdateStudent}
          />
        )}

        {/* DELETE STUDENT MODAL */}
        {studentToDelete && (
          <DeleteStudentModal
            student={studentToDelete}
            onClose={closeDeleteModal}
            onConfirm={() => handleConfirmDelete(studentToDelete.id)}
          />
        )}

        {/* Add STUDENT MODAL */}
        {isAddStudentOpen && (
          <AddStudentModal onClose={() => setIsAddStudentOpen(false)} onAdd={handleAddStudent} />
        )}
      </main>
    </DashboardLayout>
  )
}

export default Students
