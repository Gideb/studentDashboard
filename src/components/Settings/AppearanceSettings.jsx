import { LuMoon, LuSun } from 'react-icons/lu'
import { useTheme } from '../../context/ThemeContext'

const AppearanceSettings = () => {
  const { darkMode, toggleDarkMode } = useTheme()

  return (
    <section className='rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-slate-900'>
      <div className='border-b border-gray-200 px-6 py-5 dark:border-gray-700'>
        <h2 className='font-semibold text-primary dark:text-dark'>Appearance</h2>

        <p className='mt-1 text-xs text-secondary dark:text-gray-400'>
          Customize how the dashboard looks.
        </p>
      </div>

      <div className='flex items-center justify-between gap-4 p-6'>
        <div className='flex items-center gap-3'>
          <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-dark/30 text-primary dark:bg-primary/30 dark:text-dark'>
            {darkMode ? <LuMoon size={20} /> : <LuSun size={20} />}
          </div>

          <div>
            <p className='text-sm font-medium text-primary dark:text-white'>Dark Mode</p>

            <p className='mt-1 text-xs text-secondary dark:text-gray-400'>
              {darkMode ? 'Dark theme is currently enabled.' : 'Light theme is currently enabled.'}
            </p>
          </div>
        </div>

        <button
          type='button'
          onClick={toggleDarkMode}
          className={`relative h-6 w-11 rounded-full transition ${
            darkMode ? 'bg-primary' : 'bg-gray-300'
          }`}
          aria-label='Toggle dark mode'
        >
          <span
            className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
              darkMode ? 'left-6' : 'left-1'
            }`}
          />
        </button>
      </div>
    </section>
  )
}

export default AppearanceSettings
