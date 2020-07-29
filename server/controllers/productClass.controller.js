const Joi = require('joi')
const mongoose = require('mongoose')
const ProductClass = mongoose.model('ProductClass')
const GeneratorCtrl = require('./generator.controller')

/**
 * 验证
 */
const productClassSchema = Joi.object().keys({
  name: Joi.string(),
  remark: Joi.string(),
  sort: Joi.number(),
  status: Joi.boolean(),
  productClass: Joi.any()
})

class ProductClassCtrl extends GeneratorCtrl {
// 在这里新加函数或者修改继承的函数
}

module.exports = new ProductClassCtrl(ProductClass, productClassSchema)

