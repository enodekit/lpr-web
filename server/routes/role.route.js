const BaseRoute = require('./base.route')
const ctrl = require('../controllers/role.controller')

const baseRoute = new BaseRoute('Role', ctrl)

baseRoute.build()

module.exports = baseRoute.router

