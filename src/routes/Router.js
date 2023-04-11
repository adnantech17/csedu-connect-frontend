import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import EventsManagement from 'src/views/admin/events-management/EventsManagement';
import EmailsManagement from 'src/views/admin/emails-management/EmailsManagement';
import UsersManagement from 'src/views/admin/users-management/UsersManagement';
import Emails from 'src/views/user/emails/Emails';
import Event from 'src/views/user/events/Event';
import Students from 'src/views/user/students/Students';
import Blogs from 'src/views/user/blogs/Blogs';
import Profile from 'src/views/dashboard/Profile';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')))
const SamplePage = Loadable(lazy(() => import('../views/sample-page/SamplePage')))
const Icons = Loadable(lazy(() => import('../views/icons/Icons')))
const TypographyPage = Loadable(lazy(() => import('../views/utilities/TypographyPage')))
const Shadow = Loadable(lazy(() => import('../views/utilities/Shadow')))
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/dashboard" /> },
      { path: '/dashboard', exact: true, element: <Dashboard /> },
      { path: '/users-management', exact: true, element: <UsersManagement /> },
      { path: '/events-management', exact: true, element: <EventsManagement /> },
      { path: '/emails-management', exact: true, element: <EmailsManagement /> },
      { path: '/emails-list', exact: true, element: <Emails /> },
      { path: '/events-list', exact: true, element: <Event /> },
      { path: '/students-list', exact: true, element: <Students /> },
      { path: '/blogs-list', exact: true, element: <Blogs /> },
      { path: '/accounts-management', exact: true, element: <Profile /> },
      { path: '/icons', exact: true, element: <Icons /> },
      { path: '/ui/typography', exact: true, element: <TypographyPage /> },
      { path: '/ui/shadow', exact: true, element: <Shadow /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/login', element: <Login /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
