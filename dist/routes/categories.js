"use strict";

var _fetchCategories = _interopRequireDefault(require("./../services/fetchCategories"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (app) {
  app.get('/api/category', function (req, res) {
    _fetchCategories.default.fetchCategories().then(function (result) {
      res.status(200).json(result);
    });
  });
};