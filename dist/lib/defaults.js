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
var adapters_1 = require("./adapters");
var normalizeHeaderName_1 = require("./helpers/normalizeHeaderName");
var setContentTypeIfUnset_1 = require("./helpers/setContentTypeIfUnset");
var utils_1 = require("./helpers/utils");
var DEFAULT_CONTENT_TYPE = "application/x-www-form-urlencoded";
var defaults = {
    adapter: adapters_1.default(),
    method: "GET",
    timeout: 10000,
    headers: __assign({ common: {
            Accept: "application/json, text/plain, */*",
        } }, getDefaultHeaders()),
    transformConfig: [],
    transformRequest: [
        function (data, headers) {
            normalizeHeaderName_1.default(headers, "Accept");
            normalizeHeaderName_1.default(headers, "Content-Type");
            if (utils_1.isPlainObject(data)) {
                setContentTypeIfUnset_1.default(headers, "application/json; charset=utf-8");
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
exports.default = defaults;
//# sourceMappingURL=defaults.js.map