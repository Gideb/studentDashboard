import { ROLES, ROLE_LABELS, ROLE_PERMISSIONS } from '../config/roleConfig'

const DEFAULT_ROLE = ROLES.STUDENT

const useRole = () => {
  const getStoredUser = () => {
    try {
      const savedUser = localStorage.getItem('user')

      if (!savedUser) {
        return null
      }

      return JSON.parse(savedUser)
    } catch (error) {
      console.error('Failed to load user:', error)
      return null
    }
  }

  const user = getStoredUser()

  const role = user?.role || DEFAULT_ROLE

  const permissions = ROLE_PERMISSIONS[role] || ROLE_PERMISSIONS[DEFAULT_ROLE]

  const roleLabel = ROLE_LABELS[role] || ROLE_LABELS[DEFAULT_ROLE]

  const hasPermission = permission => {
    return Boolean(permissions[permission])
  }

  const isRole = requiredRole => {
    return role === requiredRole
  }

  return {
    user,
    role,
    roleLabel,
    permissions,
    hasPermission,
    isRole,
    roles: ROLES,
  }
}

export default useRole
