import { faUsers } from "react-icons/fa6";
import { GiGraduateCap } from "react-icons/gi";
import { LuBookOpenText, LuCalendar1, LuFileChartColumnIncreasing, LuLogOut, LuSettings2 } from "react-icons/lu";
import { MdDashboard } from "react-icons/md";


export const side_menu = [
  {
    id: '01',
    Icon: MdDashboard,
    title: 'Dashboard',
    path: './dashboard',
  },
  {
    id: '02',
    Icon: faUsers,
    title: 'Students',
    path: './students',
  },
  {
    id: '03',
    Icon: GiGraduateCap,
    title: 'Courses',
    path: './courses',
  },
  {
    id: '04',
    Icon: LuBookOpenText,
    title: 'Assignments',
    path: './assignments',
  },
  {
    id: '05',
    Icon: LuFileChartColumnIncreasing,
    title: 'Results',
    path: './results',
  },
  {
    id: '06',
    Icon: LuCalendar1,
    title: 'Calendar',
    path: './calendar',
  },
  {
    id: '07',
    Icon: LuSettings2,
    title: 'Settings',
    path: './settings',
  },
  {
    id: '08',
    Icon: LuLogOut,
    title: 'Logout',
    path: './logout',
  },
]