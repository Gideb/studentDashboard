import { useState } from 'react'
import Modal from '../Modals/Modal'

import { X } from 'lucide-react'
import { PiGraduationCapFill } from 'react-icons/pi'

const AddCourseModal = ({ onAdd, onClose, departments, statuses }) => {
  const [formData, setFormData] = useState({
    name: '',
    lecturer: '',
    department: '',
    students: '',
    status: '',
  })

  const [error, setError] = useState({
    name: '',
    lecturer: '',
    department: '',
    students: '',
    status: '',
  })

  const handleSubmit = e => {
    e.preventDefault()

    const newErrors = {
      name: '',
      lecturer: '',
      department: '',
      students: '',
      status: '',
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Course name is required!'
    }

    if (!formData.department.trim()) {
      newErrors.department = 'Department name of course is required!'
    }
    if (!formData.lecturer.trim()) {
      newErrors.lecturer = 'Assigned Lecturer is required!'
    }
    if (!formData.students.trim()) {
      newErrors.students = "Courses' total students  is required!"
    }
    if (!formData.status) {
      newErrors.status = 'Select Status'
    }

    setError(newErrors)

    if (Object.values(newErrors).some(Boolean)) {
      return
    }

    onAdd({
      name: formData.name,
      lecturer: formData.lecturer,
      department: formData.department,
      students: formData.students,
      status: formData.status,
    })

    setFormData({
      name: '',
      lecturer: '',
      department: '',
      students: '',
      status: '',
    })

    setError({
      name: '',
      lecturer: '',
      department: '',
      students: '',
      status: '',
    })

    onClose()
  }

  return (
    <Modal onClose={onClose} labelledBy='add-course-details'>
      <div className='flex items-start justify-between gap-3 border-b border-gray-200 dark:border-gray-700 pb-4 '>
        <div>
          <div className='flex items-center gap-2 mt-1'>
            <PiGraduationCapFill size={20} className='text-black dark:text-white' />
            <h2
              id='add-course-details'
              className='text-xl font-semibold text-black dark:text-white'
            >
              Add Course
            </h2>
          </div>
          <legend className='text-xs '>Enter details to add course to system</legend>
        </div>

        <button
          type='button'
          onClick={onClose}
          aria-label='Close modal'
          className='flex items-center justify-center  p-2 rounded-full text-gray-600 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white transition-all'
        >
          <X className='h-4 w-4' />
        </button>
      </div>

      {/* add course form */}
      <form onSubmit={handleSubmit}>
        <div className='mt-6 space-y-4 '>
          <fieldset>
            <div className='sr-only'>
              <legend className='text-xs '>
                Fill out the form to add course details to system
              </legend>
            </div>

            {/* add course name */}
            <div className='flex flex-col gap-2 mt-1'>
              <label htmlFor='course-name' className='text-xs text-gray-700 dark:text-gray-200'>
                Course Name <span className='text-red-500'>*</span>
              </label>

              <input
                type='text'
                name='course-name'
                id='course-name'
                className='input-box'
                placeholder='Course Name'
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

            {/* add course code */}
            {/*  <div className='flex flex-col gap-2 mt-1'>
              <label htmlFor='course-code' className='text-xs text-gray-700 dark:text-gray-200'>
                Course Code <span className='text-red-500'>*</span>
              </label>

              <input
                type='text'
                name='course-code'
                id='course-code'
                className='input-box'
                placeholder='Course Code'
                value={formData.code}
                onChange={event => {
                  setFormData({
                    ...formData,
                    code: event.target.value,
                  })
                  setError({ ...error, code: '' })
                }}
              />
              {error.code && <p className='text-red-500 text-xs'>{error.code}</p>}
            </div> */}

            {/* Department */}

            <div className='flex flex-col gap-2 mt-1'>
              <label htmlFor='students' className='text-xs text-gray-700 dark:text-gray-200'>
                Department <span className='text-red-500'>*</span>
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
                <option value='' className='dark:bg-gray-800 dark:text-gray-400'>
                  Select Department
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

            {/* add lecturer */}
            <div className='flex flex-col gap-2 mt-1'>
              <label htmlFor='lecturer' className='text-xs text-gray-700 dark:text-gray-200'>
                Lecturer <span className='text-red-500'>*</span>
              </label>

              <input
                type='text'
                name='lecturer'
                id='lecturer'
                className='input-box'
                placeholder='Lecturer'
                value={formData.lecturer}
                onChange={event => {
                  setFormData({
                    ...formData,
                    lecturer: event.target.value,
                  })
                  setError({ ...error, lecturer: '' })
                }}
              />
              {error.lecturer && <p className='text-red-500 text-xs'>{error.lecturer}</p>}
            </div>

            {/* number of students */}
            <div className='flex flex-col gap-2 mt-1'>
              <label htmlFor='students' className='text-xs text-gray-700 dark:text-gray-200'>
                Number of Students reading course <span className='text-red-500'>*</span>
              </label>

              <input
                type='number'
                name='students'
                id='students'
                className='input-box'
                placeholder='100'
                value={formData.students}
                onChange={event => {
                  setFormData({
                    ...formData,
                    students: event.target.value,
                  })
                  setError({ ...error, students: '' })
                }}
              />
              {error.students && <p className='text-red-500 text-xs'>{error.students}</p>}
            </div>

            {/* course status */}

            <div className='flex flex-col gap-2 mt-1'>
              <label htmlFor='students' className='text-xs text-gray-700 dark:text-gray-200'>
                Course Status <span className='text-red-500'>*</span>
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
                <option value='' className='dark:bg-gray-800 dark:text-gray-400'>
                  Select Status
                </option>
                {statuses.map(status => (
                  <option
                    key={status}
                    value={status}
                    className='dark:bg-gray-800 dark:text-gray-400'
                  >
                    {status}
                  </option>
                ))}
              </select>
              {error.status && <p className='text-red-500 text-xs'>{error.status}</p>}
            </div>
          </fieldset>

          {/* footer */}
          <div className='flex gap-3 items-center justify-end'>
            <button className='btn-secondary' type='button' onClick={onClose}>
              Cancel
            </button>
            <button className='btn-primary' type='submit'>
              Add Course
            </button>
          </div>
        </div>
      </form>
    </Modal>
  )
}

export default AddCourseModal
