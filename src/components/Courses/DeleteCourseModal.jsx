import Modal from '../Modals/Modal'
import { LuTrash2 } from 'react-icons/lu'

const DeleteCourseModal = ({ course, onClose, onConfirm }) => {
  if (!course) return null

  return (
    <Modal onClose={onClose} labelledBy='delete-course-details'>
      <div className='p-1'>
        {/* icon */}
        <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/10'>
          <LuTrash2 className='text-xl text-red-600 dark:text-red-400' />
        </div>

        {/* header */}

        <h2
          id='delete-course-details'
          className='text-lg sm:text-xl font-semibold text-black dark:text-white'
        >
          Delete Course
        </h2>

        <p className='mt-2 text-sm leading-6 text-secondary dark:text-gray-400'>
          Are you sure you want to delete{' '}
          <span className='font-medium text-primary dark:text-gray-200'>{course.name}</span>? This
          action cannot be undone.
        </p>

        {/*  course details */}

        <div className='mt-4 rounded-lg bg-gray-50 p-4 dark:bg-slate-800'>
          <div className='space-y-2 text-sm'>
            <div className='flex justify-between gap-4'>
              <span className='text-secondary dark:text-gray-500'>Course ID</span>

              <span className='font-medium text-primary dark:text-gray-300'>{course.code}</span>
            </div>

            <div className='flex justify-between gap-4'>
              <span className='text-secondary dark:text-gray-500'>Course</span>

              <span className='text-right font-medium text-primary dark:text-gray-300'>
                {course.name}
              </span>
            </div>

            <div className='flex justify-between gap-4'>
              <span className='text-secondary dark:text-gray-500'>Department</span>

              <span className='font-medium text-primary dark:text-gray-300'>
                {course.department}
              </span>
            </div>
          </div>
        </div>

        {/* Buttons */}
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
            aria-label='Delete course'
            type='button'
            onClick={onConfirm}
            className='btn-delete-2'
          >
            Delete Course
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteCourseModal
