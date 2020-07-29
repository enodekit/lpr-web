const Joi = require('joi')
const mongoose = require('mongoose')
const Banner = mongoose.model('Banner')
const GeneratorCtrl = require('./generator.controller')

/**
 * 验证
 */
const bannerSchema = Joi.object().keys({
  name: Joi.string(),
  title: Joi.string(),
  path: Joi.string(),
  status: Joi.boolean()
})

class BannerCtrl extends GeneratorCtrl {
// 在这里新加函数或者修改继承的函数

}

module.exports = new BannerCtrl(Banner, bannerSchema)

