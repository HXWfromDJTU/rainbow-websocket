"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNotifyMsg = void 0;
function isNotifyMsg(msgObj) {
    const notifyKeys = ['jsonrpc', 'id', 'event'];
    // 检查是否符合所有的 IRequest Key
    return notifyKeys.every((requestKey) => {
        return msgObj.hasOwnProperty(requestKey);
    });
}
exports.isNotifyMsg = isNotifyMsg;
