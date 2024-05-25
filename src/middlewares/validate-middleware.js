const ValidationError = require("../errors/validation-error");

const validate = (scheme) => {
  return (req, res, next) => {
    const { error } = scheme.validate(req.body);
    if (error) {
      throw new ValidationError({ error: error.details[0].message });
    }

    next();
  };
};

module.exports = validate;
