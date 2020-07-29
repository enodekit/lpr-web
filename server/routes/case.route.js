const BaseRoute = require('./base.route')
const ctrl = require('../controllers/case.controller')

const baseRoute = new BaseRoute('case', ctrl)
baseRoute.addRoute = function() {
}
baseRoute.build()

module.exports = baseRoute.router
