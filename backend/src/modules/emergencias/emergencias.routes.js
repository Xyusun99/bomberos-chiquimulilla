const { Router } = require('express');
const validate = require('../../middleware/validate');
const authenticate = require('../../middleware/authenticate');
const authorize = require('../../middleware/authorize');
const { crearEmergenciaSchema, cambiarEstadoSchema } = require('./emergencias.validators');
const controller = require('./emergencias.controller');

const router = Router();

router.post('/', authenticate.optional, validate(crearEmergenciaSchema), controller.crear);
router.get('/:codigo', controller.obtenerPorCodigo);
router.patch(
  '/:id/estado',
  authenticate,
  authorize(['Bombero']),
  validate(cambiarEstadoSchema),
  controller.cambiarEstado
);
router.post('/:id/cancelar', authenticate, controller.cancelar);

module.exports = router;
