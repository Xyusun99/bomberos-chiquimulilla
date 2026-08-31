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

module.exports = { obtenerTipoEmergenciaPorId, insertarEmergenciaConCodigo, obtenerPorCodigo };
