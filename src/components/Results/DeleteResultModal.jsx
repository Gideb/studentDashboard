import { LuTrash2 } from 'react-icons/lu'
import Modal from '../Modals/Modal'

const DeleteResultModal = ({ result, onClose, onConfirm }) => {
  return (
    <Modal onClose={onClose} labelledBy='delete-result-title'>
      <div className='text-center'>
        <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'>
          <LuTrash2 size={22} />
        </div>

        <h2
          id='delete-result-title'
          className='mt-4 text-xl font-semibold text-primary dark:text-white'
        >
          Delete Result
        </h2>

        <p className='mx-auto mt-2 max-w-md text-sm text-secondary dark:text-gray-400'>
          Are you sure you want to delete this result? This action cannot be undone.
        </p>

        <div className='mt-5 rounded-lg bg-gray-50 p-4 text-left dark:bg-slate-800'>
          <div className='flex justify-between gap-4'>
            <span className='text-sm text-secondary dark:text-gray-400'>Result ID</span>

            <span className='text-sm font-medium text-primary dark:text-white'>
              {result.resultId}
            </span>
          </div>

          <div className='mt-3 flex justify-between gap-4'>
            <span className='text-sm text-secondary dark:text-gray-400'>Student</span>

            <span className='text-right text-sm font-medium text-primary dark:text-white'>
              {result.studentName}
            </span>
          </div>

          <div className='mt-3 flex justify-between gap-4'>
            <span className='text-sm text-secondary dark:text-gray-400'>Course</span>

            <span className='text-right text-sm font-medium text-primary dark:text-white'>
              {result.course}
            </span>
          </div>

          <div className='mt-3 flex justify-between gap-4'>
            <span className='text-sm text-secondary dark:text-gray-400'>Score</span>

            <span className='text-sm font-semibold text-primary dark:text-white'>
              {result.score}%
            </span>
          </div>
        </div>

        <div className='mt-6 flex justify-end gap-3'>
          <button
            type='button'
            onClick={onClose}
            className='btn-secondary'
          >
            Cancel
          </button>

          <button
            type='button'
            onClick={onConfirm}
            className='btn-delete-2'
          >
            Delete Result
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteResultModal
