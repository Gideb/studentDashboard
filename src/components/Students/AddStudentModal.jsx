import { useState } from 'react'
import Modal from '../Modals/Modal'
import { PiStudentFill } from 'react-icons/pi'

const AddStudentModal = ({ onClose, onAdd, departments, levels, statuses }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    department: '',
    level: '',
    phone: '',
    status: '',
  })

  const [error, setError] = useState({
    name: '',
    email: '',
    gender: '',
    department: '',
    level: '',
    phone: '',
    status: '',
  })

  const handleSubmit = event => {
    event.preventDefault()

    const newErrors = {
      name: '',
      email: '',
      gender: '',
      department: '',
      level: '',
      phone: '',
      status: '',
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Include student name'
    }

    if (!formData.email.trim()) {
      newErrors.email = "include student's email"
    }

    if (!formData.gender) {
      newErrors.gender = 'Select a gender'
    }
    if (!formData.department) {
      newErrors.department = "Select student's department"
    }

    if (!formData.level) {
      newErrors.level = 'Select a level'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Include phone number'
    }

    if (!formData.status) {
      newErrors.status = 'Select a status'
    }

    setError(newErrors)

    if (Object.values(newErrors).some(Boolean)) {
      return
    }

    onAdd({
      name: formData.name,
      email: formData.email,
      gender: formData.gender,
      department: formData.department,
      level: formData.level,
      phone: formData.phone,
      status: formData.status,
    })

    setFormData({
      name: '',
      email: '',
      gender: '',
      department: '',
      level: '',
      phone: '',
      status: '',
    })

    setError({
      name: '',
      email: '',
      gender: '',
      department: '',
      level: '',
      phone: '',
      status: '',
    })
  }

  return (
    <Modal onClose={onClose} labelledBy='add-student-details'>
      {/* header */}
      <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-dark/70 text-primary dark:bg-primary/20 dark:text-dark'>
        <PiStudentFill size={22} />
      </div>
      <div className='mb-6 text-center border-b border-gray-200 pb-3'>
        <h2 id='add-student-title' className='text-xl font-semibold text-primary dark:text-dark'>
          Add Student
        </h2>

        <p className='mt-1 text-sm text-secondary dark:text-gray-400'>
          Enter the student's details.
        </p>
      </div>

      {/* add student */}

      <form onSubmit={handleSubmit} className='space-y-5'>
        <div className='mt-6 '>
          {/* student name */}

          <div className='flex flex-col gap-1 mt-2'>
            <label htmlFor='student-name' className='input-label'>
              Student Name <span className='text-red-500'>*</span>
            </label>

            <input
              type='text'
              name='student-name'
              id='student-name'
              className={`input-box ${error.name ? 'border-red-500' : ''}`}
              placeholder='Joe Biden'

              value={formData.name}
              onChange={event => {
                setFormData({
                  ...formData,
                  name: event.target.value,
                })
                setError({ ...error, name: '' })
              }}
            />
            {error.name && <p className='text-red-500 text-xs'>{error.name}</p>}
          </div>

          {/* email */}

          <div className='flex flex-col gap-1 mt-2'>
            <label htmlFor='student-email' className='input-label'>
              Student Email <span className='text-red-500'>*</span>
            </label>

            <input
              type='email'
              name='student-email'
              id='student-email'
              className={`input-box ${error.email ? 'border-red-500' : ''}`}
              placeholder='joe.biden@gmail.com'

              value={formData.email}
              onChange={event => {
                setFormData({
                  ...formData,
                  email: event.target.value,
                })
                setError({ ...error, email: '' })
              }}
            />
            {error.email && <p className='text-red-500 text-xs'>{error.email}</p>}
          </div>

          <div className='grid gap-4 sm:grid-cols-2'>
            {/* gender */}
            <div className='flex flex-col gap-1 mt-2'>
              <label htmlFor='gender' className='input-label'>
                Gender <span className='text-red-500 dark:text-red-300'>*</span>
              </label>

              <select
                name='gender'
                id='gender'
                className='input-box'
                value={formData.gender}
                onChange={event => {
                  setFormData({
                    ...formData,
                    gender: event.target.value,
                  })
                  setError({ ...error, gender: '' })
                }}
              >
                <option value='' disabled className='dark:bg-gray-800 dark:text-gray-400'>
                  Choose Gender
                </option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
              </select>
              {error.gender && <p className='text-red-500 text-xs'>{error.gender}</p>}
            </div>

            {/* department */}
            <div className='flex flex-col gap-1 mt-2'>
              <label htmlFor='department' className='input-label'>
                Department <span className='text-red-500 dark:text-red-300'>*</span>
              </label>

              <select
                name='department'
                id='department'
                className='input-box'
                value={formData.department}
                onChange={event => {
                  setFormData({
                    ...formData,
                    department: event.target.value,
                  })
                  setError({ ...error, department: '' })
                }}
              >
                <option value='' disabled className='dark:bg-gray-800 dark:text-gray-400'>
                  Choose Department
                </option>
                {departments.map(department => (
                  <option
                    key={department}
                    value={department}
                    className='dark:bg-gray-800 dark:text-gray-200'
                  >
                    {department}
                  </option>
                ))}
              </select>
              {error.department && <p className='text-red-500 text-xs'>{error.department}</p>}
            </div>
          </div>

          <div className='grid gap-4 sm:grid-cols-2'>
            {/* level */}
            <div className='flex flex-col gap-1 mt-2'>
              <label htmlFor='level' className='input-label'>
                Level <span className='text-red-500 dark:text-red-300'>*</span>
              </label>

              <select
                name='level'
                id='level'
                className='input-box'
                value={formData.level}
                onChange={event => {
                  setFormData({
                    ...formData,
                    level: event.target.value,
                  })
                  setError({ ...error, level: '' })
                }}
              >
                <option value='' disabled className='dark:bg-gray-800 dark:text-gray-400'>
                  Choose Level
                </option>
                {levels.map(level => (
                  <option key={level} value={level} className='dark:bg-gray-800 dark:text-gray-200'>
                    {level}
                  </option>
                ))}
              </select>
              {error.level && <p className='text-red-500 text-xs'>{error.level}</p>}
            </div>

            {/* student phone */}

            <div className='flex flex-col gap-1 mt-2'>
              <label htmlFor='student-phone' className='input-label'>
                Student Phone <span className='text-red-500'>*</span>
              </label>

              <input
                type='text'
                name='student-phone'
                id='student-phone'
                className={`input-box ${error.phone ? 'border-red-500' : ''}`}
                placeholder='+233 44 555 5555'

                value={formData.phone}
                onChange={event => {
                  setFormData({
                    ...formData,
                    phone: event.target.value,
                  })
                  setError({ ...error, phone: '' })
                }}
              />
              {error.phone && <p className='text-red-500 text-xs'>{error.phone}</p>}
            </div>
          </div>

          {/* status */}
          <div className='flex flex-col gap-1 mt-2'>
            <label htmlFor='status' className='input-label'>
              Status <span className='text-red-500 dark:text-red-300'>*</span>
            </label>

            <select
              name='status'
              id='status'
              className='input-box'
              value={formData.status}
              onChange={event => {
                setFormData({
                  ...formData,
                  status: event.target.value,
                })
                setError({ ...error, status: '' })
              }}
            >
              <option value='' disabled className='dark:bg-gray-800 dark:text-gray-400'>
                Choose Status
              </option>
              {statuses.map(status => (
                <option key={status} value={status} className='dark:bg-gray-800 dark:text-gray-200'>
                  {status}
                </option>
              ))}
            </select>
            {error.status && <p className='text-red-500 text-xs'>{error.status}</p>}
          </div>
        </div>

        {/* buttons */}
        <div className='mt-6 flex items-center gap-3 justify-end border-t border-gray-200 dark:border-gray-700 pt-4'>
          <button
            aria-label='Close add-student-modal'
            type='button'
            onClick={onClose}
            className='btn-secondary'
          >
            Cancel
          </button>
          <button aria-label='Add student' type='submit' className='btn-primary-2'>
            Add Student
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default AddStudentModal
