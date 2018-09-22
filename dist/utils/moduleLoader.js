"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = require("fs");

var _default = function _default(path, omit, injectedObject) {
  omit = typeof omit === 'string' ? [omit] : omit;
  var dirFiles = (0, _fs.readdirSync)(path).filter(function (singleFile) {
    return !omit.find(function (singleOmittedFile) {
      return singleOmittedFile === singleFile;
    });
  });
  dirFiles.forEach(function (singleFile) {
    var module = require("".concat(path, "/").concat(singleFile));

    injectedObject && module(injectedObject);
  });
};

exports.default = _default;