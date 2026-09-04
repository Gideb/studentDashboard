import { BiSearch } from 'react-icons/bi'
import { students } from '../../data/studentsData'

const StudentFilter = ({ search, setSearch, selectedClass, setSelectedClass }) => {
  return (
    <div className='flex w-full flex-col gap-3 sm:flex-row sm:items-center'>
      {/* search */}
      <div className='relative w-full flex-1 '>
        <BiSearch size={20} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />

        <input
          type='search'
          placeholder='Search student...'
          value={search}
          onChange={event => setSearch(event.target.value)}
          className='w-full rounded-md border border-gray-300 bg-white py-3 pl-10 pr-4 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white sm:py-2.5 sm:text-sm'
          aria-label='Search students'
        />
      </div>

      {/* CLASS FILTER */}
      <select
        value={selectedClass}
        onChange={event => setSelectedClass(event.target.value)}
        className='w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white sm:w-auto sm:py-2.5 sm:text-sm'
        aria-label='Filter by class'
      >
        <option value='All'>All classes</option>
        {[...new Set(students.map(student => student.class))].map(className => (
          <option key={className} value={className}>
            {className}
          </option>
        ))}
      </select>
    </div>
  )
}

export default StudentFilter
