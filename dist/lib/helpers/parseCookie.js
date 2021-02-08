"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeCookie = void 0;
var utils_1 = require("./utils");
/**
 * Module variables.
 * @private
 */
var decode = decodeURIComponent;
var encode = encodeURIComponent;
var pairSplitRegExp = /; */;
/**
 * RegExp to match field-content in RFC 7230 sec 3.2
 *
 * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
 * field-vchar   = VCHAR / obs-text
 * obs-text      = %x80-FF
 */
// eslint-disable-next-line no-control-regex
var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
function parseCookies(cookiesStr) {
    if (!cookiesStr) {
        return {};
    }
    return parse(cookiesStr);
}
exports.default = parseCookies;
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
        if (utils_1.isUndefined(cookies[key])) {
            cookies[key] = tryDecode(val, decodeFn);
        }
    });
    return cookies;
}
/**
 * Serialize data into a cookie header.
 *
 * Serialize the a name value pair into a cookie string suitable for
 * http headers. An optional options object specified cookie parameters.
 *
 * serialize('foo', 'bar', { httpOnly: true })
 *   => "foo=bar; httpOnly"
 *
 * @param {string} name
 * @param {string} val
 * @param {object} [options]
 * @return {string}
 * @public
 */
function serializeCookie(name, val, options) {
    if (options === void 0) { options = {}; }
    var encodeFn = options.encode || encode;
    serializeThrowErr(typeof encodeFn !== "function", "option encode is invalid");
    serializeThrowErr(regPass(name), "argument name is invalid");
    var value = encodeFn(val);
    serializeThrowErr(regPass(value), "argument val is invalid");
    var str = name + "=" + value;
    if (options.maxAge !== null) {
        var maxAge = options.maxAge - 0;
        serializeThrowErr(Number.isNaN(maxAge) || !Number.isFinite(maxAge), "argument val is invalid");
        str += "; Max-Age=" + Math.floor(maxAge);
    }
    if (options.domain) {
        serializeThrowErr(regPass(options.domain), "argument val is invalid");
        str += "; Domain=" + options.domain;
    }
    if (options.path) {
        serializeThrowErr(regPass(options.path), "option path is invalid");
        str += "; Path=" + options.path;
    }
    if (options.expires) {
        serializeThrowErr(typeof options.expires.toUTCString !== "function", "option expires is invalid");
        str += "; Expires=" + options.expires.toUTCString();
    }
    if (options.httpOnly) {
        str += "; HttpOnly";
    }
    if (options.secure) {
        str += "; Secure";
    }
    if (options.sameSite) {
        str += getSameSiteCookieStr(options.sameSite);
    }
    return str;
}
exports.serializeCookie = serializeCookie;
function getSameSiteCookieStr(sameSite) {
    var tmpSameSite = typeof sameSite === "string" ? sameSite.toLowerCase() : sameSite;
    if (tmpSameSite === true || tmpSameSite === "strict") {
        return "; SameSite=Strict";
    }
    if (tmpSameSite === "lax") {
        return "; SameSite=Lax";
    }
    if (tmpSameSite === "none") {
        return "; SameSite=None";
    }
    throw new TypeError("option sameSite is invalid");
}
function serializeThrowErr(isErr, errMsg) {
    if (!isErr) {
        return;
    }
    throw new TypeError(errMsg);
}
function regPass(data) {
    return data && !fieldContentRegExp.test(data);
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
//# sourceMappingURL=parseCookie.js.map