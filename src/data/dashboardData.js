import { GiGraduateCap } from 'react-icons/gi'
import { GrLineChart, GrTask } from 'react-icons/gr'

export const stats = [
  {
    Icon: GiGraduateCap,
    title: 'Courses',
    value: 6,
    description: 'Active courses',
  },
  {
    Icon: GrTask,
    title: 'Tasks',
    value: 12,
    description: '4 due this week',
  },
  {
    Icon: GrLineChart,
    title: 'Average',
    value: '87.5%',
    description: '+4.2% this month',
  },
]

export const assignments = [
  {
    subject: 'Mathematics',
    title: 'Algebra Practice',
    dueDate: 'Aug 29',
    status: 'In Progress',
  },
  {
    subject: 'Computer Science',
    title: 'React Components',
    dueDate: 'Aug 30',
    status: 'Pending',
  },
]

export const classes = [
  {
    subject: 'Mathematics',
    day: 'Today',
    time: '10:00 AM',
    location: 'Room 204',
  },
  {
    subject: 'Computer Science',
    day: 'Tomorrow',
    time: '9:00 AM',
    location: 'Lab 2',
  },
]

export const results = [
  {
    id: 1,
    subject: 'Mathematics',
    score: '98',
    grade: 'A',
  },
  {
    id: 2,
    subject: 'Biology',
    score: '77',
    grade: 'B',
  },
  {
    id: 3,
    subject: 'Chemistry',
    score: '92',
    grade: 'A',
  },
  {
    id: 4,
    subject: 'Physics',
    score: '68',
    grade: 'C',
  },
]
