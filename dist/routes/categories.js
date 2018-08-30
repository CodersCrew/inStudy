"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fetchCategories = _interopRequireDefault(require("./../services/fetchCategories"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(app) {
  app.get('/api/category', function (req, res) {
    _fetchCategories.default.fetchCategories().then(function (result) {
      res.status(200).json(result);
    });
  });
};

exports.default = _default;