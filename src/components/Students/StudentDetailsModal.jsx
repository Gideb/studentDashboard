import Modal from '../Modals/Modal'

const StudentDetailsModal = ({ student, onClose }) => {
  if (!student) return null

  return (
    <Modal onClose={onClose}>
      {/* HEADER */}
      <div className='flex items-start justify-between gap-4 border-b border-gray-200 dark:border-gray-700 pb-4'>
        <div>
          <h2
            id='student-details-title'
            className='text-xl font-bold text-gray-900 dark:text-white'
          >
            Student Details
          </h2>

          <p className='mt-1 text-sm text-gray-500 dark:text-gray-400 sr-only'>
            View information about this student.
          </p>
        </div>

        <button
          type='button'
          onClick={onClose}
          aria-label='Close student details'
          className='text-2xl leading-none text-gray-400 hover:text-gray-700 dark:hover:text-white'
        >
          &times;
        </button>
      </div>

      {/* STUDENT INFORMATION */}
      <div className='mt-6 space-y-4'>
        <div>
          <p className='text-xs font-semibold uppercase tracking-wide text-gray-400'>
            Student Name
          </p>

          <p className='mt-1 text-base font-medium text-gray-900 dark:text-white'>{student.name}</p>
        </div>

        <div>
          <p className='text-xs font-semibold uppercase tracking-wide text-gray-400'>Student ID</p>

          <p className='mt-1 text-sm text-gray-700 dark:text-gray-300'>{student.studentId}</p>
        </div>

        <div>
          <p className='text-xs font-semibold uppercase tracking-wide text-gray-400'>Class</p>

          <p className='mt-1 text-sm text-gray-700 dark:text-gray-300'>{student.class}</p>
        </div>

        <div>
          <p className='text-xs font-semibold uppercase tracking-wide text-gray-400'>Status</p>

          <span
            className={`mt-1 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
              student.status === 'Active'
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
            }`}
          >
            <span className='h-1.5 w-1.5 rounded-full bg-current' />
            {student.status}
          </span>
        </div>
      </div>

      {/* FOOTER */}
      <div className='mt-6 flex justify-end border-t border-gray-200 dark:border-gray-700 pt-4'>
        <button type='button' onClick={onClose} className='btn-secondary'>
          Close
        </button>
      </div>
    </Modal>
  )
}

export default StudentDetailsModal
