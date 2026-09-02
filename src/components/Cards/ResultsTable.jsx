const ResultsTable = ({ subject, score, grade }) => {
  return (
    <>
      {/*     <div className='grid grid-cols-3 items-center border-b border-gray-300 px-6 py-4 text-sm text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800'>

      <div className='font-medium text-gray-900 dark:text-white'>
        {subject}
      </div>

      <div>
        {score}%
      </div>

      <div>
        <span className='inline-flex items-center rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-medium text-teal-800 dark:bg-teal-900 dark:text-teal-200'>
          {grade}
        </span>
      </div>

    </div> */}

      <table className='w-full text-left'>
        <tbody className='border-b border-gray-300 px-6 py-4 text-sm text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800'>
          <tr className='grid grid-cols-3 items-center px-6 py-4 text-sm text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800'>
            <td className='font-medium text-gray-900 dark:text-white'>{subject}</td>

            <td className='border-l border-gray-300 dark:border-gray-700 pl-4'>{score}%</td>

            <td className='border-l border-gray-300 dark:border-gray-700 pl-4'>
              <span className='inline-flex items-center rounded-lg bg-dark px-2.5 py-0.5 text-xs font-medium text-primary dark:bg-primary dark:text-dark'>
                {grade}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default ResultsTable
