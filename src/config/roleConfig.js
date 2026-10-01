export const ROLES = {
  ADMINISTRATOR: 'administrator',
  LECTURER: 'lecturer',
  STUDENT: 'student',
}

export const ROLE_LABELS = {
  [ROLES.ADMINISTRATOR]: 'Administrator',
  [ROLES.LECTURER]: 'Lecturer',
  [ROLES.STUDENT]: 'Student',
}

export const ROLE_PERMISSIONS = {
  [ROLES.ADMINISTRATOR]: {
    dashboard: true,
    students: true,
    courses: true,
    assignments: true,
    results: true,
    calendar: true,
    settings: true,
  },

  [ROLES.LECTURER]: {
    dashboard: true,
    students: false,
    courses: true,
    assignments: true,
    results: true,
    calendar: true,
    settings: true,
  },

  [ROLES.STUDENT]: {
    dashboard: true,
    students: false,
    courses: true,
    assignments: true,
    results: true,
    calendar: true,
    settings: true,
  },
}
