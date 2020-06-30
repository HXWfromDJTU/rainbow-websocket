const WS = require('ws');
import { serverConfig } from './config'

const wss = new WS.Server({ port: serverConfig.port });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});
