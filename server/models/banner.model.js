const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BannerSchema = new Schema({
  name: { // Banner名称
    type: String
  },
  title: { // 标题
    type: String
  },
  content: { // 内容
    type: String
  },
  path: {
    type: String
  },
  status: {
    type: Boolean
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Banner', BannerSchema)
