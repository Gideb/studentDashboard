//import { UserContext } from '../context/UserContext'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { useState } from 'react'

const DashboardLayout = ({ children, activeMenu }) => {
  /* const { user } = useContext(UserContext) */

  const [openSideMenu, setOpenSideMenu] = useState(true)

  const toggleSideMenu = () => {
    setOpenSideMenu(prev => !prev)
  }

  return (
    <div className='min-h-screen dark:bg-secondary dark:text-gray-300'>
      <Navbar activeMenu={activeMenu} openSideMenu={openSideMenu} toggleSideMenu={toggleSideMenu} />

      <div className='flex '>
        {/* sidebar */}
        <div
          className={`fixed left-0 top-19 z-50 h-[calc(100vh-64px)] w-64 transition-transform duration-500 ease-in-out ${openSideMenu ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
        >
          <Sidebar activeMenu={activeMenu} />
        </div>

        {/* main content */}
        <div
          className={`grow mx-8 transition-all duration-500 ease-in-out ${openSideMenu ? 'sm:ml-64' : 'sm:ml-5'}`}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
