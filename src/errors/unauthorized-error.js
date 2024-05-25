class UnauthorizedError extends Error {
  constructor(payload) {
    super();
    this.statusCode = 401;
    this.payload = payload;
  }
}

module.exports = UnauthorizedError;
