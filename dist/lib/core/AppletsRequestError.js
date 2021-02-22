"use strict";
/*
 * @Author: youzhao.zhou
 * @Date: 2021-01-31 21:52:37
 * @Last Modified by: youzhao.zhou
 * @Last Modified time: 2021-02-18 15:36:25
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
/**
 * 构建错误对象
 * @example
 * createError("Err Msg", config, status, response, extra)
 * @returns
 * {
 *  errMsg: string,
 *  config: config,
 *  status: http status,
 *  response: adapter response,
 *  extra: any other info,
 * }
 */
function createError(message, config, status, response, extra) {
    var tmpStatus = !status && status !== 0 ? "NETWORK_ERROR" : status;
    return new AppletsRequestError(message, config, tmpStatus, response, extra);
}
exports.createError = createError;
//# sourceMappingURL=AppletsRequestError.js.map