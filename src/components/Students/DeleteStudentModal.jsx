import Modal from '../Modals/Modal'
import { LuTrash2 } from 'react-icons/lu'

const DeleteStudentModal = ({ student, onClose, onConfirm }) => {
  if (!student) return null

  return (
    <Modal onClose={onClose} labelledBy='delete-student-details'>
      <div className='p-1'>
        {/* Icon */}
        <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/10'>
          <LuTrash2 className='text-xl text-red-600 dark:text-red-400' />
        </div>

        {/* Header */}
        <h2
          id='delete-assignment-title'
          className='text-lg sm:text-xl font-semibold text-primary dark:text-white'
        >
          Delete Student
        </h2>

        <p className='mt-2 text-sm leading-6 text-secondary dark:text-gray-400'>
          Are you sure you want to delete{' '}
          <span className='font-medium text-primary dark:text-gray-200'>{student.name}</span>? This
          action cannot be undone.
        </p>

        {/* delete student */}

        <div className='mt-4 rounded-lg bg-gray-50 p-4 dark:bg-slate-800'>
          <div className='space-y-2 text-sm'>
            <div className='flex justify-between gap-4'>
              <span className='text-secondary dark:text-gray-500'>Student ID</span>

              <span className='font-medium text-primary dark:text-gray-300'>
                {student.studentId}
              </span>
            </div>

            <div className='flex justify-between gap-4'>
              <span className='text-secondary dark:text-gray-500'>Student</span>

              <div className='flex flex-col'>
                <span className='text-right font-medium text-primary dark:text-gray-300'>
                  {student.name}
                </span>
                <span className='text-right text-xs  text-primary dark:text-gray-500'>
                  {student.email}
                </span>
              </div>
            </div>

            <div className='flex justify-between gap-4'>
              <span className='text-secondary dark:text-gray-500'>Department</span>

              <span className='font-medium text-primary dark:text-gray-300'>
                {student.department}
              </span>
            </div>

            <div className='flex justify-between gap-4'>
              <span className='text-secondary dark:text-gray-500'>Level</span>

              <span className='font-medium text-primary dark:text-gray-300'>{student.level}</span>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className='mt-6 flex items-center gap-3 justify-end border-t border-gray-200 dark:border-gray-700 pt-4'>
          <button
            aria-label='Close delete modal'
            type='button'
            onClick={onClose}
            className='btn-secondary'
          >
            Cancel
          </button>

          <button
            aria-label='Delete student'
            type='button'
            onClick={onConfirm}
            className='btn-delete-2'
          >
            Delete Student
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteStudentModal
