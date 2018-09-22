"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DBConnector = _interopRequireDefault(require("./DBConnector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var userExist = function userExist(profile) {
  _DBConnector.default.prepare(profile);

  return _DBConnector.default.getUser(profile.id).then(function (user) {
    return user || _DBConnector.default.setUser(profile);
  });
};

var InitializeUserAccount = function InitializeUserAccount(profile) {
  var _this = this;

  _classCallCheck(this, InitializeUserAccount);

  _defineProperty(this, "prepare", function () {
    return userExist(_this.profile);
  });

  this.profile = profile;
};

var _default = InitializeUserAccount;
exports.default = _default;