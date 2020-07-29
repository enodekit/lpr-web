const BaseRoute = require('./base.route')
const ctrl = require('../controllers/company.controller')

const baseRoute = new BaseRoute('company', ctrl)
baseRoute.addRoute = function() {
}
baseRoute.build()

module.exports = baseRoute.router
