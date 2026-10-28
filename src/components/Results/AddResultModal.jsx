import { useState } from 'react'
import Modal from '../Modals/Modal'
import { PiStudentFill } from 'react-icons/pi'

const AddResultModal = ({ onClose, onAdd, courses }) => {
  const [formData, setFormData] = useState({
    studentId: '',
    studentName: '',
    course: '',
    courseCode: '',
    assessment: '',
    score: '',
    semester: '',
    academicYear: '',
  })

  const [errors, setErrors] = useState({})

  const handleChange = e => {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))

    setErrors(prev => ({
      ...prev,
      [name]: '',
    }))
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.studentId.trim()) {
      newErrors.studentId = 'Student ID is required.'
    }

    if (!formData.studentName.trim()) {
      newErrors.studentName = 'Student name is required.'
    }

    if (!formData.course) {
      newErrors.course = 'Course is required.'
    }

    if (!formData.courseCode.trim()) {
      newErrors.courseCode = 'Course code is required.'
    }

    if (!formData.assessment) {
      newErrors.assessment = 'Assessment is required.'
    }

    if (formData.score === '') {
      newErrors.score = 'Score is required.'
    } else if (Number(formData.score) < 0 || Number(formData.score) > 100) {
      newErrors.score = 'Score must be between 0 and 100.'
    }

    if (!formData.semester) {
      newErrors.semester = 'Semester is required.'
    }

    if (!formData.academicYear.trim()) {
      newErrors.academicYear = 'Academic year is required.'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (!validate()) return

    onAdd({
      studentId: formData.studentId.trim(),
      studentName: formData.studentName.trim(),
      course: formData.course,
      courseCode: formData.courseCode.trim(),
      assessment: formData.assessment,
      score: Number(formData.score),
      semester: formData.semester,
      academicYear: formData.academicYear.trim(),
    })
  }

  return (
    <Modal onClose={onClose} labelledBy='add-result-title'>
      <div className='max-h-[90vh]'>
        <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-dark/70 text-primary dark:bg-primary/20 dark:text-dark'>
          <PiStudentFill size={22} />
        </div>
        <div className='mb-6 text-center border-b border-gray-200 dark:border-gray-700 pb-3'>
          <h2 id='add-result-title' className='text-xl font-semibold text-primary dark:text-dark'>
            Add Result
          </h2>

          <p className='mt-1 text-sm text-secondary dark:text-gray-400'>
            Enter the student's assessment result.
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-5'>
          {/* Student */}
          <div className='grid gap-4 sm:grid-cols-2'>
            <div>
              <label className='input-label'>Student ID</label>

              <input
                type='text'
                name='studentId'
                value={formData.studentId}
                onChange={handleChange}
                placeholder='e.g. STU-016'
                className='input-box'
              />

              {errors.studentId && <p className='mt-1 text-xs text-red-500'>{errors.studentId}</p>}
            </div>

            <div>
              <label className='input-label'>Student Name</label>

              <input
                type='text'
                name='studentName'
                value={formData.studentName}
                onChange={handleChange}
                placeholder='e.g. John Mensah'
                className='input-box'
              />

              {errors.studentName && (
                <p className='mt-1 text-xs text-red-500'>{errors.studentName}</p>
              )}
            </div>
          </div>

          {/* Course */}
          <div className='grid gap-4 sm:grid-cols-2'>
            <div>
              <label className='input-label'>Course</label>

              <select
                name='course'
                value={formData.course}
                onChange={handleChange}
                className='input-box'
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

            <div>
              <label className='input-label'>Course Code</label>

              <input
                type='text'
                name='courseCode'
                value={formData.courseCode}
                onChange={handleChange}
                placeholder='e.g. COMP-101'
                className='input-box'
              />

              {errors.courseCode && (
                <p className='mt-1 text-xs text-red-500'>{errors.courseCode}</p>
              )}
            </div>
          </div>

          {/* Assessment + Score */}
          <div className='grid gap-4 sm:grid-cols-2'>
            <div>
              <label className='input-label'>Assessment</label>

              <select
                name='assessment'
                value={formData.assessment}
                onChange={handleChange}
                className='input-box'
              >
                <option value=''>Select assessment</option>
                <option value='Mid-Semester Exam'>Mid-Semester Exam</option>
                <option value='Final Examination'>Final Examination</option>
                <option value='Practical Test'>Practical Test</option>
                <option value='Assignment'>Assignment</option>
              </select>

              {errors.assessment && (
                <p className='mt-1 text-xs text-red-500'>{errors.assessment}</p>
              )}
            </div>

            <div>
              <label className='input-label'>Score (%)</label>

              <input
                type='number'
                name='score'
                value={formData.score}
                onChange={handleChange}
                min='0'
                max='100'
                placeholder='0 - 100'
                className='input-box'
              />

              {errors.score && <p className='mt-1 text-xs text-red-500'>{errors.score}</p>}
            </div>
          </div>

          {/* Semester + Academic Year */}
          <div className='grid gap-4 sm:grid-cols-2'>
            <div>
              <label className='mb-1.5 block text-sm font-medium text-primary dark:text-dark'>
                Semester
              </label>

              <select
                name='semester'
                value={formData.semester}
                onChange={handleChange}
                className='input-box'
              >
                <option value=''>Select semester</option>
                <option value='First Semester'>First Semester</option>
                <option value='Second Semester'>Second Semester</option>
              </select>

              {errors.semester && <p className='mt-1 text-xs text-red-500'>{errors.semester}</p>}
            </div>

            <div>
              <label className='mb-1.5 block text-sm font-medium text-primary dark:text-gray-300'>
                Academic Year
              </label>

              <input
                type='text'
                name='academicYear'
                value={formData.academicYear}
                onChange={handleChange}
                placeholder='e.g. 2025/2026'
                className='input-box'
              />

              {errors.academicYear && (
                <p className='mt-1 text-xs text-red-500'>{errors.academicYear}</p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className='flex justify-end gap-3 border-t border-gray-200 py-5 dark:border-gray-700'>
            <button type='button' onClick={onClose} className='btn-secondary'>
              Cancel
            </button>

            <button type='submit' className='btn-primary-2'>
              Add Result
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default AddResultModal
