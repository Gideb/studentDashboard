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
        className='rounded-lg sm:p-8 w-full max-w-lg h-auto max-h-[90vh] overflow-y-auto bg-white p-6 shadow-xl dark:bg-gray-900'
      >
        {children}
      </div>
    </div>
  )
}

export default Modal
