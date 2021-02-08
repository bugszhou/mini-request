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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var assembleHeaders_1 = require("../helpers/assembleHeaders");
var transformMethod_1 = require("../helpers/transformMethod");
var transformUrl_1 = require("../helpers/transformUrl");
var transformConfig_1 = require("./transformConfig");
var transformData_1 = require("./transformData");
var isCancel_1 = require("../cancel/isCancel");
var isURLSameOrigin_1 = require("../helpers/isURLSameOrigin");
var storageCookies_1 = require("../adapters/wx/storageCookies");
var utils_1 = require("../helpers/utils");
var parseCookie_1 = require("../helpers/parseCookie");
var AppletsRequestError_1 = require("./AppletsRequestError");
var combineURLs_1 = require("../helpers/combineURLs");
var isAbsoluteURL_1 = require("../helpers/isAbsoluteURL");
function request(config) {
    return __awaiter(this, void 0, void 0, function () {
        var transformedConfig, res, reason_1, err;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    transformedConfig = formattedConfig(config);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, config.adapter(transformedConfig)];
                case 2:
                    res = _a.sent();
                    throwIfCancellationRequested(transformedConfig);
                    if (utils_1.isPlainObject(res.headers)) {
                        res.cookies = parseCookie_1.default(assembleHeaders_1.formattedHeader(res.headers, ["Set-Cookie"])["Set-Cookie"]);
                    }
                    if (config.autoCookies) {
                        storageCookies_1.default(res.cookies);
                    }
                    if (typeof config.validateStatus === "function" &&
                        config.validateStatus(res.status)) {
                        res.data = transformData_1.default(res.data, res.headers, transformedConfig.transformResponse);
                        return [2 /*return*/, res];
                    }
                    return [2 /*return*/, Promise.reject(AppletsRequestError_1.createError("Request failed with status code " + res.status, res.config, res.status, res))];
                case 3:
                    reason_1 = _a.sent();
                    if (isCancel_1.default(reason_1)) {
                        return [2 /*return*/, Promise.reject(reason_1)];
                    }
                    throwIfCancellationRequested(transformedConfig);
                    err = reason_1;
                    if (err && err.response) {
                        err.response.data = transformData_1.default(err.response.data, err.response.headers, transformedConfig.transformResponse);
                    }
                    return [2 /*return*/, Promise.reject(AppletsRequestError_1.createError(err.errMsg, err.config, err.status, err.response, err.extra))];
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
    if (config.cancelToken) {
        config.cancelToken.throwIfRequested();
    }
}
function formattedConfig(config) {
    throwIfCancellationRequested(config);
    var baseURL = config.baseURL, url = config.url, params = config.params;
    var combinedURL = isAbsoluteURL_1.default(url) ? url : combineURLs_1.default(baseURL, url);
    var formattedUrl = transformUrl_1.default(combinedURL, params, config.paramsSerializer);
    var method = transformMethod_1.default(config.method);
    var transformedConfig = __assign(__assign({}, config), { 
        // 过滤headers中无用的配置
        headers: assembleHeaders_1.filterHeaders(config.headers, method) });
    // 先执行data转换
    transformedConfig.data = transformData_1.default(transformedConfig.data, transformedConfig.headers, transformedConfig.transformRequest);
    transformedConfig.headers = assembleHeaders_1.default(transformedConfig.headers, transformedConfig.data);
    // 后执行config转换，最后返回config副本，避免引用类型导致数据混乱问题
    transformedConfig = transformConfig_1.default(transformedConfig, config.transformConfig);
    // 添加Cookie头
    var cookiesStr = getCookiesStr(transformedConfig);
    if (cookiesStr) {
        transformedConfig.headers.Cookies = cookiesStr;
    }
    // xsrf 防御
    var xsrfToken = storageCookies_1.getCookie(transformedConfig.xsrfCookieName);
    if (xsrfToken) {
        transformedConfig.headers[transformedConfig.xsrfHeaderName] = xsrfToken;
    }
    return __assign(__assign({}, transformedConfig), { url: formattedUrl, method: method, headers: transformedConfig.headers, getRequestTask: formattedGetRequestTaskFunction(transformedConfig.getRequestTask) });
}
function formattedGetRequestTaskFunction(fn) {
    if (typeof fn === "function") {
        return fn;
    }
    return function () {
        // empty
    };
}
function getCookiesStr(config) {
    if (config.withCredentials || isURLSameOrigin_1.default()) {
        return assembleHeaders_1.combineCookiesStr(config.headers.Cookies, config.xsrfCookieName);
    }
    return "";
}
exports.default = request;
//# sourceMappingURL=request.js.map