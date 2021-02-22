"use strict";
/*
 * @Author: youzhao.zhou
 * @Date: 2021-02-08 13:43:58
 * @Last Modified by: youzhao.zhou
 * @Last Modified time: 2021-02-08 13:49:22
 * @Description 将baseURL和relativeURL组合成完整的URL
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 将baseURL和relativeURL组合成完整的URL
 * @param baseURL defaults中配置的baseURL
 * @param relativeURL 请求的相对URL
 * @example
 * // returns https://xxx.com/api/login
 * combineURLs("https://xxx.com", "/api/login")
 * @returns {string} Returns baseURL and relativeURL are spliced together
 */
function combineURLs(baseURL, relativeURL) {
    var tmpBaseURL = baseURL || "";
    var tmpRelativeURL = relativeURL || "";
    return tmpRelativeURL
        ? tmpBaseURL.replace(/\/+$/, "") + "/" + tmpRelativeURL.replace(/^\/+/, "")
        : tmpBaseURL;
}
exports.default = combineURLs;
//# sourceMappingURL=combineURLs.js.map