const BaseRoute = require('./base.route')
const ctrl = require('../controllers/product.controller')

const baseRoute = new BaseRoute('product', ctrl)
baseRoute.addRoute = function() {
}
baseRoute.build()

module.exports = baseRoute.router
