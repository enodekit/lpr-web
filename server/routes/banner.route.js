const BaseRoute = require('./base.route')
const ctrl = require('../controllers/banner.controller')

const baseRoute = new BaseRoute('banner', ctrl)
baseRoute.addRoute = function() {
}
baseRoute.build()

module.exports = baseRoute.router
