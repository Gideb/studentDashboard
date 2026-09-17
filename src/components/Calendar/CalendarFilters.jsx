const CalendarFilters = ({
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
}) => {
  return (
    <div className='rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-slate-900'>
      <div className='flex flex-col gap-3 lg:flex-row lg:items-center'>
        <select
          value={selectedType}
          onChange={e => setSelectedType(e.target.value)}
          className='rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-primary outline-none focus:border-primary dark:border-gray-700 dark:bg-slate-800 dark:text-white'
        >
          <option value='All'>All Event Types</option>

          {uniqueTypes.map(type => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          value={selectedCourse}
          onChange={e => setSelectedCourse(e.target.value)}
          className='rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-primary outline-none focus:border-primary dark:border-gray-700 dark:bg-slate-800 dark:text-white'
        >
          <option value='All'>All Courses</option>

          {uniqueCourses.map(course => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </select>

        <input
          type='date'
          value={selectedDate}
          onChange={e => setSelectedDate(e.target.value)}
          className='rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-primary outline-none focus:border-primary dark:border-gray-700 dark:bg-slate-800 dark:text-white'
        />

        {hasActiveFilters && (
          <button
            type='button'
            onClick={clearFilters}
            className='rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-secondary transition hover:bg-gray-50 hover:text-primary dark:border-gray-700 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-white'
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  )
}

export default CalendarFilters
