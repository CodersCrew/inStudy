"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _fs = _interopRequireDefault(require("fs"));

var _keys = require("./../config/keys");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_cloudinary.default.config(_keys.file_cloud);

var removeFile = function removeFile(path) {
  _fs.default.unlinkSync(path);
};

var CloudinaryAPI = function CloudinaryAPI() {
  var _this = this;

  _classCallCheck(this, CloudinaryAPI);

  _defineProperty(this, "uploadInitiativeBackground", function (path, initiativeId) {
    return _this.cloudinary.uploader.upload(path, function () {}, {
      public_id: "".concat(initiativeId, "/background")
    }).then(function (result) {
      removeFile(path);
      return Promise.resolve(result);
    });
  });

  this.cloudinary = _cloudinary.default;
};

var _default = CloudinaryAPI;
exports.default = _default;