const path = require('path')
const express = require('express')
const morgan = require('morgan')
const _ = require('lodash')
const HttpError = require('http-errors')
const logger = require('./logger')
const winston = require('winston')
const expressWinston = require('express-winston')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const compress = require('compression')
const methodOverride = require('method-override')
const cors = require('cors')
const helmet = require('helmet')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')
// const routes = require('../routes/index.route')
const config = require('./config')
const passport = require('./passport')
const app = express()

// console 打印
if (_.has(config, 'log.format')) {
  app.use(morgan(logger.getLogFormat()))
}

// 记录所有请求的日志 无必要 除非需要做全面日志监控
// app.use(expressWinston.logger({
//   transports: [
//     new winston.transports.File({ filename: config.log.fileLogger.infoFile })
//   ],
//   format: winston.format.combine(
//     winston.format.colorize(),
//     winston.format.json()
//   )
// }))

// Choose what fronten framework to serve the dist from
var distDir = '../../dist/'
// var distWebDir = '../../' + process.env.CLIENT_DIST
// console.log(distWebDir)
app.use(compress())
app.use(express.static(path.join(__dirname, distDir)))
// app.use(express.static(path.join(__dirname, distWebDir)))
app.use(express.static(path.join(__dirname, '../../assets')))

app.use(/^((?!(api|web)).)*/, (req, res) => {
  res.sendFile(path.join(__dirname, distDir + '/index.html'))
})

// app.use('/clients', (req, res) => {
//   res.sendFile(path.join(__dirname, distDir + '/index.html'))
// })

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}))

app.use(cookieParser())

app.use(methodOverride())

// secure apps by setting various HTTP headers
app.use(helmet())

// 跨域共享  可用于前后端分离开发
app.use(cors({
  origin: ['http://localhost:9526', 'http://127.0.0.1:9526', 'http://localhost:9527', 'http://127.0.0.1:9527', 'http://localhost:4049'], // 指定可访问域
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // 指定可访问请求
  alloweHeaders: ['Conten-Type', 'Authorization'],
  credentials: true // 是否带cookie
}))

app.use(passport.initialize())

// api文档 未编写
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// API router
// app.use('/api/', routes)
// app.use('/api-v1/', routes)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  console.log(req)
  const err = new HttpError(404)
  return next(err)
})

// error handler, send stacktrace only during development
app.use((err, req, res, next) => {
  // customize Joi validation errors
  console.log(req)
  if (err.isJoi) {
    err.message = err.details.map(e => e.message).join('; ')
    err.status = 400
  }
  if (err.name === 'CastError' || err.name === 'MongoError' || err.name === 'ReferenceError' || err.name === 'TypeError') {
    err.status = 400
  }
  res.status(err.status || 500).json({
    message: err.message
  })

  next(err)
})

// express-winston errorLogger makes sense AFTER the router.
app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: config.log.fileLogger.errorFile })
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  )
}))

module.exports = app
