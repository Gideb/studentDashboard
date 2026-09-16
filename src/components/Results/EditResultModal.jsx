import { useState } from 'react'
import Modal from '../Modals/Modal'
import { PiStudentFill } from 'react-icons/pi'

const EditResultModal = ({ result, onClose, onUpdate, courses }) => {
  const [formData, setFormData] = useState({
    studentId: result.studentId,
    studentName: result.studentName,
    course: result.course,
    courseCode: result.courseCode,
    assessment: result.assessment,
    score: result.score,
    semester: result.semester,
    academicYear: result.academicYear,
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

    onUpdate({
      id: result.id,
      resultId: result.resultId,
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
    <Modal onClose={onClose} labelledBy='edit-result-title'>
      <div className='max-h-[90vh] overflow-y-auto'>
        <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-dark/70 text-primary dark:bg-primary/50 dark:text-dark'>
          <PiStudentFill size={22} />
        </div>
        <div className='mb-6 text-center border-b border-gray-200 dark:border-gray-700 pb-3'>
          <h2 id='edit-result-title' className='text-xl font-semibold text-primary dark:text-white'>
            Edit Result
          </h2>

          <p className='mt-1 text-sm text-secondary dark:text-gray-400'>
            Update the student's result details.
          </p>
        </div>

        <div className='mb-5 rounded-lg bg-gray-50 p-3 dark:bg-slate-800'>
          <p className='text-xs text-secondary dark:text-gray-400'>Result ID</p>

          <p className='mt-1 font-semibold text-primary dark:text-white'>{result.resultId}</p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-5'>
          {/* Student */}
          <div className='grid gap-4 sm:grid-cols-2'>
            <div>
              <label className='mb-1.5 block text-sm font-medium text-primary dark:text-gray-300'>
                Student ID
              </label>

              <input
                type='text'
                name='studentId'
                value={formData.studentId}
                onChange={handleChange}
                className='input-box'
              />

              {errors.studentId && <p className='mt-1 text-xs text-red-500'>{errors.studentId}</p>}
            </div>

            <div>
              <label className='mb-1.5 block text-sm font-medium text-primary dark:text-gray-300'>
                Student Name
              </label>

              <input
                type='text'
                name='studentName'
                value={formData.studentName}
                onChange={handleChange}
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
              <label className='mb-1.5 block text-sm font-medium text-primary dark:text-gray-300'>
                Course
              </label>

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
              <label className='mb-1.5 block text-sm font-medium text-primary dark:text-gray-300'>
                Course Code
              </label>

              <input
                type='text'
                name='courseCode'
                value={formData.courseCode}
                onChange={handleChange}
                className='w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm uppercase outline-none focus:border-primary dark:border-gray-700 dark:bg-slate-800 dark:text-white'
              />

              {errors.courseCode && (
                <p className='mt-1 text-xs text-red-500'>{errors.courseCode}</p>
              )}
            </div>
          </div>

          {/* Assessment + Score */}
          <div className='grid gap-4 sm:grid-cols-2'>
            <div>
              <label className='mb-1.5 block text-sm font-medium text-primary dark:text-gray-300'>
                Assessment
              </label>

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
              <label className='mb-1.5 block text-sm font-medium text-primary dark:text-gray-300'>
                Score (%)
              </label>

              <input
                type='number'
                name='score'
                value={formData.score}
                onChange={handleChange}
                min='0'
                max='100'
                className='input-box'
              />

              {errors.score && <p className='mt-1 text-xs text-red-500'>{errors.score}</p>}
            </div>
          </div>

          {/* Semester + Academic Year */}
          <div className='grid gap-4 sm:grid-cols-2'>
            <div>
              <label className='mb-1.5 block text-sm font-medium text-primary dark:text-gray-300'>
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
                className='input-box'
              />

              {errors.academicYear && (
                <p className='mt-1 text-xs text-red-500'>{errors.academicYear}</p>
              )}
            </div>
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

export default EditResultModal
