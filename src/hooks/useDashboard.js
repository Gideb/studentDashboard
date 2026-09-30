import { useEffect, useState } from 'react'
import { courses } from '../data/CoursesData'
import { assignments as assignmentData } from '../data/AssignmentsData'
import { results as resultData } from '../data/ResultsData'
import { calendarEvents } from '../data/CalendarData'
import { getUpcomingEvents, getRecentAssignments } from '../utils/dashboardUtils'
import { GiGraduateCap } from 'react-icons/gi'
import { GrLineChart, GrTask } from 'react-icons/gr'

const useDashboard = () => {
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

  useEffect(() => {
    const getStoredData = (key, fallbackData) => {
      try {
        const savedData = localStorage.getItem(key)

        return savedData ? JSON.parse(savedData) : fallbackData
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
  }, [])

  return {
    dashboardStats,
    recentAssignments,
    upcomingClasses,
    recentResults,
  }
}

export default useDashboard
