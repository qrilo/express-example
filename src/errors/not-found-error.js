class NotFoundError extends Error {
  constructor(payload) {
    super();
    this.statusCode = 404;
    this.payload = payload;
  }
}

module.exports = NotFoundError;
