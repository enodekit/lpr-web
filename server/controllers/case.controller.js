const Joi = require('joi')
const mongoose = require('mongoose')
const Case = mongoose.model('Case')
const GeneratorCtrl = require('./generator.controller')

/**
 * 验证
 */
const caseSchema = Joi.object().keys({
name:Joi.string(),
caseDate:Joi.date(),
content:Joi.string()
})

class CaseCtrl extends GeneratorCtrl {
// 在这里新加函数或者修改继承的函数

}

module.exports = new CaseCtrl(Case, caseSchema)

