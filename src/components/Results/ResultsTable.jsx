import {
  LuArrowDown,
  LuArrowUp,
  LuChevronLeft,
  LuChevronRight,
  LuEllipsis,
  LuPencil,
  LuTrash2,
} from 'react-icons/lu'

const ResultsTable = ({
  results,
  resultList,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  onEdit,
  onDelete,
  currentPage,
  setCurrentPage,
  totalPages,
  startIndex,
  endIndex,
  pageNumbers,
}) => {
  const getGrade = score => {
    if (score >= 80) return 'A'
    if (score >= 70) return 'B'
    if (score >= 60) return 'C'
    if (score >= 50) return 'D'
    return 'F'
  }

  const getGradeStyle = grade => {
    if (grade === 'A') {
      return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
    }

    if (grade === 'B') {
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
    }

    if (grade === 'C') {
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
    }

    if (grade === 'D') {
      return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
    }

    return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
  }

  const handleSort = field => {
    if (sortBy === field) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortBy(field)
      setSortOrder('asc')
    }
  }

  const SortIcon = ({ field }) => {
    if (sortBy !== field) {
      return null
    }

    return sortOrder === 'asc' ? (
      <LuArrowUp className='text-xs' />
    ) : (
      <LuArrowDown className='text-xs' />
    )
  }

  /* const formatDate = date => {
    if (!date) return '-'

    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  } */

  return (
    <div className='overflow-hidden rounded-md border border-gray-200 bg-white dark:border-gray-700 dark:bg-slate-900'>
      {/* Desktop Table */}
      <div className='hidden overflow-x-auto md:block'>
        <table className='w-full min-w-250 text-left'>
          <thead className='border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-slate-800'>
            <tr>
              <th className='px-5 py-4 text-xs font-semibold uppercase tracking-wide text-secondary dark:text-gray-400'>
                <button
                  type='button'
                  onClick={() => handleSort('studentName')}
                  className='flex items-center gap-1'
                >
                  Student
                  <SortIcon field='studentName' />
                </button>
              </th>

              <th className='px-5 py-4 text-xs font-semibold uppercase tracking-wide text-secondary dark:text-gray-400'>
                <button
                  type='button'
                  onClick={() => handleSort('course')}
                  className='flex items-center gap-1'
                >
                  Course
                  <SortIcon field='course' />
                </button>
              </th>

              <th className='px-5 py-4 text-xs font-semibold uppercase tracking-wide text-secondary dark:text-gray-400'>
                <button
                  type='button'
                  onClick={() => handleSort('assessment')}
                  className='flex items-center gap-1'
                >
                  Assessment
                  <SortIcon field='assessment' />
                </button>
              </th>

              <th className='px-5 py-4 text-xs font-semibold uppercase tracking-wide text-secondary dark:text-gray-400'>
                <button
                  type='button'
                  onClick={() => handleSort('score')}
                  className='flex items-center gap-1'
                >
                  Score
                  <SortIcon field='score' />
                </button>
              </th>

              <th className='px-5 py-4 text-xs font-semibold uppercase tracking-wide text-secondary dark:text-gray-400'>
                Grade
              </th>

              <th className='px-5 py-4 text-xs font-semibold uppercase tracking-wide text-secondary dark:text-gray-400'>
                Semester
              </th>

              <th className='px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-secondary dark:text-gray-400'>
                Actions
              </th>
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-100 dark:divide-gray-700'>
            {results.map(result => {
              const grade = getGrade(result.score)

              return (
                <tr
                  key={result.id}
                  className='transition hover:bg-gray-50 dark:hover:bg-slate-800/60'
                >
                  <td className='px-5 py-4'>
                    <div>
                      <p className='font-medium text-primary dark:text-white'>
                        {result.studentName}
                      </p>

                      <p className='text-xs text-secondary dark:text-gray-400'>
                        {result.studentId}
                      </p>
                    </div>
                  </td>

                  <td className='px-5 py-4'>
                    <div>
                      <p className='text-sm font-medium text-primary dark:text-white'>
                        {result.course}
                      </p>

                      <p className='text-xs text-secondary dark:text-gray-400'>
                        {result.courseCode}
                      </p>
                    </div>
                  </td>

                  <td className='px-5 py-4 text-sm text-primary dark:text-gray-300'>
                    {result.assessment}
                  </td>

                  <td className='px-5 py-4'>
                    <span className='font-semibold text-primary dark:text-white'>
                      {result.score}%
                    </span>
                  </td>

                  <td className='px-5 py-4'>
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getGradeStyle(
                        grade
                      )}`}
                    >
                      {grade}
                    </span>
                  </td>

                  <td className='px-5 py-4 text-sm text-secondary dark:text-gray-400'>
                    {result.semester}
                  </td>

                  <td className='px-5 py-4'>
                    <div className='flex justify-end gap-2'>
                      <button
                        type='button'
                        onClick={() => onEdit(result)}
                        className='rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-primary dark:text-gray-400 dark:hover:bg-slate-700 dark:hover:text-white'
                        title='Edit result'
                      >
                        <LuPencil />
                      </button>

                      <button
                        type='button'
                        onClick={() => onDelete(result)}
                        className='rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400'
                        title='Delete result'
                      >
                        <LuTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className='divide-y divide-gray-100 md:hidden dark:divide-gray-700'>
        {results.map(result => {
          const grade = getGrade(result.score)

          return (
            <div key={result.id} className='p-4'>
              <div className='flex items-start justify-between gap-4'>
                <div>
                  <p className='font-semibold text-primary dark:text-white'>{result.studentName}</p>

                  <p className='text-xs text-secondary dark:text-gray-400'>{result.studentId}</p>
                </div>

                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getGradeStyle(
                    grade
                  )}`}
                >
                  Grade {grade}
                </span>
              </div>

              <div className='mt-4 grid grid-cols-2 gap-3 text-sm'>
                <div>
                  <p className='text-xs text-secondary dark:text-gray-500'>Course</p>

                  <p className='mt-1 font-medium text-primary dark:text-gray-300'>
                    {result.course}
                  </p>
                </div>

                <div>
                  <p className='text-xs text-secondary dark:text-gray-500'>Score</p>

                  <p className='mt-1 font-semibold text-primary dark:text-white'>{result.score}%</p>
                </div>

                <div>
                  <p className='text-xs text-secondary dark:text-gray-500'>Assessment</p>

                  <p className='mt-1 text-primary dark:text-gray-300'>{result.assessment}</p>
                </div>

                <div>
                  <p className='text-xs text-secondary dark:text-gray-500'>Semester</p>

                  <p className='mt-1 text-primary dark:text-gray-300'>{result.semester}</p>
                </div>

                <div>
                  <p className='text-xs text-secondary dark:text-gray-500'>Academic Year</p>

                  <p className='mt-1 text-primary dark:text-gray-300'>{result.academicYear}</p>
                </div>

                <div>
                  <p className='text-xs text-secondary dark:text-gray-500'>Result ID</p>

                  <p className='mt-1 text-primary dark:text-gray-300'>{result.resultId}</p>
                </div>
              </div>

              <div className='mt-4 flex justify-end gap-2'>
                <button
                  type='button'
                  onClick={() => onEdit(result)}
                  className='flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-secondary transition hover:bg-gray-50 hover:text-primary dark:border-gray-700 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-white'
                >
                  <LuPencil />
                  Edit
                </button>

                <button
                  type='button'
                  onClick={() => onDelete(result)}
                  className='flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-red-600 transition hover:bg-red-50 dark:border-gray-700 dark:hover:bg-red-900/20'
                >
                  <LuTrash2 />
                  Delete
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty State */}
      {results.length === 0 && (
        <div className='px-6 py-12 text-center'>
          <p className='text-sm font-medium text-primary dark:text-white'>No results found</p>

          <p className='mt-1 text-sm text-secondary dark:text-gray-400'>
            Try adjusting your search or filters.
          </p>
        </div>
      )}

      {/* Footer / Pagination */}
      {resultList.length > 0 && (
        <div className='flex flex-col gap-4 border-t border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-gray-700'>
          <p className='text-sm text-secondary dark:text-gray-400'>
            Showing{' '}
            <span className='font-medium text-primary dark:text-white'>{startIndex + 1}</span> to{' '}
            <span className='font-medium text-primary dark:text-white'>
              {Math.min(endIndex, resultList.length)}
            </span>{' '}
            of <span className='font-medium text-primary dark:text-white'>{resultList.length}</span>{' '}
            results
          </p>

          {totalPages > 1 && (
            <div className='flex items-center gap-1'>
              <button
                type='button'
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className='rounded-lg p-2 text-secondary transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-gray-400 dark:hover:bg-slate-800'
              >
                <LuChevronLeft />
              </button>

              {pageNumbers.map((page, index) =>
                page === '...' ? (
                  <span
                    key={`ellipsis-${index}`}
                    className='flex h-9 w-9 items-center justify-center text-secondary dark:text-gray-500'
                  >
                    <LuEllipsis />
                  </span>
                ) : (
                  <button
                    key={page}
                    type='button'
                    onClick={() => setCurrentPage(page)}
                    className={`h-9 w-9 rounded-lg text-sm font-medium transition ${
                      currentPage === page
                        ? 'bg-primary text-white'
                        : 'text-secondary hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800'
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                type='button'
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className='rounded-lg p-2 text-secondary transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-gray-400 dark:hover:bg-slate-800'
              >
                <LuChevronRight />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ResultsTable
