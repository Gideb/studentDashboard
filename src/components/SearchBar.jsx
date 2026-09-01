import { BiSearch } from 'react-icons/bi'

const SearchBar = () => {
  return (
    <div className='relative flex items-center'>
      <input
        type='text'
        placeholder='Search...'
        className='w-64 rounded-md border border-gray-200 bg-gray-100 py-2 pl-4 pr-10 text-sm outline-none focus:border-teal-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white'
      />

      <BiSearch className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500' />
    </div>
  )
}

export default SearchBar
