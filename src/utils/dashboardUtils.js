export const getUpcomingEvents = (events, type, limit = 4) => {
  const now = new Date()

  return events
    .filter(event => {
      if (event.type !== type) return false

      const eventDateTime = new Date(`${event.date}T${event.startTime}:00`)

      return eventDateTime >= now
    })
    .sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.startTime}:00`)
      const dateB = new Date(`${b.date}T${b.startTime}:00`)

      return dateA - dateB
    })
    .slice(0, limit)
}

export const getRecentAssignments = (assignments, limit = 4) => {
  return [...assignments]
    .sort((a, b) => new Date(`${b.dueDate}T00:00:00`) - new Date(`${a.dueDate}T00:00:00`))
    .slice(0, limit)
}

export const formatDashboardDate = date => {
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}
