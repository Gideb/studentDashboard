import { getEventStyle, formatLongEventDate } from '../../utils/calendarUtils'

const EventDetailsModal = ({ event, onClose }) => {
  if (!event) return null

  /*   const getEventStyle = type => {
    switch (type) {
      case 'Class':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400'

      case 'Exam':
        return 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'

      case 'Deadline':
        return 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400'

      case 'Meeting':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400'

      case 'Event':
        return 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400'

      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  const formatEventDate = date => {
    return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  } */

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

        <div className='mt-6 flex justify-end'>
          <button
            type='button'
            onClick={onClose}
            className='btn-primary-2'
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default EventDetailsModal
