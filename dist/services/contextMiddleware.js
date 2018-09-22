"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DBConnector2 = _interopRequireDefault(require("./DBConnector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(req, res, next) {
  var _DBConnector = new _DBConnector2.default({
    user: req.user
  });

  req.instudy = {
    DBConnector: _DBConnector,
    user: req.user
  };
  if (req.user) next();else res.sendStatus(401);
};

exports.default = _default;