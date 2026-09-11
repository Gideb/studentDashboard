import { useState } from 'react'
import { students } from '../../data/StudentsData'
import Modal from '../Modals/Modal'
import { PiStudentDuotone, PiStudentFill } from 'react-icons/pi'
import { toast } from 'react-hot-toast'
import { X } from 'lucide-react'

const AddStudentModal = ({ onClose, onAdd }) => {
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

    onClose()
    toast.success('Student successfully added!')
  }

  return (
    <Modal onClose={onClose} labelledBy='add-student-details'>
      {/* header */}
      <div className='flex items-start justify-between gap-3 border-b border-gray-200 dark:border-gray-700 pb-4'>
        <div>
          <div className='flex items-center gap-2 mt-1'>
            <PiStudentFill size={20} className='text-black dark:text-white' />

            <h2
              id='update-course-details'
              className='text-lg sm:text-xl font-semibold text-black dark:text-white'
            >
              Add Student Details
            </h2>
          </div>

          <p className='text-xs'>Enter details to add student to system</p>
        </div>

        <button
          type='button'
          onClick={onClose}
          aria-label='Close modal'
          className='flex items-center  justify-center p-2 hover:bg-gray-50 hover:dark:bg-gray-800  rounded-full text-gray-600 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white transition-all'
        >
          <X className='h-4 w-4' />
        </button>
      </div>

      {/* add student */}

      <form onSubmit={handleSubmit}>
        <div className='mt-6 space-y-4'>
          <fieldset>
            <div className='flex items-center gap-2 mb-5 sr-only'>
              <PiStudentDuotone size={18} />
              <legend className=''>Fill out the form to add student to system</legend>
            </div>

            {/* student name */}

            <div className='flex flex-col gap-2'>
              <label htmlFor='student-name' className='text-xs text-gray-700 dark:text-gray-200'>
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

            <div className='flex flex-col gap-2'>
              <label htmlFor='student-email' className='text-xs text-gray-700 dark:text-gray-200'>
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

            {/* gender */}
            <div className='flex flex-col gap-2'>
              <label htmlFor='gender' className='text-xs text-gray-700 dark:text-gray-200'>
                Gender <span className='text-red-500 dark:text-red-300'>*</span>
              </label>

              <select
                name='gender'
                id='gender'
                className='input-select'
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
                {[...new Set(students.map(student => student.gender))].map(gender => (
                  <option
                    key={gender}
                    value={gender}
                    className='dark:bg-gray-800 dark:text-gray-200'
                  >
                    {gender}
                  </option>
                ))}
              </select>
              {error.gender && <p className='text-red-500 text-xs'>{error.gender}</p>}
            </div>

            {/* department */}
            <div className='flex flex-col gap-2'>
              <label htmlFor='department' className='text-xs text-gray-700 dark:text-gray-200'>
                Department <span className='text-red-500 dark:text-red-300'>*</span>
              </label>

              <select
                name='department'
                id='department'
                className='input-select'
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
                {[...new Set(students.map(student => student.department))].map(department => (
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

            {/* level */}
            <div className='flex flex-col gap-2'>
              <label htmlFor='level' className='text-xs text-gray-700 dark:text-gray-200'>
                Level <span className='text-red-500 dark:text-red-300'>*</span>
              </label>

              <select
                name='level'
                id='level'
                className='input-select'
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
                {[...new Set(students.map(student => student.level))].map(level => (
                  <option key={level} value={level} className='dark:bg-gray-800 dark:text-gray-200'>
                    {level}
                  </option>
                ))}
              </select>
              {error.level && <p className='text-red-500 text-xs'>{error.level}</p>}
            </div>

            {/* student phone */}

            <div className='flex flex-col gap-2'>
              <label htmlFor='student-name' className='text-xs text-gray-700 dark:text-gray-200'>
                Student Phone <span className='text-red-500'>*</span>
              </label>

              <input
                type='text'
                name='student-phone'
                id='student-phone'
                className={`input-box ${error.name ? 'border-red-500' : ''}`}
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

            {/* status */}
            <div className='flex flex-col gap-2'>
              <label htmlFor='status' className='text-xs text-gray-700 dark:text-gray-200'>
                Status <span className='text-red-500 dark:text-red-300'>*</span>
              </label>

              <select
                name='status'
                id='status'
                className='input-select'
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
                {[...new Set(students.map(student => student.status))].map(status => (
                  <option
                    key={status}
                    value={status}
                    className='dark:bg-gray-800 dark:text-gray-200'
                  >
                    {status}
                  </option>
                ))}
              </select>
              {error.status && <p className='text-red-500 text-xs'>{error.status}</p>}
            </div>
          </fieldset>
        </div>

        {/* FOOTER */}
        <div className='mt-6 flex items-center gap-3 justify-end border-t border-gray-200 dark:border-gray-700 pt-4'>
          <button
            aria-label='Close add-student-modal'
            type='button'
            onClick={onClose}
            className='btn-secondary'
          >
            Cancel
          </button>
          <button aria-label='Add student' type='submit' className='btn-primary'>
            Add Student
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default AddStudentModal
