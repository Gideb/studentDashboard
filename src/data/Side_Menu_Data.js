import { FaUsers } from 'react-icons/fa6'
import { GiGraduateCap } from 'react-icons/gi'
import {
  LuCalendarDays,
  LuClipboardList,
  LuFileChartColumnIncreasing,
  LuLogOut,
  LuSettings2,
} from 'react-icons/lu'
import { MdDashboard } from 'react-icons/md'

export const SIDE_MENU_DATA = [
  {
    id: '01',
    icon: MdDashboard,
    title: 'Dashboard',
    path: '/dashboard',
  },
  {
    id: '02',
    icon: FaUsers,
    title: 'Students',
    path: '/students',
  },
  {
    id: '03',
    icon: GiGraduateCap,
    title: 'Courses',
    path: '/courses',
  },
  {
    id: '04',
    icon: LuClipboardList,
    title: 'Assignments',
    path: '/assignments',
  },
  {
    id: '05',
    icon: LuFileChartColumnIncreasing,
    title: 'Results',
    path: '/results',
  },
  {
    id: '06',
    icon: LuCalendarDays,
    title: 'Calendar',
    path: '/calendar',
  },
  {
    id: '07',
    icon: LuSettings2,
    title: 'Settings',
    path: '/settings',
  },
  {
    id: '08',
    icon: LuLogOut,
    title: 'Logout',
    path: '/logout',
  },
]
