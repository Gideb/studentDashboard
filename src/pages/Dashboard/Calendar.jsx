import { useMemo, useState } from 'react'
import { LuCalendarDays } from 'react-icons/lu'
import DashboardLayout from '../../layouts/DashboardLayout'
import useCalendar from '../../hooks/useCalendar'
import CalendarFilters from '../../components/Calendar/CalendarFilters'
import CalendarGrid from '../../components/Calendar/CalendarGrid'
import UpcomingEvents from '../../components/Calendar/UpcomingEvents'
import EventDetailsModal from '../../components/Calendar/EventDetailsModal'

const Calendar = () => {
  const {
    eventList,
    selectedType,
    setSelectedType,
    selectedCourse,
    setSelectedCourse,
    selectedDate,
    setSelectedDate,
    uniqueTypes,
    uniqueCourses,
    hasActiveFilters,
    clearFilters,
  } = useCalendar()

  const [currentDate, setCurrentDate] = useState(new Date())

  const [selectedEvent, setSelectedEvent] = useState(null)

  const upcomingEvents = useMemo(() => {
    const todayString = new Date().toISOString().split('T')[0]

    return eventList
      .filter(event => {
        const matchesType = selectedType === 'All' || event.type === selectedType

        const matchesCourse = selectedCourse === 'All' || event.course === selectedCourse

        const matchesDate = !selectedDate || event.date === selectedDate

        return event.date >= todayString && matchesType && matchesCourse && matchesDate
      })
      .sort((a, b) => `${a.date} ${a.startTime}`.localeCompare(`${b.date} ${b.startTime}`))
      .slice(0, 5)
  }, [eventList, selectedType, selectedCourse, selectedDate])

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  return (
    <DashboardLayout activeMenu="Calendar">
      <div className='space-y-6 my-5 mx-auto w-full min-w-0 px-3 sm:px-6 py-5 sm:py-8'>
        {/* Page Header */}
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h1 className='text-2xl font-semibold text-primary dark:text-dark'>Calendar</h1>

            <p className='mt-1 text-sm text-secondary dark:text-gray-400'>
              View classes, exams, deadlines and other important events.
            </p>
          </div>

          <button
            type='button'
            onClick={goToToday}
            className='add-btn flex gap-2 items-center'
          >
            <LuCalendarDays />
            Today
          </button>
        </div>

        {/* Filters */}
        <CalendarFilters
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          uniqueTypes={uniqueTypes}
          uniqueCourses={uniqueCourses}
          hasActiveFilters={hasActiveFilters}
          clearFilters={clearFilters}
        />

        {/* Calendar + Upcoming Events */}
        <div className='grid gap-6 xl:grid-cols-[1fr_320px]'>
          <CalendarGrid
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            eventList={eventList}
            selectedType={selectedType}
            selectedCourse={selectedCourse}
            onEventClick={setSelectedEvent}
          />

          <UpcomingEvents events={upcomingEvents} onEventClick={setSelectedEvent} />
        </div>

        {/* Event Details */}
        <EventDetailsModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      </div>
    </DashboardLayout>
  )
}

export default Calendar
