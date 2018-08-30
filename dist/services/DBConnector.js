"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var createUser = function createUser(_ref) {
  var photos = _ref.photos,
      id = _ref.id,
      name = _ref.name,
      emails = _ref.emails,
      _ref$description = _ref.description,
      description = _ref$description === void 0 ? '' : _ref$description,
      _ref$socials = _ref.socials,
      socials = _ref$socials === void 0 ? [] : _ref$socials;
  return {
    googleId: id,
    image: photos[0].value.split('?sz=')[0],
    firstName: name.givenName,
    lastName: name.familyName,
    email: emails[0].value,
    description: description,
    socials: socials
  };
};

var DBConnector = function DBConnector() {
  _classCallCheck(this, DBConnector);

  _defineProperty(this, "prepare", function (context) {});

  _defineProperty(this, "getUser", function (googleId) {
    return _mongoose.default.model('users').findOne({
      googleId: googleId
    });
  });

  _defineProperty(this, "putUser", function (profile) {
    return _mongoose.default.model('users').findOneAndUpdate({
      googleId: profile.id
    }, createUser(profile), {
      new: true
    });
  });

  _defineProperty(this, "setUser", function (profile) {
    return new _mongoose.default.model('users')(createUser(profile)).save();
  });

  this.connection = null; // this.context = context;
};

var _default = new DBConnector();

exports.default = _default;