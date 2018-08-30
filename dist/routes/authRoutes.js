"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _fetchUser = require("./../services/fetchUser");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(app) {
  app.get('/auth/google', _passport.default.authenticate('google', {
    scope: ['profile', 'email']
  }));
  app.get('/auth/google/callback', _passport.default.authenticate('google'), function (req, res) {
    res.redirect('/student/profil');
  });
  app.get('/api/logout', function (req, res) {
    req.logout();
    res.send(req.user);
  });
  app.get('/api/current_user', function (req, res) {
    return res.send((0, _fetchUser.mapUserToView)(req.user));
  });
};

exports.default = _default;