(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.miniRequest = factory());
}(this, (function () { 'use strict';

  function miniRequest() {
      console.log(23423);
  }

  return miniRequest;

})));
//# sourceMappingURL=index.js.map
