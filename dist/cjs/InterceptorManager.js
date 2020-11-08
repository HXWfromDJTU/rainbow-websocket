"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterceptorManager = void 0;
class InterceptorManager {
    constructor() {
        this.handlers = [];
        return this;
    }
    use(fulfilled, rejected) {
        this.handlers.push({
            fulfilled: fulfilled,
            rejected: rejected
        });
        return this.handlers.length - 1;
    }
    forEach(fn) {
        this.handlers.forEach(fn);
    }
}
exports.InterceptorManager = InterceptorManager;
