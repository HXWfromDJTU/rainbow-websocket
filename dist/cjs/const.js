"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDK_NAME = exports.WEBSOCKET_STATE = void 0;
// websocket的几个状态
var WEBSOCKET_STATE;
(function (WEBSOCKET_STATE) {
    WEBSOCKET_STATE[WEBSOCKET_STATE["CONNECTING"] = 0] = "CONNECTING";
    WEBSOCKET_STATE[WEBSOCKET_STATE["OPEN"] = 1] = "OPEN";
    WEBSOCKET_STATE[WEBSOCKET_STATE["CLOSING"] = 2] = "CLOSING";
    WEBSOCKET_STATE[WEBSOCKET_STATE["CLOSED"] = 3] = "CLOSED";
})(WEBSOCKET_STATE = exports.WEBSOCKET_STATE || (exports.WEBSOCKET_STATE = {}));
exports.SDK_NAME = 'RainbowWebsocket';
