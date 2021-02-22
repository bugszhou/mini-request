"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCookie = void 0;
var defaults_1 = require("../defaults");
var utils_1 = require("../helpers/utils");
function getCookies(config) {
    if (!config || !utils_1.isFunction(config.readCookies)) {
        return {};
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return config.readCookies(defaults_1.STORAGE_COOKIES_KEY);
}
exports.default = getCookies;
function getCookie(cookies, cookieName) {
    if (!cookies || !cookieName) {
        return "";
    }
    var cookie = cookies[cookieName];
    return utils_1.isUndefined(cookie) || cookie === null ? "" : cookies[cookieName];
}
exports.getCookie = getCookie;
//# sourceMappingURL=getCookies.js.map