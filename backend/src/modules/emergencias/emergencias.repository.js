const pool = require('../../db/pool');
const generarCodigo = require('../../utils/generarCodigo');

async function obtenerTipoEmergenciaPorId(id_tipo_emergencia) {
  const result = await pool.query(
    'SELECT id_tipo_emergencia FROM tipo_emergencia WHERE id_tipo_emergencia = $1',
    [id_tipo_emergencia]
  );
  return result.rows[0] || null;
}

async function insertarEmergenciaConCodigo(datos) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const countResult = await client.query('SELECT COUNT(*) FROM emergencia');
    const siguienteNumero = parseInt(countResult.rows[0].count, 10) + 1;
    const codigo = generarCodigo(siguienteNumero);

    const insertResult = await client.query(
      `INSERT INTO emergencia
         (codigo, id_usuario_solicitante, id_tipo_emergencia, descripcion,
          telefono_contacto, latitud, longitud, direccion_referencia, foto_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING id_emergencia, codigo, estado, fecha_reportada`,
      [
        codigo,
        datos.id_usuario_solicitante,
        datos.id_tipo_emergencia,
        datos.descripcion || null,
        datos.telefono_contacto || null,
        datos.latitud,
        datos.longitud,
        datos.direccion_referencia || null,
        datos.foto_url || null,
      ]
    );

    await client.query('COMMIT');
    return insertResult.rows[0];
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

async function obtenerPorCodigo(codigo) {
  const result = await pool.query('SELECT * FROM emergencia WHERE codigo = $1', [codigo]);
  return result.rows[0] || null;
}

async function findById(id_emergencia) {
  const result = await pool.query('SELECT * FROM emergencia WHERE id_emergencia = $1', [id_emergencia]);
  return result.rows[0] || null;
}

// Lista blanca fija de columnas de timestamp válidas para el UPDATE dinámico
// de abajo. Es el único lugar del repository donde se interpola un nombre de
// columna en el SQL, así que se revalida aquí (además de en el service) como
// defensa en profundidad contra inyección vía nombre de columna.
const COLUMNAS_TIMESTAMP_VALIDAS = [
  'fecha_en_camino',
  'fecha_en_sitio',
  'fecha_atendiendo',
  'fecha_finalizada',
];

async function actualizarEstado(id_emergencia, nuevoEstado, columnaTimestamp) {
  if (!COLUMNAS_TIMESTAMP_VALIDAS.includes(columnaTimestamp)) {
    throw new Error(`columna de timestamp no permitida: ${columnaTimestamp}`);
  }

  const result = await pool.query(
    `UPDATE emergencia
       SET estado = $1, ${columnaTimestamp} = NOW()
       WHERE id_emergencia = $2
       RETURNING id_emergencia, codigo, estado, fecha_en_camino, fecha_en_sitio,
                 fecha_atendiendo, fecha_finalizada, tiempo_respuesta`,
    [nuevoEstado, id_emergencia]
  );
  return result.rows[0] || null;
}

async function cancelarEmergencia(id_emergencia) {
  const result = await pool.query(
    `UPDATE emergencia
       SET estado = 'cancelada'
       WHERE id_emergencia = $1
       RETURNING id_emergencia, codigo, estado`,
    [id_emergencia]
  );
  return result.rows[0] || null;
}

module.exports = {
  obtenerTipoEmergenciaPorId,
  insertarEmergenciaConCodigo,
  obtenerPorCodigo,
  findById,
  actualizarEstado,
  cancelarEmergencia,
};
