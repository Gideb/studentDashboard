import ProfileInfoCard from '../components/Cards/ProfileInfoCard'
import SearchBar from '../components/SearchBar'
import { useTheme } from '../context/ThemeContext'
import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { PiSidebarSimpleDuotone } from 'react-icons/pi'
import smd_logo from '../assets/images/smd-logo.png'
import smd_logo_dark from '../assets/images/smd-logo-dark.png'
import { useState } from 'react'

const Navbar = ({ toggleMobileMenu }) => {
  const [logoHover, setLogoHover] = useState(false)
  const { darkMode, toggleDarkMode } = useTheme()

  return (
    <div className='sticky top-0 z-40 w-full py-4 px-5 md:px-10 bg-slate-50 dark:bg-slate-950 border-b border-gray-300 dark:border-gray-700'>
      <div className='max-w-8xl flex justify-between md:justify-end gap-5 items-center'>
        {/* MOBILE LOGO + MENU BUTTON */}
        <div
          className='flex justify-center md:hidden'
          onMouseEnter={() => setLogoHover(true)}
          onMouseLeave={() => setLogoHover(false)}
        >
          {logoHover ? (
            <button type='button' onClick={toggleMobileMenu} aria-label='open side menu'>
              <PiSidebarSimpleDuotone className='text-3xl text-primary dark:text-dark cursor-pointer' />
            </button>
          ) : (
            <img src={darkMode ? smd_logo_dark : smd_logo} alt='SMD logo' className='w-11' />
          )}
        </div>

        {/* SEARCH */}
        <div>
          <SearchBar />
        </div>

        {/* PROFILE + DARK MODE */}
        <div className='flex items-center gap-3'>
          <ProfileInfoCard />

          <button
            onClick={toggleDarkMode}
            className='rounded-md bg-gray-100 dark:bg-gray-800 px-2 sm:px-3 py-2 cursor-pointer'
          >
            {darkMode ? (
              <MdLightMode className='text-slate-900 dark:text-slate-100' />
            ) : (
              <MdDarkMode className='text-slate-900 dark:text-slate-100' />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
