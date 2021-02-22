"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFunction = exports.isString = exports.isNumber = exports.merge = exports.forEach = exports.isUndefined = exports.assign = exports.isPlainObject = exports.isObject = exports.isDate = void 0;
function getDataType(val) {
    return Object.prototype.toString.call(val);
}
function isDate(val) {
    return getDataType(val) === "[object Date]";
}
exports.isDate = isDate;
function isObject(val) {
    return val !== null && typeof val === "object";
}
exports.isObject = isObject;
function isPlainObject(val) {
    if (val === null || getDataType(val) !== "[object Object]") {
        return false;
    }
    var prototype = Object.getPrototypeOf(val);
    return prototype === null || prototype === Object.prototype;
}
exports.isPlainObject = isPlainObject;
function assign(to, from) {
    if (isString(from)) {
        return to;
    }
    for (var key in from) {
        to[key] = from[key];
    }
    return to;
}
exports.assign = assign;
function isUndefined(val) {
    return typeof val === "undefined";
}
exports.isUndefined = isUndefined;
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
exports.forEach = forEach;
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
exports.merge = merge;
function isNumber(val) {
    return typeof val === "number";
}
exports.isNumber = isNumber;
function isString(val) {
    return typeof val === "string";
}
exports.isString = isString;
function isFunction(val) {
    return typeof val === "function";
}
exports.isFunction = isFunction;
//# sourceMappingURL=utils.js.map