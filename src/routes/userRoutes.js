import {
  UserHomePage,
  UserNotifications,
  UserMyDay,
  UserProjects,
  UserTasks,
  UserSummary,
} from '../views'

const userRoutes = [
  { path: '/user/home', exact: true, name: 'UserHomepage', element: UserHomePage },
  {
    path: '/user/notifications',
    exact: true,
    name: 'UserNotifications',
    element: UserNotifications,
  },
  {
    path: '/user/myday',
    exact: true,
    name: 'UserMyDay',
    element: UserMyDay,
  },
  {
    path: '/user/projects',
    exact: true,
    name: 'UserProject',
    element: UserProjects,
  },
  {
    path: '/user/tasks',
    exact: true,
    name: 'UserTasks',
    element: UserTasks,
  },
  {
    path: '/user/summary',
    exact: true,
    name: 'UserSummary',
    element: UserSummary,
  },
]

export default userRoutes
