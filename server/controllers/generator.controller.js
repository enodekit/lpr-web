const Joi = require('joi')
const mongoose = require('mongoose')
const { getPageList } = require('../middleware/pagelist')

class GeneratorCtrl {
  constructor(Model, joiSchema) {
    this.Model = Model
    this.joiSchema = joiSchema
  }

  async getById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new TypeError('Id is invalid.')
    }
    return await this.Model.findById(id)
  }

  async insert(body) {
    body = await Joi.validate(body, this.joiSchema, { abortEarly: false, allowUnknown: true }) // 返回找到的所有错误
    body = await new this.Model(body).save()
    return body.toObject()
  }

  async update(object, body) {
    object = Object.assign(object, body)
    await object.save()
  }

  async list(options) {
    if (typeof options !== 'object') {
      throw new TypeError('参数错误')
    }
    console.log(options)
    const { page, limit, sort, label, search, creator, ...where } = options
    const opt = { sort }
    if (this.Model.schema.obj.creator) where.creator = creator
    console.log(where)
    if (label != null && label !== '') {
      where[label] = new RegExp(decodeURI(search), 'i')
    }
    return await getPageList(this.Model, page, limit, where, null, opt)
  }

  async remove(obj) {
    return obj.remove()
  }

  async removes(_ids) {
    return await this.Model.deleteMany({ _id: { $in: _ids }})
  }
}

module.exports = GeneratorCtrl
