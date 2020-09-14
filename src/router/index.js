import Vue from 'vue'
import Router from 'vue-router'
// import homesRouter from './modules/homes'
// import rostersRouter from './modules/rosters'
// import searchsRouter from './modules/searchs'
// import projectsRouter from './modules/projects'
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if `redirect:noRedirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */
export const constantRoutes = [
  {
    path: '/redirect', // 重定向
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authRedirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },

  {
    path: '',
    component: Layout,
    redirect: '/home',
    /** hidden: true,   //菜单栏隐藏**/
    children: [{
      path: 'home',
      component: () => import('@/views/Home/index'),
      name: 'Home',
      meta: { title: 'dashboard', icon: 'dashboard', noCache: true, affix: true }
    }, {
      path: 'products/:id',
      component: () => import('@/views/product/index'),
      name: 'Product',
      meta: {
        title: '产品', noRoles: true
      }
    }]
  },
  {
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
]

// 通过用户权限管理的路由  异步路由表
export const asyncRoutes = [
  // homesRouter,
  // rostersRouter,
  // projectsRouter,
  {
    path: '*', redirect: '/404', hidden: true,
    meta: {
      noRoles: true
    }
  }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
