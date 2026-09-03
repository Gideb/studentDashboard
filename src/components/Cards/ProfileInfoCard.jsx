import { useState, useRef, useEffect } from 'react'
import { PiStudentFill } from 'react-icons/pi'
import { LuLogOut, LuSettings } from 'react-icons/lu'
import profile from '../../assets/images/profile.png'
import { useNavigate } from 'react-router-dom'

const ProfileInfoCard = () => {
  const [dropdown, setDropdown] = useState(false)

  const navigate = useNavigate()

  const profileRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = event => {
      if (!profileRef.current?.contains(event.target)) {
        setDropdown(false)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div className='relative' ref={profileRef}>
      <div
        onClick={() => setDropdown(!dropdown)}
        className='flex  justify-center items-center gap-2 cursor-pointer'
      >
        <PiStudentFill size={20} />

        <h6 className='text-sm text-gray-800 dark:text-white hidden sm:flex'>John Chen</h6>

        {/* {dropdown ? <PiCaretUp /> : <PiCaretDown />} */}
      </div>

      {dropdown && (
        <div className='absolute top-full -right-14 sm:right-0 mt-5 transition -translate-y-2'>
          <div className=' flex items-center justify-center gap-5 w-60 sm:w-80 px-4 sm:px-6 py-2 sm:py-4 border border-gray-200 dark:border-gray-800 bg-white rounded-lg dark:bg-gray-900 shadow-lg'>
            {/* profile picture */}
            <div className='bg-gray-50 dark:bg-gray-600 border-2 border-amber-500 rounded-full w-14 sm:w-20 h-14 sm:h-20  relative'>
              <div className='overflow-hidden rounded-full w-full h-full '>
                <img src={profile} className='w-full h-full object-cover ' />
              </div>
              <div className='w-3.5 h-3.5 rounded-full bg-green-500  border-2 border-gray-200 dark:border-gray-700 absolute bottom-0.5 right-1 z-30' />
            </div>

            {/* account info */}
            <div className='flex flex-col items-start space-y-1 sm:space-y-1.5'>
              <h6 className='text-base sm:text-xl text-gray-900 font-semibold dark:text-white'>
                John Chen
              </h6>

              <p className='text-xs sm:text-sm text-gray-600 dark:text-white/70'>
                Student ● Basic 5
              </p>

              {/* Account Settings */}

              <button
                className='flex items-center gap-1 sm:gap-2 border border-slate-100 rounded-full px-2 py-1 cursor-pointer'
                onClick={() => navigate('/settings')}
              >
                <LuSettings className='text-xs sm:text-sm text-slate-700 dark:text-white/70' />

                <p className='text-[10px]  sm:text-xs text-slate-700 dark:text-white/70'>
                  Account Settings
                </p>
              </button>

              <div className='h-0.5 w-full bg-gray-200 dark:bg-gray-700 hidden sm:flex' />

              {/* Logout */}

              <button
                className='flex items-center gap-1 sm:gap-2 mt-1 sm:mt-2 pl-1 sm:pl-2 font-semibold cursor-pointer'
                onClick={() => navigate('/logout')}
              >
                <LuLogOut className='text-xs sm:text-base text-red-500 dark:text-red-600' />

                <p className='text-red-500 dark:text-red-600 text-xs sm:text-sm'>Logout</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileInfoCard
