"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isAbsoluteURL(url) {
    return /^([a-z][a-z\d+-.]*:)?\/\//i.test(url || "");
}
exports.default = isAbsoluteURL;
//# sourceMappingURL=isAbsoluteURL.js.map