import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { isSupabaseConfigured, supabase } from '../lib/supabase'

const AuthContext = createContext(null)

const toAppUser = (authUser, profile = {}) => {
  if (!authUser) return null

  return {
    id: authUser.id,
    name: profile.full_name || authUser.user_metadata?.full_name || '',
    email: profile.email || authUser.email || '',
    role: profile.role || 'student',
    department: profile.department || '',
    phone: profile.phone || '',
  }
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const loadUser = useCallback(async authUser => {
    if (!authUser) {
      setUser(null)
      return
    }

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('id, full_name, email, role, department, phone')
      .eq('id', authUser.id)
      .maybeSingle()

    if (error) console.error('Supabase profile lookup failed:', error.message)
    setUser(toAppUser(authUser, profile || {}))
  }, [])

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setIsLoading(false)
      return undefined
    }

    let active = true
    const restoreSession = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (error) console.error('Could not restore Supabase session:', error.message)
      if (active) await loadUser(data?.session?.user || null)
      if (active) setIsLoading(false)
    }

    restoreSession()
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      // Defer the profile query so it doesn't run inside Supabase's auth callback.
      Promise.resolve().then(async () => {
        if (active) await loadUser(session?.user || null)
        if (active) setIsLoading(false)
      })
    })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [loadUser])

  const signup = async ({ name, email, password }) => {
    if (!isSupabaseConfigured) {
      return { success: false, error: 'Supabase is not configured. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local, then restart Vite.' }
    }

    const { data, error } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: { data: { full_name: name.trim() } },
    })

    if (error) return { success: false, error: error.message }

    return {
      success: true,
      needsEmailConfirmation: !data.session,
      user: data.user ? toAppUser(data.user) : null,
    }
  }

  const login = async (email, password) => {
    if (!isSupabaseConfigured) {
      return { success: false, error: 'Supabase is not configured. Check your .env.local values and restart Vite.' }
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    })

    if (error) {
      const message = error.message === 'Email not confirmed'
        ? 'Please confirm your email using the link Supabase sent you, then sign in.'
        : error.message === 'Invalid login credentials'
          ? 'Invalid email or password. If you just signed up, check whether email confirmation is required.'
          : error.message
      return { success: false, error: message }
    }

    await loadUser(data.user)
    return { success: true, user: toAppUser(data.user) }
  }

  const logout = async () => {
    if (!isSupabaseConfigured) {
      setUser(null)
      return { success: true }
    }

    const { error } = await supabase.auth.signOut()
    if (error) return { success: false, error: error.message }
    setUser(null)
    return { success: true }
  }

  const updateProfile = async ({ name, email, department = '', phone = '' }) => {
    if (!user) return { success: false, error: 'You must be logged in to update your profile.' }
    if (!name?.trim() || !email?.trim()) {
      return { success: false, error: 'Name and email are required.' }
    }

    const normalizedEmail = email.trim().toLowerCase()
    const { data: profile, error } = await supabase
      .from('profiles')
      .update({
        full_name: name.trim(),
        email: normalizedEmail,
        department: department.trim(),
        phone: phone.trim(),
      })
      .eq('id', user.id)
      .select('id, full_name, email, role, department, phone')
      .single()

    if (error) return { success: false, error: error.message }

    if (normalizedEmail !== user.email) {
      const { error: authError } = await supabase.auth.updateUser({ email: normalizedEmail })
      if (authError) return { success: false, error: `Profile saved, but email update failed: ${authError.message}` }
    }

    const { data: authData } = await supabase.auth.getUser()
    const updatedUser = toAppUser(authData?.user, profile)
    setUser(updatedUser)
    return { success: true, user: updatedUser }
  }

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated: Boolean(user),
      isSupabaseConfigured,
      signup,
      login,
      logout,
      updateProfile,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside an AuthProvider')
  return context
}

export default useAuthContext
