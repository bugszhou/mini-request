"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../helpers/utils");
function isValidInterceptor(executor) {
    if (utils_1.isUndefined(executor)) {
        return true;
    }
    if (utils_1.isFunction(executor)) {
        return true;
    }
    return false;
}
var InterceptorManager = /** @class */ (function () {
    function InterceptorManager() {
        this.interceptors = [];
    }
    InterceptorManager.prototype.use = function (fulfilled, rejected) {
        var interceptor = {
            fulfilled: isValidInterceptor(fulfilled) ? fulfilled : undefined,
            rejected: isValidInterceptor(rejected) ? rejected : undefined,
        };
        this.interceptors.push(interceptor);
        return this.interceptors.length - 1;
    };
    InterceptorManager.prototype.eject = function (interceptorId) {
        if (!this.interceptors[interceptorId]) {
            return;
        }
        this.interceptors[interceptorId] = null;
    };
    InterceptorManager.prototype.forEach = function (fn) {
        this.interceptors.forEach(function (interceptor, interceptorId) {
            if (typeof fn === "function" && interceptor !== null) {
                fn(interceptor, interceptorId);
            }
        });
    };
    InterceptorManager.prototype.size = function () {
        return this.interceptors.length;
    };
    return InterceptorManager;
}());
exports.default = InterceptorManager;
//# sourceMappingURL=InterceptorManager.js.map