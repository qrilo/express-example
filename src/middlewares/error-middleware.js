const ForbiddenError = require("../errors/forbidden-error");
const NotFoundError = require("../errors/not-found-error");
const UnauthorizedError = require("../errors/unauthorized-error");
const ValidationError = require("../errors/validation-error");
const logger = require("../utils/logger");

const errorMiddleware = (err, req, res, next) => {
  if (
    err instanceof ValidationError ||
    err instanceof NotFoundError ||
    err instanceof UnauthorizedError ||
    err instanceof ForbiddenError
  ) {
    return handleError(err, req, res);
  }

  logger.error(
    `ServerError: ${err} - ${req.method} ${req.url} - ${req.ip} - StatusСode: 500`
  );
  res.status(500).json({ error: "Something went wrong!" });
};

const handleError = (err, req, res) => {
  logger.error(
    `${err.constructor.name}: ${err.payload.error} - ${req.method} ${req.url} - ${req.ip} - StatusCode: ${err.statusCode}`
  );
  return res.status(err.statusCode).json(err.payload);
};

module.exports = errorMiddleware;
