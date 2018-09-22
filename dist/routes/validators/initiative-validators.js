"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.invitationResponse = exports.inviteUserValidators = void 0;

var _check = require("express-validator/check");

var inviteUserValidators = [(0, _check.check)('email').exists(), (0, _check.check)('email', 'is email').isEmail(), validate];
exports.inviteUserValidators = inviteUserValidators;
var invitationResponse = [(0, _check.check)('jwt').exists(), validate];
exports.invitationResponse = invitationResponse;

function validate(req, res, next) {
  var errors = (0, _check.validationResult)(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()
    });
  } else return next();
}