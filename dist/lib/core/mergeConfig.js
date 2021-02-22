"use strict";
/*
 * @Author: youzhao.zhou
 * @Date: 2021-02-01 22:55:50
 * @Last Modified by: youzhao.zhou
 * @Last Modified time: 2021-02-09 18:07:00
 * @Description 合并config
 */
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../helpers/utils");
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
        if (utils_1.isUndefined(val)) {
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
        if (!utils_1.isUndefined(val)) {
            config[key] = mergeObject(val);
            return;
        }
        if (!utils_1.isUndefined(config1[key])) {
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
        if (!utils_1.isUndefined(val2)) {
            config[key] = getMergeValue(val1, val2);
            return;
        }
        if (!utils_1.isUndefined(val1)) {
            config[key] = getMergeValue(undefined, val1);
        }
    }
    function getMergeValue(target, source) {
        if (utils_1.isPlainObject(target) && utils_1.isPlainObject(source)) {
            return utils_1.merge(target, source);
        }
        if (utils_1.isPlainObject(source)) {
            return utils_1.merge({}, source);
        }
        return mergeObject(source);
    }
    function mergeObject(val) {
        if (Array.isArray(val)) {
            return utils_1.merge(val);
        }
        if (utils_1.isPlainObject(val)) {
            return utils_1.merge(val);
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
    utils_1.forEach(remainKeys, deepMergeConfig);
    return config;
}
exports.default = mergeConfig;
//# sourceMappingURL=mergeConfig.js.map