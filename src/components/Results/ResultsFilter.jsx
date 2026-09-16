import { LuSearch, LuX } from 'react-icons/lu'

const ResultsFilter = ({
  search,
  setSearch,
  selectedCourse,
  setSelectedCourse,
  selectedAssessment,
  setSelectedAssessment,
  selectedSemester,
  setSelectedSemester,
  selectedAcademicYear,
  setSelectedAcademicYear,
  uniqueCourses,
  uniqueAssessments,
  uniqueSemesters,
  uniqueAcademicYears,
  hasActiveFilters,
  clearFilters,
}) => {
  return (
    <div className='rounded-md border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-slate-900'>
      <div className='flex flex-col gap-4'>
        {/* Search */}
        <div className='relative w-full'>
          <LuSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />

          <input
            type='text'
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder='Search student, result ID, course...'
            className='w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-primary outline-none transition placeholder:text-gray-400 focus:border-primary dark:border-gray-700 dark:bg-slate-800 dark:text-white'
          />
        </div>

        {/* Filters */}
        <div className='flex flex-col gap-3 lg:flex-row lg:items-center'>
          <select
            value={selectedCourse}
            onChange={e => setSelectedCourse(e.target.value)}
            className='rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-primary outline-none focus:border-primary dark:border-gray-700 dark:bg-slate-800 dark:text-white'
          >
            <option value='All'>All Courses</option>

            {uniqueCourses.map(course => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>

          <select
            value={selectedAssessment}
            onChange={e => setSelectedAssessment(e.target.value)}
            className='rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-primary outline-none focus:border-primary dark:border-gray-700 dark:bg-slate-800 dark:text-white'
          >
            <option value='All'>All Assessments</option>

            {uniqueAssessments.map(assessment => (
              <option key={assessment} value={assessment}>
                {assessment}
              </option>
            ))}
          </select>

          <select
            value={selectedSemester}
            onChange={e => setSelectedSemester(e.target.value)}
            className='rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-primary outline-none focus:border-primary dark:border-gray-700 dark:bg-slate-800 dark:text-white'
          >
            <option value='All'>All Semesters</option>

            {uniqueSemesters.map(semester => (
              <option key={semester} value={semester}>
                {semester}
              </option>
            ))}
          </select>

          <select
            value={selectedAcademicYear}
            onChange={e => setSelectedAcademicYear(e.target.value)}
            className='rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-primary outline-none focus:border-primary dark:border-gray-700 dark:bg-slate-800 dark:text-white'
          >
            <option value='All'>All Academic Years</option>

            {uniqueAcademicYears.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          {hasActiveFilters && (
            <button
              type='button'
              onClick={clearFilters}
              className='flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-medium text-secondary transition hover:bg-gray-50 hover:text-primary dark:border-gray-700 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-white'
            >
              <LuX />
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResultsFilter
