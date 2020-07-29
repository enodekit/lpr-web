const express = require('express')
const userRoutes = require('./user.route')
const authRoutes = require('./auth.route')
const roleRoutes = require('./role.route')
const routerRoutes = require('./router.route')
// new route require append
const bannerRoutes = require('./banner.route')
const productClassRoutes = require('./productClass.route')
const productRoutes = require('./product.route')
const companyRoutes = require('./company.route')
const caseRoutes = require('./case.route')
const passport = require('passport')
const Policies = require('../middleware/policies')
const qiniuRoutes = require('./qiniu.route')
const wordRoutes = require('./word.route')
const wordTypeRoutes = require('./wordType.route')
const router = express.Router() // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
)

router.use('/auth', authRoutes)
router.use('/qiniu', qiniuRoutes)
router.use('/banners', bannerRoutes)
router.use('/productClasss', productClassRoutes)
router.use('/products', productRoutes)
router.use('/companys', companyRoutes)
router.use('/cases', caseRoutes)
router.use(passport.authenticate('jwt', { session: false }))

router.use('/users', userRoutes)
router.use('/roles', roleRoutes)
router.use('/routers', routerRoutes)
router.use('/words', wordRoutes)
router.use('/word-types', wordTypeRoutes)
// new route append

module.exports = router

const policies = new Policies()
// 权限开启
policies.init().then(() => {
  loop(userRoutes, '/api/user')

  loop(roleRoutes, '/api/roles')

  loop(routerRoutes, '/api/routers')
})
/**
 * 遍历 生成路由权限管理
 * 插入权限管理
 * @type {Layer}
 */
const Layer = require('express/lib/router/layer')
function loop(router, path) {
  const addLayer = []
  router.stack.map((layer, index) => {
    if (layer.method && policies.hasCheck(path, layer.method)) {
      // 创建权限管理中间件
      const l = Layer('/', {}, function(req, res, next) {
        policies.isAllowed(req.user.roles, path, req.method.toLowerCase(), function(err, allowd) {
          if (allowd) {
            next()
          } else {
            next(new Error('User is not authorized'))
          }
        })
      })
      l.method = layer.method
      addLayer.unshift({ index, l })
    } else if (layer.route) {
      loop(layer.route, path + layer.route.path)
    } else if (layer.handle.name === 'router') {
      loop(layer.handle, path)
    }
  })
  // 插入权限管理
  addLayer.map(add => {
    router.stack.splice(add.index, 0, add.l)
  })
}

