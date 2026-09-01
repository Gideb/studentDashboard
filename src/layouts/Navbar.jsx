import React from 'react'
import smd_logo from '../assets/images/smd-logo.png'
import smd_logo_dark from '../assets/images/smd-logo-dark.png'
import ProfileInfoCard from '../components/Cards/ProfileInfoCard'
import SearchBar from '../components/SearchBar'
import { useTheme } from '../context/ThemeContext'
import { MdDarkMode, MdLightMode } from 'react-icons/md'

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme()

  return (
    <div className='w-full py-4 px-5 md:px-10  bg-slate-50 dark:bg-slate-950'>
      <div className='max-w-8xl flex justify-between gap-10 items-center'>
        {/* logo */}
        <img src={darkMode ? smd_logo_dark : smd_logo} alt='smd logo' className='w-13' />

        <div className=''>
          <SearchBar />
        </div>

        <div className='flex items-center gap-3 justify-between'>
          <ProfileInfoCard />

          <button
            onClick={toggleDarkMode}
            className='rounded-md bg-gray-100 dark:bg-gray-800 px-3 py-2 cursor-pointer '
          >
            {darkMode ? (
              <MdDarkMode className='text-slate-900 dark:text-slate-100' />
            ) : (
              <MdLightMode className='text-slate-900 dark:text-slate-100' />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
