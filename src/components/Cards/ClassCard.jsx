import { HiLocationMarker } from 'react-icons/hi'

const ClassCard = ({ subject, day, time, location }) => {
  return (
    <div className='rounded-xl bg-white p-5 shadow-sm dark:bg-gray-900'>
      <h3 className='text-2xl font-bold text-gray-900 dark:text-white'>{subject}</h3>

      <div className='flex justify-start items-center my-2 gap-6'>
        <p className='text-sm text-gray-500 dark:text-gray-400 font-medium'>{day}</p>
        <span className='text-gray-500 dark:text-gray-400 '>•</span>
        <p className='text-sm text-gray-500 dark:text-gray-400 font-medium'>{time}</p>
      </div>

      <div className='flex items-center justify-start gap-1'>
        <HiLocationMarker className='text-gray-500 dark:text-gray-400' />
        <p className='text-gray-500 dark:text-gray-400 text-xs font-bold'>{location}</p>
      </div>
    </div>
  )
}

export default ClassCard
