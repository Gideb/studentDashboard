const StatCard = ({ icon: Icon, title, value, description }) => {
  return (
    <div className='rounded-xl bg-white p-5 shadow-sm dark:bg-slate-800'>
      <div className='flex items-start gap-4'>
        <div className='bg-gray-100 dark:bg-gray-700 p-3 rounded-lg flex items-center justify-center'>
          {Icon && <Icon size={22} className='text-primary dark:text-dark' />}
        </div>

        <div>
          <p className='text-sm font-medium text-gray-500 dark:text-gray-300'>{title}</p>

          <h3 className='my-2 text-xl sm:text-2xl font-bold text-gray-900 dark:text-white'>
            {value}
          </h3>

          <p className='inline-block rounded-full bg-dark px-2 py-1 text-xs font-medium text-primary dark:bg-dark dark:text-primary'>
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default StatCard
