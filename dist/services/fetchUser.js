"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapUserToView = exports.changeBasicUserData = exports.reorderModules = exports.deleteModule = exports.updateModule = exports.addNewModule = exports.getUserData = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getUserData = function getUserData(userId) {
  return new Promise(function (resolve, reject) {
    _mongoose.default.model('users').findById(userId, function (error, user) {
      if (error) {
        reject(error.name);
      } else {
        resolve(user);
      }
    });
  });
};

exports.getUserData = getUserData;

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
  setObject["modules.".concat(moduleIndex)] = module;
  return _mongoose.default.model('users').findByIdAndUpdate(userId, {
    $set: setObject
  });
};

exports.updateModule = updateModule;

var deleteModule = function deleteModule(userId, moduleIndex) {
  var User = _mongoose.default.model('users');

  var unsetObject = {};
  unsetObject["modules.".concat(moduleIndex)] = null;
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

var reorderModules = function reorderModules(userId, modules) {
  return _mongoose.default.model('users').findByIdAndUpdate(userId, {
    $set: {
      modules: modules
    }
  });
};

exports.reorderModules = reorderModules;

var changeBasicUserData = function changeBasicUserData(basic, userId) {
  return _mongoose.default.model('users').findByIdAndUpdate(userId, {
    $set: _objectSpread({}, basic)
  });
};

exports.changeBasicUserData = changeBasicUserData;

var mapUserToView = function mapUserToView(RAWUser) {
  return RAWUser ? RAWUser.toObject() : RAWUser;
};

exports.mapUserToView = mapUserToView;