import { LuSearch } from 'react-icons/lu'

const CourseFilter = ({
  search,
  setSearch,
  selectedDepartment,
  setSelectedDepartment,
  departments,
}) => {
  return (
    <div className='flex w-full flex-col gap-3 sm:flex-row sm:items-center'>
      <div className='relative flex-1 w-full'>
        <LuSearch className='absolute left-3 top-1/2 -translate-y-1/2' />
        <input
          type='search'
          name='search-course'
          id='search-course'
          placeholder='Search courses...'
          value={search}
          onChange={e => setSearch(e.target.value)}
          className='w-full rounded-md border border-gray-300 bg-white py-3 pl-10 pr-4 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white sm:py-2.5 sm:text-sm'
          aria-label='Search courses'
        />
      </div>

      <select
        name='selectDepartment'
        id='selectDepartment'
        value={selectedDepartment}
        onChange={e => setSelectedDepartment(e.target.value)}
        className='w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white sm:w-auto sm:py-2.5 sm:text-sm'
        aria-label='Filter by department'
      >
        <option value='All'>All Departments</option>
        {departments.map(department => (
          <option key={department} value={department}>
            {department}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CourseFilter
