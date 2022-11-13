import {
  AdminHomePage,
  AdminNotifications,
  AdminProjects,
  AdminTasks,
  AdminSummary,
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
]

export default adminRoutes
