const Modal = ({ children, onClose, labelledBy }) => {
  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4'
      onClick={onClose}
    >
      <div
        role='dialog'
        aria-modal='true'
        aria-labelledby={labelledBy}
        onClick={event => event.stopPropagation()}
        className='w-full max-w-md rounded-lg bg-white p-6 sm:p-8 shadow-xl dark:bg-gray-800'
      >
        {children}
      </div>
    </div>
  )
}

export default Modal
