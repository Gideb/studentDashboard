import { useEffect, useState } from 'react'
import { courses } from '../data/CoursesData'
import { assignments as assignmentData } from '../data/AssignmentsData'
import { results as resultData } from '../data/ResultsData'
import { calendarEvents } from '../data/CalendarData'
import { getUpcomingEvents, getRecentAssignments } from '../utils/dashboardUtils'
import { GiGraduateCap } from 'react-icons/gi'
import { GrLineChart, GrTask } from 'react-icons/gr'
import { STORAGE_EVENTS } from '../utils/storageEvents'
import useRole from './useRole'

const useDashboard = () => {
  const { role, roleLabel, hasPermission } = useRole()

  const [recentAssignments, setRecentAssignments] = useState([])
  const [upcomingClasses, setUpcomingClasses] = useState([])
  const [recentResults, setRecentResults] = useState([])

  const [dashboardStats, setDashboardStats] = useState([
    {
      Icon: GiGraduateCap,
      title: 'Courses',
      value: 0,
      description: 'Active courses',
    },
    {
      Icon: GrTask,
      title: 'Tasks',
      value: 0,
      description: 'Assignments',
    },
    {
      Icon: GrLineChart,
      title: 'Average',
      value: '0%',
      description: 'Overall average',
    },
  ])

  /*   useEffect(() => {
    const getStoredData = (key, fallbackData) => {
      try {
        const savedData = localStorage.getItem(key)

        if (!savedData) {
          return fallbackData
        }

        const parsedData = JSON.parse(savedData)

        return Array.isArray(parsedData) ? parsedData : fallbackData
      } catch (error) {
        console.error(`Failed to load ${key}:`, error)
        return fallbackData
      }
    }

    

    const storedCourses = getStoredData('courses', courses)
    const storedAssignments = getStoredData('assignments', assignmentData)
    const storedResults = getStoredData('results', resultData)
    const storedCalendarEvents = getStoredData('calendarEvents', calendarEvents)

    const activeCourses = storedCourses.filter(course => course.status === 'Active')

    const pendingAssignments = storedAssignments.filter(
      assignment => assignment.status === 'Pending' || assignment.status === 'In Progress'
    )

    const average =
      storedResults.length > 0
        ? storedResults.reduce((total, result) => total + Number(result.score), 0) /
          storedResults.length
        : 0

    const upcoming = getUpcomingEvents(storedCalendarEvents, 'Class', 4)

    setRecentAssignments(getRecentAssignments(storedAssignments))
    setUpcomingClasses(upcoming)
    setRecentResults(storedResults.slice(0, 5))

    setDashboardStats([
      {
        Icon: GiGraduateCap,
        title: 'Courses',
        value: activeCourses.length,
        description: 'Active courses',
      },
      {
        Icon: GrTask,
        title: 'Tasks',
        value: pendingAssignments.length,
        description: 'Unsubmitted assignments',
      },
      {
        Icon: GrLineChart,
        title: 'Average',
        value: `${average.toFixed(1)}%`,
        description: 'Overall average',
      },
    ])
  }, [])
 */

  useEffect(() => {
    const loadDashboardData = () => {
      const getStoredData = (key, fallbackData) => {
        try {
          const savedData = localStorage.getItem(key)

          if (!savedData) {
            return fallbackData
          }

          const parsedData = JSON.parse(savedData)

          return Array.isArray(parsedData) ? parsedData : fallbackData
        } catch (error) {
          console.error(`Failed to load ${key}:`, error)
          return fallbackData
        }
      }

      const storedCourses = getStoredData('courses', courses)
      const storedAssignments = getStoredData('assignments', assignmentData)
      const storedResults = getStoredData('results', resultData)
      const storedCalendarEvents = getStoredData('calendarEvents', calendarEvents)

      const activeCourses = storedCourses.filter(course => course.status === 'Active')

      const pendingAssignments = storedAssignments.filter(
        assignment => assignment.status === 'Pending' || assignment.status === 'In Progress'
      )

      const average =
        storedResults.length > 0
          ? storedResults.reduce((total, result) => total + Number(result.score), 0) /
            storedResults.length
          : 0

      setRecentAssignments(getRecentAssignments(storedAssignments))

      setUpcomingClasses(getUpcomingEvents(storedCalendarEvents, 'Class'))

      setRecentResults(storedResults.slice(0, 5))

      setDashboardStats([
        {
          Icon: GiGraduateCap,
          title: 'Courses',
          value: activeCourses.length,
          description: 'Active courses',
        },
        {
          Icon: GrTask,
          title: 'Tasks',
          value: pendingAssignments.length,
          description: 'Unsubmitted assignments',
        },
        {
          Icon: GrLineChart,
          title: 'Average',
          value: `${average.toFixed(1)}%`,
          description: 'Overall average',
        },
      ])
    }

    loadDashboardData()

    const handleCourseUpdate = () => loadDashboardData()
    const handleCalendarUpdate = () => loadDashboardData()
    const handleAssignmentUpdate = () => loadDashboardData()
    const handleResultUpdate = () => loadDashboardData()

    window.addEventListener(STORAGE_EVENTS.COURSES_UPDATED, handleCourseUpdate)

    window.addEventListener(STORAGE_EVENTS.CALENDAR_UPDATED, handleCalendarUpdate)

    window.addEventListener(STORAGE_EVENTS.ASSIGNMENTS_UPDATED, handleAssignmentUpdate)

    window.addEventListener(STORAGE_EVENTS.RESULTS_UPDATED, handleResultUpdate)

    return () => {
      window.removeEventListener(STORAGE_EVENTS.COURSES_UPDATED, handleCourseUpdate)

      window.removeEventListener(STORAGE_EVENTS.CALENDAR_UPDATED, handleCalendarUpdate)

      window.removeEventListener(STORAGE_EVENTS.ASSIGNMENTS_UPDATED, handleAssignmentUpdate)

      window.removeEventListener(STORAGE_EVENTS.RESULTS_UPDATED, handleResultUpdate)
    }
  }, [])

  return {
    dashboardStats,
    recentAssignments,
    upcomingClasses,
    recentResults,
    role,
    roleLabel,
    hasPermission,
  }
}

export default useDashboard
