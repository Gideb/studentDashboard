import {
  LuArrowDown,
  LuArrowUp,
  LuChevronLeft,
  LuChevronRight,
  LuEllipsis,
  LuPencil,
  LuTrash2,
} from 'react-icons/lu'

const AssignmentsTable = ({
  assignments,
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
  // Sorting

  const handleSort = field => {
    if (sortBy === field) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortBy(field)
      setSortOrder('asc')
    }
  }

  const renderSortIcon = field => {
    if (sortBy !== field) {
      return null
    }

    return sortOrder === 'asc' ? (
      <LuArrowUp className='text-xs' />
    ) : (
      <LuArrowDown className='text-xs' />
    )
  }

  // Status Badge

  const getStatusStyle = status => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400'

      case 'In Progress':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400'

      case 'Pending':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400'

      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-500/10 dark:text-gray-400'
    }
  }

  // Submission Percentage

  const getSubmissionPercentage = (submissions, totalStudents) => {
    if (!totalStudents) return 0

    return Math.round((submissions / totalStudents) * 100)
  }

  // Empty State

  if (assignments.length === 0) {
    return (
      <div className='rounded-md border border-gray-200 bg-white p-10 text-center dark:border-gray-700 dark:bg-slate-900'>
        <p className='text-sm text-secondary dark:text-gray-400'>No assignments found.</p>
      </div>
    )
  }

  return (
    <div className='overflow-hidden rounded-md border border-gray-200 bg-white dark:border-gray-700 dark:bg-slate-900'>
      {/* 
          Desktop Table
       */}

      <div className=' overflow-x-auto '>
        <table className='w-full min-w-250'>
          <thead>
            <tr className='border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-slate-800/50'>
              {/* Assignment */}
              <th className='px-6 py-4 text-left'>
                <button
                  type='button'
                  onClick={() => handleSort('title')}
                  className='flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-secondary transition hover:text-primary dark:text-gray-400 dark:hover:text-white'
                >
                  Assignment
                  {renderSortIcon('title')}
                </button>
              </th>

              {/* Course */}
              <th className='px-6 py-4 text-left'>
                <button
                  type='button'
                  onClick={() => handleSort('course')}
                  className='flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-secondary transition hover:text-primary dark:text-gray-400 dark:hover:text-white'
                >
                  Course
                  {renderSortIcon('course')}
                </button>
              </th>

              {/* Lecturer */}
              <th className='px-6 py-4 text-left'>
                <button
                  type='button'
                  onClick={() => handleSort('lecturer')}
                  className='flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-secondary transition hover:text-primary dark:text-gray-400 dark:hover:text-white'
                >
                  Lecturer
                  {renderSortIcon('lecturer')}
                </button>
              </th>

              {/* Due Date */}
              <th className='px-6 py-4 text-left'>
                <button
                  type='button'
                  onClick={() => handleSort('dueDate')}
                  className='flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-secondary transition hover:text-primary dark:text-gray-400 dark:hover:text-white'
                >
                  Due Date
                  {renderSortIcon('dueDate')}
                </button>
              </th>

              {/* Submissions */}
              <th className='px-6 py-4 text-left'>
                <button
                  type='button'
                  onClick={() => handleSort('submissions')}
                  className='flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-secondary transition hover:text-primary dark:hover:text-dark dark:text-gray-400 '
                >
                  Submissions
                  {renderSortIcon('submissions')}
                </button>
              </th>

              {/* Status */}
              <th className='px-6 py-4 text-left'>
                <button
                  type='button'
                  onClick={() => handleSort('status')}
                  className='flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-secondary transition hover:text-primary dark:text-gray-400 dark:hover:text-white'
                >
                  Status
                  {renderSortIcon('status')}
                </button>
              </th>

              {/* Actions */}
              <th className='px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-secondary dark:text-gray-400'>
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {assignments.map(assignment => {
              const submissionPercentage = getSubmissionPercentage(
                assignment.submissions,
                assignment.totalStudents
              )

              return (
                <tr
                  key={assignment.id}
                  className='border-b border-gray-100 last:border-b-0 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-slate-800/40'
                >
                  {/* Assignment */}
                  <td className='px-6 py-4'>
                    <div>
                      <p className='font-medium text-primary dark:text-white'>{assignment.title}</p>

                      <p className='mt-1 text-xs text-secondary dark:text-gray-500'>
                        {assignment.assignmentId}
                      </p>
                    </div>
                  </td>

                  {/* Course */}
                  <td className='px-6 py-4'>
                    <span className='text-sm text-primary dark:text-gray-300'>
                      {assignment.course}
                    </span>
                  </td>

                  {/* Lecturer */}
                  <td className='px-6 py-4'>
                    <span className='text-sm text-primary dark:text-gray-300'>
                      {assignment.lecturer}
                    </span>
                  </td>

                  {/* Due Date */}
                  <td className='px-6 py-4'>
                    <span className='text-sm text-primary dark:text-gray-300'>
                      {assignment.dueDate}
                    </span>
                  </td>

                  {/* Submissions */}
                  <td className='px-6 py-4'>
                    <div className='w-36'>
                      <div className='mb-1 flex items-center justify-between text-xs'>
                        <span className='text-primary dark:text-gray-300'>
                          {assignment.submissions}/{assignment.totalStudents}
                        </span>

                        <span className='text-secondary dark:text-gray-500'>
                          {submissionPercentage}%
                        </span>
                      </div>

                      <div className='h-1.5 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700'>
                        <div
                          className='h-full rounded-full bg-primary dark:bg-dark transition-all'
                          style={{
                            width: `${submissionPercentage}%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className='px-6 py-4'>
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                        assignment.status
                      )}`}
                    >
                      {assignment.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className='px-6 py-4'>
                    <div className='flex justify-end gap-2'>
                      <button
                        type='button'
                        onClick={() => onEdit(assignment)}
                        className='rounded-lg p-2 text-secondary transition hover:bg-gray-100 hover:text-primary dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-white'
                        aria-label={`Edit ${assignment.title}`}
                      >
                        <LuPencil className='text-base' />
                      </button>

                      <button
                        type='button'
                        onClick={() => onDelete(assignment)}
                        className='rounded-lg p-2 text-secondary transition hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-500/10 dark:hover:text-red-400'
                        aria-label={`Delete ${assignment.title}`}
                      >
                        <LuTrash2 className='text-base' />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* 
          Mobile Cards
       */}

      <div className='divide-y divide-gray-100 hidden dark:divide-gray-800'>
        {assignments.map(assignment => {
          const submissionPercentage = getSubmissionPercentage(
            assignment.submissions,
            assignment.totalStudents
          )

          return (
            <div key={assignment.id} className='p-4'>
              <div className='flex items-start justify-between gap-3'>
                <div className='min-w-0'>
                  <p className='font-medium text-primary dark:text-white'>{assignment.title}</p>

                  <p className='mt-1 text-xs text-secondary dark:text-gray-500'>
                    {assignment.assignmentId}
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${getStatusStyle(
                    assignment.status
                  )}`}
                >
                  {assignment.status}
                </span>
              </div>

              <div className='mt-4 grid grid-cols-2 gap-4'>
                <div>
                  <p className='text-xs text-secondary dark:text-gray-500'>Course</p>

                  <p className='mt-1 text-sm text-primary dark:text-gray-300'>
                    {assignment.course}
                  </p>
                </div>

                <div>
                  <p className='text-xs text-secondary dark:text-gray-500'>Due Date</p>

                  <p className='mt-1 text-sm text-primary dark:text-gray-300'>
                    {assignment.dueDate}
                  </p>
                </div>

                <div>
                  <p className='text-xs text-secondary dark:text-gray-500'>Lecturer</p>

                  <p className='mt-1 text-sm text-primary dark:text-gray-300'>
                    {assignment.lecturer}
                  </p>
                </div>

                <div>
                  <p className='text-xs text-secondary dark:text-gray-500'>Submissions</p>

                  <p className='mt-1 text-sm text-primary dark:text-gray-300'>
                    {assignment.submissions}/{assignment.totalStudents}
                  </p>
                </div>
              </div>

              {/* Submission Progress */}
              <div className='mt-4'>
                <div className='mb-1 flex justify-between text-xs'>
                  <span className='text-secondary dark:text-gray-500'>Submission progress</span>

                  <span className='text-primary dark:text-gray-300'>{submissionPercentage}%</span>
                </div>

                <div className='h-1.5 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700'>
                  <div
                    className='h-full rounded-full bg-primary'
                    style={{
                      width: `${submissionPercentage}%`,
                    }}
                  />
                </div>
              </div>

              {/* Mobile Actions */}
              <div className='mt-4 flex justify-end gap-2'>
                <button
                  type='button'
                  onClick={() => onEdit(assignment)}
                  className='flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-primary transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-slate-800'
                >
                  <LuPencil />
                  Edit
                </button>

                <button
                  type='button'
                  onClick={() => onDelete(assignment)}
                  className='flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50 dark:border-red-500/20 dark:text-red-400 dark:hover:bg-red-500/10'
                >
                  <LuTrash2 />
                  Delete
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* 
          Pagination
       */}

      <div className='flex gap-4 border-t border-gray-200 px-4 py-4 flex-row items-center justify-between dark:border-gray-700'>
        <p className='text-sm text-secondary dark:text-gray-400'>
          Showing <span className='font-medium text-primary dark:text-white'>{startIndex + 1}</span>{' '}
          to{' '}
          <span className='font-medium text-primary dark:text-white'>
            {Math.min(endIndex, assignments.length + startIndex)}
          </span>
        </p>

        <div className='flex items-center justify-center gap-1'>
          {/* Previous */}
          <button
            type='button'
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            className='rounded-lg p-2 text-secondary transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-gray-400 dark:hover:bg-slate-800'
            aria-label='Previous page'
          >
            <LuChevronLeft />
          </button>

          {/* Page Numbers */}
          {pageNumbers.map((page, index) => {
            if (page === '...') {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className='flex h-9 w-4 sm:w-9 items-center justify-center text-xs sm:text-sm text-secondary dark:text-gray-500'
                >
                  <LuEllipsis />
                </span>
              )
            }

            return (
              <button
                key={page}
                type='button'
                onClick={() => setCurrentPage(page)}
                className={`h-9 min-w-4 sm:min-w-9 rounded-lg px-2 text-xs sm:text-sm font-medium transition ${
                  currentPage === page
                    ? 'bg-primary dark:bg-dark dark:text-primary text-white'
                    : 'text-secondary hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800'
                }`}
              >
                {page}
              </button>
            )
          })}

          {/* Next */}
          <button
            type='button'
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            className='rounded-lg p-2 text-secondary transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-gray-400 dark:hover:bg-slate-800'
            aria-label='Next page'
          >
            <LuChevronRight />
          </button>
        </div>
      </div>
    </div>
  )
}

export default AssignmentsTable
