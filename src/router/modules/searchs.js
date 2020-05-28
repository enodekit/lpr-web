import Layout from '@/layout/index'

const rostersRouter = {
  path: '/search',
  component: Layout,
  redirect: '/search',
  // alwaysShow: true, // will always show the root menu
  meta: { title: 'Searchs', icon: 'settings', noRoles: true },
  children: [
    {
      path: 'index',
      component: () => import('@/views/search/index'),
      name: 'Search',
      meta: {
        title: '查询', icon: 'dashboard', noCache: true, affix: true, noRoles: true
      }
    }
  ]
}

export default rostersRouter
