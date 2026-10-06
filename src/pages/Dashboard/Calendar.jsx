import { useMemo, useState } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import useCalendar from '../../hooks/useCalendar'
import CalendarFilters from '../../components/Calendar/CalendarFilters'
import CalendarGrid from '../../components/Calendar/CalendarGrid'
import UpcomingEvents from '../../components/Calendar/UpcomingEvents'
import EventDetailsModal from '../../components/Calendar/EventDetailsModal'
import AddEditEventModal from '../../components/Calendar/AddEditEventModal'
import { LuCalendarDays, LuPlus } from 'react-icons/lu'
import toast from 'react-hot-toast'
import DeleteEventModal from '../../components/Calendar/DeleteEventModal'
import useRole from '../../hooks/useRole'

const Calendar = () => {
  const { hasPermission } = useRole()

  const canCreateEvent = hasPermission('calendarCreate')
  const canEditEvent = hasPermission('calendarEdit')
  const canDeleteEvent = hasPermission('calendarDelete')

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
    addEvent,
    updateEvent,
    deleteEvent,
  } = useCalendar()

  const [isEventModalOpen, setIsEventModalOpen] = useState(false)
  const [eventToEdit, setEventToEdit] = useState(null)
  const [eventToDelete, setEventToDelete] = useState(null)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState(null)

  const handleAddEvent = () => {
    setEventToEdit(null)
    setIsEventModalOpen(true)
  }

  const handleEditEvent = event => {
    setEventToEdit(event)
    setSelectedEvent(null)
    setIsEventModalOpen(true)
  }

  const handleDeleteEvent = event => {
    setEventToDelete(event)
    setSelectedEvent(null)
  }

  const confirmDeleteEvent = () => {
    if (!eventToDelete) {
      return
    }

    deleteEvent(eventToDelete.id)
    setEventToDelete(null)
    toast.success('Event deleted successfully!')
  }

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
    <DashboardLayout activeMenu='Calendar'>
      <div className='space-y-6 my-5 mx-auto w-full min-w-0 px-3 sm:px-6 py-5 sm:py-8'>
        {/* Page Header */}
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h1 className='text-2xl font-semibold text-primary dark:text-dark'>Calendar</h1>

            <p className='mt-1 text-sm text-secondary dark:text-gray-400'>
              View classes, exams, deadlines and other important events.
            </p>
          </div>

          <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
            <button
              type='button'
              onClick={goToToday}
              className='add-btn flex items-center justify-center gap-2'
            >
              <LuCalendarDays />
              Today
            </button>

            {canCreateEvent && (
              <button
                type='button'
                onClick={handleAddEvent}
                className='add-btn flex items-center justify-center gap-2'
              >
                <LuPlus />
                Add Event
              </button>
            )}
          </div>
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

        <EventDetailsModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}

          onEdit={canEditEvent ? handleEditEvent : undefined}
          onDelete={canDeleteEvent ? handleDeleteEvent : undefined}
        />

        {/* add / edit event modal */}
        <AddEditEventModal
          isOpen={isEventModalOpen}
          onClose={() => {
            setIsEventModalOpen(false)
            setEventToEdit(null)
          }}
          onAdd={eventToEdit ? updateEvent : addEvent}
          event={eventToEdit}
          mode={eventToEdit ? 'edit' : 'add'}
        />

        {canDeleteEvent && eventToDelete && (
          <DeleteEventModal
            onClose={() => setEventToDelete(null)}
            eventToDelete={eventToDelete}
            confirmDeleteEvent={confirmDeleteEvent}
          />
        )}
      </div>
    </DashboardLayout>
  )
}

export default Calendar
