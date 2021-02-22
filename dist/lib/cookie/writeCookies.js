"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var defaults_1 = require("../defaults");
var utils_1 = require("../helpers/utils");
function writeCookies(config, cookies) {
    if (!config.autoCookies || !utils_1.isFunction(config.writeCookies)) {
        return;
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    config.writeCookies(defaults_1.STORAGE_COOKIES_KEY, cookies);
}
exports.default = writeCookies;
//# sourceMappingURL=writeCookies.js.map