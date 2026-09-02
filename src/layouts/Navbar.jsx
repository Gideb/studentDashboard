import smd_logo from '../assets/images/smd-logo.png'
import smd_logo_dark from '../assets/images/smd-logo-dark.png'
import ProfileInfoCard from '../components/Cards/ProfileInfoCard'
import SearchBar from '../components/SearchBar'
import { useTheme } from '../context/ThemeContext'
import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { PiSidebarSimpleDuotone } from 'react-icons/pi'

const Navbar = ({ openSideMenu, toggleSideMenu }) => {
  const { darkMode, toggleDarkMode } = useTheme()

  return (
    <div className='sticky top-0 z-40 w-full py-4 px-5 md:px-10 bg-slate-50 dark:bg-slate-950 border-b border-gray-300 dark:border-gray-700'>
      <div className='max-w-8xl flex justify-between gap-5 items-center'>
        <div className='flex  items-center gap-5'>
           
          {/* logo */}
          <img src={darkMode ? smd_logo_dark : smd_logo} alt='smd logo' className='w-15' />
          
          {/* menu bar */}
          <button className='md:hidden' type='button' onClick={toggleSideMenu} aria-expanded={openSideMenu} aria-label='Toggle Side Menu'>
            <PiSidebarSimpleDuotone
            className='text-2xl transition-colors duration-300 text-primary dark:text-dark dark:hover:text-dark/80 hover:text-primary/80 font-bold cursor-pointer '
            />
          </button>

          
         
        </div>

        <div className=''>
          <SearchBar />
        </div>

        <div className='flex flex-col sm:flex-row items-center gap-3 justify-between'>
          <ProfileInfoCard />

          <button
            onClick={toggleDarkMode}
            className='rounded-md bg-gray-100 dark:bg-gray-800 px-2 sm:px-3 py-2 cursor-pointer '
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
