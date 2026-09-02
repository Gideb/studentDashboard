/* import { useContext } from 'react'
import { UserContext } from '../context/UserContext' */
import { useNavigate } from 'react-router-dom'
import { SIDE_MENU_DATA } from '../data/Side_Menu_Data'

const Sidebar = ({ activeMenu }) => {
  const navigate = useNavigate()
  /* const { user, clearUser } = useContext(UserContext) */

  const handleClick = route => {
    if (route === './logout') {
      handleLogout()
      return
    }

    navigate(route)
  }

  const handleLogout = () => {
    localStorage.clear()
    //clearUser()
    navigate('./login')
  }

  return (
    <div className='w-64 h-[calc(100vh-64px)] bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-300 border-r border-t border-gray-300 dark:border-gray-700 p-4 overflow-y-auto'>
      <div className='flex flex-col gap-2'>
        {SIDE_MENU_DATA.map((item, index) => {
          const isActive = activeMenu === item.title

          return (
            <button
              key={`menu_${index}`}
              className={`w-full flex items-center justify-start gap-4 text-[15px] py-3 px-6 mb-3 rounded cursor-pointer ${
                isActive
                  ? 'bg-primary text-white hover:bg-primary/90'
                  : 'text-teal-900 dark:text-gray-200 hover:bg-teal-50 dark:hover:bg-slate-700'
              }`}
              onClick={() => handleClick(item.path)}
            >
              <item.icon className='text-xl' />
              {item.title}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Sidebar
