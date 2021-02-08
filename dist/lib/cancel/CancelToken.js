"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cancel_1 = require("./Cancel");
var CancelToken = /** @class */ (function () {
    function CancelToken(executor) {
        var _this = this;
        this.promiseResolve = function () {
            // empty
        };
        this.promise = new Promise(function (resolve) {
            _this.promiseResolve = resolve;
        });
        if (typeof executor === "function") {
            executor(this.cancel.bind(this));
        }
    }
    CancelToken.source = function () {
        var cancel = function () {
            // empty
        };
        var token = new CancelToken(function (cancelFn) {
            cancel = cancelFn;
        });
        return {
            token: token,
            cancel: cancel,
        };
    };
    CancelToken.prototype.cancel = function (message) {
        if (this.reason) {
            return;
        }
        this.reason = new Cancel_1.default(message);
        this.promiseResolve(this.reason);
    };
    CancelToken.prototype.execAbort = function (resolution) {
        return this.promise.then(resolution);
    };
    CancelToken.prototype.throwIfRequested = function () {
        if (this.reason) {
            throw this.reason;
        }
    };
    return CancelToken;
}());
exports.default = CancelToken;
//# sourceMappingURL=CancelToken.js.map