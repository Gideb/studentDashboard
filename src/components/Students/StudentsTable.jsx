import { LuPen } from 'react-icons/lu'
import { IoTrashBin } from 'react-icons/io5'

const STATUS = {
  Active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Inactive: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
}

const StudentsTable = ({ students, onEdit, onDelete }) => {
  return (
    <div className='w-full max-w-full overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700'>
      <table className='w-full min-w-250 divide-y-2 divide-gray-200 text-left dark:divide-gray-700'>
        <caption className='sr-only'>List of registered students</caption>

        <thead className='bg-gray-100 dark:bg-gray-800'>
          <tr>
            <th className='px-4 py-3 text-xs font-semibold uppercase text-gray-600 dark:text-gray-300'>
              Student ID
            </th>

            <th className='px-4 py-3 text-xs font-semibold uppercase text-gray-600 dark:text-gray-300'>
              Student
            </th>

            <th className='px-4 py-3 text-xs font-semibold uppercase text-gray-600 dark:text-gray-300'>
              Department
            </th>

            <th className='px-4 py-3 text-xs font-semibold uppercase text-gray-600 dark:text-gray-300'>
              Level
            </th>

            <th className='px-4 py-3 text-xs font-semibold uppercase text-gray-600 dark:text-gray-300'>
              Gender
            </th>

            <th className='px-4 py-3 text-xs font-semibold uppercase text-gray-600 dark:text-gray-300'>
              Status
            </th>

            <th className='px-4 py-3 text-center text-xs font-semibold uppercase text-gray-600 dark:text-gray-300'>
              Actions
            </th>
          </tr>
        </thead>

        <tbody className='bg-white text-left dark:bg-slate-900'>
          {students.length > 0 ? (
            students.map(student => (
              <tr key={student.id} className='border-t border-gray-200 dark:border-gray-700'>
                <td className='px-4 py-4 text-sm font-medium text-gray-900 dark:text-white'>
                  {student.studentId}
                </td>

                <td className='px-4 py-4'>
                  <p className='text-sm font-medium text-gray-900 dark:text-white'>
                    {student.name}
                  </p>

                  <p className='mt-1 text-xs text-gray-500 dark:text-gray-400'>{student.email}</p>
                </td>

                <td className='px-4 py-4 text-sm text-gray-700 dark:text-gray-300'>
                  {student.department}
                </td>

                <td className='px-4 py-4 text-sm text-gray-700 dark:text-gray-300'>
                  {student.level}
                </td>

                <td className='px-4 py-4 text-sm text-gray-700 dark:text-gray-300'>
                  {student.gender}
                </td>

                <td className='px-4 py-4'>
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                      STATUS[student.status] ||
                      'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                    }`}
                  >
                    {student.status}
                  </span>
                </td>

                <td className='px-4 py-4'>
                  <div className='flex justify-end gap-2'>
                    <button type='button' onClick={() => onEdit(student)} className='btn-primary'>
                      <LuPen size={11} />
                      Edit
                    </button>

                    <button type='button' onClick={() => onDelete(student)} className='btn-delete'>
                      <IoTrashBin size={12} />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='7' className='px-4 py-10 text-center'>
                <p className='font-medium text-gray-700 dark:text-gray-300'>No students found</p>

                <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
                  Try changing your search or filters.
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default StudentsTable
