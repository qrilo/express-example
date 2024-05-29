const logger = require("../utils/logger");

const loggerMiddleware = (req, res, next) => {
  logger.info(`HTTP ${req.method} ${req.url} - ${req.ip}`);
  next();
};

module.exports = loggerMiddleware;
