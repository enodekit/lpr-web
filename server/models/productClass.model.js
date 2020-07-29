const mongoose = require('mongoose')
const Schema = mongoose.Schema
const autopopulate = require('mongoose-autopopulate')
const ProductClassSchema = new Schema({
  name: {
    type: String
  },
  img: { // 图片
    type: String
  },
  remark: { // 描述
    type: String
  },
  sort: {
    type: Number
  },
  status: {
    type: Boolean
  },
  isshow: {
    type: Boolean
  },
  level: {
    type: Number
  },
  children: [
    {
      type: Schema.Types.ObjectId, ref: 'ProductClass',
      autopopulate: { maxDepth: 2, sort: { 'sort': 1 }}
    }
  ],
  father: {
    type: String
  }
}, {
  timestamps: true
})
ProductClassSchema.plugin(autopopulate)
module.exports = mongoose.model('ProductClass', ProductClassSchema)
