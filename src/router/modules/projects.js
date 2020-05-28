import Layout from '@/layout/index'

const rostersRouter = {
  path: '/project',
  component: Layout,
  redirect: '/project/index',
  // alwaysShow: true, // will always show the root menu
  meta: {
    title: 'Project',
    icon: 'settings',
    noRoles: true
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/project/index'),
      name: 'Roster',
      meta: {
        title: '产品', affix: true, noRoles: true
      }
    }
  ]
}

export default rostersRouter
