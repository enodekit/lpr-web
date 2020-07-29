'use strict'

const Path = require('path')

require('seneca')()
  .use('seneca-amqp-transport')
  .add('cmd:salute', function(message, done) {
    return done(null, {
      id: Math.floor(Math.random() * (message.max - message.min + 1)) + message.min,
      message: `Hello2 ${message.name}!`,
      from: {
        pid: process.pid,
        file: Path.relative(process.cwd(), __filename)
      },
      now: Date.now()
    })
  })
  .listen({
    type: 'amqp',
    hostname: '127.0.0.1',
    port: 5672,
    username: 'lifengtc122',
    password: 'L4yuechu4',
    pin: 'cmd:salute',
    vhost: '/'
  })
