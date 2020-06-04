import Layout from '@/layout/index'

const projectsRouter = {
  path: '/projects',
  component: Layout,
  redirect: '/projects',
  alwaysShow: true, // will always show the root menu
  meta: {
    title: 'Project',
    icon: 'settings'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/project/list'),
      name: 'ProjectList',
      meta: {
        title: '产品', noRoles: true
      }
    },
    {
      path: 'show/:id',
      hidden: true,
      component: () => import('@/views/project'),
      name: 'Project',
      meta: {
        title: '产品', noRoles: true
      }
    }
  ]
}

export default projectsRouter
