"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function combineURLs(baseURL, relativeURL) {
    var tmpBaseURL = baseURL || "";
    var tmpRelativeURL = relativeURL || "";
    return tmpRelativeURL
        ? tmpBaseURL.replace(/\/+$/, "") + "/" + tmpRelativeURL.replace(/^\/+/, "")
        : tmpBaseURL;
}
exports.default = combineURLs;
//# sourceMappingURL=combineURLs.js.map