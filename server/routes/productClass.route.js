const BaseRoute = require('./base.route')
const ctrl = require('../controllers/productClass.controller')

const baseRoute = new BaseRoute('productClass', ctrl)
baseRoute.addRoute = function() {
}
baseRoute.build()

module.exports = baseRoute.router
