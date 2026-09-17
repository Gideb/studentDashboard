import { useEffect, useState } from 'react'
import { calendarEvents } from '../data/CalendarData'
import { generateId } from '../utils/generateId'
import useTableControls from './useTableControls'

const CALENDAR_STORAGE_KEY = 'calendarEvents'

const useCalendar = () => {
  const [eventList, setEventList] = useState(() => {
    try {
      const savedEvents = localStorage.getItem(CALENDAR_STORAGE_KEY)

      return savedEvents ? JSON.parse(savedEvents) : calendarEvents
    } catch (error) {
      console.error('Failed to load calendar events from localStorage:', error)

      return calendarEvents
    }
  })

  const [selectedType, setSelectedType] = useState('All')
  const [selectedCourse, setSelectedCourse] = useState('All')
  const [selectedDate, setSelectedDate] = useState('')

  useEffect(() => {
    localStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(eventList))
  }, [eventList])

  // Unique filter values
  const uniqueTypes = [...new Set(eventList.map(event => event.type))]

  const uniqueCourses = [...new Set(eventList.map(event => event.course).filter(Boolean))]

  // Apply filters
  const eventFilteredData = eventList.filter(event => {
    const matchesType = selectedType === 'All' || event.type === selectedType

    const matchesCourse = selectedCourse === 'All' || event.course === selectedCourse

    const matchesDate = !selectedDate || event.date === selectedDate

    return matchesType && matchesCourse && matchesDate
  })

  // Search, sorting and pagination
  const {
    search,
    setSearch,
    filteredData: filteredEvents,
    sortedData: sortedEvents,
    paginatedData: paginatedEvents,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    currentPage,
    setCurrentPage,
    itemsPerPage: eventsPerPage,
    totalPages,
    startIndex,
    endIndex,
    pageNumbers,
  } = useTableControls({
    data: eventFilteredData,
    searchableFields: ['title', 'eventId', 'course', 'lecturer', 'location', 'type'],
    itemsPerPage: 5,
    resetDependencies: [selectedType, selectedCourse, selectedDate],
  })

  const hasActiveFilters =
    search.trim() !== '' ||
    selectedType !== 'All' ||
    selectedCourse !== 'All' ||
    selectedDate !== ''

  // Add event
  const addEvent = newEvent => {
    const newId = generateId(eventList)

    const newEventId = `EVT-${String(newId).padStart(3, '0')}`

    const eventToAdd = {
      id: newId,
      eventId: newEventId,
      title: newEvent.title,
      type: newEvent.type,
      course: newEvent.course || '',
      lecturer: newEvent.lecturer || '',
      date: newEvent.date,
      startTime: newEvent.startTime,
      endTime: newEvent.endTime,
      location: newEvent.location,
      description: newEvent.description || '',
    }

    setEventList(prev => [...prev, eventToAdd])
  }

  // Update event
  const updateEvent = updatedEvent => {
    setEventList(prev =>
      prev.map(event =>
        event.id === updatedEvent.id
          ? {
              ...event,
              ...updatedEvent,
            }
          : event
      )
    )
  }

  // Delete event
  const deleteEvent = eventId => {
    setEventList(prev => prev.filter(event => event.id !== eventId))
  }

  // Clear filters
  const clearFilters = () => {
    setSearch('')
    setSelectedType('All')
    setSelectedCourse('All')
    setSelectedDate('')
  }

  return {
    eventList,

    // Data
    filteredEvents,
    sortedEvents,
    paginatedEvents,

    // Search
    search,
    setSearch,

    // Filters
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

    // Sorting
    sortBy,
    setSortBy,

    sortOrder,
    setSortOrder,

    // Pagination
    currentPage,
    setCurrentPage,
    eventsPerPage,
    totalPages,
    startIndex,
    endIndex,
    pageNumbers,

    // CRUD
    addEvent,
    updateEvent,
    deleteEvent,
  }
}

export default useCalendar
