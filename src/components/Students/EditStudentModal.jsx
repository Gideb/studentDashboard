import { useState } from 'react'
import Modal from '../Modals/Modal'
import { students } from '../../data/studentsData'

const EditStudentModal = ({ student, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: student.name,
    class: student.class,
    status: student.status,
  })

  const [error, setError] = useState({
    name: '',
    class: '',
    status: '',
  })

  const handleSubmit = event => {
    event.preventDefault()

    const newErrors = {
      name: '',
      class: '',
      status: '',
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Student name is required!'
    }

    if (!formData.class) {
      newErrors.class = 'Select a class!'
    }

    if (!formData.status) {
      newErrors.status = 'Select a status!'
    }

    setError(newErrors)

    if (Object.values(newErrors).some(Boolean)) {
      return
    }

    onUpdate({
      id: student.id,
      name: formData.name,
      class: formData.class,
      status: formData.status,
    })
  }

  return (
    <Modal onClose={onClose} labelledBy='edit-student-title'>
      {/* header */}
      <div className='flex items-start justify-between gap-4 border-b border-gray-200 pb-4 dark:border-gray-700'>
        <div>
          <h2
            id='edit-student-title'
            className='text-xl font-semibold text-gray-900 dark:text-white'
          >
            Edit Student
          </h2>

          <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
            Update this student's information.
          </p>
        </div>

        <button
          type='button'
          onClick={onClose}
          aria-label='Close edit student modal'
          className='text-2xl leading-none text-gray-400 hover:text-gray-700 dark:hover:text-white'
        >
          &times;
        </button>
      </div>

      {/* edit student */}
      <form onSubmit={handleSubmit}>
        <div className='mt-6 space-y-4'>
          <fieldset>
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

            {/* class */}
            <div className='flex flex-col gap-2'>
              <label htmlFor='class' className='text-xs text-gray-700 dark:text-gray-200'>
                Class <span className='text-red-500'>*</span>
              </label>

              <select
                name='class'
                id='class'
                className='border border-primary dark:border-dark dark:text-gray-200 outline-0 py-2 px-4 rounded-md text-sm w-full sm:w-auto sm:py-2.5 sm:text-sm mb-3'
                value={formData.class}
                onChange={event => {
                  setFormData({
                    ...formData,
                    class: event.target.value,
                  })
                  setError(prev => ({
                    ...prev,
                    class: '',
                  }))
                }}
              >
                <option value='' disabled className='dark:bg-gray-800 dark:text-gray-400'>
                  Select class
                </option>
                {[...new Set(students.map(student => student.class))].map(className => (
                  <option
                    key={className}
                    value={className}
                    className='dark:bg-gray-800 dark:text-gray-200'
                  >
                    {className}
                  </option>
                ))}
              </select>
              {error.class && <p className='text-red-500 text-xs'>{error.class}</p>}
            </div>

            {/* status */}
            <div className='flex flex-col gap-2'>
              <label htmlFor='status' className='text-xs text-gray-700 dark:text-gray-200'>
                Status <span className='text-red-500 dark:text-red-300'>*</span>
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
            aria-label='Close edit-student-modal'
            type='button'
            onClick={onClose}
            className='btn-secondary'
          >
            Cancel
          </button>
          <button aria-label='Edit student' type='submit' className='btn-primary'>
            Update Student
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default EditStudentModal
