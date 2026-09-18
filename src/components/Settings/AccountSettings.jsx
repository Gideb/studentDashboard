import { LuLogOut, LuLock } from 'react-icons/lu'
import { MdAccountCircle } from 'react-icons/md'

const AccountSettings = ({ onLogout }) => {
  return (
    <section className='rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-slate-900'>
      <div className='border-b border-gray-200 px-6 py-5 dark:border-gray-700'>
        <div className='flex items-center gap-3'>
          <div className='flex h-10 w-10 items-center justify-center rounded-lg  bg-dark/30 text-primary dark:bg-primary/30 dark:text-dark'>
            <MdAccountCircle size={20} />
          </div>
          <div>
            <h2 className='font-semibold text-primary dark:text-dark'>Account</h2>
            <p className='mt-1 text-xs text-secondary dark:text-gray-400'>
              Manage your account preferences.
            </p>
          </div>
        </div>
      </div>

      <div className='divide-y divide-gray-200 dark:divide-gray-700'>
        <button
          type='button'
          className='flex w-full items-center justify-between px-6 py-5 text-left transition hover:bg-gray-50 dark:hover:bg-slate-800'
        >
          <div className='flex items-center gap-3'>
            <LuLock size={20} className='text-secondary dark:text-gray-400' />

            <div>
              <p className='text-sm font-medium text-primary dark:text-white'>Change Password</p>

              <p className='mt-1 text-xs text-secondary dark:text-gray-400'>
                Update your account password.
              </p>
            </div>
          </div>

          <span className='text-xs text-secondary dark:text-gray-400'>Coming soon</span>
        </button>

        <button
          type='button'
          onClick={onLogout}
          className='flex w-full items-center gap-3 px-6 py-5 text-left text-red-600 transition hover:bg-red-50 dark:hover:bg-red-500/10'
        >
          <LuLogOut size={20} />

          <div>
            <p className='text-sm font-medium'>Log Out</p>

            <p className='mt-1 text-xs text-red-500/80'>Sign out of your current session.</p>
          </div>
        </button>
      </div>
    </section>
  )
}

export default AccountSettings
