"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combineCookiesStr = exports.filterHeaders = exports.formattedHeader = void 0;
/*
 * @Author: youzhao.zhou
 * @Date: 2021-01-31 11:14:33
 * @Last Modified by: youzhao.zhou
 * @Last Modified time: 2021-02-10 17:10:35
 * @Description 处理请求headers和处理响应headers
 */
var utils_1 = require("./utils");
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
    if (!utils_1.isPlainObject(headers)) {
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
exports.formattedHeader = formattedHeader;
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
    if (utils_1.isPlainObject(data) && !reqHeaders["Content-Type"]) {
        reqHeaders["Content-Type"] = "application/json; charset=utf-8";
    }
    if (data === null || typeof data === "undefined") {
        delete reqHeaders["Content-Type"];
    }
    return reqHeaders;
}
exports.default = assembleReqHeaders;
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
    var mergedHeaders = utils_1.merge(headers.common, headers[method.toLowerCase()], headers);
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
exports.filterHeaders = filterHeaders;
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
    if (!utils_1.isString(cookiesString)) {
        return !cookieVal && String(cookieVal) !== "0"
            ? cookieName
            : "" + spliceCookieStr(cookieName, cookieVal);
    }
    return cookiesString + "; " + spliceCookieStr(cookieName, cookieVal);
}
exports.combineCookiesStr = combineCookiesStr;
function spliceCookieStr(cookieName, cookieVal) {
    return !cookieVal && String(cookieVal) !== "0"
        ? cookieName
        : cookieName + "=" + cookieVal;
}
//# sourceMappingURL=assembleHeaders.js.map