import { useState } from 'react'
import Modal from '../Modals/Modal'

const EditAssignmentModal = ({ assignment, onClose, onUpdate, courses, statuses }) => {
  const [formData, setFormData] = useState({
    title: assignment.title,
    course: assignment.course,
    lecturer: assignment.lecturer,
    dueDate: assignment.dueDate,
    submissions: assignment.submissions,
    totalStudents: assignment.totalStudents,
    status: assignment.status,
  })

  const [errors, setErrors] = useState({})

  const handleChange = e => {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Assignment title is required.'
    }

    if (!formData.course) {
      newErrors.course = 'Please select a course.'
    }

    if (!formData.lecturer.trim()) {
      newErrors.lecturer = 'Lecturer name is required.'
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required.'
    }

    if (formData.totalStudents === '' || Number(formData.totalStudents) <= 0) {
      newErrors.totalStudents = 'Total students must be greater than 0.'
    }

    if (formData.submissions === '' || Number(formData.submissions) < 0) {
      newErrors.submissions = 'Submissions cannot be negative.'
    }

    if (Number(formData.submissions) > Number(formData.totalStudents)) {
      newErrors.submissions = 'Submissions cannot exceed total students.'
    }

    if (!formData.status) {
      newErrors.status = 'Please select a status.'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    onUpdate({
      id: assignment.id,
      assignmentId: assignment.assignmentId,
      title: formData.title.trim(),
      course: formData.course,
      lecturer: formData.lecturer.trim(),
      dueDate: formData.dueDate,
      submissions: Number(formData.submissions),
      totalStudents: Number(formData.totalStudents),
      status: formData.status,
    })
  }

  return (
    <Modal onClose={onClose} labelledBy='edit-assignment-title'>
      <div className='max-h-[90vh] overflow-y-auto'>
        {/* Header */}
        <div className='mb-6'>
          <h2
            id='edit-assignment-title'
            className='text-xl font-semibold text-primary dark:text-white'
          >
            Edit Assignment
          </h2>

          <p className='mt-1 text-sm text-secondary dark:text-gray-400'>
            Update the assignment information below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-5'>
          {/* Assignment ID */}
          <div>
            <label
              htmlFor='assignmentId'
              className='mb-1.5 block text-sm font-medium text-primary dark:text-gray-300'
            >
              Assignment ID
            </label>

            <input
              id='assignmentId'
              type='text'
              value={assignment.assignmentId}
              disabled
              className='input-box'
            />
          </div>

          {/* Assignment Title */}
          <div>
            <label
              htmlFor='title'
              className='mb-1.5 block text-sm font-medium text-primary dark:text-gray-300'
            >
              Assignment Title
            </label>

            <input
              id='title'
              name='title'
              type='text'
              value={formData.title}
              onChange={handleChange}
              placeholder='Enter assignment title'
              className={`input-box ${
                errors.title
                  ? 'border-red-500'
                  : 'border-gray-200 focus:border-primary dark:border-gray-700'
              }`}
            />

            {errors.title && <p className='mt-1 text-xs text-red-500'>{errors.title}</p>}
          </div>

          {/* Course */}
          <div>
            <label
              htmlFor='course'
              className='mb-1.5 block text-sm font-medium text-primary dark:text-gray-300'
            >
              Course
            </label>

            <select
              id='course'
              name='course'
              value={formData.course}
              onChange={handleChange}
              className={`input-select ${
                errors.course
                  ? 'border-red-500'
                  : 'border-gray-200 focus:border-primary dark:border-gray-700'
              }`}
            >
              <option value=''>Select course</option>

              {courses.map(course => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>

            {errors.course && <p className='mt-1 text-xs text-red-500'>{errors.course}</p>}
          </div>

          {/* Lecturer */}
          <div>
            <label
              htmlFor='lecturer'
              className='mb-1.5 block text-sm font-medium text-primary dark:text-gray-300'
            >
              Lecturer
            </label>

            <input
              id='lecturer'
              name='lecturer'
              type='text'
              value={formData.lecturer}
              onChange={handleChange}
              placeholder='Enter lecturer name'
              className={`input-box ${
                errors.lecturer
                  ? 'border-red-500'
                  : 'border-gray-200 focus:border-primary dark:border-gray-700'
              }`}
            />

            {errors.lecturer && <p className='mt-1 text-xs text-red-500'>{errors.lecturer}</p>}
          </div>

          {/* Due Date */}
          <div>
            <label
              htmlFor='dueDate'
              className='mb-1.5 block text-sm font-medium text-primary dark:text-gray-300'
            >
              Due Date
            </label>

            <input
              id='dueDate'
              name='dueDate'
              type='date'
              value={formData.dueDate}
              onChange={handleChange}
              className={`input-box ${
                errors.dueDate
                  ? 'border-red-500'
                  : 'border-gray-200 focus:border-primary dark:border-gray-700'
              }`}
            />

            {errors.dueDate && <p className='mt-1 text-xs text-red-500'>{errors.dueDate}</p>}
          </div>

          {/* Student Counts */}
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            {/* Total Students */}
            <div>
              <label
                htmlFor='totalStudents'
                className='mb-1.5 block text-sm font-medium text-primary dark:text-gray-300'
              >
                Total Students
              </label>

              <input
                id='totalStudents'
                name='totalStudents'
                type='number'
                min='1'
                value={formData.totalStudents}
                onChange={handleChange}
                className={`input-box ${
                  errors.totalStudents
                    ? 'border-red-500'
                    : 'border-gray-200 focus:border-primary dark:border-gray-700'
                }`}
              />

              {errors.totalStudents && (
                <p className='mt-1 text-xs text-red-500'>{errors.totalStudents}</p>
              )}
            </div>

            {/* Submissions */}
            <div>
              <label
                htmlFor='submissions'
                className='mb-1.5 block text-sm font-medium text-primary dark:text-gray-300'
              >
                Submissions
              </label>

              <input
                id='submissions'
                name='submissions'
                type='number'
                min='0'
                value={formData.submissions}
                onChange={handleChange}
                className={`input-box ${
                  errors.submissions
                    ? 'border-red-500'
                    : 'border-gray-200 focus:border-primary dark:border-gray-700'
                }`}
              />

              {errors.submissions && (
                <p className='mt-1 text-xs text-red-500'>{errors.submissions}</p>
              )}
            </div>
          </div>

          {/* Status */}
          <div>
            <label
              htmlFor='status'
              className='mb-1.5 block text-sm font-medium text-primary dark:text-gray-300'
            >
              Status
            </label>

            <select
              id='status'
              name='status'
              value={formData.status}
              onChange={handleChange}
              className={`input-select ${
                errors.status
                  ? 'border-red-500'
                  : 'border-gray-200 focus:border-primary dark:border-gray-700'
              }`}
            >
              <option value='' className=''>Select status</option>

              {statuses.map(status => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            {errors.status && <p className='mt-1 text-xs text-red-500'>{errors.status}</p>}
          </div>

          {/* Buttons */}
          <div className='flex justify-end gap-3 border-t border-gray-200 pt-5 dark:border-gray-700'>
            <button type='button' onClick={onClose} className='btn-secondary'>
              Cancel
            </button>

            <button type='submit' className='btn-primary-2'>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default EditAssignmentModal
