import { Calendar } from 'lucide-react'
import { MdSubject } from 'react-icons/md'

const COLORS = {
  Pending: 'bg-red-100 text-red-700',
  'In Progress': 'bg-amber-100 text-amber-700',
  Completed: 'bg-green-100 text-green-700',
}

const AssignmentCard = ({ subject, title, dueDate, status }) => {
  return (
    <div className='rounded-xl bg-white p-5 shadow-sm dark:bg-gray-900'>
      <div className='flex items-center gap-2'>
        <MdSubject className=' text-gray-500 dark:text-gray-400' />
        <p className='text-sm text-gray-500 dark:text-gray-400 font-medium'>{subject}</p>
      </div>

      <h3 className='mt-2 text-2xl font-bold text-gray-900 dark:text-white'>{title}</h3>

      <div className='flex justify-between items-center mt-1'>
        <p
          className={`rounded-xl font-medium px-2 py-1 text-xs ${COLORS[status] || 'text-gray-700 bg-gray-100'}`}
        >
          {status}
        </p>
        <div className='flex items-center justify-center gap-1'>
          <Calendar size={13} className=' text-primary dark:text-dark ' />
          <p className='text-gray-500 dark:text-gray-400 font-medium text-xs'>{dueDate}</p>
        </div>
      </div>
    </div>
  )
}

export default AssignmentCard
