"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../helpers/utils");
function isNetworkError(response) {
    if (utils_1.isUndefined(response) || response === null) {
        return false;
    }
    return response.status === "NETWORK_ERROR";
}
exports.default = isNetworkError;
//# sourceMappingURL=isNetworkError.js.map