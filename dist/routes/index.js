"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cities = _interopRequireDefault(require("./cities"));

var _categories = _interopRequireDefault(require("./categories"));

var _authRoutes = _interopRequireDefault(require("./authRoutes"));

var _initiatives = _interopRequireDefault(require("./initiatives"));

var _users = _interopRequireDefault(require("./users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(app) {
  (0, _cities.default)(app);
  (0, _categories.default)(app);
  (0, _authRoutes.default)(app);
  (0, _initiatives.default)(app);
  (0, _users.default)(app);
};

exports.default = _default;