const Joi = require('joi')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const GeneratorCtrl = require('./generator.controller')
const { getPageLimit } = require('../utils/pagelist')
/**
 * 验证
 */
const userSchema = Joi.object({
  username: Joi.string().required(),
  trueName: Joi.string().required(),
  email: Joi.string().email(),
  password: Joi.string().required(),
  repeatPassword: Joi.string().required().valid(Joi.ref('password')), // 比对密码
  roles: Joi.array(), // 数组
  phones: Joi.string(), // 数组
  emails: Joi.string() // 数组
})

/**
 * this is UserCtrl
 * @constructor
 * @UserCtrl
 * const userCtrl = new UserCtrl();
 */
class UserCtrl extends GeneratorCtrl {
  async insert(body) {
    if (body.password === '') {
      throw new ServerError(10012, '密码不能为空')
    }
    if (process.env.ROLE === 'serve' && body.type === 0) {
      await updateMqttUser({ username: body.mqttUsername, password: body.mqttPassword, mqttRole: body.mqttRole })
    }
    return super.insert(body)
  }

  // 查询用户保存用户信息
  async findOne(option) {
    const user = await User.findOne(option)
    return user
  }
  /**
   * @param object
   * @param body
   * @returns {Promise<*>}
   */
  async update(object, body) {
    if (body.password === '') {
      delete body.password
    }
    if (process.env.ROLE === 'serve' && body.type === 0) {
      await updateMqttUser({ username: body.mqttUsername, password: body.mqttPassword, mqttRole: body.mqttRole })
    }
    return super.update(object, body)
  }

  async list(options) {
    options.select = options.select || ' -salt -password'
    if (typeof options !== 'object') {
      throw new TypeError('参数错误')
    }
    const { page, limit, sort, label, search, creator, time, range, autopopulate, select, ...where } = options
    const opt = { sort, autopopulate }
    if (typeof autopopulate !== 'boolean') {
      opt.autopopulate = autopopulate !== 'false'
    }
    const user = await User.findOne({ _id: mongoose.Types.ObjectId(creator) })
    if (creator && (user.username !== 'admin' && (user.roles !== null && user.roles.some(role => role != null && role.name !== 'admin')))) {
      where._id = creator
    }
    if (label != null && label !== '' && search != null && search !== '') {
      where[label] = new RegExp(decodeURI(search), 'i')
    }
    if (time != null && time !== '' && range && range.length === 2) {
      where[time] = { $gt: range[0], $lt: range[1] }
    }
    for (const key in where) {
      if (where[key] === '') { delete where[key] }
    }
    return await getPageLimit(this.Model, page, limit, where, select, opt)
  }

  // user表清理保留admin 账户
  async clear() {
    return await this.Model.deleteMany({ $nor: [{ username: 'admin' }] })
  }
}

module.exports = new UserCtrl(User, userSchema)

