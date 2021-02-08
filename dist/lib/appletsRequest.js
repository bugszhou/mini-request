"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppletsRequest = exports.createAppletsRequestInstance = void 0;
var AppletsRequest_1 = require("./core/AppletsRequest");
exports.AppletsRequest = AppletsRequest_1.default;
/**
 * 创建AppletsRequest实例
 * @param {IAppletsRequestConfig} config
 */
function createAppletsRequestInstance(config) {
    var request = new AppletsRequest_1.default(config);
    return request.create(config);
}
exports.createAppletsRequestInstance = createAppletsRequestInstance;
/**
 * 默认miniRequest
 */
var miniRequest = createAppletsRequestInstance();
exports.default = miniRequest;
//# sourceMappingURL=appletsRequest.js.map