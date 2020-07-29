const Joi = require('joi')
const mongoose = require('mongoose')
const Company = mongoose.model('Company')
const GeneratorCtrl = require('./generator.controller')

/**
 * 验证
 */
const companySchema = Joi.object().keys({
name:Joi.string(),
email:Joi.string(),
content:Joi.boolean()
})

class CompanyCtrl extends GeneratorCtrl {
// 在这里新加函数或者修改继承的函数

}

module.exports = new CompanyCtrl(Company, companySchema)

