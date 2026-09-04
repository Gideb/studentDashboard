import { useState } from 'react'
import { students } from '../../data/studentsData'
import Modal from '../Modals/Modal'
import { PiStudentDuotone } from 'react-icons/pi'

const AddStudentModal = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    class: 'Basic 4',
    status: 'Active',
  })

  const handleSubmit = event => {
    event.preventDefault()

    // validation
    // create new student

    // send new student to parent
    // close modal
  }

  return (
    <Modal onClose={onClose} labelledBy='add-student-details'>
      {/* header */}
      <div className='flex items-start justify-between gap-4 border-b border-gray-200 dark:border-gray-700 pb-4'>
        <div>
          <h2
            id='add-student-details'
            className='text-xl font-semibold text-gray-900 dark:text-white'
          >
            Add Student
          </h2>
        </div>

        <button
          type='button'
          onClick={onClose}
          aria-label='Close add modal'
          className='text-2xl leading-none text-gray-400 hover:text-gray-700 dark:hover:text-white'
        >
          &times;
        </button>
      </div>

      {/* add student */}

      <form onSubmit={handleSubmit}>
        <div className='mt-6 space-y-4'>
          <fieldset>
            <div className='flex items-center gap-2 mb-5'>
              <PiStudentDuotone size={18} />
              <legend className='text-xs '>Fill out the form to add student to system</legend>
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
                className='input-box'
                placeholder='Joe Biden'
                value={formData.name}
                onChange={event =>
                  setFormData({
                    ...formData,
                    name: event.target.value,
                  })
                }
              />
            </div>

            {/* student ID */}
            <div className='flex flex-col gap-2'>
              <label htmlFor='student-id' className='text-xs text-gray-700 dark:text-gray-200'>
                Student ID <span className='text-red-500'>*</span>
              </label>

              <input
                type='text'
                name='student-id'
                id='student-id'
                className='input-box'
                placeholder='STD-001'
                value={formData.studentId}
                onChange={event =>
                  setFormData({
                    ...formData,
                    studentId: event.target.value,
                  })
                }
              />
            </div>

            {/* class */}
            <div className='flex flex-col gap-2'>
              <label htmlFor='class' className='text-xs text-gray-700 dark:text-gray-200'>
                Class <span className='text-red-500'>*</span>
              </label>

              <select
                name='class'
                id='class'
                className='border border-primary dark:border-dark dark:text-dark  outline-0 py-2 px-4 rounded-md text-sm w-full sm:w-auto sm:py-2.5 sm:text-sm'
                value={formData.class}
                onChange={event =>
                  setFormData({
                    ...formData,
                    class: event.target.value,
                  })
                }
              >
                <option value='' disabled>
                  Select class
                </option>
                {[...new Set(students.map(student => student.class))].map(className => (
                  <option key={className} value={className}>
                    {className}
                  </option>
                ))}
              </select>
            </div>

            {/* status */}
            <div className='flex flex-col gap-2'>
              <label htmlFor='status' className='text-xs text-gray-700 dark:text-gray-200'>
                Status <span className='text-red-500 dark:text-red-300'>*</span>
              </label>

              <select
                name='status'
                id='status'
                className='border border-primary dark:border-dark dark:text-dark  outline-0 py-2 px-4 rounded-md text-sm w-full sm:w-auto sm:py-2.5 sm:text-sm'
                value={formData.status}
                onChange={event =>
                  setFormData({
                    ...formData,
                    status: event.target.value,
                  })
                }
              >
                <option value='' disabled>
                  Choose Status
                </option>
                {[...new Set(students.map(student => student.status))].map(status => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
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
