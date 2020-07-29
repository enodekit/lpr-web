import router from './router'
import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
// import { getToken } from '@/utils/auth' // get token from cookie

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/home', '/dashboard', '/projects', '/login', '/register', '/goodsDetails', '/thanks', '/search', '/refreshsearch', '/refreshgoods'] // 不需要登陆的页面

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // determine whether the user has logged in
  // const hasToken = getToken()
  // if (hasToken) {
  //   if (to.path === '/login') {
  //     // if is logged in, redirect to the home page
  //     next({ path: '/login' })
  //     NProgress.done()
  //   } else {
  //     // determine whether the user has obtained his permission roles through getInfo
  //     const hasRoles = store.getters.roles && store.getters.roles.length > 0
  //     if (hasRoles) {
  //       next()
  //     } else {
  //       try {
  //         // get user info
  //         // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
  //         const { roles, routers } = await store.dispatch('user/getInfo')
  //
  //         // generate accessible routes map based on roles
  //         const accessRoutes = await store.dispatch('permission/generateRoutes', { roles, routers })
  //
  //         // dynamically add accessible routes
  //         router.addRoutes(accessRoutes)
  //
  //         // hack method to ensure that addRoutes is complete
  //         // set the replace: true, so the navigation will not leave a history record
  //         next({ ...to, replace: true })
  //       } catch (error) {
  //         // remove token and go to login page to re-login
  //         await store.dispatch('user/resetToken')
  //         Message.error(error || 'Has Error')
  //         next(`/login?redirect=${to.path}`)
  //         NProgress.done()
  //       }
  //     }
  //   }
  // } else {
  /* has no token*/
  console.log('path', to.path)
  // const { roles, routers } = await store.dispatch('user/getInfo')
  // const accessRoutes = await store.dispatch('permission/generateRoutes', { roles, routers })
  // console.log(accessRoutes)
  // router.addRoutes(accessRoutes)

  if (whiteList.indexOf(to.path) !== -1) {
    // in the free login whitelist, go directly
    next()
  } else {
    // other pages that do not have permission to access are redirected to the login page.
    next()
    // NProgress.done()
  }
  // }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
