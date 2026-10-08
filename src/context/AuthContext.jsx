import { createContext, useContext, useState } from 'react'

const USERS_KEY = 'users'
const USER_KEY = 'user'

const AuthContext = createContext(null)

const getStoredUsers = () => {
  try {
    const savedUsers = localStorage.getItem(USERS_KEY)

    return savedUsers ? JSON.parse(savedUsers) : []
  } catch (error) {
    console.error('Failed to load users:', error)
    return []
  }
}

const getStoredUser = () => {
  try {
    const savedUser = localStorage.getItem(USER_KEY)

    return savedUser ? JSON.parse(savedUser) : null
  } catch (error) {
    console.error('Failed to load session:', error)
    return null
  }
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser)

  const signup = ({ name, email, password }) => {
    const users = getStoredUsers()
    const normalizedEmail = email.trim().toLowerCase()

    const existingUser = users.find(storedUser => storedUser.email === normalizedEmail)

    if (existingUser) {
      return {
        success: false,
        error: 'An account with this email already exists.',
      }
    }

    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: normalizedEmail,
      password,
      role: 'student',
    }

    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]))

    return {
      success: true,
      user: newUser,
    }
  }

  const login = (email, password) => {
    const users = getStoredUsers()
    const normalizedEmail = email.trim().toLowerCase()

    const foundUser = users.find(
      storedUser => storedUser.email === normalizedEmail && storedUser.password === password
    )

    if (!foundUser) {
      return {
        success: false,
        error: 'Invalid email or password.',
      }
    }

    const sessionUser = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
    }

    localStorage.setItem(USER_KEY, JSON.stringify(sessionUser))
    setUser(sessionUser)

    return {
      success: true,
      user: sessionUser,
    }
  }

  const logout = () => {
    localStorage.removeItem(USER_KEY)
    setUser(null)
  }

  const value = {
    user,
    isAuthenticated: Boolean(user),
    signup,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside an AuthProvider')
  }

  return context
}

export default useAuthContext
