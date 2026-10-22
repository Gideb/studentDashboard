
import { useState, useRef, useEffect } from 'react'
import { PiStudentFill } from 'react-icons/pi'
import { LuLogOut, LuSettings } from 'react-icons/lu'
import profile from '../../assets/images/profile.png'
import { useNavigate } from 'react-router-dom'
import useRole from '../../hooks/useRole'
import useAuth from '../../hooks/useAuth'

const ProfileInfoCard = () => {
  const { roleLabel } = useRole()
  const { user, logout } = useAuth()

  const [dropdown, setDropdown] = useState(false)
  const navigate = useNavigate()
  const profileRef = useRef(null)

  const displayName = user?.name || 'Student'
  const displayEmail = user?.email || ''

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

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
      <button
        type='button'
        onClick={() => setDropdown(prev => !prev)}
        className='flex items-center justify-center gap-2 cursor-pointer'
      >
        <PiStudentFill size={20} />
        <span className='hidden text-sm text-gray-800 dark:text-white sm:flex'>
          {displayName}
        </span>
      </button>

      {dropdown && (
        <div className='absolute right-0 top-full z-50 mt-3'>
          <div className='flex w-60 items-center justify-center gap-4 rounded-lg border border-gray-200 bg-white px-4 py-4 shadow-lg dark:border-gray-800 dark:bg-gray-900 sm:w-80 sm:gap-5 sm:px-6'>
            <div className='relative h-14 w-14 shrink-0 rounded-full border-2 border-amber-500 bg-gray-50 dark:bg-gray-600 sm:h-20 sm:w-20'>
              <div className='h-full w-full overflow-hidden rounded-full'>
                <img
                  src={profile}
                  alt='Profile'
                  className='h-full w-full object-cover'
                />
              </div>
              <div className='absolute bottom-0.5 right-1 z-30 h-3.5 w-3.5 rounded-full border-2 border-gray-200 bg-green-500 dark:border-gray-700' />
            </div>

            <div className='flex min-w-0 flex-col items-start space-y-1 sm:space-y-1.5'>
              <h6 className='break-words text-base font-semibold text-gray-900 dark:text-white sm:text-xl'>
                {displayName}
              </h6>

              {displayEmail && (
                <p className='break-all text-xs text-gray-600 dark:text-white/70'>
                  {displayEmail}
                </p>
              )}

              <p className='text-xs text-gray-600 dark:text-white/70 sm:text-sm'>
                {roleLabel}
              </p>

              <button
                type='button'
                className='flex items-center gap-2 rounded-full border border-slate-100 px-2 py-1'
                onClick={() => {
                  setDropdown(false)
                  navigate('/settings')
                }}
              >
                <LuSettings className='text-slate-700 dark:text-white/70' />
                <span className='text-xs text-slate-700 dark:text-white/70'>
                  Account Settings
                </span>
              </button>

              <div className='hidden h-0.5 w-full bg-gray-200 dark:bg-gray-700 sm:block' />

              <button
                type='button'
                className='mt-2 flex items-center gap-2 pl-1 font-semibold'
                onClick={handleLogout}
              >
                <LuLogOut className='text-red-500' />
                <span className='text-xs text-red-500 sm:text-sm'>
                  Logout
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileInfoCard

