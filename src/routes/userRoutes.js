import {
  UserHomePage,
  UserNotifications,
  UserTasks,
  UserProjects,
  UserSummary,
  UserInformation,
  UserChangePassword,
  UserChangeKey,
  UserTasksDetail,
  UserProjectsDetail,
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
    path: '/user/tasks',
    exact: true,
    name: 'UserTasks',
    element: UserTasks,
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
  {
    path: '/user/projects/:id/tasks/:id',
    exact: true,
    name: 'UserTasksDetail',
    element: UserTasksDetail,
  },
  {
    path: '/user/projects/:id',
    exact: true,
    name: 'UserProjectsDetail',
    element: UserProjectsDetail,
  },
]

export default userRoutes
