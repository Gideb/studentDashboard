import { useState } from 'react'
import Modal from '../Modals/Modal'
import { X } from 'lucide-react'
import { PiGraduationCapFill } from 'react-icons/pi'

const EditCourseModal = ({ onClose, onUpdate, statuses, departments, course }) => {
  const [formData, setFormData] = useState({
    name: course.name || '',
    lecturer: course.lecturer || '',
    department: course.department || '',
    students: course.students || '',
    status: course.status || '',
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

    if (!formData.students) {
      newErrors.students = "Course's total students is required!"
    }

    if (!formData.status) {
      newErrors.status = 'Select Status'
    }

    setError(newErrors)

    if (Object.values(newErrors).some(Boolean)) {
      return
    }

    onUpdate({
      id: course.id,
      name: formData.name,
      lecturer: formData.lecturer,
      department: formData.department,
      students: Number(formData.students),
      status: formData.status,
    })
  }

  return (
    <Modal onClose={onClose} labelledBy='update-course-details'>
      <div className='flex items-start justify-between gap-3 border-b border-gray-200 dark:border-gray-700 pb-4'>
        <div>
          <div className='flex items-center gap-2 mt-1'>
            <PiGraduationCapFill size={20} className='text-black dark:text-white' />

            <h2
              id='update-course-details'
              className='text-lg sm:text-xl font-semibold text-black dark:text-white'
            >
              Edit Course
            </h2>
          </div>

          <p className='text-xs'>Make updates to course details</p>
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

      {/* Update course form */}
      <form onSubmit={handleSubmit}>
        <div className='mt-6 space-y-4'>
          <fieldset className='space-y-4'>
            {/* Course Name */}
            <div className='flex flex-col gap-2'>
              <label htmlFor='course-name' className='text-xs text-gray-700 dark:text-gray-200'>
                Course Name
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

                  setError({
                    ...error,
                    name: '',
                  })
                }}
              />

              {error.name && <p className='text-red-500 text-xs'>{error.name}</p>}
            </div>

            {/* Course Code */}
            <div className='flex flex-col gap-2'>
              <label htmlFor='course-code' className='text-xs text-gray-700 dark:text-gray-200'>
                Course Code
              </label>

              <input
                type='text'
                name='course-code'
                id='course-code'
                className='input-box bg-gray-100 dark:bg-gray-800 cursor-not-allowed'
                value={course.code}
                readOnly
              />

              <p className='text-[11px] text-gray-500 dark:text-gray-400'>
                Course code is generated automatically.
              </p>
            </div>

            {/* Department */}
            <div className='flex flex-col gap-2'>
              <label htmlFor='department' className='text-xs text-gray-700 dark:text-gray-200'>
                Department
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

                  setError({
                    ...error,
                    department: '',
                  })
                }}
              >
                <option value=''>Select Department</option>

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

            {/* Lecturer */}
            <div className='flex flex-col gap-2'>
              <label htmlFor='lecturer' className='text-xs text-gray-700 dark:text-gray-200'>
                Lecturer
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

                  setError({
                    ...error,
                    lecturer: '',
                  })
                }}
              />

              {error.lecturer && <p className='text-red-500 text-xs'>{error.lecturer}</p>}
            </div>

            {/* Number of Students */}
            <div className='flex flex-col gap-2'>
              <label htmlFor='students' className='text-xs text-gray-700 dark:text-gray-200'>
                Number of Students reading course
              </label>

              <input
                type='number'
                name='students'
                id='students'
                min='0'
                className='input-box'
                placeholder='100'
                value={formData.students}
                onChange={event => {
                  setFormData({
                    ...formData,
                    students: event.target.value,
                  })

                  setError({
                    ...error,
                    students: '',
                  })
                }}
              />

              {error.students && <p className='text-red-500 text-xs'>{error.students}</p>}
            </div>

            {/* Course Status */}
            <div className='flex flex-col gap-2'>
              <label htmlFor='status' className='text-xs text-gray-700 dark:text-gray-200'>
                Course Status
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

                  setError({
                    ...error,
                    status: '',
                  })
                }}
              >
                <option value=''>Select Status</option>

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

          {/* Footer */}
          <div className='flex gap-3 items-center justify-end'>
            <button className='btn-secondary' type='button' onClick={onClose}>
              Cancel
            </button>

            <button className='btn-primary' type='submit'>
              Update Course
            </button>
          </div>
        </div>
      </form>
    </Modal>
  )
}

export default EditCourseModal
