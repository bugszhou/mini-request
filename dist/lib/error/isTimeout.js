"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../helpers/utils");
function isTimeout(response) {
    if (utils_1.isUndefined(response) || response === null) {
        return false;
    }
    return response.status === "TIMEOUT";
}
exports.default = isTimeout;
//# sourceMappingURL=isTimeout.js.map