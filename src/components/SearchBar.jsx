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
  }, [])

  return (
    <div ref={searchInputRef} className='relative flex items-center'>
      {/* SEARCH ICON */}
      <BiSearch
        size={21}
        onClick={() => setOpenSearch(prev => !prev)}
        className='cursor-pointer text-gray-500 dark:text-gray-200'
      />

      {/* SEARCH INPUT */}
      {openSearch && (
        <div className='absolute top-8 -right-32 z-50 flex items-center'>
          <input
            type='search'
            placeholder='Search...'
            autoFocus
            className='w-[min(16rem,80vw)] rounded-md py-2 pl-4 pr-10 text-sm bg-gray-100 text-gray-500 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-dark dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400'
          />

          <BiSearch size={21} className='absolute right-3 text-gray-500' />
        </div>
      )}
    </div>
  )
}

export default SearchBar
