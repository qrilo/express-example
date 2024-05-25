const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/unauthorized-error");

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    throw new UnauthorizedError({ error: "Access token is required" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      throw new UnauthorizedError({ error: "Invalid access token" });
    }
    req.token = decoded;

    next();
  });
}

module.exports = {
  verifyToken,
};
