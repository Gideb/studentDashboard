import Modal from '../Modals/Modal'

const AddStudentModal = ({  onClose, onAdd }) => {
  

  return (
    <Modal onClose={onClose} labelledBy='delete-student-details'>
      {/* header */}
      <div className='flex items-start justify-between gap-4 border-b border-gray-200 dark:border-gray-700 pb-4'>
        <div>
          <h2
            id='delete-student-details'
            className='text-xl font-bold text-gray-900 dark:text-white'
          >
            Add Student
          </h2>
        </div>

        <button
          type='button'
          onClick={onClose}
          aria-label='Close delete modal'
          className='text-2xl leading-none text-gray-400 hover:text-gray-700 dark:hover:text-white'
        >
          &times;
        </button>
      </div>

      {/* delete student */}

      <div className='mt-6 space-y-4'>
        <p className='mt-1 text-sm text-gray-800 dark:text-gray-200 '>
          Are you sure you want to delete this student's record?
        </p>

        <div>
          <p className='mt-1 text-base font-medium text-gray-900 dark:text-white'></p>

          <p className=' text-base font-medium text-gray-900 dark:text-white'>
            <span className='font-normal text-gray-700'> Student ID: </span> 
          </p>
        </div>

        <p className='mt-1 text-sm text-gray-800 dark:text-gray-200 '>
          This action cannot be undone.
        </p>
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
        <button
          aria-label='Add student'
          type='button'
          onClick={onAdd}
          className='btn-primary'
        >
          Add Student
        </button>
      </div>
    </Modal>
  )
}

export default AddStudentModal
