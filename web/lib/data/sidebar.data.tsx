import { GrDashboard } from 'react-icons/gr';
import { SidebarLink } from '../schemas/interfaces';
import { MdAnnouncement } from 'react-icons/md';
import { IoMdDocument } from 'react-icons/io';
import { PiStudentThin, PiUsers } from 'react-icons/pi';
import { IoDocumentOutline, IoSchoolOutline } from 'react-icons/io5';
import { TfiAnnouncement } from 'react-icons/tfi';

export const defaultLinks: SidebarLink[] = [
  {
    route: '/dashboard',
    routeName: 'Dashboard',
    icon: <GrDashboard />,
  },
  {
    route: '/dashboard/announcements',
    routeName: 'Announcements',
    icon: <TfiAnnouncement />,
  },
  {
    route: '/dashboard/documents',
    routeName: 'Documents',
    icon: <IoDocumentOutline />,
  },
  {
    route: '/dashboard/students',
    routeName: 'Students',
    icon: <PiStudentThin />,
  },
];

export const superAdminLinks: SidebarLink[] = [
  ...defaultLinks,
  {
    route: '/dashboard/faculties',
    routeName: 'Faculties',
    icon: <IoSchoolOutline />,
  },
  {
    route: '/dashboard/admins',
    routeName: 'Admin Management',
    icon: <PiUsers />,
  },
];
