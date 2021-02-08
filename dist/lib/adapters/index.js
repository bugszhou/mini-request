"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../helpers/utils");
var weappRequest_1 = require("./wx/weappRequest");
function getDefaultAdapter() {
    if (!utils_1.isUndefined(wx) && utils_1.isFunction(wx.request)) {
        return weappRequest_1.default;
    }
    return Promise.resolve;
}
exports.default = getDefaultAdapter;
//# sourceMappingURL=index.js.map