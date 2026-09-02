import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { useState } from 'react'

const DashboardLayout = ({ children, activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleSideMenu = () => {
    setOpenSideMenu(prev => !prev)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev)
  }

  return (
    <div className='min-h-screen dark:bg-secondary dark:text-gray-300'>
      {/* Navbar */}
      <Navbar
        activeMenu={activeMenu}
        mobileMenuOpen={mobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />

      <div className='flex'>
        {/* DESKTOP / TABLET SIDEBAR */}
        <div
          className={`hidden md:block fixed left-0 top-0 z-50 h-screen transition-[width] duration-300 ease-in-out ${
            openSideMenu ? 'w-64' : 'w-20'
          }`}
        >
          <Sidebar
            activeMenu={activeMenu}
            openSideMenu={openSideMenu}
            toggleSideMenu={toggleSideMenu}
          />
        </div>

        {/* MOBILE SIDEBAR */}
        {mobileMenuOpen && (
          <div className='md:hidden fixed inset-0 z-50'>
            {/* Overlay */}
            <div
              className='absolute inset-0 bg-black/40'
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Sidebar drawer */}
            <div className='relative w-64 h-screen'>
              <Sidebar
                activeMenu={activeMenu}
                openSideMenu={true}
                closeMobileMenu={() => setMobileMenuOpen(false)}
              />
            </div>
          </div>
        )}

        {/* MAIN CONTENT */}
        <div
          className={`grow mx-3 transition-all duration-500 ease-in-out ${
            openSideMenu ? 'md:ml-64' : 'md:ml-20'
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
