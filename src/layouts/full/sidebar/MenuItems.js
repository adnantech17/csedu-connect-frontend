import {
  AccountCircleOutlined,
  AlternateEmailSharp,
  CalendarToday,
  EmailOutlined,
  Event,
} from '@mui/icons-material';
import { IconWriting } from '@tabler/icons';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Admin Panel',
    admin: true,
  },
  {
    id: uniqueId(),
    title: 'Users Management',
    icon: AccountCircleOutlined,
    href: '/users-management',
    admin: true,
  },
  {
    id: uniqueId(),
    title: 'Emails Management',
    icon: EmailOutlined,
    href: '/emails-management',
    admin: true,
  },
  {
    id: uniqueId(),
    title: 'Events Management',
    icon: Event,
    href: '/events-management',
    admin: true,
  },
  {
    navlabel: true,
    subheader: 'User Panel',
    admin: false,
  },

  {
    id: uniqueId(),
    title: 'Students',
    icon: AccountCircleOutlined,
    href: '/students-list',
    admin: false,
  },
  {
    id: uniqueId(),
    title: 'Emails',
    icon: AlternateEmailSharp,
    href: '/emails-list',
    admin: false,
  },
  {
    id: uniqueId(),
    title: 'Events',
    icon: CalendarToday,
    href: '/events-list',
    admin: false,
  },
  {
    id: uniqueId(),
    title: 'Blogs',
    icon: IconWriting,
    href: '/blogs-list',
    admin: false,
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
