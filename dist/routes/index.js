"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moduleLoader = _interopRequireDefault(require("./../utils/moduleLoader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(app) {
  return (0, _moduleLoader.default)(__dirname, ['index.js', 'validators'], app);
};

exports.default = _default;