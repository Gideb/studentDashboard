import DashboardLayout from '../../layouts/DashboardLayout'
import StudentTable from '../../components/Students/StudentTable'
import StudentFilter from '../../components/Students/StudentFilter'
import { useState } from 'react'
import { students } from '../../data/studentsData'

const Students = () => {
  const [search, setSearch] = useState('')
  const [selectedClass, setSelectedClass] = useState('All')

  const filteredStudents = students.filter(student => {
    const matchesSearch =
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.studentId.toLowerCase().includes(search.toLocaleLowerCase())

    const matchesClass = selectedClass == 'All' || student.class === selectedClass
    
    return matchesSearch && matchesClass
  })

  return (
    <DashboardLayout activeMenu='Students'>
      <main className='my-5 mx-auto px-3 sm:px-6 py-5 sm:py-8'>
        <div className='mb-6'>
          <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>Students</h1>

          <p className='text-gray-500 dark:text-gray-400'>Manage all registered students.</p>
        </div>

        {/* filter students */}
        <section className='mb-6'>
          <h2 id='students-filter' className='sr-only'>
            Filter Students
          </h2>
          <StudentFilter
            search={search}
            setSearch={setSearch}
            selectedClass={selectedClass}
            setSelectedClass={setSelectedClass}
          />
        </section>

        {/* students table */}
        <section className='mb-6' aria-labelledby='students-table-heading'>
          <h2 id='students-table-heading' className='sr-only'>
            Registered Students
          </h2>
          <StudentTable students={filteredStudents} />
        </section>
      </main>
    </DashboardLayout>
  )
}

export default Students
