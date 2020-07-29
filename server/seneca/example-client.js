
const client = require('seneca')()
  .use('seneca-amqp-transport')
  .client({
    type: 'amqp',
    pin: 'cmd:salute',
    hostname: '127.0.0.1',
    port: 5672,
    username: 'guest',
    vhost: '/',
    password: 'guest'
  })

setInterval(function() {
  client.act('cmd:salute', {
    name: 'World',
    max: 100,
    min: 25
  }, (err, res) => {
    if (err) {
      throw err
    }
    console.log(res)
  })
}, 1000)
