import * as EventEmitter from 'eventemitter3';
import { IOption, IPromise } from './interface';
import { InterceptorManager } from './InterceptorManager';
export declare class RainbowWebsocket extends EventEmitter {
    protected _serverUrl: string;
    _ws: WebSocket;
    protected _promises: Map<string, IPromise>;
    protected _logger: Console;
    protected _waitingQueue: Array<any>;
    interceptors: {
        request: InterceptorManager;
        response: InterceptorManager;
    };
    constructor(option: IOption);
    request(data: any, isNotify?: boolean): Promise<any>;
    response(msg: string): void;
    _requestInterceptorExecutor(payload: any): any;
    _responseInterceptorExecutor(payload: any): any;
    _toDataString(data: any): string;
}
