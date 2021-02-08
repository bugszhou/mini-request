"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InterceptorManager = /** @class */ (function () {
    function InterceptorManager() {
        this.interceptors = [];
    }
    InterceptorManager.prototype.use = function (fulfilled, rejected) {
        this.interceptors.push({
            fulfilled: fulfilled,
            rejected: rejected,
        });
        return this.interceptors.length - 1;
    };
    InterceptorManager.prototype.eject = function (interceptorId) {
        if (!this.interceptors[interceptorId]) {
            return;
        }
        this.interceptors[interceptorId] = null;
    };
    InterceptorManager.prototype.forEach = function (fn) {
        this.interceptors.forEach(function (interceptor) {
            if (typeof fn === "function" && interceptor !== null) {
                fn(interceptor);
            }
        });
    };
    return InterceptorManager;
}());
exports.default = InterceptorManager;
//# sourceMappingURL=InterceptorManager.js.map