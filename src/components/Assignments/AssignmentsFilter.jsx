import { LuSearch, LuX } from 'react-icons/lu'

const AssignmentsFilter = ({
  search,
  setSearch,
  selectedCourse,
  setSelectedCourse,
  selectedStatus,
  setSelectedStatus,
  uniqueCourses,
  uniqueStatus,
  hasActiveFilters,
  clearFilters,
}) => {
  return (
    <div className='rounded-md border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-slate-900'>
      <div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
        {/* Search */}
        <div className='relative w-full lg:max-w-md'>
          <LuSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />

          <input
            type='text'
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder='Search assignments...'
            className='w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-primary dark:border-gray-700 dark:bg-slate-800 dark:text-white'
          />
        </div>

        {/* Filters */}
        <div className='flex flex-col gap-3 sm:flex-row'>
          {/* Course */}
          <select
            value={selectedCourse}
            onChange={e => setSelectedCourse(e.target.value)}
            className='rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-primary dark:border-gray-700 dark:bg-slate-800 dark:text-white'
          >
            <option value='All'>All Courses</option>

            {uniqueCourses.map(course => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>

          {/* Status */}
          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className='rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-primary dark:border-gray-700 dark:bg-slate-800 dark:text-white'
          >
            <option value='All'>All Status</option>

            {uniqueStatus.map(status => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              type='button'
              onClick={clearFilters}
              className='flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-medium text-secondary transition hover:bg-gray-50 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-white'
            >
              <LuX />
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default AssignmentsFilter
