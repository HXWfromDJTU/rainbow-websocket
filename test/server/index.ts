const WS = require('ws');
const http = require('http')
import { serverConfig } from './config'
const crypto = require('crypto');
// const wss = new WS.Server({ port: serverConfig.port });

const httpServer = http.createServer((req, res) => {
  console.log('req')
  req.on('data', chunk => {
    console.log(chunk)
  })
}).listen(serverConfig.port, serverConfig.host);

httpServer.on('upgrade', async (req, socket, head) => {
  console.log('upgrade......')
  const cookie = req.headers['cookie']

  // 请求用户服务身份验证
  const authorized = true

  if (authorized) {
    const secWebSocketAccept = generateAcceptKey(req.headers['sec-websocket-key'])
    socket.write('HTTP/1.1 101 Web Socket Protocol Handshake\r\n' +
      'Upgrade: WebSocket\r\n' +
      'Connection: Upgrade\r\n' +
      'Sec-WebSocket-Accept: ' + secWebSocketAccept + '\r\n' +
      '\r\n');

    new
  } else {
    socket.write('HTTP/1.1 403 Unauthorized\r\n' +
      '\r\n');
  }
})

/**
 * 生成 websocket AcceptKey
 * @param websocketKey
 */
function generateAcceptKey (websocketReqKey: string): string {
  const magic = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
  return crypto.createHash('sha1')
  .update(websocketReqKey + magic)
  .digest('base64');
}


console.log('http listener on ', serverConfig.host + ':' + serverConfig.port)

// wss.on('connection', function connection(ws) {
//   console.log('ws server is ready, listening on localhost:' + serverConfig.port)
//   ws.on('message', function incoming(message) {
//     console.log('received: %s', message);
//   });
//
//   ws.send('something');
// });
