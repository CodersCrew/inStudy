"use strict";

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _fs = _interopRequireDefault(require("fs"));

var _keys = require("./../config/keys");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongoose = require('mongoose');

var Initiative = mongoose.model('initiatives');

_cloudinary.default.config(_keys.cloudinaryConfig);

var removeFile = function removeFile(path) {
  return _fs.default.unlinkSync(path);
};

module.exports.sendInitiativeImage = function (path) {
  return function (initiativeId) {
    return _cloudinary.default.uploader.upload(path, function () {}, {
      public_id: "/image",
      folder: initiativeId
    }).then(function (cloudinaryResponse) {
      return Initiative.findByIdAndUpdate(initiativeId, {
        $set: {
          image: cloudinaryResponse.url
        }
      }).then(function () {
        return cloudinaryResponse;
      });
    }).then(function (result) {
      removeFile(path);
      return result;
    });
  };
};

module.exports.sendModuleImage = function (path, filename) {
  return function (initiativeId, moduleId) {
    return _cloudinary.default.uploader.upload(path, function () {}, {
      public_id: "/".concat(filename.split('.')[0]),
      folder: "".concat(initiativeId, "/modules/").concat(moduleId)
    }).then(function (result) {
      removeFile(path);
      return result;
    });
  };
};