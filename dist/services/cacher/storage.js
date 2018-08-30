"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Storage = function Storage() {
  var _this = this;

  _classCallCheck(this, Storage);

  _defineProperty(this, "find", function (path) {
    return _this.storage.find(function (singleElement) {
      console.log(singleElement, path);
      return singleElement.path === path.substring(0, path.length - 1);
    });
  });

  _defineProperty(this, "save", function (path, element) {
    _this.storage = _this.storage.filter(function (singleElement) {
      return singleElement.path !== path;
    });

    _this.storage.push(_objectSpread({
      path: path
    }, element));
  });

  _defineProperty(this, "createOrAddToSet", function () {
    console.log('createOrAddToSet invoked!');
  });

  this.storage = [];
};

var _default = new Storage();

exports.default = _default;