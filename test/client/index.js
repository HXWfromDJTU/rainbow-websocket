"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../server/config");
var src_1 = require("../../src");
var BackendApi = /** @class */ (function () {
    function BackendApi(option) {
        this._url = option.url;
        this._rainbowWebsocket = new src_1.RainbowWebsocket({
            url: this._url
        });
    }
    BackendApi.prototype.version = function () {
        return this._rainbowWebsocket.request({
            data: null
        });
    };
    return BackendApi;
}());
exports.BackendApi = BackendApi;
var backendApi = new BackendApi({
    url: config_1.serverConfig.host + ":" + config_1.serverConfig.port
});
var api = new BackendApi({
    url: config_1.serverConfig.host + ':' + config_1.serverConfig.port
});
