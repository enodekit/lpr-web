import { asyncRoutes, constantRoutes } from '@/router'

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRoutes
 * @param routers
 */
export function filterAsyncRoutes(routes, routers) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (routers.includes(tmp.path) || (tmp.meta && tmp.meta.noRoles)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, routers)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, { roles, routers }) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes
      } else {
        routers = routers.map(router => router.path)
        accessedRoutes = filterAsyncRoutes(asyncRoutes, routers)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
