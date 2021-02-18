/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
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
}

var Cancel = /** @class */ (function () {
    function Cancel(message) {
        this.message = "";
        this.isCancel = true;
        this.message = message;
    }
    Cancel.prototype.toString = function () {
        return "Cancel: " + (this.message || "");
    };
    return Cancel;
}());

var CancelToken = /** @class */ (function () {
    function CancelToken(executor) {
        var _this = this;
        this.promise = new Promise(function (resolve) {
            _this.promiseResolve = resolve;
        });
        if (typeof executor === "function") {
            executor(this.cancel.bind(this));
        }
    }
    CancelToken.source = function () {
        var cancel;
        var token = new CancelToken(function (cancelFn) {
            cancel = cancelFn;
        });
        return {
            token: token,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            cancel: cancel,
        };
    };
    CancelToken.prototype.cancel = function (message) {
        if (this.reason) {
            return;
        }
        this.reason = new Cancel(message);
        this.promiseResolve(this.reason);
    };
    CancelToken.prototype.subscribeCancelEvent = function (listener) {
        return this.promise.then(listener);
    };
    CancelToken.prototype.throwIfRequested = function () {
        if (this.reason) {
            throw this.reason;
        }
    };
    return CancelToken;
}());

function getDataType(val) {
    return Object.prototype.toString.call(val);
}
function isDate(val) {
    return getDataType(val) === "[object Date]";
}
function isObject(val) {
    return val !== null && typeof val === "object";
}
function isPlainObject(val) {
    if (val === null || getDataType(val) !== "[object Object]") {
        return false;
    }
    var prototype = Object.getPrototypeOf(val);
    return prototype === null || prototype === Object.prototype;
}
function assign(to, from) {
    if (isString(from)) {
        return to;
    }
    for (var key in from) {
        to[key] = from[key];
    }
    return to;
}
function isUndefined(val) {
    return typeof val === "undefined";
}
/**
 * 遍历
 * @param {Object|Array} obj
 * @param fn
 */
function forEach(obj, fn) {
    if (typeof obj === "undefined" || obj === null) {
        return;
    }
    var arr = obj;
    // 如果obj是非object类型，例如：number，string等
    if (typeof obj !== "object") {
        arr = [obj];
    }
    if (Array.isArray(arr)) {
        arr.forEach(function (item, i) {
            fn.call(null, item, i, obj);
        });
        return;
    }
    Object.keys(arr).forEach(function (key) {
        fn.call(null, arr[key], key, arr);
    });
}
function merge() {
    var objs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        objs[_i] = arguments[_i];
    }
    if (objs.length === 0) {
        return Object.create(null);
    }
    var result = Object.create(null);
    function assignValue(val, key) {
        if (isPlainObject(result[key]) && isPlainObject(val)) {
            result[key] = merge(result[key], val);
        }
        else if (isPlainObject(val)) {
            result[key] = merge({}, val);
        }
        else if (Array.isArray(val)) {
            result[key] = merge(val);
        }
        else {
            result[key] = val;
        }
    }
    if (Array.isArray(objs[0])) {
        result = [];
    }
    else {
        result = Object.create(null);
    }
    objs.forEach(function (obj) {
        forEach(obj, assignValue);
    });
    return result;
}
function isString(val) {
    return typeof val === "string";
}
function isFunction(val) {
    return typeof val === "function";
}

function isCancel(canceler) {
    if (isUndefined(canceler)) {
        return false;
    }
    return canceler && canceler.isCancel;
}

function normalizeHeaderName(headers, normalizedHeaderName) {
    if (!normalizedHeaderName) {
        return;
    }
    forEach(headers, function (headerValue, headerName) {
        if (headerName !== normalizedHeaderName &&
            headerName.toUpperCase() === normalizedHeaderName.toUpperCase()) {
            headers[normalizedHeaderName] = headerValue;
            delete headers[headerName];
        }
    });
}

function setContentTypeIfUnset(headers, value) {
    if (!isUndefined(headers) &&
        headers &&
        isUndefined(headers["Content-Type"])) {
        headers["Content-Type"] = value;
    }
}

var DEFAULT_CONTENT_TYPE = "application/x-www-form-urlencoded";
var defaults = {
    // adapter: getDefaultAdapter(),
    method: "GET",
    timeout: 10000,
    headers: __assign({ common: {
            Accept: "application/json, text/plain, */*",
        } }, getDefaultHeaders()),
    transformConfig: [],
    transformRequest: [
        function (data, headers) {
            normalizeHeaderName(headers, "Accept");
            normalizeHeaderName(headers, "Content-Type");
            if (isPlainObject(data)) {
                setContentTypeIfUnset(headers, "application/json; charset=utf-8");
            }
            return data;
        },
    ],
    transformResponse: [],
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    validateStatus: function (status) {
        if (status >= 200 && status < 300) {
            return true;
        }
        return false;
    },
};
function getDefaultHeaders() {
    var headers = {};
    ["delete", "get", "head", "options"].forEach(function (method) {
        headers[method] = {};
    });
    ["post", "put", "patch"].forEach(function (method) {
        headers[method] = {
            "Content-Type": DEFAULT_CONTENT_TYPE,
        };
    });
    return headers;
}
var STORAGE_COOKIES_KEY = "miniRequest:cookies";

/**
 * 根据response.status的值来判断是不是NETWORK_ERROR(网络错误)，如：请求不可用等
 * @param response 任何类型的响应数据
 * @example
 * // return true
 * isNetworkError({status: "NETWORK_ERROR"});
 * // return false
 * isNetworkError({status: "TIMEOUT"});
 * // return false
 * isNetworkError({});
 * @returns true or false
 *
 */
function isNetworkError(response) {
    if (isUndefined(response) || response === null) {
        return false;
    }
    return response.status === "NETWORK_ERROR";
}

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
    if (isUndefined(response) || response === null) {
        return false;
    }
    return response.status === "TIMEOUT";
}

/*
 * @Author: youzhao.zhou
 * @Date: 2021-02-08 13:43:58
 * @Last Modified by: youzhao.zhou
 * @Last Modified time: 2021-02-08 13:49:22
 * @Description 将baseURL和relativeURL组合成完整的URL
 */
/**
 * 将baseURL和relativeURL组合成完整的URL
 * @param baseURL defaults中配置的baseURL
 * @param relativeURL 请求的相对URL
 * @example
 * // returns https://xxx.com/api/login
 * combineURLs("https://xxx.com", "/api/login")
 * @returns {string} Returns baseURL and relativeURL are spliced together
 */
function combineURLs(baseURL, relativeURL) {
    var tmpBaseURL = baseURL || "";
    var tmpRelativeURL = relativeURL || "";
    return tmpRelativeURL
        ? tmpBaseURL.replace(/\/+$/, "") + "/" + tmpRelativeURL.replace(/^\/+/, "")
        : tmpBaseURL;
}

function isAbsoluteURL(url) {
    return /^([a-z][a-z\d+-.]*:)?\/\//i.test(url || "");
}

/*
 * @Author: youzhao.zhou
 * @Date: 2021-01-30 16:44:44
 * @Last Modified by: youzhao.zhou
 * @Last Modified time: 2021-02-07 12:29:11
 * @Description 处理url，将params数据，以query的方式拼接到url上，
 * @example /demo?p1=12&p2=34
 *
 * 需要处理的逻辑有：
 * 1. 丢弃URL中哈希#部分
 * 2. 忽略null和undefined的数据
 * 3. 参数值为数组
 * 4. 参数值为对象
 * 5. 参数值为Date类型
 * 6. 可以出现在URL中的特殊字符
 * 7. 保留url中的参数
 */
function parseUrl(url, params, paramsSerializer) {
    var tmpUrl = removeHash(url);
    if (typeof params === "string") {
        return assembleUrl(tmpUrl, params);
    }
    var paramsKeys = Object.keys(!isObject(params) ? {} : params);
    if (paramsKeys.length === 0 && !isFunction(paramsSerializer)) {
        return tmpUrl;
    }
    var queryStr = isFunction(paramsSerializer)
        ? paramsSerializer === null || paramsSerializer === void 0 ? void 0 : paramsSerializer(params) : parseQueryStr(paramsKeys, params);
    if (!queryStr) {
        return tmpUrl;
    }
    return assembleUrl(tmpUrl, queryStr);
}
function assembleUrl(url, queryStr) {
    return url.includes("?") ? url + "&" + queryStr : url + "?" + queryStr;
}
/**
 * 移除值为null和undefined的属性
 * @param val params中的value
 */
function removeNullAndUndefinedVal(val) {
    if (val === null || typeof val === "undefined") {
        return false;
    }
    return true;
}
/**
 * 获取query str
 * @param paramsKeys string[]
 * @param params object
 * @returns demo=234&demo1=demo
 */
function parseQueryStr(paramsKeys, params) {
    var paramsEntries = paramsKeys
        .filter(function (paramsKey) { return removeNullAndUndefinedVal(params[paramsKey]); })
        .map(function (paramKey) { return parseParam(paramKey, params[paramKey]); });
    if (paramsEntries.length === 0) {
        return "";
    }
    return paramsEntries.reduce(function (preStr, curParam) {
        if (!curParam[0] || !curParam[1]) {
            return preStr;
        }
        return "" + (preStr ? preStr + "&" : "") + curParam.join("=");
    }, "");
}
function parseParam(key, val) {
    if (Array.isArray(val)) {
        return parseArrayVal(key, val);
    }
    if (isDate(val)) {
        return [encode(key), encode(val.toISOString())];
    }
    if (isPlainObject(val)) {
        return [encode(key), encode(JSON.stringify(val))];
    }
    return [key, val];
}
/**
 * 处理参数值类型为数组的参数
 * @param key 参数名
 * @param val 参数值
 * @returns [key, ${val[0]}&${key}[]=${val[1]}&....&${key}[]=${val[n]}]
 */
function parseArrayVal(key, val) {
    var values = val.map(function (item, i) {
        if (i === 0) {
            return item;
        }
        return encode(key + "[]") + "=" + encode(item);
    });
    return [encode(key + "[]"), values.join("&")];
}
function removeHash(url) {
    return url.includes("#") ? url.slice(0, url.indexOf("#")) : url;
}
function encode(str) {
    return encodeURIComponent(str)
        .replace(/%40/g, "@")
        .replace(/%3A/gi, ":")
        .replace(/%24/g, "$")
        .replace(/%2C/gi, ",")
        .replace(/%20/g, "+")
        .replace(/%5B/gi, "[")
        .replace(/%5D/gi, "]");
}
function transformUrl(url, params, paramsSerializer) {
    if (!url) {
        return removeHash(url);
    }
    return parseUrl(url, params, paramsSerializer);
}

var InterceptorManager = /** @class */ (function () {
    function InterceptorManager() {
        this.interceptors = [];
    }
    InterceptorManager.prototype.use = function (fulfilled, rejected) {
        this.interceptors.push({
            fulfilled: fulfilled,
            rejected: rejected,
        });
        return this.interceptors.length - 1;
    };
    InterceptorManager.prototype.eject = function (interceptorId) {
        if (!this.interceptors[interceptorId]) {
            return;
        }
        this.interceptors[interceptorId] = null;
    };
    InterceptorManager.prototype.forEach = function (fn) {
        this.interceptors.forEach(function (interceptor) {
            if (typeof fn === "function" && interceptor !== null) {
                fn(interceptor);
            }
        });
    };
    return InterceptorManager;
}());

/*
 * @Author: youzhao.zhou
 * @Date: 2021-02-01 22:55:50
 * @Last Modified by: youzhao.zhou
 * @Last Modified time: 2021-02-09 18:07:00
 * @Description 合并config
 */
function mergeConfig(config1, optionalConfig2) {
    var config2 = optionalConfig2 || {};
    var config = Object.create(null);
    // 只从config2获取值
    var valueFromConfig2Keys = ["url", "method", "data"];
    // 需要config1和config2中需要深合并的值
    var requiredMergeDeepPropertiesKeys = ["headers", "params"];
    // 只要在config2中存在key，就赋值config2[key]，不考虑null和undefined；
    // 如果config2中不存在key，config1中存在该key，就赋值config1[key]；
    // config1和config2都不存在，则跳过
    var directMergeKeys = ["validateStatus", "writeCookies", "readCookies"];
    // 优先从config2中取值，config2中没有值的，再从config1取值
    var config2FirstConfig1DefaultKeys = [
        "baseURL",
        "transformConfig",
        "transformRequest",
        "transformResponse",
        "paramsSerializer",
        "timeout",
        "adapter",
        "responseType",
        "xsrfCookieName",
        "xsrfHeaderName",
        "cancelToken",
    ];
    valueFromConfig2Keys.forEach(getValueFromConfig2);
    config2FirstConfig1DefaultKeys.forEach(getValueFromConfig2First);
    directMergeKeys.forEach(getDirectValue);
    requiredMergeDeepPropertiesKeys.forEach(deepMergeConfig);
    /**
     * 只从config2获取值
     * @param key
     */
    function getValueFromConfig2(key) {
        var val = config2[key];
        if (isUndefined(val)) {
            return;
        }
        config[key] = mergeObject(val);
    }
    /**
     * 优先从config2中取值，config2中没有值的，再从config1取值
     * @param key
     */
    function getValueFromConfig2First(key) {
        var val = config2[key];
        if (!isUndefined(val)) {
            config[key] = mergeObject(val);
            return;
        }
        if (!isUndefined(config1[key])) {
            config[key] = mergeObject(config1[key]);
        }
    }
    /**
     * config2中key就用config2，没有就用config1
     * @param key
     */
    function getDirectValue(key) {
        if (key in config2) {
            config[key] = mergeObject(config2[key]);
            return;
        }
        if (key in config1) {
            config[key] = mergeObject(config1[key]);
        }
    }
    function deepMergeConfig(key) {
        var val1 = config1[key];
        var val2 = config2[key];
        // 如果两个config1和config2都有值，那么合并两个值
        if (!isUndefined(val2)) {
            config[key] = getMergeValue(val1, val2);
            return;
        }
        if (!isUndefined(val1)) {
            config[key] = getMergeValue(undefined, val1);
        }
    }
    function getMergeValue(target, source) {
        if (isPlainObject(target) && isPlainObject(source)) {
            return merge(target, source);
        }
        if (isPlainObject(source)) {
            return merge({}, source);
        }
        return mergeObject(source);
    }
    function mergeObject(val) {
        if (Array.isArray(val)) {
            return merge(val);
        }
        if (isPlainObject(val)) {
            return merge(val);
        }
        return val;
    }
    var hadMergeKeys = valueFromConfig2Keys
        .concat(requiredMergeDeepPropertiesKeys)
        .concat(directMergeKeys)
        .concat(requiredMergeDeepPropertiesKeys);
    var remainKeys = Object.keys(config1)
        .concat(Object.keys(config2))
        .filter(function (key) { return !hadMergeKeys.includes(key); });
    forEach(remainKeys, deepMergeConfig);
    return config;
}

/*
 * @Author: youzhao.zhou
 * @Date: 2021-01-31 11:14:33
 * @Last Modified by: youzhao.zhou
 * @Last Modified time: 2021-02-10 17:10:35
 * @Description 处理请求headers和处理响应headers
 */
/**
 * 格式化请求头中key的格式
 * @param headers 请求头数据
 * @param normalizedNames 标准的请求头key值，如：["Content-Type"]
 * @example
 * // Returns {"Content-Type", "plain/text"}
 * formatterHeader({"content-type": "plain/text"}, ["Content-Type"]);
 * @returns {Object} 返回标准化的请求头数据
 */
function formattedHeader(headers, normalizedNames) {
    var normalizedHeaders = {};
    if (!isPlainObject(headers)) {
        return normalizedHeaders;
    }
    if (normalizedNames.length === 0) {
        return headers;
    }
    var headerUpperKeyMapping = {};
    normalizedNames.forEach(function (key) {
        headerUpperKeyMapping[key.toUpperCase()] = key;
    });
    Object.keys(headers).forEach(function (header) {
        var upperHeader = header.toUpperCase();
        var normalizedKey = headerUpperKeyMapping[upperHeader];
        normalizedHeaders[normalizedKey || header] = headers[header];
    });
    return normalizedHeaders;
}
/**
 * 先将headers的key标准化处理，如果未设置Content-Type的，根据传输的数据类型，设置Content-Type的值
 * @param headers 请求头
 * @param data 请求body体中的数据
 * @example
 * // return {"Content-Type": "application/json; charset=utf-8"}
 * assembleReqHeaders({}, {username: "tome"});
 * @returns {Record<string, string>}
 */
function assembleReqHeaders(headers, data) {
    var reqHeaders = formattedHeader(Object.assign(headers || {}), [
        "Content-Type",
    ]);
    if (isPlainObject(data) && !reqHeaders["Content-Type"]) {
        reqHeaders["Content-Type"] = "application/json; charset=utf-8";
    }
    if (data === null || typeof data === "undefined") {
        delete reqHeaders["Content-Type"];
    }
    return reqHeaders;
}
/**
 * 合并headers中【headers.common】[headers[method]】数据，删除不需要的默认属性
 * @param headers 请求头数据
 * @param method 请求method
 * @example
 * // Return {"Content-Type": "plain/text", "Accept": "*"}
 * filterHeaders({
 *   common: {
 *     "Content-Type": "plain/text"
 *   },
 *   post: {
 *     "Accept": "*"
 *   }
 * }, "post");
 * @returns {Record<string, any>} 返回完整可用的headers
 *
 * {"Content-Type": "plain/text", "Accept": "*"}
 */
function filterHeaders(headers, method) {
    if (!headers) {
        return {};
    }
    var mergedHeaders = merge(headers.common, headers[method.toLowerCase()], headers);
    [
        "delete",
        "get",
        "post",
        "head",
        "patch",
        "put",
        "options",
        "common",
    ].forEach(function (deleteMethod) {
        delete mergedHeaders[deleteMethod];
    });
    return mergedHeaders;
}
/**
 * 和原有的cookie string拼接成新的cookie string
 * @param cookiesString header中已存在的cookie string
 * @param cookieName 需要新加入的cookie keyName
 * @example
 * // return token=tokenString; username=tom
 * combineCookieStr("token=tokenString", "username");
 * @returns {string} 拼接后的cookie string
 */
function combineCookiesStr(cookiesString, cookieName, cookieVal) {
    if (!cookieName && String(cookieName) !== String(0)) {
        return cookiesString;
    }
    if (!isString(cookiesString)) {
        return !cookieVal && String(cookieVal) !== "0"
            ? cookieName
            : "" + spliceCookieStr(cookieName, cookieVal);
    }
    return cookiesString + "; " + spliceCookieStr(cookieName, cookieVal);
}
function spliceCookieStr(cookieName, cookieVal) {
    return !cookieVal && String(cookieVal) !== "0"
        ? cookieName
        : cookieName + "=" + cookieVal;
}

function transformMethod(method) {
    if (!method || typeof method !== "string") {
        return "GET";
    }
    return method.toUpperCase();
}

/*
 * @Author: youzhao.zhou
 * @Date: 2021-02-02 18:16:24
 * @Last Modified by: youzhao.zhou
 * @Last Modified time: 2021-02-08 13:39:12
 * @Description 创建副本，避免引用类型影响
 */
function copyConfig(config) {
    if (!config) {
        return {};
    }
    if (Array.isArray(config)) {
        return merge([], config);
    }
    return merge({}, config);
}

/*
 * @Author: youzhao.zhou
 * @Date: 2021-02-02 18:26:33
 * @Last Modified by: youzhao.zhou
 * @Last Modified time: 2021-02-06 22:02:36
 * @Description 执行transform config，并且转换成对应环境的配置文件
 */
function transformConfig(config, fns) {
    var formattedConfig = config;
    forEach(fns, function (fn) {
        if (typeof fn === "function") {
            formattedConfig = fn(config);
        }
    });
    return copyConfig(formattedConfig);
}

/*
 * @Author: youzhao.zhou
 * @Date: 2021-02-02 17:57:28
 * @Last Modified by: youzhao.zhou
 * @Last Modified time: 2021-02-18 16:01:15
 * @Description transformRequest和transformResponse辅助函数
 */
/**
 * custom data format
 * @param data request data
 * @param headers request headers
 * @param fns transformData function in config
 */
function transformData(data, headers, fns) {
    var formattedData = data;
    forEach(fns, function (fn) {
        if (typeof fn === "function") {
            formattedData = fn(formattedData, headers);
        }
    });
    return formattedData;
}

function isURLSameOrigin() {
    return true;
}

function getCookies(config) {
    if (!config || !isFunction(config.readCookies)) {
        return {};
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return config.readCookies(STORAGE_COOKIES_KEY);
}
function getCookie(cookies, cookieName) {
    if (!cookies || !cookieName) {
        return "";
    }
    var cookie = cookies[cookieName];
    return isUndefined(cookie) || cookie === null ? "" : cookies[cookieName];
}

/**
 * Module variables.
 * @private
 */
var decode = decodeURIComponent;
var pairSplitRegExp = /; */;
/**
 *
 * @param {string} cookiesStr cookies字符串
 * @param options
 */
function parseCookies(cookiesStr, options) {
    if (options === void 0) { options = {}; }
    if (!cookiesStr) {
        return {};
    }
    return parse(cookiesStr, options);
}
/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 *
 * @param {string} str
 * @param {object} [options]
 * @return {object}
 * @public
 */
function parse(cookiesStr, options) {
    if (options === void 0) { options = {}; }
    if (typeof cookiesStr !== "string") {
        return {};
    }
    var cookies = {};
    var pairs = cookiesStr.split(pairSplitRegExp);
    var decodeFn = options.decode || decode;
    pairs.forEach(function (pair) {
        var qeInd = pair.indexOf("=");
        if (qeInd < 0) {
            return;
        }
        var key = pair.substr(0, qeInd).trim();
        var val = pair.substr(qeInd + 1, pair.length).trim();
        // 如果val是含有“”的字符串，则删除“”
        if (val[0] === '"') {
            val = val.slice(1, -1);
        }
        if (isUndefined(cookies[key])) {
            cookies[key] = tryDecode(val, decodeFn);
        }
    });
    return cookies;
}
/**
 * Try decoding a string using a decoding function.
 *
 * @param {string} str
 * @param {function} decode
 * @private
 */
function tryDecode(str, decodeFn) {
    try {
        return decodeFn(str);
    }
    catch (e) {
        return str;
    }
}

/*
 * @Author: youzhao.zhou
 * @Date: 2021-01-31 21:52:37
 * @Last Modified by: youzhao.zhou
 * @Last Modified time: 2021-02-18 15:36:25
 * @Description 处理错误
 */
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

/* eslint-disable max-len */
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
        if (isUndefined(options) || options === null) {
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
            originalRes: isUndefined(options.response) ? null : options.response,
        });
    };
    /**
     * 接口请求失败执行该方法
     * @param options response数据
     * @param reject Promise.reject
     */
    Adapter.prototype.reject = function (options, reject) {
        if (isUndefined(options) || options === null) {
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
            extra: isUndefined(options.extra) ? null : options.extra,
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
        if (isUndefined(config) || config === null) {
            return {};
        }
        var reqConfig = merge({}, config);
        delete reqConfig.Adapter;
        return reqConfig;
    };
    return Adapter;
}());

function writeCookies(config, cookies) {
    if (!config.autoCookies || !isFunction(config.writeCookies)) {
        return;
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    config.writeCookies(STORAGE_COOKIES_KEY, cookies);
}

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
                    if (isPlainObject(res.headers)) {
                        res.cookies = parseCookies(formattedHeader(res.headers, ["Set-Cookie"])["Set-Cookie"]);
                    }
                    writeCookies(config, res.cookies);
                    if (typeof config.validateStatus === "function" &&
                        config.validateStatus(res.status)) {
                        res.data = transformData(res.data, res.headers, transformedConfig.transformResponse);
                        return [2 /*return*/, res];
                    }
                    return [2 /*return*/, Promise.reject(createError("Request failed with status code " + res.status, res.config, res.status, res))];
                case 3:
                    reason_1 = _a.sent();
                    if (isCancel(reason_1)) {
                        return [2 /*return*/, Promise.reject(reason_1)];
                    }
                    throwIfCancellationRequested(transformedConfig);
                    err = reason_1;
                    if (err && err.response) {
                        err.response.data = transformData(err.response.data, err.response.headers, transformedConfig.transformResponse);
                    }
                    return [2 /*return*/, Promise.reject(createError(err.errMsg, err.config, err.status, err.response, err.extra))];
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
    var combinedURL = isAbsoluteURL(url) ? url : combineURLs(baseURL, url);
    var formattedUrl = transformUrl(combinedURL, params, config.paramsSerializer);
    var method = transformMethod(config.method);
    var transformedConfig = __assign(__assign({}, config), { 
        // 过滤headers中无用的配置
        headers: filterHeaders(config.headers, method) });
    // 先执行data转换
    transformedConfig.data = transformData(transformedConfig.data, transformedConfig.headers, transformedConfig.transformRequest);
    transformedConfig.headers = assembleReqHeaders(transformedConfig.headers, transformedConfig.data);
    // 后执行config转换，最后返回config副本，避免引用类型导致数据混乱问题
    transformedConfig = transformConfig(transformedConfig, config.transformConfig);
    // 添加Cookie头
    var cookiesStr = getCookiesStr(transformedConfig);
    if (cookiesStr) {
        transformedConfig.headers.Cookies = cookiesStr;
    }
    // xsrf 防御
    var xsrfToken = getCookie(getCookies(config), transformedConfig.xsrfCookieName);
    if (xsrfToken) {
        transformedConfig.headers[transformedConfig.xsrfHeaderName] = xsrfToken;
    }
    return __assign(__assign({}, transformedConfig), { url: formattedUrl, method: method, headers: transformedConfig.headers, getRequestTask: formattedGetRequestTaskFunction(transformedConfig.getRequestTask), Adapter: Adapter });
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
    if (config.withCredentials || isURLSameOrigin()) {
        return combineCookiesStr(config.headers.Cookies, config.xsrfCookieName, getCookie(getCookies(config), config.xsrfCookieName));
    }
    return "";
}

var AppletsRequest = /** @class */ (function () {
    function AppletsRequest(config) {
        this.AppletsRequest = AppletsRequest;
        this.CancelToken = CancelToken;
        this.isCancel = isCancel;
        this.defaults = {};
        this.isTimeout = isTimeout;
        this.isNetworkError = isNetworkError;
        if (config) {
            this.defaults = config;
        }
        this.interceptors = {
            request: new InterceptorManager(),
            response: new InterceptorManager(),
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
        formattedConfig = mergeConfig(this.defaults, formattedConfig);
        var chain = [
            {
                fulfilled: request,
                rejected: undefined,
            },
        ];
        this.interceptors.request.forEach(function (interceptor) {
            return chain.unshift(interceptor);
        });
        this.interceptors.response.forEach(function (interceptor) {
            return chain.push(interceptor);
        });
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
        var miniRequest = new AppletsRequest(mergeConfig(defaults, config));
        var ins = AppletsRequest.prototype.request.bind(miniRequest);
        return assign(ins, miniRequest);
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
        var combinedURL = isAbsoluteURL(tmpUrl)
            ? tmpUrl
            : combineURLs(baseURL || "", tmpUrl);
        var formattedUrl = transformUrl(combinedURL, params, config.paramsSerializer);
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
        return isPlainObject(config) ? config : {};
    };
    return AppletsRequest;
}());

/**
 * 创建AppletsRequest实例
 * @param {IAppletsRequestConfig} config
 */
function createAppletsRequestInstance(config) {
    var request = new AppletsRequest(config);
    return request.create(config);
}
/**
 * 默认miniRequest
 */
var miniRequest = createAppletsRequestInstance();

export default miniRequest;
export { AppletsRequest, createAppletsRequestInstance };
//# sourceMappingURL=mini-request.es.js.map
