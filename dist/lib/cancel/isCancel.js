"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../helpers/utils");
function isCancel(canceler) {
    if (utils_1.isUndefined(canceler)) {
        return false;
    }
    return canceler && canceler.isCancel;
}
exports.default = isCancel;
//# sourceMappingURL=isCancel.js.map