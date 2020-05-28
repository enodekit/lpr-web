import Layout from '@/layout/index'

const rostersRouter = {
  path: '/roster',
  component: Layout,
  redirect: '/roster',
  // alwaysShow: true, // will always show the root menu
  meta: {
    title: 'Roster',
    icon: 'settings',
    noRoles: true
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/roster/index'),
      name: 'Roster',
      meta: {
        title: '黑白名单', affix: true, noRoles: true
      }
    }
  ]
}

export default rostersRouter
