"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../helpers/utils");
/**
 * 根据response.status的值来判断是不是TIMEOUT(超时)
 * @param response 任何类型的响应数据
 * @example
 * // return true
 * isTimeout({status: "TIMEOUT"});
 * // return false
 * isTimeout({status: "NETWORK_ERROR"});
 * // return false
 * isTimeout({});
 * @returns true or false
 *
 */
function isTimeout(response) {
    if (utils_1.isUndefined(response) || response === null) {
        return false;
    }
    return response.status === "TIMEOUT";
}
exports.default = isTimeout;
//# sourceMappingURL=isTimeout.js.map