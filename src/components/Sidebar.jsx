import { useNavigate } from 'react-router-dom'
import { SIDE_MENU_DATA } from '../data/Side_Menu_Data'
import { PiSidebarSimpleDuotone } from 'react-icons/pi'
import smd_logo from '../assets/images/smd-logo.png'
import smd_logo_dark from '../assets/images/smd-logo-dark.png'
import { useTheme } from '../context/ThemeContext'
import { useState } from 'react'
import useRole from '../hooks/useRole'

const Sidebar = ({ activeMenu, toggleSideMenu, openSideMenu, closeMobileMenu }) => {
  const { darkMode } = useTheme()
  const { hasPermission } = useRole()
  const navigate = useNavigate()

  const [logoHover, setLogoHover] = useState(false)

  const handleClick = route => {
    if (route === '/logout') {
      handleLogout()
      return
    }

    navigate(route)

    if (closeMobileMenu) {
      closeMobileMenu()
    }
  }

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  const visibleMenuItems = SIDE_MENU_DATA.filter(item => {
    // Logout should always be visible
    if (item.path === '/logout') {
      return true
    }

    // Convert title to the permission key
    const permissionKey = item.title.toLowerCase()

    return hasPermission(permissionKey)
  })

  return (
    <div className='h-screen bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-300 border-r border-t border-gray-300 dark:border-gray-700 p-4 overflow-y-auto'>
      <div className='flex flex-col gap-5 space-y-6'>
        {/* Logo */}

        {openSideMenu ? (
          <div className='flex items-center justify-between w-full'>
            <img src={darkMode ? smd_logo_dark : smd_logo} alt='SMD logo' className='w-14' />

            <button type='button' onClick={toggleSideMenu} aria-label='Collapse side menu'>
              <PiSidebarSimpleDuotone className='text-3xl text-primary dark:text-dark cursor-pointer' />
            </button>
          </div>
        ) : (
          <div
            className='flex justify-center'
            onMouseEnter={() => setLogoHover(true)}
            onMouseLeave={() => setLogoHover(false)}
          >
            {logoHover ? (
              <button type='button' onClick={toggleSideMenu} aria-label='Expand side menu'>
                <PiSidebarSimpleDuotone className='text-3xl text-primary dark:text-dark cursor-pointer' />
              </button>
            ) : (
              <img src={darkMode ? smd_logo_dark : smd_logo} alt='SMD logo' className='w-11' />
            )}
          </div>
        )}

        {/* Menu */}

        <div className='space-y-2'>
          {visibleMenuItems.map((item, index) => {
            const isActive = activeMenu === item.title

            return (
              <button
                key={`menu_${index}`}
                className={`relative w-full cursor-pointer flex items-center rounded font-medium transition-colors
                  ${openSideMenu ? 'justify-start gap-4 px-6' : 'justify-center'}
                  ${
                    isActive
                      ? 'bg-primary dark:bg-dark text-white dark:text-secondary border-l-4 border-secondary dark:border-primary'
                      : 'text-slate-900 dark:text-orange-200 hover:bg-primary/20 dark:hover:bg-secondary'
                  }
                  py-3
                `}
                onClick={() => handleClick(item.path)}
              >
                <item.icon className='text-xl shrink-0' />

                {openSideMenu && <span>{item.title}</span>}

                {!openSideMenu && <span title={item.title} className='absolute inset-0 z-50' />}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
