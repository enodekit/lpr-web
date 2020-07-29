const mongoose = require('mongoose')
const Schema = mongoose.Schema

var childSchema = new Schema({ name: 'string' })

const CaseSchema = new Schema({
  name:{  //案例名称
    type:String
  },
  caseDate:{  //案例时间
    type:Date
  },
  content:{
    type:String
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Case', CaseSchema)
