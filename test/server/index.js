"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WS = require('ws');
var config_1 = require("./config");
var wss = new WS.Server({ port: config_1.serverConfig.port });
wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });
    ws.send('something');
});
