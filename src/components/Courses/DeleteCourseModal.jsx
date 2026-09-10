import { X } from 'lucide-react'
import Modal from '../Modals/Modal'
import { ImBin2 } from 'react-icons/im'

const DeleteCourseModal = ({ course, onClose, onConfirm }) => {
  if (!course) return null

  return (
    <Modal onClose={onClose} labelledBy='delete-course-details'>
      {/* header */}
      <div className='flex items-start justify-between gap-3 border-b border-gray-200 dark:border-gray-700 pb-4'>
        <div>
          <div className='flex items-center gap-2 mb-1'>
            <ImBin2 size={17} className='text-black dark:text-white' />

            <h2
              id='delete-course-details'
              className='text-lg sm:text-xl font-semibold text-black dark:text-white'
            >
              Delete Course
            </h2>
          </div>

          <p className='text-xs'> Are you sure you want to delete this course?</p>
        </div>

        <button
          type='button'
          onClick={onClose}
          aria-label='Close modal'
          className='flex items-center justify-center p-2 hover:bg-gray-50 hover:dark:bg-gray-800 rounded-full text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-all'
        >
          <X className='h-4 w-4' />
        </button>
      </div>

      {/* delete course */}

      <div className='mt-6 space-y-4'>
        <div>
          <p className='mt-1 text-base font-medium text-gray-900 dark:text-white'>{course.name}</p>

          <p className=' text-base font-medium text-gray-900 dark:text-white'>
            <span className='font-normal text-gray-700 dark:text-gray-400'> course code: </span>{' '}
            {course.code}
          </p>
        </div>

        <p className='mt-1 text-sm text-gray-800 dark:text-gray-200'>
          This action cannot be undone. The course will be permanently removed from the course list.
        </p>
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
        <button aria-label='Delete course' type='button' onClick={onConfirm} className='btn-delete'>
          Delete
        </button>
      </div>
    </Modal>
  )
}

export default DeleteCourseModal
