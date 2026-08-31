const asyncHandler = require('../../utils/asyncHandler');
const service = require('./emergencias.service');

const crear = asyncHandler(async (req, res) => {
  const id_usuario_solicitante = req.user ? req.user.id_usuario : null;
  const emergencia = await service.crearEmergencia(req.body, id_usuario_solicitante);
  res.status(201).json(emergencia);
});

const obtenerPorCodigo = asyncHandler(async (req, res) => {
  const emergencia = await service.obtenerPorCodigo(req.params.codigo);

  // Decisión: se ocultan foto_url y telefono_contacto en esta respuesta
  // pública (sin autenticación) porque son datos potencialmente sensibles
  // del solicitante/escena; cualquiera con el código puede consultar el
  // estado, pero no debería poder ver la foto ni el teléfono de contacto.
  // A revisar/confirmar por el usuario.
  res.status(200).json({
    id_emergencia: emergencia.id_emergencia,
    codigo: emergencia.codigo,
    id_tipo_emergencia: emergencia.id_tipo_emergencia,
    descripcion: emergencia.descripcion,
    estado: emergencia.estado,
    latitud: emergencia.latitud,
    longitud: emergencia.longitud,
    direccion_referencia: emergencia.direccion_referencia,
    fecha_reportada: emergencia.fecha_reportada,
    fecha_en_camino: emergencia.fecha_en_camino,
    fecha_en_sitio: emergencia.fecha_en_sitio,
    fecha_atendiendo: emergencia.fecha_atendiendo,
    fecha_finalizada: emergencia.fecha_finalizada,
    tiempo_respuesta: emergencia.tiempo_respuesta,
  });
});

const cambiarEstado = asyncHandler(async (req, res) => {
  const id_emergencia = Number(req.params.id);
  const emergencia = await service.cambiarEstado(id_emergencia, req.body.nuevo_estado);
  res.status(200).json(emergencia);
});

const cancelar = asyncHandler(async (req, res) => {
  const id_emergencia = Number(req.params.id);
  const emergencia = await service.cancelar(id_emergencia, req.user.id_usuario);
  res.status(200).json(emergencia);
});

module.exports = { crear, obtenerPorCodigo, cambiarEstado, cancelar };
