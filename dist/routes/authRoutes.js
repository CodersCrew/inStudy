"use strict";

var _passport = _interopRequireDefault(require("passport"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _fetchUser = require("../services/fetchUser");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = function (app) {
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
    var _mapUser$initiatives;

    var Initiative = _mongoose.default.model('initiatives');

    var mapUser = (0, _fetchUser.mapUserToView)(req.user);
    Initiative.find({
      _id: {
        $in: mapUser === null || mapUser === void 0 ? void 0 : (_mapUser$initiatives = mapUser.initiatives) === null || _mapUser$initiatives === void 0 ? void 0 : _mapUser$initiatives.map(function (initiative) {
          return new _mongoose.default.mongo.ObjectId(initiative);
        })
      }
    }).then(function (initiatives) {
      if (initiatives.length) res.json(_objectSpread({}, mapUser, {
        initiatives: initiatives
      }));else res.json(mapUser);
    }).catch(function (error) {
      console.log(error);
      res.sendStatus(404);
    });
  });
};