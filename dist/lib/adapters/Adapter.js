"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable max-len */
/*
 * @Author: youzhao.zhou
 * @Date: 2021-02-05 14:31:47
 * @Last Modified by: youzhao.zhou
 * @Last Modified time: 2021-02-05 14:43:44
 * @Description http request adapter
 * 1. 自定义请求适配器接口规范
 * 2. 执行成功需要调用resolve
 * 3. 执行失败需要调用reject
 * 4. 监听用户取消时间执行abort
 *
 * @example:
 * 1. 创建实例：const adapter = new Adapter(config);
 * 2. 请求成功：adapter.resolve({headers: any, status: 200, data: {}, response: any}, resolve);
 * 3. 请求失败：adapter.reject({errMsg: "Request Timeout", status: "TIMEOUT", data: any, extra: any}, reject);
 * 4. 监听用户取消行为：adapter.abort((reason) => {
 *    // do something
 *    reject(reason);
 * });
 */
var utils_1 = require("../helpers/utils");
var Adapter = /** @class */ (function () {
    function Adapter(config) {
        this.reqConfig = config;
    }
    Adapter.prototype.resolve = function (options, resolve) {
        if (utils_1.isUndefined(options) || options === null) {
            resolve({
                headers: {},
                status: 200,
                data: {},
                config: this.reqConfig,
                originalRes: null,
            });
        }
        resolve({
            headers: options.headers,
            config: this.reqConfig,
            data: options.data,
            status: options.status,
            originalRes: utils_1.isUndefined(options.response) ? null : options.response,
        });
    };
    Adapter.prototype.reject = function (options, reject) {
        if (utils_1.isUndefined(options) || options === null) {
            reject({
                status: "NETWORK_ERROR",
                errMsg: "Reject arguments Error",
                config: this.reqConfig,
                extra: null,
            });
        }
        reject({
            config: this.reqConfig,
            status: options.status,
            data: options.data,
            errMsg: options.errMsg,
            extra: utils_1.isUndefined(options.extra) ? null : options.extra,
        });
    };
    Adapter.prototype.abort = function (executor) {
        if (!this.reqConfig.cancelToken) {
            return;
        }
        this.reqConfig.cancelToken.execAbort(function (reason) {
            executor(reason);
        });
    };
    return Adapter;
}());
exports.default = Adapter;
//# sourceMappingURL=Adapter.js.map