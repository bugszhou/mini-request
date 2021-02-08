"use strict";
/*
 * @Author: youzhao.zhou
 * @Date: 2021-02-04 16:09:10
 * @Last Modified by: youzhao.zhou
 * @Last Modified time: 2021-02-05 23:44:52
 * @Description request adapter
 *
 * 1. 执行成功需要返回IAppletsRequestResponse，执行失败即为reject返回IAppletsRequestAdapterError
 * 2. 如果取消返回IAppletsRequest.ICanceler
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../helpers/utils");
var Adapter_1 = require("../Adapter");
var configAdapter_1 = require("./configAdapter");
function weappRequest(config) {
    function requestSuccess(res) {
        if (utils_1.isUndefined(res) || res === null) {
            return {
                headers: {},
                status: 200,
                data: {},
                response: res,
            };
        }
        return {
            headers: res.header,
            status: res.statusCode,
            data: dataParser(res.data),
            response: res,
        };
    }
    /**
     * 获取错误类型
     * @param err
     * @param timeout
     * @returns NETWORK_ERROR | TIMEOUT
     * @example {
     *    msg: `Timeout of 2000 ms exceeded`,
     *    type: "TIMEOUT",
     *  }
     */
    function failType(err, timeout) {
        if (err &&
            (err.errMsg || "").toString().toLowerCase().includes("timeout")) {
            return {
                msg: "Timeout of " + (timeout || "") + " ms exceeded",
                type: "TIMEOUT",
            };
        }
        return {
            msg: "Network Error",
            type: "NETWORK_ERROR",
        };
    }
    /**
     * JSON parse data
     * @param data
     */
    function dataParser(data) {
        if (typeof data !== "string") {
            return data;
        }
        try {
            return JSON.parse(data);
        }
        catch (e) {
            return data;
        }
    }
    function getReqConfig(originalConfig) {
        if (utils_1.isUndefined(originalConfig) || originalConfig === null) {
            return {};
        }
        var tmpConfig = utils_1.merge({}, originalConfig);
        tmpConfig.headers = originalConfig.header;
        delete tmpConfig.header;
        return tmpConfig;
    }
    return new Promise(function (resolve, reject) {
        var reqConfig = configAdapter_1.default(config);
        var adapter = new Adapter_1.default(getReqConfig(reqConfig));
        var request = wx.request(__assign(__assign({}, reqConfig), { success: function (res) {
                adapter.resolve(requestSuccess(res), resolve);
            },
            fail: function (err) {
                var errData = failType(err, reqConfig.timeout);
                var rejectData = {
                    errMsg: errData.msg,
                    status: errData.type,
                    extra: err,
                };
                adapter.reject(rejectData, reject);
            },
            complete: function () {
                request = null;
            } }));
        adapter.abort(function (reason) {
            reject(reason);
            request.abort();
            request = null;
        });
        if (typeof config.getRequestTask === "function") {
            config.getRequestTask(request);
        }
    });
}
exports.default = weappRequest;
//# sourceMappingURL=weappRequest.js.map