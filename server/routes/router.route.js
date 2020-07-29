const BaseRoute = require('./base.route')
const ctrl = require('../controllers/router.controller')
const asyncHandler = require('express-async-handler')

const baseRoute = new BaseRoute('Router', ctrl)
baseRoute.addRoute = function() {
  this.router.get('/select', asyncHandler(select))
  this.router.put('/updateRoles', asyncHandler(updateRoles))
  this.router.get('/generator', asyncHandler(generator))
}
baseRoute.build()

async function select(req, res) {
  const slt = await ctrl.select()
  res.json(slt)
}

async function generator(req, res) {
  await ctrl.generator(req.query)
  res.send('OK')
}

async function updateRoles(req, res) {
  await ctrl.updateRoles(req.body._ids, req.body.roleId)
  res.send('OK')
}

module.exports = baseRoute.router

