const Joi = require('joi')
const mongoose = require('mongoose')
const Product = mongoose.model('Product')
const GeneratorCtrl = require('./generator.controller')
const { getPageList } = require('../middleware/pagelist')
const Word = mongoose.model('Word')
const WordType = mongoose.model('WordType')
/**
 * 验证
 */
const productSchema = Joi.object().keys({
  name: Joi.string(),
  imgs: Joi.array().items(Joi.any()),
  prices: Joi.array().items(Joi.any()),
  content: Joi.string(),
  sort: Joi.number(),
  status: Joi.boolean()
})

class ProductCtrl extends GeneratorCtrl {
// 在这里新加函数或者修改继承的函数
  async list(options) {
    const { page, limit, key, sort, label, search, creator, ...where } = options
    if (key != null && label !== '') {
      const wordType = await WordType.findOne({ name: 'productTags' })
      console.log(wordType)
      const word = await Word.findOne({ wordType: wordType._id, key: key })
      if (word !== null) {
        where.keys = { $in: [word._id] }
      }
    }
    const opt = { sort }
    if (this.Model.schema.obj.creator) where.creator = creator
    if (label != null && label !== '') {
      where[label] = new RegExp(decodeURI(search), 'i')
    }
    console.log(where)
    return await getPageList(this.Model, page, limit, where, null, opt)
  }
}

module.exports = new ProductCtrl(Product, productSchema)

