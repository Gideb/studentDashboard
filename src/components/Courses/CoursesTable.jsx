import { LuPen } from 'react-icons/lu'
import { IoTrashBin } from 'react-icons/io5'

const STATUS = {
  Active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Inactive: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
}

const CoursesTable = ({ courses, onEdit, onDelete }) => {
  return (
    <div className='w-full max-w-full overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700'>
      <table className='w-full min-w-200 divide-y-2 divide-gray-200 dark:divide-gray-700 text-left'>
        <caption className='sr-only'>List of available courses</caption>
        <thead className='bg-gray-100 dark:bg-gray-800 '>
          <tr className=''>
            <th className='px-4 py-5 text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300 '>
              Course
            </th>
            <th className='px-4 py-5 text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300 border-l border-gray-300 dark:border-gray-700'>
              Code
            </th>
            <th className='px-4 py-5 text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300 border-l border-gray-300 dark:border-gray-700'>
              Department
            </th>
            <th className='px-4 py-5 text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300 border-l border-gray-300 dark:border-gray-700'>
              Teacher
            </th>
            <th className='px-4 py-5 text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300 border-l border-gray-300 dark:border-gray-700'>
              Students
            </th>
            <th className='px-4 py-5 text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300 border-l border-gray-300 dark:border-gray-700'>
              Status
            </th>
            <th className='px-4 py-5 text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300 border-l border-gray-300 dark:border-gray-700'>
              Actions
            </th>
          </tr>
        </thead>

        <tbody className='w-full text-left bg-white dark:bg-slate-900 '>
          {courses.length > 0 ? (
            courses.map(course => (
              <tr className='border-t border-gray-200 dark:border-gray-700' key={course.id}>
                <td className='px-4 py-3 text-sm font-normal text-gray-600 dark:text-gray-300 border-l border-gray-300 dark:border-gray-700'>
                  {course.name}
                </td>
                <td className='px-4 py-3 text-sm font-normal text-gray-600 dark:text-gray-300 border-l border-gray-300 dark:border-gray-700'>
                  {course.code}
                </td>
                <td className='px-4 py-3 text-sm font-normal text-gray-600 dark:text-gray-300 border-l border-gray-300 dark:border-gray-700'>
                  {course.department}
                </td>
                <td className='px-4 py-3 text-sm font-normal text-gray-600 dark:text-gray-300 border-l border-gray-300 dark:border-gray-700'>
                  {course.teacher}
                </td>
                <td className='px-4 py-3 text-sm font-normal text-gray-600 dark:text-gray-300 border-l border-gray-300 dark:border-gray-700'>
                  {course.students}
                </td>
                <td className='px-4 py-3 font-normal text-gray-600 dark:text-gray-300 border-l border-gray-300 dark:border-gray-700 '>
                  <span
                    className={`inline-flex gap-2 items-center rounded-full text-xs py-1 px-2  ${STATUS[course.status]}`}
                  >
                    <span className='w-1.5 h-1.5 bg-current rounded-full' />
                    {course.status}
                  </span>
                </td>
                <td className='px-4 py-3 text-sm font-normal text-gray-600 dark:text-gray-300 border-l border-gray-300 dark:border-gray-700'>
                  <div className='flex items-center  gap-3'>
                    <button
                      type='button'
                      onClick={() => onEdit(course)}
                      className='btn-primary flex gap-2 items-center'
                    >
                      <LuPen size={11} />
                      Edit
                    </button>

                    <div className='h-6 border-l border-gray-400 dark:border-gray-600' />

                    <button
                      type='button'
                      onClick={() => onDelete(course)}
                      className='btn-delete flex gap-2 items-center'
                    >
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
                <p className='font-medium text-gray-700 dark:text-gray-300'>No courses found</p>

                <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
                  Try changing your search or department filter.
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default CoursesTable
