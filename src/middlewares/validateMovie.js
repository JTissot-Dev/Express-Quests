const { body, validationResult } = require('express-validator');

const validateMovie = [
  body("title").isString().isLength({ max: 255 }),
  body("director").isString().isLength({ max: 255 }),
  body("year").isString().isLength({ max: 255 }),
  body("color").isString().isLength({ max: 255 }),
  body("duration").isInt(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ validationErrors: errors.array() });
    }
    next();
  },
];

module.exports = validateMovie;
  
