"use strict";
/*
 * @Author: youzhao.zhou
 * @Date: 2021-02-02 18:26:33
 * @Last Modified by: youzhao.zhou
 * @Last Modified time: 2021-02-02 19:19:24
 * @Description 执行transform config，并且转换成对应环境的配置文件
 */
Object.defineProperty(exports, "__esModule", { value: true });
var copyConfig_1 = require("../helpers/copyConfig");
var utils_1 = require("../helpers/utils");
function transformConfig(config, fns) {
    var formattedConfig = config;
    utils_1.forEach(fns, function (fn) {
        if (typeof fn === "function") {
            formattedConfig = fn(config);
        }
    });
    return copyConfig_1.default(formattedConfig);
}
exports.default = transformConfig;
//# sourceMappingURL=transformConfig.js.map