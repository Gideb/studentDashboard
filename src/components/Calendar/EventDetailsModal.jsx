import { LuPencil, LuTrash2 } from 'react-icons/lu'
import { getEventStyle, formatLongEventDate } from '../../utils/calendarUtils'

const EventDetailsModal = ({ event, onClose, onEdit, onDelete }) => {
  if (!event) return null

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4'
      onClick={onClose}
    >
      <div
        className='w-full max-w-lg rounded-xl bg-white p-6 shadow-xl dark:bg-slate-900'
        onClick={e => e.stopPropagation()}
      >
        <div className='flex items-start justify-between gap-4'>
          <div>
            <span
              className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${getEventStyle(
                event.type
              )}`}
            >
              {event.type}
            </span>

            <h2 className='mt-3 text-xl font-semibold text-primary dark:text-white'>
              {event.title}
            </h2>
          </div>

          <button
            type='button'
            onClick={onClose}
            className='text-2xl text-gray-400 hover:text-primary dark:hover:text-white'
          >
            ×
          </button>
        </div>

        <div className='mt-6 space-y-4'>
          <div>
            <p className='text-xs font-medium uppercase text-gray-400'>Date</p>

            <p className='mt-1 text-sm text-primary dark:text-white'>
              {formatLongEventDate(event.date)}
            </p>
          </div>

          <div>
            <p className='text-xs font-medium uppercase text-gray-400'>Time</p>

            <p className='mt-1 text-sm text-primary dark:text-white'>
              {event.startTime} - {event.endTime}
            </p>
          </div>

          {event.course && (
            <div>
              <p className='text-xs font-medium uppercase text-gray-400'>Course</p>

              <p className='mt-1 text-sm text-primary dark:text-white'>{event.course}</p>
            </div>
          )}

          {event.lecturer && (
            <div>
              <p className='text-xs font-medium uppercase text-gray-400'>Lecturer</p>

              <p className='mt-1 text-sm text-primary dark:text-white'>{event.lecturer}</p>
            </div>
          )}

          <div>
            <p className='text-xs font-medium uppercase text-gray-400'>Location</p>

            <p className='mt-1 text-sm text-primary dark:text-white'>{event.location}</p>
          </div>

          {event.description && (
            <div>
              <p className='text-xs font-medium uppercase text-gray-400'>Description</p>

              <p className='mt-1 text-sm leading-6 text-secondary dark:text-gray-400'>
                {event.description}
              </p>
            </div>
          )}
        </div>

        <div className='mt-6 flex flex-col-reverse gap-3 border-t border-gray-200 pt-5 dark:border-gray-700 sm:flex-row sm:justify-between'>
          <button type='button' onClick={onClose} className='btn-primary-2'>
            Close
          </button>

          <div className='flex flex-col gap-3 sm:flex-row'>
            {onEdit && (
              <button
                type='button'
                onClick={() => onEdit(event)}
                className='btn-secondary flex gap-2 items-center'
              >
                <LuPencil />
                Edit
              </button>
            )}

            {onDelete && (
              <button
                type='button'
                onClick={() => onDelete(event)}
                className='btn-delete-2 flex gap-2 items-center'
              >
                <LuTrash2 />
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetailsModal
