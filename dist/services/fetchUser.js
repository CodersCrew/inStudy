"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapUserToView = exports.changeBasicUserData = exports.deleteModule = exports.updateModule = exports.addNewModule = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var addNewModule = function addNewModule(module, userId) {
  return _mongoose.default.model('users').findByIdAndUpdate(userId, {
    $addToSet: {
      modules: module
    }
  });
};

exports.addNewModule = addNewModule;

var updateModule = function updateModule(module, userId, moduleIndex) {
  var setObject = {};
  setObject['modules.' + moduleIndex] = module;
  return _mongoose.default.model('users').findByIdAndUpdate(userId, {
    $set: setObject
  });
};

exports.updateModule = updateModule;

var deleteModule = function deleteModule(userId, moduleIndex) {
  var User = _mongoose.default.model('users');

  var unsetObject = {};
  unsetObject['modules.' + moduleIndex] = null;
  return new Promise(function (resolve) {
    User.findByIdAndUpdate(userId, {
      $set: unsetObject
    }, function () {
      User.findByIdAndUpdate(userId, {
        $pull: {
          modules: null
        }
      }, {
        multi: true
      }, function () {
        return resolve();
      });
    });
  });
};

exports.deleteModule = deleteModule;

var changeBasicUserData = function changeBasicUserData(basic, userId) {
  basic.socials = basic.socials.map(function (singleSocial) {
    return {
      url: singleSocial.url,
      socialType: singleSocial.type
    };
  });
  return _mongoose.default.model('users').findByIdAndUpdate(userId, {
    $set: _objectSpread({}, basic)
  });
};

exports.changeBasicUserData = changeBasicUserData;

var mapUserToView = function mapUserToView(RAWUser) {
  RAWUser = RAWUser.toObject();
  RAWUser.socials = _toConsumableArray(RAWUser.socials);
  RAWUser.socials = RAWUser.socials.map(function (singleSocial) {
    return {
      url: singleSocial.url,
      type: singleSocial.socialType
    };
  });
  return RAWUser;
};

exports.mapUserToView = mapUserToView;