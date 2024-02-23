const { body, validationResult } = require('express-validator');

const validateUser = [
  body("firstName").isString().isLength({ max: 255 }),
  body("lastName").isString().isLength({ max: 255 }),
  body("email").isEmail(),
  body("city").isString().isLength({ max: 255 }),
  body("language").isString().isLength({ max: 255 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ validationErrors: errors.array() });
    }
    next();
  },
];

module.exports = validateUser;