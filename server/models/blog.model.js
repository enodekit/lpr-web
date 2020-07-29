const mongoose = require('mongoose')
const Schema = mongoose.Schema
const autopopulate = require('mongoose-autopopulate')
const BlogSchema = new Schema({
  title: { // 标题
    type: String
  },
  summary: { // 概括
    type: String
  },
  img: { // 展示图
    type: String
  },
  content: { // 文本内容
    type: String
  },
  tags: { // 标签
    type: String
  },
  blogClass: { // 所属类型
    type: Schema.Types.ObjectId, ref: 'BlogClass',
    autopopulate: { maxDepth: 1, sort: { 'sort': 1 }}
  },
  sort: { // 排序
    type: Number
  },
  status: { // 状态
    type: Boolean
  },
  read: { // 打开次数
    type: Number
  }
}, {
  timestamps: true
})
BlogSchema.plugin(autopopulate)
module.exports = mongoose.model('Blog', BlogSchema)
