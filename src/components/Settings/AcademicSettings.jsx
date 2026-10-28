import { LuGraduationCap } from 'react-icons/lu'

const AcademicSettings = ({ academic, onUpdate }) => {
  return (
    <section className='rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-slate-900'>
      <div className='border-b border-gray-200 px-6 py-5 dark:border-gray-700'>
        <div className='flex items-center gap-3'>
          <div className='flex h-10 w-10 items-center justify-center rounded-lg  bg-dark/30 text-primary dark:bg-primary/30 dark:text-dark'>
            <LuGraduationCap size={20} />
          </div>

          <div>
            <h2 className='font-semibold text-primary dark:text-dark'>Academic Preferences</h2>

            <p className='mt-1 text-xs text-secondary dark:text-gray-400'>
              Set the default academic period.
            </p>
          </div>
        </div>
      </div>

      <div className='grid gap-5 p-6 md:grid-cols-2'>
        <div>
          <label className='input-label'>
            Academic Year
          </label>

          <select
            value={academic.academicYear}
            onChange={e =>
              onUpdate({
                academicYear: e.target.value,
              })
            }
            className='input-box'
          >
            <option value='2025/2026'>2025/2026</option>

            <option value='2026/2027'>2026/2027</option>

            <option value='2027/2028'>2027/2028</option>
          </select>
        </div>

        <div>
          <label className='input-label'>
            Semester
          </label>

          <select
            value={academic.semester}
            onChange={e =>
              onUpdate({
                semester: e.target.value,
              })
            }
            className='input-box'
          >
            <option value='First Semester'>First Semester</option>

            <option value='Second Semester'>Second Semester</option>
          </select>
        </div>
      </div>
    </section>
  )
}

export default AcademicSettings
