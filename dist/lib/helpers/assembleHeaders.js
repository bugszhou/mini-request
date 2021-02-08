"use strict";
/*
 * @Author: youzhao.zhou
 * @Date: 2021-01-31 11:14:33
 * @Last Modified by: youzhao.zhou
 * @Last Modified time: 2021-02-05 23:42:16
 * @Description 处理请求headers和处理响应headers
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.combineCookiesStr = exports.filterHeaders = exports.formattedHeader = void 0;
var storageCookies_1 = require("../adapters/wx/storageCookies");
var utils_1 = require("./utils");
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
function combineCookiesStr(cookiesString, cookieName) {
    if (!utils_1.isString(cookiesString)) {
        return cookieName + "=" + storageCookies_1.getCookie(cookieName);
    }
    return cookiesString + "; " + cookieName + "=" + storageCookies_1.getCookie(cookieName);
}
exports.combineCookiesStr = combineCookiesStr;
//# sourceMappingURL=assembleHeaders.js.map