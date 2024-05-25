const ForbiddenError = require("../errors/forbidden-error");
const NotFoundError = require("../errors/not-found-error");
const UnauthorizedError = require("../errors/unauthorized-error");
const ValidationError = require("../errors/validation-error");

const errorMiddleware = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err.payload);
  }

  if (err instanceof NotFoundError) {
    return res.status(err.statusCode).json(err.payload);
  }

  if (err instanceof UnauthorizedError) {
    return res.status(err.statusCode).json(err.payload);
  }

  if (err instanceof ForbiddenError) {
    return res.status(err.statusCode).json(err.payload);
  }

  console.error(err.message);
  res.status(500).json({ error: "Something went wrong!" });
};

module.exports = errorMiddleware;
