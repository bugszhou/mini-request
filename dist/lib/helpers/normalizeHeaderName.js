"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
function normalizeHeaderName(headers, normalizedHeaderName) {
    if (!normalizedHeaderName) {
        return;
    }
    utils_1.forEach(headers, function (headerValue, headerName) {
        if (headerName !== normalizedHeaderName &&
            headerName.toUpperCase() === normalizedHeaderName.toUpperCase()) {
            headers[normalizedHeaderName] = headerValue;
            delete headers[headerName];
        }
    });
}
exports.default = normalizeHeaderName;
//# sourceMappingURL=normalizeHeaderName.js.map