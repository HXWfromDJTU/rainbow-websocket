const WebSocket = require('ws');
const net = require('net')
import { serverConfig } from './config'
const crypto = require('crypto');
const headerParser = require('parse-headers')
//
// const server = net.createServer(socket => {
//   console.log('req')
//   socket.on('data', chunk => {
//     const headers = headerParser(Buffer.from(chunk).toString())
//
//     // 检测到是 websocket 建立信道的请求
//     if (headers['upgrade'] && headers['sec-websocket-key']) {
//       const secWebSocketAccept = generateAcceptKey(headers['sec-websocket-key'])
//
//       // 请求用户服务身份验证
//       const authorized = true
//
//       if (authorized) {
//         socket.write('HTTP/1.1 101 Web Socket Protocol Handshake\r\n' +
//           'Upgrade: WebSocket\r\n' +
//           'Connection: Upgrade\r\n' +
//           'Sec-WebSocket-Accept: ' + secWebSocketAccept + '\r\n' +
//           '\r\n');
//       } else {
//         socket.write('HTTP/1.1 403 Unauthorized' + chunk + '\r\n');
//       }
//     } else {
//       console.log(chunk)
//       socket.write(chunk)
//     }
//   })
// }).listen(serverConfig.port, serverConfig.host);
//
// /**
//  * 生成 websocket AcceptKey
//  * @param websocketKey
//  */
// function generateAcceptKey (websocketReqKey: string): string {
//   const magic = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
//   return crypto.createHash('sha1')
//   .update(websocketReqKey + magic)
//   .digest('base64');
// }
//
//
// console.log('http listener on ', serverConfig.host + ':' + serverConfig.port)

const wss = new WebSocket.Server({ port: serverConfig.port });

wss.on('connection', function connection(ws) {
  console.log('ws server is ready, listening on localhost:' + serverConfig.port)

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.on('close', function incoming(message) {
    console.log('websocket peer closed', message)
  });

  ws.send('something');
});
