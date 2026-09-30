import { GrLocationPin } from 'react-icons/gr'
import { LuCalendar, LuClock } from 'react-icons/lu'

const ClassCard = ({ subject, day, time, location }) => {
  return (
    <div className='rounded-md bg-white p-5 shadow-sm dark:bg-gray-900'>
      <h3 className='text-lg sm:text-xl font-semibold text-gray-900 dark:text-white'>{subject}</h3>

      <div className='flex justify-start items-center my-1 gap-6'>
        <div className='flex items-center gap-1'>
          <LuCalendar size={13} />
          <p className='text-xs text-gray-500 dark:text-gray-400 font-medium'>{day}</p>
        </div>

        <span className='text-primary dark:text-dark'>•</span>
        <div className='flex items-center gap-1 '>
          <LuClock size={13} />
          <p className='text-xs text-gray-500 dark:text-gray-400 font-medium'>{time}</p>
        </div>
      </div>

      <div className='flex items-center justify-start mt-2 gap-1'>
        <GrLocationPin size={14} className='dark:text-dark text-primary' />
        <p className='text-gray-500 dark:text-gray-400 text-[11px] sm:text-xs font-medium'>
          {location}
        </p>
      </div>
    </div>
  )
}

export default ClassCard
