const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/unauthorized-error");
const ForbiddenError = require("../errors/forbidden-error");

const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    throw new UnauthorizedError({ error: "Access token is required" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      throw new UnauthorizedError({ error: "Invalid access token" });
    }
    req.token = decoded;

    next();
  });
};

const authorize = (requiredRoles) => {
  return async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return next(new UnauthorizedError({ error: "Access token is required" }));
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return next(new UnauthorizedError({ error: "Invalid access token" }));
      }

      req.token = decoded;
      const hasRequiredRole =
        req.token.role &&
        requiredRoles.some((role) => req.token.role.includes(role));

      if (!hasRequiredRole) {
        return next(new ForbiddenError({ error: "Access denied" }));
      }

      next();
    });
  };
};

module.exports = {
  authenticate,
  authorize,
};
