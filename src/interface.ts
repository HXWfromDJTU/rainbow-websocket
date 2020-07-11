import { InterceptorManager } from './InterceptorManager'

export interface IOption {
  url: string
  logger?: Console
}

export interface IPromise {
  resolve: Function,
  reject: Function,
  method: string
}

export interface IResponse {
  id: string,
  jsonrpc: string,
  method: string,
  data: any,
  errCode: number,
}

export interface IRequest {
  id: string,
  jsonrpc: string,
  method: string,
  data: any
}
