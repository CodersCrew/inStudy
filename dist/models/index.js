"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _keys = _interopRequireDefault(require("../config/keys"));

var _moduleLoader = _interopRequireDefault(require("../utils/moduleLoader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose.default.connect(_keys.default.mongoURI);

var _default = function _default() {
  return (0, _moduleLoader.default)(__dirname, 'index.js');
};

exports.default = _default;