"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  api: {
    initiative: {
      initiativeId: {
        type: 'params',
        module: {
          post: {
            type: 'additive',
            alias: 'addNewInitiative',
            expired: 'day'
          },
          put: 'change'
        }
      }
    }
  }
};
exports.default = _default;