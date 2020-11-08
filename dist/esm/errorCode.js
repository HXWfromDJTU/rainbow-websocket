// todo: error code 拆分
export var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["SUCCESS"] = 0] = "SUCCESS";
    ErrorCode[ErrorCode["DISCONNECT"] = 404] = "DISCONNECT";
})(ErrorCode || (ErrorCode = {}));
