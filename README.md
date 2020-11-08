# rainbow-websocket
[![npm version](https://badge.fury.io/js/rainbow-websocket.svg)](//npmjs.com/package/rainbow-websocket)     

rainbow-websocket is an basic implement of websocket, including authorization、promise encapsulation、error handle ...

## base todo-list
| No.| feature | process |
| --- | --- | --- |
| 1 | 异常处理 与 错误码 |  |
| 2 | 等待连接的请求处理 |  |
| 3 | 推送通知 |  |

## feature todo-list
| No.| feature | process |
| --- | --- | --- |
| 1 | 以`Promise`的形式调用 |  |
| 2 | 心跳机制 |  |
| 3 | 鉴权 |  |
| 4 | 请求拦截器 |  |

## import
```js
// esm
import RainbowWebsocket from 'rainbow-websocket'     

// cjs
const RainbowWebsocket = require('rainbow-websocket')      
```
```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/rainbow-websocket@0.0.4/dist/umd/rainbow-websocket.umd.js">
```

## test
```cnof
# websocket test server
npm run test:ws-server

# test page
npm run test
```
