"use strict";
/*
 * @Author: youzhao.zhou
 * @Date: 2021-02-02 18:16:24
 * @Last Modified by: youzhao.zhou
 * @Last Modified time: 2021-02-02 18:56:46
 * @Description 创建副本，避免引用类型影响
 */
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
function copyConfig(config) {
    if (!config) {
        return config;
    }
    return utils_1.merge({}, config);
}
exports.default = copyConfig;
//# sourceMappingURL=copyConfig.js.map