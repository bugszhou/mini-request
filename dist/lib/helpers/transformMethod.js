"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function transformMethod(method) {
    if (!method || typeof method !== "string") {
        return "GET";
    }
    return method.toUpperCase();
}
exports.default = transformMethod;
//# sourceMappingURL=transformMethod.js.map