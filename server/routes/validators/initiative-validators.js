import { check, validationResult } from 'express-validator/check';

export const inviteUserValidators = [
  check('email').exists(),
  check('email', 'is email').isEmail(),
  validate,
];

export const invitationResponse = [
  check('jwt').exists(),
  validate,
];

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  } else return next();
}
