const express = require('express')
const asyncHandler = require('express-async-handler')
const ctrl = require('../controllers/qiniu.controller')
const formidable = require('formidable')
const path = require('path')
const fsPromises = require('fs').promises
const router = express.Router()
module.exports = router

router.get('/getToken', asyncHandler(getToken))
router.post('/upload', asyncHandler(upload))

async function getToken(req, res) {
  const token = await ctrl.getToken()
  res.send({ code: 0, data: token })
}

/**
 * @api {put} /routers/roles-auth 路由角色权限
 * @apiDescription 赋予一个角色哪些路由权限
 * @apiName 路由角色权限
 * @apiGroup Router
 * @apiHeader (Auth) {String} Authorization Authorization value.
 * @apiParam {String[]} _ids 给予权限路由的ID
 * @apiParam {String[]} roleId 角色ID
 * @apiSuccessExample {json} Success-Response:
 *  {"code":0,message:"OK"}
 * @apiVersion 1.0.0
 */
async function upload(req, res) {
  const form = new formidable.IncomingForm()
  form.keepExtensions = true // 保留扩展名
  const dir = `upload/${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`
  const abpath = path.resolve('./assets/' + dir)
  await fsPromises.mkdir(abpath, { recursive: true })
  form.uploadDir = abpath
  const { files } = await new Promise((res, rej) => {
    form.parse(req, (err, fields, files) => {
      if (err) rej(err)
      res({ fields, files })
    })
  })
  const file = files.file
  const image = await ctrl.upload(file)
  res.send({ code: 0, files: { file: image }})
  // res.send({ code: 0, message: 'OK' })
  // console.log(files)
  // await ctrl.updateRoles(req.body._ids, req.body.roleId)
  // res.send({ code: 0, message: 'OK' })
}
