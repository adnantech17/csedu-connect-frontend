import { AccountCircleOutlined, AlternateEmailSharp, CalendarToday, EmailOutlined, Event } from '@mui/icons-material';
import { IconWriting } from '@tabler/icons';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Admin Panel',
  },
  {
    id: uniqueId(),
    title: 'Users Management',
    icon: AccountCircleOutlined,
    href: '/users-management',
  },
  {
    id: uniqueId(),
    title: 'Emails Management',
    icon: EmailOutlined,
    href: '/emails-management',
  },
  {
    id: uniqueId(),
    title: 'Events Management',
    icon: Event,
    href: '/events-management',
  },
  {
    navlabel: true,
    subheader: 'User Panel',
  },

  {
    id: uniqueId(),
    title: 'Students',
    icon: AccountCircleOutlined,
    href: '/students-list',
  },
  {
    id: uniqueId(),
    title: 'Emails',
    icon: AlternateEmailSharp,
    href: '/emails-list',
  },
  {
    id: uniqueId(),
    title: 'Events',
    icon: CalendarToday,
    href: '/events-list',
  },
  {
    id: uniqueId(),
    title: 'Blogs',
    icon: IconWriting,
    href: '/blogs-list',
  },
  // {
  //   navlabel: true,
  //   subheader: 'Utilities',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Typography',
  //   icon: IconTypography,
  //   href: '/ui/typography',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Shadow',
  //   icon: IconCopy,
  //   href: '/ui/shadow',
  // },
  // {
  //   navlabel: true,
  //   subheader: 'Auth',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Login',
  //   icon: IconLogin,
  //   href: '/auth/login',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Register',
  //   icon: IconUserPlus,
  //   href: '/auth/register',
  // },
  // {
  //   navlabel: true,
  //   subheader: 'Extra',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Icons',
  //   icon: IconMoodHappy,
  //   href: '/icons',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Sample Page',
  //   icon: IconAperture,
  //   href: '/sample-page',
  // },
];

export default Menuitems;
