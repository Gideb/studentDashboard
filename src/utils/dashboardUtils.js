export const getUpcomingEvents = (events, type, limit = 4) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return events
    .filter(event => {
      if (event.type !== type) return false

      const eventDate = new Date(`${event.date}T00:00:00`)

      return eventDate >= today
    })
    .sort((a, b) => new Date(`${a.date}T00:00:00`) - new Date(`${b.date}T00:00:00`))
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
