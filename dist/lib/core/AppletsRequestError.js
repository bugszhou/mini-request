"use strict";
/*
 * @Author: youzhao.zhou
 * @Date: 2021-01-31 21:52:37
 * @Last Modified by: youzhao.zhou
 * @Last Modified time: 2021-02-05 23:14:19
 * @Description 处理错误
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createError = void 0;
var AppletsRequestError = /** @class */ (function () {
    function AppletsRequestError(message, config, status, response, extra) {
        // super(message);
        this.extra = null;
        this.errMsg = message;
        this.config = config;
        this.status = status;
        this.response = response;
        this.extra = extra;
        // Object.setPrototypeOf(this, AppletsRequestError.prototype);
    }
    return AppletsRequestError;
}());
exports.default = AppletsRequestError;
function createError(message, config, status, response, extra) {
    var tmpStatus = !status && status !== 0 ? "NETWORK_ERROR" : status;
    return new AppletsRequestError(message, config, tmpStatus, response, extra);
}
exports.createError = createError;
//# sourceMappingURL=AppletsRequestError.js.map