import { LuPen } from 'react-icons/lu'
import { IoTrashBin } from 'react-icons/io5'

const CoursesTable = ({ courses, onEdit, onDelete }) => {
  return (
    <div className='w-full max-w-full overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700'>
      <table>
        <thead>
          <tr>
            <th>Course</th>
            <th>Code</th>
            <th>Department</th>
            <th>Teacher</th>
            <th>Students</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>{courses.name}</td>
            <td>{courses.code}</td>
            <td>{courses.department}</td>
            <td>{courses.teacher}</td>
            <td>{courses.students}</td>
            <td>{courses.status}</td>
            <td>
              <div className='flex items center justify-center gap-3'>
                <div className='flex gap-2 items-center'>
                  <LuPen size={11} />
                  <button type='button' onClick={onEdit} className='btn-primary'>
                    Edit
                  </button>
                </div>
                |
                <div className='flex gap-2 items-center'>
                  <IoTrashBin size={12} />
                  <button type='button' onClick={onDelete} className='btn-delete'>
                    Delete
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default CoursesTable
