const ApiError = require('../utils/ApiError');

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  console.error(err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      error: { message: err.message, code: err.statusCode },
    });
  }

  res.status(500).json({
    error: { message: 'Error interno del servidor', code: 500 },
  });
}

module.exports = errorHandler;
