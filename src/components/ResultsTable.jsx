const ResultsTable = ({ subject, score, grade }) => {
  return (
    <tr className='border-b border-gray-300 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800'>
      <td className='px-4 py-5 font-medium text-gray-900 dark:text-white'>{subject}</td>

      <td className=' px-4 py-5'>{score}%</td>

      <td className=' px-4 py-5'>
        <span className='inline-flex items-center rounded-lg bg-dark px-2.5 py-0.5 text-xs font-medium text-primary dark:bg-primary dark:text-dark'>
          {grade}
        </span>
      </td>
    </tr>
  )
}

export default ResultsTable
