const mongoose = require('mongoose')
const Schema = mongoose.Schema
const autopopulate = require('mongoose-autopopulate')
const ProductSchema = new Schema({
  name: {
    type: String
  },
  keys: [{// 公司类型,手选字典
    type: Schema.Types.ObjectId, ref: 'Word',
    autopopulate: { maxDepth: 1 }
  }],
  img: {
    type: String
  },
  imgs: [],
  prices: [],
  content: {
    type: String
  },
  productClass: {
    type: Schema.Types.ObjectId, ref: 'ProductClass',
    autopopulate: { maxDepth: 1, sort: { 'sort': 1 }}
  },
  productClassArr: { // 用于存放检测设备级联的数组
    type: Array
  },
  sort: {
    type: Number
  },
  status: {
    type: Boolean
  },
  isshow: {
    type: Boolean
  }
}, {
  timestamps: true
})
ProductSchema.plugin(autopopulate)
module.exports = mongoose.model('Product', ProductSchema)
