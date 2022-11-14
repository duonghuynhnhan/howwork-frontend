import {
  AdminHomePage,
  AdminNotifications,
  AdminProjects,
  AdminTasks,
  AdminSummary,
  AdminCreateUser,
  AdminCreateAdmin,
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
    path: '/admin/tasks',
    exact: true,
    name: 'AdminTasks',
    element: AdminTasks,
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
]

export default adminRoutes
