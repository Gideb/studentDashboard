import AssignmentCard from '../../components/Cards/AssignmentCard'
import ClassCard from '../../components/Cards/ClassCard'
import StatCard from '../../components/Cards/StatCard'
import { stats, assignments, classes, results } from '../../data/dashboardData'
import { TbReportAnalytics, TbSchoolBell } from 'react-icons/tb'
import { LuBookOpenText } from 'react-icons/lu'
import ResultsTable from '../../components/ResultsTable'
import DashboardLayout from '../../layouts/DashboardLayout'

const Dashboard = () => {
  return (
    <DashboardLayout activeMenu='Dashboard'>
      <main className=' my-5 mx-auto space-y-5 px-2 sm:px-6 py-5 sm:py-8  bg-gray-50 dark:bg-slate-950 rounded-lg'>
        <div className='mb-3 sm:mb-6'>
          <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
            Good morning, John 👋
          </h1>

          <p className='text-gray-500 dark:text-gray-400'>
            Here's what's happening with your studies.
          </p>
        </div>

        {/* statistics */}
        <section>
          <h2 className='sr-only'>Study Statistics</h2>

          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 my-4 sm:my-6 px-3 sm:px-6'>
            {stats.map(stat => (
              <StatCard
                key={stat.title}
                icon={stat.Icon}
                title={stat.title}
                value={stat.value}
                description={stat.description}
              />
            ))}
          </div>
        </section>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {/* recent assignments */}

          <section className='space-y-3 my-4 sm:my-5 px-3 sm:px-6 py-2 sm:py-5 bg-gray-50 dark:bg-slate-950 rounded-lg'>
            <div className='flex items-center justify-start gap-3'>
              <div className='bg-dark dark:bg-primary p-3 rounded-lg'>
                <LuBookOpenText
                  aria-hidden='true'
                  size={22}
                  className='text-primary dark:text-dark'
                />
              </div>

              <h2 className='text-xl font-semibold text-primary dark:text-dark '>
                Recent Assignments
              </h2>
            </div>

            <p className='text-sm text-gray-500'>View your recent assignments.</p>

            <ul className='grid grid-cols-1 gap-4 mt-6'>
              {assignments.map(assignment => (
                <li key={assignment.title}>
                  <AssignmentCard
                    title={assignment.title}
                    subject={assignment.subject}
                    dueDate={assignment.dueDate}
                    status={assignment.status}
                  />
                </li>
              ))}
            </ul>
          </section>

          {/* upcoming classes */}

          <section className='space-y-3 my-4 sm:my-5 px-3 sm:px-6 py-2 sm:py-5 bg-gray-50 dark:bg-slate-950 rounded-lg'>
            <div className='flex items-center justify-start gap-3'>
              <div className='bg-dark dark:bg-primary p-3 rounded-lg'>
                <TbSchoolBell
                  size={22}
                  aria-hidden='true'
                  className='text-primary dark:text-dark'
                />
              </div>

              <h2 className='text-xl text-primary dark:text-dark font-semibold'>
                Upcoming Classes
              </h2>
            </div>

            <p className='text-sm text-gray-500'>Keep up with your classes.</p>

            <ul className='grid grid-cols-1 gap-4 mt-6'>
              {classes.map(aclass => (
                <li key={`${aclass.subject}-${aclass.day}-${aclass.time}`}>
                  <ClassCard
                    subject={aclass.subject}
                    day={aclass.day}
                    time={aclass.time}
                    location={aclass.location}
                  />
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* recent results */}
        <section className='space-y-3 my-4 sm:my-5 px-3 sm:px-6 py-2 sm:py-5 bg-gray-50 dark:bg-slate-950 rounded-lg'>
          <div className='flex items-center justify-start gap-3'>
            <div className='bg-dark dark:bg-primary p-3 rounded-lg'>
              <TbReportAnalytics
                size={22}
                className='text-primary dark:text-dark'
                aria-hidden='true'
              />
            </div>

            <h2 className='text-xl text-primary dark:text-dark font-semibold'>Recent Results</h2>
          </div>

          <p className='text-sm text-gray-500'>Track your most recent academic results.</p>

          <div className='w-full mx-auto overflow-hidden rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm'>
            <table className='w-full text-left'>
              <caption className='sr-only'>
                Recent academic results showing subjects, scores, and grades
              </caption>
              <thead className='bg-gray-200 dark:bg-gray-700'>
                <tr>
                  <th
                    scope='col'
                    className='px-4 sm:px-6 py-4 sm:py-6 text-sm font-semibold tracking-wider uppercase text-primary dark:text-dark'
                  >
                    Subject
                  </th>

                  <th
                    scope='col'
                    className='border-l border-gray-300 dark:border-gray-500 px-4 py-4 sm:py-6 text-sm font-semibold tracking-wider uppercase text-primary dark:text-dark'
                  >
                    Score
                  </th>

                  <th
                    scope='col'
                    className='border-l border-gray-300 dark:border-gray-500 px-4 py-4 sm:py-6 text-sm font-semibold tracking-wider uppercase text-primary dark:text-dark'
                  >
                    Grade
                  </th>
                </tr>
              </thead>

              <tbody>
                {results.map(result => (
                  <ResultsTable
                    key={result.id}
                    subject={result.subject}
                    score={result.score}
                    grade={result.grade}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </DashboardLayout>
  )
}

export default Dashboard
