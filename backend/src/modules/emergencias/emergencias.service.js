const ApiError = require('../../utils/ApiError');
const repository = require('./emergencias.repository');

async function crearEmergencia(datos, id_usuario_solicitante) {
  const tipo = await repository.obtenerTipoEmergenciaPorId(datos.id_tipo_emergencia);
  if (!tipo) {
    throw new ApiError(400, 'tipo de emergencia inválido');
  }

  const payload = { ...datos, id_usuario_solicitante };

  try {
    return await repository.insertarEmergenciaConCodigo(payload);
  } catch (err) {
    // 23505 = unique_violation: dos requests concurrentes generaron el mismo
    // código a partir del mismo COUNT(*). Se reintenta una sola vez.
    if (err.code === '23505') {
      try {
        return await repository.insertarEmergenciaConCodigo(payload);
      } catch (err2) {
        throw new ApiError(500, 'no se pudo generar el reporte, intente de nuevo');
      }
    }
    throw err;
  }
}

async function obtenerPorCodigo(codigo) {
  const emergencia = await repository.obtenerPorCodigo(codigo);
  if (!emergencia) {
    throw new ApiError(404, 'emergencia no encontrada');
  }
  return emergencia;
}

module.exports = { crearEmergencia, obtenerPorCodigo };
