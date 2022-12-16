import {
  AdminHomePage,
  AdminChangeInformation,
  AdminProjects,
  AdminSummary,
  AdminCreateUser,
  AdminCreateAdmin,
  AdminInformation,
  AdminChangePassword,
  AdminChangeKey,
  AdminProjectsDetail,
  AdminEditProject,
  AdminTasksDetail,
  AdminEditTask,
} from '../views'

const adminRoutes = [
  { path: '/admin/home', exact: true, name: 'AdminHomePage', element: AdminHomePage },
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
    path: '/admin/change-information',
    exact: true,
    name: 'AdminChangeInformation',
    element: AdminChangeInformation,
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
  {
    path: '/admin/project/:id/edit',
    exact: true,
    name: 'AdminEditProject',
    element: AdminEditProject,
  },
  {
    path: '/admin/project/:project_id/task/:task_id/edit',
    exact: true,
    name: 'AdminEditTask',
    element: AdminEditTask,
  },
]

export default adminRoutes
