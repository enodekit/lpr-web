const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CompanySchema = new Schema({
  name: {
    type: String
  },
  email: { // 联系方式
    type: String
  },
  content: { // 公司介绍
    type: String
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Company', CompanySchema)
