"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.permissionGranted = exports.userLogged = void 0;

var _consts = require("./consts");

var userLogged = function userLogged(req, res, next) {
  if (!req.user) return res.sendStatus(401);else return next();
};

exports.userLogged = userLogged;

var permissionGranted = function permissionGranted(section) {
  return function (req, res, next) {
    var user = req.user;

    switch (section) {
      case _consts.MODIFY_INITIATIVE:
        {
          var userInitiatives = user.initiatives;
          var initiativeId = req.params.initId;
          if (userInitiatives.find(function (singleInitiative) {
            return singleInitiative === initiativeId;
          })) return next();else res.sendStatus(403);
        }

      default:
        return res.sendStatus(403);
    }
  };
};

exports.permissionGranted = permissionGranted;