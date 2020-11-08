import * as EventEmitter from 'eventemitter3';
import { WEBSOCKET_STATE } from './const';
import { ErrorCode } from './errorCode';
import { InterceptorManager } from './InterceptorManager';
import { isNotifyMsg } from './helper';
const uniqueId = require('lodash.uniqueid');
const JSON_RPC_VERSION = '2.0';
export class RainbowWebsocket extends EventEmitter {
    constructor(option) {
        super();
        this._serverUrl = option.url;
        this._ws = new WebSocket(this._serverUrl);
        this._logger = option.logger || console;
        this._waitingQueue = [];
        this._promises = new Map();
        this.interceptors = {
            request: new InterceptorManager(),
            response: new InterceptorManager()
        };
        this._ws.onmessage = event => {
            console.log(event.data);
            // 简单的检测过后，进行相应处理
            if (event.data && typeof event.data === 'string' && event.data.includes(JSON_RPC_VERSION)) {
                this.response(event.data);
            }
        };
        this._ws.onopen = event => {
            this._logger.log(`RainbowWebsocket connected to ${this._serverUrl} successfully......`);
            // ws通道联通后，发送前期未发送的请求(缓存队列中的请求，都已经注册登记过了，所以不需要再次登记)
            this._waitingQueue.forEach(payload => {
                this._ws.send(this._toDataString(payload));
            });
        };
        this._ws.onclose = event => {
            this._logger.log(`RainbowWebsocket has close ......`);
            // 将所有未处理的请求都reject调
            for (const record of this._promises) { // 遍历Set
                const request = record[1];
                request.reject(ErrorCode.DISCONNECT);
            }
        };
    }
    request(data, isNotify = false) {
        return new Promise((resolve, reject) => {
            const payload = Object.assign(data, {
                id: uniqueId(RainbowWebsocket + '-'),
                jsonrpc: JSON_RPC_VERSION
            });
            // 通过请求拦截器
            const _payload = this._requestInterceptorExecutor(payload);
            if (!isNotify) {
                // 登记请求
                this._promises.set(data.id, {
                    resolve,
                    reject,
                    method: _payload.method
                });
            }
            // 若ws连接尚未达成，则先缓存请求
            if (this._ws.readyState === WEBSOCKET_STATE.CONNECTING) {
                this._waitingQueue.push(_payload);
                return;
            }
            this._logger.log('RainbowWebsocket send data', data);
            // 发送请求
            this._ws.send(this._toDataString(data));
        });
    }
    response(msg) {
        try {
            const res = JSON.parse(msg);
            this._logger.log('response msg:', msg);
            const promise = this._promises.get(res.id);
            // todo: 删除处理过的promise
            this._promises.delete(res.id);
            this._logger.log('RainbowWebsocket delete the promise, id=', res.id);
            // 响应中间件
            const _res = this._responseInterceptorExecutor(res);
            // 判断是否是通知性的消息
            if (isNotifyMsg(res)) {
                this.emit(`notify:${res.method}`, res.data);
            }
            else {
                // todo: 根据errno决定执行哪一个reject还是resolve
                if (_res.errCode !== ErrorCode.SUCCESS) {
                    promise.reject(_res.errCode);
                }
                else {
                    promise.resolve(_res.data);
                }
            }
        }
        catch (err) {
            this._logger.error('response msg parse fail');
            return;
        }
    }
    _requestInterceptorExecutor(payload) {
        let _payload = payload;
        this.interceptors.request.forEach((handler) => {
            _payload = handler(_payload);
        });
        return _payload;
    }
    _responseInterceptorExecutor(payload) {
        let _payload = payload;
        this.interceptors.response.forEach((handler) => {
            _payload = handler(_payload);
        });
        return _payload;
    }
    _toDataString(data) {
        try {
            return JSON.stringify(data);
        }
        catch (err) {
            this._logger.error('RainbowWallet Stringify data error');
        }
    }
}
