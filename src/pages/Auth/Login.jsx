import { useState } from 'react'
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react'
import toast from 'react-hot-toast'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { login } = useAuth()

  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = event => {
    const { name, value } = event.target
    setFormData(previous => ({ ...previous, [name]: value }))
    setErrors(previous => ({ ...previous, [name]: '' }))
  }

  const handleSubmit = event => {
    event.preventDefault()

    const nextErrors = {}

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = 'Enter a valid email address.'
    }

    if (!formData.password) {
      nextErrors.password = 'Enter your password.'
    }

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length) {
      return
    }

    const result = login(formData.email, formData.password)

    if (!result.success) {
      setErrors({
        email: result.error,
        password: result.error,
      })

      return
    }

    toast.success('Welcome back!')
    navigate(location.state?.from?.pathname || '/dashboard', {
      replace: true,
    })
  }

  return (
    <div>
      <p className='mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#a45a36]'>
        Welcome back
      </p>
      <h2 className='text-3xl font-semibold tracking-normal text-[#173b35]'>Sign in</h2>
      <p className='mt-2 text-sm leading-6 text-slate-600'>
        Pick up where you left off in your school workspace.
      </p>

      <form onSubmit={handleSubmit} noValidate className='mt-8 space-y-5'>
        <div>
          <label htmlFor='login-email' className='mb-2 block text-xs font-semibold text-[#173b35]'>
            Email address
          </label>
          <div className='relative'>
            <Mail
              size={17}
              aria-hidden='true'
              className='pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400'
            />
            <input
              id='login-email'
              name='email'
              type='email'
              autoComplete='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='you@school.edu'
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'login-email-error' : undefined}
              className='w-full rounded-sm border border-[#d8d8cf] bg-white py-3 pl-10 pr-3 text-sm text-slate-900 outline-none transition focus:border-[#a45a36] focus:ring-2 focus:ring-[#a45a36]/15'
            />
          </div>
          {errors.email && (
            <p id='login-email-error' role='alert' className='mt-1.5 text-xs text-red-700'>
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <div className='mb-2 flex items-center justify-between gap-3'>
            <label htmlFor='login-password' className='block text-xs font-semibold text-[#173b35]'>
              Password
            </label>
            <button
              type='button'
              onClick={() =>
                toast('Password reset will be available when authentication is connected.')
              }
              className='text-xs font-medium text-[#8b4a2d] underline decoration-[#8b4a2d]/40 underline-offset-4 hover:text-[#63331f]'
            >
              Forgot password?
            </button>
          </div>
          <div className='relative'>
            <LockKeyhole
              size={17}
              aria-hidden='true'
              className='pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400'
            />
            <input
              id='login-password'
              name='password'
              type={showPassword ? 'text' : 'password'}
              autoComplete='current-password'
              value={formData.password}
              onChange={handleChange}
              placeholder='Enter your password'
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? 'login-password-error' : undefined}
              className='w-full rounded-sm border border-[#d8d8cf] bg-white py-3 pl-10 pr-11 text-sm text-slate-900 outline-none transition focus:border-[#a45a36] focus:ring-2 focus:ring-[#a45a36]/15'
            />
            <button
              type='button'
              onClick={() => setShowPassword(value => !value)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className='absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-slate-500 hover:text-[#173b35] focus-visible:outline-2 focus-visible:outline-[#a45a36]'
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
          {errors.password && (
            <p id='login-password-error' role='alert' className='mt-1.5 text-xs text-red-700'>
              {errors.password}
            </p>
          )}
        </div>

        <button
          type='submit'
          className='group flex w-full items-center justify-between rounded-sm bg-[#8b4329] px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-[#71361f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b4329]'
        >
          Sign in to your account
          <ArrowRight
            size={17}
            aria-hidden='true'
            className='transition-transform group-hover:translate-x-1'
          />
        </button>
      </form>

      <p className='mt-7 text-center text-sm text-slate-600'>
        New to SMD?{' '}
        <Link
          to='/signup'
          className='font-semibold text-[#8b4329] underline decoration-[#8b4329]/40 underline-offset-4 hover:text-[#63331f]'
        >
          Create an account
        </Link>
      </p>

      <p className='mt-8 border-t border-[#dedbd2] pt-4 text-center text-[11px] leading-5 text-slate-500'>
        Demo mode · Your account is stored locally in this browser.
      </p>
    </div>
  )
}

export default Login
