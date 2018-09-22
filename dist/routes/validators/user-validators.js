"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createModuleValidators = void 0;

var _check = require("express-validator/check");

var createModuleValidators = [(0, _check.check)('firstName').exists(), (0, _check.check)('lastName').exists(), (0, _check.check)('email').exists(), (0, _check.check)('email', 'is email').isEmail(), (0, _check.check)('description').exists(), (0, _check.check)('socials').exists(), (0, _check.check)('socials', 'is array').isArray(), validate];
exports.createModuleValidators = createModuleValidators;

function validate(req, res, next) {
  var errors = (0, _check.validationResult)(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()
    });
  } else return next();
}