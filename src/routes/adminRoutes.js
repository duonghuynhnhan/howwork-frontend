import {
  AdminHomePage,
  AdminNotifications,
  AdminProjects,
  AdminSummary,
  AdminCreateUser,
  AdminCreateAdmin,
  AdminInformation,
  AdminChangePassword,
  AdminChangeKey,
  AdminProjectsDetail,
  AdminTasksDetail,
} from '../views'

const adminRoutes = [
  { path: '/admin/home', exact: true, name: 'AdminHomepage', element: AdminHomePage },
  {
    path: '/admin/notifications',
    exact: true,
    name: 'AdminNotifications',
    element: AdminNotifications,
  },
  {
    path: '/admin/projects',
    exact: true,
    name: 'AdminProject',
    element: AdminProjects,
  },
  {
    path: '/admin/summary',
    exact: true,
    name: 'AdminSummary',
    element: AdminSummary,
  },
  {
    path: '/admin/create-user',
    exact: true,
    name: 'AdminCreateUser',
    element: AdminCreateUser,
  },
  {
    path: '/admin/create-admin',
    exact: true,
    name: 'AdminCreateAdmin',
    element: AdminCreateAdmin,
  },
  {
    path: '/admin/information',
    exact: true,
    name: 'AdminInformation',
    element: AdminInformation,
  },
  {
    path: '/admin/change-password',
    exact: true,
    name: 'AdminChangePassword',
    element: AdminChangePassword,
  },
  {
    path: '/admin/change-key',
    exact: true,
    name: 'AdminChangeKey',
    element: AdminChangeKey,
  },
  {
    path: '/admin/project/:id/task/:id',
    exact: true,
    name: 'AdminTasksDetail',
    element: AdminTasksDetail,
  },
  {
    path: '/admin/project/:id',
    exact: true,
    name: 'AdminProjectsDetail',
    element: AdminProjectsDetail,
  },
]

export default adminRoutes
