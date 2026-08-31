const { Router } = require('express');
const validate = require('../../middleware/validate');
const authenticate = require('../../middleware/authenticate');
const { crearEmergenciaSchema } = require('./emergencias.validators');
const controller = require('./emergencias.controller');

const router = Router();

router.post('/', authenticate.optional, validate(crearEmergenciaSchema), controller.crear);
router.get('/:codigo', controller.obtenerPorCodigo);

module.exports = router;
