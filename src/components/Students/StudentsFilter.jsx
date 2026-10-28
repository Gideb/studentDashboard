import { LuSearch } from 'react-icons/lu'

const StudentsFilter = ({
  search,
  setSearch,
  selectedDepartment,
  setSelectedDepartment,
  selectedLevel,
  setSelectedLevel,
  selectedStatus,
  setSelectedStatus,
  departments,
  levels,
  statuses,
  hasActiveFilters,
  clearFilters,
}) => {
  return (
    <div className='flex w-full flex-col gap-3 sm:flex-row sm:items-center'>
      {/* Search */}
      <div className='relative w-full'>
        <LuSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500' />

        <input
          type='search'
          name='search-student'
          id='search-student'
          placeholder='Student Id or Student name...'
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label='Search students'
          className='w-full rounded-md border border-gray-300 bg-white py-3 pl-10 pr-4 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white sm:py-2.5 sm:text-sm'
        />
      </div>

      {/* Filters */}
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
        <select
          value={selectedDepartment}
          onChange={e => setSelectedDepartment(e.target.value)}
          aria-label='Filter by department'
          className='w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white sm:w-auto sm:py-2.5 sm:text-sm'
        >
          <option value='All'>All Departments</option>

          {departments.map(department => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>

        <select
          value={selectedLevel}
          onChange={e => setSelectedLevel(e.target.value)}
          aria-label='Filter by level'
          className='w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white sm:w-auto sm:py-2.5 sm:text-sm'
        >
          <option value='All'>All Levels</option>

          {levels.map(level => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>

        <select
          value={selectedStatus}
          onChange={e => setSelectedStatus(e.target.value)}
          aria-label='Filter by status'
          className='w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white sm:w-auto sm:py-2.5 sm:text-sm'
        >
          <option value='All'>All Statuses</option>

          {statuses.map(status => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        {hasActiveFilters && (
          <button
            type='button'
            onClick={clearFilters}
            className='whitespace-nowrap text-sm font-medium text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white'
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  )
}

export default StudentsFilter
