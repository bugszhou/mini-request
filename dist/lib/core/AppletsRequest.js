"use strict";
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
var CancelToken_1 = require("../cancel/CancelToken");
var isCancel_1 = require("../cancel/isCancel");
var defaults_1 = require("../defaults");
var isNetworkError_1 = require("../error/isNetworkError");
var isTimeout_1 = require("../error/isTimeout");
var combineURLs_1 = require("../helpers/combineURLs");
var isAbsoluteURL_1 = require("../helpers/isAbsoluteURL");
var transformUrl_1 = require("../helpers/transformUrl");
var utils_1 = require("../helpers/utils");
var InterceptorManager_1 = require("./InterceptorManager");
var mergeConfig_1 = require("./mergeConfig");
var request_1 = require("./request");
var AppletsRequest = /** @class */ (function () {
    function AppletsRequest(config) {
        this.AppletsRequest = AppletsRequest;
        this.CancelToken = CancelToken_1.default;
        this.isCancel = isCancel_1.default;
        this.defaults = {};
        this.isTimeout = isTimeout_1.default;
        this.isNetworkError = isNetworkError_1.default;
        if (config) {
            this.defaults = config;
        }
        this.interceptors = {
            request: new InterceptorManager_1.default(),
            response: new InterceptorManager_1.default(),
        };
    }
    AppletsRequest.prototype.request = function (options, config) {
        var formattedConfig = {};
        if (typeof options === "string") {
            formattedConfig = this.transformConfig(config);
            formattedConfig.url = options;
        }
        else {
            formattedConfig = options;
        }
        formattedConfig = mergeConfig_1.default(this.defaults, formattedConfig);
        var chain = [
            {
                fulfilled: request_1.default,
                rejected: undefined,
            },
        ];
        this.interceptors.request.forEach(function (interceptor) {
            // eslint-disable-next-line implicit-arrow-linebreak
            return chain.unshift(interceptor);
        }
        // eslint-disable-next-line function-paren-newline
        );
        this.interceptors.response.forEach(function (interceptor) {
            // eslint-disable-next-line implicit-arrow-linebreak
            return chain.push(interceptor);
        }
        // eslint-disable-next-line function-paren-newline
        );
        var promise = Promise.resolve(formattedConfig);
        chain.forEach(function (interceptor) {
            if (!interceptor) {
                return;
            }
            promise = promise.then(interceptor.fulfilled, interceptor.rejected);
        });
        return promise;
    };
    AppletsRequest.prototype.get = function (url, config) {
        return this.requestWithMethod(url, "GET", config);
    };
    AppletsRequest.prototype.delete = function (url, config) {
        return this.requestWithMethod(url, "DELETE", config);
    };
    AppletsRequest.prototype.head = function (url, config) {
        return this.requestWithMethod(url, "HEAD", config);
    };
    AppletsRequest.prototype.options = function (url, config) {
        return this.requestWithMethod(url, "OPTIONS", config);
    };
    AppletsRequest.prototype.post = function (url, data, config) {
        return this.requestWithData(url, "POST", data, config);
    };
    AppletsRequest.prototype.put = function (url, data, config) {
        return this.requestWithData(url, "PUT", data, config);
    };
    AppletsRequest.prototype.create = function (config) {
        var miniRequest = new AppletsRequest(mergeConfig_1.default(defaults_1.default, config));
        var ins = AppletsRequest.prototype.request.bind(miniRequest);
        return utils_1.assign(ins, miniRequest);
    };
    AppletsRequest.prototype.all = function (promises) {
        if (promises.length === 0) {
            throw new TypeError("arguments length is 0");
        }
        return Promise.all(promises);
    };
    AppletsRequest.prototype.getUri = function (config) {
        var url = config.url, baseURL = config.baseURL, params = config.params;
        var tmpUrl = url || "";
        var combinedURL = isAbsoluteURL_1.default(tmpUrl)
            ? tmpUrl
            : combineURLs_1.default(baseURL || "", tmpUrl);
        var formattedUrl = transformUrl_1.default(combinedURL, params, config.paramsSerializer);
        return formattedUrl;
    };
    AppletsRequest.prototype.requestWithMethod = function (url, method, config) {
        return this.request(__assign(__assign({}, this.transformConfig(config)), { url: url,
            method: method }));
    };
    AppletsRequest.prototype.requestWithData = function (url, method, data, config) {
        return this.requestWithMethod(url, method, __assign(__assign({}, this.transformConfig(config)), { data: data }));
    };
    AppletsRequest.prototype.transformConfig = function (config) {
        return utils_1.isPlainObject(config) ? config : {};
    };
    return AppletsRequest;
}());
exports.default = AppletsRequest;
//# sourceMappingURL=AppletsRequest.js.map