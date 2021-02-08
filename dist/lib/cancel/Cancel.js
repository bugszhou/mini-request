"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cancel = /** @class */ (function () {
    function Cancel(message) {
        this.message = "";
        this.isCancel = true;
        this.message = message;
    }
    Cancel.prototype.toString = function () {
        return "Cancel: " + (this.message || "");
    };
    return Cancel;
}());
exports.default = Cancel;
//# sourceMappingURL=Cancel.js.map