import { useState } from 'react'

const STATUS_STYLES = {
  Active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Inactive: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
}

const StudentTable = ({ students }) => {
  const [selectedStudent, setSelectedStudent] = useState(null)

  const handleViewStudent = student => {
    setSelectedStudent(student)
  }

  const handleDeleteStudent = student => {
    setSelectedStudent(student)
  }

  return (
    <div className='overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700'>
      <table className=' text-left min-w-full divide-y divide-gray-200 dark:divide-gray-700'>
        <caption className='sr-only'>List of registered students with their details</caption>
        <thead className='bg-gray-100 dark:bg-gray-800'>
          <tr>
            <th className='px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300'>
              Student
            </th>
            <th className='px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300 border-l border-gray-300 dark:border-gray-700'>
              Student ID
            </th>
            <th className='px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300 border-l border-gray-300 dark:border-gray-700'>
              Class
            </th>
            <th className='px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300 border-l border-gray-300 dark:border-gray-700'>
              Status
            </th>
            <th className='px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300 border-l border-gray-300 dark:border-gray-700'>
              Actions
            </th>
          </tr>
        </thead>

        <tbody className='bg-white dark:bg-gray-900'>
          {students.length > 0 ? (
            students.map(student => (
              <tr key={student.id} className='border-t border-gray-200 dark:border-gray-700'>
                <td className='px-4 py-4 text-sm text-gray-700 dark:text-gray-300'>
                  {student.name}
                </td>
                <td className='px-4 py-4 text-sm text-gray-700 dark:text-gray-300 border-l border-gray-300 dark:border-gray-700'>
                  {student.studentId}
                </td>
                <td className='px-4 py-4 text-sm text-gray-700 dark:text-gray-300 border-l border-gray-300 dark:border-gray-700'>
                  {student.class}
                </td>
                <td className='px-4 py-3 text-sm border-l border-gray-300 dark:border-gray-700'>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                      STATUS_STYLES[student.status] ||
                      'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                    }`}
                  >
                    <span className='h-1.5 w-1.5 rounded-full bg-current' />
                    {student.status}
                  </span>
                </td>

                <td className='px-4 py-4 border-l border-gray-300 dark:border-gray-700'>
                  <div className='flex items-center gap-2'>
                    <button
                      type='button'
                      onClick={() => handleViewStudent(student)}
                      className='btn-primary font-medium'
                    >
                      View
                    </button>

                    <div className='h-5 border-l border-gray-400' />

                    <button
                      type='button'
                      onClick={() => handleDeleteStudent(student)}
                      className='btn-primary btn-delete font-medium'
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='5' className='px-4 py-10 text-center'>
                <p className='font-medium text-gray-700 dark:text-gray-300'>No students found</p>

                <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
                  Try changing your search or class filter.
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {selectedStudent && <p>Selected student: {selectedStudent.name}</p>}
    </div>
  )
}

export default StudentTable
