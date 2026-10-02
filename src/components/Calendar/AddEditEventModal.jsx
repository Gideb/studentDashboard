import { useState } from 'react'
import Modal from '../Modals/Modal'
import { MdEventAvailable } from 'react-icons/md'
import toast from 'react-hot-toast'

const initialForm = {
  title: '',
  type: 'Class',
  course: '',
  lecturer: '',
  date: '',
  startTime: '',
  endTime: '',
  location: '',
  description: '',
}

const eventTypes = ['Class', 'Deadline', 'Exam', 'Meeting', 'Event']

const AddEditEventModal = props => {
  if (!props.isOpen) {
    return null
  }

  return <AddEditEventModalContent key={`${props.mode}-${props.event?.id ?? 'new'}`} {...props} />
}

const AddEditEventModalContent = ({ onClose, onAdd, event = null, mode = 'add' }) => {
  const [formData, setFormData] = useState(() => {
    if (!event) {
      return initialForm
    }

    return {
      title: event.title || '',
      type: event.type || 'Class',
      course: event.course || '',
      lecturer: event.lecturer || '',
      date: event.date || '',
      startTime: event.startTime || '',
      endTime: event.endTime || '',
      location: event.location || '',
      description: event.description || '',
    }
  })
  const [errors, setErrors] = useState({})

  const isEditMode = mode === 'edit'

  const handleClose = () => {
    setErrors({})
    onClose()
  }

  const handleChange = e => {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))

    setErrors(prev => {
      const nextErrors = { ...prev }
      delete nextErrors[name]

      if (name === 'startTime' || name === 'endTime') {
        delete nextErrors.endTime
      }

      return nextErrors
    })
  }

  const validateForm = () => {
    const nextErrors = {}

    if (!formData.title.trim()) nextErrors.title = 'Title is required.'
    if (!eventTypes.includes(formData.type)) nextErrors.type = 'Select a valid event type.'
    if (!formData.course.trim()) nextErrors.course = 'Course is required.'
    if (!formData.lecturer.trim()) nextErrors.lecturer = 'Lecturer is required.'
    if (!formData.date) nextErrors.date = 'Date is required.'
    if (!formData.startTime) nextErrors.startTime = 'Start time is required.'
    if (!formData.endTime) {
      nextErrors.endTime = 'End time is required.'
    } else if (formData.startTime && formData.endTime <= formData.startTime) {
      nextErrors.endTime = 'End time must be later than start time.'
    }
    if (!formData.location.trim()) nextErrors.location = 'Location is required.'

    return nextErrors
  }

  const handleSubmit = e => {
    e.preventDefault()

    const nextErrors = validateForm()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    if (isEditMode) {
      onAdd({
        ...event,
        ...formData,
      })
    } else {
      onAdd(formData)
    }

    handleClose()
    toast.success(isEditMode ? 'Event updated successfully!' : 'Event added successfully!')
  }

  return (
    <Modal onClose={handleClose} labelledBy='add-event-details'>
      {/* Header */}

      <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-dark/70 text-primary dark:bg-primary/20 dark:text-dark'>
        <MdEventAvailable size={22} />
      </div>
      <div className='mb-6 text-center border-b border-gray-200 dark:border-gray-700 pb-3'>
        <h2 id='add-event-title' className='text-xl font-semibold text-primary dark:text-dark'>
          {isEditMode ? 'Edit Event' : 'Add Event'}
        </h2>

        <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
          Add a class, exam, deadline or other calendar event.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className='space-y-5'>
        {/* Title */}
        <div>
          <label htmlFor='event-title' className='input-label'>
            Title
          </label>

          <input
            id='event-title'
            name='title'
            type='text'
            value={formData.title}
            onChange={handleChange}
            placeholder='e.g. Web Development Class'
            required
            className='input-box'
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? 'event-title-error' : undefined}
          />
          {errors.title && (
            <p id='event-title-error' role='alert' className='mt-1 text-xs text-red-600'>
              {errors.title}
            </p>
          )}
        </div>

        {/* Type + Course */}
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <div>
            <label htmlFor='event-type' className='input-label'>
              Type
            </label>

            <select
              id='event-type'
              name='type'
              value={formData.type}
              onChange={handleChange}
              required
              className='input-box'
              aria-invalid={Boolean(errors.type)}
              aria-describedby={errors.type ? 'event-type-error' : undefined}
            >
              {eventTypes.map(type => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.type && (
              <p id='event-type-error' role='alert' className='mt-1 text-xs text-red-600'>
                {errors.type}
              </p>
            )}
          </div>

          <div>
            <label htmlFor='event-course' className='input-label'>
              Course
            </label>

            <input
              id='event-course'
              name='course'
              type='text'
              value={formData.course}
              onChange={handleChange}
              placeholder='e.g. Web Development'
              required
              className='input-box'
              aria-invalid={Boolean(errors.course)}
              aria-describedby={errors.course ? 'event-course-error' : undefined}
            />
            {errors.course && (
              <p id='event-course-error' role='alert' className='mt-1 text-xs text-red-600'>
                {errors.course}
              </p>
            )}
          </div>
        </div>

        {/* Lecturer */}
        <div>
          <label htmlFor='event-lecturer' className='input-label'>
            Lecturer
          </label>

          <input
            id='event-lecturer'
            name='lecturer'
            type='text'
            value={formData.lecturer}
            onChange={handleChange}
            placeholder='e.g. Mr. Daniel Mensah'
            required
            className='input-box'
            aria-invalid={Boolean(errors.lecturer)}
            aria-describedby={errors.lecturer ? 'event-lecturer-error' : undefined}
          />
          {errors.lecturer && (
            <p id='event-lecturer-error' role='alert' className='mt-1 text-xs text-red-600'>
              {errors.lecturer}
            </p>
          )}
        </div>

        {/* Date + Times */}
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
          <div>
            <label htmlFor='event-date' className='input-label'>
              Date
            </label>

            <input
              id='event-date'
              name='date'
              type='date'
              value={formData.date}
              onChange={handleChange}
              required
              className='input-box'
              aria-invalid={Boolean(errors.date)}
              aria-describedby={errors.date ? 'event-date-error' : undefined}
            />
            {errors.date && (
              <p id='event-date-error' role='alert' className='mt-1 text-xs text-red-600'>
                {errors.date}
              </p>
            )}
          </div>

          <div>
            <label htmlFor='event-start-time' className='input-label'>
              Start Time
            </label>

            <input
              id='event-start-time'
              name='startTime'
              type='time'
              value={formData.startTime}
              onChange={handleChange}
              required
              className='input-box'
              aria-invalid={Boolean(errors.startTime)}
              aria-describedby={errors.startTime ? 'event-start-time-error' : undefined}
            />
            {errors.startTime && (
              <p id='event-start-time-error' role='alert' className='mt-1 text-xs text-red-600'>
                {errors.startTime}
              </p>
            )}
          </div>

          <div>
            <label htmlFor='event-end-time' className='input-label'>
              End Time
            </label>

            <input
              id='event-end-time'
              name='endTime'
              type='time'
              value={formData.endTime}
              onChange={handleChange}
              required
              className='input-box'
              aria-invalid={Boolean(errors.endTime)}
              aria-describedby={errors.endTime ? 'event-end-time-error' : undefined}
            />
            {errors.endTime && (
              <p id='event-end-time-error' role='alert' className='mt-1 text-xs text-red-600'>
                {errors.endTime}
              </p>
            )}
          </div>
        </div>

        {/* Location */}
        <div>
          <label htmlFor='event-location' className='input-label'>
            Location
          </label>

          <input
            id='event-location'
            name='location'
            type='text'
            value={formData.location}
            onChange={handleChange}
            placeholder='e.g. Computer Lab 1'
            required
            className='input-box'
            aria-invalid={Boolean(errors.location)}
            aria-describedby={errors.location ? 'event-location-error' : undefined}
          />
          {errors.location && (
            <p id='event-location-error' role='alert' className='mt-1 text-xs text-red-600'>
              {errors.location}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label htmlFor='event-description' className='input-label'>
            Description
          </label>

          <textarea
            id='event-description'
            name='description'
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder='Add any additional information about this event...'
            required
            className='w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 outline-none focus:border-primary dark:focus:border-dark dark:border-gray-700 dark:bg-slate-800 placeholder:text-xs'
          />
        </div>

        {/* Actions */}
        <div className='flex flex-col-reverse gap-3 border-t border-gray-200 pt-5 dark:border-gray-700 sm:flex-row sm:justify-end'>
          <button type='button' onClick={handleClose} className='btn-secondary'>
            Cancel
          </button>

          <button type='submit' className='btn-primary-2'>
            {isEditMode ? 'Save Changes' : 'Add Event'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default AddEditEventModal
