import { useState } from 'react'
import Modal from '../Modals/Modal'
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
      <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-dark/70 text-primary dark:bg-primary/20 dark:text-dark'>
        <PiGraduationCapFill size={22} />
      </div>
      <div className='mb-6 text-center border-b border-gray-200 dark:border-gray-700 pb-3'>
        <h2 id='add-assignment-title' className='text-xl font-semibold text-primary dark:text-dark'>
          Edit Course
        </h2>

        <p className='mt-1 text-sm text-secondary dark:text-gray-400'>Update course details</p>
      </div>

      {/* Update course form */}
      <form onSubmit={handleSubmit} className='space-y-5'>
        <div className='mt-6'>
          {/* Course Code */}

          <div className='mb-5 rounded-lg bg-gray-50 p-3 dark:bg-slate-800'>
            <p className='text-xs text-secondary dark:text-gray-400'>Course Code</p>

            <p className='mt-1 font-medium text-sm text-primary/50 dark:text-white/50'>
              {course.code}
            </p>
          </div>

          {/* Course Name */}
          <div className='flex flex-col gap-1 mt-2'>
            <label htmlFor='course-name' className='input-label'>
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

          {/* Department */}
          <div className='flex flex-col gap-1 mt-2'>
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
          <div className='flex flex-col gap-1 mt-2'>
            <label htmlFor='lecturer' className='input-label'>
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

          <div className='grid grid-cols-2 gap-4'>
            {/* Number of Students */}
            <div className='flex flex-col gap-1 mt-2'>
              <label htmlFor='students' className='input-label'>
                Students reading course
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
            <div className='flex flex-col gap-1 mt-2'>
              <label htmlFor='status' className='input-label'>
                Course Status
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
          </div>

          {/* Footer */}
          <div className='flex gap-3 items-center justify-end mt-6 pt-4 border-t border-gray-400 dark:border-gray-700'>
            <button className='btn-secondary' type='button' onClick={onClose}>
              Cancel
            </button>

            <button className='btn-primary-2' type='submit'>
              Update Course
            </button>
          </div>
        </div>
      </form>
    </Modal>
  )
}

export default EditCourseModal
