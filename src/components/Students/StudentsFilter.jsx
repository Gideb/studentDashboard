import { LuSearch } from 'react-icons/lu'
import useStudents from '../../hooks/useStudents'

const StudentsFilter = () => {
  const {
    search,
    setSearch,

    selectedDepartment,
    setSelectedDepartment,

    selectedLevel,
    setSelectedLevel,

    selectedStatus,
    setSelectedStatus,

    hasActiveFilters,
    clearFilters,

    sortBy,
    setSortBy,

    sortOrder,
    setSortOrder,

    uniqueDepartments,
    uniqueLevels,
    uniqueStatus,
  } = useStudents()
  return (
    <section className='flex flex-col gap-3'>
      <div className='relative'>
        <input
          type='search'
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder='Search students...'
          aria-label='Search students'
          className='w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white'
        />
      </div>

      <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
        <select
          value={selectedDepartment}
          onChange={e => setSelectedDepartment(e.target.value)}
          className='w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white sm:w-auto'
          aria-label='Filter by department'
        >
          <option value='All'>All Departments</option>

          {uniqueDepartments.map(department => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>

        <select
          value={selectedLevel}
          onChange={e => setSelectedLevel(e.target.value)}
          className='w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white sm:w-auto'
          aria-label='Filter by level'
        >
          <option value='All'>All Levels</option>

          {uniqueLevels.map(level => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>

        <select
          value={selectedStatus}
          onChange={e => setSelectedStatus(e.target.value)}
          className='w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white sm:w-auto'
          aria-label='Filter by status'
        >
          <option value='All'>All Statuses</option>

          {uniqueStatus.map(status => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className='w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white sm:w-auto'
          aria-label='Sort students by'
        >
          <option value='name'>Name</option>
          <option value='studentId'>Student ID</option>
          <option value='department'>Department</option>
          <option value='level'>Level</option>
          <option value='status'>Status</option>
        </select>

        <button
          type='button'
          onClick={() => setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))}
          className='rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white'
          aria-label={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
        >
          {sortOrder === 'asc' ? '↑' : '↓'}
        </button>

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
    </section>
  )
}

export default StudentsFilter
