class ForbiddenError extends Error {
  constructor(payload) {
    super();
    this.statusCode = 403;
    this.payload = payload;
  }
}

module.exports = ForbiddenError;
