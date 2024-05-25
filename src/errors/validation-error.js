class ValidationError extends Error {
  constructor(payload) {
    super();
    this.statusCode = 400;
    this.payload = payload;
  }
}

module.exports = ValidationError;
