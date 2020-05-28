import Layout from '@/layout/index'

const settingsRouter = {
  path: '/settings',
  component: Layout,
  redirect: '/settings/index',
  // alwaysShow: true, // will always show the root menu
  meta: {
    title: 'settings',
    icon: 'settings',
    noRoles: true
  },
  children: [
    {
      path: 'user',
      component: () => import('@/views/user'),
      name: 'User',
      meta: {
        title: '用户信息'
      }
    },
    {
      path: 'control',
      component: () => import('@/views/control'),
      name: 'Control',
      meta: {
        title: '站点信息', noRoles: false
      }
    },
    {
      path: 'httpDrive',
      component: () => import('@/views/httpDrive'),
      name: 'HttpDrives',
      meta: {
        title: '摄像头信息', noRoles: false
      }
    },
    {
      path: 'wordType',
      component: () => import('@/views/wordType'),
      name: 'WordTypes',
      meta: {
        title: '字典类型', noRoles: false
      }
    },
    {
      path: 'word',
      component: () => import('@/views/word'),
      name: 'Words',
      meta: {
        title: '字典', noRoles: false
      }
    }
  ]
}

export default settingsRouter
