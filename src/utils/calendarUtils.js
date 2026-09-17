export const getEventStyle = type => {
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
}

export const formatEventDate = (date, options = {}) => {
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', options)
}

export const formatShortEventDate = date => {
  return formatEventDate(date, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

export const formatLongEventDate = date => {
  return formatEventDate(date, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}
