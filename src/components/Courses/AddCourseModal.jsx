import { useState } from 'react'
import Modal from '../Modals/Modal'

import { X } from 'lucide-react'
import { PiGraduationCapFill, PiStudentFill } from 'react-icons/pi'

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
      <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-dark/70 text-primary dark:bg-primary/20 dark:text-dark'>
        <PiStudentFill size={22} />
      </div>
      <div className='mb-6 text-center border-b border-gray-200 pb-3'>
        <h2 id='add-course-title' className='text-xl font-semibold text-primary dark:text-dark'>
          Add Course
        </h2>

        <p className='mt-1 text-sm text-secondary dark:text-gray-400'>Enter the course details.</p>
      </div>

      {/* add course form */}
      <form onSubmit={handleSubmit} className='space-y-5'>
        <div className='mt-6  '>
          <div className='sr-only'>
            <legend className='text-xs '>Fill out the form to add course details to system</legend>
          </div>

          {/* add course name */}
          <div className='flex flex-col gap-1 mt-2'>
            <label htmlFor='course-name' className='input-label'>
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
          {/*  <div className='flex flex-col gap-1 mt-2'>
              <label htmlFor='course-code' className='input-label'>
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

          <div className='flex flex-col gap-1 mt-2'>
            <label htmlFor='students' className='input-label'>
              Department <span className='text-red-500'>*</span>
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
          <div className='flex flex-col gap-1 mt-2'>
            <label htmlFor='lecturer' className='input-label'>
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

          <div className='grid sm:grid-cols-2 gap-4'>
            {/* number of students */}
            <div className='flex flex-col gap-1 mt-2'>
              <label htmlFor='students' className='input-label'>
                Students reading course <span className='text-red-500'>*</span>
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

            <div className='flex flex-col gap-1 mt-2'>
              <label htmlFor='students' className='input-label'>
                Course Status <span className='text-red-500'>*</span>
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
          </div>

          {/* footer */}
          <div className='flex gap-3 items-center justify-end mt-6 border-t pt-4 border-gray-400 dark:border-gray-700'>
            <button className='btn-secondary' type='button' onClick={onClose}>
              Cancel
            </button>
            <button className='btn-primary-2' type='submit'>
              Add Course
            </button>
          </div>
        </div>
      </form>
    </Modal>
  )
}

export default AddCourseModal
