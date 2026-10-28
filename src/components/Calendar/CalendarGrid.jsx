import { LuChevronLeft, LuChevronRight } from 'react-icons/lu'
import { getEventStyle } from '../../utils/calendarUtils'

const CalendarGrid = ({
  currentDate,
  setCurrentDate,
  eventList,
  selectedType,
  selectedCourse,
  onEventClick,
}) => {
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const monthName = currentDate.toLocaleString('default', {
    month: 'long',
  })

  const today = new Date()

  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const firstDayOfMonth = new Date(year, month, 1).getDay()

  const calendarDays = []

  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null)
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const getDateString = day => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }

  const getEventsForDay = day => {
    if (!day) return []

    const dateString = getDateString(day)

    return eventList.filter(event => {
      const matchesDate = event.date === dateString

      const matchesType = selectedType === 'All' || event.type === selectedType

      const matchesCourse = selectedCourse === 'All' || event.course === selectedCourse

      return matchesDate && matchesType && matchesCourse
    })
  }

  const isToday = day => {
    if (!day) return false

    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear()
  }

 /*  const getEventStyle = type => {
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

  return (
    <div className='overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-slate-900'>
      {/* Calendar Header */}
      <div className='flex items-center justify-between border-b border-gray-200 px-4 py-4 dark:border-gray-700'>
        <button
          type='button'
          onClick={previousMonth}
          className='rounded-lg p-2 text-secondary transition hover:bg-gray-100 hover:text-primary dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-white'
        >
          <LuChevronLeft size={20} />
        </button>

        <h2 className='text-lg font-semibold text-primary dark:text-white'>
          {monthName} {year}
        </h2>

        <button
          type='button'
          onClick={nextMonth}
          className='rounded-lg p-2 text-secondary transition hover:bg-gray-100 hover:text-primary dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-white'
        >
          <LuChevronRight size={20} />
        </button>
      </div>

      {/* Week Days */}
      <div className='grid grid-cols-7 border-b border-gray-200 dark:border-gray-700'>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div
            key={day}
            className='border-r border-gray-200 px-2 py-3 text-center text-xs font-semibold text-secondary last:border-r-0 dark:border-gray-700 dark:text-gray-400'
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className='grid grid-cols-7'>
        {calendarDays.map((day, index) => {
          const dayEvents = getEventsForDay(day)

          return (
            <div
              key={`${day}-${index}`}
              className='min-h-[110px] border-b border-r border-gray-200 p-2 last:border-r-0 dark:border-gray-700 sm:min-h-[130px]'
            >
              {day && (
                <>
                  <div className='mb-2 flex justify-end'>
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium ${
                        isToday(day) ? 'bg-primary text-white' : 'text-secondary dark:text-gray-400'
                      }`}
                    >
                      {day}
                    </span>
                  </div>

                  <div className='space-y-1'>
                    {dayEvents.slice(0, 3).map(event => (
                      <button
                        key={event.id}
                        type='button'
                        onClick={() => onEventClick(event)}
                        className={`w-full truncate rounded-md px-2 py-1 text-left text-[11px] font-medium transition hover:opacity-80 ${getEventStyle(
                          event.type
                        )}`}
                      >
                        {event.startTime} {event.title}
                      </button>
                    ))}

                    {dayEvents.length > 3 && (
                      <button
                        type='button'
                        onClick={() => onEventClick(dayEvents[3])}
                        className='text-xs font-medium text-primary hover:underline dark:text-white'
                      >
                        +{dayEvents.length - 3} more
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CalendarGrid
