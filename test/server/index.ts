const WS = require('ws');
import { serverConfig } from './config'

const wss = new WS.Server({ port: serverConfig.port });

wss.on('connection', function connection(ws) {
  console.log('ws server is ready, listening on localhost:' + serverConfig.port)
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});
