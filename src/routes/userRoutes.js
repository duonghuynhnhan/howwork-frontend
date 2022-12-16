import {
  UserHomePage,
  UserTasks,
  UserProjects,
  UserSummary,
  UserInformation,
  UserChangeInformation,
  UserChangePassword,
  UserChangeKey,
  UserTasksDetail,
  UserProjectsDetail,
} from '../views'

const userRoutes = [
  { path: '/user/home', exact: true, name: 'UserHomepage', element: UserHomePage },
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
    path: '/user/change-information',
    exact: true,
    name: 'UserChangeInformation',
    element: UserChangeInformation,
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
    path: '/user/project/:id/task/:id',
    exact: true,
    name: 'UserTasksDetail',
    element: UserTasksDetail,
  },
  {
    path: '/user/project/:id',
    exact: true,
    name: 'UserProjectsDetail',
    element: UserProjectsDetail,
  },
]

export default userRoutes
