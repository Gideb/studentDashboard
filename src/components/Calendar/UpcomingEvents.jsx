import { getEventStyle, formatShortEventDate } from '../../utils/calendarUtils'

const UpcomingEvents = ({ events, onEventClick }) => {
  /* const getEventStyle = type => {
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
  } */

  /*  const formatEventDate = date => {
    return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    })
  } */

  return (
    <div className='rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-slate-900'>
      <div className='border-b border-gray-200 px-4 py-4 dark:border-gray-700'>
        <h2 className='font-semibold text-primary dark:text-dark'>Upcoming Events</h2>

        <p className='mt-1 text-xs text-secondary dark:text-gray-400'>Your next scheduled events</p>
      </div>

      <div className='divide-y divide-gray-200 dark:divide-gray-700'>
        {events.length > 0 ? (
          events.map(event => (
            <button
              key={event.id}
              type='button'
              onClick={() => onEventClick(event)}
              className='w-full px-4 py-4 text-left transition hover:bg-gray-50 dark:hover:bg-slate-800'
            >
              <div className='flex items-start gap-3'>
                <div className='mt-1 h-2 w-2 shrink-0 rounded-full bg-primary' />

                <div className='min-w-0'>
                  <p className='truncate text-sm font-medium text-primary dark:text-white'>
                    {event.title}
                  </p>

                  <p className='mt-1 text-xs text-secondary dark:text-gray-400'>
                    {formatShortEventDate(event.date)} • {event.startTime}
                  </p>

                  <span
                    className={`mt-2 inline-block rounded-full px-2 py-1 text-[10px] font-medium ${getEventStyle(
                      event.type
                    )}`}
                  >
                    {event.type}
                  </span>
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className='px-4 py-8 text-center text-sm text-secondary dark:text-gray-400'>
            No upcoming events found.
          </div>
        )}
      </div>
    </div>
  )
}

export default UpcomingEvents
