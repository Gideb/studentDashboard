const StatCard = ({ icon: Icon, title, value, description }) => {
  return (
    <div className='rounded-xl bg-white p-5 shadow-sm dark:bg-slate-800'>
      <div className='flex gap-3 items-center justify-start'>
        <div className='bg-teal-50 dark:bg-teal-700 p-3 rounded-lg flex items-center justify-center'>
          {Icon && <Icon size={22} className='text-teal-800 dark:text-teal-100' />}
        </div>
        <p className='text-sm text-gray-500 dark:text-gray-400 font-medium '>{title}</p>
      </div>

      <h3 className='my-2 pl-15 text-2xl font-bold text-gray-900 dark:text-white'>{value}</h3>

      <p className='mt-2 ml-14 px-2 py-1 bg-teal-50 dark:bg-teal-800 rounded-full inline text-xs text-teal-700 dark:text-teal-300 font-medium'>
        {description}
      </p>
    </div>
  )
}

export default StatCard
