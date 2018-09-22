"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _storage = _interopRequireDefault(require("./storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(req, res, next) {
  var path = req.path;
  var method = req.method;
  var cache = req.instudyCache;

  if (method === 'GET') {
    var result = _storage.default.find(path);

    console.log(result);

    if (result) {
      res.status(200).json(result);
    } else {
      next();
    }
  } else {
    _storage.default.save(path, cache);

    res.sendStatus(201);
  }
};

exports.default = _default;