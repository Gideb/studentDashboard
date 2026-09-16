import { useState } from 'react'
import Modal from '../Modals/Modal'
import { X } from 'lucide-react'
import { PiStudentFill } from 'react-icons/pi'

const EditStudentModal = ({ student, onClose, onUpdate, departments, levels, statuses }) => {
  const [formData, setFormData] = useState({
    name: student.name,

    email: student.email,
    gender: student.gender,
    department: student.department,
    level: student.level,
    phone: student.phone,
    status: student.status,
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

    onUpdate({
      id: student.id,
      name: formData.name,
      email: formData.email,
      gender: formData.gender,
      department: formData.department,
      level: formData.level,
      phone: formData.phone,
      status: formData.status,
    })
  }

  return (
    <Modal onClose={onClose} labelledBy='update-student-title'>
      {/* header */}
      <div className='flex items-start justify-between gap-3 border-b border-gray-200 dark:border-gray-700 pb-4'>
        <div className='flex gap-3'>
          <div className='flex items-center px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800'>
            <PiStudentFill size={24} className='text-black dark:text-white' />
          </div>
          <div className='flex flex-col items-left gap-1 mt-1'>
            <h2
              id='update-student-title'
              className='text-lg sm:text-xl font-semibold text-black dark:text-white'
            >
              Edit Student
            </h2>
            <p className='text-xs'>Update student details</p>
          </div>
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

      {/* edit student */}
      <form onSubmit={handleSubmit} className='space-y-5'>
        <div className='mt-6 '>
          <fieldset>
            {/* student id */}
            <div>
              <label htmlFor='studentId' className='input-label'>
                Student ID
              </label>

              <input
                id='studentId'
                type='text'
                value={student.studentId}
                disabled
                className='w-full rounded-md cursor-not-allowed border border-gray-200 bg-gray-100 px-3 py-2.5 text-sm text-gray-500 dark:border-gray-700 dark:bg-slate-800 dark:text-gray-500'
              />
            </div>

            {/* student name */}

            <div className='flex flex-col gap-2'>
              <label htmlFor='student-name' className='input-label'>
                Student Name
              </label>

              <input
                type='text'
                name='student-name'
                id='student-name'
                className={`input-box ${error.name ? 'border-red-500' : ''}`}

                value={formData.name}
                onChange={event => {
                  setFormData({
                    ...formData,
                    name: event.target.value,
                  })
                  setError(prev => ({
                    ...prev,
                    name: '',
                  }))
                }}
              />
              {error.name && <p className='text-red-500 text-xs'>{error.name}</p>}
            </div>

            {/* email */}

            <div className='flex flex-col gap-2'>
              <label htmlFor='student-email' className='input-label'>
                Student Email
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
              <label htmlFor='gender' className='input-label'>
                Gender
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
            <div className='flex flex-col gap-2'>
              <label htmlFor='department' className='input-label'>
                Department
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

            {/* level */}
            <div className='flex flex-col gap-2'>
              <label htmlFor='level' className='input-label'>
                Level
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

            <div className='flex flex-col gap-2'>
              <label htmlFor='student-phone' className='input-label'>
                Student Phone
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

            {/* status */}
            <div className='flex flex-col gap-2'>
              <label htmlFor='status' className='input-label'>
                Status
              </label>

              <select
                name='status'
                id='status'
                className='border border-primary dark:border-dark dark:text-gray-200 outline-0 py-2 px-4 rounded-md text-sm w-full sm:w-auto sm:py-2.5 sm:text-sm mb-2'
                value={formData.status}
                onChange={event => {
                  setFormData({
                    ...formData,
                    status: event.target.value,
                  })
                  setError(prev => ({
                    ...prev,
                    status: '',
                  }))
                }}
              >
                <option value='' disabled className='dark:bg-gray-800 dark:text-gray-400'>
                  Choose Status
                </option>
                {statuses.map(status => (
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
            aria-label='Close edit-student-modal'
            type='button'
            onClick={onClose}
            className='btn-secondary'
          >
            Cancel
          </button>
          <button aria-label='Edit student' type='submit' className='btn-primary-2'>
            Update Student
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default EditStudentModal
