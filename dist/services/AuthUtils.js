"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

var logoutUser = function logoutUser(_, _ref, req) {
  _objectDestructuringEmpty(_ref);

  req.logout();
};

var getUser = function getUser(_, _ref2, req) {
  var token = _ref2.token;
  var _req$user = req.user,
      googleId = _req$user.googleId,
      image = _req$user.image;
  return Promise.resolve({
    googleId: googleId,
    image: image
  });
};

var _default = {
  logoutUser: logoutUser,
  getUser: getUser
};
exports.default = _default;