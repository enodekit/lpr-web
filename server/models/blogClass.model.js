const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 博客类型
const BlogClassSchema = new Schema({
  name: { // 名称
    type: String
  },
  remark: { // 描述
    type: String
  },
  sort: { // 排序
    type: Number
  },
  status: { // 状态
    type: Boolean
  },
  level: { // 等级
    type: Number
  },
  children: [
    {
      type: Schema.Types.ObjectId, ref: 'BlogClass',
      autopopulate: { maxDepth: 3, sort: { 'sort': 1 }}
    }
  ]
}, {
  timestamps: true
})

module.exports = mongoose.model('BlogClass', BlogClassSchema)

