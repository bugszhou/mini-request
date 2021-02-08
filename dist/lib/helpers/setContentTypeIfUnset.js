"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
function setContentTypeIfUnset(headers, value) {
    if (!utils_1.isUndefined(headers) &&
        headers &&
        !utils_1.isUndefined(headers["Content-Type"])) {
        headers["Content-Type"] = value;
    }
}
exports.default = setContentTypeIfUnset;
//# sourceMappingURL=setContentTypeIfUnset.js.map