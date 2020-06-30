"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.RainbowWebsocket = void 0;
var EventEmitter = require("eventemitter3");
var const_1 = require("./const");
var errorCode_1 = require("./errorCode");
var uniqueId = require('lodash.uniqueid');
var pkg = require('./package.json');
var JSON_RPC_VERSION = '2.0';
var RainbowWebsocket = /** @class */ (function (_super) {
    __extends(RainbowWebsocket, _super);
    function RainbowWebsocket(option) {
        var _this = _super.call(this) || this;
        _this._serverUrl = option.url;
        _this._ws = new WebSocket(_this._serverUrl);
        _this._logger = option.logger || console;
        _this._waitingQueue = [];
        _this._promises = new Map();
        _this._ws.onmessage = function (event) {
            console.log(event.data);
            // 简单的检测过后，进行相应处理
            if (event.data && typeof event.data === 'string' && event.data.includes(JSON_RPC_VERSION)) {
                _this.response(event.data);
            }
        };
        _this._ws.onopen = function (event) {
            _this._logger.log("RainbowWebsocket connected to " + _this._serverUrl + " successfully......");
            // ws通道联通后，发送前期未发送的请求(缓存队列中的请求，都已经注册登记过了，所以不需要再次登记)
            _this._waitingQueue.forEach(function (payload) {
                _this._ws.send(_this._toDataString(payload));
            });
        };
        return _this;
    }
    RainbowWebsocket.prototype.request = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var payload = Object.assign(data, {
                id: uniqueId(pkg.name + '-'),
                jsonrpc: JSON_RPC_VERSION
            });
            // 登记请求
            _this._promises.set(data.id, {
                resolve: resolve,
                reject: reject,
                method: payload.method
            });
            // 若ws连接达成，则先缓存请求
            if (_this._ws.readyState === const_1.WEBSOCKET_STATE.CONNECTING) {
                _this._waitingQueue.push(payload);
                return;
            }
            _this._logger.log('RainbowWebsocket send data', data);
            // 发送请求
            _this._ws.send(_this._toDataString(data));
        });
    };
    RainbowWebsocket.prototype.response = function (msg) {
        try {
            var res = JSON.parse(msg);
            this._logger.log('response msg:', msg);
            var promise = this._promises.get(res.id);
            // todo: 删除处理过的promise
            this._promises["delete"](res.id);
            this._logger.log('RainbowWebsocket delete the promise, id=', res.id);
            // todo: 根据errno决定执行哪一个reject还是resolve
            if (res.errCode !== errorCode_1.ErrorCode.SUCCESS) {
                promise.reject(res.errCode);
            }
            else {
                promise.resolve(res.data);
            }
        }
        catch (err) {
            this._logger.error('response msg parse fail');
            return;
        }
    };
    RainbowWebsocket.prototype._toDataString = function (data) {
        try {
            return JSON.stringify(data);
        }
        catch (err) {
            this._logger.error('RainbowWallet Stringify data error');
        }
    };
    return RainbowWebsocket;
}(EventEmitter));
exports.RainbowWebsocket = RainbowWebsocket;
