"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var transformMethod_1 = require("../helpers/transformMethod");
var Adapter_1 = require("./Adapter");
function getDefaultAdapter() {
    return defaultAdapter;
}
exports.default = getDefaultAdapter;
function defaultAdapter(config) {
    var adapter = new Adapter_1.default(__assign({ method: transformMethod_1.default(config.method) }, config));
    return new Promise(function (resolve) {
        console.log("defaultAdapter: ", "Pls set adapter!!! Don't use default adapter");
        adapter.resolve({
            data: {},
            headers: {},
            status: 404,
            response: null,
        }, resolve);
    });
}
//# sourceMappingURL=index.js.map