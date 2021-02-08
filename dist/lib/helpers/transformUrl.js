"use strict";
/*
 * @Author: youzhao.zhou
 * @Date: 2021-01-30 16:44:44
 * @Last Modified by: youzhao.zhou
 * @Last Modified time: 2021-02-05 23:10:33
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
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
function parseUrl(url, params, paramsSerializer) {
    var tmpUrl = removeHash(url);
    if (typeof params === "string") {
        return assembleUrl(tmpUrl, params);
    }
    var paramsKeys = Object.keys(!utils_1.isObject(params) ? {} : params);
    if (paramsKeys.length === 0 && !utils_1.isFunction(paramsSerializer)) {
        return tmpUrl;
    }
    var queryStr = utils_1.isFunction(paramsSerializer)
        ? paramsSerializer(params)
        : parseQueryStr(paramsKeys, params);
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
    if (utils_1.isDate(val)) {
        return [encode(key), encode(val.toISOString())];
    }
    if (utils_1.isPlainObject(val)) {
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
exports.default = transformUrl;
//# sourceMappingURL=transformUrl.js.map