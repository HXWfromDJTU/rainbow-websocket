"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCode = void 0;
// todo: error code 拆分
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["SUCCESS"] = 0] = "SUCCESS";
    ErrorCode[ErrorCode["DISCONNECT"] = 404] = "DISCONNECT";
})(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));
