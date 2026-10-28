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

    studentsCreate: true,
    studentsEdit: true,
    studentsDelete: true,

    coursesCreate: true,
    coursesEdit: true,
    coursesDelete: true,

    assignmentsCreate: true,
    assignmentsEdit: true,
    assignmentsDelete: true,

    resultsCreate: true,
    resultsEdit: true,
    resultsDelete: true,

    calendarCreate: true,
    calendarEdit: true,
    calendarDelete: true,
  },

  [ROLES.LECTURER]: {
    dashboard: true,
    students: false,
    courses: true,
    assignments: true,
    results: true,
    calendar: true,
    settings: true,

    studentsCreate: false,
    studentsEdit: false,
    studentsDelete: false,

    coursesCreate: false,
    coursesEdit: false,
    coursesDelete: false,

    assignmentsCreate: true,
    assignmentsEdit: true,
    assignmentsDelete: true,

    resultsCreate: true,
    resultsEdit: true,
    resultsDelete: true,

    calendarCreate: true,
    calendarEdit: true,
    calendarDelete: true,
  },

  [ROLES.STUDENT]: {
    dashboard: true,
    students: false,
    courses: true,
    assignments: true,
    results: true,
    calendar: true,
    settings: true,

    studentsCreate: false,
    studentsEdit: false,
    studentsDelete: false,

    coursesCreate: false,
    coursesEdit: false,
    coursesDelete: false,

    assignmentsCreate: false,
    assignmentsEdit: false,
    assignmentsDelete: false,

    resultsCreate: false,
    resultsEdit: false,
    resultsDelete: false,

    calendarCreate: false,
    calendarEdit: false,
    calendarDelete: false,
  },
}
