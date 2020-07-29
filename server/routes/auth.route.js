const express = require('express')
const asyncHandler = require('express-async-handler')
const passport = require('passport')
const userCtrl = require('../controllers/user.controller')
const authCtrl = require('../controllers/auth.controller')

const router = express.Router()
module.exports = router

router.post('/register', asyncHandler(register), login)
/**
 * @api {post} /auth/login 用户登录
 * @apiPrivate
 * @apiDescription 用户登录
 * @apiName login
 * @apiGroup Auth
 * @apiParam {string} username 用户名
 * @apiParam {string} password 密码
 * @apiParamExample {json} example.js:
 * {username:'admin',password:'123456'}
 * @apiSuccess  user 返回user
 * @apiSuccess  token 返回token
 * @apiSuccessExample {json} Success-Response:
 *  {"code":0,data:{user:"",token:{}}}
 * @apiVersion 1.0.0
 */
// router.post('/login', passport.authenticate('local', { session: false }), login)
router.post('/login', (req, res, next) => {
  passport.authenticate('local', async function(err, user, info) {
    if (err) {
      return next(err)
    }
    if (!user) {
      return res.json({ code: 401, message: '你输入的账户名和密码不匹配！' })
    }
    const token = authCtrl.generateToken({ _id: user._id, username: user.username })
    res.json({ code: 0, data: { user, token }})
  })(req, res, next)
})

router.get('/me', login)

router.post('/logout', (req, res) => {
  res.send({ code: 0, data: 'OK' })
})

async function register(req, res, next) {
  let user = await userCtrl.insert(req.body)
  user = user.toObject()
  delete user.salt
  delete user.password
  req.user = user
  next()
}

function login(req, res) {
  const user = req.user
  const token = authCtrl.generateToken({ _id: user._id, username: user.username })
  res.json({ code: 0, data: { user, token }})
}
