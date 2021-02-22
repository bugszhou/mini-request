"use strict";
/*
 * @Author: youzhao.zhou
 * @Date: 2021-02-02 17:57:28
 * @Last Modified by: youzhao.zhou
 * @Last Modified time: 2021-02-18 16:01:15
 * @Description transformRequest和transformResponse辅助函数
 */
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../helpers/utils");
/**
 * custom data format
 * @param data request data
 * @param headers request headers
 * @param fns transformData function in config
 */
function transformData(data, headers, fns) {
    var formattedData = data;
    utils_1.forEach(fns, function (fn) {
        if (typeof fn === "function") {
            formattedData = fn(formattedData, headers);
        }
    });
    return formattedData;
}
exports.default = transformData;
//# sourceMappingURL=transformData.js.map