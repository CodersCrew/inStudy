"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _keys = _interopRequireDefault(require("../config/keys"));

var _category = _interopRequireDefault(require("./category"));

var _city = _interopRequireDefault(require("./city"));

var _initiative = _interopRequireDefault(require("./initiative"));

var _university = _interopRequireDefault(require("./university"));

var _user = _interopRequireDefault(require("./user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var models = [_category.default, _city.default, _initiative.default, _university.default, _user.default];

var _default = function _default() {
  _mongoose.default.connect(_keys.default.mongoURI, {
    user: _keys.default.mongoLogin,
    pass: _keys.default.mongoPassword,
    useNewUrlParser: true
  });

  models.map(function (_ref) {
    var name = _ref.name,
        schema = _ref.schema;

    _mongoose.default.model(name, schema);
  });
};

exports.default = _default;