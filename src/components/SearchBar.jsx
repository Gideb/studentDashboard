import { useEffect, useRef, useState } from 'react'
import { BiSearch } from 'react-icons/bi'

const SearchBar = () => {
  const [openSearch, setOpenSearch] = useState(false)
  const searchInputRef = useRef(null)

  useEffect(() => {
    const handleOutsideClick = event => {
      if (!searchInputRef.current?.contains(event.target)) {
        setOpenSearch(false)
      }
    }

    document.addEventListener('click', handleOutsideClick)

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  })

  return (
    <>
      <div className='hidden relative sm:flex items-center' ref={searchInputRef}>
        <input
          type='text'
          placeholder='Search...'
          className='w-64 rounded-md border border-gray-200 bg-gray-100 py-2 pl-4 pr-10 text-sm outline-none focus:border-teal-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white'
        />

        <BiSearch className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-200' />
      </div>

      {/* mobile search button */}
      <div className='relative flex items-center sm:hidden' ref={searchInputRef}>
        <BiSearch
          size={21}
          onClick={() => setOpenSearch(prev => !prev)}
          className='cursor-pointer text-gray-500'
        />

        {openSearch && (
          <>
          <input
            type='text'
            placeholder='Search...'
            autoFocus
            className='absolute -left-24 top-8 w-64 rounded-md border border-gray-200 bg-gray-100 py-2 pl-4 pr-10 text-sm outline-none focus:border-teal-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white'
          />
          <BiSearch size={21} className='absolute -right-32 top-13 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-200' />
          </>
        )}
      </div>
    </>
  )
}

export default SearchBar
