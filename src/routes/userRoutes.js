import {
  UserHomePage,
  UserNotifications,
  UserMyTasks,
  UserProjects,
  UserSummary,
  UserInformation,
  UserChangePassword,
  UserChangeKey,
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
    path: '/user/my-tasks',
    exact: true,
    name: 'UserMyTasks',
    element: UserMyTasks,
  },
  {
    path: '/user/projects',
    exact: true,
    name: 'UserProject',
    element: UserProjects,
  },
  {
    path: '/user/summary',
    exact: true,
    name: 'UserSummary',
    element: UserSummary,
  },
  {
    path: '/user/information',
    exact: true,
    name: 'UserInformation',
    element: UserInformation,
  },
  {
    path: '/user/change-password',
    exact: true,
    name: 'UserChangePassword',
    element: UserChangePassword,
  },
  {
    path: '/user/change-key',
    exact: true,
    name: 'UserChangeKey',
    element: UserChangeKey,
  },
]

export default userRoutes
