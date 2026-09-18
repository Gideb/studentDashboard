import { useState } from 'react'
import { LuUser } from 'react-icons/lu'

const ProfileSettings = ({ profile, onSave }) => {
  const [formData, setFormData] = useState(profile)

  const handleChange = e => {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <section className='rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-slate-900'>
      <div className='border-b border-gray-200 px-6 py-5 dark:border-gray-700'>
        <div className='flex items-center gap-3'>
          <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-dark/30 text-primary dark:bg-primary/30 dark:text-dark'>
            <LuUser size={20} />
          </div>

          <div>
            <h2 className='font-semibold text-primary dark:text-dark'>Profile Information</h2>

            <p className='mt-1 text-xs text-secondary dark:text-gray-400'>
              Update your personal information.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className='p-6'>
        <div className='grid gap-5 md:grid-cols-2'>
          <div>
            <label className='input-label'>
              Full Name
            </label>

            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              className='input-box'
            />
          </div>

          <div>
            <label className='input-label'>
              Email
            </label>

            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className='input-box'
            />
          </div>

          <div>
            <label className='input-label'>
              Department
            </label>

            <input
              type='text'
              name='department'
              value={formData.department}
              onChange={handleChange}
              className='input-box'
            />
          </div>

          <div>
            <label className='input-label'>
              Phone
            </label>

            <input
              type='tel'
              name='phone'
              value={formData.phone}
              onChange={handleChange}
              className='input-box'
            />
          </div>
        </div>

        <div className='mt-6 flex justify-end'>
          <button
            type='submit'
            className=' btn-primary-2'
          >
            Save Changes
          </button>
        </div>
      </form>
    </section>
  )
}

export default ProfileSettings
