import { check, validationResult } from 'express-validator/check';

export const createModuleValidators = [
  check('firstName').exists(),
  check('lastName').exists(),
  check('email').exists(),
  check('email', 'is email').isEmail(),
  check('description').exists(),
  check('socials').exists(),
  check('socials', 'is array').isArray(),
  validate,
];

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  } else return next();
}
