const pool = require('../db/pool');
const ApiError = require('../utils/ApiError');

// Los roles (tabla `rol`) casi nunca cambian en la vida del proceso, así que
// se cachea el mapeo id_rol -> nombre en memoria tras la primera consulta,
// en vez de agregar una tabla de configuración o repetir el JOIN en cada
// request. Si algún día se edita la tabla `rol` en caliente, habría que
// reiniciar el servidor para que el cache se actualice.
let rolesPorId = null;

async function cargarRoles() {
  if (rolesPorId) return rolesPorId;
  const result = await pool.query('SELECT id_rol, nombre FROM rol');
  rolesPorId = new Map(result.rows.map((r) => [r.id_rol, r.nombre]));
  return rolesPorId;
}

const authorize = (rolesPermitidos) => async (req, res, next) => {
  try {
    if (!req.user) {
      return next(new ApiError(401, 'token requerido'));
    }

    const roles = await cargarRoles();
    const nombreRol = roles.get(req.user.id_rol);

    if (!nombreRol || !rolesPermitidos.includes(nombreRol)) {
      return next(new ApiError(403, 'no tienes permiso para realizar esta acción'));
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authorize;
