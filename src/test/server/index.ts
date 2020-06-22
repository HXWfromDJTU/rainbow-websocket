const net = require('net')

export const config = {
  host: 'localhost',
  port: '9528'
}

const server = net.createServer(sock => {
  sock.on('connection', event => {
    console.log('server socket connected...')
  })
  sock.on('data', event => {
    console.log('server receive data', event)
  })
})

server.listen(config.host, config.port)
