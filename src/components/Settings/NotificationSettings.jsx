import { LuBell, LuCalendarDays, LuClipboardList, LuFileCheck } from 'react-icons/lu'

const NotificationSettings = ({ notifications, onUpdate }) => {
  const notificationItems = [
    {
      key: 'assignmentNotifications',
      title: 'Assignment Notifications',
      description: 'Receive notifications about assignment updates and deadlines.',
      icon: LuClipboardList,
    },
    {
      key: 'resultNotifications',
      title: 'Result Notifications',
      description: 'Receive notifications when student results are updated.',
      icon: LuFileCheck,
    },
    {
      key: 'calendarReminders',
      title: 'Calendar Reminders',
      description: 'Receive reminders about upcoming classes, exams and events.',
      icon: LuCalendarDays,
    },
  ]

  return (
    <section className='rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-slate-900'>
      <div className='border-b border-gray-200 px-6 py-5 dark:border-gray-700'>
        <div className='flex items-center gap-3'>
          <div className='flex h-10 w-10 items-center justify-center rounded-lg  bg-dark/30 text-primary dark:bg-primary/30 dark:text-dark'>
            <LuBell size={20} />
          </div>

          <div>
            <h2 className='font-semibold text-primary dark:text-dark'>Notifications</h2>

            <p className='mt-1 text-xs text-secondary dark:text-gray-400'>
              Choose which notifications you want to receive.
            </p>
          </div>
        </div>
      </div>

      <div className='divide-y divide-gray-200 dark:divide-gray-700'>
        {notificationItems.map(item => {
          const Icon = item.icon

          return (
            <div key={item.key} className='flex items-center justify-between gap-4 px-6 py-5'>
              <div className='flex items-start gap-3'>
                <Icon size={20} className='mt-0.5 text-secondary dark:text-gray-400' />

                <div>
                  <p className='text-sm font-medium text-primary dark:text-white'>{item.title}</p>

                  <p className='mt-1 max-w-xl text-xs leading-5 text-secondary dark:text-gray-400'>
                    {item.description}
                  </p>
                </div>
              </div>

              <button
                type='button'
                onClick={() =>
                  onUpdate({
                    [item.key]: !notifications[item.key],
                  })
                }
                className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                  notifications[item.key] ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
                }`}
                aria-label={`Toggle ${item.title}`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                    notifications[item.key] ? 'left-6' : 'left-1'
                  }`}
                />
              </button>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default NotificationSettings
