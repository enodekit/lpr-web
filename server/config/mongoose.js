const _ = require('lodash')
const mongoose = require('mongoose')
const util = require('util')
const path = require('path')
const debug = require('debug')('express-mongoose-es6-rest-api:index')
const config = require('./config')

// connect to mongo db
const mongoUri = config.mongo.host
console.log(mongoUri)
console.log(config.mongo)
const options = _.merge(config.mongo.options || {}, { useCreateIndex: true, useNewUrlParser: true }) // 5.4版本的配置项
mongoose.connect(mongoUri, options)
// TODO 这样require不太优雅，但暂时只能这样
config.files.models.map(modelPath => require(path.resolve(modelPath)))
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`)
})

// print mongoose logs in dev env
if (config.MONGOOSE_DEBUG) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc)
  })
}

