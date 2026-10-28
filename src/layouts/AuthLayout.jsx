import { Outlet } from 'react-router-dom'
import smdLogo from '../assets/images/smd-logo-dark.png'

const AuthLayout = () => {
  return (
    <main className='min-h-screen bg-[#f7f5ef] text-[#173b35] lg:grid lg:grid-cols-[minmax(350px,0.88fr)_1.12fr]'>
      <aside className='auth-brand-panel relative flex min-h-[250px] flex-col overflow-hidden px-6 py-7 text-[#f8f5eb] sm:px-10 sm:py-9 lg:min-h-screen lg:px-14 lg:py-12'>
        <div className='relative z-10 flex items-center'>
          <img src={smdLogo} alt='SMD, School Management Dashboard' className='w-28 sm:w-32' />
          <span className='ml-4 h-9 border-l border-white/25' aria-hidden='true' />
          <span className='ml-4 text-[10px] font-semibold uppercase leading-relaxed tracking-[0.18em] text-white/65'>
            School
            <br />
            Management
          </span>
        </div>

        <div className='relative z-10 mt-10 max-w-lg lg:mt-auto lg:pb-16'>
          <p className='mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e8b980]'>
            Academic operations, in focus
          </p>
          <h1 className='max-w-md text-3xl font-semibold leading-tight sm:text-4xl'>
            A clearer view of every school day.
          </h1>
          <p className='mt-4 max-w-sm text-sm leading-6 text-white/70'>
            Keep courses, assignments, results and schedules moving together in one place.
          </p>
          <div className='mt-8 hidden items-center gap-3 text-[10px] font-medium uppercase tracking-[0.16em] text-white/55 lg:flex'>
            <span className='h-px w-8 bg-[#e8b980]' />
            Built for the rhythm of learning
          </div>
        </div>

        <div className='relative z-10 mt-6 flex items-center justify-between border-t border-white/15 pt-4 text-[10px] uppercase tracking-[0.14em] text-white/50 lg:absolute lg:bottom-7 lg:left-14 lg:right-14 lg:mt-0'>
          <span>SMD · School Management Dashboard</span>
          <span className='hidden sm:inline'>Learn / Lead / Grow</span>
        </div>
      </aside>

      <section className='flex min-h-[calc(100vh-250px)] items-center justify-center px-5 py-12 sm:px-10 lg:min-h-screen lg:px-12'>
        <div className='auth-enter w-full max-w-[430px]'>
          <Outlet />
        </div>
      </section>
    </main>
  )
}

export default AuthLayout
