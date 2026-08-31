const ApiError = require('../../utils/ApiError');
const repository = require('./emergencias.repository');

const TRANSICIONES_VALIDAS = {
  reportada: ['en_camino'],
  en_camino: ['en_sitio'],
  en_sitio: ['atendiendo'],
  atendiendo: ['finalizada'],
  finalizada: [],
  cancelada: [],
};

const CAMPO_TIMESTAMP = {
  en_camino: 'fecha_en_camino',
  en_sitio: 'fecha_en_sitio',
  atendiendo: 'fecha_atendiendo',
  finalizada: 'fecha_finalizada',
};

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

async function cambiarEstado(id_emergencia, nuevo_estado) {
  const emergencia = await repository.findById(id_emergencia);
  if (!emergencia) {
    throw new ApiError(404, 'emergencia no encontrada');
  }

  const transicionesPermitidas = TRANSICIONES_VALIDAS[emergencia.estado] || [];
  if (!transicionesPermitidas.includes(nuevo_estado)) {
    throw new ApiError(
      409,
      `transición inválida: no se puede pasar de ${emergencia.estado} a ${nuevo_estado}`
    );
  }

  const columnaTimestamp = CAMPO_TIMESTAMP[nuevo_estado];
  return repository.actualizarEstado(id_emergencia, nuevo_estado, columnaTimestamp);
}

async function cancelar(id_emergencia, id_usuario) {
  const emergencia = await repository.findById(id_emergencia);
  if (!emergencia) {
    throw new ApiError(404, 'emergencia no encontrada');
  }

  if (emergencia.id_usuario_solicitante === null || emergencia.id_usuario_solicitante !== id_usuario) {
    throw new ApiError(403, 'no autorizado para cancelar este reporte');
  }

  if (emergencia.estado !== 'reportada') {
    throw new ApiError(409, 'solo se puede cancelar un reporte en estado reportada');
  }

  return repository.cancelarEmergencia(id_emergencia);
}

module.exports = { crearEmergencia, obtenerPorCodigo, cambiarEstado, cancelar };
