const pool = require('../../db/pool');

async function obtenerRolPorNombre(nombre) {
  const result = await pool.query('SELECT id_rol, nombre FROM rol WHERE nombre = $1', [nombre]);
  return result.rows[0] || null;
}

async function obtenerUsuarioPorCorreo(correo) {
  const result = await pool.query('SELECT * FROM usuario WHERE correo = $1', [correo]);
  return result.rows[0] || null;
}

async function obtenerUsuarioPorId(id_usuario) {
  const result = await pool.query(
    'SELECT id_usuario, nombre, correo, telefono, id_rol, estado, fecha_creacion FROM usuario WHERE id_usuario = $1',
    [id_usuario]
  );
  return result.rows[0] || null;
}

async function crearUsuario({ nombre, correo, telefono, password_hash, id_rol }) {
  const result = await pool.query(
    `INSERT INTO usuario (nombre, correo, telefono, password_hash, id_rol)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id_usuario, nombre, correo, telefono, id_rol, estado, fecha_creacion`,
    [nombre, correo, telefono || null, password_hash, id_rol]
  );
  return result.rows[0];
}

module.exports = {
  obtenerRolPorNombre,
  obtenerUsuarioPorCorreo,
  obtenerUsuarioPorId,
  crearUsuario,
};
