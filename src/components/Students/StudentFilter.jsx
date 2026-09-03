import { BiSearch } from 'react-icons/bi'
import { students } from '../../data/studentsData'

const StudentFilter = ({ search, setSearch, selectedClass, setSelectedClass }) => {
  return (
    <div className='flex flex-col sm:flex-row gap-3'>
      {/* search */}
          <div className='relative flex-1'>
              
        <BiSearch
          size={20}
          className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-black  dark:hover:text-white '
        />

        <input
          type='search'
          placeholder='Search students...'
          value={search}
          onChange={event => setSearch(event.target.value)}
          className='bg-gray-100 text-gray-500 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400 w-[min(16rem,80vw)] rounded py-2 pl-4 pr-8 text-sm'
        />
      </div>

      {/* class Filter  */}

      <select
        value={selectedClass}
        onChange={event => setSelectedClass(event.target.value)}
        className='rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-500 text-sm outline-none focus:border-primary dark:text-white py-2.5 px-4'
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
