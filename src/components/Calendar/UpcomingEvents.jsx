import { getEventStyle, formatShortEventDate } from '../../utils/calendarUtils'

const UpcomingEvents = ({ events, onEventClick }) => {
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
