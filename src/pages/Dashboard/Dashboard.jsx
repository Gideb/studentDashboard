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
      <div className=' my-5 mx-auto space-y-5 px-6 py-8  bg-gray-50 dark:bg-slate-950 rounded-lg'>
        <div className='mb-6'>
          <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
            Good morning, John 👋
          </h1>

          <p className='text-gray-500 dark:text-gray-400'>
            Here's what's happening with your studies.
          </p>
        </div>

        {/* statistics */}
        <div className='grid grid-cols-1 gap-4 md:grid-cols-3 my-6 px-6'>
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

        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          {/* recent assignments */}
          <div className='space-y-4 my-3 px-6 py-8 bg-gray-50 dark:bg-slate-950 rounded-lg'>
            <div className='flex items-center justify-start gap-3'>
              <div className='bg-dark dark:bg-primary p-3 rounded-lg'>
                <LuBookOpenText size={22} className='text-primary dark:text-dark' />
              </div>

              <h3 className='text-xl font-semibold text-primary dark:text-dark '>
                Recent Assignments
              </h3>
            </div>

            <div className='grid grid-cols-1 gap-4 mt-6'>
              {assignments.map(assignment => (
                <AssignmentCard
                  key={assignment.title}
                  title={assignment.title}
                  subject={assignment.subject}
                  dueDate={assignment.dueDate}
                  status={assignment.status}
                />
              ))}
            </div>
          </div>

          {/* upcoming classes */}
          <div className='space-y-4 my-3 px-6  py-8  bg-gray-50 dark:bg-slate-950 rounded-lg'>
            <div className='flex items-center justify-start gap-3'>
              <div className='bg-dark dark:bg-primary p-3 rounded-lg'>
                <TbSchoolBell size={22} className='text-primary dark:text-dark' />
              </div>

              <h3 className='text-xl text-primary dark:text-dark font-semibold'>
                Upcoming Classes
              </h3>
            </div>

            <div className='grid grid-cols-1 gap-4  mt-6'>
              {classes.map(aclass => (
                <ClassCard
                  key={`${aclass.subject}-${aclass.day}-${aclass.time}`}
                  subject={aclass.subject}
                  day={aclass.day}
                  time={aclass.time}
                  location={aclass.location}
                />
              ))}
            </div>
          </div>
        </div>

        {/* recent results */}
        <div className='space-y-4 my-3 px-6  py-8  bg-gray-50 dark:bg-slate-950 rounded-lg'>
          <div className='flex items-center justify-start gap-3'>
            <div className='bg-dark dark:bg-primary p-3 rounded-lg'>
              <TbReportAnalytics size={22} className='text-primary dark:text-dark' />
            </div>

            <h3 className='text-xl text-primary dark:text-dark font-semibold'>Recent Results</h3>
          </div>

          <div className='w-full  mx-auto overflow-hidden rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm'>
            {/* <div className='grid grid-cols-3 bg-teal-50 dark:bg-teal-950 border-b border-gray-300 dark:border-gray-700 py-3 px-6 text-left'>
            <h3 className='text-sm font-semibold tracking-wider uppercase text-teal-900 dark:text-teal-200'>
              Subject
            </h3>
            <h3 className='text-sm font-semibold tracking-wider uppercase text-teal-900 dark:text-teal-200'>
              Score
            </h3>
            <h3 className='text-sm font-semibold tracking-wider uppercase text-teal-900 dark:text-teal-200'>
              Grade
            </h3>
          </div> */}

            <table className='w-full text-left'>
              <thead className='bg-gray-200 dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700 py-6 px-6 text-left'>
                <tr className='grid grid-cols-3 py-5 px-6 text-left'>
                  <th className='text-md font-semibold tracking-wider uppercase text-primary dark:text-dark '>
                    Subject
                  </th>
                  <th className='text-md font-semibold tracking-wider uppercase text-primary dark:text-dark border-l border-gray-300 dark:border-gray-700 pl-4'>
                    Score
                  </th>
                  <th className='text-md font-semibold tracking-wider uppercase text-primary dark:text-dark border-l border-gray-300 dark:border-gray-700 pl-4'>
                    Grade
                  </th>
                </tr>
              </thead>
            </table>

            <div className=''>
              {results.map(result => (
                <ResultsTable
                  key={result.id}
                  subject={result.subject}
                  score={result.score}
                  grade={result.grade}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard
