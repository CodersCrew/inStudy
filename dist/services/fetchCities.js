"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchUniversities = exports.fetchCities = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fetchCities = function fetchCities() {
  return _mongoose.default.model('cities').find({});
};

exports.fetchCities = fetchCities;

var fetchUniversities = function fetchUniversities(cityId) {
  return _mongoose.default.model('universities').find({
    city: new _mongoose.default.mongo.ObjectId(cityId)
  });
};

exports.fetchUniversities = fetchUniversities;