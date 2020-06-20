# rainbow-websocket
rainbow-websocket is an basic implement of websocket base on nodejs, including authentication、promise encapsulation、error handle and so on...

## todo
### 核心关注点
* 调用时期望获得的是一个`Promise`。
* ws最后只提供一个通信的通道，请求与返回的对应需要自己进行匹配(一般使用ID进行)。
* 如何维持维持心跳💓
* cookie是否发送？
* 在未连接成功前，发送的请求，该如何被处理？(缓存队列？)
* 网络发生异常的时候，调用方如何知晓呢？

### 业务方需求
* 如何实现鉴权？
* web端如何实现推送接受？若当时不在线呢？
* 错误码的制定

* ws服务如何翻墙？
