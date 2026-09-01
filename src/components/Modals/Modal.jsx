const Modal = ({ title, message, btnText, btnDel }) => {
  return (
    <div className='rounded-lg m-3 max-w-lg py-8 px-6 space-y-3 bg-white dark:bg-gray-800 dark:shadow-white/10 shadow-lg hover:shadow-xl'>
      <div className='text-center text-lg my-5 border-b border-gray-200 dark:text-white dark:border-gray-500 font-semibold'>
        {title}
      </div>

      <div className='text-gray-700 dark:text-gray-200 text-center text-md my-5'>{message}</div>

      <div className='flex justify-end'>
        <button className='btn-primary'>Cancel{btnText}</button>
        <button className='btn-primary btn-delete'>{btnDel}</button>
      </div>
    </div>
  )
}

export default Modal
