const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const { JWT_SECRET } = require('../config/env');

function authenticate(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return next(new ApiError(401, 'token requerido'));
  }

  const token = header.slice('Bearer '.length);

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = { id_usuario: payload.id_usuario, id_rol: payload.id_rol };
    next();
  } catch (err) {
    next(new ApiError(401, 'token inválido'));
  }
}

// Para endpoints públicos donde el login es opcional (ej. reportar una
// emergencia con o sin sesión): si viene un Bearer token válido, adjunta
// req.user; si no viene token o es inválido, sigue sin req.user en vez de
// rechazar la request.
function authenticateOptional(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return next();
  }

  const token = header.slice('Bearer '.length);

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = { id_usuario: payload.id_usuario, id_rol: payload.id_rol };
  } catch (err) {
    // token inválido en un endpoint público: se ignora, no se rechaza.
  }
  next();
}

module.exports = authenticate;
module.exports.optional = authenticateOptional;
