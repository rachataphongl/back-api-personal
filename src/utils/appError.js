module.exports = class AppError extends Error {
  //custom error
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
};
