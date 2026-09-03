const StudentTable = ({ students }) => {
  return (
    <div className='overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700'>
      <table className='w-full text-left'>
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
          {students.map(student => (
            <tr key={student.id} className='border-t border-gray-200 dark:border-gray-700'>
              <td className='px-4 py-4 text-sm text-gray-700 dark:text-gray-300'>{student.name}</td>
              <td className='px-4 py-4 text-sm text-gray-700 dark:text-gray-300 border-l border-gray-300 dark:border-gray-700'>
                {student.studentId}
              </td>
              <td className='px-4 py-4 text-sm text-gray-700 dark:text-gray-300 border-l border-gray-300 dark:border-gray-700'>
                {student.class}
              </td>
              <td className='px-4 py-4 text-sm text-gray-700 dark:text-gray-300 border-l border-gray-300 dark:border-gray-700'>
                {student.status}
              </td>

              <td className='px-4 py-4 border-l border-gray-300 dark:border-gray-700'>
                <div className='flex items-center gap-2'>
                  <button className='btn-primary font-medium'>View</button>

                  <div className='h-5 border-l border-gray-400' />

                  <button className='btn-primary btn-delete font-medium'>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default StudentTable
