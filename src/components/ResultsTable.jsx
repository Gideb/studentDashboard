const ResultsTable = ({ subject, score, grade }) => {
  return (
    <tr className='border-b border-gray-300 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800'>
      <td className='px-6 py-4 font-medium text-gray-900 dark:text-white'>{subject}</td>

      <td className='border-l border-gray-300 dark:border-gray-700 px-4 py-4'>{score}%</td>

      <td className='border-l border-gray-300 dark:border-gray-700 px-4 py-4'>
        <span className='inline-flex items-center rounded-lg bg-dark px-2.5 py-0.5 text-xs font-medium text-primary dark:bg-primary dark:text-dark'>
          {grade}
        </span>
      </td>
    </tr>
  )
}

export default ResultsTable
