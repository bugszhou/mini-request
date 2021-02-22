"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable max-len */
/*
 * @Author: youzhao.zhou
 * @Date: 2021-02-05 14:31:47
 * @Last Modified by: youzhao.zhou
 * @Last Modified time: 2021-02-10 14:21:44
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
        this.reqConfig = this.copyAdapterConfig(config);
    }
    /**
     * 接口请求成功执行该方法
     * @param options response数据
     * @param resolve Promise.resolve
     */
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
    /**
     * 接口请求失败执行该方法
     * @param options response数据
     * @param reject Promise.reject
     */
    Adapter.prototype.reject = function (options, reject) {
        if (utils_1.isUndefined(options) || options === null) {
            reject({
                headers: null,
                status: "NETWORK_ERROR",
                errMsg: "Reject arguments Error",
                data: null,
                config: this.reqConfig,
                extra: null,
            });
        }
        reject({
            status: options.status,
            errMsg: options.errMsg,
            config: this.reqConfig,
            headers: options.headers || {},
            data: options.data,
            extra: utils_1.isUndefined(options.extra) ? null : options.extra,
        });
    };
    /**
     * 取消接口请求
     * @param listener 监听执行取消接口请求操作的监听函数
     */
    Adapter.prototype.subscribeCancelEvent = function (listener) {
        if (!this.reqConfig.cancelToken) {
            return;
        }
        return this.reqConfig.cancelToken.subscribeCancelEvent(listener);
    };
    Adapter.prototype.copyAdapterConfig = function (config) {
        if (utils_1.isUndefined(config) || config === null) {
            return {};
        }
        var reqConfig = utils_1.merge({}, config);
        delete reqConfig.Adapter;
        return reqConfig;
    };
    return Adapter;
}());
exports.default = Adapter;
//# sourceMappingURL=Adapter.js.map