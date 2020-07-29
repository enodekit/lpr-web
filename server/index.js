// config should be imported before importing any other file
const config = require('./config/config')
// require('./config/mongoose')
const app = require('./config/express')
// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912

const start = function() {
  if (!module.parent) {
    app.listen(config.port, () => {
      console.info(`项目启动,端口： ${config.port} (${config.env === 'development' ? '开发模式' : '成品模式'})`)
    })
  }
}

module.exports = start()
