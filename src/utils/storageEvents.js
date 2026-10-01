export const STORAGE_EVENTS = {
  CALENDAR_UPDATED: 'calendarEventsUpdated',
  ASSIGNMENTS_UPDATED: 'assignmentsUpdated',
  RESULTS_UPDATED: 'resultsUpdated',
}

export const notifyStorageChange = eventName => {
  window.dispatchEvent(new Event(eventName))
}
