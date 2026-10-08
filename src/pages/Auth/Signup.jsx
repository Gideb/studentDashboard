import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, UserRound } from 'lucide-react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Signup = () => {
  const navigate = useNavigate()
  const { signup } = useAuth()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    previewAcknowledged: false,
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleChange = event => {
    const { name, value, type, checked } = event.target
    setFormData(previous => ({ ...previous, [name]: type === 'checkbox' ? checked : value }))
    setErrors(previous => {
      const nextErrors = { ...previous, [name]: '' }

      if (name === 'password' || name === 'confirmPassword') {
        nextErrors.confirmPassword = ''
      }

      return nextErrors
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    const nextErrors = {}

    if (!formData.name.trim()) nextErrors.name = 'Enter your full name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = 'Enter a valid email address.'
    }
    if (formData.password.length < 8) nextErrors.password = 'Use at least 8 characters.'
    if (!formData.confirmPassword) {
      nextErrors.confirmPassword = 'Confirm your password.'
    } else if (formData.confirmPassword !== formData.password) {
      nextErrors.confirmPassword = 'Passwords do not match.'
    }
    if (!formData.previewAcknowledged) {
      nextErrors.previewAcknowledged = 'Please confirm you understand this is a preview.'
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    const result = signup({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    })

    if (!result.success) {
      setErrors({
        email: result.error,
      })

      return
    }

    toast.success('Account created successfully!')
    navigate('/login')
  }

  return (
    <div>
      <p className='mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#a45a36]'>
        Get started
      </p>
      <h2 className='text-3xl font-semibold tracking-normal text-[#173b35]'>Create your account</h2>
      <p className='mt-2 text-sm leading-6 text-slate-600'>
        Set up your details to get started with SMD.
      </p>

      <form onSubmit={handleSubmit} noValidate className='mt-7 space-y-4'>
        <div>
          <label htmlFor='signup-name' className='mb-2 block text-xs font-semibold text-[#173b35]'>
            Full name
          </label>
          <div className='relative'>
            <UserRound
              size={17}
              aria-hidden='true'
              className='pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400'
            />
            <input
              id='signup-name'
              name='name'
              type='text'
              autoComplete='name'
              value={formData.name}
              onChange={handleChange}
              placeholder='Your name'
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'signup-name-error' : undefined}
              className='w-full rounded-sm border border-[#d8d8cf] bg-white py-3 pl-10 pr-3 text-sm text-slate-900 outline-none transition focus:border-[#a45a36] focus:ring-2 focus:ring-[#a45a36]/15'
            />
          </div>
          {errors.name && (
            <p id='signup-name-error' role='alert' className='mt-1.5 text-xs text-red-700'>
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor='signup-email' className='mb-2 block text-xs font-semibold text-[#173b35]'>
            School email
          </label>
          <div className='relative'>
            <Mail
              size={17}
              aria-hidden='true'
              className='pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400'
            />
            <input
              id='signup-email'
              name='email'
              type='email'
              autoComplete='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='you@school.edu'
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'signup-email-error' : undefined}
              className='w-full rounded-sm border border-[#d8d8cf] bg-white py-3 pl-10 pr-3 text-sm text-slate-900 outline-none transition focus:border-[#a45a36] focus:ring-2 focus:ring-[#a45a36]/15'
            />
          </div>
          {errors.email && (
            <p id='signup-email-error' role='alert' className='mt-1.5 text-xs text-red-700'>
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor='signup-password'
            className='mb-2 block text-xs font-semibold text-[#173b35]'
          >
            Password
          </label>
          <div className='relative'>
            <LockKeyhole
              size={17}
              aria-hidden='true'
              className='pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400'
            />
            <input
              id='signup-password'
              name='password'
              type={showPassword ? 'text' : 'password'}
              autoComplete='new-password'
              value={formData.password}
              onChange={handleChange}
              placeholder='At least 8 characters'
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? 'signup-password-error' : undefined}
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
            <p id='signup-password-error' role='alert' className='mt-1.5 text-xs text-red-700'>
              {errors.password}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor='signup-confirm-password'
            className='mb-2 block text-xs font-semibold text-[#173b35]'
          >
            Confirm password
          </label>
          <div className='relative'>
            <LockKeyhole
              size={17}
              aria-hidden='true'
              className='pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400'
            />
            <input
              id='signup-confirm-password'
              name='confirmPassword'
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete='new-password'
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder='Enter your password again'
              aria-invalid={Boolean(errors.confirmPassword)}
              aria-describedby={
                errors.confirmPassword ? 'signup-confirm-password-error' : undefined
              }
              className='w-full rounded-sm border border-[#d8d8cf] bg-white py-3 pl-10 pr-11 text-sm text-slate-900 outline-none transition focus:border-[#a45a36] focus:ring-2 focus:ring-[#a45a36]/15'
            />
            <button
              type='button'
              onClick={() => setShowConfirmPassword(value => !value)}
              aria-label={
                showConfirmPassword ? 'Hide confirmation password' : 'Show confirmation password'
              }
              className='absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-slate-500 hover:text-[#173b35] focus-visible:outline-2 focus-visible:outline-[#a45a36]'
            >
              {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p
              id='signup-confirm-password-error'
              role='alert'
              className='mt-1.5 text-xs text-red-700'
            >
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <div>
          <label className='flex cursor-pointer items-start gap-2.5 text-xs leading-5 text-slate-600'>
            <input
              name='previewAcknowledged'
              type='checkbox'
              checked={formData.previewAcknowledged}
              onChange={handleChange}
              aria-invalid={Boolean(errors.previewAcknowledged)}
              aria-describedby={errors.previewAcknowledged ? 'signup-preview-error' : undefined}
              className='mt-1 h-4 w-4 shrink-0 accent-[#8b4329]'
            />
            <span>
              This is a demo account. Your account will be stored locally in this browser.
            </span>
          </label>
          {errors.previewAcknowledged && (
            <p id='signup-preview-error' role='alert' className='mt-1 text-xs text-red-700'>
              {errors.previewAcknowledged}
            </p>
          )}
        </div>

        <button
          type='submit'
          className='group flex w-full items-center justify-between rounded-sm bg-[#8b4329] px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-[#71361f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b4329]'
        >
          Create account
          <ArrowRight
            size={17}
            aria-hidden='true'
            className='transition-transform group-hover:translate-x-1'
          />
        </button>
      </form>

      <p className='mt-6 text-center text-sm text-slate-600'>
        Already have an account?{' '}
        <Link
          to='/login'
          className='font-semibold text-[#8b4329] underline decoration-[#8b4329]/40 underline-offset-4 hover:text-[#63331f]'
        >
          Sign in
        </Link>
      </p>
    </div>
  )
}

export default Signup
