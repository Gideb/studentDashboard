import Modal from '../Modals/Modal'
import { LuTrash2 } from 'react-icons/lu'

const DeleteEventModal = ({ onClose, eventToDelete, confirmDeleteEvent }) => {
  return (
    <Modal onClose={onClose} labelledBy='delete-event-title'>
      <div>
        {/* Icon */}
        <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/10'>
          <LuTrash2 className='text-xl text-red-600 dark:text-red-400' />
        </div>

        {/* Header */}
        <h2
          id='delete-event-title'
          className='text-lg sm:text-xl font-semibold text-primary dark:text-white'
        >
          {`Delete ${eventToDelete?.type || 'Event'}`}
        </h2>

        <p className='mt-2 text-sm leading-6 text-secondary dark:text-gray-400'>
          Are you sure you want to delete{' '}
          <span className='font-medium text-primary dark:text-gray-200'>{eventToDelete.title}</span>
          ? This action cannot be undone.
        </p>

        {/* Event Details */}
        <div className='mt-4 rounded-lg bg-gray-50 p-4 dark:bg-slate-800'>
          <div className='space-y-2 text-sm'>
            <div className='flex justify-between gap-4'>
              <span className='text-secondary dark:text-gray-500'>Event Type</span>

              <span className='font-medium text-primary dark:text-gray-300'>
                {eventToDelete.type}
              </span>
            </div>

            <div className='flex justify-between gap-4'>
              <span className='text-secondary dark:text-gray-500'>Event Title</span>

              <span className='text-right font-medium text-primary dark:text-gray-300'>
                {eventToDelete.title}
              </span>
            </div>

            <div className='flex justify-between gap-4'>
              <span className='text-secondary dark:text-gray-500'>Due Date</span>

              <span className='font-medium text-primary dark:text-gray-300'>
                {eventToDelete.date}
              </span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className='mt-6 flex items-center gap-3 justify-end border-t border-gray-200 dark:border-gray-700 pt-4'>
          <button type='button' onClick={onClose} className='btn-secondary '>
            Cancel
          </button>

          <button type='button' onClick={confirmDeleteEvent} className='btn-delete-2 '>
            Delete Event
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteEventModal
